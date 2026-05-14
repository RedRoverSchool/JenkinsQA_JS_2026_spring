import {Page} from '@playwright/test';
import {HomePage} from './pages/HomePage';
import {NewItemPage} from './pages/NewItemPage';
import {ConfigureFreestylePage} from './pages/ConfigureFreestylePage';
import {FreestyleProjectPage} from './pages/FreestyleProjectPage';
import {ConfigureFolderPage} from "@/POM/pageObjects/pages/ConfigureFolderPage";
import {FolderPage} from "@/POM/pageObjects/pages/FolderPage";

export class App {
    private _homePage: HomePage | null = null;
    private _newItemPage: NewItemPage | null = null;
    private _configureFreestylePage: ConfigureFreestylePage | null = null;
    private _freestyleProjectPage: FreestyleProjectPage | null = null;
    private _configureFolderPage: ConfigureFolderPage | null = null;
    private _folderPage: FolderPage | null = null;

    constructor(private readonly page: Page) {
    }

    get homePage() {
        return (this._homePage ??= new HomePage(this.page));
    }

    get newItemPage() {
        return (this._newItemPage ??= new NewItemPage(this.page));
    }

    get configureFreestylePage() {
        return (this._configureFreestylePage ??= new ConfigureFreestylePage(this.page));
    }

    get freeStyleProjectPage() {
        return (this._freestyleProjectPage ??= new FreestyleProjectPage(this.page));
    }

    get configureFolderPage() {
        return (this._configureFolderPage ??= new ConfigureFolderPage(this.page));
    }

    get folderPage() {
        return (this._folderPage ??= new FolderPage(this.page));
    }
}
