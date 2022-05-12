import { expect, test } from "@playwright/test";
import { ItemBuilder } from "../builders/item.builder";
import { UserBuilder } from "../builders/user.builder";
import { PageFactory } from "../pages/factory/page.factory";

const STANDARD_USER = UserBuilder.new().build();
const LOCKED_OUT_USER = UserBuilder.new()
  .withUsername("locked_out_user")
  .build();
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
    await Pages.Cart.removeItemFromCart(ITEM_TWO);
    await Pages.Cart.goToCheckout();
    await Pages.CheckoutInfo.fillForm();
    await Pages.CheckoutInfo.submitForm();
    expect(await Pages.CheckoutOverview.getItemsList()).toHaveLength(1);
    expect(await Pages.CheckoutOverview.getItemsList()).toContainEqual(
      ITEM_ONE.name
    );
    expect(await Pages.CheckoutOverview.getItemTotalPrice()).toBe(
      `Item total: $${ITEM_ONE.price}`
    );
    await Pages.CheckoutOverview.finishCheckout();
    expect(await Pages.CheckoutOverview.getMessageConfirmation()).toBe(
      "THANK YOU FOR YOUR ORDER"
    );
  });

  test("should sort items by name(Z to A)", async () => {
    await Pages.Login.login(STANDARD_USER);
    await Pages.Inventory.sortItemsByName();
    /* Getting items using xPath represents the order that they are in screen, because the xPath maps the HTML DOM and there the elements are ordered by Name or Price, it depends on the action that was done.
    Hence, we got the list of items displayed in browser and ordered in Typescript and compare them strictly, thus the beyond the value, the order that value is on array is evaluate in assertion.
    */
    const actualItemsSorted = await Pages.Inventory.getItems();
    const expectedItemsSorted = [...actualItemsSorted].sort((a, b) =>
      b.localeCompare(a)
    );
    expect(actualItemsSorted).toStrictEqual(expectedItemsSorted);
  });

  test("should sort items by price(low to high)", async () => {
    await Pages.Login.login(STANDARD_USER);
    await Pages.Inventory.sortItemsByPrice();
    const actualItemsSorted = await Pages.Inventory.getItemsPriceAscending();
    const expectedItemsSorted = [...actualItemsSorted].sort((a, b) => a - b);
    expect(actualItemsSorted).toStrictEqual(expectedItemsSorted);
  });

  test("should fail and take a screenshot", async ({ page }) => {
    await Pages.Login.login(LOCKED_OUT_USER);
    //Here the test expects that the url changes after the login. But the user is locked out, therefore we got an error. 
    expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");
  });
});
