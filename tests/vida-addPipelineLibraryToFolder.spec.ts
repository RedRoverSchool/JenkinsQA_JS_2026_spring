import { test, expect, Page } from "@/base";
import {createNewItem, jenkinsData, jenkinsLocators} from './testData/vida-data';

test.describe("US_05.003 | Folder Configuration > Pipeline Libraries", (): void => {
    test("TC_05.003.01 | Verify adding Pipeline library", async ({ page }: { page: Page }) => {
        await createNewItem(page)

        await page.locator(".jenkins-table__link.model-link.inside").click();
        await page.locator(`a[href*='/job/${jenkinsData.jobName}/configure']`).click();

        await page.locator(jenkinsLocators.propertiesButton).click();
        await page.locator(jenkinsLocators.addButton).click();
        await page.locator(jenkinsLocators.libraryInputField).fill(jenkinsData.libraryName);
        await page.locator(jenkinsLocators.submitButton).click();

        await page.goto(`/job/${jenkinsData.jobName}/configure`);
        await page.locator(jenkinsLocators.propertiesButton).click();

        await expect(page.locator(jenkinsLocators.libraryInputField)).toHaveValue(jenkinsData.libraryName);
    });
});