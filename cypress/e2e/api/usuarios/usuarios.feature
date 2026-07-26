# language: en
Feature: API User Management on ServeRest

  Scenario: Should register a new user successfully via API
    When I send a POST request to register a dynamic user
    Then the user API should respond with status code 201
    And the response body should contain a success message and an ID

  Scenario: Should fail to register a user with an existing email via API
    When I send a POST request to register a user with an existing email
    Then the user API should respond with status code 400
    And the response body should indicate that the email is already registered

  Scenario: Should fail to register a user without a password via API
    When I send a POST request to register a user without a password
    Then the user API should respond with status code 400
    And the response body should indicate that the password is required