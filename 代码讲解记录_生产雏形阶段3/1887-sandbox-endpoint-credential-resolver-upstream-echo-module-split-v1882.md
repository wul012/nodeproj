# Code walkthrough - Node v1882

## Focus

Move the Java v105 reference builder into the dedicated references module.

## Code reading notes

- Java v105 reference building is now a dedicated concern.
- Its evidence files, snippets, and alignment markers can be scanned without loader noise.
- That keeps the cross-project evidence contract easy to audit.

## Maintenance rule

Keep the stable service barrel thin, keep evidence parsing in the shared helper, and keep readiness logic, message builders, and profile assembly in separate modules.
