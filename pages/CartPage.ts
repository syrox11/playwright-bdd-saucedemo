import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly itemNames: Locator;
  readonly checkout: Locator;

  constructor(page: Page) {
    this.itemNames = page.getByTestId('inventory-item-name');
    this.checkout = page.getByTestId('checkout');
  }
}
