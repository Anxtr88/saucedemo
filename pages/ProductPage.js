module.exports = class ProductPage {


    constructor(page) {
        this.productID = page.locator(".inventory_item_description");
        this.cart = page.locator(".shopping_cart_link");

    }

    async waitForItems() {
        await this.productID.first().waitFor();
    }

    async searchProductAddToCartByName(...productName) {

        for (let i = 0; i < productName.length; i++) {
            await this.productID.filter({ hasText: productName[i] }).getByRole("button", { name: "Add to cart" }).click();
        }
    }

    async navigateToCart() {
        await this.cart.click();

    }
}


