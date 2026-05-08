const { test, expect } = require('@playwright/test');
const POManager = require('../pages/POManager');

const expectCartData = [
    {
        name: "Sauce Labs Bike Light",
        price: "$9.99",
        quantity: "1"
    },
    {
        name: "Sauce Labs Bolt T-Shirt",
        price: "$15.99",
        quantity: "1"
    }
];


test('Cart management and checkout cancellation', async ({ page }) => {
    const pomanager = new POManager(page)
    const login = pomanager.getLoginPage(page);
    await login.goto();
    await login.validLogin();

    const product = pomanager.getProductPage(page);
    await product.waitForItems();
    await product.searchProductAddToCartByName('Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt');
    await product.navigateToCart();

    const cart = pomanager.getCartPage(page);
    await cart.waitforCartItem();
    // console.log(await cart.getItemName());
    // const cartProduct = await cart.getItemName();
    // expect(cartProduct).toEqual(expect.arrayContaining(['Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt']));

    let actualCart = await cart.getCartDetail();
    await expect(actualCart).toEqual(expectCartData);
    await cart.removeProduct();
    actualCart = await cart.getCartDetail();
    await expect(actualCart).toContainEqual(expectCartData[1]);
    await cart.opencheckOut();

    const checkout = pomanager.getCheckoutPage();
    await checkout.clickCancel();
    await cart.waitforCartItem();
    await expect(actualCart).toContainEqual(expectCartData[1]);







})