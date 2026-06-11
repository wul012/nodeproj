# Node v800 code walkthrough: evidence intake ledger forbidden operation entry

v800 adds forbidden-operation intake.

`INTAKE_FORBIDDEN_OPERATION_ENTRY` maps to `EVIDENCE_FORBIDDEN_OPERATION_RECORD`, preserving write-routing, LOAD/RESTORE/COMPACT, and sibling mutation flags.

Verification: covered by the evidence intake ledger focused test.
