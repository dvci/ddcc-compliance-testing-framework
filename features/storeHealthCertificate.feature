@RepositoryService
Feature: Store Health Certificate

  @StoreHealthCertificate
  Scenario: Submit Valid Store Health Certificate Transaction
    Given I make a POST request to /Bundle
      And I set json body to the file at ./features/fixtures/storeHealthCertificate/Bundle-DDCCDocument.json
    When I receive a response
    Then I expect response should have a status 201
      And I expect response header location should be /DDCCDocument/TESTID
      And I store response at /DDCCDocument/TESTID as Bundle-DDCCDocument

  @StoreInvalidHealthCertificate-400
  Scenario: Submit Storage Transaction With Bad Request
    Given I make a POST request to /Bundle
      # Bundle missing type attribute (fails basic FHIR validation rules)
      And I set json body to the file at ./features/fixtures/storeHealthCertificate/Bundle-DDCCDocument-400.json
    When I receive a response
    Then I expect response should have a status 400
      And I expect response should validate against the profile http://hl7.org/fhir/StructureDefinition/OperationOutcome

  @StoreInvalidHealthCertificate-404-1
  Scenario: Submit Storage Transaction With Invalid Endpoint
    Given I make a POST request to /INVALIDENDPOINT
    When I receive a response
    Then I expect response should have a status 404
      And I expect response should validate against the profile http://hl7.org/fhir/StructureDefinition/OperationOutcome

  @StoreInvalidHealthCertificate-404-2
  Scenario: Submit Storage Transaction With Invalid Resource Type
    Given I make a POST request to /Bundle
      # JSON containing invalid resource type
      And I set json body to the file at ./features/fixtures/storeHealthCertificate/Bundle-DDCCDocument-404.json
    When I receive a response
    Then I expect response should have a status 404
      And I expect response should validate against the profile http://hl7.org/fhir/StructureDefinition/OperationOutcome

  @StoreInvalidHealthCertificate-422
  Scenario: Submit Invalid Profile Storage Transaction
    Given I make a POST request to /Bundle
      # Bundle missing required entries (violates the profile)
      And I set json body to the file at ./features/fixtures/storeHealthCertificate/Bundle-DDCCDocument-422.json
    When I receive a response
    Then I expect response should have a status 422
      And I expect response should validate against the profile http://hl7.org/fhir/StructureDefinition/OperationOutcome