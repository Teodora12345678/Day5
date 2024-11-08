// @ts-check
import { test, expect } from '@playwright/test';

test('Place an order for a pet', async ({ request }) => {
  // Define the order object
  const order = {
    id: 1, // Optional: system may auto-generate this
    petId: 1, // The pet ID for the order
    quantity: 1, // Number of pets ordered
    shipDate: new Date().toISOString(), // Ship date (current time for simplicity)
    status: 'placed', // The status of the order (placed, approved, etc.)
    complete: true // Whether the order is complete
  };

  // Step 1: Send a POST request to place the order
  const response = await request.post(`${process.env.API_URL}/store/order`, {
    data: order,
  });

  // Step 2: Assert that the response status is 200 (success)
  expect(response.ok()).toBeTruthy();  // Expect status 200 or 2xx
  expect(response.status()).toBe(200);

  // Step 3: Parse the response body to retrieve order details
  const placedOrder = await response.json();

  // Step 4: Assert that the order details in the response match what we sent
  expect(placedOrder.petId).toBe(order.petId);
  expect(placedOrder.quantity).toBe(order.quantity);
  expect(placedOrder.status).toBe(order.status);
  expect(placedOrder.complete).toBe(order.complete);

  // Optional: Verify the created order by fetching it with GET
  const getOrderResponse = await request.get(`${process.env.API_URL}/store/order/${placedOrder.id}`);
  expect(getOrderResponse.ok()).toBeTruthy(); // Ensure status is 200
  const orderDetail = await getOrderResponse.json();
  expect(orderDetail.id).toBe(placedOrder.id);
  expect(orderDetail.petId).toBe(placedOrder.petId);
  expect(orderDetail.quantity).toBe(placedOrder.quantity);
  expect(orderDetail.status).toBe(placedOrder.status);
  expect(orderDetail.complete).toBe(placedOrder.complete);
});
