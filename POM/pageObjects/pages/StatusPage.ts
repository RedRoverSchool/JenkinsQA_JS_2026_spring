import { BasePage } from "./@components";


export class StatusPage extends BasePage {

    addDescriptionButton = () => this.page.locator("a[href='editDescription']");
    previewLink = () => this.page.getByRole('link', {name: 'Preview'});
    previewTextArea =() => this.page.locator(".textarea-preview");

    async clickAddDescriptionBtn(){
        await this.addDescriptionButton().click();
        return this;
    }

    async clickPreviewLink(){
        await this.previewLink().click();
        return this;
    }
}