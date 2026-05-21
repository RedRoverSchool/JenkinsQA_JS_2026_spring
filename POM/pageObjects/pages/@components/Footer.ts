import { Page } from "@playwright/test";

export class Footer {
	constructor(private readonly page: Page) {}

	jenkinsVersionButton = () => this.page.locator("button.jenkins_ver");
	jenkinsVersionDropdown = () => this.page.locator(".jenkins-dropdown");
	jenkinsVersionDropdownItems = () => this.page.locator(".jenkins-dropdown__item");
	// jenkinsVersionDropdownAbout = () => this.page.getByText("About Jenkins");
	jenkinsVersionDropdownAbout = () => this.page.getByRole("link", { name: "About Jenkins" });
	// jenkinsVersionDropdownGetInvolved = () => this.page.getByText("Get involved");
	jenkinsVersionDropdownGetInvolved = () => this.page.getByRole("link", { name: "Website" });
	// jenkinsVersionDropdownWebsite = () => this.page.locator("Website");
	jenkinsVersionDropdownWebsite = () => this.page.getByRole("link", { name: "Website" });

	async clickJenkinsVersionButton() {
		return await this.jenkinsVersionButton().click();
	}
}
