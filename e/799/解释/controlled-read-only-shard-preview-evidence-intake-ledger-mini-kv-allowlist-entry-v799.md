# v799 Controlled read-only shard preview evidence intake ledger mini-kv allowlist entry

v799 adds `INTAKE_MINI_KV_ALLOWLIST_ENTRY`.

The entry maps to `EVIDENCE_MINI_KV_ALLOWLIST_RECORD`. It preserves the allowed command, forbidden command count, and allowlist decision fields. Intake remains blocked if mutating commands appear in the evidence input.

Cross-project status: mini-kv can continue in parallel. Node does not mutate mini-kv state.

Verification: covered by the v792-v811 evidence intake ledger focused test and final batch validation.
