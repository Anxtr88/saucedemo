import { test, expect } from '@playwright/test';
const CartPage = require('../../pages/CartPage');
const LoginPage = require('../../pages/LoginPage');
const ProductPage = require('../../pages/ProductPage');
const CheckoutPage = require('../../pages/CheckoutPage');

// import { CheckoutPage } from '../../pageobject/CheckoutPage';

test('Verify login app', async ({ page }) => {

    const login = new LoginPage(page);
    await login.goto();
    await login.validLogin();

    const product = new ProductPage(page);
    await product.waitForItems();
    await product.searchProductAddToCartByName("Sauce Labs Bolt T-Shirt");
    await product.navigateToCart();

    // await page.pause();
    const cart = new CartPage(page);
    await cart.waitforCartItem()
    await cart.validateCart("Sauce Labs Bolt T-Shirt");
    await cart.opencheckOut();

    const checkout = new CheckoutPage(page);
    await checkout.checkOutInformation("Axeon", "Dio", "34567");
    await checkout.clickContinue();
    await checkout.clickFinish();

    await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!");






})