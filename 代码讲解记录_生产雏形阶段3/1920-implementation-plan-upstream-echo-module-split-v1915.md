# Code walkthrough - Node v1915

## Focus

Extract production blocker messages into Checks.

## Code reading notes

- Production blockers now live next to the failed conditions they explain.
- That makes blocker language easier to maintain.
- The blocker codes remain unchanged.

## Maintenance rule

Keep the stable service barrel thin, keep evidence references in References, keep boolean gates and messages in Checks, and keep digest/profile assembly in Core.
