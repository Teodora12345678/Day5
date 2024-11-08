import { test as base, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

// Extend the test with a custom login fixture
const test = base.extend({
    // Define a fixture named 'login'
    login: async ({ page }, use) => {
        const sauceUrl = process.env.SAUCE_URL;
        await page.goto('SAUCE_URL');
      
        // Log in using standard credentials
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        // Verify successful login by checking for an element on the inventory page
        await expect(page.locator('.inventory_list')).toBeVisible();

        // Use the page object for further tests
        await use(page);
    },
});


test.describe("Test Suite for Authentication tests", () => {
    // Use the extended test with the login fixture
    test('check inventory page', async ({ login }) => {
        // Check that the inventory page is shown
        const itemCount = await login.locator('.inventory_item').count();
        expect(itemCount).toBeGreaterThan(0);
    });


    // Test case to add an item to the cart
    test('add an item to the cart', async ({ login }) => {
        // Add the first item to the cart
        await login.click('.inventory_item:first-child button');

        // Verify the cart shows 1 item
        const cartBadge = login.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('1');
    });

});