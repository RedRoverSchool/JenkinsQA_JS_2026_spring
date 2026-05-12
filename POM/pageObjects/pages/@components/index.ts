import { Page } from "@playwright/test";
import { Header } from "./Header";
import { Footer } from "./Footer";

export class BasePage {
	private _header: Header | null = null;
	private _footer: Footer | null = null;

	constructor(protected readonly page: Page) {}

	get header() {
		return (this._header ??= new Header(this.page));
	}

	get footer() {
		return (this._footer ??= new Footer(this.page));
	}
}
