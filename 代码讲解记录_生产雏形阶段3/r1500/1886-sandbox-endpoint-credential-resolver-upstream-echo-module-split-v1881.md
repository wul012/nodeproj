# Code walkthrough - Node v1881

## Focus

Move the Node v260 source reference builder into a dedicated references module.

## Code reading notes

- Node v260 reference building is separated from the orchestration path.
- The source-node builder keeps the v259->v260 evidence chain readable on its own.
- This is the shape that downstream consumers can extend without reopening the barrel.

## Maintenance rule

Keep the stable service barrel thin, keep evidence parsing in the shared helper, and keep readiness logic, message builders, and profile assembly in separate modules.
