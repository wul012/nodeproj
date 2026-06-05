# v783 Controlled read-only shard preview evidence packet mini-kv acceptance rule

v783 adds `EVIDENCE_MINI_KV_ACCEPTANCE_RULE`.

The record requires mini-kv evidence status, command, and failure class. The command remains `SHARDJSON`.

Cross-project status: mini-kv can continue in parallel.

Verification: covered by the v772-v791 evidence packet focused test and final batch validation.
