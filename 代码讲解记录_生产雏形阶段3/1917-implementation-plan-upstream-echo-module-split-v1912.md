# Code walkthrough - Node v1912

## Focus

Move echo verification assembly into Core.

## Code reading notes

- Echo verification assembly remains deterministic and digest-driven.
- Core owns this because it is part of final profile construction.
- The verification mode and source span are unchanged.

## Maintenance rule

Keep the stable service barrel thin, keep evidence references in References, keep boolean gates and messages in Checks, and keep digest/profile assembly in Core.
