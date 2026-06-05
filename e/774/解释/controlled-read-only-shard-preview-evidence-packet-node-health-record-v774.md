# v774 Controlled read-only shard preview evidence packet Node health record

v774 adds `EVIDENCE_NODE_HEALTH_RECORD`.

The pending record defines status code, header names, latency, and health summary fields. Header values and runtime internals remain excluded.

Cross-project status: this is Node-owned and does not block Java or mini-kv.

Verification: covered by the v772-v791 evidence packet focused test and final batch validation.
