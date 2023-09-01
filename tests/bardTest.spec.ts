import { expect, test} from '@playwright/test';
import { InventoryPage } from './pageObjects/inventoryPageBard'

let page: InventoryPage;

test.beforeEach(async ({page}) => {
  await page.goto("/inventory");
});

test.afterEach(async ({browser, page}) => {
  await page.close();
  await browser.close();
});


// Create a new instance of the inventoryPage class
const inventoryPage = new InventoryPage(page);

// Test adding a product to the cart
test('Add a product to the cart', async ({page}) => {
  // Click on the "Add to cart" button for the backpack product
  await inventoryPage.addToCart('backpack');

  // Expect the product to be in the cart
  expect(await page.locator('[data-test="product-in-cart-backpack"]')).toBeVisible();
});

// Test removing a product from the cart
test('Remove a product from the cart', async ({page}) => {
  // Click on the "Remove from cart" button for the backpack product
  await inventoryPage.removeFromCart('backpack');

  // Expect the product to be removed from the cart
  expect(await page.locator('[data-test="product-in-cart-backpack"]')).toBeHidden();
});

// Test clicking on a product description
test('Click on a product description', async ({page}) => {
  // Click on the product description for the fleece jacket product
  await inventoryPage.clickProductDescription('fleece-jacket');

  // Expect the product details page to be opened
  expect(await page.locator('[data-test="product-details-page"]')).toBeVisible();
});

// Test sorting products by name
test('Sort products by name', async ({page}) => {
  // Click on the "Name (A to Z)" button
  await inventoryPage.sortByName();

  // Expect the products to be sorted by name in ascending order
  expect(await page.locator('[data-test="product-name"]')).toEqual([
    'Backpack',
    'Fleece Jacket',
    'T-Shirt',
  ]);
});

// Test sorting products by price
test('Sort products by price', async ({page}) => {
  // Click on the "Price (low to high)" button
  await inventoryPage.sortByPrice();

  // Expect the products to be sorted by price in ascending order
  expect(await page.locator('[data-test="product-price"]')).toEqual([
    '$9.99',
    '$19.99',
    '$29.99',
  ]);
});

