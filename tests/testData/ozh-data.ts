import { Page } from '../../base';
export const ozData = {
  jobName: 'TestJob',
  incorrectGitUrl: 'someurl',
  repoErrorMessage: 'Failed to connect to repository',
};

export const ozhJenkinsLocators = {
  jenkinsLogo: 'a.app-jenkins-logo',
  newJobBtn: 'a[href="newJob"]',
  newFreestyleProject: '.hudson_model_FreeStyleProject',
  itemNameInput: 'input.jenkins-input#name',
  okBtn: 'button#ok-button',
  itemPageLink: `a.jenkins-table__link[href*="job/${ozData.jobName}/"]`,
  SCMButton: 'button[data-section-id=source-code-management]',
  repoUrlInput: 'input[name="_.url"]',
  repoUrlError: 'div[name="userRemoteConfigs"] .error',
  itemSidePanel: '#side-panel',
};

export const projectSidePanelLocators = {
  deleteProjectBtn: 'a[data-title="Delete Project"]',
};

export const manageJenkinsLocators = {
  manageJenkinsBtn: '.jenkins-header__actions a[href*="manage"]',
};

export const manageCredentialsLocators = {
  goToCredentialsBtn: 'a[href="credentials"]',
  addCredentialsBtn: 'button[data-type="credentials-add-store-item"]',
};

export const credentials = [
  'Username with password',
  'GitHub App',
  'SSH Username with private key',
  'Secret file',
  'Secret text',
  'Certificate',
];

export async function createNewItem(page: Page): Promise<void> {
  await page.locator(ozhJenkinsLocators.newJobBtn).click();
  await page.locator(ozhJenkinsLocators.itemNameInput).fill(ozData.jobName);
  await page.locator(ozhJenkinsLocators.newFreestyleProject).click();
  await page.locator(ozhJenkinsLocators.okBtn).click();
  await page.waitForLoadState('networkidle');
}
