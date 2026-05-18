import { BasePage } from "./@components";

export class BuildHistoryPage extends BasePage {
  successfulBuildEntry = (projectName: string) =>
    this.page.locator("tr", { hasText: projectName });
  newItemName = () => this.page.locator("#projectStatus .jenkins-table__link span");

  successfulBuildStatusIcon = (projectName: string) =>
    this.successfulBuildEntry(projectName).locator("svg#blue");
}
