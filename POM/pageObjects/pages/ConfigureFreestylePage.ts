import { BasePage } from "./@components";

export class ConfigureFreestylePage extends BasePage {
  saveButton = () => this.page.locator('button[name="Submit"]');
  enableProjectSwitcher = () =>
    this.page.locator(".jenkins-toggle-switch__label");
  saveChangesBtn = () => this.page.locator(".jenkins-submit-button");
  triggersSectionBtn = () => this.page.locator('button[data-section-id="triggers"]');
  triggersSectionTitle = () => this.page.locator("div.jenkins-section__title#triggers");

  async clickSaveButton() {
    await this.saveButton().click();
    return this;
  }

  async disableProject() {
    await this.enableProjectSwitcher().uncheck();
    return this;
  }

  async saveChanges() {
    await this.saveChangesBtn().click();
  }

  async goToTriggersSection() {
    await this.triggersSectionBtn().click();
    return this;
  }
}
