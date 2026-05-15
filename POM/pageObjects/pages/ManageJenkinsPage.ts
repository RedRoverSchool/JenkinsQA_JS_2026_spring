import { BasePage } from "./@components";

export class ManageJenkinsPage extends BasePage {
    toolsLink = () => this.page.locator("[href='configureTools']");
    pluginsLink = () => this.page.getByRole("link", { name: 'Plugins Add, remove, disable' });

    async clickToolsLink() {
        await this.toolsLink().click();
    }

    async clickPlugins() {
        await this.pluginsLink().click();
    }
}