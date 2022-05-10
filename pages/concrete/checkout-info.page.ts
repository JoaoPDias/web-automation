import { Locator, Page } from "@playwright/test";
import { IPage } from "../abstract/page.interface";
import pure from "pure-gen/index";
export class CheckoutInfoPage implements IPage {
  page: Page;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = this.page.locator("data-test=firstName");
    this.lastNameInput = this.page.locator("data-test=lastName");
    this.postalCodeInput = this.page.locator("data-test=postalCode");
    this.continueCheckoutButton = this.page.locator("data-test=continue");
  }

  async fillForm() {
    await this.firstNameInput.type(pure.name.firstName());
    await this.lastNameInput.type(pure.name.lastName());
    await this.postalCodeInput.type(pure.address.zipCode());
  }

  async submitForm() {
    await this.continueCheckoutButton.click();
  }
}
