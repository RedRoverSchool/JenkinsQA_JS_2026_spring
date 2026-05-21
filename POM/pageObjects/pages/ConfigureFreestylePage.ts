import { BasePage } from "@/POM/pageObjects/pages/@components";

export class ConfigureFreestylePage extends BasePage {
    saveButton = () => this.page.locator('button[name="Submit"]');
    enableProjectSwitcher = () => this.page.locator(".jenkins-toggle-switch__label");
    saveChangesBtn = () => this.page.locator(".jenkins-submit-button");
    triggersSectionBtn = () => this.page.locator('button[data-section-id="triggers"]');
    triggersSectionTitle = () => this.page.locator("div.jenkins-section__title#triggers");
    authTokenField = () => this.page.locator('input[name="authToken"]');

    triggerBuildsRemotelyCheckbox = () =>
        this.page.locator("label.attach-previous").filter({ hasText: "Trigger builds remotely" });

    buildAfterOtherProjectsCheckBox = () =>
        this.page.locator("label.attach-previous").filter({ hasText: "Build after other projects are built" });

    buildPeriodicallyCheckbox = () =>
        this.page.locator("label.attach-previous").filter({ hasText: "Build periodically" });

    projectsToWatchInput = () => this.page.locator('input[name="_.upstreamProjects"]');
    previewLink = () => this.page.locator("a[previewendpoint='/markupFormatter/previewDescription']");
    previewTextArea = () => this.page.locator(".textarea-preview");
    descriptionField = () => this.page.locator('textarea[name="description"]');
    noProjectSpecifiedMessage = () => this.page.locator('.error').filter({ hasText: 'No project specified' })
    scheduleField = () => this.page.locator('textarea[name="_.spec"]');

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

    async clickPreviewLink() {
        await this.previewLink().click();
        return this;
    }

    async fillDescription(descriptionText: string) {
        await this.descriptionField().fill(descriptionText);
        return this;
    }

    async enableBuildPeriodicallyCheckbox() {
        await this.buildPeriodicallyCheckbox().click()
        return this;
    }
}
