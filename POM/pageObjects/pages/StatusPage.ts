import { BasePage } from "./@components";


export class StatusPage extends BasePage {

    addDescriptionButton = () => this.page.locator("a[href='editDescription']");
    previewLink = () => this.page.locator("a[previewendpoint='/markupFormatter/previewDescription']");
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