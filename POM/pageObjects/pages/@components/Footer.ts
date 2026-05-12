import { Page } from "@playwright/test";

export class Footer {
	constructor(private readonly page: Page) {}

	jenkinsVersionButton = () => this.page.locator("button.jenkins_ver");

	async clickJenkinsVersionButton() {
		return await this.jenkinsVersionButton().click();
	}
}
