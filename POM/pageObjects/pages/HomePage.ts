import { BasePage } from "./@components";

export class HomePage extends BasePage {
  // locators
  newItemLink = () => this.page.locator("#side-panel a[href$='newJob']");
  itemName = () => this.page.locator("#projectstatus .jenkins-table__link");
  projectTableRow = (itemName: string) =>
    this.page.locator(`tr#job_${itemName}`);
  itemDropDown = () => this.page.locator(`div.jenkins-dropdown`);
  deleteProjectInDropdownBtn = (itemName: string) =>
    this.itemDropDown().locator(
      `button[href*="job/${itemName}/doDelete"].jenkins-dropdown__item`,
    );
  itemMenuChevron = () =>
    this.page.locator("button.jenkins-menu-dropdown-chevron");
  confirmDeleteBtn = () => this.page.locator("button[data-id=ok]");
  buildHistoryLink = () =>
    this.page.getByRole("link", { name: "Build History" });
  // actions
  async clickNewItemLink() {
    await this.newItemLink().click();
  }

  async clickItemNameLink() {
    await this.itemName().focus();
    await this.itemName().press("Enter");
  }

  async hoverItemName() {
    await this.itemName().hover();
    return this;
  }
  async clickDeleteProjectInDropdown(itemName: string) {
    await this.deleteProjectInDropdownBtn(itemName).click();
    return this;
  }

  async openItemDropdownMenu() {
    await this.itemMenuChevron().click();
    return this;
  }

  async clickConfirmDeleteBtn() {
    await this.confirmDeleteBtn().click();
  }

  async clickBuildHistoryLink() {
    await this.buildHistoryLink().click();
    return this;
  }
}
