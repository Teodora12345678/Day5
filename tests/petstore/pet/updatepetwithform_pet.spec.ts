// @ts-check
import { test, expect } from '@playwright/test';

test('Update pet with form', async ({ request }) => {
  const petId = 6199; // Use the ID of an existing pet or the one you created earlier
  const newName = 'Updated Pet Name';
  const newStatus = 'sold'; // The new status (can be 'available', 'sold', 'pending')

  // Step 1: Send a POST request to update the pet with the new name and status
  const response = await request.post(`${process.env.API_URL}/pet/${petId}`, {
    params: {
      name: newName,
      status: newStatus,
    },
  });

  // Step 2: Validate the response for successful update
  expect(response.ok()).toBeTruthy();  // Expect status 200 or 2xx
  expect(response.status()).toBe(200);

  // Step 3: Fetch the pet details to verify the update
  const petDetailResponse = await request.get(`${process.env.API_URL}/pet/${petId}`);
  expect(petDetailResponse.ok()).toBeTruthy();  // Ensure we got a valid response
  const petDetail = await petDetailResponse.json();

  // Step 4: Assert that the pet's name and status were updated correctly
  expect(petDetail.name).toBe(newName);   // Check that the pet's name is updated
  expect(petDetail.status).toBe(newStatus);  // Check that the pet's status is updated
});
