import { test, expect, Page } from "@/base";
import { faker } from '@faker-js/faker';

export const vvData = {
    jobName: "Test Job",
    displayNameFolder: "Changed folder name",
    descriptionFolder: "Changed folder description",
    toolsSections: [
        "Maven Configuration",
        "JDK installations",
        "Git installations",
        "Gradle installations",
        "Ant installations",
        "Maven installations"
    ]
};

export async function createJdkInstallation(page: Page): Promise<string> {
    await page.getByRole("button", { name: "JDK installations" }).click();

    const jdkContainer = page.locator("div.repeated-container").filter({ 
        has: page.getByRole("button", { name: "Add JDK" }) 
    });

    const jdkName = `jdk-${faker.system.semver()}-${faker.lorem.word()}`;

    await page.getByRole("button", { name: "Add JDK" }).first().click();

    const lastChunk = jdkContainer.locator("div.repeated-chunk").last();
    await lastChunk.waitFor({ state: "visible" });

    const nameField = lastChunk
        .locator("div.jenkins-form-item")
        .filter({ hasText: "Name" })
        .locator("input");
    await nameField.fill(jdkName);

    await page.locator("button[name='Submit']").click();
    
    return jdkName;
}