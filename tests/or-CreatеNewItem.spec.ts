import { expect } from "@playwright/test";
import { test } from "@/base";
import { generateTitle, validationMsgLocator } from "@/tests/testData/or-jenkinsData";

test.describe("US_01.001 | New Item > Create a new item", () => {
	test("TC_01.001.26 | Verify item name with alphanumeric characters and underscore", async ({ page }) => {
		// Click the "New item" link
		await page.locator("[href='/view/all/newJob']").click();

		// Count all validation messages on the page before the action
		const validationMessagesBefore = page.locator(validationMsgLocator);
		const expectedDisabledMessages = 3;
		const newItemName = generateTitle();
		const msg = `Validation message is visible, on the 'New item' page after entering the name ${newItemName}.`;

		// Verify that no validation errors are displayed before the action
		await expect(validationMessagesBefore, msg).toHaveCount(expectedDisabledMessages);

		// Enter an alphanumeric name containing an underscore into the "Enter an item name" field
		await page.locator("#name").fill(newItemName);

		const validationMessagesAfter = page.locator(validationMsgLocator);

		// Verify that no validation errors are displayed
		await expect(validationMessagesAfter, msg).toHaveCount(expectedDisabledMessages);

		// Click outside the input to change focus
		await page.locator("#add-item-panel h1").click();

		const validationMessagesAfter2 = page.locator(validationMsgLocator);

		// Verify that no validation errors are displayed
		await expect(validationMessagesAfter2, msg).toHaveCount(expectedDisabledMessages);
	});
});
