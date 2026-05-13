import { Page } from "@playwright/test";
import { HomePage } from "./pages/HomePage";
import { NewItemPage } from "./pages/NewItemPage";
import { ConfigureFreestylePage } from "./pages/ConfigureFreestylePage";
import { ManageJenkinsPage } from "@/POM/pageObjects/pages/ManageJenkinsPage";
import { PluginsPage } from "@/POM/pageObjects/pages/PluginsPage";

export class App {
	private _homePage: HomePage | null = null;
	private _newItemPage: NewItemPage | null = null;
	private _configureFreestylePage: ConfigureFreestylePage | null = null;
	private _manageJenkinsPage: ManageJenkinsPage | null = null;
	private _pluginsPage: PluginsPage | null = null;

	constructor(private readonly page: Page) {}

	get homePage() {
		return (this._homePage ??= new HomePage(this.page));
	}

	get newItemPage() {
		return (this._newItemPage ??= new NewItemPage(this.page));
	}

	get configureFreestylePage() {
		return (this._configureFreestylePage ??= new ConfigureFreestylePage(this.page));
	}

	get manageJenkinsPage() {
		return (this._manageJenkinsPage ??= new ManageJenkinsPage(this.page));
	}

	get pluginsPage() {
		return (this._pluginsPage ??= new PluginsPage(this.page));
	}
}
