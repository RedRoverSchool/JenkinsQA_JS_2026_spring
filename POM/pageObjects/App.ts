import { Page } from "@playwright/test";
import { HomePage } from "./pages/HomePage";
import { NewItemPage } from "./pages/NewItemPage";
import { ConfigureFreestylePage } from "./pages/ConfigureFreestylePage";

export class App {
	#homePage: HomePage | null = null;
	#newItemPage: NewItemPage | null = null;
	#configureFreestylePage: ConfigureFreestylePage | null = null;

	constructor(private readonly page: Page) {}
	
	get homePage() {
		return (this.#homePage ??= new HomePage(this.page));
	}

	get newItemPage() {
		return (this.#newItemPage ??= new NewItemPage(this.page));
	}

	get configureFreestylePage() {
		return (this.#configureFreestylePage ??= new ConfigureFreestylePage(this.page));
	}
}
