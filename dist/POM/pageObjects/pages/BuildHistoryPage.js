import { BasePage } from "./@components";
export class BuildHistoryPage extends BasePage {
    successfulBuildEntry = (projectName) => this.page.locator("tr", { hasText: projectName });
    successfulBuildStatusIcon = (projectName) => this.successfulBuildEntry(projectName).locator("svg#blue");
}
//# sourceMappingURL=BuildHistoryPage.js.map