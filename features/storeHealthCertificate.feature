Feature: Store Health Certificate

    Scenario: Submit Valid Store Health Certificate Transaction
      Given I make a POST request to /Bundle
        And I set json to the file at ./features/fixtures/Bundle-DDCCDocument.json
      When I receive a response
      Then I expect response should have a status 201
        # Need to replace [base]/[type]/[id]/_history/[vid] with actual location
        And I expect response header Location should be [base]/[type]/[id]/_history/[vid]
        # Need to replace [base]/[type]/[id]/_history/[vid] with actual location
        And I store response at [base]/[type]/[id]/_history/[vid] as Bundle-DDCCDocument

    Scenario: Submit Bad Request Storage Transaction
      Given I make a POST request to /Bundle
        # Replace with file that will throw 400
        And I set json to the file at ./features/fixtures/Bundle-DDCCDocument.json
      When I receive a response
      Then I expect response should have a status 400

    Scenario: Submit Not Found Storage Transaction
      Given I make a POST request to /Bundle
        # Replace with file that will throw 404
        And I set json to the file at ./features/fixtures/Bundle-DDCCDocument.json
      When I receive a response
      Then I expect response should have a status 404

    Scenario: Submit Unprocessable Entity Storage Transaction
      Given I make a POST request to /Bundle
        # Replace with file that will throw 422
        And I set json to the file at ./features/fixtures/Bundle-DDCCDocument.json
      When I receive a response
      Then I expect response should have a status 422