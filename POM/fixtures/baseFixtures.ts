import { test as base } from "@/base";
import { App } from "@/POM/pageObjects/App";

export interface Fixtures {
	app: App;
}

export const test = base.extend<Fixtures>({
	app: async ({ page }, use) => {
		const app = new App(page);

		await use(app);
	}
});

export const expect = base.expect;
export { App };
