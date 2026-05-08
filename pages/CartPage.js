const { expect } = require('@playwright/test');
const CheckoutPage2 = require('./CheckoutPage2');
// const CheckoutPage2 = require('./CheckoutPage2');
module.exports = class CartPage {
    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        // const checkout = new CheckoutPage2();
        this.cartList = page.locator(".cart_list");
        this.productLink = page.locator('[data-test="item-1-title-link"]');
        this.productName = page.locator('[data-test="inventory-item-name"]');
        this.checkoutLink = page.getByRole("button", { name: "Checkout" });
        this.removeButton = page.getByRole("button", { name: "Remove" });

        this.cartItems = page.locator('.cart_item');
        this.itemName = page.locator('.inventory_item_name');
        this.itemQuantity = page.locator('.cart_quantity');
        this.itemPrice = page.locator('.inventory_item_price');

    }

    async waitforCartItem() {
        await this.cartList.first().waitFor();
    }

    // async getItemName() {
    //     return await this.itemName.allTextContents();
    // }

    async getCartDetail() {
        const itemscount = await this.cartItems.count();;
        // console.log(itemscount);

        const cartData = [];

        for (let i = 0; i < itemscount; i++) {
            const item = this.cartItems.nth(i);
            const name = item.locator('.inventory_item_name').innerText();
            const price = item.locator('.inventory_item_price').innerText();
            const quantity = item.locator('.cart_quantity').innerText();

            cartData.push({
                name: await name,
                price: await price,
                quantity: await quantity
            });
        }
        return cartData;
    }

    async removeProduct() {
        await this.removeButton.first().click();

    }

    async opencheckOut() {
        await this.checkoutLink.click();
    }

};

