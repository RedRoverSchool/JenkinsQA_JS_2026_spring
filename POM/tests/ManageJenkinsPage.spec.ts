import { test, expect, App } from "@/POM/fixtures/baseFixtures";
import { manageJenkinsPageData } from "../testData/jenkinsData";
import { ManageJenkinsPage } from "../pageObjects/pages/ManageJenkinsPage";

test.describe("US_10.005 | Manage Jenkins > Plugins > Updates", () => {
    test("RF_10.005.01 | Verify user can access Plugins section", async ({ app }: { app: App }) => {
        await app.homePage.header.clickManageJenkins();
        await app.manageJenkinsPage.clickPlugins();

        await expect(app.pluginsPage.mainTitle()).toBeVisible();
    });

    test("RF_10.005.02 | Verify 'Updates' option is available in the left side-menu", async ({
        app,
    }: {
        app: App;
    }) => {
        await app.homePage.header.clickManageJenkins();
        await app.manageJenkinsPage.clickPlugins();

        await expect(app.pluginManagerPage.updatesTaskLink()).toBeVisible();
    });
});

test.describe(`US_11.003 | Welcome Dashboard > Manage Jenkins`, () => {
    test.beforeEach(async ({ app }: { app: App }) => {
        await app.homePage.header.clickManageJenkins();
    });

    test("TC_11.003.01 | Verify Manage Jenkins page contains all grouped sections", async ({
        app,
    }: {
        app: App;
    }) => {
        const actualSections = await app.manageJenkinsPage.jenkinsSectionTitle().allTextContents();
        const expectedSections = Object.values(manageJenkinsPageData.sections).map((s) => s.name);
        expect(actualSections).toEqual(expectedSections);
    });

    for (const item of Object.values(
        manageJenkinsPageData.sections.systemConfiguration.configurationItems,
    )) {
        test(`TC_11.003.02 | Verify search input filters "${item.name}" in search results`, async ({
            app,
        }: {
            app: App;
        }) => {
            await app.manageJenkinsPage.settingsSearchBar().fill(item.name);

            await expect(app.manageJenkinsPage.searchBarDropdownItem().first()).toContainText(
                item.name,
            );
        });
    }

    for (const item of Object.values(
        manageJenkinsPageData.sections.systemConfiguration.configurationItems,
    )) {
        test(`TC_11.003.03 | Verify System Configuration group contains ${item.name}`, async ({
            app,
        }: {
            app: App;
        }) => {
            await expect(
                app.manageJenkinsPage.manageJenkinsSubSection(
                    item.name,
                    manageJenkinsPageData.sections.systemConfiguration.name,
                ),
            ).toHaveAttribute("href", item.href);
        });
    }

    for (const item of Object.values(manageJenkinsPageData.sections.security.configurationItems)) {
        test(`TC_11.003.04 | Verify Security group contains ${item.name}`, async ({
            app,
        }: {
            app: App;
        }) => {
            await expect(
                app.manageJenkinsPage.manageJenkinsSubSection(
                    item.name,
                    manageJenkinsPageData.sections.security.name,
                ),
            ).toHaveAttribute("href", item.href);
        });
    }
});
