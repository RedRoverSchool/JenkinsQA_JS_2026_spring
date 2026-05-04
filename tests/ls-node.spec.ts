import { test, expect, Page } from "../base";
import { jenkinsData } from "./testData/ls-data";

test.describe("US_10.009 | Manage Jenkins > Nodes", () => {
	test("TC_10.009.01 | Creating a new node", async ({ page }: { page: Page }) => {
		await page.locator("#root-action-ManageJenkinsAction").click();
		await page.locator(".jenkins-section__item a[href='computer']").click();
		
		await page.getByRole("link", { name: "New Node" }).click();
        
		await page.locator("#name").fill(jenkinsData.nodeName);
        await page.locator(".jenkins-radio__label").check();
		await page.locator("#ok").click();
        await page.getByRole("button", { name: "Save" }).click();

        const nodeLinks = await page.locator("a[href^='../computer']").allInnerTexts();
		expect(nodeLinks).toContain(jenkinsData.nodeName);
	});
});
