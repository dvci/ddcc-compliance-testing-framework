# ddcc-compliance-testing-framework

DDCC Compliance Testing Framework using [Gherkin test](https://cucumber.io/docs/gherkin/) scenarios.

## Quick start

### Prerequisites

- [NPM](https://docs.npmjs.com)
- [Docker (optional)](https://docs.docker.com/get-docker/)

### Run compliance tests

```sh
npm install
npm start
```

After running the tests, open `cucumber-report.html` for a detailed report of the test results.

### Run FHIR Validator Service (optional)

Starts FHIR validator service in Docker on port 4567. Update the `.env` file VALIDATOR_SERVICE_URL variable to http://localhost:4567/validate.

An updated FHIR IG package.tgz must be included in the /igs folder at service initialization.

```sh
docker-compose up -d validator_service
```

Alternatively, you may choose to use the matchbox service on port 8080 for validation. 

You will need to update the `.env` file VALIDATOR_SERVICE_URL variable to http://localhost:8080/matchbox/fhir/$validate.

```sh
docker-compose up -d matchbox
```

### Configuration settings

| Environment variable   | Description                                                                           | Default               |
| ---------------------- | ------------------------------------------------------------------------------------- | --------------------- |
| GENERATION_SERVICE_URL | Server URL to run Generation Service tests against.                                   | http://localhost:4321 |
| REPOSITORY_SERVICE_URL | Server URL to run Repository Service tests against.                                   | http://localhost:4321 |
| REGISTRY_SERVICE_URL   | Server URL to run Registry Service tests against.                                     | http://localhost:4321 |
| AUTH_HEADER            | Optional Authorization header for requests.                                           | null                  |
| VALIDATOR_SERVICE_URL  | Optional FHIR Validator Service url. If not provided, will skip validator test steps. | null                  |
| MOCK_PORT              | If running in test mode, port to run mock server.                                     | null                  |

## Unit tests

### Run Cucumber unit tests locally using mock server

Test configuration is provided in the `.env.test` file. If the validator service is not available on port 4567, remove or edit the `VALIDATOR_SERVICE_URL` variable default value.

```sh
npm run test
```

## Validation Details

For each of the defined transactions, the following elements are validated using Gherkin test scenarios:

- Response status code
- Profile validation using the FHIR validator
- Additional content validation that aligns with the transaction specifications, using the [PactumJS API Testing Tool](https://pactumjs.github.io/#/)
- Response creates resource at specified location (if applicable for the transaction)
- Error conditions are satisfied (if applicable for the transaction)

The test framework does not perform cleanup steps or delete operations after execution. It is assumed that data services will reset between test runs.

## Transaction Details

The following transactions are tested via Gherkin test scenarios:

- [Submit Health Event](https://worldhealthorganization.github.io/ddcc/transactions.html#submit-health-event)
- [Generate Health Certificate](https://worldhealthorganization.github.io/ddcc/OperationDefinition-DDCC-QuestionnaireResponse-generateHealthCertificate.html)
- [Register Health Certificate](https://worldhealthorganization.github.io/ddcc/transactions.html#register-health-certificate)
- [Store Health Certificate](https://worldhealthorganization.github.io/ddcc/transactions.html#store-health-certificate)

For the following transactions, let `[base]` represent the base URL for the HTTP requests sent to the server.

### DDCC:VS Generation Service

#### Submit Health Event

This transaction submits a Health Event Request consisting of a batch Bundle of [Parameters](https://worldhealthorganization.github.io/ddcc/StructureDefinition-DDCCGenerateHealthCertificateParameters.html) for the [Generate Health Certificate Operation](https://worldhealthorganization.github.io/ddcc/OperationDefinition-DDCC-QuestionnaireResponse-generateHealthCertificate.html). The transaction returns a Submit Health Event Response consisting of a batch-response FHIR Bundle. To learn more about this transaction, refer to the [Submit Health Event workflow in the WHO DDCC:VS Implementation Guide](https://worldhealthorganization.github.io/ddcc/transactions.html#submit-health-event).

The following assertions are made for this transaction:

- Valid Transaction: When a valid Health Event Request is sent via POST to `[base]/submitHealthEvent`, the response should:
  - Return 201 status.
  - Return a response body that maintains elements from the request such as the DDCCDocument HCID, DDCCPatient name and birthdate, and DDCCImmunization vaccine information.
- Valid Language Transactions: The same valid transaction response assertions listed above can also be checked for requests with information in different languages. The ddcc-compliance-testing-framework currently supports testing scenarios for the following languages:
  - English
  - Arabic
  - Chinese
  - French
  - Russian
  - Spanish
- Invalid Transaction (422 Error): When a Health Event Request is sent via POST to `[base]/submitHealthEvent` that does not conform to the [DDCCSubmitHealthEventRequest profile](https://worldhealthorganization.github.io/ddcc/StructureDefinition-DDCCSubmitHealthEventRequest.html), the response should return 422 status.

#### Generate Health Certificate

This FHIR operation accepts a set of immunization data elements via a [FHIR Parameters resource](https://worldhealthorganization.github.io/ddcc/StructureDefinition-DDCCGenerateHealthCertificateParameters.html) and returns [DDCCDocument resource](https://worldhealthorganization.github.io/ddcc/StructureDefinition-DDCCDocument.html) as the response.
To learn more about this transaction, refer to the [Generate Health Certificate OperationDefinition](https://worldhealthorganization.github.io/ddcc/OperationDefinition-DDCC-QuestionnaireResponse-generateHealthCertificate.html).

The following assertions are made for this transaction:

- Valid Transaction: When a valid Generate Health Certificate Request is sent via POST to `[base]/QuestionnaireResponse/$generateHealthCertificate`, the response should:
  - Return 200 status.
  - Return a valid [DDCCDocument resource](https://worldhealthorganization.github.io/ddcc/StructureDefinition-DDCCDocument.html) as the response body.
  - Contain a valid signature element as a part of the DDCCDocument response.
- Invalid Transaction (422 Error): When a Generate Health Certificate Request is sent via POST to `[base]/QuestionnaireResponse/$generateHealthCertificate` that does not conform to the [DCCCGenerateHealthCertificateParameters profile](https://worldhealthorganization.github.io/ddcc/StructureDefinition-DDCCGenerateHealthCertificateParameters.html), the response should return 422 status.

### DDCC:VS Registry Service

#### Register Health Certificate

This transaction is called by the Generate Health Certificate service when a new Submit Health Event is accepted. The request consists of a [DDCC Provide Document Bundle](https://worldhealthorganization.github.io/ddcc/StructureDefinition-DDCCProvideDocumentBundle.html), and the response is a transaction bundle. The transaction is based on the [MHD Provide Document Bundle transaction](https://profiles.ihe.net/ITI/MHD/ITI-65.html#2365412-message-semantics). To learn more about this transaction, refer to the [Register Health Certificate workflow in the WHO DDCC:VS Implementation Guide](https://worldhealthorganization.github.io/ddcc/transactions.html#register-health-certificate).

The following assertions are made for this transaction:

- Valid Transaction: When a valid Register Health Certicate Request is sent via POST to `[base]`, the response should:
  - Return 200 status.
  - Return a transaction bundle that has at least one entry for each entry in the request, in the same order, with an entry response location.
- Invalid Transactions:
  - 400 Error: When a POST request is sent to `[base]` that fails the basic FHIR validation rules, the response should return 400 status.
  - 422 Error: When a POST request is sent to `[base]` that does not conform to the [DDCC Provide Document Bundle profile](https://worldhealthorganization.github.io/ddcc/StructureDefinition-DDCCProvideDocumentBundle.html), the response should return 422 status.

### DDCC:VS Repository Service

#### Store Health Certificate

This transaction is called by the Generate Health Certificate service when a new Submit Health Event is accepted. The transaction stores the resulting [DDCC Document](https://worldhealthorganization.github.io/ddcc/StructureDefinition-DDCCDocument.html). To learn more about this transaction, refer to the [Store Health Certificate workflow in the WHO DDCC:VS Implementation Guide](https://worldhealthorganization.github.io/ddcc/transactions.html#store-health-certificate).

The following assertions are made for this transaction:

- Valid Transaction: When a valid Store Health Certificate Request is sent via POST to `[base]/Bundle`, the response should:
  - Return 201 status.
  - Return a `Location` header that is appropriately populated for the created resource.
- Invalid Transactions
  - 400 Error: When a POST request is sent to `[base]/Bundle` that fails the basic FHIR validation rules, the response should return 400 status.
  - 404 Error: When a POST request is sent to `[base]/Bundle` with a JSON body that contains an invalid resource type, or a POST request is sent to an invalid endpoint, the response should return 404 status.
  - 422 Error: When a POST request is sent to `[base]/Bundle` that does not conform to the [DDCC Document profile](https://worldhealthorganization.github.io/ddcc/StructureDefinition-DDCCDocument.html), the response should return 422 status.
