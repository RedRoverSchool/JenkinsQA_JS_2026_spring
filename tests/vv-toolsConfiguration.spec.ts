import { test, expect, Page } from "@/base";

test.describe("UUS_10.004 | Manage Jenkins > Tools", () => {
    test("TC_10.004.01 | Verify Tools Configuration Page opens", async ({ page }: { page: Page }) => {
        await page.locator("a[href$='manage']").click();
        await page.locator("a[href$='configureTools']").click();
        
        expect(page.url()).toContain("/configureTools");
        await expect(page.locator(".jenkins-breadcrumbs__list-item").filter({ hasText: "Tools" })).toBeVisible();
    });
});

