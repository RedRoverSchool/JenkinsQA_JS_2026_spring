import { BasePage } from "./@components";

export class ConfigureOrganizationFolderPage extends BasePage {
    headerGeneral = () => this.page.locator("h2#general");
}