# v788 Controlled read-only shard preview evidence packet archive snapshot record

v788 adds `EVIDENCE_ARCHIVE_SNAPSHOT_RECORD`.

The record requires archive snapshot digest, record count, and cleanup record count. Runtime payload remains excluded from the pending packet.

Cross-project status: no fresh Java or mini-kv evidence is required.

Verification: covered by the v772-v791 evidence packet focused test and final batch validation.
