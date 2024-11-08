// @ts-check
import { test, expect } from '@playwright/test';

test('Update user information', async ({ request }) => {
  const username = 'testuser'; // Existing user to update
  const updatedUserData = {
    id: 0,
    username: username,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'newpassword123',
    phone: '123-456-7890',
    userStatus: 1, // 1 = active, 0 = inactive
  };

  // Step 1: Send a PUT request to update the user information
  const response = await request.put(`${process.env.API_URL}/user/${username}`, {
    data: updatedUserData,
  });

  // Step 2: Validate the response status (expecting 200 OK)
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Step 3: Fetch the updated user details to verify the change
  const getUserResponse = await request.get(`${process.env.API_URL}/user/${username}`);
  expect(getUserResponse.ok()).toBeTruthy(); // Ensure the response was successful

  const userDetail = await getUserResponse.json();
  
  // Step 4: Assert that the user details are updated correctly
  expect(userDetail.username).toBe(updatedUserData.username);
  expect(userDetail.firstName).toBe(updatedUserData.firstName);
  expect(userDetail.lastName).toBe(updatedUserData.lastName);
  expect(userDetail.email).toBe(updatedUserData.email);
  expect(userDetail.phone).toBe(updatedUserData.phone);
  expect(userDetail.userStatus).toBe(updatedUserData.userStatus);
});
