# v817 Controlled read-only shard preview evidence intake review package required fields

v817 adds `INTAKE_REVIEW_REQUIRED_FIELDS_PRESERVED`.

The control verifies that required fields from the v811 ledger are preserved. It blocks review if a required field is dropped before operator intake.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by the v812-v836 evidence intake review package focused test and final batch validation.
