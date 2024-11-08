// @ts-check
import { test, expect } from "@playwright/test";
import * as fs from 'fs';
import * as path from 'path';

test("Create a pet and upload an image", async ({ request }) => {
  const petId = 6199;
  const petName = "playwright Tommy";
  const categoryName = "some name";
  const status = "available";
  
  // Prepare a sample image file to upload
  const filePath = path.join(__dirname, 'assets', 'test.jpg');
  const fileStream = fs.createReadStream(filePath);

  // Step 1: Create the pet without the image first
  const createPetResponse = await request.post(`${process.env.API_URL}/pet`, {
    data: {
      id: petId,
      category: {
        id: 2107,
        name: categoryName,
      },
      name: petName,
      photoUrls: ["string"],
      tags: [
        {
          id: 1708,
          name: "black",
        },
      ],
      status: status,
    },
  });

  // Step 2: Validate the pet creation response
  expect(createPetResponse.ok()).toBeTruthy();
  expect(createPetResponse.status()).toBe(200);

  const petDetail = await createPetResponse.json();
  expect(petDetail.name).toBe(petName);
  expect(petDetail.category.name).toBe(categoryName);
  expect(petDetail.status).toBe(status);

  // Step 3: Upload an image for the pet
  const uploadImageResponse = await request.post(`${process.env.API_URL}/pet/${petId}/uploadImage`, {
    multipart: [
      { name: 'file', file: fileStream, filename: 'test.jpg', contentType: 'image/jpeg' }
    ],
  });

  // Step 4: Validate the image upload response
  expect(uploadImageResponse.ok()).toBeTruthy();
  expect(uploadImageResponse.status()).toBe(200);

  const uploadResponseBody = await uploadImageResponse.json();
  expect(uploadResponseBody).toHaveProperty('message');
  expect(uploadResponseBody.message).toContain('successful');

});
