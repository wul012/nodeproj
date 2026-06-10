# Code walkthrough - Node v1907

## Focus

Move the Java v121 implementation-plan echo reference builder into References.

## Code reading notes

- Java v121 evidence files and snippet expectations are grouped together.
- That keeps echo-documentation checks easy to scan.
- The Java evidence remains read-only input, not implementation permission.

## Maintenance rule

Keep the stable service barrel thin, keep evidence references in References, keep boolean gates and messages in Checks, and keep digest/profile assembly in Core.
