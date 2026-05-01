import { test, expect, Page } from "@/base";

test.describe("US_13.001 | Header > Navigate to Dashboard", () => {
    
    test("TC_13.001.01 | Verify Dashboard is visible", async ({ page }: { page: Page }) => {
        await page.locator("#root-action-ManageJenkinsAction").click();
        await page.locator("[href='configureTools']").click();

        await expect(page.locator(".app-jenkins-logo")).toBeVisible();
    });
});