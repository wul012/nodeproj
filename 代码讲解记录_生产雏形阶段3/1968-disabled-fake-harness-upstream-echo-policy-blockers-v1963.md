# Code walkthrough - Node v1963

## Focus

Extract blocker messages.

## Code reading notes

- `collectProductionBlockers` lives in Policy.
- Each blocker maps a failed readiness condition to a stable code and message.
- Runtime config blockers remain explicit.

## Maintenance rule

Add blocker text beside new checks.
