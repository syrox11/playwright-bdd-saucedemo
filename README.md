# Playwright BDD — SauceDemo

[![E2E](https://github.com/syrox11/playwright-bdd-saucedemo/actions/workflows/e2e.yml/badge.svg)](https://github.com/syrox11/playwright-bdd-saucedemo/actions/workflows/e2e.yml)

End-to-end test suite for [saucedemo.com](https://www.saucedemo.com), a public demo e-commerce site. Scenarios are written in **Gherkin** so they read as business requirements, and they run as native **Playwright** tests through [playwright-bdd](https://github.com/vitalets/playwright-bdd).

## Stack

- Playwright Test + TypeScript
- Gherkin / BDD with `playwright-bdd`
- Page Object Model, with page objects injected as Playwright fixtures
- GitHub Actions: Chromium and Firefox in parallel, plus a nightly run on weekdays
- Reports: Playwright HTML report and Cucumber HTML report

## Coverage

| Feature | Scenarios |
|---------|-----------|
| `login.feature` | Successful login, locked-out user, form validation (Scenario Outline) |
| `inventory.feature` | Product count, sort by price and by name, add/remove items from the cart badge |
| `checkout.feature` | Full purchase with a check that total = item total + tax, cart contents (data table), required postal code |

Tags: `@smoke` marks the critical-path scenarios. `@login`, `@inventory` and `@checkout` group scenarios by feature.

## Project structure

```
features/          Gherkin scenarios (the specification)
steps/             Step definitions, one file per feature
pages/             Page objects (locators use data-test attributes)
support/
  fixtures.ts      Injects page objects as fixtures and exports Given/When/Then
  users.ts         Demo users
playwright.config.ts
```

## Running locally

```bash
npm ci
npx playwright install chromium firefox

npm test              # all scenarios, all browsers
npm run test:smoke    # @smoke scenarios only
npm run test:chromium # Chromium only
npm run report        # open the last HTML report
```

`bddgen` turns the `.feature` files into Playwright specs in `.features-gen/`. The npm scripts run it before every test run.

## Design decisions

- **Stable locators:** every locator uses the site's `data-test` attributes (`testIdAttribute: 'data-test'`), so tests don't break when CSS or copy changes.
- **No sleeps:** waits rely only on Playwright's auto-waiting and web-first assertions (`toHaveText`, `toHaveCount`, `toHaveURL`).
- **Readable steps:** steps describe intent ("I go to checkout"), and the page objects handle the UI details.
- **CI artifacts:** traces are recorded on the first retry, and screenshots and videos are kept on failure, so a red build can be debugged from the uploaded reports.

## Author

Artiom Syrovatskyy Kovalyov, QA Automation Engineer · [syrovatskyy.com](https://syrovatskyy.com)
