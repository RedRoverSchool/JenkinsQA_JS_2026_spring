import { BasePage } from "./@components";

export class NewItemPage extends BasePage {
  itemNameField = () => this.page.locator("#name");
  itemType_FreestyleProject = () =>
    this.page.locator(".hudson_model_FreeStyleProject");
  itemNameValidationMessage = () => this.page.locator("#itemname-required");
  itemType_Folder = () =>
    this.page.locator(".com_cloudbees_hudson_plugins_folder_Folder");
  newItemTitle = () => this.page.getByRole("heading");
  // itemType_Pipeline = () =>
  okButton = () => this.page.locator("#ok-button");

  async fillItemNameField(name: string) {
    await this.itemNameField().fill(name);
    return this;
  }

  async clickFreestyleProject() {
    await this.itemType_FreestyleProject().click();
    return this;
  }

  async clickFolder() {
    await this.itemType_Folder().click();
    return this;
  }

  async clickOkButton() {
    await this.okButton().click();
  }
}
