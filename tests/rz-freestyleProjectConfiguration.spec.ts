import { expect } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/rz-jenkinsData";

test.describe("US_02.004 | Freestyle Project Configuration > Build Triggers", () => {
	test.beforeEach(async ({ page }) => {
		const newItemButton = page.locator("[href='/view/all/newJob']");
		await newItemButton.click();

		const newItemName = page.locator("#name");
		const freestyleProjectType = page.getByText("Freestyle project");
		const okButton = page.locator("#ok-button");

		await newItemName.fill(jenkinsData.jobName);
		await freestyleProjectType.click();
		await okButton.click();
	});

	test("TC_02.004.1 | Access Triggers Section When Creating New Job", async ({ page }) => {
		const triggersSection = page.getByRole("button", { name: "Triggers" });
		const triggersCheckboxes = page.locator(
			"#triggers ~ .optionalBlock-container input.optional-block-control"
		);

		await triggersSection.click();

		await expect(triggersCheckboxes).toHaveCount(5);
	});

	test("TC_02.004.2 | Access Triggers Section From Existing Job", async ({ page }) => {
		const saveButton = page.locator("button[name='Submit']");
		await saveButton.click();

		await page.goto("/");

		const jobLink = page.getByRole("link", { name: jenkinsData.jobName, exact: true });
		await jobLink.click();

		const configureLink = page.getByRole("link", { name: "Configure" });
		await configureLink.click();

		const triggersSection = page.getByRole("button", { name: "Triggers" });
		const triggersCheckboxes = page.locator(
			"#triggers ~ .optionalBlock-container input.optional-block-control"
		);
		await triggersSection.click();

		await expect(triggersCheckboxes).toHaveCount(5);
	});

	test("TC_02.004.3 | Navigate Using Triggers Menu Item", async ({ page }) => {
		const saveButton = page.locator("button[name='Submit']");
		await saveButton.click();

		await page.goto("/");
		const jobLink = page.getByRole("link", { name: jenkinsData.jobName, exact: true });
		await jobLink.click();

		const configureLink = page.getByRole("link", { name: "Configure" });
		await configureLink.click();

		const triggersMenuItem = page.getByRole("button", { name: "Triggers" });
		const triggersSection = page.locator("#triggers");
		await triggersMenuItem.click();

		await expect(triggersSection).toBeInViewport();
	});

	test("TC_02.004.4 | Navigate By Scrolling", async ({ page }) => {
		const triggersSection = page.locator("#triggers");

		await triggersSection.scrollIntoViewIfNeeded();

		await expect(triggersSection).toBeInViewport();
	});

	test("TC_02.004.5 | Verify Section Content", async ({ page }) => {
		const triggersSection = page.locator("#triggers");
		const triggersDescription = triggersSection.locator("+ div");
		const triggersCheckboxes = triggersSection.locator(" ~ div.optionalBlock-container");
		const triggerBuildRemotelyLabel = page.getByText(jenkinsData.buildTriggers.triggerBuildRemotely);
		const buildAfterOtherProjectsLabel = page.getByText(
			jenkinsData.buildTriggers.buildAfterOtherProjects
		);
		const buildPeriodicallyLabel = page.getByText(jenkinsData.buildTriggers.buildPeriodically);
		const gitHubHookTriggerLabel = page.getByText(jenkinsData.buildTriggers.gitHubHookTrigger);
		const pollSCMLabel = page.getByText(jenkinsData.buildTriggers.pollSCM);

		await triggersSection.scrollIntoViewIfNeeded();

		await expect(triggersDescription).toBeVisible();
		await expect(triggersCheckboxes).toHaveCount(5);
		await expect(triggerBuildRemotelyLabel).toBeVisible();
		await expect(buildAfterOtherProjectsLabel).toBeVisible();
		await expect(buildPeriodicallyLabel).toBeVisible();
		await expect(gitHubHookTriggerLabel).toBeVisible();
		await expect(pollSCMLabel).toBeVisible();
	});

	test("TC_02.004.6 | Trigger Builds Remotely Additional Form", async ({ page }) => {
		const triggersSection = page.locator("#triggers");
		const triggerBuildRemotelyCheckbox = page.locator("#cb13");

		await triggersSection.scrollIntoViewIfNeeded();
		await triggerBuildRemotelyCheckbox.check({ force: true });

		const triggersBuildRemotelyAuthTokenText = page.getByText("Authentication Token");
		const triggersBuildRemotelyAuthTokenInput = page.locator("input[name^='auth']");

		await expect(triggerBuildRemotelyCheckbox).toBeChecked();
		await expect(triggersBuildRemotelyAuthTokenText).toHaveText("Authentication Token");
		await expect(triggersBuildRemotelyAuthTokenInput).toBeVisible();
	});

	test("TC_02.004.7 | Build After Other Projects Additional Form", async ({ page }) => {
		const triggersSection = page.locator("#triggers");
		const buildAfterOtherCheckbox = page.locator("#cb14");

		await triggersSection.scrollIntoViewIfNeeded();
		await buildAfterOtherCheckbox.check({ force: true });

		const projectsToWatchInput = page.locator("input[name='_.upstreamProjects']");
		const triggerOnlyIfStableRadio = page.getByText(
			jenkinsData.buildTriggers.buildAfterOtherProjectsOptions.triggerOnlyIfStable
		);
		const triggerEvenIfUnstableRadio = page.getByText(
			jenkinsData.buildTriggers.buildAfterOtherProjectsOptions.triggerEvenIfUnstable
		);
		const triggerEvenIfFailedRadio = page.getByText(
			jenkinsData.buildTriggers.buildAfterOtherProjectsOptions.triggerEvenIfFailed
		);
		const triggerEvenIfAbortedRadio = page.getByText(
			jenkinsData.buildTriggers.buildAfterOtherProjectsOptions.triggerEvenIfAborted
		);

		await expect(buildAfterOtherCheckbox).toBeChecked();
		await expect(projectsToWatchInput).toBeVisible();
		await expect(triggerOnlyIfStableRadio).toBeVisible();
		await expect(triggerEvenIfUnstableRadio).toBeVisible();
		await expect(triggerEvenIfFailedRadio).toBeVisible();
		await expect(triggerEvenIfAbortedRadio).toBeVisible();
	});

	test("TC_02.004.8 | Build Periodically Additional Form", async ({ page }) => {
		const triggersSection = page.locator("#triggers");
		const buildPeriodicallyCheckbox = page.locator("#cb15");

		await triggersSection.scrollIntoViewIfNeeded();
		await buildPeriodicallyCheckbox.check({ force: true });

		const scheduleInput = page.locator("div[ref='cb15']~.form-container textarea");
		const helpText = page.locator(".warning");

		await expect(buildPeriodicallyCheckbox).toBeChecked();
		await expect(scheduleInput).toBeVisible();
		await expect(helpText).toBeVisible();
	});

	test("TC_02.004.9 | Poll SCM Additional Form", async ({ page }) => {
		const triggersSection = page.locator("#triggers");
		const pollSCMCheckbox = page.locator("#cb17");

		await triggersSection.scrollIntoViewIfNeeded();
		await pollSCMCheckbox.check({ force: true });

		const pollSCMscheduleInput = page.locator("div[ref='cb17']~.form-container textarea");
		const pollSCMHelpText = page.locator("div[ref='cb17'] ~ div .ok");
		const ignorePostCommitHooksCheckbox = page.locator("input[name^='_.ignore']");

		await expect(pollSCMCheckbox).toBeChecked();
		await expect(pollSCMscheduleInput).toBeVisible();
		await expect(pollSCMHelpText).toBeVisible();
		await expect(ignorePostCommitHooksCheckbox).toBeVisible();
	});

	test("TC_02.004.10 | Tooltip for Trigger Builds Remotely", async ({ page }) => {
		const triggersSection = page.locator("#triggers");
		const triggerBuildRemotelyTooltipIcon = page.locator("div[ref='cb13'] a");

		await triggersSection.scrollIntoViewIfNeeded();
		await triggerBuildRemotelyTooltipIcon.click();

		const triggerBuildRemotelyHelpBlock = page.locator("div[style='display: block;']");

		await expect(triggerBuildRemotelyHelpBlock).toBeVisible();
	});

	test("TC_02.004.11 | Tooltip for Build After Other Projects", async ({ page }) => {
		const triggersSection = page.locator("#triggers");
		const buildAfterOtherProjectsTooltipIcon = page.locator("div[ref='cb14'] a");

		await triggersSection.scrollIntoViewIfNeeded();
		await buildAfterOtherProjectsTooltipIcon.click();

		const buildAfterOtherProjectsHelpBlock = page.locator("div[style='display: block;']");

		await expect(buildAfterOtherProjectsHelpBlock).toBeVisible();
	});

	test("TC_02.004.12 | Tooltip for Build Periodically", async ({ page }) => {
		const triggersSection = page.locator("#triggers");
		const buildPeriodicallyTooltipIcon = page.locator("div[ref='cb15'] a");

		await triggersSection.scrollIntoViewIfNeeded();
		await buildPeriodicallyTooltipIcon.click();

		const buildPeriodicallyHelpBlock = page.locator("div[style='display: block;']");

		await expect(buildPeriodicallyHelpBlock).toBeVisible();
	});

	test("TC_02.004.13 | Tooltip for GitHub Hook Trigger", async ({ page }) => {
		const triggersSection = page.locator("#triggers");
		const gitHubHookTriggerTooltipIcon = page.locator("div[ref='cb16'] a");

		await triggersSection.scrollIntoViewIfNeeded();
		await gitHubHookTriggerTooltipIcon.click();

		const gitHubHookTriggerHelpBlock = page.locator("div[style='display: block;']");

		await expect(gitHubHookTriggerHelpBlock).toBeVisible();
	});

	test("TC_02.004.14 | Tooltip for Poll SCM", async ({ page }) => {
		const triggersSection = page.locator("#triggers");
		const pollSCMTriggerTooltipIcon = page.locator("div[ref='cb17'] a");

		await triggersSection.scrollIntoViewIfNeeded();
		await pollSCMTriggerTooltipIcon.click();

		const pollSCMHelpBlock = page.locator("div[style='display: block;']");

		await expect(pollSCMHelpBlock).toBeVisible();
	});

	test("TC_02.004.15 | Save Valid Configuration", async ({ page }) => {
		const triggersSection = page.locator("#triggers");
		const gitHubHookTriggerCheckbox = page.locator("#cb16");

		await triggersSection.scrollIntoViewIfNeeded();
		await gitHubHookTriggerCheckbox.check({ force: true });

		const saveButton = page.getByRole("button", { name: "Save" });
		await saveButton.click();

		const configure = page.locator(`a[href$='/configure']`);
		await configure.click();
		await triggersSection.scrollIntoViewIfNeeded();

		await expect(gitHubHookTriggerCheckbox).toBeChecked();
	});
});
