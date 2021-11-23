@RegistryService
Feature: Register Health Certificate

    Scenario: Submit Valid Register Health Certificate Transaction
        Given I make a POST request to /
            And I set json to the file at ./features/fixtures/registerHealthCertificate/Bundle-ProvideDDCCDocument.json
        When I receive a response
        Then I expect response should have a status 200
            And I expect response should have a json at ./features/features/registerHealthCertificate/Response-ProvideDDCCDocument.json
            # Validate via query that resource exists at expected location

            # Ensure at least 1 entry for each entry in the request

            # Ensure response entries in same order as received in the request

            # Ensure entry response location for each entry 

            # Ensure 201 Created status for each entry in response bundle
            

# Add Scenarios for 400/500 error tests