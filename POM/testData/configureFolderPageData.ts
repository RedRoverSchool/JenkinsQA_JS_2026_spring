import { faker } from "@faker-js/faker";

export const configureFolderPageData = {
    libraryName: faker.word.noun(),
    displayName: `Display-${faker.string.alphanumeric(6)}`,
    description: faker.lorem.sentence(),
};
