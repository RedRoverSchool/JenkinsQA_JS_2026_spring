import { BasePage } from "./@components";

export class FreestyleProjectPage extends BasePage {
  // locators
  deleteProjectBtn = () => this.page.locator('a[data-title="Delete Project"]');
  confirmDeleteBtn = () => this.page.locator("button[data-id=ok]");
  buildNowLink = () => this.page.getByRole("link", { name: "Build Now" });
  buildNumber = (buildNumber: string) => this.page.getByText(buildNumber);
  // actions
  async clickDeleteProjectBtn() {
    await this.deleteProjectBtn().click();
    return this;
  }

  async clickYesInDeleteDialog() {
    await this.confirmDeleteBtn().click();
  }

  async clickBuildNowLink() {
    await this.buildNowLink().click();
    return this;
  }
}
