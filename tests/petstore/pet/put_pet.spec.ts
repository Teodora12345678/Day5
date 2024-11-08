// @ts-check
import { test, expect } from "@playwright/test";

test("Update an existing pet", async ({ request}) => {
  // Define the pet details to update
  const petId = 6199; // Ensure this pet ID exists or was created in a previous test
  const updatedName = "Updated Tommy";
  const updatedStatus = "sold";

  // Perform the PUT request to update the pet
  const response = await request.put(`${process.env.API_URL}pet`, {
    data: {
      id: petId,
      category: {
        id: 2107,
        name: "Updated Category",
      },
      name: updatedName,
      photoUrls: ["updated_url"],
      tags: [
        {
          id: 1708,
          name: "updated tag",
        },
      ],
      status: updatedStatus,
    },
  });

  // Validate the response
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Parse the response JSON
  const updatedPetDetail = await response.json();

  // Assertions to verify the update
  expect(updatedPetDetail.id).toBe(petId);
  expect(updatedPetDetail.name).toBe(updatedName);
  expect(updatedPetDetail.status).toBe(updatedStatus);
  expect(updatedPetDetail.category.name).toBe("Updated Category");
  
});
