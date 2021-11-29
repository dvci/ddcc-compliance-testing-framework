@GenerationService
Feature: Submit Health Event

  @SubmitHealthEvent
  Scenario: Submit Valid Health Event
    Given I make a POST request to /submitHealthEvent
      And I set json body to the file at ./features/fixtures/Bundle-DDCC-TX-SHE-bundle-example-1.json
     When I receive a response
     Then I expect response should have a status 201
      And I expect response should validate against the profile http://worldhealthorganization.github.io/ddcc/StructureDefinition/DDCCSubmitHealthEventResponse
      And I expect response should have a json schema
      """
      {
        "type": "object",
        "properties": {
          "entry": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "response": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string"
                    },
                    "location:": {
                      "type": "string"
                    },
                    "etag:": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "status",
                    "location",
                    "etag"
                  ]
                }
              },
              "required": [
                "response"
              ]
            }
          }
        }
      }
      """

  @SubmitInvalidHealthEvent
  Scenario: Submit Invalid Health Event
    Given I make a POST request to /submitHealthEvent
      And I set json body to the file at ./features/fixtures/Bundle-DDCC-TX-SHE-bundle-example-invalid.json
     When I receive a response
     Then I expect response should have a status 422
      And I expect response should validate against the profile http://hl7.org/fhir/StructureDefinition/OperationOutcome