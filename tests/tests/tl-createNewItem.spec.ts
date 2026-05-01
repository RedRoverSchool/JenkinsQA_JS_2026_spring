import { test, expect, Page } from "@/base";

test.describe("US_01.001 | New Item > Create a new item", () => {
  test("TC_01.001.21 | Verify new item page opens from dashboard", async ({ page }: { page: Page }) => {
    // Locators
    const newItemLink = page.getByRole("link", { name: "New Item" });
    const itemNameInput = page.locator("#name");
    const okButton = page.locator("#ok-button");

    // Steps
    await newItemLink.click();

    // Expected results
    await expect(page).toHaveURL(/newJob/);
    await expect(itemNameInput).toBeVisible();
    await expect(okButton).toBeVisible();
  });
});