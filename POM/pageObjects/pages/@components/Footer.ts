import { Page } from "@playwright/test";

export class Footer {
	constructor(private readonly page: Page) {}

	jenkinsVersionButton = () => this.page.locator("button.jenkins_ver");
	jenkinsVersionDropdown = () => this.page.locator(".jenkins-dropdown");
	jenkinsVersionDropdownItems = () => this.page.locator(".jenkins-dropdown__item");
	jenkinsVersionDropdownAbout = () => this.page.locator(`[href="/manage/about"]`);
	jenkinsVersionDropdownGetInvolved = () => this.page.locator(`[href="https://www.jenkins.io/participate/"]`);
	jenkinsVersionDropdownWebsite = () => this.page.locator(`[href="https://www.jenkins.io/"]`);

	async clickJenkinsVersionButton() {
		return await this.jenkinsVersionButton().click();
	}
}
