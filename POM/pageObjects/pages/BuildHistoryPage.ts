import { BasePage } from "./@components";

export class BuildHistoryPage extends BasePage {
  successfulBuildEntry = (projectName: string) =>
    this.page.locator("tr", { hasText: projectName });

  successfulBuildStatusIcon = (projectName: string) =>
    this.successfulBuildEntry(projectName).locator("svg#blue");
}
