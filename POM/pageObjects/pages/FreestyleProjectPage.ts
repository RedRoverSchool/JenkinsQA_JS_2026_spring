import { BasePage } from "./@components";

export class FreestyleProjectPage extends BasePage {
    // locators
    buildNowLink = () => this.page.getByRole("link", { name: "Build Now" });
    buildNumber = (buildNumber: string) => this.page.getByText(buildNumber);

    // actions
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
