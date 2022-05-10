export class Item {
  private _name: string;
  private _price: string;

  constructor(name: string, price: string) {
    this.name = name;
    this.price = price;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get price(): string {
    return this._price;
  }

  public set price(value: string) {
    this._price = value;
  }
}
