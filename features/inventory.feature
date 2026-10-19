@inventory
Feature: Product catalogue
  As a customer
  I want to sort products and manage my cart from the catalogue
  So that I can find what I want quickly

  Background:
    Given I am logged in as the "standard" user

  Scenario: Catalogue shows all products
    Then I should see 6 products

  Scenario: Sort products by price, low to high
    When I sort products by "lohi"
    Then product prices should be in ascending order

  Scenario: Sort products by name, Z to A
    When I sort products by "za"
    Then product names should be in descending order

  @smoke
  Scenario: Adding and removing products updates the cart badge
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    Then the cart badge should show 2
    When I remove "Sauce Labs Backpack" from the cart
    Then the cart badge should show 1
