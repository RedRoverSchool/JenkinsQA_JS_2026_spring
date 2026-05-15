import { test, expect } from "../base";
import { jenkinsData } from "./testData/art-data";
test.beforeEach(async ({ page }) => {
    await page.locator("#side-panel a[href$='newJob']").click();
    await page.locator("#name").fill(jenkinsData.jobName);
    await page.locator(".hudson_model_FreeStyleProject").click();
    await page.locator("#ok-button").click();
    await page.locator(".app-jenkins-logo").click();
});
test.describe("US_02.001 | Freestyle Project Configuration > Enable or Disable the Project", () => {
    test("TC_02.001.02 | Disable the Project", async ({ page }) => {
        await page.locator(".jenkins-table__link").hover();
        await page.locator(".jenkins-menu-dropdown-chevron").click();
        await page.getByText("Configure").click();
        if (await page.locator(".jenkins-toggle-switch__label__checked-title")) {
            await page.getByTitle("Enable or disable the current project").click();
        }
        await page.locator("[name='Submit']").click();
        await page.locator(".app-jenkins-logo").click();
        await page.locator(".jenkins-table__link").click();
        await expect(page.locator('form[id="enable-project"]'))
            .toContainText('This project is currently disabled');
        await page.locator(".app-jenkins-logo").click();
        const disableLogo = await page.locator(`#job_${jenkinsData.jobName} .jenkins-table__cell__button-wrapper [title~='Disabled']`);
        expect(disableLogo).toBeVisible();
    });
});
//# sourceMappingURL=art-Disable%20the%20Project.spec.js.map