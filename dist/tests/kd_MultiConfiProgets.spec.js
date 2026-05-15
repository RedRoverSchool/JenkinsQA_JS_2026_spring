import { test, label } from '../tests/testFixtures/kd-haveMultiConfProj-fixture';
import { expect } from '@playwright/test';
test.describe('US_02.001 | Freestyle Project Configuration > Enable or Disable the Project', () => {
    test('TC_02.001.08 | turn on disable option for project from the dropdown menu', async ({ haveMultiProject }) => {
        await haveMultiProject.locator(`//span[text() ="${label}"]/..`).hover();
        await haveMultiProject.locator('[class *= "dropdown"]').click();
        await haveMultiProject.locator('[href *= "configure"]').click();
        await haveMultiProject.locator('[class = "jenkins-form"] [class *= "controls"]').click();
        await haveMultiProject.locator('[name = "Submit"]').click();
        await haveMultiProject.reload();
        expect(await haveMultiProject.locator('[class="warning"] > form')).toContainText('This project is currently disabled');
        expect(await haveMultiProject.locator('[class="warning"] button')).toContainText('Enable');
    });
});
//# sourceMappingURL=kd_MultiConfiProgets.spec.js.map