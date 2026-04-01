import { expect } from "@playwright/test";
import { test } from "@/base";

test.describe("US_01.001 | New Item > Create a new item ", () => {
    test("TEST1", async ({ page }) => {
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#name").fill("aaa");

        await page
            .locator(`#j-add-item-type-standalone-projects ul li[class*='FreeStyleProject']`)
            .click();
        await page.locator("#ok-button").click();

        await page.locator(".app-jenkins-logo").click();

        const job = await page.locator("#projectstatus .jenkins-table__link").getAttribute("href");

        expect(job).toContain("aaa");
    });

    test("TEST2", async ({ page }) => {
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#name").fill("aaa1");

        await page
            .locator(`#j-add-item-type-standalone-projects ul li[class*='FreeStyleProject']`)
            .click();
        await page.locator("#ok-button").click();

        await page.locator(".app-jenkins-logo").click();

        const job = await page.locator("#projectstatus .jenkins-table__link").getAttribute("href");

        expect(job).toContain("aaa1");
    });
});
