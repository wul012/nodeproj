# Code walkthrough - Node v1962

## Focus

Extract readiness checks.

## Code reading notes

- `createChecks` lives in Policy.
- It checks Node v288, Java v122-v126, mini-kv v127, digest/shape alignment, runtime side-effect boundaries, and runtime config flags.
- The loader still computes the aggregate ready field.

## Maintenance rule

Add future readiness booleans in Policy.
