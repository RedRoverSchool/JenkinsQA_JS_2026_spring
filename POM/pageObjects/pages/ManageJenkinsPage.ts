import { BasePage } from "./@components";

export class ManageJenkinsPage extends BasePage {
    toolsLink = () => this.page.locator("[href='configureTools']");
    
    async clickToolsLink() {
        await this.toolsLink().click();
    }
}