@RegisterHealthCertificate
Feature: Register Health Certificate

  @RegisterHealthCertificate-valid
  Scenario: Submit Valid Register Health Certificate Transaction
    Given I make a POST request to /
      And I set json body to the file at ./features/fixtures/registerHealthCertificate/Bundle-ProvideDDCCDocument.json
    When I receive a response
    Then I expect response should have a status 200
      # Check that an entry exists in response for each entry in request, in same order
      And I expect response should validate against the profile http://worldhealthorganization.github.io/ddcc/StructureDefinition/DDCCProvideDocumentBundle
      And I expect a response entry exists for each request entry in same order
            
  @RegisterInvalidHealthCertificate-400
  Scenario: Submit Bad Request Register Health Certificate Transaction
    Given I make a POST request to /
      # Bundle missing type attribute (fails basic FHIR validation rules)
      And I set json body to the file at ./features/fixtures/registerHealthCertificate/Bundle-ProvideDDCCDocument-400.json
    When I receive a response  
    Then I expect response should have a status 400
      And I expect response should validate against the profile http://hl7.org/fhir/StructureDefinition/OperationOutcome
    
  @RegisterInvalidHealthCertificate-422
  Scenario: Submit Invalid Register Health Certificate Transaction
    Given I make a POST request to /
      # Bundle missing required entries (violates the profile)
      And I set json body to the file at ./features/fixtures/registerHealthCertificate/Bundle-ProvideDDCCDocument-422.json
    When I receive a response
    Then I expect response should have a status 422
      And I expect response should validate against the profile http://hl7.org/fhir/StructureDefinition/OperationOutcome
            
