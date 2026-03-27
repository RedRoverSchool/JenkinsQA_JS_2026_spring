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



    console.log("DEBUG: Current URL is:", page.url());
    console.log("DEBUG: Page Title is:", await page.title());
    const content = await page.content(); 
    console.log("DEBUG: Page HTML Snippet:", content.substring(0, 1000));
    await page.screenshot({ path: 'jenkins-debug-state.png', fullPage: true });




	await page.waitForSelector("#j_username", { timeout: 120000 });

	await page.locator("#j_username").fill(LOCAL_USERNAME ?? "");
	await page.locator('input[name="j_password"]').fill(LOCAL_PASSWORD ?? "");
	await page.locator('button[name="Submit"]').click();

	await page.waitForLoadState("networkidle");

	await Promise.race([
		page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 30000 }).catch(() => null),
		page.waitForSelector("#jenkins-head-icon", { timeout: 30000 }).catch(() => null)
	]);

	console.log("Current URL after login:", page.url());

	await page.context().storageState({ path: STORAGE_PATH });
	console.log(`✅ storageState created at: ${STORAGE_PATH}`);

	await browser.close();
}