const { test, expect } = require('@playwright/test');
const CartPage = require('../../pages/CartPage');
const LoginPage = require('../../pages/LoginPage');
const ProductPage = require('../../pages/ProductPage');
const CheckoutPage2 = require('../../pages/CheckoutPage2');

test('validate checkout overview', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.validLogin();

    const product = new ProductPage(page);
    await product.waitForItems();
    await product.searchProductAddToCartByName('Sauce Labs Bike Light');
    await product.navigateToCart();

    const cart = new CartPage(page);
    await cart.waitforCartItem();
    await cart.validateCart('Sauce Labs Bike Light');
    await cart.opencheckOut();

    const checkout = new CheckoutPage2(page);
    await checkout.checkOutInformation("Axeon", "Dio", "34567");
    await checkout.clickContinue();
    await checkout.waitForOverview();

    // Use CheckoutPage getters (string assertions)
    expect(await checkout.getItemName()).toBe('Sauce Labs Bike Light');
    expect(await checkout.getItemQuantity()).toBe('1');
    expect(await checkout.getPaymentInfoText()).toContain('SauceCard #31337');
    expect(await checkout.getShippingInfoText()).toContain('Free Pony Express Delivery!');

    // Visible-text regex checks (optional)
    await expect(checkout.itemTotalLabel).toHaveText(/Item total: \$9\.99/);
    await expect(checkout.taxLabel).toHaveText(/Tax: \$0\.80/);
    await expect(checkout.totalLabel).toHaveText(/Total: \$10\.79/);

    // Numeric assertions
    const itemTotal = parseFloat((await checkout.getItemTotalText()).replace(/[^\d.]/g, ''));
    const tax = parseFloat((await checkout.getTaxText()).replace(/[^\d.]/g, ''));
    const total = parseFloat((await checkout.getTotalText()).replace(/[^\d.]/g, ''));

    expect(itemTotal).toBeCloseTo(9.99, 2);
    expect(tax).toBeCloseTo(0.80, 2);
    expect(total).toBeCloseTo(itemTotal + tax, 2);

    // Finish and assert completion
    await checkout.clickFinish();
    await expect(page).toHaveURL(/checkout-complete|order-confirmation/);
});