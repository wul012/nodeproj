# v828 Controlled read-only shard preview evidence intake review package write block

v828 adds `INTAKE_REVIEW_WRITE_BLOCK`.

The control verifies that writes remain blocked across the review package and source ledger. Write routing is not promoted by this chain.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by the v812-v836 evidence intake review package focused test and final batch validation.
