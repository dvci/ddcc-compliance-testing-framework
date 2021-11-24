@RegistryService
Feature: Register Health Certificate

    Scenario: Submit Valid Register Health Certificate Transaction
        Given I make a POST request to /
            And I set json body to the file at ./features/fixtures/Bundle-ProvideDDCCDocument.json
        When I receive a response
        Then I expect response should have a status 200
            #And I expect response should have a json like ./test/fixtures/Response-ProvideDDCCDocument.json
            And I expect response should validate against the profile http://profiles.ihe.net/ITI/MHD/StructureDefinition/IHE.MHD.ProvideDocumentBundleResponse

# Add Scenarios for 400/500 error tests