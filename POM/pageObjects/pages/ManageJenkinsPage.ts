import { BasePage } from "./@components";

export class ManageJenkinsPage extends BasePage {
        
    // locators
    pluginsLink = () => this.page.getByRole("link", { name: 'Plugins Add, remove, disable' });

    // actions
    async clickPluginsLink() {
        await this.pluginsLink().click();
    }
}