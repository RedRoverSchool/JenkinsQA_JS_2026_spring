import { BasePage } from "./@components";

export class ManageJenkinsPage extends BasePage {
        
    // locators
    pluginsLink = () => this.page.getByRole("link", { name: 'Plugins Add, remove, disable' });

    // actions
    async clickPlugins() {
        await this.pluginsLink().click();
    }
}