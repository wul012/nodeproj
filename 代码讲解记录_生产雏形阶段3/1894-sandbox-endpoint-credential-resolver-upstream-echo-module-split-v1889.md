# Code walkthrough - Node v1889

## Focus

Verify the focused upstream echo test and forced fallback path.

## Code reading notes

- The focused test exercises the actual upstream echo profile.
- The forced fallback run verifies the historical evidence path that CI depends on.
- Together they cover both local and runner-style execution.

## Maintenance rule

Keep the stable service barrel thin, keep evidence parsing in the shared helper, and keep readiness logic, message builders, and profile assembly in separate modules.
