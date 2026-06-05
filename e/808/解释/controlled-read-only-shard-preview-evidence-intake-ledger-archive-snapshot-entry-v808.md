# v808 Controlled read-only shard preview evidence intake ledger archive snapshot entry

v808 adds `INTAKE_ARCHIVE_SNAPSHOT_ENTRY`.

The entry maps to `EVIDENCE_ARCHIVE_SNAPSHOT_RECORD`. It preserves archive snapshot digest, record count, and cleanup record count so archive intake can be checked against the packet rather than hand-counted later.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by the v792-v811 evidence intake ledger focused test and final batch validation.
