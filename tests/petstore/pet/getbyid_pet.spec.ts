// @ts-check
import { test, expect } from "@playwright/test";

test("Get pet by ID", async ({ request }) => {
  const petId = 6199; // Use an existing pet ID in the store or the one you created

  // Send a GET request to fetch the pet by ID
  const response = await request.get(`${process.env.API_URL}/pet/${petId}`);

  // Validate the response
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const petDetail = await response.json();
  
  // Check that the response contains the pet information
  expect(petDetail).toHaveProperty("id", petId);
  expect(petDetail).toHaveProperty("name");
  expect(petDetail).toHaveProperty("status");
});
