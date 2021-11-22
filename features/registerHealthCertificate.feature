Feature: Register Health Certificate

    Scenario: Submit Valid Register Health Certificate Transaction
        Given I make a POST request to /
            And I set json to the file at ./features/fixtures/registerHealthCertificate/Bundle-ProvideDDCCDocument.json
        When I receive a response
        Then I expect response should have a status 200
            And I expect response should have a json at ./features/features/registerHealthCertificate/Response-ProvideDDCCDocument.json


# should we add negative test cases?