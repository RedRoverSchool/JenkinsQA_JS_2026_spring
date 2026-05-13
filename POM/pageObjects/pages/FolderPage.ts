import { BasePage } from "./@components";

export class FolderPage extends BasePage {
    configureLink = () => this.page.getByRole("link", { name: "Configure" });

    async clickConfigureLink() {
        await this.configureLink().click();
    }
}