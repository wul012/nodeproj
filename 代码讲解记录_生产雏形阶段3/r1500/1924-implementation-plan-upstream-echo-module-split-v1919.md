# Code walkthrough - Node v1919

## Focus

Add split-export identity coverage for the stable entrypoint.

## Code reading notes

- The test compares the public loader export with the Core loader export.
- It also compares the public renderer export with the Renderer module.
- This protects the stable entrypoint during later refactors.

## Maintenance rule

Keep the stable service barrel thin, keep evidence references in References, keep boolean gates and messages in Checks, and keep digest/profile assembly in Core.
