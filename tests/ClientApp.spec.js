import test, { expect } from '@playwright/test'


test('@Web Client App end to end flow', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client")
    //tifot82673@kobace.com
    const loginEmail = page.locator("#userEmail");
    const loginPassword = page.locator("#userPassword");
    const productId = page.locator(".card-body");
    const productName = 'ZARA COAT 3';
    const cartClick = page.locator('[routerlink="/dashboard/cart"]');
    const checkout = page.locator('div li.totalRow button');
    const orderShippingCountry = page.locator('[placeholder*="Country"]');
    const countryDropdown = page.locator('section.ta-results');
    const orderShippingEmail = page.locator('.user__name [type="text"]').first();
    const placeOrder = page.locator('.action__submit');


    // login in the client App
    await loginEmail.fill("tifot82673@kobace.com");
    await loginPassword.fill("Tifot82673@");
    await page.locator("#login").click();

    // Searching product & adding to cart
    await productId.first().waitFor();
    // console.log(await productId.allTextContents());
    const count = await productId.count();
    for (let i = 0; i < count; i++) {

        const productTitle = await productId.nth(i).locator('b').textContent();
        if (productTitle === productName) {
            await productId.nth(i).locator('button').nth(1).click();
        }
    }

    await cartClick.click();
    await page.locator('div li').first().waitFor();

    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await checkout.click();

    // Shipping information

    await expect(orderShippingEmail).toHaveText("tifot82673@kobace.com");
    await orderShippingCountry.pressSequentially('ind')
    await countryDropdown.waitFor();
    const countryCount = await countryDropdown.locator('button').count();
    for (let i = 0; i < countryCount; i++) {
        const countryName = await countryDropdown.locator('button').nth(i).textContent();
        // console.log(countryName);

        if (countryName === ' India') {
            await countryDropdown.locator('button').nth(i).click();
            break;
        }

    }
    await placeOrder.click();
    await expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator('.em-spacer-1 label.ng-star-inserted').textContent();
    console.log(orderId);

    //69d8d835f86ba51a6558cb9b
    //Order TAB
    await page.locator('li [routerlink="/dashboard/myorders"]').click();
    await page.locator('tbody').waitFor();

    const row = await page.locator('tbody tr');
    for (let i = 0; i < await row.count(); i++) {
        const rowOrderID = await row.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderID)) {
            await row.nth(i).locator('button').first().click();
            break;
        }
    }

    const orderSummaryID = await page.locator('div.col-text.-main').textContent();
    console.log(orderSummaryID);
    expect(orderId.includes(orderSummaryID)).toBeTruthy();



})

