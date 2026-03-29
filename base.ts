import { test as base } from "@playwright/test";
import { cleanData } from "./helpers/cleanData";

export const test = base.extend({
	page: async ({ page, request }, use) => {
		await page.goto("/");
		await cleanData(request);
		await use(page);
	}
});

export const expect = base.expect;