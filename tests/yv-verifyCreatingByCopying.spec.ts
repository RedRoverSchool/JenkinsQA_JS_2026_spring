import {test, expect, Page} from "@/base";
import { dataYV, descItem, NewItemWhithDescription } from "./testData/yv-data";

test.describe("US_01.003 | New Item > Copy from", () =>{
    test("TC_01.003.08 | Verify creating a new item by copying configuration from an existing item", async({page}:{page:Page}) =>{
        descItem(page);
    });
});