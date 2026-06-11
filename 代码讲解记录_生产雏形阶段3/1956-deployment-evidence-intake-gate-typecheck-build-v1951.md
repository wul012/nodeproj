# Code walkthrough - Node v1951

## Focus

Verify project-level type and build health.

## Code reading notes

- Type-only imports keep runtime cycles out of the split.
- Build confirms the new modules compile into the service graph.
- Generated build output is not kept as a source artifact.

## Maintenance rule

Typecheck before build after large service splits.
