import { BasePage } from './@components';

export class FreestyleProjectPage extends BasePage {
  // locators
  deleteProjectBtn = () => this.page.locator('a[data-title="Delete Project"]');
  confirmDeleteBtn = () => this.page.locator('button[data-id=ok]');

  // actions
  async clickDeleteProjectBtn() {
    await this.deleteProjectBtn().click();
    return this;
  }

  async clickYesInDeleteDialog() {
    await this.confirmDeleteBtn().click();
  }
}
