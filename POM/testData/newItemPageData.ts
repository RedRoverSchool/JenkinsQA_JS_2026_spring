import { faker } from "@faker-js/faker";

 export const newItemPageData = {
	itemName: faker.word.noun(),
	invalidItemName: "Build@Test",
	folderName: `folder-${faker.string.alphanumeric(8)}`,
	itemTypes: {
		pipeline: "Pipeline",
		freestyleProject: "Freestyle project",
		multiConfigurationProject: "Multi-configuration project",
		folder: "Folder",
		multibranchPipeline: "Multibranch Pipeline",
		organizationFolder: "Organization Folder"
	},
	duplicateItemName: `duplicate-${faker.string.alphanumeric(8)}`
};
