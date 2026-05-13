import { Page } from "@playwright/test";
import { HomePage } from "./pages/HomePage";
import { NewItemPage } from "./pages/NewItemPage";
import { ConfigureFreestylePage } from "./pages/ConfigureFreestylePage";
import { FolderPage } from "./pages/FolderPage";
import { ConfigureFolderPage } from "./pages/ConfigureFolderPage";

export class App {
	private _homePage: HomePage | null = null;
	private _newItemPage: NewItemPage | null = null;
	private _configureFreestylePage: ConfigureFreestylePage | null = null;
	private _folderPage?: FolderPage;
	private _configureFolderPage?: ConfigureFolderPage;

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

	get folderPage() {
		return (this._folderPage ??= new FolderPage(this.page));
	}

	get configureFolderPage() {
		return (this._configureFolderPage ??= new ConfigureFolderPage(this.page));
	}
}
