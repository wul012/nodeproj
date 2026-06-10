# Code walkthrough - Node v1918

## Focus

Keep the loader orchestration thin and readable.

## Code reading notes

- Core now has one clear job: assemble the profile.
- It delegates evidence construction and readiness logic to smaller modules.
- This is the maintainable shape for future versions.

## Maintenance rule

Keep the stable service barrel thin, keep evidence references in References, keep boolean gates and messages in Checks, and keep digest/profile assembly in Core.
