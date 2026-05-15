import { BasePage } from "./@components";

export class FolderPage extends BasePage {
  configureMenuItem = () => this.page.getByRole("link", { name: "Configure" });
  configureButton = (itemName: string) =>
    this.page.locator(`a[href="/job/${itemName}/configure"]`);

  async clickConfigureMenuItem() {
    await this.configureMenuItem().click();
  }

  async clickConfigureButton(itemName: string) {
    await this.configureButton(itemName).click();
  }
}
