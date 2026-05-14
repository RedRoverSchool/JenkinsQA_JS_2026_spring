import { Page } from "@playwright/test";

export class Header {
	constructor(private readonly page: Page) {}

	// locators
	logoLink = () => this.page.locator(".app-jenkins-logo");
	manageJenkinsLink = () => this.page.locator("a[href$='manage']");

	// actions
	async clickHome() {
		await this.logoLink().click();
	}

	async clickManageJenkins() {
		await this.manageJenkinsLink().click();
	}
}
