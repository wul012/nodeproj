# Code walkthrough - Node v1916

## Focus

Extract warnings and recommendations into Checks.

## Code reading notes

- Warnings and recommendations no longer add noise to Core.
- They remain owned by Checks because they describe verification outcomes.
- The output messages remain stable.

## Maintenance rule

Keep the stable service barrel thin, keep evidence references in References, keep boolean gates and messages in Checks, and keep digest/profile assembly in Core.
