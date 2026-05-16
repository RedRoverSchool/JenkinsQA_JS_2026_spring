import { BasePage } from "./@components";

export class ConfigureMultibranchPage extends BasePage {
    healthMetricsSection = () => this.page.getByRole("button", {name : "Health metrics"});
    
    async clickHealthMetricsSection() {
        await this.healthMetricsSection().click();
        return this;
    } 
}