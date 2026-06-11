# Code walkthrough - Node v1950

## Focus

Verify downstream intake gate consumers.

## Code reading notes

- Deployment evidence verification still loads the intake gate.
- Release-window readiness packet still loads the intake gate through its service entrypoint.
- The split does not change route or profile shape for those consumers.

## Maintenance rule

Run adjacent downstream tests when changing a shared governance source.
