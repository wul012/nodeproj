# Code walkthrough - Node v1954

## Focus

Extract constants.

## Code reading notes

- The constants module owns profile version, route paths, plan paths, Java evidence paths, mini-kv receipt path, and contract shape arrays.
- Policy and references consume those constants directly.

## Maintenance rule

Do not reintroduce path or contract-shape constants into the loader.
