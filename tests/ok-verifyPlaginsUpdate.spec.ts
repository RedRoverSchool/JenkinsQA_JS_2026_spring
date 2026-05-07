import { test, expect, Page } from "@/base";

test.describe("US_10.005 | Manage Jenkins > Plugins > Updates", () => {
    test.beforeEach(async ({ page }: { page: Page }) => {
        await page.getByRole("link", { name: 'Manage Jenkins' }).click();
        await page.getByRole("link", { name: 'Plugins Add, remove, disable' }).click();
    });

    test("TC_10.005.01 | Verify user can access Plugins section", async ({ page }: { page: Page }) => {
        const pluginsPageTitle = page.getByRole('heading');

        await expect(pluginsPageTitle).toBeVisible();
        await expect(pluginsPageTitle).toHaveText('Plugins');
    });
});