# v797 Controlled read-only shard preview evidence intake ledger mini-kv SHARDJSON entry

v797 adds `INTAKE_MINI_KV_SHARDJSON_ENTRY`.

The entry maps to `EVIDENCE_MINI_KV_SHARDJSON_RECORD`. It keeps the command allowlist narrow by requiring `SHARDJSON`, shard map count, slot count, and routing mode; any mutating mini-kv command remains rejected by the intake policy.

Cross-project status: mini-kv can continue in parallel and owns its TCP service lifecycle. Node does not send any command in this version.

Verification: covered by the v792-v811 evidence intake ledger focused test and final batch validation.
