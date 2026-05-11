import { test, expect, Page } from "@/base";
import { commonLocators, generateProjectName, newItemLocators, openNewItemPage } from "./testData/tl-data";

test.describe("US_01.005 | New Item > Multibranch Pipeline ", () => {
  test("TC_01.005.03 | Verify Multibranch Pipeline type is displayed", async ({ page }: { page: Page }) => {
    await openNewItemPage(page);

    await expect(page.getByText("Multibranch Pipeline")).toBeVisible();
  });

  test("TC_01.005.04 | Verify Multibranch Pipeline type can be selected", async ({ page }: { page: Page }) => {
    const projectName = generateProjectName();

    await openNewItemPage(page);

    await page.locator(newItemLocators.itemNameInput).fill(projectName);
    await page.getByText("Multibranch Pipeline").click();

    await expect(page.locator(newItemLocators.okButton)).toBeEnabled();
  });

  test("TC_01.005.05 | Verify OK button requires valid name and item type", async ({ page }: { page: Page }) => {
    const projectName = generateProjectName();
    await openNewItemPage(page);

    await expect(page.locator(newItemLocators.okButton)).toBeDisabled();

    await page.locator(newItemLocators.itemNameInput).fill(projectName);

    await expect(page.locator(newItemLocators.okButton)).toBeDisabled();

    await page.getByText("Multibranch Pipeline").click();

    await expect(page.locator(newItemLocators.okButton)).toBeEnabled();
  });

  test("TC_01.005.06 | Verify user can return to Dashboard without creating item", async ({ page }: { page: Page }) => {
    const dashboardProjectLinks = page.locator(".jenkins-table__link.model-link.inside");
    const beforeProjectLinksTexts = await dashboardProjectLinks.allTextContents();

    await openNewItemPage(page);
    await page.locator(commonLocators.jenkinsLogo).click();

    const afterProjectLinksTexts = await dashboardProjectLinks.allTextContents();

    expect(afterProjectLinksTexts).toEqual(beforeProjectLinksTexts);
  });

  test("TC_01.005.07 | Verify redirection to configuration page after creating Multibranch Pipeline", async ({ page }: { page: Page }) => {
    const projectName = generateProjectName();

    await openNewItemPage(page);

    await page.locator(newItemLocators.itemNameInput).fill(projectName);

    await page.locator(newItemLocators.multibranchPipeline).click();

    await page.locator(newItemLocators.okButton).click();

    await expect(page.locator("#branch-sources")).toBeVisible();
  });
});