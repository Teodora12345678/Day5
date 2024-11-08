// @ts-check
import { test, expect } from '@playwright/test';

test('Get user by username', async ({ request }) => {
  const username = 'testuser'; // Use an existing username

  // Step 1: Send a GET request to retrieve the user by username
  const response = await request.get(`${process.env.API_URL}/user/${username}`);

  // Step 2: Validate the response status
  expect(response.ok()).toBeTruthy();  // Expect status 200 or 2xx
  expect(response.status()).toBe(200);

  // Step 3: Parse the response body
  const userDetail = await response.json();

  // Step 4: Assert that the user details match the expected username
  expect(userDetail.username).toBe(username);

  // Optional: Assert that other user properties are returned
  expect(userDetail.firstName).toBeDefined();
  expect(userDetail.lastName).toBeDefined();
  expect(userDetail.email).toBeDefined();
  expect(userDetail.phone).toBeDefined();
  expect(userDetail.userStatus).toBeDefined(); // e.g., 1 (active), 0 (inactive)
});
