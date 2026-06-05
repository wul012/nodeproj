# v780 Controlled read-only shard preview evidence packet forbidden operation record

v780 adds `EVIDENCE_FORBIDDEN_OPERATION_RECORD`.

The record requires flags for write routing, LOAD/RESTORE/COMPACT attempts, and sibling mutation attempts. Future capture must keep them false.

Cross-project status: Java and mini-kv are not asked to run new probes here.

Verification: covered by the v772-v791 evidence packet focused test and final batch validation.
