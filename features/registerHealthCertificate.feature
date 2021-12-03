@RegistryService
Feature: Register Health Certificate

    @RegisterHealthCertificate
    Scenario: Submit Valid Register Health Certificate Transaction
        Given I make a POST request to /
            And I set json body to the file at ./features/fixtures/registerHealthCertificate/Bundle-ProvideDDCCDocument.json
        When I receive a response
        Then I expect response should have a status 200
            And I expect a response entry exists for each request entry List, DocumentReference, Binary, Patient
            And I expect response should validate against the profile http://profiles.ihe.net/ITI/MHD/StructureDefinition/IHE.MHD.ProvideDocumentBundleResponse
            # Check that at least one entry exists in response for each entry in request, in same order
            # Check each entry in response has a response location
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
                                        "location": {
                                            "type": "string"
                                        },
                                        "lastModified": {
                                            "type": "string"
                                        }
                                    },
                                    "required": [
                                        "location"
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
            
