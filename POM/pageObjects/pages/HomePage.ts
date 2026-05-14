import { BasePage } from './@components';

export class HomePage extends BasePage {
  // locators
  newItemLink = () => this.page.locator("#side-panel a[href$='newJob']");
  itemName = () => this.page.locator('#projectstatus .jenkins-table__link');
  itemDropDownMenuButton = () => this.page.locator(".jenkins-table__link.model-link.inside");
  itemDropDownConfigureButton = (jobName: string) => this.page.locator(`a[href*='/job/${jobName}/configure']`);
  projectTableRow = (itemName: string) => this.page.locator(`tr#job_${itemName}`);


  // actions
  async clickNewItemLink() {
    await this.newItemLink().click();
  }

  async clickItemNameLink() {
    await this.itemName().focus();
    await this.itemName().press('Enter');
  }

  async clickItemDropDownMenuButton() {
    await this.itemDropDownMenuButton().click();
    return this
  }

  async clickItemDropDownConfigureButton(jobName: string) {
    await this.itemDropDownConfigureButton(jobName).click();
  }
}
