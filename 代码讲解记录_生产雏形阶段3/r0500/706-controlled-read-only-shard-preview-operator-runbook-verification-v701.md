# Node v701 code walkthrough: operator runbook verification

`OPERATOR_RUNBOOK_VERIFICATION` records the future runbook alignment check.

The stage exists so the next live read-only window can fail closed if target order, forbidden operations, or cleanup drift.

Focused tests verify the stage ledger digest covers ordered stage metadata.
