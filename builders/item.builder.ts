import { Item } from "../models/item.model";

export class ItemBuilder {
  private name = "Sauce Labs Backpack";
  private price = "29.99";

  static new(): ItemBuilder {
    return new ItemBuilder();
  }

  withName(name: string) {
    this.name = name;
  }

  withPrice(price: string) {
    this.price = price;
  }

  build(): Item {
    return new Item(this.name, this.price);
  }
}
