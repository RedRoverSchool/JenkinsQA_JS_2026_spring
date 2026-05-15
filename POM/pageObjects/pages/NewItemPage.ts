import { BasePage } from "./@components";

export class NewItemPage extends BasePage {
  itemNameField = () => this.page.locator("#name");
  newItemTitle = () => this.page.getByRole("heading");
  itemType_FreestyleProject = () =>
    this.page.locator(".hudson_model_FreeStyleProject");
  itemNameValidationMessage = () => this.page.locator("#itemname-required");
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

  async clickOkButton() {
    await this.okButton().click();
  }

  async createFreestyleProject(name: string) {
    await this.fillItemNameField(name);
    await this.clickFreestyleProject();
    await this.clickOkButton();

    return this;
  }
}
