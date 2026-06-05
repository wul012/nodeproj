# Node v804 code walkthrough: evidence intake ledger Node cleanup entry

v804 adds Node cleanup intake.

`INTAKE_NODE_CLEANUP_ENTRY` maps to `EVIDENCE_NODE_CLEANUP_RECORD` and preserves process owner, PID-if-started, and close result fields.

Verification: covered by the evidence intake ledger focused test.
