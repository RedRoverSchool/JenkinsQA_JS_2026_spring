import {test, expect, Page} from "@/base";
import {YMdata} from "./testData/ym-data";

test.describe("US_09.007 | Build history > Delete Build", ()=>{
  test.beforeEach(async ({ page }:{page: Page})=>{
    await page.locator("#tasks a[href$='newJob']").click();
    await page.locator("#name").fill(YMdata.jobNameYM);
    await page.locator("#items li[class$='FreeStyleProject']").click();
    await page.locator("#ok-button").click();

    await page.locator("button[name = 'Submit']").click();
    await page.locator("#tasks a[href*='build']").click();

  });

  test("TC_09.007.01 |Delete build from drop-down", async({ page }: {page: Page})=>{
    await page.locator(".app-jenkins-logo").click();
    await page.locator("#tasks a[href$='builds']").click(); 

    const buildLoc = page.locator("a[class='jenkins-badge model-link']");

    await buildLoc.hover();
    await page.locator(".jenkins-badge .jenkins-menu-dropdown-chevron").click();
    await page.locator(".jenkins-dropdown a[href$='confirmDelete']").click();
    await page.locator("button[name='Submit']").click();

    await page.locator(".app-jenkins-logo").click();
    await page.locator("#tasks a[href$='builds']").click(); 

    expect(buildLoc).toHaveCount(0);

  });

  test("TC_09.007.02 | Delete Build from Buildgs block", async({ page }: {page: Page}) => {
    const buildLoc = page.locator("#jenkins-build-history div");
    await page.locator(".app-builds-container__item .jenkins-card__reveal").click();

    await page.locator(".jenkins-dropdown a[href$='confirmDelete']").click();
    await page.locator("button[name='Submit']").click();

    expect(buildLoc).toHaveCount(0);
  });

});
