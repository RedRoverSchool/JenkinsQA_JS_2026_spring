import { Page } from "@playwright/test";

export class Footer {
	constructor(private readonly page: Page) {}

	// locators
	jenkinsVersionButton = () => this.page.locator("button.jenkins_ver");

	// actions
	async clickJenkinsVersionButton() {
		return await this.jenkinsVersionButton().click();
	}
}
