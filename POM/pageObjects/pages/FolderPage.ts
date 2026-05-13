import { BasePage } from "./@components";

export class FolderPage extends BasePage {
    configureMenuItem = () => this.page.getByRole("link", { name: "Configure" });

    async clickConfigureMenuItem() {
        await this.configureMenuItem().click();
    }
}