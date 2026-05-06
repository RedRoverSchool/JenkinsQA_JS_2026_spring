import { th } from "@faker-js/faker";
import {Page, Locator} from "@playwright/test"

export const dataYV ={
    jobName: "Job",
    itemName: `Item${Math.random().toString(36).substring(2,5)}`,
    nestedFolder: `Item${Math.random().toString(36).substring(2,5)}`,
    descriptionText: "Some text",
    NewitemLink: '[href="/view/all/newJob"]',
    logo: '.app-jenkins-logo',
    inputName: '#name',
    freestylePr:'.hudson_model_FreeStyleProject',
    okBtn:'#ok-button',
    descriptionField: `[name="description"].jenkins-input`,
    saveBtn:'[name="Submit"]'
}


export async function descItem(page:Page){
        await page.locator(dataYV.NewitemLink).click();
        await page.locator(dataYV.inputName).fill(dataYV.itemName);
        await page.locator(dataYV.freestylePr).click();
        await page.locator(dataYV.okBtn).click();
        await page.locator(dataYV.descriptionField).fill(dataYV.descriptionText);
        await page.locator(dataYV.saveBtn).click();
        await page.locator(dataYV.logo).click();
};


export class NewItemWhithDescription {

    readonly logo: Locator;
    readonly NewitemLink: Locator;
    readonly inputName: Locator;
    readonly freestylePr: Locator;
    readonly okBtn: Locator;
    readonly descriptionField: Locator;
    readonly saveBtn: Locator;

    constructor(page:Page) {

        page.NewitemLink = page.locator('[href="/view/all/newJob"]');
        page.logo = page.locator('.app-jenkins-logo');
        page.inputName = page.getByRole('textbox', {name: 'name'});
        page.freestylePr = page.locator('.hudson_model_FreeStyleProject');
        page.okBtn = page.locator('#ok-button');
        page.descriptionField = page.locator(`[name="description"].jenkins-input`);
        page.saveBtn = page.locator('[name="Submit"]');
    };

    async createNewitemDesc(){
        await page.NewitemLink.click();
        await page.inputName.fill(dataYV.itemName);
        await page.freestylePr.click();
        await page.okBtn.click();
        await page.descriptionField.fill(dataYV.descriptionText);
        await page.saveBtn.click();
        await page.logo.click();
    };
};