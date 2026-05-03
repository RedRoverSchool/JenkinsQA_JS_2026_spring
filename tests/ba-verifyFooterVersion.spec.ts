import {test, expect } from 'base'
import { Page } from "@playwright/test";
import { text } from 'node:stream/consumers';

test.describe('US_15.001 | Footer > Jenkins version',() => {
    test("TC_15.001.01 | Footer > Jenkins version > Verify Footer Version", async ({ page } : { page : Page }) => {
    await page.locator('.page-footer__links').getByRole('button').click();
    await expect.soft(page.locator('.page-footer__links').getByRole('button')).toHaveText("Jenkins 2.541.3");
    
    await expect(page.locator('.tippy-box')).toBeVisible();
    await expect(page.locator('.tippy-content >> text="About Jenkins"')).toBeVisible();
    await expect(page.locator('.tippy-content >> text="Get involved"')).toBeVisible();
    await expect(page.locator('.tippy-content >> text="Website"')).toBeVisible();
    
    await page.locator(".jenkins-dropdown__item").nth(0).click();
    await expect(page).toHaveURL("http://localhost:8080/manage/about/");
    
    await page.goBack();
    
    await page.locator('.page-footer__links').getByRole('button').click();
    await page.locator(".jenkins-dropdown__item").nth(1).click();
    await expect(page).toHaveURL("https://www.jenkins.io/participate/");

    await page.goBack({timeout: 3000});

    await page.locator('.page-footer__links').getByRole('button').click();
    await page.locator(".jenkins-dropdown__item").nth(2).click();
    await expect(page).toHaveURL("https://www.jenkins.io/");

    await page.goBack({timeout: 3000});

    await page.locator("#root-action-UserAction").hover();
    await expect(page.locator("#tippy-1")).toBeVisible();
    await expect(page.locator("#tippy-1")).toContainText("admin");

    });
});