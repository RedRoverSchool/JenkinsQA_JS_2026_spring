import { faker } from "@faker-js/faker";
export const dataYV = {
    jobName: "Job",
    itemName: faker.color.human(),
    nestedFolder: faker.animal.cat(),
    descriptionText: faker.lorem.lines(),
    NewitemLink: `[href="/view/all/newJob"]`,
    logo: '.app-jenkins-logo',
    inputName: '#name',
    freestylePr: '.hudson_model_FreeStyleProject',
    okBtn: '#ok-button',
    descriptionField: 'textarea[name="description"]',
    saveBtn: '[name="Submit"]'
};
export class NewItemWhithDescription {
    logo;
    NewitemLink;
    inputName;
    freestylePr;
    okBtn;
    descriptionField;
    saveBtn;
    constructor(page) {
        this.NewitemLink = page.locator('[href="/view/all/newJob"]');
        this.logo = page.locator('.app-jenkins-logo');
        this.inputName = page.locator('#name');
        this.freestylePr = page.locator('.hudson_model_FreeStyleProject');
        this.okBtn = page.locator('#ok-button');
        this.descriptionField = page.locator('textarea[name="description"]');
        this.saveBtn = page.locator('[name="Submit"]');
    }
    ;
    async createNewitemDesc() {
        await this.NewitemLink.click();
        await this.inputName.fill(dataYV.itemName);
        await this.freestylePr.click();
        await this.okBtn.click();
        await this.descriptionField.fill(dataYV.descriptionText);
        await this.saveBtn.click();
        await this.logo.click();
    }
    ;
    async createFreestyleProj() {
        await this.NewitemLink.click();
        await this.inputName.fill(dataYV.itemName);
        await this.freestylePr.click();
        await this.okBtn.click();
        await this.logo.click();
    }
    ;
}
;
//# sourceMappingURL=yv-data.js.map