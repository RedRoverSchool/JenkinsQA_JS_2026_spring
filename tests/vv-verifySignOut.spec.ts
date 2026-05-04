import { test, expect, Page } from "@/base";

test.describe("US_08.002 | Sign in/out > Sign out", () => {
    test("TC_08.002.01 | Verify redirection to Login after Sign out", async ({ page }: { page: Page }) => {
        await page.locator("#root-action-UserAction").hover();
        await page.locator('a[href*="logout"]').click();

        await expect(page).toHaveURL(/\/login(\?.*)?$/);
    });
});