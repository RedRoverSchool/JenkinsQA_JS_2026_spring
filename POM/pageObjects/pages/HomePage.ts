import { BasePage } from "./@components";

export class HomePage extends BasePage {
  // locators
  newItemLink = () => this.page.locator("#side-panel a[href$='newJob']");
  itemName = () => this.page.locator("#projectstatus .jenkins-table__link");
  projectTableRow = (itemName: string) =>
    this.page.locator(`tr#job_${itemName}`);
  itemDropDownConfigureButton = (jobName: string) =>
    this.page.locator(`a[href*='/job/${jobName}/configure']`);
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
  jobName = (itemName: string) =>
    this.page.locator(`a[href='job/${itemName}/'] span`);
  arrowButton = () => this.page.locator("button.jenkins-menu-dropdown-chevron");
  dropdownMenu = () => this.page.locator("div[id^='tippy-'] .jenkins-dropdown");

  // actions
  async clickNewItemLink() {
    await this.newItemLink().click();
  }

  async clickItemNameLink() {
    await this.itemName().focus();
    await this.itemName().press("Enter");
  }

  async clickJobName(itemName: string) {
    await this.jobName(itemName).click();
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

  async clickItemDropDownConfigureButton(jobName: string) {
    await this.itemDropDownConfigureButton(jobName).click();
  }

  async clickConfirmDeleteBtn() {
    await this.confirmDeleteBtn().click();
  }

  async clickBuildHistoryLink() {
    await this.buildHistoryLink().click();
    return this;
  }

  async selectDropdownOption(optionName: string) {
    await this.dropdownMenu().getByText(optionName).click();
  }

  async clickItemName() {
    await this.itemName().click();
  }

  async clickArrowButton() {
    await this.arrowButton().click();
    return this;
  }

  async openItem(name: string) {
    await this.page.locator(`#job_${name}`).click();
  }
  async openNewItemPage() {
  await this.page.locator("#side-panel a[href$='newJob']").click();
}

  getItemLink(name: string) {
  return this.page.getByRole("link", { name });
}

}
