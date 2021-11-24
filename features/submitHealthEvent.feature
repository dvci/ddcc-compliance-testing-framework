@GenerationService
Feature: Submit Health Event

  @SubmitHealthEvent
  Scenario: Submit Valid Health Event
    Given I make a POST request to /submitHealthEvent
      And I set json body to the file at ./features/fixtures/Bundle-DDCC-TX-SHE-bundle-example-1.json
     When I receive a response
     Then I expect response should have a status 201
     And I expect response should validate against the profile http://hl7.org/fhir/StructureDefinition/Bundle