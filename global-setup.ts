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
        console.log("👉 Login required. Filling credentials...");
        
        // 1. Wait for the form to be interactive
        await page.waitForSelector("#j_username", { timeout: 120000 });

        // 2. Fill credentials from environment variables
        await page.locator("#j_username").fill(LOCAL_USERNAME ?? "");
        await page.locator('input[name="j_password"]').fill(LOCAL_PASSWORD ?? "");

        // 3. Fix the Race Condition: Wrap the click and the load state together.
        // This ensures Playwright is already watching for the navigation 
        // at the exact moment the button is pressed.
        await Promise.all([
            page.waitForNavigation({ waitUntil: "load", timeout: 30000 }),
            page.locator('button[name="Submit"]').click(),
        ]);

        // 4. Critical validation: Check if Jenkins rejected the login.
        // Your previous code missed this because /loginError didn't match /login.
        const finalUrl = page.url();
        console.log("Current URL after login attempt:", finalUrl);

        if (finalUrl.includes("loginError")) {
            throw new Error("🛑 Jenkins Login Failed: Invalid credentials or Crumb mismatch. Check LOCAL_PASSWORD sync.");
        }

        // 5. Final Confirmation: Wait for a dashboard-specific element.
        // This guarantees the session is fully established before saving storageState.
        await page.waitForSelector("#side-panel", { timeout: 30000 });
        console.log("✅ Successfully reached the Dashboard.");
    }
    else {
        console.log("✅ Already on Dashboard. No login required.");
    }

    console.log("Current URL after login:", page.url());

    await page.context().storageState({ path: STORAGE_PATH });
    console.log(`✅ storageState created at: ${STORAGE_PATH}`);

    await browser.close();
}