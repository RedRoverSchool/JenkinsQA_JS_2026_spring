import { test, expect, Page } from "@/base";
import { createFreestyleProject, newItemData, freestyleConfigData, commonLocators, generateDescription } from "./testData/tl-data";

test.describe("US_02.002 | Freestyle Project Configuration > Project Description", () => {

  test("TC_02.002.06 | Verify Description field is displayed", async ({ page }: { page: Page }) => {
    await createFreestyleProject(page, newItemData.freestyleProjectName);

    await page.locator("a[href$='/configure']").click();

    await expect(page.getByText("Description")).toBeVisible();
  });

  test("TC_02.002.07 | Verify Preview option is available", async ({ page }: { page: Page }) => {
    await createFreestyleProject(page, newItemData.freestyleProjectName);

    await page.locator("a[href$='/configure']").click();

    await expect(page.getByRole("link", { name: "Preview" })).toBeVisible();
});

  test("TC_02.002.08 | Verify description is displayed after Save", async ({ page }: { page: Page }) => {
    await createFreestyleProject(page, newItemData.freestyleProjectName);

    await page.goto(`/job/${newItemData.freestyleProjectName}/configure`);

    const descriptionTextarea = page.locator('textarea[name="description"]');

    await descriptionTextarea.clear();
    await descriptionTextarea.fill(freestyleConfigData.description);

    await page.locator("button[name='Submit']").click();

    await expect(page.locator("#main-panel").getByText(freestyleConfigData.description, { exact: true })).toBeVisible();
  });

  test("TC_02.002.09 | Verify description can be added from Status page", async ({ page }: { page: Page }) => {
    await createFreestyleProject(page);

    await page.locator("#description-link").click();
    const description = generateDescription();
    await page.locator("textarea").fill(description);
    await page.locator(commonLocators.submitButton).click();

    await expect(page.locator("#description-content").getByText(description, { exact: true })).toBeVisible();
  });
});