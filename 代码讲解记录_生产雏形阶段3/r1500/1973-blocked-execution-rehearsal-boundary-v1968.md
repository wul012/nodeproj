# Code walkthrough - Node v1968

## Focus

Preserve the public blocked execution rehearsal entrypoint.

## Code reading notes

- The service file still exports loader, renderer, and profile type.
- Internal responsibilities are delegated to Types, Constants, References, Core, Policy, and Renderer.
- Downstream imports remain stable.

## Maintenance rule

Keep public compatibility while shrinking internals.
