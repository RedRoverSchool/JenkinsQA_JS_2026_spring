import { test, expect, Page } from "@/base";
import { generateProjectName, createFreestyleProject, newItemData, createBuilds } from "./testData/tl-data";

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
    const projectName = generateProjectName();

    await createFreestyleProject(page, projectName);
    await page.goto(`/job/${projectName}/`);

    await page.getByRole("link", { name: "Build Now" }).click();
    await page.getByText("#1").waitFor();

    await page.getByRole("link", { name: "Build Now" }).click();
    await page.getByText("#2").waitFor();

    const buildsText = await page.locator(".app-builds-container").textContent();

    expect(buildsText!.indexOf("#2")).toBeLessThan(buildsText!.indexOf("#1"));
  });

  test("TC_09.001.05 | Verify successful build entry displays success status icon", async ({ page }: { page: Page }) => {
    const projectName = await createFreestyleProject(page);

    await page.getByRole("link", { name: "Build Now" }).click();
    await page.getByText("#1").waitFor();

    await page.goto("/view/all/builds");

    const successfulBuildEntry = page.locator("tr", { hasText: projectName });
    const successIcon = successfulBuildEntry.locator("svg#blue");

    await expect(successIcon).toBeVisible();
  });

  test("TC_09.001.06 | Verify build number links to Build Summary page", async ({ page }: { page: Page }) => {
    await createFreestyleProject(page);
    await createBuilds(page, 1);

    await page.locator(".jenkins-card__title-link.jenkins-card__reveal").click();

    const buildLink = page.locator("#trend tbody tr td:nth-child(2) a").first();

    const buildNumber = await buildLink.textContent();
    const buildId = buildNumber?.replace("#", "");

    await expect(buildLink).toHaveAttribute("href", new RegExp(`${buildId}/?$`));
  });
});

test.describe("US_09.002 | Build History > Sorting", () => {
  test("TC_09.002.01 | Verify columns are sortable", async ({ page }: { page: Page }) => {
    await createFreestyleProject(page);
    await createBuilds(page, 1);

    await createFreestyleProject(page);
    await createBuilds(page, 1);

    await page.goto("/view/all/builds");

    const buildColumnValues = page.locator("table tbody tr td:nth-child(2)");
    const beforeSorting = await buildColumnValues.allTextContents();

    const sortableHeader = page.locator("th[initialsortdir='up'] a.sortheader");

    await sortableHeader.click();

    const afterSorting = await buildColumnValues.allTextContents();

    expect(afterSorting).not.toEqual(beforeSorting);
  });
});