// @ts-check
import { test, expect } from '@playwright/test';

test('Delete order by ID', async ({ request }) => {
  const orderId = 1; // Use a valid order ID to delete
  
  // Step 1: Send a DELETE request to delete the order by ID
  const deleteResponse = await request.delete(`${process.env.API_URL}/store/order/${orderId}`);

  // Step 2: Assert that the response status is 200 (success)
  expect(deleteResponse.ok()).toBeTruthy();  // Expect status 200 or 2xx
  expect(deleteResponse.status()).toBe(200);

  // Step 3: Optionally, verify the message in the response body
  const deleteMessage = await deleteResponse.json();
  expect(deleteMessage).toHaveProperty('message');
  expect(deleteMessage.message).toBe('Order deleted successfully');

  // Step 4: Try to fetch the deleted order (this should return 404)
  const getResponse = await request.get(`${process.env.API_URL}/store/order/${orderId}`);
  expect(getResponse.status()).toBe(404);  // Order should no longer exist, expect 404
  const getMessage = await getResponse.json();
  expect(getMessage).toHaveProperty('message');
  expect(getMessage.message).toBe('Order not found');
});
