import { expect } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/bs-jenkinsData";

test.describe.only("US_01.004 | New Item > Select an Item type", () => {
	test("TC_01.004.04 | Verify item type selection section is visible", async ({ page }) => {
		const nameItems = [
			"Freestyle project",
			"Pipeline",
			"Multi-configuration project",
			"Folder",
			"Multibranch Pipeline",
			"Organization Folder"
		];

		const descriptionItems = [
			"Classic, general-purpose job type that checks out from up to one SCM, executes build steps serially, followed by post-build steps like archiving artifacts and sending email notifications.",
			"Orchestrates long-running activities that can span multiple build agents. Suitable for building pipelines (formerly known as workflows) and/or organizing complex activities that do not easily fit in free-style job type.",
			"Suitable for projects that need a large number of different configurations, such as testing on multiple environments, platform-specific builds, etc.",
			"Creates a container that stores nested items in it. Useful for grouping things together. Unlike view, which is just a filter, a folder creates a separate namespace, so you can have multiple things of the same name as long as they are in different folders.",
			"Creates a set of Pipeline projects according to detected branches in one SCM repository.",
			"Creates a set of multibranch project subfolders by scanning for repositories."
		];

		await page.getByText("New Item").click();
		await page.waitForSelector("#items li span.label");

		const textNameItemsOnPage = await page.locator("#items li span.label").allInnerTexts();
        console.log("items: ", textNameItemsOnPage)
		const elNameItemsOnPage = await page.locator("#items li span.label").all();

		expect(textNameItemsOnPage.toSorted()).toEqual(nameItems.toSorted());
		for (const nameItemOnPage of elNameItemsOnPage) {
			await expect(nameItemOnPage).toBeVisible();
		}

		const textDescriptionItemsOnPage = await page.locator("#items li div.desc").allInnerTexts();
		const elDescriptionItemsOnPage = await page.locator("#items li div.desc").all();

		expect(textDescriptionItemsOnPage).toEqual(descriptionItems);
		for (const descriptionItemOnPage of elDescriptionItemsOnPage) {
			await expect(descriptionItemOnPage).toBeVisible();
		}
	});
});
