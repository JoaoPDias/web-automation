import { Locator, Page } from "@playwright/test";
import { IPage } from "../abstract/page.interface";
export class CheckoutOverviewPage implements IPage {
  page: Page;
  private readonly itemsList: Locator;
  private readonly itemTotalPrice: Locator;
  private readonly finishCheckoutButton: Locator;
  private readonly messageConfirmationLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemsList = this.page.locator("//div[@class='inventory_item_name']");
    this.itemTotalPrice = this.page.locator(
      "//div[@class='summary_subtotal_label']"
    );
    this.finishCheckoutButton = this.page.locator("data-test=finish");
    this.messageConfirmationLabel = this.page.locator(
      "//h2[@class='complete-header']"
    );
  }

  async getItemsList(): Promise<string[]> {
    return await this.itemsList.allTextContents();
  }

  async getItemTotalPrice(): Promise<string> {
    return await this.itemTotalPrice.textContent();
  }

  async finishCheckout(): Promise<void> {
    await this.finishCheckoutButton.click();
  }

  //Even though the page of this message is other, I don't see why create other page object to represent this tiny element and its text.
  async getMessageConfirmation(): Promise<string> {
    return await this.messageConfirmationLabel.textContent();
  }
}
