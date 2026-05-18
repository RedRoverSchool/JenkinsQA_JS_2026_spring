import { BasePage } from "./@components";

export class ConfigureFreestylePage extends BasePage {
  enableProjectSwitcher = () => this.page.locator(".jenkins-toggle-switch__label");
  saveChangesBtn = () => this.page.locator(".jenkins-submit-button");
  triggersSectionBtn = () => this.page.locator('button[data-section-id="triggers"]');
  triggersSectionTitle = () => this.page.locator("div.jenkins-section__title#triggers");
  authTokenField = () => this.page.locator('input[name="authToken"]');
  triggerBuildsRemotelyCheckbox = () =>
    this.page.locator("label.attach-previous").filter({ hasText: "Trigger builds remotely" });
  buildAfterOtherProjectsCheckBox = () =>
    this.page
      .locator("label.attach-previous")
      .filter({ hasText: "Build after other projects are built" });
  projectsToWatchInput = () => this.page.locator('input[name="_.upstreamProjects"]');

  async disableProject() {
    await this.enableProjectSwitcher().uncheck();
    return this;
  }
  async saveChanges() {
    await this.saveChangesBtn().click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async goToTriggersSection() {
    await this.triggersSectionBtn().click();
    return this;
  }

  async enableTriggerBuildsRemotely() {
    await this.triggerBuildsRemotelyCheckbox().click();
    return this;
  }

  async enableBuildAfterOtherProjectsCheckBox() {
    await this.buildAfterOtherProjectsCheckBox().click();
    return this;
  }
}
