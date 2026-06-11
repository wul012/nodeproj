# Code walkthrough - Node v1955

## Focus

Extract Node v288 source projection.

## Code reading notes

- `createSourceNodeV288` lives in References.
- It still loads the source contract through the existing Node v288 public loader.
- It projects only the fields needed by v289 verification.

## Maintenance rule

Keep source projection read-only and side-effect free.
