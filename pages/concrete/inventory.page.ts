import { Locator, Page } from "@playwright/test";
import { Item } from "../../models/item.model";
import { getAddItemToCartDataTest } from "../../utils/test.utils";
import { IPage } from "../abstract/page.interface";

export class InventoryPage implements IPage {
  
  
  readonly page: Page;
  private readonly addItemToCartButton: (itemName: string) => Locator;
  private readonly goToCartButton: Locator;
  private readonly itemSortSelect: Locator;
  private readonly itemsList: Locator;
  private readonly itemsPriceList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addItemToCartButton = (itemName: string): Locator => {
      return this.page.locator(getAddItemToCartDataTest(itemName));
    };
    this.goToCartButton = this.page.locator("//a[@class='shopping_cart_link']");
    this.itemSortSelect = this.page.locator("data-test=product_sort_container")
    this.itemsList = this.page.locator("//div[@class='inventory_item_name']")
    this.itemsPriceList = this.page.locator("//div[@class='inventory_item_price']")
  }

  async addToCart(item: Item) {
    await this.addItemToCartButton(item.name).click();
  }

  async goToCart() {
    await this.goToCartButton.click();
  }

  async sortItemsByName() {
    await this.itemSortSelect.selectOption('za')
  }

  //I could passed by parameter the Option and avoid the method creation below, but sometimes we have to prioritize the test code cleanliness rather than DRY
  async sortItemsByPrice() {
    await this.itemSortSelect.selectOption('lohi')
  }

  async getItems():Promise<string[]> {
    return await this.itemsList.allTextContents();
  }

  async getItemsPriceAscending():Promise<number[]> {
    const pricelist = await this.itemsPriceList.allTextContents();
    return (pricelist).map(x=>Number(x.trim().replace("$","")));
  }
}
