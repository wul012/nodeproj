# v820 Controlled read-only shard preview evidence intake review package manual input state

v820 adds `INTAKE_REVIEW_MANUAL_INPUT_STATE`.

The control verifies that every intake control remains `awaiting-operator-review` and every ledger entry remains manual-input only. It does not approve manual evidence entry yet.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by the v812-v836 evidence intake review package focused test and final batch validation.
