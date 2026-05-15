import { Header } from "./Header";
import { Footer } from "./Footer";
export class BasePage {
    page;
    _header = null;
    _footer = null;
    constructor(page) {
        this.page = page;
    }
    get header() {
        return (this._header ??= new Header(this.page));
    }
    get footer() {
        return (this._footer ??= new Footer(this.page));
    }
}
//# sourceMappingURL=index.js.map