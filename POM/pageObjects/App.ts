import { Page } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { NewItemPage } from './pages/NewItemPage';
import { ConfigureFreestylePage } from './pages/ConfigureFreestylePage';
import { FreestyleProjectPage } from './pages/FreestyleProjectPage';

export class App {
  private _homePage: HomePage | null = null;
  private _newItemPage: NewItemPage | null = null;
  private _configureFreestylePage: ConfigureFreestylePage | null = null;
  private _freestyleProjectPage: FreestyleProjectPage | null = null;

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

  get freeStyleProjectPage() {
    return (this._freestyleProjectPage ??= new FreestyleProjectPage(this.page));
  }
}
