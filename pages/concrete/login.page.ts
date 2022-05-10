import { Locator, Page } from "@playwright/test";
import { User } from "../../models/user.model";
import { IPage } from "../abstract/page.interface";
export class LoginPage implements IPage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = this.page.locator("[data-test='username']");
    this.passwordInput = this.page.locator("[data-test='password']");
    this.loginButton = this.page.locator("[data-test='login-button']");
  }

  async login(user: User) {
    await this.usernameInput.type(user.username);
    await this.passwordInput.type(user.password);
    await this.loginButton.click();
  }
}
