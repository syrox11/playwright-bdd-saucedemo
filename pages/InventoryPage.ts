import { type Locator, type Page } from '@playwright/test';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage {
  readonly title: Locator;
  readonly items: Locator;
  readonly sort: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.items = page.getByTestId('inventory-item');
    this.sort = page.getByTestId('product-sort-container');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  item(name: string): Locator {
    return this.items.filter({ hasText: name });
  }

  async addToCart(name: string) {
    await this.item(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeFromCart(name: string) {
    await this.item(name).getByRole('button', { name: 'Remove' }).click();
  }

  async sortBy(option: SortOption) {
    await this.sort.selectOption(option);
  }

  async prices(): Promise<number[]> {
    const texts = await this.page.getByTestId('inventory-item-price').allTextContents();
    return texts.map((t) => Number(t.replace('$', '')));
  }

  async names(): Promise<string[]> {
    return this.page.getByTestId('inventory-item-name').allTextContents();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
