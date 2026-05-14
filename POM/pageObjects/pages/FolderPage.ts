import {BasePage} from "@/POM/pageObjects/pages/@components";

export class FolderPage extends BasePage {
    configureButton = (itemName: string) => this.page.locator(`a[href="/job/${itemName}/configure"]`);

    async clickConfigureButton(itemName: string) {
        await this.configureButton(itemName).click();
    }
}