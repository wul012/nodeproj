# Code walkthrough - Node v1930

## Focus

Clean build and temporary outputs before commit.

## Code reading notes

- Cleanup removes generated build/test outputs.
- Only source, tests, docs, and archives should remain.
- This prevents temporary files from entering the commit.

## Maintenance rule

Keep the stable service barrel thin, keep evidence references in References, keep boolean gates and messages in Checks, and keep digest/profile assembly in Core.
