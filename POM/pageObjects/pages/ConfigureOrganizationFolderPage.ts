import { BasePage } from "./@components";

export class ConfigureOrganizationFolderPage extends BasePage {
    contentTitle = () => this.page.locator("h2#general");
}