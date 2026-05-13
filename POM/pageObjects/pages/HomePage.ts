import { BasePage } from "./@components";

export class HomePage extends BasePage {
	// locators
	newItemLink = () => this.page.locator("#side-panel a[href$='newJob']");
	itemName = () => this.page.locator("#projectstatus .jenkins-table__link");

	// actions
	async clickNewItemLink() {
		await this.newItemLink().click();
	}
}
