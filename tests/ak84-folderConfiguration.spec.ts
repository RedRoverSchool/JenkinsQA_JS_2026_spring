import { expect } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/ak84-jenkinsData";

test.describe("US_05.004 | Folder Configuration > Save or Apply", () => {
	test("TC_05.004.03 | Verify that the Save button saves changes", async ({ page }) => {
		await page.locator("#side-panel a[href$='newJob']").click();

		await page.getByLabel("Enter an item name").fill(jenkinsData.entity);
		await page.locator("[class*='folder']").check();
		await page.getByRole("button", { name: "OK" }).click();

		await page.locator("[name*='displayName']").fill(jenkinsData.displayName);
		await page.locator("[name*='description']").fill(jenkinsData.description);
		await page.getByRole("button", { name: "Save" }).click();
		await page.getByText("Configure").click();

		const displayNameField = page.locator("[name*='displayName']");
		/*await page.focus(displayNameField)*/
		await displayNameField.click({ clickCount: 3 });
		await displayNameField.press("ArrowRight");
		await displayNameField.type(" add text");
		const currentValue = await displayNameField.inputValue();
		console.log(currentValue);

		await displayNameField.press("End");
		await displayNameField.type(jenkinsData.end);
		const currentValue1 = await displayNameField.inputValue();

		const discription = page.locator("[name*='description']");
		await page.focus("[name*='description']");
		await discription.press("End");
		await discription.type(jenkinsData.endDescription);
		const totalDescription = await discription.inputValue();
		await page.getByRole("button", { name: "Save" }).click();

		const resultText = await page.locator("#view-message").textContent();
		console.log("resultText: " + resultText);

		const resultTextLocator = page.locator("#view-message");

		expect(resultText).toBe(totalDescription);
		//  expect(resultTextLocator).toHaveText(totalDescription);
	});
});
