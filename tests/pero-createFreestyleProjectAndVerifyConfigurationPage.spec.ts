import { expect } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/bs-jenkinsData";

test.describe("US_01.004 | New Item > Select an Item type", () => {
	test("TC_01.004.03 | Create Freestyle project and verify configuration page", async ({ page }) => {
		const nameFreestyleProject = "New Freestyle project";
		const menu = [
			"General",
			"Source Code Management",
			"Triggers",
			"Environment",
			"Build Steps",
			"Post-build Actions"
		];

		await page.getByText("New Item").click();
		await page.getByLabel("Enter an item name").fill(nameFreestyleProject);
		await page.locator(".hudson_model_FreeStyleProject").click();
		await page.locator("#ok-button").click();

		await expect(page).toHaveURL(`job/${nameFreestyleProject}/configure`);
		await expect(page.locator(".jenkins-breadcrumbs__list-item").first()).toContainText(
			nameFreestyleProject
		);
		await expect(page.locator(".jenkins-breadcrumbs__list-item").first()).toBeVisible();

		await page.waitForSelector(".task-link-text");
		const itemsMenu = await page.locator(".task-link-text").allInnerTexts();
		console.log(itemsMenu);
		expect(itemsMenu).toEqual(menu);
	});
});
