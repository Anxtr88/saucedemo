const { test, expect } = require("@playwright/test");
const POManager = require('../pages/POManager');
/*
**Steps:**
  1. Log in with standard_user and secret_sauce
    - expect: Inventory page loads.
  2. Open the side menu and select All Items
    - expect: The inventory page remains visible and the All Items menu item is active.
  3. Open the side menu and click Reset App State
    - expect: Any cart contents are removed and item buttons revert to Add to cart.
  4. Open the side menu and click Logout
    - expect: User is returned to the login page and cannot access inventory without re-login.
*/

test('Menu actions and application reset', async ({ page }) => {
  const poManager = new POManager(page);

  const login = poManager.getLoginPage();
  await login.goto();
  await login.validLogin();

  const productpage = await page.locator('span.title').isVisible();
  await expect(productpage).toBeTruthy();

  await page.getByRole('button', { name: ' Open Menu' }).click();
  await page.locator('#inventory_sidebar_link').click();
  await expect(page.locator('#contents_wrapper')).toBeVisible();

  const addProduct = poManager.getProductPage()
  await addProduct.searchProductAddToCartByName("Sauce Labs Bike Light");

  await page.locator('#reset_sidebar_link').click();
  await expect(page.locator('.shopping_cart_badge')).toBeHidden();
  const count = await addProduct.productID.count();
  for (let i = 0; i < count; i++) {
    await expect.soft(addProduct.productID.nth(i).getByRole("button", { name: "Add to cart" })).toBeVisible();
  }

  // await page.getByRole('button', { name: ' Open Menu' }).click();
  await page.locator('#logout_sidebar_link').click();
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
})
