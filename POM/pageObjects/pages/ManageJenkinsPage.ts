import { BasePage } from "./@components";

export class ManageJenkinsPage extends BasePage {
        
    // locators
    pluginsLink = () => this.page.getByRole("link", { name: 'Plugins Add, remove, disable' });
    toolsLink = () => this.page.locator("a[href$='configureTools']");

    // actions
    async clickPluginsLink() {
        await this.pluginsLink().click();
    }

    async clickToolsLink() {
        await this.toolsLink().click();
    }
}