import { BasePage } from "./@components";

export class BuildHistoryPage extends BasePage {
  //locators
  newItemName = () => this.page.locator("#projectStatus .jenkins-table__link span");

}