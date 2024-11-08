// @ts-check
import { test, expect } from '@playwright/test';

test('Get store inventory', async ({ request }) => {
  // Step 1: Send a GET request to fetch the inventory
  const response = await request.get(`${process.env.API_URL}/store/inventory`);

  // Step 2: Assert that the response status is 200 (success)
  expect(response.ok()).toBeTruthy();  // Expect status 200 or 2xx
  expect(response.status()).toBe(200);

  // Step 3: Parse the response body to retrieve the inventory
  const inventory = await response.json();

  // Step 4: Assert that the inventory object contains expected keys
  expect(inventory).toHaveProperty('available');
  expect(inventory).toHaveProperty('pending');
  expect(inventory).toHaveProperty('sold');

  // Optionally, log the inventory for debugging purposes
  console.log('Inventory:', inventory);
});
