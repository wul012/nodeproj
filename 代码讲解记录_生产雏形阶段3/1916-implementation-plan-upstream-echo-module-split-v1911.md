# Code walkthrough - Node v1911

## Focus

Move ordered comparisons, object id extraction, booleans, and digest helpers out of the loader.

## Code reading notes

- arraysEqual, objectIds, booleanFrom, evidenceDigest, and type guards are now support helpers.
- They sit beside the evidence builders that need them.
- Checks import only the ordered comparison helper.

## Maintenance rule

Keep the stable service barrel thin, keep evidence references in References, keep boolean gates and messages in Checks, and keep digest/profile assembly in Core.
