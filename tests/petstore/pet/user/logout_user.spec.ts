// @ts-check
import { test, expect } from '@playwright/test';

test('Logout user', async ({ request }) => {
  // Send a POST request to logout the user
  const response = await request.post(`${process.env.API_URL}/user/logout`);

  // Assert that the response status is 200 (successful logout)
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Optionally, validate the response body (if any)
  const responseBody = await response.json();

  // If the response contains a message or confirmation, you can check it
  // For this API, there's typically no body returned, so we focus on the status code
  expect(responseBody).toBeUndefined(); // No body is typically expected
});
