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

	async function getPage(uri = "") {
		const res = await request.get(`${baseUrl}${uri}`, {
			headers: { Authorization: authHeader }
		});

		if (res.status() !== 200) {
            if (res.status() === 404) {
                console.log(`ℹ️ Note: Resource at ${uri} not found (likely already deleted). Continuing...`);
            } else {
                throw new Error(`🛑 Cleanup failed! POST ${uri} returned ${res.status()}`);
            }
        }
		return await res.text();
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
		await deleteByLink(
			`user/${USERNAME.toLowerCase()}/my-views/view/{name}/doDelete`,
			getSubstringsFromPage(viewPage, `href="/user/${USERNAME.toLowerCase()}/my-views/view/`, '/"'),
			getCrumbFromPage(viewPage)
		);
	}

	async function deleteNodes() {
		const mainPage = await getPage("");
		await deleteByLink(
			"computer/{name}/doDelete",
			getSubstringsFromPage(mainPage, 'href="/computer/', '/"'),
			getCrumbFromPage(mainPage)
		);
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

	await deleteViews();
	await deleteJobs();
	await deleteUsers();
	await deleteNodes();
	await deleteDescription();
}