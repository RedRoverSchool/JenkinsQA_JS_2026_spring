import { test, expect, App } from '@/POM/fixtures/baseFixtures';
import { newItemPageData } from '../testData/newItemPageData';
import { footer } from '../testData/jenkinsData';
import { newItemData } from '@/tests/testData/tl-data';

test.describe('US_01.001 | New Item > Create a new item', () => {
  test('RF_01.001.01 | Verify new item creation', async ({ app }: { app: App }) => {
    await app.homePage.clickNewItemLink();

    await app.newItemPage.fillItemNameField(newItemPageData.itemName);
    await app.newItemPage.clickFreestyleProject();
    await app.newItemPage.clickOkButton();

    await app.configureFreestylePage.header.clickHome();

    await expect(app.homePage.itemName()).toHaveText(newItemPageData.itemName);
  });

   test('TC_01.001.38 | Verify Pipeline Creation', async ({ app }: { app: App }) => {
    await app.homePage.clickNewItemLink();

    await app.newItemPage.fillItemNameField(newItemPageData.itemName);
    await app.newItemPage.clickPipeline();
    await app.newItemPage.clickOkButton();    
    await app.configurePipelinePage.header.clickHome();   
    await expect(app.homePage.itemName()).toHaveText(newItemPageData.itemName);
  });
});

test.describe('US_16.008 | Freestyle Project Management > Delete Project', () => {
  test.beforeEach(async ({ app }: { app: App }) => {
    await app.homePage.clickNewItemLink();
    await app.newItemPage.fillItemNameField(newItemPageData.itemName);
    await app.newItemPage.clickFreestyleProject();
    await app.newItemPage.clickOkButton();
    await app.configureFreestylePage.header.clickHome();
  });
  test(`RF_16.008.01 |  Verify deleting project via dropdown menu`, async ({
                                                                             app,
                                                                           }: {
    app: App;
  }) => {
    await app.homePage.hoverItemName();
    await app.homePage.openItemDropdownMenu();
    await app.homePage.clickDeleteProjectInDropdown(newItemPageData.itemName);
    await app.homePage.clickConfirmDeleteBtn();
    await expect(app.homePage.projectTableRow(newItemPageData.itemName)).toHaveCount(0);
  });

  test(`RF_16.008.02 |  Verify deleting freestyle project on project's page`, async ({
                                                                                       app,
                                                                                     }: {
    app: App;
  }) => {
    await app.homePage.clickItemNameLink();
    await app.freeStyleProjectPage.clickDeleteProjectBtn();
    await app.freeStyleProjectPage.clickYesInDeleteDialog();
    await expect(app.homePage.projectTableRow(newItemPageData.itemName)).toHaveCount(0);
  });
});

test.describe('US_15.001 | Footer > Jenkins version',() => {
  test(`RF_15.001.01 | Verify Footer Version`, async ({ app } : { app : App }) => {
    await expect(app.homePage.footer.jenkinsVersionButton()).toContainText(footer.jenkinsVersion);
  });

  test(`RF_15.001.02 | Verify Footer Dropdown`, async ({ app } : { app : App }) => {
    await app.homePage.footer.clickJenkinsVersionButton();
    await expect(app.homePage.footer.jenkinsVersionDropdown()).toBeVisible();
  });
  
  test('RF_15.001.03 | Verify Footer Dropdown Labels', async ({ app } : { app: App }) => {
    await app.homePage.footer.clickJenkinsVersionButton();
    await expect(app.homePage.footer.jenkinsVersionDropdownItems()).toHaveText([
      footer.dropdownItems.aboutJenkins.text,
      footer.dropdownItems.getInvolved.text,
      footer.dropdownItems.website.text,
    ]);
  });
  
  test('RF_15.001.04 | Verify Footer Dropdown About URL', async ({ app } : { app: App }) => {
    await app.homePage.footer.clickJenkinsVersionButton();
    await expect(app.homePage.footer.jenkinsVersionDropdownAbout()).toHaveAttribute('href', footer.dropdownItems.aboutJenkins.href);  
  });

  test('RF_15.001.05 | Verify Footer Dropdown Get Involved URL', async ({ app } : { app: App }) => {
    await app.homePage.footer.clickJenkinsVersionButton();
    await expect(app.homePage.footer.jenkinsVersionDropdownGetInvolved()).toHaveAttribute('href', footer.dropdownItems.getInvolved.href);    
  });
});

test.describe("US_01.005 | New Item > Create Multibranch Pipeline", () => {
    test("RF_01.005.01 | Verify Multibranch Pipeline Creation", async ( {app} : {app : App}) => {
      await app.homePage.clickNewItemLink();
      await app.newItemPage.fillItemNameField(newItemPageData.itemName);
      await app.newItemPage.clickMultibranchPipeline();
      await app.newItemPage.clickOkButton();

      await app.configureMultibranchPipelinePage.header.clickHome();
      await expect(app.homePage.itemName()).toHaveText(newItemPageData.itemName)
    });
  });
