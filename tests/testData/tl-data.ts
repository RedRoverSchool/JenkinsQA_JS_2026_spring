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

export async function openNewItemPage(page: Page): Promise<void> {
  await page.locator(newItemLocators.newItemLink).click();
}