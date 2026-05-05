import {test, expect, Page} from "@/base";
import {YMdata} from "./testData/ym-data"

test.describe("US_09.001 | Build history > Core Build History Display", () =>{
  test("TC_09.001.01 | Item displays on Build History page after building", async({ page })=>{
    await page.locator("#tasks a[href$='newJob']").click();
    await page.locator("#name").fill(YMdata.jobNameYM);
    await page.locator("#items li[class$='FreeStyleProject']").click();
    await page.locator("#ok-button").click();

    await page.locator("button[name = 'Submit']").click();
    await page.locator("#tasks a[href*='build']").click();
    await page.locator(".app-jenkins-logo").click();
    await page.locator("#tasks a[href$='builds']").click();

    const item = await page.locator("#projectStatus .jenkins-table__link").getAttribute("href");

    expect(item).toContain(YMdata.jobNameYM);

  });

});