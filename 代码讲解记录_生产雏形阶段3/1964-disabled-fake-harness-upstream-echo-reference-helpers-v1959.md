# Code walkthrough - Node v1959

## Focus

Extract reference helper functions.

## Code reading notes

- Evidence digest and typed JSON field helpers are private to References.
- Policy receives already-shaped reference objects.
- The loader no longer owns JSON parsing details.

## Maintenance rule

Keep parsing helpers close to the evidence readers that use them.
