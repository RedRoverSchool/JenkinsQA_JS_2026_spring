import { Page } from "@/base";
import { faker } from "@faker-js/faker";

export const commonLocators = {
  submitButton: "button[name='Submit']",
};

export const generateProjectName = (): string => {
  return `test-${faker.string.alphanumeric(5)}`;
};

export const newItemData = {
  invalidItemName: "test?item",
  freestyleProjectName: "test-freestyle-project",
  existingItemName: "existing-item",
};

export const newItemLocators = {
  newItemLink: "a[href='/view/all/newJob']",
  itemNameInput: "#name",
  freestyleProject: "#j-add-item-type-standalone-projects li[class*=FreeStyleProject]",
  okButton: "#ok-button",
  invalidNameMessage: "#itemname-invalid",
};

export const folderConfigData = {
  folderName: "test-folder-config",
  displayName: "Updated Folder Display Name",
  updatedDescription: "Updated folder description.",
};

export const folderConfigLocators = {
  folderType: "li.com_cloudbees_hudson_plugins_folder_Folder",
  configureLink: "a[href$='/configure']",
  descriptionTextarea: "textarea",
};

export async function openNewItemPage(page: Page): Promise<void> {
  await page.goto("/");
  await page.locator(newItemLocators.newItemLink).click();
}

export async function createFolder(page: Page, folderName: string): Promise<void> {
  await openNewItemPage(page);
  await page.locator(newItemLocators.itemNameInput).fill(folderName);
  await page.locator(folderConfigLocators.folderType).click();
  await page.locator(newItemLocators.okButton).click();
  await page.locator("button[name='Submit']").waitFor();
  await page.locator("button[name='Submit']").click();
}

export async function createFreestyleProject(page: Page, projectName: string): Promise<void> {
  await openNewItemPage(page);
  await page.locator(newItemLocators.itemNameInput).fill(projectName);
  await page.locator(newItemLocators.freestyleProject).click();
  await page.locator(newItemLocators.okButton).click();
  await page.locator("button[name='Submit']").click();
}