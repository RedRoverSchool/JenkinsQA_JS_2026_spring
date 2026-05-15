import { test, expect } from "../base";
test.describe("US_10.005 | Manage Jenkins > Plugins > Updates", () => {
    test.beforeEach(async ({ page }) => {
        await page.getByRole("link", { name: 'Manage Jenkins' }).click();
        await page.getByRole("link", { name: 'Plugins Add, remove, disable' }).click();
    });
    test("TC_10.005.01 | Verify user can access Plugins section", async ({ page }) => {
        const pluginsPageTitle = page.getByRole('heading');
        await expect(pluginsPageTitle).toBeVisible();
        await expect(pluginsPageTitle).toHaveText('Plugins');
    });
    test("TC_10.005.02 | Verify user can open Updates tab", async ({ page }) => {
        const updatesTab = page.getByRole('link', { name: 'Updates' });
        await expect(updatesTab).toBeVisible();
        await expect(updatesTab).toHaveClass(/task-link--active/);
    });
});
//# sourceMappingURL=ok-verifyPlaginsUpdate.spec.js.map