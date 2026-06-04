# v702 Controlled read-only shard preview window archive snapshot

v702 records the archive snapshot stage.

The stage is `WINDOW_ARCHIVE_SNAPSHOT`: a future live read-only window archive must record the ledger digest and target sections without secrets or runtime payloads.

Cross-project status: Java and mini-kv are recommended parallel work.

Verification: covered by focused stage ledger tests.
