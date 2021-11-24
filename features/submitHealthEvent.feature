@GenerationService
Feature: Submit Health Event

  @SubmitHealthEvent
  Scenario: Submit Valid Health Event
    Given I make a POST request to /submitHealthEvent
      And I set json body to the file at ./features/fixtures/Bundle-DDCC-TX-SHE-bundle-example-1.json
     When I receive a response
     Then I expect response should have a status 201
     And I expect response should validate against the profile http://worldhealthorganization.github.io/ddcc/StructureDefinition/DDCCSubmitHealthEventResponse
     
     # Receive back a submitHealthEventResponse - DONE
     # Bundle has a type batch-response - DONE
        # Bundle contains one entry for each entry in the request, in the same order - NOT NEEDED

     # Bundle includes a DDCC Document - DONE

     # Each entry element SHALL contain a response element - NEED TO FOLLOW UP ABOUT THESE - should they be in the spec?
        # Response element contains the HTTP status code, and the location and ETag header values, which are used for identifying and versioning the resources.

  @SubmitInvalidHealthEvent
  Scenario: Submit Invalid Health Event
    Given I make a POST request to /submitHealthEvent
    And I set json body to the file at ./features/fixtures/Bundle-DDCC-TX-SHE-bundle-example-invalid.json
    When I receive a response
    Then I expect response should have a status 422
    And I expect response should validate against the profile http://hl7.org/fhir/StructureDefinition/OperationOutcome

     # ERROR: failed FHIR batch transaction ie a single Operation Outcome.