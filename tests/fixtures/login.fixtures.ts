import { test as baseTest } from '@playwright/test';  //PART OF TAKS 3 

import { getCredentials } from './credentials';
import { LoginPage } from '../Page/login.page';
import { ShoppingPage } from '../Page/shopping.page';

// Define the login fixture
type MyFixtures = {
  loginPage: LoginPage;
  shoppingPage: ShoppingPage;
};

// Custom test with login fixture
export const test = baseTest.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await use(loginPage);
  },
  shoppingPage: async ({ page }, use) => {
    const shoppingPage = new ShoppingPage(page);
    await use(shoppingPage);
  }
});
export { expect } from '@playwright/test';
