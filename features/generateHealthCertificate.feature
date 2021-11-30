@GenerationService
Feature: Generate Health Certificate

  @GenerateHealthCertificate
  Scenario: Generate a Valid Health Certificate
    Given I make a POST request to /QuestionnaireResponse/$generateHealthCertificate
      And I set json body to the file at ./features/fixtures/generateHealthCertificate/Parameters-DDCC-VS-TX-SHE-Parameters-1.json
     When I receive a response
     Then I expect response should have a status 201
      And I expect response should validate against the profile http://worldhealthorganization.github.io/ddcc/StructureDefinition/DDCCDocument
      And I expect response should have a json schema
      """
      {
        "type": "object",
        "properties": {
          "signature": {
            "type": "object"
          }
        },
        "required": [
          "signature"
        ]
      }
      """

  @GenerateHealthCertificateInvalid
  Scenario: Generate a Health Certificate Invalid Request
    Given I make a POST request to /QuestionnaireResponse/$generateHealthCertificate
      And I set json body to the file at ./features/fixtures/generateHealthCertificate/Parameters-DDCC-VS-TX-SHE-Parameters-1-invalid.json
     When I receive a response
     Then I expect response should have a status 422
      And I expect response should validate against the profile http://hl7.org/fhir/StructureDefinition/OperationOutcome
