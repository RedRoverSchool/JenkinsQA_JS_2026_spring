import { test, expect, Page } from "@/base";
import { vvData } from "./testData/vv-data";

test.describe("US_10.004 | Manage Jenkins > Tools", () => {
    test("TC_10.004.01 | Verify Tools Configuration Page opens", async ({ page }: { page: Page }) => {
        await page.locator("a[href$='manage']").click();
        await page.locator("a[href$='configureTools']").click();
        
        expect(page.url()).toContain("/configureTools");
        await expect(page.locator(".jenkins-breadcrumbs__list-item").filter({ hasText: "Tools" })).toBeVisible();
    });

    test("TC_10.004.02 | Verify Configuration sections are displayed", async ({ page }: { page: Page }) => {
        await page.locator("a[href$='manage']").click();
        await page.locator("a[href$='configureTools']").click();

        for (const section of vvData.toolsSections) {
            await expect(page.locator(".jenkins-section__title").filter({ hasText: section })).toBeVisible();
        }
    });
});
