# ddcc-compliance-testing-framework

DDCC Compliance Testing Framework using Gherkin test scenarios.

## Prerequisites

NPM

Docker (optional)

## Running Tests

### Run compliance tests

```sh
npm start
```

### Run Cucumber unit tests locally using mock server

Test configuration is provided in '.env.test' file. If validator service is not available on port 4567, remove or edit the VALIDATOR_SERVICE_URL default variable.

```sh
npm run test
```

### Run FHIR Validator Service (optional)

Starts FHIR validator service in Docker on port 4567.

```sh
docker-compose up -d validator_service
```

Alternatively, you may choose to use the matchbox service on port 8080 for validation. You will need to update the .env.test file with the appropriate URL.

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

## Transaction Details

### DDCC:VS Generation Service

#### Submit Health Event

This transaction submits a Health Event Request and returns a Submit Health Event Response. To learn more about this transaction, refer to the [Submit Health Event workflow in the WHO specification](https://worldhealthorganization.github.io/ddcc/transactions.html#submit-health-event).

The following assertions are made for this transaction:

- add assertions

#### Generate Health Certificate

This FHIR operation accepts a set of immunization data elements via a questionnaire response and returns a DDCC Dociment. To learn more about this transaction, refer to the [Generate Health Certificate OperationDefinition](https://worldhealthorganization.github.io/ddcc/OperationDefinition-DDCC-QuestionnaireResponse-generateHealthCertificate.html).

The following assertions are made for this transaction:

- add assertions

### DDCC:VS Registry Service

#### Register Health Certificate

This transaction is called by the Generate Health Certificate service when a new Submit Health Event is accepted. The transaction is based on the [MHD Provide Document Bundle transaction](https://profiles.ihe.net/ITI/MHD/ITI-65.html#2365412-message-semantics). To learn more about this transaction, refer to the [Register Health Certificate workflow in the WHO specification](https://worldhealthorganization.github.io/ddcc/transactions.html#register-health-certificate).

The following assertions are made for this transaction:

- Valid Transaction: When a POST request is sent to `[base]`, the response should return 200 status and the response should have at least one entry for each entry in the request, in the same order, with an entry response location.
- Invalid Transaction (400 Error): When a POST request is sent to `[base]` that fails the basic FHIR validation rules, the response should return 400 status.
- Invalid Transaction (422 Error): When a POST request is sent to `[base]` that does not conform to the [DDCC Provide Document Bundle profile](http://worldhealthorganization.github.io/ddcc/StructureDefinition/DDCCProvideDocumentBundle), the response should return 422 status.

### DDCC:VS Repository Service

#### Store Health Certificate

This transaction is called by the Generate Health Certificate service when a new Submit Health Event is accepted. The transaction stores the resulting DDCC Document. To learn more about this transaction, refer to the [Store Health Certificate workflow in the WHO specification](https://worldhealthorganization.github.io/ddcc/transactions.html#store-health-certificate).

The following assertions are made for this transaction:

- add assertions
