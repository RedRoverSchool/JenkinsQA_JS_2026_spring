import { test } from "@/base";
import { expect } from "@playwright/test";
import { jenkinsData } from "@/tests/testData/sm-jenkinsData";

test.describe("US_01.001 | New Item > Creatе a new item", () => {
	for (const specialCharacter of jenkinsData.specialCharacters) {
		test(`TC_01.001.19 | Verify the Item Name input field does not accept special character ${specialCharacter}`, async ({
			page
		}) => {
			await page.locator('[href="/view/all/newJob"]').click();
			await page.locator("#name").fill(jenkinsData.jobName + specialCharacter);
			await page.locator('ul li[class="hudson_model_FreeStyleProject"]').click();

			const errorMessage = `» ‘${specialCharacter}’` + jenkinsData.messageError;
			const errorMessageActual = await page.locator("#itemname-invalid");
			const okButton = page.locator("#ok-button");

			await expect(errorMessageActual).toHaveText(errorMessage);
			await expect(okButton).toBeDisabled();
		});
	}
});
