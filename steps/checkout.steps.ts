import { expect } from '@playwright/test';
import { Given, When, Then } from '../support/fixtures';
import { CheckoutPage } from '../pages/CheckoutPage';

type ProductRow = { product: string };

Given('I have added these products to the cart:', async ({ inventoryPage }, table) => {
  for (const { product } of table.hashes() as ProductRow[]) {
    await inventoryPage.addToCart(product);
  }
});

When('I open the cart', async ({ inventoryPage }) => {
  await inventoryPage.openCart();
});

When('I go to checkout', async ({ inventoryPage, cartPage }) => {
  await inventoryPage.openCart();
  await cartPage.checkout.click();
});

When(
  'I enter my details {string}, {string}, {string}',
  async ({ checkoutPage }, firstName: string, lastName: string, postalCode: string) => {
    await checkoutPage.fillInformation(firstName, lastName, postalCode);
  },
);

Then('the cart should contain exactly:', async ({ cartPage }, table) => {
  const expected = (table.hashes() as ProductRow[]).map((row) => row.product);
  await expect(cartPage.itemNames).toHaveText(expected);
});

Then('the order total should equal item total plus tax', async ({ checkoutPage }) => {
  const itemTotal = CheckoutPage.amount(await checkoutPage.itemTotal.innerText());
  const tax = CheckoutPage.amount(await checkoutPage.tax.innerText());
  const total = CheckoutPage.amount(await checkoutPage.total.innerText());
  expect(total).toBeCloseTo(itemTotal + tax, 2);
});

When('I finish the order', async ({ checkoutPage }) => {
  await checkoutPage.finish.click();
});

Then('I should see the confirmation {string}', async ({ checkoutPage }, message: string) => {
  await expect(checkoutPage.completeHeader).toHaveText(message);
});

Then('I should see the checkout error {string}', async ({ checkoutPage }, message: string) => {
  await expect(checkoutPage.error).toHaveText(message);
});
