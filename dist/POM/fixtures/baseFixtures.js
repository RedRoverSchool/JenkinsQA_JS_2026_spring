import { test as base } from "../../base";
import { App } from "../../POM/pageObjects/App";
export const test = base.extend({
    app: async ({ page }, use) => {
        const app = new App(page);
        await use(app);
    }
});
export const expect = base.expect;
export { App };
//# sourceMappingURL=baseFixtures.js.map