# Code walkthrough - Node v1981

## Focus

Verify type and build health.

## Code reading notes

- Typecheck confirms module boundaries and type-only exports.
- Build confirms the split compiles into the service graph.

## Maintenance rule

Run typecheck before build after service splits.
