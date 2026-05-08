import { test as base, Page } from '@/base';
import { folderData } from '@/tests/testData/ov-data';

type OrganizationFolderFixture = {
    organizationFolderName: string;
};

export const test = base.extend<OrganizationFolderFixture>({
    organizationFolderName: async ({page}, use) => {
        const organizationFolderName = folderData.generateName();

        await page.getByRole('link', { name: 'New Item'}).click();

        await page.getByRole('textbox', { name: 'Enter an item name' }).fill(organizationFolderName);
        await page.getByRole('radio', { name: 'Organization Folder Creates a' }).click();
        await page.getByRole('button', {name: 'OK'}).click();

        await page.locator('input[name="_.displayNameOrNull"]').fill(organizationFolderName);
        await page.getByRole('button', {name: 'Save'}).click();

        await use(organizationFolderName);
    }
});

export const expect = base.expect;
export type {Page};
