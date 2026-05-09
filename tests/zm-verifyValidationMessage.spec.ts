import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/bs-data";
import { newItemData } from "./testData/zm-data";

test.describe("US_01.004 | New Item > Select an Item type", () => {
test("TC_01.004.16 | New Item > Verify validation message for invalid input", async ({page} : {page: Page}) => {
    await page.locator("#side-panel a[href$='newJob']").click();
    await page.locator("#name").fill(newItemData.inputCharName);
    await page.locator("li.org_jenkinsci_plugins_workflow_job_WorkflowJob").click();
    const warningMessage = await page.locator("#itemname-invalid");
    expect(warningMessage).toBeVisible;

});



});