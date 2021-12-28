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

Starts FHIR validator service in Docker on port 4567. An updated FHIR IG package.tgz must be included in the /igs folder at service initialization.

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
