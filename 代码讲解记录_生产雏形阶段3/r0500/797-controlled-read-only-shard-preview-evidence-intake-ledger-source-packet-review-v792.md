# Node v792 code walkthrough: evidence intake ledger source packet review

v792 starts the evidence intake ledger chain.

`INTAKE_SOURCE_WORKSHEET_REVIEW` maps to `EVIDENCE_SOURCE_WORKSHEET_CHECK` and preserves required fields, acceptance criteria, and redaction rules from the v791 packet. The builder leaves the entry `awaiting-manual-entry` and keeps runtime payload import disabled.

Verification: covered by the evidence intake ledger focused test.
