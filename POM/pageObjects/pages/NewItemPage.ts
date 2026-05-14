import { BasePage } from "./@components";

export class NewItemPage extends BasePage {
	itemNameField = () => this.page.locator("#name");
	itemType_FreestyleProject = () => this.page.locator(".hudson_model_FreeStyleProject");
	// itemType_Pipeline = () =>
	okButton = () => this.page.locator("#ok-button");
	errorMessage = () => this.page.locator("#itemname-invalid");
	

	async fillItemNameField(name: string) {
		await this.itemNameField().fill(name);
		return this;
	}

	async clickFreestyleProject() {
		await this.itemType_FreestyleProject().click();
		return this;
	}

	async clickOkButton() {
		await this.okButton().click();
	}

	async getErrorText() {
    	 return await this.errorMessage().innerText();
	}

}
