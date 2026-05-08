import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/dk-data";

test.describe("TC_03.002.01 | Project Description > Verify editing Pipeline description", () => {

   test.beforeEach(async ({ page }: { page: Page }) => {
    // create pipline
    await page.locator("#side-panel a[href$='newJob']").click();
    await page.locator("#name").fill(jenkinsData.piplineName);  
    await page.locator("#j-add-item-type-standalone-projects ul li[class *='WorkflowJob']").click();
    await page.locator("#ok-button").click()
    // fill description
    const description = page.locator(".jenkins-form-item.tr > .setting-main textarea[name='description']")
    await description.fill(jenkinsData.piplineDesc) // 
    await page.getByRole('button', { name: 'Save' }).click();
    // open pipline from HP
    await page.locator(".app-jenkins-logo").click()
    await page.locator(`td a[href = 'job/${jenkinsData.piplineName}/']>.jenkins-menu-dropdown-chevron`).click() 
    await page.locator(`.jenkins-dropdown__item[href='/job/${jenkinsData.piplineName}/configure']`).click() 

     });

    test('TC_03.002.01 | Verify editing Pipeline description', async ({ page }: { page: Page }) => {
        const description = page.locator(".jenkins-form-item.tr > .setting-main textarea[name='description']")
        await expect(description).toHaveText(jenkinsData.piplineDesc) 
        
    });

    test('TC_03.002.02 | Verify editing Pipeline description can be changed', async({page}: {page: Page}) => {
        const description = page.locator(".jenkins-form-item.tr > .setting-main textarea[name='description']");
        await description.clear();
        await description.fill(jenkinsData.pipelineDescNew);
        await page.getByRole('button', { name: 'Save' }).click()
        await expect(page.locator("#description-content")).toHaveText(jenkinsData.pipelineDescNew)

    })


})