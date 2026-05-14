import {BasePage} from "./@components";

export class ConfigureFolderPage extends BasePage {
    propertiesButton = () => this.page.locator("button[data-section-id='properties']")
    addButton = () => this.page.locator(".jenkins-button.repeatable-add")
    libraryInputField = () => this.page.locator(".setting-main input[checkdependson='name']")
    saveButton = () => this.page.locator("button[name='Submit']")

    async clickPropertiesButton() {
        await this.propertiesButton().click();
        return this;
    }

    async clickAddButton() {
        await this.addButton().click();
        return this;
    }

    async fillLibraryName(libraryName: string) {
        await this.libraryInputField().fill(libraryName);
        return this;
    }

    async clickSaveButton(itemName: string) {
        await this.saveButton().click();
        await this.page.goto(`/job/${itemName}/`)
    }
}