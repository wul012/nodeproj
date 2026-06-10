# Code walkthrough - Node v1905

## Focus

Extract route paths, evidence paths, and comparison catalogs into constants.

## Code reading notes

- Constants include routes, evidence paths, catalog arrays, and requirement ids.
- This keeps literals out of the loader and checks.
- Future evidence path edits now have one obvious home.

## Maintenance rule

Keep the stable service barrel thin, keep evidence references in References, keep boolean gates and messages in Checks, and keep digest/profile assembly in Core.
