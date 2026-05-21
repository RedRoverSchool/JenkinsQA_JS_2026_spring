import { test as base } from "@/POM/fixtures/baseFixtures";
import { App } from "@/POM/pageObjects/App";
import { newItemPageData } from "@/POM/testData/newItemPageData";

export interface Fixtures {
	createJob: (itemName: string, itemType: string, isRedirectToHome: boolean) => Promise<void>;
}

export const test = base.extend<Fixtures>({
	createJob: async ({ page }, use) => {
		const create = async (itemName: string, itemType: string, isRedirectToHome: boolean) => {
			const app = new App(page);

			await app.homePage.clickNewItemLink();

			await app.newItemPage.fillItemNameField(itemName);
			await app.newItemPage.clickItemType(itemType);
			await app.newItemPage.clickOkButton();

			if (isRedirectToHome) {
				switch (itemType) {
					case newItemPageData.itemTypes.pipeline:
						await app.configurePipelinePage.header.clickHome();
						break;
					case newItemPageData.itemTypes.freestyleProject:
						await app.configureFreestylePage.header.clickHome();
						break;
					case newItemPageData.itemTypes.multiConfigurationProject:
						//
						break;
					case newItemPageData.itemTypes.folder:
						await app.configureFolderPage.header.clickHome();
						break;
					case newItemPageData.itemTypes.multibranchPipeline:
						await app.configureMultibranchPipelinePage.header.clickHome();
						break;
					case newItemPageData.itemTypes.organizationFolder:
						await app.configureOrganizationFolderPage.header.clickHome();
						break;
				}
			}
		};

		await use(create);
	}
});

export const expect = base.expect;
export { App };
