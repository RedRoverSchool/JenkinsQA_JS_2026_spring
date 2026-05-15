import { APIRequestContext } from "@playwright/test";

const HOST = process.env.LOCAL_HOST;
const PORT = process.env.LOCAL_PORT;
const USERNAME = process.env.LOCAL_USERNAME ?? "";
const API_TOKEN = process.env.API_TOKEN ?? "";

export async function cleanData(request: APIRequestContext) {
	const baseUrl = `http://${HOST}:${PORT}/`;
	const authHeader = `Basic ${Buffer.from(`${USERNAME}:${API_TOKEN}`).toString("base64")}`;

	function getCrumbFromPage(html: string) {
		const CRUMB_TAG = 'data-crumb-value="';
		const begin = html.indexOf(CRUMB_TAG);
		if (begin === -1) return "";
		const start = begin + CRUMB_TAG.length;
		const end = html.indexOf('"', start);
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
				endIndex = index + from.length;
			}
			index = html.indexOf(from, endIndex);
		}
		return result;
	}

	async function getPage(uri = ""): Promise<string> {
		const maxRetries = 2;

		for (let attempt = 1; attempt <= maxRetries; attempt++) {
			const res = await request.get(`${baseUrl}${uri}`, {
				headers: { Authorization: authHeader }
			});

			const status = res.status();

			if (status === 200) {
				return await res.text();
			}

			if (status === 404) {
				console.log(`ℹ️ Note: Resource at ${uri} not found (likely already deleted). Continuing...`);
				return "";
			}

			// Jenkins hiccup (500/503): Wait and retry
			if ([500, 503].includes(status) && attempt < maxRetries) {
				console.log(`⚠️ Jenkins returned ${status} on attempt ${attempt}. Retrying in 3s...`);
				await new Promise((resolve) => setTimeout(resolve, 1000));
				continue;
			}

			throw new Error(`🛑 Cleanup failed! GET ${uri} returned ${status}`);
		}

		throw new Error(`🛑 Cleanup failed! Unexpected exit in retry loop for GET ${uri}`);
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

		if (![200, 302, 303, 404].includes(res.status())) {
			throw new Error(`POST ${uri} failed with status ${res.status()}`);
		}
		return res;
	}

	async function deleteByLink(link: string, names: Set<string>, crumb: string) {
		const fullCrumb = `Jenkins-Crumb=${crumb}`;
		for (const name of names) {
			await postPage(link.replace("{name}", name), fullCrumb, crumb);
		}
	}

	async function deleteJobs() {
		const mainPage = await getPage("");
		await deleteByLink(
			"job/{name}/doDelete",
			getSubstringsFromPage(mainPage, 'href="job/', '/"'),
			getCrumbFromPage(mainPage)
		);
	}

	async function deleteViews() {
		const mainPage = await getPage("");
		await deleteByLink(
			"view/{name}/doDelete",
			getSubstringsFromPage(mainPage, 'href="/view/', '/"'),
			getCrumbFromPage(mainPage)
		);

		const viewPage = await getPage("me/my-views/view/all/");

		const myViews = getSubstringsFromPage(
			viewPage,
			`href="/user/${USERNAME.toLowerCase()}/my-views/view/`,
			'/"'
		);
		myViews.delete("all");
		myViews.delete("");

		await deleteByLink(
			`user/${USERNAME.toLowerCase()}/my-views/view/{name}/doDelete`,
			myViews,
			getCrumbFromPage(viewPage)
		);
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
	let currentTask = "";

	try {
		for (const [index, task] of tasks.entries()) {
			currentTask = task.name;
			await task();

			if (index < tasks.length - 1) {
				await new Promise((resolve) => setTimeout(resolve, 500));
			}
		}
	} catch (error) {
		console.error(`❌ Cleanup failed during: ${currentTask}`);
		throw error;
	}
}
