import { expect } from '@playwright/test';
import { When, Then } from '../support/fixtures';
import type { SortOption } from '../pages/InventoryPage';

Then('I should see {int} products', async ({ inventoryPage }, count: number) => {
  await expect(inventoryPage.items).toHaveCount(count);
});

When('I sort products by {string}', async ({ inventoryPage }, option: string) => {
  await inventoryPage.sortBy(option as SortOption);
});

Then('product prices should be in ascending order', async ({ inventoryPage }) => {
  const prices = await inventoryPage.prices();
  expect(prices).toEqual([...prices].sort((a, b) => a - b));
});

Then('product names should be in descending order', async ({ inventoryPage }) => {
  const names = await inventoryPage.names();
  expect(names).toEqual([...names].sort().reverse());
});

When('I add {string} to the cart', async ({ inventoryPage }, name: string) => {
  await inventoryPage.addToCart(name);
});

When('I remove {string} from the cart', async ({ inventoryPage }, name: string) => {
  await inventoryPage.removeFromCart(name);
});

Then('the cart badge should show {int}', async ({ inventoryPage }, count: number) => {
  await expect(inventoryPage.cartBadge).toHaveText(String(count));
});
