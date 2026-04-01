import { expect } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/aa-jenkinsData";

test.describe("US_15.001 | User > Create", () => {
	test("TC_15.001.04 | Verify New User Creation", async ({ page }) => {
		await page.locator("#root-action-ManageJenkinsAction").click();

		await page.getByRole("link", { name: "Users Create/delete/modify" }).click();

		await page.getByRole("link", { name: "Create User" }).click();

		await page.locator("#username").fill(jenkinsData.validCredentials.username);
		await page.locator('input[name="password1"]').fill(jenkinsData.validCredentials.password);
		await page.locator('input[name="password2"]').fill(jenkinsData.validCredentials.password);
		await page.locator('input[name="fullname"]').fill(jenkinsData.validCredentials.fullname);
		await page.locator('input[name="email"]').fill(jenkinsData.validCredentials.email);

		await page.locator('button[name="Submit"]').click();

		await expect(page.locator(`td:has-text("${jenkinsData.validCredentials.username}")`)).toBeVisible();
	});

	test("TC_15.001.05 | Verify New User is not Created with Invalid Data", async ({ page }) => {
		await page.locator("#root-action-ManageJenkinsAction").click();

		await page.getByRole("link", { name: "Users Create/delete/modify" }).click();

		await page.getByRole("link", { name: "Create User" }).click();

		await page.locator("#username").fill(jenkinsData.invalidCredentials.username);
		await page.locator('input[name="password1"]').fill(jenkinsData.validCredentials.password);
		await page.locator('input[name="password2"]').fill(jenkinsData.validCredentials.password);
		await page.locator('input[name="fullname"]').fill(jenkinsData.validCredentials.fullname);
		await page.locator('input[name="email"]').fill(jenkinsData.invalidCredentials.email);

		await page.locator('button[name="Submit"]').click();

		await expect(page.locator(".form-content > div:nth-of-type(2)")).toBeVisible();

		await expect(page.locator(".form-content > div:nth-of-type(2)")).toContainText(
			"User name must only contain alphanumeric characters, underscore and dash"
		);

		await expect(page.locator(".form-content > div:nth-of-type(7)")).toBeVisible();

		await expect(page.locator(".form-content > div:nth-of-type(7)")).toContainText(
			"Invalid e-mail address"
		);
	});

	test("TC_15.001.06 | Verify New User is not Created with Empty Fields", async ({ page }) => {
		await page.locator("#root-action-ManageJenkinsAction").click();

		await page.getByRole("link", { name: "Users Create/delete/modify" }).click();

		await page.getByRole("link", { name: "Create User" }).click();

		await page.locator("#username").fill("");
		await page.locator('input[name="password1"]').fill("");
		await page.locator('input[name="password2"]').fill("");
		await page.locator('input[name="fullname"]').fill("");
		await page.locator('input[name="email"]').fill("");

		await page.locator('button[name="Submit"]').click();

		await expect(page.locator(".form-content > div:nth-of-type(2)")).toBeVisible();

		await expect(page.locator(".form-content > div:nth-of-type(2)")).toContainText(
			"is prohibited as a username for security reasons."
		);

		await expect(page.locator(".form-content > div:nth-of-type(4)")).toBeVisible();

		await expect(page.locator(".form-content > div:nth-of-type(4)")).toContainText(
			"Password is required"
		);

		await expect(page.locator(".form-content > div:nth-of-type(6)")).toBeVisible();

		await expect(page.locator(".form-content > div:nth-of-type(6)")).toContainText(
			"Password is required"
		);

		await expect(page.locator(".form-content > div:nth-of-type(8)")).toBeVisible();

		await expect(page.locator(".form-content > div:nth-of-type(8)")).toContainText(
			"is prohibited as a full name for security reasons."
		);

		await expect(page.locator(".form-content > div:nth-of-type(10)")).toBeVisible();

		await expect(page.locator(".form-content > div:nth-of-type(10)")).toContainText(
			"Invalid e-mail address"
		);
	});
});
