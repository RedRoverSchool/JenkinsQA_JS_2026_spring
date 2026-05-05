import { test, expect, Page } from "@/base";
import { faker } from "@faker-js/faker";
import { createFreestyleProject, newItemData } from "./testData/tl-data";

test.describe("US_09.001 | Build History > Core Build History Display", () => {
  test("TC_09.001.02 | Verify Build History option is accessible from Dashboard", async ({ page }: { page: Page }) => {
    await page.getByRole("link", { name: "Build History" }).click();

    await expect(page).toHaveURL(/builds/);
  });

  test("TC_09.001.03 | Verify Build History displays list of builds", async ({ page }: { page: Page }) => {
    await createFreestyleProject(page, newItemData.freestyleProjectName);
    await page.goto(`/job/${newItemData.freestyleProjectName}/`);
    await page.getByRole("link", { name: "Build Now" }).click();
    await expect(page.getByText("#1")).toBeVisible();   
    
    await expect(page.locator("#main-panel")).toContainText(newItemData.freestyleProjectName);
  });

  test("TC_09.001.04 | Verify builds are ordered by most recent first", async ({ page }) => {
    const projectName = `test-${faker.string.alphanumeric(5)}`;

    await createFreestyleProject(page, projectName);
    await page.goto(`/job/${projectName}/`);

    await page.getByRole("link", { name: "Build Now" }).click();
    await expect(page.getByText("#1")).toBeVisible();

    await page.getByRole("link", { name: "Build Now" }).click();
    await expect(page.getByText("#2")).toBeVisible();

    const buildsText = await page.locator(".app-builds-container").textContent();

    expect(buildsText!).toContain("#2");
    expect(buildsText!).toContain("#1");
    expect(buildsText!.indexOf("#2")).toBeLessThan(buildsText!.indexOf("#1"));
  });

});