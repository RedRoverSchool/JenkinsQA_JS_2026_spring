
import {Page, Locator} from "@playwright/test"

export const dataYV ={
    jobName: "Job",
    itemName: `Item${Math.random().toString(36).substring(2,5)}`,
    nestedFolder: `Item${Math.random().toString(36).substring(2,5)}`,
    descriptionText: "Some text",
    NewitemLink: `[href="/view/all/newJob"]`,
    logo: '.app-jenkins-logo',
    inputName: '#name',
    freestylePr:'.hudson_model_FreeStyleProject',
    okBtn:'#ok-button',
    descriptionField: 'textarea[name="description"]',
    saveBtn:'[name="Submit"]'
}

export class NewItemWhithDescription {

    readonly logo: Locator;
    readonly NewitemLink: Locator;
    readonly inputName: Locator;
    readonly freestylePr: Locator;
    readonly okBtn: Locator;
    readonly descriptionField: Locator;
    readonly saveBtn: Locator;

    constructor(page:Page) {

        this.NewitemLink = page.locator('[href="/view/all/newJob"]');
        this.logo = page.locator('.app-jenkins-logo');
        this.inputName = page.locator('#name');
        this.freestylePr = page.locator('.hudson_model_FreeStyleProject');
        this.okBtn = page.locator('#ok-button');
        this.descriptionField = page.locator('textarea[name="description"]');
        this.saveBtn = page.locator('[name="Submit"]');
    };

    async createNewitemDesc(){
        await this.NewitemLink.click();
        await this.inputName.fill(dataYV.itemName);
        await this.freestylePr.click();
        await this.okBtn.click();
        await this.descriptionField.fill(dataYV.descriptionText);
        await this.saveBtn.click();
        await this.logo.click();
    };
};