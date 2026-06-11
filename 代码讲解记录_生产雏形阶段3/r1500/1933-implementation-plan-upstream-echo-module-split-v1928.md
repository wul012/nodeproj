# Code walkthrough - Node v1928

## Focus

Write per-version explanation archive entries.

## Code reading notes

- Explanation files give each version a stable archive entry.
- They keep the batch auditable without reopening the diff.
- The explanation path matches existing archive conventions.

## Maintenance rule

Keep the stable service barrel thin, keep evidence references in References, keep boolean gates and messages in Checks, and keep digest/profile assembly in Core.
