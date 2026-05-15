export class Header {
    page;
    constructor(page) {
        this.page = page;
    }
    // locators
    logoLink = () => this.page.locator(".app-jenkins-logo");
    gearLink = () => this.page.locator("#root-action-ManageJenkinsAction");
    // actions
    async clickHome() {
        await this.logoLink().click();
    }
    async clickManageJenkins() {
        await this.gearLink().click();
    }
}
//# sourceMappingURL=Header.js.map