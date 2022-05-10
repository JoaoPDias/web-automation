import { Item } from "../models/item.model";

export class ItemBuilder {
  private name = "Sauce Labs Backpack";
  private price = "29.99";

  static new(): ItemBuilder {
    return new ItemBuilder();
  }

  withName(name: string): ItemBuilder {
    this.name = name;
    return this;
  }

  withPrice(price: string): ItemBuilder {
    this.price = price;
    return this;
  }

  build(): Item {
    return new Item(this.name, this.price);
  }
}
