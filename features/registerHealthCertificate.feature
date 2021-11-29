@RegistryService
Feature: Register Health Certificate

    @RegisterHealthCertificate
    Scenario: Submit Valid Register Health Certificate Transaction
        Given I make a POST request to /
            And I set json body to the file at ./features/fixtures/registerHealthCertificate/Bundle-ProvideDDCCDocument.json
        When I receive a response
        Then I expect response should have a status 200
            And I expect response should validate against the profile http://profiles.ihe.net/ITI/MHD/StructureDefinition/IHE.MHD.ProvideDocumentBundleResponse

    @RegisterInvalidHealthCertificate-400
    Scenario: Submit Bad Request Register Health Certificate Transaction
        Given I make a POST request to /
            And I set json body to the file at ./features/fixtures/registerHealthCertificate/Bundle-ProvideDDCCDocument-400.json
        When I receive a response  
        Then I expect response should have a status 400
            And I expect response should validate against the profile http://hl7.org/fhir/StructureDefinition/OperationOutcome
    
    @RegisterInvalidHealthCertificate-422
    Scenario: Submit Invalid Register Health Certificate Transaction
        Given I make a POST request to /
            And I set json body to the file at ./features/fixtures/registerHealthCertificate/Bundle-ProvideDDCCDocument-422.json
        When I receive a response
        Then I expect response should have a status 422
            And I expect response should validate against the profile http://hl7.org/fhir/StructureDefinition/OperationOutcome
            
