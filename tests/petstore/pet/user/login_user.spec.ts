// @ts-check
import { test, expect } from '@playwright/test';

test('Login user', async ({ request }) => {
  const username = 'testuser'; 
  const password = 'testpassword'; 

  // Step 1: Send a GET request to log in the user
  const response = await request.get(`${process.env.API_URL}/user/login`, {
    params: {
      username: username,
      password: password,
    },
  });

  // Step 2: Assert that the response status is 200 (successful login)
  expect(response.ok()).toBeTruthy();  // Expect status 200 or 2xx
  expect(response.status()).toBe(200);

  // Step 3: Optionally, validate the response body
  const responseBody = await response.json();

  // Check if a message or token is returned in the response
  // The actual response might vary, but typically you'd expect a success message.
  expect(responseBody).toHaveProperty('message');
  expect(responseBody.message).toBe('logged in user session');
});
