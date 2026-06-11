# Code walkthrough - Node v1898

## Focus

Write the code walkthrough records for the batch.

## Code reading notes

- The walkthrough series records how the code is now organized.
- It mirrors the internal split so the public barrel, core, checks, and references all have a readable home in the archive.
- That is the maintenance map for the next person who touches this chain.

## Maintenance rule

Keep the stable service barrel thin, keep evidence parsing in the shared helper, and keep readiness logic, message builders, and profile assembly in separate modules.
