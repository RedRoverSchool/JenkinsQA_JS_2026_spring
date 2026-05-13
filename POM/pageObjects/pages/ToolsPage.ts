import { BasePage } from "./@components";

export class ToolsPage extends BasePage {
    async isToolsPageOpened() {
        await this.page.waitForURL(/.*configureTools/);
    }
}