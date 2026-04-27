import { parallelCanAssignHelpers } from '@cucumber/cucumber';
import { test, expect } from '@playwright/test';

test('Verify login app', async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "login" }).click();

    await page.locator(".inventory_item_description").first().waitFor();
    await page.locator(".inventory_item_description").filter({ hasText: "Sauce Labs Bolt T-Shirt" }).getByRole("button", { name: "Add to cart" }).click();
    await page.locator(".shopping_cart_link").click();
    // await page.pause();

    await page.locator(".cart_list").first().waitFor();
    await expect(page.locator('[data-test="item-1-title-link"]')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Bolt T-Shirt');
    await page.getByRole("button", { name: "Checkout" }).click();

    await page.getByPlaceholder("First Name").fill("Axeon");
    await page.getByPlaceholder("Last Name").fill("Ditto");
    await page.getByPlaceholder("Zip/Postal Code").fill("23456");

    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("button", { name: "Finish" }).click();

    await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!");






})