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
  itemSidePanel: '#side-panel',
  SCMButton: 'button[data-section-id=source-code-management]',
  repoUrlInput: 'input[name="_.url"]',
  repoUrlError: 'div[name="userRemoteConfigs"] .error',
};

export async function createNewItem(page: Page): Promise<void> {
  await page.locator(ozhJenkinsLocators.newJobBtn).click();
  await page.locator(ozhJenkinsLocators.itemNameInput).fill(ozData.jobName);
  await page.locator(ozhJenkinsLocators.newFreestyleProject).click();
  await page.locator(ozhJenkinsLocators.okBtn).click();
}
