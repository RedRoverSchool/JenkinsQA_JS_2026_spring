import { BasePage } from './@components';

export class HomePage extends BasePage {
	// locators
	newItemLink = () => this.page.locator("#side-panel a[href$='newJob']");
	itemName = () => this.page.locator("#projectstatus .jenkins-table__link");
	projectTableRow = (itemName: string) => this.page.locator(`tr#job_${itemName}`);
	arrowButton = () => this.page.locator("button.jenkins-menu-dropdown-chevron");
	dropdownMenu = () => this.page.locator("div[id^='tippy-'] .jenkins-dropdown");

	// actions
	async clickNewItemLink() {
	  await this.newItemLink().click();
	}

	async hoverItemName() {
	  await this.itemName().hover()
	  return this;
	}

	async clickArrowButton() {
	  await this.arrowButton().click();
	  return this;
	}

	async selectDropdownOption(optionName: string) {
	  await this.dropdownMenu().getByText(optionName).click();
	}

    async clickItemName() {
      await this.itemName().click();
    }

	async clickItemNameLink() {
      await this.itemName().focus();
      await this.itemName().press('Enter');
  }
}