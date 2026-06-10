# Code walkthrough - Node v1884

## Focus

Keep ordered comparisons and historical evidence helpers isolated from the loader path.

## Code reading notes

- Ordered comparisons are shared through a small helper.
- Historical evidence parsing stays in the shared evidence utility rather than reappearing in the service.
- This keeps the reference builders focused on domain checks, not plumbing.

## Maintenance rule

Keep the stable service barrel thin, keep evidence parsing in the shared helper, and keep readiness logic, message builders, and profile assembly in separate modules.
