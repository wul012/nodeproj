# v779 Controlled read-only shard preview evidence packet mini-kv allowlist record

v779 adds `EVIDENCE_MINI_KV_ALLOWLIST_RECORD`.

The record requires allowed command, forbidden command count, and allowlist decision. Mutating commands remain outside the evidence packet.

Cross-project status: mini-kv can continue in parallel.

Verification: covered by the v772-v791 evidence packet focused test and final batch validation.
