import {test, expect,  jenkinsData, jenkinsLocators, Page} from "./testFixtures/vida-fixture"

test.describe("US_05.003 | Folder Configuration > Pipeline Libraries", (): void => {
    test("TC_05.003.01 | Verify adding Pipeline library", async ({ createdFolderPage }) => {

        await createdFolderPage.locator(".jenkins-table__link.model-link.inside").click();
        await createdFolderPage.locator(`a[href*='/job/${jenkinsData.jobName}/configure']`).click();

        await createdFolderPage.locator(jenkinsLocators.propertiesButton).click();
        await createdFolderPage.locator(jenkinsLocators.addButton).click();
        await createdFolderPage.locator(jenkinsLocators.libraryInputField).fill(jenkinsData.libraryName);
        await createdFolderPage.locator(jenkinsLocators.submitButton).click();

        await createdFolderPage.goto(`/job/${jenkinsData.jobName}/configure`);
        await createdFolderPage.locator(jenkinsLocators.propertiesButton).click();

        await expect(createdFolderPage.locator(jenkinsLocators.libraryInputField)).toHaveValue(jenkinsData.libraryName);
    });
});