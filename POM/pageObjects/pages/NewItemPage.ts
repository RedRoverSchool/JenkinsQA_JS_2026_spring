import { BasePage } from './@components';

export class NewItemPage extends BasePage {
  itemNameField = () => this.page.locator("#name");
  newItemTitle = () => this.page.getByRole("heading");
  newItemLink = () => this.page.locator("#side-panel a[href$='newJob']");

  itemType_FreestyleProject = () =>
    this.page.locator(".hudson_model_FreeStyleProject");

  itemType_Folder = () =>
    this.page.locator(".com_cloudbees_hudson_plugins_folder_Folder");

  itemNameValidationMessage = () =>
    this.page.locator("#itemname-required");

  errorMessage = () =>
    this.page.locator("#itemname-invalid");

  itemType_Pipeline = () =>
    this.page.locator("[class='org_jenkinsci_plugins_workflow_job_WorkflowJob']");

  duplicateItemNameWarning = () =>
    this.page.getByText("A job already exists with the name");

  itemType_OrganizationFolder = () =>
    this.page.getByRole("radio", { name: "Organization Folder Creates a" });

  okButton = () => this.page.locator("#ok-button");
  itemTypesOptions = () => this.page.locator('.j-item-options .label');


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

  async clickFolder() {
    await this.itemType_Folder().click();
    return this;
  }

  async clickFolderAndOkButton() {
    await this.itemType_Folder().click();
    await this.okButton().click();
  }

  async createFolder(name: string) {
  const newItemButton = this.newItemLink();
  if (await newItemButton.isVisible()) {
    await newItemButton.click();
  }
    await this.fillItemNameField(name);
    await this.clickFolderAndOkButton();
  }

  async clickPipeline() {
    await this.itemType_Pipeline().click();
    return this;
  }

  async createFreestyleProject(name: string) {
    await this.fillItemNameField(name);
    await this.clickFreestyleProject();
    await this.clickOkButton();
  }

  async clickOrganizationFolder() {
    await this.itemType_OrganizationFolder().click();
    return this;
  }

}
