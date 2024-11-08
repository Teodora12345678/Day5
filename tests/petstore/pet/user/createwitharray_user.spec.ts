// @ts-check
import { test, expect } from "@playwright/test";

const usersArray = [
  {
    id: 2001,
    username: "userOne",
    firstName: "Alice",
    lastName: "Smith",
    email: "alice.smith@example.com",
    password: "password123",
    phone: "123-456-7891",
    userStatus: 1
  },
  {
    id: 2002,
    username: "userTwo",
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@example.com",
    password: "password456",
    phone: "987-654-3210",
    userStatus: 1
  }
];

test.describe('User API - Create Users with Array Input', () => {

  // Create multiple users with array input
  test('Create users with an array input', async ({ request }) => {
    const response = await request.post('process.env.API_URL', {
      data: usersArray
    });

    // Validate the response
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // Verify response content
    const responseBody = await response.json();
    expect(responseBody.message).toBe("ok");

    // Additional verification by fetching the created users
    for (const user of usersArray) {
      const getUserResponse = await request.get(`process.env.API_URL${user.username}`);
      expect(getUserResponse.ok()).toBeTruthy();
      const userDetail = await getUserResponse.json();

      // Check user details
      expect(userDetail.id).toBe(user.id);
      expect(userDetail.username).toBe(user.username);
      expect(userDetail.email).toBe(user.email);
    }
  });
});
