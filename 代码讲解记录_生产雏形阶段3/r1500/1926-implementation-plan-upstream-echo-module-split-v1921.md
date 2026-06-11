# Code walkthrough - Node v1921

## Focus

Run forced historical fallback verification.

## Code reading notes

- Forced fallback verifies committed historical fixtures.
- It confirms CI does not need local Java or mini-kv workspaces.
- This follows the historical evidence fallback rule.

## Maintenance rule

Keep the stable service barrel thin, keep evidence references in References, keep boolean gates and messages in Checks, and keep digest/profile assembly in Core.
