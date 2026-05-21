import { Page } from "@playwright/test";

export class Header {
  constructor(private readonly page: Page) {}

  // locators
  logoLink = () => this.page.locator(".app-jenkins-logo");
  gearLink = () => this.page.locator("#root-action-ManageJenkinsAction");
  searchButton = () => this.page.locator("#root-action-SearchAction");
  searchInput = () => this.page.locator("#command-bar");
  searchDropDown = () => this.page.locator("#search-results a");

  // actions
  async clickHome() {
    await this.logoLink().click();
  }

  async clickManageJenkins() {
    await this.gearLink().click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async clickSearchButton() {
    await this.searchButton().click();
  }

  async fillSearchField(query: string) {
    await this.searchInput().click();
    await this.searchInput().pressSequentially(query, { delay: 100 });
    return this;
  }

  async getSearchDropdownResults() {
    await this.searchDropDown().first().waitFor({ state: "visible", timeout: 3000 });
    return this.searchDropDown();
  }
}
