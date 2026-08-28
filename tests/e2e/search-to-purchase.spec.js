import { expect } from '@playwright/test';
const { custTest } = require('../../fixtures/POFixtures')
// const CartPage = require('../../pages/CartPage');
// // const LoginPage = require('../../pages/LoginPage');
// const ProductPage = require('../../pages/ProductPage');
// const CheckoutPage = require('../../pages/CheckoutPage');

// import { CheckoutPage } from '../../pageobject/CheckoutPage';

custTest('Verify login app', async ({ page, login, product, cart, checkout }) => {

    await login.validLogin();

    await product.waitForItems();
    await product.searchProductAddToCartByName("Sauce Labs Bolt T-Shirt");
    await product.navigateToCart();

    // await page.pause();

    await cart.waitforCartItem()
    await cart.getCartDetail();
    await cart.opencheckOut();


    await checkout.checkOutInformation("Axeon", "Dio", "34567");
    await checkout.clickContinue();
    await checkout.clickFinish();

    await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!");

})