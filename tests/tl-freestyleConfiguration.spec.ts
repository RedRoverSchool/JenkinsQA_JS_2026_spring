import { test, expect, Page } from "@/base";
import { createFreestyleProject, newItemData } from "./testData/tl-data";

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

});