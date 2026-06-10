# Code walkthrough - Node v1924

## Focus

Run build after the split.

## Code reading notes

- Build validates emitted TypeScript output.
- It also confirms module resolution after the split.
- Generated dist is cleaned before commit.

## Maintenance rule

Keep the stable service barrel thin, keep evidence references in References, keep boolean gates and messages in Checks, and keep digest/profile assembly in Core.
