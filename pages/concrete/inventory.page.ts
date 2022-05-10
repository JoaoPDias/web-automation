import { Locator, Page } from "@playwright/test";
import { Item } from "../../models/item.model";
import { getAddItemToCartDataTest } from "../../utils/test.utils";
import { IPage } from "../abstract/page.interface";

export class InventoryPage implements IPage {
  readonly page: Page;
  private readonly addToCartButton: (itemName: string) => Locator;
  private readonly goToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = (itemName: string): Locator => {
      return this.page.locator(getAddItemToCartDataTest(itemName));
    };
    this.goToCartButton = this.page.locator("//a[@class='shopping_cart_link']");
  }

  async addToCart(item: Item) {
    await this.addToCartButton(item.name).click();
  }

  async goToCart() {
    await this.goToCartButton.click();
  }
}
