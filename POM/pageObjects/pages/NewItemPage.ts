import { BasePage } from "./@components";

export class NewItemPage extends BasePage {
	itemNameField = () => this.page.locator("#name");
	newItemTitle = () => this.page.getByRole("heading");
	itemType_FreestyleProject = () => this.page.locator(".hudson_model_FreeStyleProject");
	itemTypeMultibranchPipeline = () => this.page.locator(".org_jenkinsci_plugins_workflow_multibranch_WorkflowMultiBranchProject");
	itemNameValidationMessage = () => this.page.locator("#itemname-required");
	
	// itemType_Pipeline = () =>
	okButton = () => this.page.locator("#ok-button");

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
}
