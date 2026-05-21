import { BasePage } from "./@components";

export class StatusFreestyleProjectPage extends BasePage {
    deleteProjectBtn = () =>
        this.page.locator('a[data-title="Delete Project"]');
    confirmDeleteBtn = () => this.page.locator("button[data-id=ok]");
    disabledProjectWarning = () =>
        this.page.locator('form[id="enable-project"]');
    enableProjectBtn = () => this.page.locator('button[value="Enable"]');
    activeNavLink = () => this.page.locator("a.task-link--active");
    addDescriptionButton = () => this.page.locator("a[href='editDescription']");
    descriptionContent = () => this.page.locator("#description-content");
    buildNowLink = () => this.page.getByRole("link", { name: "Build Now" });
    buildNumber = (buildNumber: string) => this.page.getByText(buildNumber);

    async clickDeleteProjectBtn() {
        await this.deleteProjectBtn().click();
        return this;
    }

    async clickYesInDeleteDialog() {
        await this.confirmDeleteBtn().click();
    }

    async clickAddDescriptionBtn() {
        await this.addDescriptionButton().click();
        return this;
    }

    async clickBuildNowLink() {
        await this.buildNowLink().click();
        return this;
    }

    async createBuilds(count: number) {
        for (let i = 1; i <= count; i++) {
            await this.clickBuildNowLink();
            await this.buildNumber(`#${i}`).waitFor();
        }
        return this;
    }
}
