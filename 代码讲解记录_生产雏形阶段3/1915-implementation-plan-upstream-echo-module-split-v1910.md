# Code walkthrough - Node v1910

## Focus

Move Java and mini-kv expected snippet builders beside their reference builders.

## Code reading notes

- Snippet builders are reference support code, not loader code.
- Moving them shrinks Core and keeps evidence expectations local.
- The expected snippet count remains covered by existing tests.

## Maintenance rule

Keep the stable service barrel thin, keep evidence references in References, keep boolean gates and messages in Checks, and keep digest/profile assembly in Core.
