import { Page } from "@playwright/test";
import { IPage } from "../abstract/page.interface";
import { InventoryPage } from "../concrete/inventory.page";
import { LoginPage } from "../concrete/login.page";

export class PageFactory {
  constructor(readonly page: Page) {}

  get Login(): LoginPage {
    return this.GetPage<LoginPage>(LoginPage);
  }

  get Inventory(): InventoryPage {
    return this.GetPage<InventoryPage>(InventoryPage);
  }

  GetPage<T extends IPage>(type: new (root: Page) => T): T {
    return new type(this.page);
  }
}
