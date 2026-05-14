import { BasePage } from "./@components";

export class ManageJenkinsPage extends BasePage {
        
    // locators
    plugins = () => this.page.locator("a[href$='pluginManager']");
    tools = () => this.page.locator("a[href$='configureTools']");

    // actions
    async clickPlugins() {
        await this.plugins().click();
    }

    async clickTools() {
        await this.tools().click();
    }
}