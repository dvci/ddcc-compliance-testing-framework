Feature: Submit Health Event

  Scenario: Submit Valid Health Event
    Given I make a POST request to /submitHealthEvent
      And I set json to the file at ./features/fixtures/Bundle-DDCC-TX-SHE-bundle-example-1.json
     When I receive a response
     Then I expect response should have a status 201