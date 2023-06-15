# playwright-pom-chatgpt
experiments focused on chatgpt usage in test automation using playwright, POM and ChatGPT


conditions: playwright Codgen + saucedemo.com

initial prompt
```
Please create a new class for inventoryPage, create the relevant functions for the code below, use javascript, create playwright tests based on created class using page object model

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await page.getByText('$9.99').click();
  await page.locator('div:nth-child(4) > .inventory_item_description').click();
  await page.getByText('Name (A to Z)Name (A to Z)Name (Z to A)Price (low to high)Price (high to low)').click();
  await page.locator('[data-test="product_sort_container"]').selectOption('za');
  await page.locator('[data-test="product_sort_container"]').selectOption('lohi');
  await page.locator('[data-test="product_sort_container"]').selectOption('hilo');
‍  await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
  await page.locator('a').filter({ hasText: '1' }).click();
  await page.locator('[data-test="remove-sauce-labs-fleece-jacket"]').click();
  await page.locator('#shopping_cart_container a').click();

Please remember to use step & custom expect messages like this function. 
async clickBookName(name: string){

        await test.step(`I can click the book using the name: ${name}`, async () => {

        await expect(this.page.locator(`text=${name} >> nth=0`),`Can not find the Book Name ${name}- did the locator change?`).toBeVisible()

        await this.page.locator(`text=${name} >> nth=0`).click();

})}
