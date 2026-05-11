import {test as base, Page} from "@/base";
import { NewItemWhithDescription } from "../testData/yv-data";

export interface fixtures {
    createNewFreeProj: Page;
}

export const test = base.extend<fixtures>({
    createNewFreeProj: async({page}, use) => {
        const newItem = new NewItemWhithDescription(page);
        await newItem.createFreestyleProj();

        await  use(page);
    }
});

export type {Page}
export { expect } from "@/base";