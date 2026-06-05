# v777 Controlled read-only shard preview evidence packet mini-kv SHARDJSON record

v777 adds `EVIDENCE_MINI_KV_SHARDJSON_RECORD`.

The pending record defines command name, shard map count, slot count, and routing mode. LOAD, RESTORE, and COMPACT remain forbidden.

Cross-project status: mini-kv can continue independently; Node is not starting mini-kv.

Verification: covered by the v772-v791 evidence packet focused test and final batch validation.
