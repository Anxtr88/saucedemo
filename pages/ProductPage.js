module.exports = class ProductPage {

    constructor(page) {
        this.productID = page.locator(".inventory_item_description");
        this.cart = page.locator(".shopping_cart_link");

    }

    async waitForItems() {
        await this.productID.first().waitFor();
    }

    async searchProductAddToCartByName(productName) {
        await this.productID.filter({ hasText: productName }).getByRole("button", { name: "Add to cart" }).click();
    }

    async navigateToCart() {
        await this.cart.click();

    }
}


