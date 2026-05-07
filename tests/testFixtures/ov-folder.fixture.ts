import { test as base, Page } from '@/base';
import { folderData } from '@/tests/testData/ov-data';

type FolderFixture = {
    existingFolderName: string;
};

export const test = base.extend<FolderFixture>({
    existingFolderName: async ({page}, use) => {
        const folderName = folderData.generateName();

        await page.getByRole('link', { name: 'New Item'}).click();

        await page.getByRole('textbox', { name: 'Enter an item name' }).fill(folderName);
        await page.locator("li.com_cloudbees_hudson_plugins_folder_Folder").click();
        await page.getByRole('button', {name: 'OK'}).click();

        await page.locator('input[name="_.displayNameOrNull"]').fill(folderName);
        await page.getByRole('button', {name: 'Save'}).click();

        await use(folderName);
    }
});

export const expect = base.expect;
export type {Page};
