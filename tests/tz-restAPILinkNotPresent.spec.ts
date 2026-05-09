import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/tz-data";

test.describe('US_15.002 | Footer > REST API', () => {

    test('TC_15.002.04  | REST API link is NOT displayed on admin page: Manage Jenkins', async( {page} : {page: Page} ) => {

        await page.locator('#root-action-ManageJenkinsAction').click()
        await expect (page.getByRole('link', {name:"api/"})).not.toBeVisible()

    });
});