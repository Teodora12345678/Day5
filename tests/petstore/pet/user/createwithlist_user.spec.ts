// @ts-check
import { test, expect } from '@playwright/test';

test('Create users with list input', async ({ request }) => {
  const usersToCreate = [
    {
      id: 0,
      username: 'user1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phone: '123-456-7890',
      userStatus: 1
    },
    {
      id: 1,
      username: 'user2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      password: 'password456',
      phone: '987-654-3210',
      userStatus: 1
    }
  ];

  // Step 1: Send a POST request to create multiple users
  const response = await request.post(`${process.env.API_URL}/user/createWithList`, {
    data: usersToCreate,
  });

  // Step 2: Validate the response status (expecting 200 OK)
  expect(response.ok()).toBeTruthy();  // Expect status 200 or 2xx
  expect(response.status()).toBe(200);

  // Step 3: Optionally, verify that the users were created by checking the username
  // Send individual GET requests for each user to check if they exist
  for (const user of usersToCreate) {
    const userResponse = await request.get(`${process.env.API_URL}/user/${user.username}`);
    expect(userResponse.ok()).toBeTruthy(); // Ensure status is 200
    const userDetail = await userResponse.json();
    expect(userDetail.username).toBe(user.username);
    expect(userDetail.firstName).toBe(user.firstName);
    expect(userDetail.lastName).toBe(user.lastName);
    expect(userDetail.email).toBe(user.email);
    expect(userDetail.phone).toBe(user.phone);
    expect(userDetail.userStatus).toBe(user.userStatus);
  }
});
