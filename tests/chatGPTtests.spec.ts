import { chromium, test, expect } from '@playwright/test';
import { InventoryPage } from './pageObjects/inventoryPageChatGPT';

let browser;
let context;
let page;
let inventoryPage;


test.describe('Inventory Page', () => {

  test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    inventoryPage = new InventoryPage(page);
  
    await page.goto('https://www.saucedemo.com/inventory.html');
  });
  
  test.afterAll(async () => {
    await browser.close();
  });
  
  test('Add a product to the cart', async () => {
    await inventoryPage.addToCartBackpack();
    expect(await inventoryPage.isItemInCart('Sauce Labs Backpack')).toBe(true);
  });

  test('Remove a product from the cart', async () => {
    await inventoryPage.addToCartBackpack();
    await inventoryPage.removeBackpackFromCart();
    expect(await inventoryPage.isItemInCart('Sauce Labs Backpack')).toBe(false);
  });

  test('Filter products by price', async () => {
    await inventoryPage.clickPriceFilter();
    expect(await inventoryPage.getNumberOfVisibleItems()).toBeGreaterThan(0);
  });

  test('View product details', async () => {
    await inventoryPage.clickDescription();
    expect(await inventoryPage.isDescriptionModalVisible()).toBe(true);
  });

  test('Sort products by name', async () => {
    await inventoryPage.clickSortMenu();
    await inventoryPage.sortProductsByZA();
    expect(await inventoryPage.getFirstItemName()).toBe('Test.allTheThings() T-Shirt (Red)');
    await inventoryPage.sortProductsByLowToHigh();
    expect(await inventoryPage.getFirstItemName()).toBe('Sauce Labs Onesie');
    await inventoryPage.sortProductsByHighToLow();
    expect(await inventoryPage.getFirstItemName()).toBe('Sauce Labs Fleece Jacket');
  });

  test('Add multiple products to cart', async () => {
    await inventoryPage.addToCartBackpack();
    await inventoryPage.addToCartFleeceJacket();
    await inventoryPage.openCart();
    expect(await inventoryPage.getNumberOfItemsInCart()).toBe(2);
  });

  test('Click cart badge to view cart', async () => {
    await inventoryPage.addToCartBackpack();
    await inventoryPage.clickCartBadge();
    expect(await inventoryPage.isCartVisible()).toBe(true);
  });
});