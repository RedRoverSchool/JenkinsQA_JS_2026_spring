import { test as base, expect } from "../../base";
import { jenkinsLocators, jenkinsData } from "../../tests/testData/vida-data";
export const test = base.extend({
    createdFolderPage: async ({ page }, use) => {
        await page.locator(jenkinsLocators.newItemButton).click();
        await page.locator(jenkinsLocators.inputField).fill(jenkinsData.jobName);
        await page.locator(jenkinsLocators.folderType).click();
        await page.locator(jenkinsLocators.okButton).click();
        await page.locator(jenkinsLocators.submitButton).click();
        await page.locator(jenkinsLocators.jenkinsLogo).click();
        await use(page);
    }
});
export { expect, jenkinsLocators, jenkinsData };
//# sourceMappingURL=vida-fixture.js.map