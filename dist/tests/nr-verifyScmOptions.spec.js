import { test, expect } from "../base";
import { scmData } from "./testData/nr-data";
test.describe("US_02.003 | Freestyle Project > SCM Options", () => {
    test.beforeEach(async ({ page }) => {
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#name").fill(scmData.jobName);
        await page.locator("li.hudson_model_FreeStyleProject").click();
        await page.locator("#ok-button").click();
    });
    test("TC_02.003.07 | Verify SCM options are displayed", async ({ page }) => {
        await page.locator("#source-code-management").click();
        const noneOption = page.getByRole("radio", { name: scmData.none });
        await expect(noneOption).toBeVisible();
        const gitOption = page.getByRole("radio", { name: scmData.git });
        await expect(gitOption).toBeVisible();
    });
    test("TC_02.003.08 | Verify Git fields are displayed when Git is selected", async ({ page }) => {
        await page.locator("#source-code-management").click();
        await page.locator("label[for='radio-block-1']").click();
        const repoUrl = page.getByLabel(scmData.repoUrl);
        await expect(repoUrl).toBeVisible();
        const credentials = page.getByLabel(scmData.credentials);
        await expect(credentials).toBeVisible();
        const branches = page.getByLabel(scmData.branches);
        await expect(branches).toBeVisible();
    });
});
//# sourceMappingURL=nr-verifyScmOptions.spec.js.map