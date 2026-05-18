import { BasePage } from "./@components";

export class ToolsPage extends BasePage {

    sectionLocator = (sectionName: string) => this.page.locator(".jenkins-section__title").filter({ hasText: sectionName });

    async getCurrentUrl() {
        return this.page.url();
    }
}
