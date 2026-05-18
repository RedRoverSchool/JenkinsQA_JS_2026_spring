import { BasePage } from "./@components";

export class ConfigureFreestylePage extends BasePage {
  enableProjectSwitcher = () => this.page.locator(".jenkins-toggle-switch__label");
  saveChangesBtn = () => this.page.locator(".jenkins-submit-button");
  triggersSectionBtn = () => this.page.locator('button[data-section-id="triggers"]');
  triggersSectionTitle = () => this.page.locator("div.jenkins-section__title#triggers");

  async disableProject() {
    await this.enableProjectSwitcher().uncheck();
    return this;
  }
  async saveChanges() {
    await this.saveChangesBtn().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goToTriggersSection() {
    await this.triggersSectionBtn().click();
    return this;
  }
}
