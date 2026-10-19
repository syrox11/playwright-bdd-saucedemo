@checkout
Feature: Checkout
  As a customer
  I want to pay for the products in my cart
  So that my order is placed

  Background:
    Given I am logged in as the "standard" user
    And I have added these products to the cart:
      | product                  |
      | Sauce Labs Backpack      |
      | Sauce Labs Fleece Jacket |

  @smoke
  Scenario: Complete a purchase
    When I go to checkout
    And I enter my details "Artiom", "Syrovatskyy", "1003"
    Then the order total should equal item total plus tax
    When I finish the order
    Then I should see the confirmation "Thank you for your order!"

  Scenario: Cart lists the selected products
    When I open the cart
    Then the cart should contain exactly:
      | product                  |
      | Sauce Labs Backpack      |
      | Sauce Labs Fleece Jacket |

  Scenario: Checkout requires a postal code
    When I go to checkout
    And I enter my details "Artiom", "Syrovatskyy", ""
    Then I should see the checkout error "Error: Postal Code is required"
