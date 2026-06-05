# v826 Controlled read-only shard preview evidence intake review package secret exclusion

v826 adds `INTAKE_REVIEW_SECRET_EXCLUSION`.

The control verifies that no secret values are present in the review package or source ledger. This keeps archive-safe evidence review separate from credential handling.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by the v812-v836 evidence intake review package focused test and final batch validation.
