@RepositoryService
Feature: Store Health Certificate

    Scenario: Submit Valid Store Health Certificate Transaction
      Given I make a POST request to /Bundle
        And I set json body to the file at ./features/fixtures/storeHealthCertificate/Bundle-DDCCDocument.json
      When I receive a response
      Then I expect response should have a status 201
        And I expect response header location should be /DDCCDocument/TESTID/_history/TESTVERSION
        And I store response at /DDCCDocument/TESTID/_history/TESTVERSION as Bundle-DDCCDocument
        # Validate via query that resource exists at expected location

    # possibly change this scenario to be for non-valid fhir so it throws 400
    # instead of unparseable file, which throws syntax error
    Scenario: Submit Storage Transaction With Bad Request
      Given I make a POST request to /Bundle
        And I set json body to the file at ./features/fixtures/storeHealthCertificate/Bundle-DDCCDocument-400.json
      When I receive a response
      Then I expect response should have a status 400

    Scenario: Submit Storage Transaction With Invalid Endpoint
      Given I make a POST request to /INVALIDENDPOINT
      When I receive a response
      Then I expect response should have a status 404

    Scenario: Submit Storage Transaction With Invalid Resource Type
      Given I make a POST request to /Bundle
        And I set json body to the file at ./features/fixtures/storeHealthCertificate/Bundle-DDCCDocument-404.json
      When I receive a response
      Then I expect response should have a status 404

    Scenario: Submit Unprocessable Entity Storage Transaction
      Given I make a POST request to 123/Bundle
        # Replace with file that will throw 422
        # And I set json body to the file at ./features/fixtures/storeHealthCertificate/Bundle-DDCCDocument.json
      When I receive a response
      Then I expect response should have a status 422