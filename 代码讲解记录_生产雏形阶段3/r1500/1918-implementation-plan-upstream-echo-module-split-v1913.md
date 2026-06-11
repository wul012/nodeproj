# Code walkthrough - Node v1913

## Focus

Extract readiness checks into Checks.

## Code reading notes

- Checks now owns the boolean gate matrix.
- That is the module to review before changing readiness semantics.
- The loader only consumes the resulting check object.

## Maintenance rule

Keep the stable service barrel thin, keep evidence references in References, keep boolean gates and messages in Checks, and keep digest/profile assembly in Core.
