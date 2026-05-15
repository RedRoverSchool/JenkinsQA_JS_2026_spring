import { APIRequestContext } from "@playwright/test";

const HOST = process.env.LOCAL_HOST;
const PORT = process.env.LOCAL_PORT;
const USERNAME = process.env.LOCAL_USERNAME ?? "";
const API_TOKEN = process.env.API_TOKEN ?? "";

export async function cleanData(request: APIRequestContext) {
	await new Promise((r) => setTimeout(r, 5000));

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

	async function getPage(uri: string) {
		const response = await request.get(`${baseUrl}${uri}`, {
			headers: { Authorization: authHeader },
			failOnStatusCode: false
		});
		return response;
	}

	async function postPage(uri: string, body: string, crumb: string) {
		return await request.post(`${baseUrl}${uri}`, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: authHeader,
				"Jenkins-Crumb": crumb
			},
			data: body,
			failOnStatusCode: false
		});
	}

	async function deleteByLink(link: string, names: Set<string>, crumb: string) {
		const fullCrumb = `Jenkins-Crumb=${crumb}`;
		for (const name of names) {
			await new Promise((r) => setTimeout(r, 500));
			await postPage(link.replace("{name}", name), fullCrumb, crumb);
		}
	}

	const tasks = [
		{
			name: "Views",
			run: async () => {
				const paths = ["", `me/my-views/view/all/`].map((p) => ({
					path: p,
					prefix: p === "" ? 'href="/view/' : `href="/user/${USERNAME.toLowerCase()}/my-views/view/`
				}));

				for (const loc of paths) {
					const res = await getPage(loc.path);
					if (res.status() !== 200) continue;
					const html = await res.text();

					const names = new Set<string>();
					let index = html.indexOf(loc.prefix);
					while (index !== -1) {
						let endIndex = html.indexOf('/"', index + loc.prefix.length);
						if (endIndex !== -1) names.add(html.substring(index + loc.prefix.length, endIndex));
						index = html.indexOf(loc.prefix, endIndex);
					}
					names.delete("all");
					names.delete("");

					const uri =
						loc.path === ""
							? "view/{name}/doDelete"
							: `user/${USERNAME.toLowerCase()}/my-views/view/{name}/doDelete`;
					await deleteByLink(uri, names, getCrumbFromPage(html));
				}
			}
		},
		{
			name: "Jobs",
			run: async () => {
				const res = await getPage("");
				if (res.status() !== 200) return;
				const html = await res.text();
				const jobs = new Set<string>();
				let index = html.indexOf('href="job/');
				while (index !== -1) {
					let endIndex = html.indexOf('/"', index + 10);
					if (endIndex !== -1) jobs.add(html.substring(index + 10, endIndex));
					index = html.indexOf('href="job/', endIndex);
				}
				await deleteByLink("job/{name}/doDelete", jobs, getCrumbFromPage(html));
			}
		},
		{
			name: "Nodes",
			run: async () => {
				const res = await getPage("");
				if (res.status() !== 200) return;
				const html = await res.text();
				const nodes = new Set<string>();
				let index = html.indexOf('href="/computer/');
				while (index !== -1) {
					let endIndex = html.indexOf('/"', index + 16);
					if (endIndex !== -1) nodes.add(html.substring(index + 16, endIndex));
					index = html.indexOf('href="/computer/', endIndex);
				}
				nodes.delete("(built-in)");
				await deleteByLink("computer/{name}/doDelete", nodes, getCrumbFromPage(html));
			}
		},
		{
			name: "Users",
			run: async () => {
				const res = await getPage("manage/securityRealm/");
				if (res.status() !== 200) return;
				const html = await res.text();
				const users = new Set<string>();
				let index = html.indexOf('href="user/');
				while (index !== -1) {
					let endIndex = html.indexOf('/"', index + 11);
					if (endIndex !== -1) users.add(html.substring(index + 11, endIndex));
					index = html.indexOf('href="user/', endIndex);
				}
				users.delete(USERNAME.toLowerCase());
				await deleteByLink(
					"manage/securityRealm/user/{name}/doDelete",
					users,
					getCrumbFromPage(html)
				);
			}
		},
		{
			name: "Description",
			run: async () => {
				const res = await getPage("");
				if (res.status() !== 200) return;
				const html = await res.text();
				const crumb = getCrumbFromPage(html);
				const body = `description=&Submit=&Jenkins-Crumb=${crumb}&json=%7B%22description%22%3A+%22%22%7D`;
				await postPage("submitDescription", body, crumb);
			}
		}
	];

	for (const task of tasks) {
		try {
			await task.run();
			await new Promise((r) => setTimeout(r, 2000));
		} catch (err) {
			continue;
		}
	}
}
