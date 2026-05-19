import { BasePage } from "./@components";

export class PluginsPage extends BasePage {
        
    // locators
    mainTitle = () => this.page.getByRole('heading', { name: 'Plugins' });
    updatesTaskLink = () => this.page.getByText('Updates', { exact: true }); 
    availablepluginsLink = () => this.page.getByRole('link', { name: 'Available plugins' })
    plaginsName = (name: string) =>  this.page.locator('a.jenkins-table__link').filter({
        hasText: name
    }).first();

    async clickAvailableplugins() {
        await this.availablepluginsLink().click()
    }


}