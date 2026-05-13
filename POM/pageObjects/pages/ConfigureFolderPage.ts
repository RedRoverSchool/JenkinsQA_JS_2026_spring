import { BasePage } from "./@components";
export class ConfigureFolderPage extends BasePage {

  generalSection = () => this.page.locator("#general");
  submitButton = () => this.page.locator("button[name='Submit']");

  async clickSaveButton() {
    await this.submitButton().click();
  }
};
