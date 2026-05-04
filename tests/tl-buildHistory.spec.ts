import { test, expect, Page } from "@/base";

test.describe("US_09.001 | Build History > Core Build History Display", () => {
  test("TC_09.001.02 | Verify Build History option is accessible from Dashboard", async ({ page }: { page: Page }) => {
    await page.getByRole("link", { name: "Build History" }).click();

    await expect(page).toHaveURL(/builds/);
  });
});