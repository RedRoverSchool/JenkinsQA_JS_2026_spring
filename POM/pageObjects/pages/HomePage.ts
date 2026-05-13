import { BasePage } from './@components';

export class HomePage extends BasePage {
  // locators
  newItemLink = () => this.page.locator("#side-panel a[href$='newJob']");
  itemName = () => this.page.locator('#projectstatus .jenkins-table__link');
  projectTableRow = (itemName: string) => this.page.locator(`tr#job_${itemName}`);

  // actions
  async clickNewItemLink() {
    await this.newItemLink().click();
  }

  async clickItemNameLink() {
    await this.itemName().dispatchEvent('click');
  }
}
