
import { Page } from "@playwright/test";

export class InventoryPage {
  private page: Page;

  constructor(page) {
    this.page = page;
  }

  // Add to cart
  async addToCart(productId) {
    await this.page.locator(`[data-test="add-to-cart-${productId}"]`).click();
  }

  // Remove from cart
  async removeFromCart(productId) {
    await this.page.locator(`[data-test="remove-${productId}"]`).click();
  }

  // Click on a product description
  async clickProductDescription(productId) {
    await this.page.locator(`div[data-test="product-description-${productId}"]`).click();
  }

  // Sort products by name
  async sortByName() {
    await this.page.locator('[data-test="product_sort_container"]').selectOption('az');
  }

  // Sort products by price
  async sortByPrice() {
    await this.page.locator('[data-test="product_sort_container"]').selectOption('lohi');
  }
}