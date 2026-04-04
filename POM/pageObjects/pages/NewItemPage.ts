import { BasePage } from "./@components";

export class NewItemPage extends BasePage {
	// locators
	itemNameField = () => this.page.locator("#name");
	freestyleProject = () => this.page.locator(".hudson_model_FreeStyleProject");
	okButton = () => this.page.locator("#ok-button");

	// actions
	async fillItemNameField(name: string) {
		await this.itemNameField().fill(name);
		return this; // staying on the same page, returning the same page object. needed for chaining.
	}

	async clickFreestyleProject() {
		await this.freestyleProject().click();
		return this;
	}

	async clickOkbutton() {
		await this.okButton().click(); // not doing "return this;", since we are going to the next page
	}
}
