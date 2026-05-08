const CartPage = require('./CartPage');
const LoginPage = require('./LoginPage');
const ProductPage = require('./ProductPage');
const CheckoutPage2 = require('./CheckoutPage2');

module.exports = class POManager {

    constructor(page) {
        this.login = new LoginPage(page);
        this.product = new ProductPage(page);
        this.cart = new CartPage(page);
        this.checkout = new CheckoutPage2(page);
    }

    getLoginPage() {
        return this.login;
    }
    getProductPage() {
        return this.product
    }
    getCartPage() {
        return this.cart
    }
    getCheckoutPage() {
        return this.checkout
    }

};