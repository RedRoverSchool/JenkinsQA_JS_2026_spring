import { faker } from '@faker-js/faker';

export const toolsPageData = {
    toolsSections: [
        "Maven Configuration",
        "JDK installations",
        "Git installations",
        "Gradle installations",
        "Ant installations",
        "Maven installations"
    ],
    generateJdkName: () => `jdk-${faker.system.semver()}-${faker.lorem.word()}`
};
