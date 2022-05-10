import { Locator, Page } from "@playwright/test";
import { Item } from "../../models/item.model";
import { getRemoveItemFromCartDataTest } from "../../utils/test.utils";
import { IPage } from "../abstract/page.interface";

export class CartPage implements IPage {
  readonly page: Page;
  readonly removeItemFromCartButton: (itemName: string) => Locator;
  readonly goToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.removeItemFromCartButton = (itemName: string): Locator => {
      return this.page.locator(getRemoveItemFromCartDataTest(itemName));
    };
    this.goToCheckoutButton = this.page.locator("data-test=checkout");
  }

  async removeItemFromCart(item: Item) {
    await this.removeItemFromCartButton(item.name).click();
  }

  async goToCheckout() {
    await this.goToCheckoutButton.click();
  }
}
