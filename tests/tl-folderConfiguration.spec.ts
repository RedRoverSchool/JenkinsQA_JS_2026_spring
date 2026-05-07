import { test, expect, Page } from "@/base";
import { commonLocators, createFolder, folderConfigData, folderConfigLocators, generateDescription, generateDisplayName } from "./testData/tl-data";

test.describe("US_05.001 | Folder Configuration > Display Name and Description", () => {

  test("TC_05.001.03 | Verify Configure page opens", async ({ page }: { page: Page }) => {
    await createFolder(page, folderConfigData.folderName);

    await page.locator(folderConfigLocators.configureLink).click();

    await expect(page).toHaveURL(/configure/);
  });

  test("TC_05.001.04 | Verify Display Name and Description fields are available", async ({ page }: { page: Page }) => {
    await createFolder(page, folderConfigData.folderName);

    await page.locator(folderConfigLocators.configureLink).click();

    await expect(page.getByLabel("Display Name")).toBeVisible();
    await expect(page.getByText("Description")).toBeVisible();
});

  test("TC_05.001.05 | Verify user can update Display Name", async ({ page }: { page: Page }) => {
    await createFolder(page, folderConfigData.folderName);

    await page.locator(folderConfigLocators.configureLink).click();

    await page.getByText("Display Name").locator("..").locator("input").fill(folderConfigData.displayName);

    await page.locator(commonLocators.submitButton).click();

    await expect(page.getByRole("heading", { name: folderConfigData.displayName })).toBeVisible();
  });

  test("TC_05.001.06 | Verify user can update Description", async ({ page }: { page: Page }) => {
    await createFolder(page, folderConfigData.folderName);

    await page.goto(`/job/${folderConfigData.folderName}/configure`);

    const descriptionTextarea = page.locator(folderConfigLocators.descriptionTextarea);

    await descriptionTextarea.clear();
    await descriptionTextarea.fill(folderConfigData.updatedDescription);
    await descriptionTextarea.press("Tab");

    await page.locator(commonLocators.submitButton).click();

    await expect(page.locator("#main-panel").getByText(folderConfigData.updatedDescription, { exact: true })).toBeVisible();
  });

  test("TC_05.001.07 | Verify empty Display Name and Description can be saved", async ({ page }: { page: Page }) => {
    await createFolder(page, folderConfigData.folderName);

    await page.goto(`/job/${folderConfigData.folderName}/configure`);

    await page.locator("input[name='_.displayNameOrNull']").fill(generateDisplayName());
    await page.locator("textarea").fill(generateDescription());
    await page.locator(commonLocators.submitButton).click();

    await page.getByRole("link", { name: "Configure" }).click();

    await page.locator("input[name='_.displayNameOrNull']").clear();
    await page.locator("textarea").clear();
    await page.locator(commonLocators.submitButton).click();
    
    await expect(page.getByRole("link", { name: "Configure" })).toBeVisible();
  });

  test("TC_05.001.08 | Verify Apply saves changes without leaving page", async ({ page }: { page: Page }) => {
    const displayName = generateDisplayName();
    const description = generateDescription();
    const folderName = await createFolder(page);

    await page.goto(`/job/${folderName}/configure`);

    await page.locator("input[name='_.displayNameOrNull']").fill(displayName);
    await page.locator("textarea").fill(description);
    await page.locator("button[name='Apply']").click();

    await expect(page).toHaveURL(/configure/);
    await expect(page.locator("input[name='_.displayNameOrNull']")).toHaveValue(displayName);
    await expect(page.locator("textarea")).toHaveValue(description);
  });
});

test.describe("US_05.004 | Folder Configuration > Save or Apply", () => {
  test("TC_05.004.01 | Verify Save and Apply buttons are displayed", async ({ page }: { page: Page }) => {
    const folderName = await createFolder(page);

    await page.goto(`/job/${folderName}/configure`);

    await expect(page.locator(commonLocators.submitButton)).toBeVisible();
    await expect(page.locator(commonLocators.applyButton)).toBeVisible();
  });
  
});