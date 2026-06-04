# v753 Controlled read-only shard preview command worksheet environment lock check

v753 adds the environment lock check.

It records `WORKSHEET_ENVIRONMENT_LOCK_CHECK`, requiring `UPSTREAM_PROBES_ENABLED=true` and `UPSTREAM_ACTIONS_ENABLED=false` before a later manual read-only command review. The step remains a worksheet entry and does not open a live window.

Cross-project status: Java and mini-kv can prepare their own readiness work independently.

Verification: covered by the v752-v771 command worksheet focused test and final batch validation.
