import { test } from "@playwright/test";

/**
 * Create an title with letters, numbers, an underscore and hyphens
 * @returns {string} title ex: specName_Nov-17-2025-18-22-16
 */
export function generateTitle() {
	const timeStemp = new Date().toString().split(" ").slice(1, 5).join("-").replaceAll(":", "-");

	// Use optional chaining (?.) and a default value (??)
	const match = test.info().file.match(/([^\/|\\]+)\.spec\.js/);
	const spectName = match ? match[1] : "unknown-spec";

	return `${spectName}_${timeStemp}`;
}

export const validationMsgLocator = ".input-message-disabled";
