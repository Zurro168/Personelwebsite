# Security Policy

## Secrets

Do not commit real secrets to this repository.

Local secret files are ignored by `.gitignore` through `.env*`. Keep real keys in local environment files or Vercel environment variables.

Examples of values that must not be committed:

- API keys
- access tokens
- private deployment credentials
- personal service credentials

## Environment Variables

Use environment variables for external services such as data providers, model APIs, and deployment integrations.

If a key is currently hard-coded in source, move it to an environment variable before public upload or collaborative review.

## Reporting Issues

For private security issues, avoid opening a public issue with secret values. Share only the affected path, risk type, and remediation proposal.

