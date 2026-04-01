import { Page } from "@playwright/test";

export const jenkinsTestData = {
	projectType: {
		freestyle: "FreeStyleProject",
		pipeline: "WorkflowJob",
		multiConfiguration: "MatrixProject",
		folder: "Folder",
		multibranchPipeline: "WorkflowMultiBranchProject",
		organizationFolder: "OrganizationFolder"
	},
	multibranchPipeline: {
		expectedTooltipText:
			"(No new builds within this Multibranch Pipeline will be executed until it is re-enabled)",
		expectedDisabledMessage: "This Multibranch Pipeline is currently disabled"
	}
};

export const generateNewJob = async (page: Page, jenkinsData: any) => {
	await page.getByRole("link", { name: "New Item" }).click();
	await page.getByRole("textbox", { name: "name" }).fill(Math.floor(Math.random() * 10000) + "projectName");
	await page.locator(`[class$="${jenkinsData.projectType.multibranchPipeline}"]`).click();
	await page.getByRole("button", { name: "OK" }).click();
};

export const jobDescription = `This is the job description ${Math.floor(Math.random() * 10000)}`;
export const updatedJobDescription = `This is a new job description ${Math.floor(Math.random() * 10000)}`;
