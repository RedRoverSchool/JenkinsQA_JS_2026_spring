import { BasePage } from "./@components";

export class PluginsPage extends BasePage {
        
    // locators
    pageTitle = () => this.page.getByRole('heading', { name: 'Plugins' });
 
}