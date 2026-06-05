# v824 Controlled read-only shard preview evidence intake review package cleanup coverage

v824 adds `INTAKE_REVIEW_CLEANUP_COVERAGE`.

The control verifies that cleanup coverage remains present before operator review. Cleanup ownership remains visible even though no service is started in this version.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by the v812-v836 evidence intake review package focused test and final batch validation.
