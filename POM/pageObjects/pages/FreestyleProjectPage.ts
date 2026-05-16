import { BasePage } from "./@components";

export class FreestyleProjectPage extends BasePage {
  // locators
  deleteProjectBtn = () => this.page.locator('a[data-title="Delete Project"]');
  confirmDeleteBtn = () => this.page.locator("button[data-id=ok]");
  disabledProjectWarning = () => this.page.locator('form[id="enable-project"]');
  enableProjectBtn = () => this.page.locator('button[value="Enable"]');
  activeNavLink = () => this.page.locator("a.task-link--active");
  permaLinksHeader = () => this.page.locator("h2.permalinks-header");

  // actions
  async clickDeleteProjectBtn() {
    await this.deleteProjectBtn().click();
    return this;
  }

  async clickYesInDeleteDialog() {
    await this.confirmDeleteBtn().click();
  }
}
