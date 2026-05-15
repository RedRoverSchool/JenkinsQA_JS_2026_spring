import { BasePage } from "./@components";

export class ConfigureFolderPage extends BasePage {
  propertiesButton = () =>
    this.page.locator("button[data-section-id='properties']");
  addButton = () => this.page.locator(".jenkins-button.repeatable-add");
  libraryInputField = () =>
    this.page.locator(".setting-main input[checkdependson='name']");
  generalSection = () => this.page.locator("#general");
  submitButton = () => this.page.locator("button[name='Submit']");
  displayNameInput = () =>
    this.page.locator('input[name="_.displayNameOrNull"]');
  descriptionInput = () => this.page.locator("textarea");
  applyButton = () => this.page.locator('button[name="Apply"]');

  async clickPropertiesButton() {
    await this.propertiesButton().click();
    return this;
  }

  async clickAddButton() {
    await this.addButton().click();
    return this;
  }

  async fillLibraryName(libraryName: string) {
    await this.libraryInputField().fill(libraryName);
    return this;
  }

  async fillDisplayName(displayName: string) {
    await this.displayNameInput().fill(displayName);
    return this;
  }

  async fillDescription(description: string) {
    await this.descriptionInput().fill(description);
    return this;
  }

  async clickApplyButton() {
    await this.applyButton().click();
    return this;
  }
  async clickSaveButton() {
    await this.submitButton().click();
  }
}
