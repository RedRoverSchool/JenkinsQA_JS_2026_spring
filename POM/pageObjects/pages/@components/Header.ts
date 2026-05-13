import { Page } from "@playwright/test";

export class Header {
	constructor(private readonly page: Page) {}

	// locators
	logoLink = () => this.page.locator(".app-jenkins-logo");
	manageJenkinsLink = () => this.page.getByRole("link", { name: 'Manage Jenkins' });

	// actions
	async clickHome() {
		await this.logoLink().click();
	}

	async clickManageJenkins() {
		await this.manageJenkinsLink().click();
	}
}
