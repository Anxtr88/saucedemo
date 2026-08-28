import { test as baseTest } from '@playwright/test'
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import LoginPage from '../pages/LoginPage';

exports.custTest = baseTest.extend({

    login: async ({ page }, use) => {
        const login = new LoginPage(page);
        await login.goto();
        await use(login);
    },
    product: async ({ page }, use) => await use(new ProductPage(page)),
    cart: async ({ page }, use) => await use(new CartPage(page)),
    checkout: async ({ page }, use) => await use(new CheckoutPage(page)),


})