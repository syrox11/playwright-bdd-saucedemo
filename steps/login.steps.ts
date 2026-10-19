import { expect } from '@playwright/test';
import { Given, When, Then } from '../support/fixtures';
import { PASSWORD, USERS, type UserKind } from '../support/users';

Given('I am on the login page', async ({ loginPage }) => {
  await loginPage.open();
});

Given('I am logged in as the {string} user', async ({ loginPage, inventoryPage }, kind: string) => {
  await loginPage.open();
  await loginPage.login(USERS[kind as UserKind], PASSWORD);
  await expect(inventoryPage.title).toHaveText('Products');
});

When('I log in as the {string} user', async ({ loginPage }, kind: string) => {
  await loginPage.login(USERS[kind as UserKind], PASSWORD);
});

When(
  'I log in with username {string} and password {string}',
  async ({ loginPage }, username: string, password: string) => {
    await loginPage.login(username, password);
  },
);

Then('I should see the products page', async ({ page, inventoryPage }) => {
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(inventoryPage.title).toHaveText('Products');
});

Then('I should see the login error {string}', async ({ loginPage }, message: string) => {
  await expect(loginPage.error).toContainText(message);
});
