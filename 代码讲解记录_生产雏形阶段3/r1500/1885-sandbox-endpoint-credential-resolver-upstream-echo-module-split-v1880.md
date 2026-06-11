# Code walkthrough - Node v1880

## Focus

Extract route paths, evidence paths, and comparison catalogs into constants.

## Code reading notes

- Route strings, evidence paths, and comparison catalogs no longer sit beside the loader.
- That makes the loader easier to read and the batch easier to extend.
- Shared constants also make the later tests and docs more obvious to scan.

## Maintenance rule

Keep the stable service barrel thin, keep evidence parsing in the shared helper, and keep readiness logic, message builders, and profile assembly in separate modules.
