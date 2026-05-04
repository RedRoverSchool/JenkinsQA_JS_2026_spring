import { test, expect, Page } from "@/base";
import dotenv from "dotenv";
import { chromium } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STORAGE_PATH = path.join(__dirname, "..", ".auth", "storageState.json");

test.describe("US_08.002 | Sign in/out > Sign out", () => {
    test("TC_08.002.01 | Verify redirection to Login after Sign out", async ({ page }: { page: Page }) => {
        await page.locator("#root-action-UserAction").hover();
        await page.locator('a[href*="logout"]').click();

        await expect(page).toHaveURL(/\/login(\?.*)?$/);

        // Regenerate storageState to restore authenticated session
        const { LOCAL_HOST, LOCAL_PORT, LOCAL_USERNAME, LOCAL_PASSWORD } = process.env;
        const browser = await chromium.launch();
        const authPage = await browser.newPage();
        
        await authPage.goto(`http://${LOCAL_HOST}:${LOCAL_PORT}/`);
        await authPage.locator("#j_username").fill(LOCAL_USERNAME ?? "");
        await authPage.locator('input[name="j_password"]').fill(LOCAL_PASSWORD ?? "");
        await authPage.locator('button[name="Submit"]').click();
        await authPage.waitForURL(/^(?!.*login).*/, { timeout: 30000 });
        await authPage.context().storageState({ path: STORAGE_PATH });
        await browser.close();
    });
});