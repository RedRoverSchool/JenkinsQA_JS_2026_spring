import { BasePage } from "./@components";

export class ToolsPage extends BasePage {
    async verifyToolsPageOpened() {
        await this.page.waitForURL(/.*configureTools/);
    }
}