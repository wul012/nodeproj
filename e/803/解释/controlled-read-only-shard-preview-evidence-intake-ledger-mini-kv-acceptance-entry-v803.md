# v803 Controlled read-only shard preview evidence intake ledger mini-kv acceptance entry

v803 adds `INTAKE_MINI_KV_ACCEPTANCE_ENTRY`.

The entry maps to `EVIDENCE_MINI_KV_ACCEPTANCE_RULE`. It preserves mini-kv evidence status, command, and failure class requirements and rejects intake when the command is not `SHARDJSON`.

Cross-project status: mini-kv can continue in parallel; Node does not execute mini-kv commands here.

Verification: covered by the v792-v811 evidence intake ledger focused test and final batch validation.
