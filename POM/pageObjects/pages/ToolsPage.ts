import { BasePage } from "./@components";
import { expect } from "@playwright/test";

export class ToolsPage extends BasePage {

    sectionLocator = (sectionName: string) => this.page.locator(".jenkins-section__title").filter({ hasText: sectionName });
    mavenSettingsSelect = () => this.page.locator('div.jenkins-form-item').filter({ hasText: 'Default settings provider' }).locator('select');
    mavenFilePathInput = () => this.page.locator('div.jenkins-form-item').filter({ hasText: 'File path' }).locator('input').first();
    globalMavenSettingsSelect = () => this.page.locator('div.jenkins-form-item').filter({ hasText: 'Default global settings provider' }).locator('select');
    globalMavenFilePathInput = () => this.page.locator('div.jenkins-form-item').filter({ hasText: 'File path' }).locator('input').last();
    addJdkButton = () => this.page.getByRole('button', { name: 'Add JDK' }).first();
    jdkInstallationsButton = () => this.page.getByRole('button', { name: 'JDK installations' });
    saveButton = () => this.page.locator("button[name='Submit']");
    newJdkChunk = () => this.page.locator('div.repeated-chunk').first();
    newJdkNameInput = (name: string) => this.page.locator(`input[name="_.name"][value="${name}"]`);

    async getCurrentUrl() {
        return this.page.url();
    }

    async selectSettingsFileInFilesystem() {
        await this.mavenSettingsSelect().selectOption("Settings file in filesystem");
        return this;
    }

    async selectGlobalSettingsFileInFilesystem() {
        await this.globalMavenSettingsSelect().selectOption("Global settings file on filesystem");
        return this;
    }

    async clickSave() {
        await this.saveButton().click();
    }

    async fillJdkName(name: string) {
        await this.nameInput().fill(name);
    }

    async clickAddJdkWithFallback() {
        const addJdk = this.addJdkButton();
        if (await addJdk.isVisible().catch(() => false)) {
            await addJdk.click();
        } else {
            await this.jdkInstallationsButton().click();
            await expect(addJdk).toBeVisible();
            await addJdk.click();
        }
        return this;
    }

    getJdkNameInput() {
        return this.newJdkChunk().locator('input[name="_.name"]');
    }

    async clickJdkInstallationsButton() {
        await this.jdkInstallationsButton().click();
        return this;
    }

    getSavedJdkRow() {
        return this.newJdkChunk();
    }
    
}
