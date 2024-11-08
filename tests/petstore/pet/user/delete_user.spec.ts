// @ts-check
import { test, expect } from '@playwright/test';

test('Delete user by username', async ({ request }) => {
  const username = 'testuser'; // Use an existing username to delete

  // Step 1: Send a DELETE request to delete the user
  const response = await request.delete(`${process.env.API_URL}/user/${username}`);

  // Step 2: Validate the response status (expecting 200 OK)
  expect(response.ok()).toBeTruthy();  // Expect status 200 or 2xx
  expect(response.status()).toBe(200);

  // Step 3: Verify that the user has been deleted by attempting to retrieve the user
  const getUserResponse = await request.get(`${process.env.API_URL}/user/${username}`);
  
  // Step 4: Assert that the user is not found (should return 404)
  expect(getUserResponse.status()).toBe(404); // User should be deleted and not found
});
