import { BasePage } from "./@components";

export class StatusFolderPage extends BasePage {
    configureLink = () => this.page.locator('a[href*="/configure"]');

    async clickConfigureLink() {
        await this.configureLink().click();
        return this;
    }
}
