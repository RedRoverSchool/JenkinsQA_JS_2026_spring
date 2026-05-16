import { BasePage } from "./@components";

export class ConfigureFreestylePage extends BasePage {
  enableProjectSwitcher = () => this.page.locator(".jenkins-toggle-switch__label");
  saveChangesBtn = () => this.page.locator(".jenkins-submit-button");
  triggersSectionBtn = () => this.page.locator('button[data-section-id="triggers"]');
  triggersSectionTitle = () => this.page.locator("div.jenkins-section__title#triggers");
  authTokenField = () => this.page.locator('input[name="authToken"]');
  triggerBuildsRemotelyCheckbox = () =>
    this.page.locator("label.attach-previous").filter({ hasText: "Trigger builds remotely" });

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

  async checkTriggerBuildsRemotely() {
    await this.triggerBuildsRemotelyCheckbox().click();
    return this;
  }
}
