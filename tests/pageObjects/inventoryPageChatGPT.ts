import { Page } from "@playwright/test";

export class InventoryPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addToCartBackpack() {
    await this.page
      .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click();
  }

  async removeBackpackFromCart() {
    await this.page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  }

  async clickPriceFilter() {
    await this.page.getByText("$9.99").click();
  }

  async clickDescription() {
    await this.page
      .locator("div:nth-child(4) > .inventory_item_description")
      .click();
  }

  async clickSortMenu() {
    await this.page
      .getByText(
        "Name (A to Z)Name (A to Z)Name (Z to A)Price (low to high)Price (high to low)"
      )
      .click();
  }

  async sortProductsByZA() {
    await this.page
      .locator('[data-test="product_sort_container"]')
      .selectOption("za");
  }

  async sortProductsByLowToHigh() {
    await this.page
      .locator('[data-test="product_sort_container"]')
      .selectOption("lohi");
  }

  async sortProductsByHighToLow() {
    await this.page
      .locator('[data-test="product_sort_container"]')
      .selectOption("hilo");
  }

  async addToCartFleeceJacket() {
    await this.page
      .locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
      .click();
  }

  async openCart() {
    await this.page.locator("#shopping_cart_container a").click();
  }

  async clickCartBadge() {
    await this.page.locator("a").filter({ hasText: "1" }).click();
  }
}
