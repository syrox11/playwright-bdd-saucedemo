@login
Feature: Login
  As a registered customer
  I want to sign in to the store
  So that I can browse and buy products

  Background:
    Given I am on the login page

  @smoke
  Scenario: Successful login with a standard user
    When I log in as the "standard" user
    Then I should see the products page

  Scenario: Locked out user cannot sign in
    When I log in as the "locked" user
    Then I should see the login error "Sorry, this user has been locked out."

  Scenario Outline: Login form validation - <case>
    When I log in with username "<username>" and password "<password>"
    Then I should see the login error "<message>"

    Examples:
      | case             | username      | password     | message                                                     |
      | missing username |               | secret_sauce | Username is required                                        |
      | missing password | standard_user |              | Password is required                                        |
      | wrong password   | standard_user | wrong_pass   | Username and password do not match any user in this service |
