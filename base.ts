import { test as base } from "@playwright/test";
import { cleanData } from "./helpers/cleanData";

export const test = base.extend({
	page: async ({ page }, use) => {
		await cleanData();
		
		await page.goto("/");
		
		await use(page);
	}
});

export const expect = base.expect;