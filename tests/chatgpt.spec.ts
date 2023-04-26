import { test, expect } from '@playwright/test';
import { InventoryPage } from './pageObjects/InventoryPage';

test.describe('Inventory Page', () => {
  let page: InventoryPage;

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    page = new InventoryPage(await context.newPage());
    await page.goto();
  });

  test('Add and remove item from cart', async () => {
    await page.addToCartBackpack();
    await page.expectCartItemCount(1);
    await page.removeBackpackFromCart();
    await page.expectEmptyCart()
  });

  test('Sort products by Z-A', async () => {
    await page.clickSortMenu();
    await page.sortProductsByZA();
    const productNames = await page.getProductNames();
    const sortedNames = productNames.slice().sort().reverse();
    await expect(productNames).toEqual(sortedNames);
  });

  test('Sort products by price low to high', async () => {
    await page.clickPriceFilter();
    await page.clickSortMenu();
    await page.sortProductsByLowToHigh();
    const prices = await page.getProductPrices();
    const sortedPrices = prices.slice().sort((a, b) => a - b);
    await expect(prices).toEqual(sortedPrices);
  });

  test('Sort products by price high to low', async () => {
    await page.clickPriceFilter();
    await page.clickSortMenu();
    await page.sortProductsByHighToLow();
    const prices = await page.getProductPrices();
    const sortedPrices = prices.slice().sort((a, b) => b - a);
    await expect(prices).toEqual(sortedPrices);
  });

  test('Add and remove item from cart using badge', async () => {
    await page.addToCartFleeceJacket();
    await page.expectCartItemCount(1);
    await page.clickCartBadge();
    await page.expectCartItemCount(1);
    await page.removeFleeceJacketFromCart();
    await page.expectEmptyCart()
  });

  test.afterEach(async () => {
    await page.close();
  });
});
