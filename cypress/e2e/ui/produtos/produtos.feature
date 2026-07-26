# language: en
Feature: Product Registration and Listing on ServeRest

  Background: Be authenticated in the system as an administrator
    Given I navigate to the login page
    When I log in with valid administrator credentials

  Scenario: Should register a new product successfully and list it
    Given I navigate to the product registration page
    When I register a new product with the following details:
      | name          | price | description         | quantity |
      | Logitech G QA | 350   | Mouse Gamer Sem Fio | 15       |
    Then the product should be visible in the inventory list

  Scenario: Should keep the product registration page accessible without authentication
    Given I navigate to the login page
    When I try to access the product registration page without a valid session
    Then the system should keep me on the product registration page