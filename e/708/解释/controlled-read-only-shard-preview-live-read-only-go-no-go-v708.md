# v708 Controlled read-only shard preview live read-only go/no-go

v708 records the go/no-go stage.

The stage is `LIVE_READ_ONLY_GO_NO_GO`: approval is only for a manual live read-only window. Production execution remains false.

Cross-project status: Java and mini-kv can continue in parallel and do not need to wait for a write approval path.

Verification: covered by focused stage ledger tests.
