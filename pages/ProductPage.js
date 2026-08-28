module.exports = class ProductPage {


    constructor(page) {
        this.productID = page.locator(".inventory_item_description");
        this.cart = page.locator(".shopping_cart_link");
        this.sideMenu = page.getByRole('button', { name: ' Open Menu' });
        this.selectAllItems = page.locator('#inventory_sidebar_link');
        this.reset = page.locator('#reset_sidebar_link');

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

    async sideMenu() {
        await page.getByRole('button', { name: ' Open Menu' }).click();
        await page.locator('#inventory_sidebar_link').click();
        await expect(page.locator('#contents_wrapper')).toBeVisible();

        await page.locator('#reset_sidebar_link').click();
        await expect(page.locator('.shopping_cart_badge')).toBeHidden();
        const count = await addProduct.productID.count();
        for (let i = 0; i < count; i++) {
            await expect.soft(addProduct.productID.nth(i).getByRole("button", { name: "Add to cart" })).toBeVisible();
        }
        await page.locator('#logout_sidebar_link').click();
        await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    }
}









