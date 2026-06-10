# Code walkthrough - Node v1904

## Focus

Set the implementation-plan upstream echo split boundary and stable barrel.

## Code reading notes

- The original service file now forwards to Core and Renderer.
- This protects existing imports while removing the thousand-line service body.
- The public route table keeps using the same entrypoint.

## Maintenance rule

Keep the stable service barrel thin, keep evidence references in References, keep boolean gates and messages in Checks, and keep digest/profile assembly in Core.
