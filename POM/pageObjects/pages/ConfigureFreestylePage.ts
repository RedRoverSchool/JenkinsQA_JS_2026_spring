import { BasePage } from "./@components";

export class ConfigureFreestylePage extends BasePage {
    saveButton = () => this.page.locator("button[name='Submit']");

    async clickSaveButton() {
        await this.saveButton().click();
    }
}