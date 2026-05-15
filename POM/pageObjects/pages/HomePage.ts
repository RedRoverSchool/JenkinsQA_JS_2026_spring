import { BasePage } from './@components';

export class HomePage extends BasePage {
  // locators
  newItemLink = () => this.page.locator("#side-panel a[href$='newJob']");
  itemName = () => this.page.locator('#projectstatus .jenkins-table__link');
  itemMenuChevron = () => this.page.locator('button.jenkins-menu-dropdown-chevron');
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

  async hoverItemName() {
    await this.itemName().hover();
    return this;
  }

  async openItemDropdownMenu() {
    await this.itemMenuChevron().click();
    return this;
  }

  async clickItemDropDownConfigureButton(jobName: string) {
    await this.itemDropDownConfigureButton(jobName).click();
  }
}
