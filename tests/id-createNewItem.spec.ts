import { test } from "@/base";
import { expect } from "@playwright/test";

test.describe("US_01.001 | New Item > Create a new item", () => {
	test("TC_01.001.06 | Create Freestyle Project", async ({ page }) => {
		await page.getByText("New Item").click();
		await page.locator("#name").fill("projectFreestyle1");
		await page.getByText("Freestyle project").click();
		await page.locator("#ok-button").click();
		await page.getByRole("button", { name: /Save/ }).click();
		await expect(page.getByRole("heading", { name: "projectFreestyle1" })).toBeVisible();
		await expect(page.locator("#breadcrumbs")).toContainText("projectFreestyle1");
		await page.locator("#jenkins-head-icon").click();
		await expect(page.locator(".jenkins-table")).toContainText("projectFreestyle1");
	});
});
