// @ts-check
import { test, expect } from "@playwright/test";

const userId = 1001;
const username = "playwrightUser";
const firstName = "John";
const lastName = "Doe";
const email = "johndoe@example.com";
const password = "password123";
const phone = "123-456-7890";
const userStatus = 1;

test.describe('User API - Create User', () => {

  // Create a new user
  test('Create a new user', async ({ request }) => {
    const response = await request.post('https://petstore.swagger.io/v2/user', {
      data: {
        "id": userId,
        "username": username,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password,
        "phone": phone,
        "userStatus": userStatus
      }
    });

    // Validate the response
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // Verify response content
    const responseBody = await response.json();
    expect(responseBody.message).toBe(`${userId}`);
  });
  
});
