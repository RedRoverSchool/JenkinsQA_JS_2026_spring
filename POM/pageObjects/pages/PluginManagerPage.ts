import { BasePage } from "./@components";

export class PluginManagerPage extends BasePage {
        
    // locators
    mainTitle = () => this.page.getByRole('heading', { name: 'Plugins' });
    updatesTaskLink = () => this.page.getByText('Updates', { exact: true }); 
    updateButton = () => this.page.getByRole('button', { name: 'Update' });
    availablepluginsLink = () => this.page.getByRole('link', { name: 'Available plugins' })
    pluginsTableContent = () => this.page.locator('tbody tr')

    async clickAvailableplugins() {
        await this.availablepluginsLink().click()
    }


}