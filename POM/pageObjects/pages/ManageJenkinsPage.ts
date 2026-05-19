import { BasePage } from "./@components";

export class ManageJenkinsPage extends BasePage {
    // locators
    toolsLink = () => this.page.locator("[href='configureTools']");
    pluginsLink = () => this.page.getByRole("link", { name: "Plugins Add, remove, disable" });
    jenkinsSectionTitle = () => this.page.locator("h2.jenkins-section__title");
    settingsSearchBar = () => this.page.locator("#settings-search-bar");
    searchBarDropdownItem = () =>
        this.page.locator(".jenkins-search__results-container .jenkins-dropdown__item");
    manageJenkinsSection = (header: string) =>
        this.page.locator(".jenkins-section").filter({
            has: this.page.locator("h2", { hasText: header }),
        });
    manageJenkinsSubSection = (item: string, section: string) =>
        this.manageJenkinsSection(section)
            .locator("a")
            .filter({ has: this.page.locator("dt", { hasText: item }) });

    //actions
    async clickTools() {
        await this.toolsLink().click();
    }

    async clickPlugins() {
        await this.pluginsLink().click();
    }
}
