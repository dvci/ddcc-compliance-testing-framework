Feature: Store Health Certificate

    Scenario: Submit Valid Store Health Certificate Transaction
        Given I make a POST request to [BASE]/Bundle
          And I set json to the response of /submitHealthEvent
        When I receive a response
        Then response should have a status 201
          And response should have a populated location header
         
    Scenario: Submit Invalid Store Health Certificate Transaction
        Given I make a POST request to [BASE]/Bundle
          When I receive a response
          Then I expect response should have a status 400
    