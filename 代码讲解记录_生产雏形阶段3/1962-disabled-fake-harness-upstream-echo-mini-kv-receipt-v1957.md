# Code walkthrough - Node v1957

## Focus

Extract mini-kv receipt parsing.

## Code reading notes

- `createMiniKvV127Reference` lives in References.
- It reads the non-participation receipt and projects side-effect boundary fields.
- It preserves contract digest and shape alignment checks for policy.

## Maintenance rule

Treat mini-kv as evidence input only.
