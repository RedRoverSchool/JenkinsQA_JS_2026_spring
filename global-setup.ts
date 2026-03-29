import { chromium } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORAGE_PATH = path.join(__dirname, ".auth", "storageState.json");

export default async function globalSetup() {
	const { LOCAL_HOST, LOCAL_PORT, LOCAL_USERNAME, LOCAL_PASSWORD } = process.env;

    console.log("🔐 Generating fresh storageState...");

	const browser = await chromium.launch();
	const page = await browser.newPage();

	await page.goto(`http://${LOCAL_HOST}:${LOCAL_PORT}/`);

	const loginNeeded = await page.locator("#j_username").isVisible({ timeout: 15000 }).catch(() => false);

	if (loginNeeded) {
		await page.waitForSelector("#j_username", { timeout: 120000 });
		await page.locator("#j_username").fill(LOCAL_USERNAME ?? "");
		await page.locator('input[name="j_password"]').fill(LOCAL_PASSWORD ?? "");

		await Promise.all([
			page.waitForNavigation({ waitUntil: "load", timeout: 30000 }),
			page.locator('button[name="Submit"]').click(),
		]);

		if (page.url().includes("loginError")) {
			await page.screenshot({ path: 'login-error-screenshot.png' });
			throw new Error("🛑 Jenkins Login Failed.");
		}

		await page.waitForSelector("#side-panel", { timeout: 30000 });
	}

	await page.context().storageState({ path: STORAGE_PATH });
    console.log(`✅ storageState created at: ${STORAGE_PATH}`);
    
	await browser.close();
}