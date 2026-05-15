import { faker } from "@faker-js/faker";
export const commonLocators = {
    submitButton: "button[name='Submit']",
    jenkinsLogo: ".app-jenkins-logo",
    applyButton: "button[name='Apply']",
};
export const generateProjectName = () => {
    return `test-${faker.string.alphanumeric(5)}`;
};
export const generateFolderName = () => {
    return `test-${faker.string.alphanumeric(8)}`;
};
export const generateDisplayName = () => {
    return faker.company.name();
};
export const generateDescription = () => {
    return faker.lorem.sentence();
};
export const newItemData = {
    invalidItemName: "test?item",
    freestyleProjectName: "test-freestyle-project",
    existingItemName: "existing-item",
};
export const newItemLocators = {
    newItemLink: "a[href='/view/all/newJob']",
    itemNameInput: "#name",
    freestyleProject: "#j-add-item-type-standalone-projects li[class*=FreeStyleProject]",
    multibranchPipeline: 'li:has-text("Multibranch Pipeline")',
    okButton: "#ok-button",
    invalidNameMessage: "#itemname-invalid",
};
export const folderConfigData = {
    folderName: "test-folder-config",
    displayName: "Updated Folder Display Name",
    updatedDescription: "Updated folder description.",
};
export const folderConfigLocators = {
    folderType: "li.com_cloudbees_hudson_plugins_folder_Folder",
    configureLink: "a[href$='/configure']",
    descriptionTextarea: "textarea",
};
export const freestyleConfigData = {
    description: "This project is used for automated CI/CD workflow testing.",
};
export async function openNewItemPage(page) {
    await page.goto("/");
    await page.locator(newItemLocators.newItemLink).click();
}
export async function createFolder(page, folderName = generateFolderName()) {
    await openNewItemPage(page);
    await page.locator(newItemLocators.itemNameInput).fill(folderName);
    await page.locator(folderConfigLocators.folderType).click();
    await page.locator(newItemLocators.okButton).click();
    await page.locator(commonLocators.submitButton).waitFor();
    await page.locator(commonLocators.submitButton).click();
    return folderName;
}
export async function createFreestyleProject(page, projectName = generateProjectName()) {
    await openNewItemPage(page);
    await page.locator(newItemLocators.itemNameInput).fill(projectName);
    await page.locator(newItemLocators.freestyleProject).click();
    await page.locator(newItemLocators.okButton).click();
    await page.locator(commonLocators.submitButton).click();
    return projectName;
}
export async function createBuilds(page, count) {
    for (let i = 1; i <= count; i++) {
        await page.getByRole("link", { name: "Build Now" }).click();
        await page.getByText(`#${i}`).waitFor();
    }
}
//# sourceMappingURL=tl-data.js.map