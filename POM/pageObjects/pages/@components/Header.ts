import { Page } from "@playwright/test";

export class Header {
  constructor(private readonly page: Page) {}

  // locators
  logoLink = () => this.page.locator(".app-jenkins-logo");
  gearLink = () => this.page.locator("#root-action-ManageJenkinsAction");

  // actions
  async clickHome() {
    await this.logoLink().click();
  }

  async clickManageJenkins() {
    await this.gearLink().click();
    await this.page.waitForLoadState("domcontentloaded");
  }
}
