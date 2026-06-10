# Code walkthrough - Node v1896

## Focus

Write the batch roadmap with cross-project parallel guidance.

## Code reading notes

- The roadmap now states the scope, necessity proof, and parallel plan.
- It explicitly says Java and mini-kv can continue in parallel because Node consumes frozen evidence only.
- That keeps the cross-project governance clear.

## Maintenance rule

Keep the stable service barrel thin, keep evidence parsing in the shared helper, and keep readiness logic, message builders, and profile assembly in separate modules.
