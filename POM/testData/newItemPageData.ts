import { faker } from "@faker-js/faker";

export const generateFolderName = (): string => {
  return `folder-${faker.string.alphanumeric(8)}`;
};

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