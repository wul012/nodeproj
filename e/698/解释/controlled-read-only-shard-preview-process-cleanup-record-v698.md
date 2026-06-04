# v698 Controlled read-only shard preview process cleanup record

v698 records the cleanup stage.

The stage is `PROCESS_CLEANUP_RECORD`: every process started for a future live read-only window must have an explicit cleanup outcome. This version starts no process itself.

Cross-project status: Java and mini-kv can continue in parallel by defining their cleanup evidence shape.

Verification: covered by focused stage ledger tests.
