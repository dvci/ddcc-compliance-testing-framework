Feature: Store Health Certificate

    Scenario: Submit Valid Store Health Certificate Transaction
        Given I make a POST request to /Bundle
          And I set json to the file at ./features/fixtures/Bundle-DDCCDocument.json
        When I receive a response
        Then I expect response should have a status 201
          And I expect response header Location should have DDCC:VSRepositoryService
          And I store response at DDCC:VSRepositoryService as Bundle-DDCCDocument