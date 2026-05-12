import { faker } from "@faker-js/faker";

export const folderData = {
    namePrefix: 'Test Folder',

    generateName(): string {
        return `${this.namePrefix} ${Date.now()}`;
    }
};

export const OrganizationFolderData = {
    editDisplayName: faker.word.noun()
};
