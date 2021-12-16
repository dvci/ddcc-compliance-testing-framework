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

### Run unit tests using mock server
Unit test configuration is provided in '.env.test' file. If validator service is not available on port 4567, remove or edit the VALIDATOR_SERVICE_URL default variable.

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
Can be modified in .env file (or .env.test for unit test execution).

| Environment variable  | Description | Default |
| ------------- | ------------- | ------------- | 
| BASE_APP_URL  | Server URL to run tests against.  | http://localhost:4321 |
| GENERATION_SERVICE_URL  | Server URL to run Generation Service tests against. | http://localhost:4321 |
| AUTH_HEADER  | Optional Authorization header for requests.    | null  |
| VALIDATOR_SERVICE_URL  | Optional FHIR Validator Service url. If not provided, will skip validator test steps.    | null  |
| MOCK_PORT  |  If running in test mode, port to run mock server.  | null  |
