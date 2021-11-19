Feature: Register Health Certificate

    Scenario: Submit Valid Register Health Certificate Transaction
        Given I make a POST request to [BASE] # (since txn bundle)
            And I set json to 
            And the json contains a SubmissionSet type List
            And the json contains one or more DocumentReference
            And the json contains one of more Binary
            And the json contains one or more Folder type list
            And the json contains one Patient
        When I receive a response
        Then response should have a status 201
