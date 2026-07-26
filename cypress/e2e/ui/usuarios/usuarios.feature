# language: en
Feature: List of Users in ServeRest

    Background: Be authenticated in the system as an administrator
        Given I log in with valid administrator credentials for user management

    Scenario: Should list registered users successfully in the dashboard
        When I navigate to the user management list
        Then I should see the registered user displayed in the table

    Scenario: Should keep the user list page accessible without authentication
        Given I navigate to the login page
        When I attempt to access the user management list without a valid session
        Then the system should keep me on the user list page