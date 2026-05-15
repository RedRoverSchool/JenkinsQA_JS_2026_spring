import { HomePage } from "./pages/HomePage";
import { NewItemPage } from "./pages/NewItemPage";
import { ConfigureFreestylePage } from "./pages/ConfigureFreestylePage";
import { FreestyleProjectPage } from "./pages/FreestyleProjectPage";
import { ManageJenkinsPage } from "./pages/ManageJenkinsPage";
import { ToolsPage } from "./pages/ToolsPage";
import { BuildHistoryPage } from "./pages/BuildHistoryPage";
import { Header } from "./pages/@components/Header";
export class App {
    page;
    _homePage = null;
    _newItemPage = null;
    _configureFreestylePage = null;
    _freestyleProjectPage = null;
    _manageJenkisPage = null;
    _toolsPage = null;
    _buildHistoryPage = null;
    _header = null;
    constructor(page) {
        this.page = page;
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
    get manageJenkinsPage() {
        return (this._manageJenkisPage ??= new ManageJenkinsPage(this.page));
    }
    get toolsPage() {
        return (this._toolsPage ??= new ToolsPage(this.page));
    }
    get buildHistoryPage() {
        return (this._buildHistoryPage ??= new BuildHistoryPage(this.page));
    }
    get header() {
        return (this._header ??= new Header(this.page));
    }
}
//# sourceMappingURL=App.js.map