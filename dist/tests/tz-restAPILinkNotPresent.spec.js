import { test, expect } from "../base";
test.describe('US_15.002 | Footer > REST API', () => {
    test('TC_15.002.04  | REST API link is NOT displayed on admin page: Manage Jenkins', async ({ page }) => {
        await page.locator('#root-action-ManageJenkinsAction').click();
        await expect(page.getByRole('link', { name: "api/" })).not.toBeVisible();
    });
});
//# sourceMappingURL=tz-restAPILinkNotPresent.spec.js.map