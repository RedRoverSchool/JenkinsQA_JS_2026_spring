import { BasePage } from "./@components";

export class ConfigureFreestylePage extends BasePage {
  enableProjectSwitcher = () => this.page.locator(".jenkins-toggle-switch__label");
  saveChangesBtn = () => this.page.locator(".jenkins-submit-button");

  async disableProject() {
    await this.enableProjectSwitcher().uncheck();
    return this;
  }
  async saveChanges() {
    await this.saveChangesBtn().click();
  }
}
