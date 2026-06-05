# Node v794 code walkthrough: evidence intake ledger Node health entry

v794 adds Node health intake.

`INTAKE_NODE_HEALTH_ENTRY` maps to `EVIDENCE_NODE_HEALTH_RECORD`, preserving status, header-name, latency, and summary fields. Header values remain excluded.

Verification: covered by the evidence intake ledger focused test.
