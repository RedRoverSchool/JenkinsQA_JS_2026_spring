import { test as base } from "../../base";
import { NewItemWhithDescription } from "../testData/yv-data";
export const test = base.extend({
    createNewFreeProj: async ({ page }, use) => {
        const newItem = new NewItemWhithDescription(page);
        await newItem.createFreestyleProj();
        await use(page);
    }
});
export { expect } from "../../base";
//# sourceMappingURL=yv-fix.js.map