import { faker } from "@faker-js/faker";

export const newItemPageData = {
	itemName: faker.word.noun(),
	itemTypes: {
		pipeline: "Pipeline",
		freestyleProject: "Freestyle project",
		multiConfigurationProject: "Multi-configuration project",
		folder: "Folder",
		multibranchPipeline: "Multibranch Pipeline",
		organizationFolder: "Organization Folder"
	}
};
