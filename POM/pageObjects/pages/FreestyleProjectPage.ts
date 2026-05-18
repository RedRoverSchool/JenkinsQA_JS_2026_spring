import { BasePage } from "./@components";

export class FreestyleProjectPage extends BasePage {
  // locators
  deleteProjectBtn = () => this.page.locator('a[data-title="Delete Project"]');
  confirmDeleteBtn = () => this.page.locator("button[data-id=ok]");
  buildNowLink = () => this.page.getByRole("link", { name: "Build Now" });
  buildNumber = (buildNumber: string) => this.page.getByText(buildNumber);
  disabledProjectWarning = () => this.page.locator('form[id="enable-project"]');
  enableProjectBtn = () => this.page.locator('button[value="Enable"]');
  activeNavLink = () => this.page.locator("a.task-link--active");

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
