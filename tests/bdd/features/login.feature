Feature: Login into the site with valid data
    Background: Navigate to the Website
        Given I navigate to the Website
    Scenario: Sign up in the application with new data
        When I click on Sign up Link
        And I enter new credential
            | username       | validpassword |
            | junior.QA.user | Pa$sw0rd12!   |
        And I click on Sign up button
        Then The sign up is successful
    Scenario: Log in in the application with valid data
        And I click on Log in Link
        And I enter valid credential
            | username       | validpassword |
            | junior.QA.user | Pa$sw0rd12!   |
        And I click on Log in button
        Then Validate user is logged in
        Then Validate the title after login
        When I click logout link