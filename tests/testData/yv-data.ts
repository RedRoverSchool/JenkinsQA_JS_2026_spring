
import { faker, Faker } from "@faker-js/faker";
import {Page, Locator} from "@playwright/test"



export const dataYV ={
    jobName: "Job",
    itemName: faker.string.alphanumeric(7),
    nestedFolder: faker.string.alphanumeric(8),
    descriptionText: faker.lorem.lines(),
    NewitemLink: `[href="/view/all/newJob"]`,
    logo: '.app-jenkins-logo',
    inputName: '#name',
    freestylePr:'.hudson_model_FreeStyleProject',
    okBtn:'#ok-button',
    descriptionField: 'textarea[name="description"]',
    saveBtn:'[name="Submit"]',

    itemTypes: {
        pipeline:{
            name: 'Pipeline',
            locator: '.org_jenkinsci_plugins_workflow_job_WorkflowJob'
        },
        freestyleproject: {
            name: 'Freestyle project',
            locator: '.hudson_model_FreeStyleProject'
        },
        multiConfiguration: {
            name: 'Multi-configuration project',
            locator: '.hudson_matrix_MatrixProject'
        },
        folder: {
            name: 'Folder',
            locator: '.com_cloudbees_hudson_plugins_folder_Folder'
        },
        multibranchPipeline: {
            name: 'Multibranch Pipeline project',
            locator: '.org_jenkinsci_plugins_workflow_multibranch_WorkflowMultiBranchProject'
        },
        organization: {
            name: 'Organization Folder',
            locator: '.jenkins_branch_OrganizationFolder'
        }
    }
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

        this.NewitemLink = page.locator(dataYV.NewitemLink);
        this.logo = page.locator(dataYV.logo);
        this.inputName = page.locator(dataYV.inputName);
        this.freestylePr = page.locator(dataYV.itemTypes.freestyleproject.locator);
        this.okBtn = page.locator(dataYV.okBtn);
        this.descriptionField = page.locator(dataYV.descriptionField);
        this.saveBtn = page.locator(dataYV.saveBtn);
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

    async createFreestyleProj(){
        await this.NewitemLink.click();
        await this.inputName.fill(dataYV.itemName);
        await this.freestylePr.click();
        await this.okBtn.click();
        await this.logo.click();
    };
};