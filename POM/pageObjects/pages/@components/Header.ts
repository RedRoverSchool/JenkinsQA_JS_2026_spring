import { Page } from "@playwright/test";

export class Header {
	constructor(private readonly page: Page) {}

	// locators
	logoLink = () => this.page.locator(".app-jenkins-logo");

	// actions
	async clickHome() {
		await this.logoLink().click(); // not doing "return this;", since we might be going to the next page
	}
}
