
import { test, expect } from './fixtures/login.fixtures';
import { getCredentials } from './fixtures/credentials';

test.describe('Shopping Test Suite', () => {
  test('User should be able to add items to the cart', async ({ loginPage, shoppingPage }) => {
    const { username, password } = getCredentials('prod');
    await loginPage.login(username, password);

    const itemName = 'Sauce Labs Backpack';
    await shoppingPage.addProductToCart(itemName);

    const itemCount = await shoppingPage.getCartItemCount();
    expect(itemCount).toBe('1');
  });

});
