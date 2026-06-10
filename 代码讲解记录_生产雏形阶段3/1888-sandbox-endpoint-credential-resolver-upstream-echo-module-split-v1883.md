# Code walkthrough - Node v1883

## Focus

Move the mini-kv v114 non-participation reference builder into the dedicated references module.

## Code reading notes

- mini-kv v114 reference building is also isolated.
- The receipt parsing and non-participation assertions stay grouped together.
- That makes the sibling evidence chain easier to maintain.

## Maintenance rule

Keep the stable service barrel thin, keep evidence parsing in the shared helper, and keep readiness logic, message builders, and profile assembly in separate modules.
