import { BasePage } from "./@components";

export class HomePage extends BasePage {
	// locators
	newItemLink = () => this.page.locator("#side-panel a[href$='newJob']");
	itemName = () => this.page.locator("#projectstatus .jenkins-table__link");
	arrowButton = () => this.page.locator("button.jenkins-menu-dropdown-chevron");
	jobDropdownMenu = () => this.page.locator("div[id^='tippy-'] .jenkins-dropdown");

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
	}

	async selectJobDropdownOption(optionName: string) {
		await this.jobDropdownMenu().getByText(optionName).click();
	}	
}
