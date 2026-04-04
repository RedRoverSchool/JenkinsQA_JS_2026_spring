import { Page } from "@playwright/test";
import { Header } from "./Header";
import { Footer } from "./Footer";

export class BasePage {
	#header: Header | null = null;
	#footer: Footer | null = null;

	constructor(protected readonly page: Page) {}
	
	get header() {
		return (this.#header ??= new Header(this.page));
	}

	get footer() {
		return (this.#footer ??= new Footer(this.page));
	}
}
