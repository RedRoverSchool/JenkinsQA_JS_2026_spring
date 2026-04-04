import { BasePage } from "./@components";

export class HomePage extends BasePage {
	// locators
	newItemLink = () => this.page.locator("#side-panel a[href$='newJob']");
	buildHistoryLink = () => this.page.locator("#side-panel a[href$='builds']");
	itemName = () => this.page.locator("#projectstatus .jenkins-table__link");

	// actions
	async clickNewItemLink() {
		await this.newItemLink().click(); // not doing "return this;", since we are going to the next page
	}

	async clickBuildHistoryLink() {
		await this.buildHistoryLink().click();
	}
}
