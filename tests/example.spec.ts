import { test, expect } from '@playwright/test';


test('visit inventory page ', async ({ page }) => {
  await page.goto('/inventory.html');
});
