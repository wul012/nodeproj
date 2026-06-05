# v827 Controlled read-only shard preview evidence intake review package read-only boundary

v827 adds `INTAKE_REVIEW_READ_ONLY_BOUNDARY`.

The control verifies that all review controls and ledger entries remain read-only. It blocks any path that tries to use the package as execution authorization.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by the v812-v836 evidence intake review package focused test and final batch validation.
