import { test, expect, Page } from "@/base";
import { scmData } from "./testData/nr-data";

test.describe("US_02.003 | Freestyle Project > SCM Options" , () => { 
    test.beforeEach(async ({ page }: { page: Page }) => {
       await page.locator("#side-panel a[href$='newJob']").click();
       await page.locator("#name").fill(scmData.jobName);
       await page.locator("li.hudson_model_FreeStyleProject").click();
       await page.locator("#ok-button").click();
    });

    test("TC_02.003.07 | Verify SCM options are displayed", async ({ page }: { page: Page }) => { 
        await page.locator("#source-code-management").click();

        const noneOption = page.getByRole("radio", { name: scmData.none });
        await expect(noneOption).toBeVisible();

        const gitOption = page.getByRole("radio", { name: scmData.git });
        await expect(gitOption).toBeVisible();
    });
});