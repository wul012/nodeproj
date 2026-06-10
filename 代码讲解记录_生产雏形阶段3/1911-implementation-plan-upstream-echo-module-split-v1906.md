# Code walkthrough - Node v1906

## Focus

Move the Node v283 implementation-plan draft reference builder into References.

## Code reading notes

- Source Node v283 construction remains a reference-building concern.
- It still consumes the mini-kv snapshot when available.
- The loader no longer has to know the fallback details.

## Maintenance rule

Keep the stable service barrel thin, keep evidence references in References, keep boolean gates and messages in Checks, and keep digest/profile assembly in Core.
