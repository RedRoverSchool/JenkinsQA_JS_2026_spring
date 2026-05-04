import { test, expect, Page } from "@/base";
import { openNewItemPage } from "./testData/tl-data";

test.describe("US_01.005 | New Item > Create Multibranch Pipeline", () => {
  test("TC_01.005.01 | Verify Multibranch Pipeline type is displayed", async ({ page }: { page: Page }) => {
    await openNewItemPage(page);

    await expect(page.getByText("Multibranch Pipeline")).toBeVisible();
  });
});