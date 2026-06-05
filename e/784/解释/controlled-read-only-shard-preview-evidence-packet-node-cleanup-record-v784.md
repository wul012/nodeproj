# v784 Controlled read-only shard preview evidence packet Node cleanup record

v784 adds `EVIDENCE_NODE_CLEANUP_RECORD`.

The record requires process owner, PID if operator-started, and close result. This version starts no process; it only defines future cleanup proof.

Cross-project status: Java and mini-kv are not blocked.

Verification: covered by the v772-v791 evidence packet focused test and final batch validation.
