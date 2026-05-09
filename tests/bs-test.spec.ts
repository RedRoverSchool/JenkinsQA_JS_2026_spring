import { test, expect, Page } from "@/base";

test.describe("test suite", () => {
	test("add node", async ({ page }: { page: Page }) => {
		page.goto("/manage/computer/");

		await page.getByRole("link", { name: "New Node" }).click();

		await page.locator("#name").fill("my-node");
		await page.getByRole("radio", { name: "Permanent Agent" }).check({ force: true });
		await page.locator("#ok").click();

		await page.getByRole("button", { name: "Save" }).click();
	});
});
