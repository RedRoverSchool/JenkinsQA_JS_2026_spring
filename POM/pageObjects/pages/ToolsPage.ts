import { BasePage } from "./@components";

export class ToolsPage extends BasePage {
    async getCurrentUrl() {
        return this.page.url();
    }
}