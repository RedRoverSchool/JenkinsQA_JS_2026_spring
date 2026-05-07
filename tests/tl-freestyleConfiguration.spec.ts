import { test, expect, Page } from "@/base";
import { createFreestyleProject, newItemData, freestyleConfigData } from "./testData/tl-data";

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

});

test.describe("US_02.003 | Freestyle Project Configuration > Configure SCM", () => {
  test("TC_02.003.02 | Verify Source Code Management section is available", async ({ page }: { page: Page }) => {
    await createFreestyleProject(page);
    await page.getByRole("link", { name: "Configure" }).click();

    await expect(page.locator("#source-code-management")).toBeVisible();
  });

});