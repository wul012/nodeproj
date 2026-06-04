# v695 Controlled read-only shard preview mini-kv read target spec

v695 records the mini-kv read target stage for the future manual live read-only window.

The stage is `MINI_KV_READ_TARGET_SPEC`: mini-kv contributes `SHARDJSON` and `SHARDROUTEVERIFYREPORTJSON`. Write/admin commands remain forbidden.

Cross-project status: mini-kv can continue in parallel by keeping read-only TCP command ownership explicit.

Verification: covered by focused stage ledger tests.
