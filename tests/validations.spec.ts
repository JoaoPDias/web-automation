import { test, expect } from "@playwright/test";
import { ItemBuilder } from "../builders/item.builder";
import { UserBuilder } from "../builders/user.builder";
import { PageFactory } from "../pages/factory/page.factory";

const STANDARD_USER = UserBuilder.new().build();
/* 
I could pick items in execution time through the XPath methods, but if I had done it, I would lose the control about the test. 
The basis of e2e test is for a given input data, we have a expected result. 
Thus I prefer create this data using the given testing data in Saucedemo
*/
const ITEM_ONE = ItemBuilder.new().build();
const ITEM_TWO = ItemBuilder.new()
  .withName("Sauce Labs Bike Light")
  .withPrice("9.99")
  .build();
let Pages: PageFactory;
test.beforeEach(async ({ page }) => {
  Pages = new PageFactory(page);
  await page.goto("/");
});

test.describe("Saucedemo Validations", () => {
  test("should confirm that order was purchased", async () => {
    await Pages.Login.login(STANDARD_USER);
    await Pages.Inventory.addToCart(ITEM_ONE);
    await Pages.Inventory.addToCart(ITEM_TWO);
    await Pages.Inventory.goToCart();
  });
});
