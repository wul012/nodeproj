# Node v1962 - disabled fake harness upstream echo policy checks

## Focus

Move readiness checks into policy.

## What changed

`createChecks` now owns Node v288 readiness, Java evidence readiness, mini-kv receipt readiness, digest alignment, shape alignment, and side-effect boundary checks.

## Maintenance note

New readiness booleans should be added in policy with matching blocker messages.
