import { Page } from "@/base";

export const newItemData = {
  invalidItemName: "test?item",
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
};

export const folderConfigLocators = {
  folderType: "li.com_cloudbees_hudson_plugins_folder_Folder",
  configureLink: "a[href$='/configure']",
};

export async function openNewItemPage(page: Page): Promise<void> {
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