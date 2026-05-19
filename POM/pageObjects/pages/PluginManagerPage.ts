import { BasePage } from "./@components";

export class PluginManagerPage extends BasePage {
        
    // locators
    mainTitle = () => this.page.getByRole('heading', { name: 'Plugins' });
    updatesTaskLink = () => this.page.getByText('Updates', { exact: true }); 
}