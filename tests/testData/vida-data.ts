import { faker } from '@faker-js/faker';

export const jenkinsData = {
    jobName: faker.animal.cat(),
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
