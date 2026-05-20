import { BasePage } from "./@components";

export class StatusFreestyleProjectPage extends BasePage {
    // locators
    deleteProjectBtn = () =>
        this.page.locator('a[data-title="Delete Project"]');
    confirmDeleteBtn = () => this.page.locator("button[data-id=ok]");
    disabledProjectWarning = () =>
        this.page.locator('form[id="enable-project"]');
    enableProjectBtn = () => this.page.locator('button[value="Enable"]');
    activeNavLink = () => this.page.locator("a.task-link--active");
    addDescriptionButton = () => this.page.locator("a[href='editDescription']");
    previewLink = () =>
        this.page.locator(
            "a[previewendpoint='/markupFormatter/previewDescription']",
        );
    previewTextArea = () => this.page.locator(".textarea-preview");
    descriptionField = () => this.page.locator('textarea[name="description"]');
    saveButton = () => this.page.locator('[name="Submit"]');
    descriptionContent = () => this.page.locator("#description-content");

    // actions
    async clickDeleteProjectBtn() {
        await this.deleteProjectBtn().click();
        return this;
    }

    async clickYesInDeleteDialog() {
        await this.confirmDeleteBtn().click();
    }

    async clickAddDescriptionBtn() {
        await this.addDescriptionButton().click();
        return this;
    }

    async clickPreviewLink() {
        await this.previewLink().click();
        return this;
    }

    async fillDescription(descriptionText: string) {
        await this.descriptionField().fill(descriptionText);
        return this;
    }

    async clickSaveButton() {
        await this.saveButton().click();
    }
}
