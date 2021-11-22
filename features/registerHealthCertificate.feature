Feature: Register Health Certificate

    Scenario: Submit Valid Register Health Certificate Transaction
        Given I make a POST request to /
            And I set json to the file at ./features/fixtures/Bundle-ProvideDDCCDocument.json
        When I receive a response
        Then I expect response should have a status 201
        Then I expect response should have a body [DDCC:VS Registry Service Endpoint]

