import { Page } from "@playwright/test";

export const jenkinsData = {
    multibranchPiplineName : "multibranchPiplineTest",
    invalidCharacters : ['!', '@', '#', '$', '%', '^', '&', '*', '/', '\\', '?', '<', '>', ':', '|'], 
};

export async function navigateToHealthMetrics(page : Page) : Promise<void> { 
    await page.locator("button[type='button']", {hasText : "Health metrics"}).scrollIntoViewIfNeeded();
    await page.locator("button[type='button']", {hasText : "Health metrics"}).click();
}

export type HealthMetricsOptions =
    | "Child item with the given name"
    | "Child item with worst health"
    | "Health of the primary branch of a repository"; 

export async function chooseTheMetric(page : Page, metricsOption : HealthMetricsOptions) : Promise<void> {
    await page.getByRole("button", {name : "Add metric"}).click();
    const dropdown = page.locator(".jenkins-dropdown:visible")
    await page.getByRole("button", {name : metricsOption}).click();
}

export function cleanUpRedundantSpace(text : string) : string {
    return text.replace(/\s+/g, " ").replace(/Remove|Loading\.\.\.|\?/g, "").trim();
}