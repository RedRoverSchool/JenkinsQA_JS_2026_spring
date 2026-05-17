import { BasePage } from "./@components";

export class ToolsPage extends BasePage {
    async getCurrentUrl() {
        return this.page.url();
    }
    getTitle(title: string){
       return this.page.getByText(title)
    }
}
