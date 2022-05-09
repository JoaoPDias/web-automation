import { test, expect, Page } from "@playwright/test";
import { UserBuilder } from "../builders/user.builder";
import { LoginPage } from "../pages/login.page";

const STANDARD_USER = UserBuilder.new().build();
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Saucedemo Validations", () => {
  test("should confirm that order was purchased", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(STANDARD_USER);
  });
});
