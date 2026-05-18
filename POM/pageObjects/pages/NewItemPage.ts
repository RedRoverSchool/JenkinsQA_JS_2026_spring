import { BasePage } from "./@components";

export class NewItemPage extends BasePage {
  itemNameField = () => this.page.locator("#name");
  newItemTitle = () => this.page.getByRole("heading");
  itemType_FreestyleProject = () =>
    this.page.locator(".hudson_model_FreeStyleProject");
  itemType_Folder = () =>
    this.page.locator(".com_cloudbees_hudson_plugins_folder_Folder");
  itemNameValidationMessage = () => this.page.locator("#itemname-required");
  duplicateItemNameWarning = () =>
    this.page.getByText("A job already exists with the name");
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

  async clickFolderAndOkButton() {
    await this.itemType_Folder().click();
    await this.okButton().click();
  }

  async clickOkButton() {
    await this.okButton().click();
  }

  async createFolder(name: string) {
    await this.fillItemNameField(name);
    await this.clickFolderAndOkButton();
  }

  async createFreestyleProject(name: string) {
    await this.fillItemNameField(name);
    await this.clickFreestyleProject();
    await this.clickOkButton();
  }
}
