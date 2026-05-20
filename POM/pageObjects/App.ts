import { Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { HomePage } from "./pages/HomePage";
import { NewItemPage } from "./pages/NewItemPage";
import { ConfigureFreestylePage } from "./pages/ConfigureFreestylePage";
import { StatusPage } from "./pages/StatusPage";
import { FreestyleProjectPage } from "./pages/FreestyleProjectPage";
import { ManageJenkinsPage } from "./pages/ManageJenkinsPage";
import { ToolsPage } from "./pages/ToolsPage";
import { BuildHistoryPage } from "./pages/BuildHistoryPage";
import { Header } from "./pages/@components/Header";
import { PluginManagerPage } from "./pages/PluginManagerPage";
import { ConfigureFolderPage } from "./pages/ConfigureFolderPage";
import { ConfigurePipelinePage } from "./pages/ConfigurePipelinePage";
import { ConfigureOrganizationFolderPage } from "@/POM/pageObjects/pages/ConfigureOrganizationFolderPage";
import { ConfigureMultibranchPipelinePage } from "./pages/ConfigureMulribranchPipelinePage";
import { StatusFreestyleProjectPage } from "@/POM/pageObjects/pages/StatusFreestyleProjectPage";

export class App {
    private _homePage: HomePage | null = null;
    private _newItemPage: NewItemPage | null = null;
    private _configureFreestylePage: ConfigureFreestylePage | null = null;
    private _statusPage: StatusPage | null = null;
    private _freestyleProjectPage: FreestyleProjectPage | null = null;
    private _configureFolderPage?: ConfigureFolderPage;
    private _manageJenkinsPage: ManageJenkinsPage | null = null;
    private _toolsPage: ToolsPage | null = null;
    private _buildHistoryPage: BuildHistoryPage | null = null;
    private _header: Header | null = null;
    private _pluginManagerPage: PluginManagerPage | null = null;
    private _configurePipelinePage: ConfigurePipelinePage | null = null;
    private _configureOrganizationFolderPage: ConfigureOrganizationFolderPage | null =
        null;
    private _configureMultibranchPipelinePage: ConfigureMultibranchPipelinePage | null =
        null;
    private _statusFreestyleProjectPage: StatusFreestyleProjectPage | null =
        null;

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

    get configureFolderPage() {
        return (this._configureFolderPage ??= new ConfigureFolderPage(
            this.page,
        ));
    }

    get freeStyleProjectPage() {
        return (this._freestyleProjectPage ??= new FreestyleProjectPage(
            this.page,
        ));
    }

    get manageJenkinsPage() {
        return (this._manageJenkinsPage ??= new ManageJenkinsPage(this.page));
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

    get statusPage() {
        return (this._statusPage ??= new StatusPage(this.page));
    }

    get pluginManagerPage() {
        return (this._pluginManagerPage ??= new PluginManagerPage(this.page));
    }

    get configurePipelinePage() {
        return (this._configurePipelinePage ??= new ConfigurePipelinePage(
            this.page,
        ));
    }

    get configureOrganizationFolderPage() {
        return (this._configureOrganizationFolderPage ??=
            new ConfigureOrganizationFolderPage(this.page));
    }

    get configureMultibranchPipelinePage() {
        return (this._configureMultibranchPipelinePage ??=
            new ConfigureMultibranchPipelinePage(this.page));
    }

    get statusFreestyleProjectPage() {
        return (this._statusFreestyleProjectPage ??=
            new StatusFreestyleProjectPage(this.page));
    }

    async checkAccessibility(
        includeSelector?: string,
        excludeSelector?: string,
    ) {
        const builder = new AxeBuilder({ page: this.page }).withTags([
            "wcag2a",
            "wcag2aa",
        ]);

        if (includeSelector) {
            builder.include(includeSelector);
        }

        if (excludeSelector) {
            builder.exclude(excludeSelector);
        }

        const results = await builder.analyze();

        return results.violations;
    }
}
