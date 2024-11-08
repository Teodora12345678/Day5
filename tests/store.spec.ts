// import { test, expect } from '@playwright/test';

// test.describe.parallel('Pet Store - Store Resource', () => {

//   // Test to create an order
//   test('should create an order', async ({ page }) => {
//     await page.goto('https://petstore.swagger.io/#/store/placeOrder');
    
//     const order = {
//       petId: 12345,
//       quantity: 1,
//       shipDate: '2024-11-07T00:00:00.000Z',
//       status: 'placed',
//       complete: true
//     };

//     // Fill in order details
//     await page.fill('input[name="petId"]', order.petId.toString());
//     await page.fill('input[name="quantity"]', order.quantity.toString());
//     await page.fill('input[name="shipDate"]', order.shipDate);
//     await page.fill('input[name="status"]', order.status);

//     // Click Place Order button
//     const placeOrderButton = await page.locator('button:has-text("Place Order")');
//     await placeOrderButton.click();

//     // Wait for response and check order creation
//     const successMessage = await page.locator('.response-body');
//     expect(await successMessage.textContent()).toContain('Order placed successfully');
//   });

//   // Test to fetch an order by ID
//   test('should get order by ID', async ({ page }) => {
//     const orderId = 12345; // Use a valid order ID
//     await page.goto(`https://petstore.swagger.io/#/store/getOrderById?orderId=${orderId}`);
    
//     // Check for order details on the page
//     const orderDetails = await page.locator('.response-body');
//     expect(await orderDetails.textContent()).toContain('Order placed successfully');
//   });

//   // Test to delete an order
//   test('should delete an order', async ({ page }) => {
//     const orderId = 12345; // Use a valid order ID
//     await page.goto(`https://petstore.swagger.io/#/store/deleteOrder?orderId=${orderId}`);
    
//     // Click Delete Order button
//     const deleteOrderButton = await page.locator('button:has-text("Delete Order")');
//     await deleteOrderButton.click();

//     // Wait for response and check order deletion
//     const successMessage = await page.locator('.response-body');
//     expect(await successMessage.textContent()).toContain('Order deleted successfully');
//   });

// });
