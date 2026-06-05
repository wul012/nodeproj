# v829 Controlled read-only shard preview evidence intake review package service start block

v829 adds `INTAKE_REVIEW_SERVICE_START_BLOCK`.

The control verifies that automatic service start remains blocked. Node does not start Java, mini-kv, or any runtime helper as part of this review package.

Cross-project status: Java and mini-kv can continue in parallel and own their service lifecycle.

Verification: covered by the v812-v836 evidence intake review package focused test and final batch validation.
