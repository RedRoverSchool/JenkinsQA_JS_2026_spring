import { test as base, Page } from "@playwright/test";
import { cleanData } from "./helpers/cleanData";

export const test = base.extend({
	page: async ({ page, request }, use) => {

		await page.goto("/");

		await use(page);
	}
});

export const expect = base.expect;
export type { Page };
