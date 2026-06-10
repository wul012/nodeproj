# Code walkthrough - Node v1879

## Focus

Set the split boundary and keep the legacy service entrypoint as a stable barrel.

## Code reading notes

- The legacy service file is now a barrel only.
- The actual loader lives in Core and the renderer stays in its own module.
- This keeps the public import path stable while shrinking the service surface.

## Maintenance rule

Keep the stable service barrel thin, keep evidence parsing in the shared helper, and keep readiness logic, message builders, and profile assembly in separate modules.
