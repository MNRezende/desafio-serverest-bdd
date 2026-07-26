# language: en
Feature: API Product Management on ServeRest

    Scenario: Should register a new product successfully using authToken
        Given I am authenticated as an administrator via API
        When I send a POST request to register a product with dynamic data
        Then the product API should respond with status code 201
        And the response body should confirm product creation

    Scenario: Should fail to register a product without authentication via API
        When I send a POST request to register a product without authentication
        Then the product API should respond with status code 401
        And the response body should indicate that authentication is required