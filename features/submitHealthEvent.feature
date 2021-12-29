@GenerationService
@SubmitHealthEvent
Feature: Submit Health Event

  @SubmitValidHealthEvent
  Scenario: Submit Valid Health Event
    Given I make a POST request to /submitHealthEvent
      And I set json body to the file at ./features/fixtures/submitHealthEvent/Bundle-DDCC-TX-SHE-bundle-example-1.json
     When I receive a response
     Then I expect response should have a status 201
      And I expect response should validate against the profile http://worldhealthorganization.github.io/ddcc/StructureDefinition/DDCCSubmitHealthEventResponse
      And I expect response should have a json body like the file at ./features/fixtures/submitHealthEvent/SubmitValidHealthEvent-response.json

  @SubmitInvalidHealthEvent
  Scenario: Submit Invalid Health Event
    Given I make a POST request to /submitHealthEvent
      And I set json body to the file at ./features/fixtures/submitHealthEvent/Bundle-DDCC-TX-SHE-bundle-example-invalid.json
     When I receive a response
     Then I expect response should have a status 422
      And I expect response should validate against the profile http://hl7.org/fhir/StructureDefinition/OperationOutcome

  # Language-specific Scenarios

  @SubmitChineseHealthEvent
  Scenario: Submit Chinese Health Event
    Given I make a POST request to /submitHealthEvent
      And I set json body to the file at ./features/fixtures/submitHealthEvent/languages/Bundle-DDCC-TX-SHE-bundle-example-Chinese.json
     When I receive a response
     Then I expect response should have a status 201
      And I expect response should validate against the profile http://worldhealthorganization.github.io/ddcc/StructureDefinition/DDCCSubmitHealthEventResponse
      