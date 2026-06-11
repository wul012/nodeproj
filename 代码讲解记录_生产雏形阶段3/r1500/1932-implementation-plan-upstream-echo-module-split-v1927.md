# Code walkthrough - Node v1927

## Focus

Write the cross-project roadmap for v1904-v1933.

## Code reading notes

- The roadmap records why this batch exists.
- It explicitly states Java and mini-kv can proceed in parallel.
- It documents the stop condition so this chain does not grow indefinitely.

## Maintenance rule

Keep the stable service barrel thin, keep evidence references in References, keep boolean gates and messages in Checks, and keep digest/profile assembly in Core.
