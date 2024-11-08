import { Page } from '@playwright/test';   // PART OF TAKS 3

export class ShoppingPage {
  readonly page: Page;
  readonly productTitle = '.inventory_item_name';
  readonly addToCartButton = '.btn_inventory';
  readonly cartBadge = '.shopping_cart_badge';
  readonly cartLink = '#shopping_cart_container';

  constructor(page: Page) {
    this.page = page;
  }

  async addProductToCart(productName: string) {
    const productElement = this.page.locator(`text=${productName}`);
    const productIndex = await productElement.count() - 1; // Get the index of the product
    await this.page.locator(this.addToCartButton).nth(productIndex).click();
  }

  async goToCart() {
    await this.page.click(this.cartLink);
  }

  async getCartItemCount() {
    return this.page.textContent(this.cartBadge);
  }
}
