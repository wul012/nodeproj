# v700 Controlled read-only shard preview operator runbook

v700 records the operator runbook stage.

The stage is `OPERATOR_RUNBOOK`: ordered reads, headers, commands, and cleanup must be available before the future live read-only window.

Cross-project status: Java and mini-kv can continue in parallel and only need to supply their read-only target ownership.

Verification: covered by focused stage ledger tests.
