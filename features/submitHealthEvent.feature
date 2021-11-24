@GenerationService
Feature: Submit Health Event

  @SubmitHealthEvent
  Scenario: Submit Valid Health Event
    Given I make a POST request to /submitHealthEvent
      And I set json body to the file at ./features/fixtures/Bundle-DDCC-TX-SHE-bundle-example-1.json
     When I receive a response
     Then I expect response should have a status 201
     And I expect response should validate against the profile http://worldhealthorganization.github.io/ddcc/StructureDefinition/DDCCSubmitHealthEventResponse
     
     # Receive back a submitHealthEventResponse
     # Bundle has a type batch-response
        # Bundle contains one entry for each entry in the request, in the same order,

     # Bundle includes a DDCC Document

     # Each entry element SHALL contain a response element
        # Response element contains the HTTP status code, and the location and ETag header values, which are used for identifying and versioning the resources.


     # ERROR: failed FHIR batch transaction ie a single Operation Outcome.