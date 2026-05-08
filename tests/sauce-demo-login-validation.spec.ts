// spec: tests/sauce-demo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Functional Tests', () => {
  test('Login validation and error handling', async ({ page }) => {
    // Navigate to the Sauce Demo login page
    await page.goto('https://www.saucedemo.com/');

    // Click Login button without entering any credentials
    await page.locator('[data-test="login-button"]').click();
    // Verify error message is displayed for missing credentials
    await expect(page.locator('[data-test="error"]')).toBeVisible();

    // Navigate back to login page
    await page.goto('https://www.saucedemo.com/');
    // Enter invalid username
    await page.locator('[data-test="username"]').fill('invalid_user');
    // Enter invalid password
    await page.locator('[data-test="password"]').fill('wrong_password');
    // Click Login with invalid credentials
    await page.locator('[data-test="login-button"]').click();
    // Verify error message is displayed for invalid credentials
    await expect(page.locator('[data-test="error"]')).toBeVisible();

    // Navigate back to login page for locked out user test
    await page.goto('https://www.saucedemo.com/');
    // Enter locked_out_user username
    await page.locator('[data-test="username"]').fill('locked_out_user');
    // Enter password for locked_out_user
    await page.locator('[data-test="password"]').fill('secret_sauce');
    // Click Login with locked_out_user credentials
    await page.locator('[data-test="login-button"]').click();
    // Verify locked out user error message appears
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });
});
