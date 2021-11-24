# ddcc-compliance-testing-framework

DDCC Compliance Testing Framework using Gherkin test scenarios.

## Prerequisites

NPM

Docker (optional)

## Running Tests

### Run Cucumber tests

```sh
npm start
```

### Run Cucumber tests locally using mock server

```sh
npm run test
```

### Run FHIR Validator Service (optional)
```sh
docker-compse up -d
```

### Configuration settings
| Environment variable  | Description | Default |
| ------------- | ------------- | ------------- | 
| BASE_APP_URL  | Server URL to run tests against.  | http://localhost:4321 |
| GENERATION_SERVICE_URL  | Server URL to run Generation Service tests against. | http://localhost:4321 |
| AUTH_HEADER  | Optional Authorization header for requests.    | null  |
| VALIDATOR_SERVICE_URL  | Optional FHIR Validator Service url. If not provided, will skip validator test steps.    | null  |
| MOCK_PORT  |  If running in test mode, port to run mock server.  | null  |
