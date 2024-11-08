// @ts-check
import { test, expect } from "@playwright/test";

test("Get pets by status", async ({ request }) => {
  const status = "available"; // Other possible values: 'sold', 'pending'

  // Send a GET request to fetch pets by status
  const response = await request.get(`${process.env.API_URL}/pet/findByStatus?status=${status}`);

  // Validate the response
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const pets = await response.json();
  
  // Ensure we get an array of pets
  expect(Array.isArray(pets)).toBeTruthy();
  
  // Check that each pet in the list has the expected status
  pets.forEach(pet => {
    expect(pet).toHaveProperty("status", status);
  });
});
