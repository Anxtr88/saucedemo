import { expect } from '@playwright/test';
module.exports = class CartPage {
    constructor(page) {
        this.cartList = page.locator(".cart_list");
        this.productLink = page.locator('[data-test="item-1-title-link"]');
        this.productName = page.locator('[data-test="inventory-item-name"]');
        this.checkoutLink = page.getByRole("button", { name: "Checkout" });

    }

    async waitforCartItem() {
        await this.cartList.first().waitFor();
    }

    async validateCart(productName) {
        // await expect(this.productLink).toBeVisible();
        await expect(this.productName).toContainText(productName);

    }

    async opencheckOut() {
        await this.checkoutLink.click();
    }

};

