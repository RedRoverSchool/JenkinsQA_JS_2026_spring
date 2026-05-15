export const jenkinsData = {
    multibranchPiplineName: "multibranchPiplineTest",
    invalidCharacters: ['!', '@', '#', '$', '%', '^', '&', '*', '/', '\\', '?', '<', '>', ':', '|'],
};
export async function navigateToHealthMetrics(page) {
    await page.locator("button[type='button']", { hasText: "Health metrics" }).scrollIntoViewIfNeeded();
    await page.locator("button[type='button']", { hasText: "Health metrics" }).click();
}
export async function chooseTheMetric(page, metricsOption) {
    await page.getByRole("button", { name: "Add metric" }).click();
    await page.getByRole("button", { name: metricsOption }).click();
}
export function cleanUpRedundantSpace(text) {
    return text.replace(/\s+/g, " ").replace(/Remove|Loading\.\.\.|\?/g, "").trim();
}
//# sourceMappingURL=am-data.js.map