import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/ak-data";

test.describe("US_01.001.02 | New Item > Create a new item > Validate unsupported special characters", () => {
  for (const invalidChar of jenkinsData.unsupportedSpecialCharacters) {
    test(`TC_01.002.01 | Verify validation error for unsupported character "${invalidChar}"`, async ({ page }: { page: Page }) => {
      await page.locator("#side-panel a[href$='newJob']").click();

      await page.locator("#name").fill(`${jenkinsData.jobName}${invalidChar}job`);

      const warningMessage = page.locator("#itemname-invalid");
			const okButton = page.locator("#ok-button");

			await expect(warningMessage).toBeVisible();
			await expect(warningMessage).toContainText("unsafe character");
			await expect(okButton).toBeDisabled();
      
    });
  }
});