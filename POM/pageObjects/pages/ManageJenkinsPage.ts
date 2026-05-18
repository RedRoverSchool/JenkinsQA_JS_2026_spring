import { BasePage } from "./@components";

export class ManageJenkinsPage extends BasePage {
  toolsLink = () => this.page.locator("[href='configureTools']");
  pluginsLink = () => this.page.getByRole("link", { name: "Plugins Add, remove, disable" });
  jenkinsSectionTitle = () => this.page.locator("h2.jenkins-section__title");
  settingsSearchBar = () => this.page.locator("#settings-search-bar");
  searchBarDropdownItem = () => this.page.locator(".jenkins-dropdown__item");

  async clickTools() {
    await this.toolsLink().click();
  }

  async clickPlugins() {
    await this.pluginsLink().click();
  }
}
