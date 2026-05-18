import { BasePage } from "./@components";

export class PluginsPage extends BasePage {
        
    // locators
    mainTitle = () => this.page.getByRole('heading', { name: 'Plugins' });
    updatesTaskLink = () => this.page.getByText('Updates', { exact: true }); 
}