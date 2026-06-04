# v704 Controlled read-only shard preview window archive summary

v704 records the archive summary stage.

The stage is `WINDOW_ARCHIVE_SUMMARY`: handoff should use compact pass/blocker summary lines instead of duplicating full evidence.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by focused stage ledger tests.
