# Code walkthrough - Node v1975

## Focus

Extract core rehearsal assembly.

## Code reading notes

- `createBlockedExecutionRehearsal` computes the rehearsal digest and derived blocked attempt counts.
- Core receives already-shaped source, Java, mini-kv, and attempt inputs.

## Maintenance rule

Core owns derived records, not evidence reading or policy.
