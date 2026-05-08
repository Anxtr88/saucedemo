import { expect, test } from '@playwright/test';
import { escape } from 'node:querystring';

const POManager = require('../pages/POManager');

// **Steps:**
//   1. Log in with standard_user and secret_sauce
//     - expect: Inventory page loads.
//   2. Change product sort order to Name (Z to A)
//     - expect: Products reorder correctly in descending name order.
//   3. Change sort order to Price (low to high)
//     - expect: Products reorder by ascending price.
//   4. Click a product name to view its detail page
//     - expect: Product detail page opens with full description, price, and Add to cart button.
//   5. Navigate back to inventory and verify cart state persists
//     - expect: Cart badge still reflects items added before viewing details.

test('Inventory sorting and item details navigation', async ({ page }) => {

    const poManager = new POManager(page);
    const login = poManager.getLoginPage();
    await login.goto();
    await login.validLogin();
    const productpage = await page.locator('span.title').isVisible();
    await expect(productpage).toBeTruthy();

    //2
    const product = poManager.getProductPage();
    await page.locator('.product_sort_container').selectOption('za');
    const itemNames = await page.locator('.inventory_item_name').allTextContents();
    const expectedDescendingNames = [...itemNames].sort((a, b) => b.localeCompare(a));
    await expect(itemNames).toEqual(expectedDescendingNames);

    //3
    await page.locator('.product_sort_container').selectOption('lohi');
    const itemPrices = await page.locator('.inventory_item_price').allTextContents();
    const prices = itemPrices.map(p => parseFloat(p.replace('$', '')));
    const expectedAscendingPrices = [...prices].sort((a, b) => a - b);
    await expect(prices).toEqual(expectedAscendingPrices);
    //4
    await product.productID.filter({ hasText: 'Sauce Labs Bike Light' }).locator('#item_0_title_link').click();

    //new page
    const productDetail = page.locator('.inventory_details_container');
    await expect(productDetail).toContainText("Sauce Labs Bike Light");
    await expect(productDetail).toContainText("A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.");
    await expect(productDetail.locator(".inventory_details_price")).toContainText("9.99");
    await expect(productDetail.getByRole("button")).toBeVisible();
    await page.locator("button[name = 'back-to-products']").click();

    //5
    await expect(page.locator('.shopping_cart_badge')).toBeHidden();











});