import { faker } from "@faker-js/faker";
export const folderData = {
    namePrefix: 'Test Folder',
    generateName() {
        return `${this.namePrefix} ${Date.now()}`;
    }
};
export const OrganizationFolderData = {
    editDisplayName: faker.word.noun()
};
//# sourceMappingURL=ov-data.js.map