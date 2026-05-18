import { BasePage } from "./@components";

export class ToolsPage extends BasePage {

    sectionLocator = (sectionName: string) => this.page.locator(".jenkins-section__title").filter({ hasText: sectionName });
    mavenSettingsSelect = () => this.page.locator('div.jenkins-form-item').filter({ hasText: 'Default settings provider' }).locator('select');
    mavenFilePathInput = () => this.page.locator('div.jenkins-form-item').filter({ hasText: 'File path' }).locator('input');

    async getCurrentUrl() {
        return this.page.url();
    }

    async clickMavenSettingsSelect() {
        await this.mavenSettingsSelect().click();
    }

    async selectSettingsFileInFilesystem() {
        await this.mavenSettingsSelect().selectOption("Settings file in filesystem");
    }
}
