import { Page } from 'playwright';

export class InventoryPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addToCartBackpack() {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  }

  async removeBackpackFromCart() {
    await this.page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  }

  async clickPriceFilter() {
    await this.page.getByText('$9.99').click();
  }

  async clickDescription() {
    await this.page.locator('div:nth-child(4) > .inventory_item_description').click();
  }

  async clickSortMenu() {
    await this.page.getByText('Name (A to Z)Name (A to Z)Name (Z to A)Price (low to high)Price (high to low)').click();
  }

  async sortProductsByZA() {
    await this.page.locator('[data-test="product_sort_container"]').selectOption('za');
  }

  async sortProductsByLowToHigh() {
    await this.page.locator('[data-test="product_sort_container"]').selectOption('lohi');
  }

  async sortProductsByHighToLow() {
    await this.page.locator('[data-test="product_sort_container"]').selectOption('hilo');
  }

  async addToCartFleeceJacket() {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
  }

  async removeFleeceJacketFromCart() {
    await this.page.locator('[data-test="remove-sauce-labs-fleece-jacket"]').click();
  }

  async openCart() {
    await this.page.locator('#shopping_cart_container a').click();
  }

  async clickCartBadge() {
    await this.page.locator('a').filter({ hasText: '1' }).click();
  }

  async clickBookName(name: string) {
    await test.step(`I can click the book using the name: ${name}`, async () => {
      await expect(this.page.locator(`text=${name} >> nth=0`),`Can not find the Book Name ${name}- did the locator change?`).toBeVisible();
      await this.page.locator(`text=${name} >> nth=0`).click();
    });
  }

  async expectCartItemCount(count: number) {
    await test.step(`Expect cart item count to be ${count}`, async () => {
      const badgeText = await this.page.locator('#shopping_cart_container .shopping_cart_badge').textContent();
      await expect(parseInt(badgeText)).toEqual(count);
    });
  }

  async expectCartTotal(total: number) {
    await test.step(`Expect cart total to be $${total}`, async () => {
      const totalText = await this.page.locator('.summary_total_label').textContent();
      await expect(parseFloat(totalText.substring(13))).toEqual(total);
    });
  }

  async getProductNames() {
    const elements = await this.page.locator('.inventory_item_name');
    const names = [];
    for (const element of elements) {
      names.push(await element.textContent());
    }
    return names;
  }
  
  async getProductPrices() {
    const elements = await this.page.locator('.inventory_item_price');
    const prices = [];
    for (const element of elements) {
      prices.push(parseFloat(await element.textContent().substring(1)));
    }
    return prices;
  }
  
}
