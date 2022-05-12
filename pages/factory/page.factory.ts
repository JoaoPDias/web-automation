import { Page } from "@playwright/test";
import { IPage } from "../abstract/page.interface";
import { CartPage } from "../concrete/cart.page";
import { CheckoutInfoPage } from "../concrete/checkout-info.page";
import { CheckoutOverviewPage } from "../concrete/checkout-overview.page";
import { InventoryPage } from "../concrete/inventory.page";
import { LoginPage } from "../concrete/login.page";
/*
  This factory is responsible for dynamic creation of Page Objects. Using the composition over Inheritance principle, 
  I created an interface with a Playwright Page as an attribute and implemented in every PageObject Class, thus it is possible create the instances dynamically through Generics.
  One point to improve is the new creation always that the Get is called, if the quantity of pages increase, maybe it can present a performance issues. 
*/
export class PageFactory {
  constructor(readonly page: Page) {}

  get Login(): LoginPage {
    return this.GetPage<LoginPage>(LoginPage);
  }

  get Inventory(): InventoryPage {
    return this.GetPage<InventoryPage>(InventoryPage);
  }

  get Cart(): CartPage {
    return this.GetPage<CartPage>(CartPage);
  }

  get CheckoutInfo(): CheckoutInfoPage {
    return this.GetPage<CheckoutInfoPage>(CheckoutInfoPage);
  }

  get CheckoutOverview(): CheckoutOverviewPage {
    return this.GetPage<CheckoutOverviewPage>(CheckoutOverviewPage);
  }

  GetPage<T extends IPage>(type: new (root: Page) => T): T {
    return new type(this.page);
  }
}
