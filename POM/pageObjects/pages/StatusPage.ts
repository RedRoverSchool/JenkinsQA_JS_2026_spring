import { BasePage } from "./@components";

export class StatusPage extends BasePage {

    addDescriptionButton = () => this.page.locator("a[href='editDescription']");
    previewLink = () => this.page.getByRole('link', {name: 'Preview'});
    previewTextArea =() => this.page.locator(".textarea-preview");
    descriptionField = () => this.page.locator('textarea[name="description"]');
    saveButton = () => this.page.locator('[name="Submit"]');
    descriptionContent = () => this.page.locator('#description-content');

    async clickAddDescriptionBtn(){
        await this.addDescriptionButton().click();
        return this;
    }

    async clickPreviewLink(){
        await this.previewLink().click();
        return this;
    }

    async fillDescription(descriptionText:string){
        await this.descriptionField().fill(descriptionText);
        return this;
    }

    async clickSaveButton(){
        await this.saveButton().click();
    }
}