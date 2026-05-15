import { Page } from "@playwright/test";
import { HomePage } from "./pages/HomePage";
import { NewItemPage } from "./pages/NewItemPage";
import { ConfigureFreestylePage } from "./pages/ConfigureFreestylePage";
import { FreestyleProjectPage } from "./pages/FreestyleProjectPage";
import { ManageJenkinsPage } from "./pages/ManageJenkinsPage";
import { ToolsPage } from "./pages/ToolsPage";
import { PluginsPage } from "./pages/PluginsPage";
import { FolderPage } from "./pages/FolderPage";
import { ConfigureFolderPage } from "./pages/ConfigureFolderPage";

export class App {
  private _homePage: HomePage | null = null;
  private _newItemPage: NewItemPage | null = null;
  private _configureFreestylePage: ConfigureFreestylePage | null = null;
  private _folderPage?: FolderPage;
  private _configureFolderPage?: ConfigureFolderPage;
  private _freestyleProjectPage: FreestyleProjectPage | null = null;
  private _manageJenkisPage: ManageJenkinsPage | null = null;
  private _toolsPage: ToolsPage | null = null;
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
    return (this._configureFreestylePage ??= new ConfigureFreestylePage(
      this.page,
    ));
  }

  get freeStyleProjectPage() {
    return (this._freestyleProjectPage ??= new FreestyleProjectPage(this.page));
  }

  get manageJenkinsPage() {
    return (this._manageJenkinsPage ??= new ManageJenkinsPage(this.page));
  }

  get toolsPage() {
    return (this._toolsPage ??= new ToolsPage(this.page));
  }

  get pluginsPage() {
    return (this._pluginsPage ??= new PluginsPage(this.page));
  }
}
