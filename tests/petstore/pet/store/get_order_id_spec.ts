// @ts-check
import { test, expect } from '@playwright/test';

test('Get order by ID', async ({ request }) => {
  const orderId = 1; // Use a valid order ID to fetch
  
  // Step 1: Send a GET request to fetch the order by ID
  const response = await request.get(`${process.env.API_URL}/store/order/${orderId}`);
  
  // Step 2: Assert that the response status is 200 (success)
  expect(response.ok()).toBeTruthy();  // Expect status 200 or 2xx
  expect(response.status()).toBe(200);

  // Step 3: Parse the response body to retrieve the order details
  const order = await response.json();

  // Step 4: Assert that the order details match the expected values
  expect(order.id).toBe(orderId);  // Ensure the order ID matches
  expect(order.petId).toBeDefined();  // Ensure petId exists
  expect(order.quantity).toBeDefined();  // Ensure quantity exists
  expect(order.status).toBeDefined();  // Ensure status is present
  expect(order.complete).toBeDefined();  // Ensure the complete flag is set
});
