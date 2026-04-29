import {Page} from "@playwright/test";

export const jenkinsData = {
    jobName: Math.random().toString(36).substring(2, 5),
    libraryName: "LibraryName",
}

export const jenkinsLocators = {
    newItemButton: "a[href='/view/all/newJob']",
    inputField: "#name",
    folderType: ".com_cloudbees_hudson_plugins_folder_Folder",
    okButton: "#ok-button",
    submitButton: "button[name='Submit']",
    jenkinsLogo: ".app-jenkins-logo",
    propertiesButton: "button[data-section-id='properties']",
    addButton: ".jenkins-button.repeatable-add",
    libraryInputField: ".setting-main input[checkdependson='name']",
}

export async function createNewItem(page : Page) : Promise<void> {
    await page.locator(jenkinsLocators.newItemButton).click();
    await page.locator(jenkinsLocators.inputField).fill(jenkinsData.jobName);
    await page.locator(jenkinsLocators.folderType).click();
    await page.locator(jenkinsLocators.okButton).click();
    await page.locator(jenkinsLocators.submitButton).click();
    await page.locator(jenkinsLocators.jenkinsLogo).click();
}
