import { APIRequestContext } from "@playwright/test";

const HOST = process.env.LOCAL_HOST;
const PORT = process.env.LOCAL_PORT;
const USERNAME = process.env.LOCAL_USERNAME ?? "";
const API_TOKEN = process.env.API_TOKEN ?? "";

export async function cleanData(request: APIRequestContext) {
	await new Promise((r) => setTimeout(r, 2000));

	const baseUrl = `http://${HOST}:${PORT}/`;
	const authHeader = `Basic ${Buffer.from(`${USERNAME}:${API_TOKEN}`).toString("base64")}`;

	function getCrumbFromPage(html: string) {
		const CRUMB_TAG = 'data-crumb-value="';
		const begin = html.indexOf(CRUMB_TAG);
		if (begin === -1) return "";
		const start = begin + CRUMB_TAG.length;
		const end = html.indexOf('\"', start);
		return html.substring(start, end);
	}

	function getSubstringsFromPage(html: string, from: string, to: string, maxLength = 100) {
		const result = new Set<string>();
		let index = html.indexOf(from);
		while (index !== -1) {
			let endIndex = html.indexOf(to, index + from.length);
			if (endIndex !== -1 && endIndex - index < maxLength) {
				result.add(html.substring(index + from.length, endIndex));
			} else {
				break;
			}
			index = html.indexOf(from, endIndex);
		}
		return result;
	}

	async function getPage(uri: string) {
		const response = await request.get(`${baseUrl}${uri}`, { headers: { Authorization: authHeader } });
		const status = response.status();
		if (status !== 200) {
			throw new Error(`🛑 Cleanup failed! GET ${uri} returned ${status}`);
		}
		return await response.text();
	}

	async function postPage(uri: string, body: string, crumb: string) {
		const res = await request.post(`${baseUrl}${uri}`, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: authHeader,
				"Jenkins-Crumb": crumb
			},
			data: body
		});

		const status = res.status();
		if (![200, 302, 303, 404].includes(status)) {
			throw new Error(`POST ${uri} failed with status ${status}`);
		}
		return res;
	}

	async function deleteByLink(link: string, names: Set<string>, crumb: string) {
		const fullCrumb = `Jenkins-Crumb=${crumb}`;

		for (const name of names) {
			try {
				await postPage(link.replace("{name}", name), fullCrumb, crumb);

				await new Promise((r) => setTimeout(r, 150));
			} catch (e: any) {
				if (e.message.includes("status 500")) {
					console.log(`⚠️ ${name} already deleted or busy, skipping...`);
					continue;
				}
				throw e;
			}
		}
	}

	async function deleteJobs() {
		const mainPage = await getPage("");
		const jobs = getSubstringsFromPage(mainPage, 'href="job/', '/"');
		await deleteByLink("job/{name}/doDelete", jobs, getCrumbFromPage(mainPage));
	}

	async function deleteViews() {
		const locations = [
			{ path: "", prefix: 'href="/view/' },
			{ path: `me/my-views/view/all/`, prefix: `href="/user/${USERNAME.toLowerCase()}/my-views/view/` }
		];

		for (const loc of locations) {
			const html = await getPage(loc.path);
			const names = getSubstringsFromPage(html, loc.prefix, '/"');

			names.delete("all");
			names.delete("");

			const deleteUri =
				loc.path === ""
					? "view/{name}/doDelete"
					: `user/${USERNAME.toLowerCase()}/my-views/view/{name}/doDelete`;

			await deleteByLink(deleteUri, names, getCrumbFromPage(html));
		}
	}

	async function deleteNodes() {
		const mainPage = await getPage("");
		const nodes = getSubstringsFromPage(mainPage, 'href="/computer/', '/"');
		nodes.delete("(built-in)");
		await deleteByLink("computer/{name}/doDelete", nodes, getCrumbFromPage(mainPage));
	}

	async function deleteUsers() {
		const userPage = await getPage("manage/securityRealm/");
		const crumb = getCrumbFromPage(userPage);
		const users = getSubstringsFromPage(userPage, 'href="user/', '/"');
		users.delete(USERNAME.toLowerCase());
		await deleteByLink("manage/securityRealm/user/{name}/doDelete", users, crumb);
	}

	async function deleteDescription() {
		const mainPage = await getPage("");
		const crumb = getCrumbFromPage(mainPage);
		const body = `description=&Submit=&Jenkins-Crumb=${crumb}&json=%7B%22description%22%3A+%22%22%7D`;
		await postPage("submitDescription", body, crumb);
	}

	const tasks = [deleteViews, deleteJobs, deleteUsers, deleteNodes, deleteDescription];

	for (const task of tasks) {
		try {
			await task();
		} catch (err) {
			console.warn(`⚠️ Cleanup task ${task.name} failed. Retrying in 3s...`);
			await new Promise((r) => setTimeout(r, 3000));

			try {
				await task();
			} catch (retryErr) {
				console.error(`❌ Cleanup failed after retry during: ${task.name}`);
				throw retryErr;
			}
		}
	}
}
