# Node v797 code walkthrough: evidence intake ledger mini-kv SHARDJSON entry

v797 adds mini-kv SHARDJSON intake.

`INTAKE_MINI_KV_SHARDJSON_ENTRY` maps to `EVIDENCE_MINI_KV_SHARDJSON_RECORD`, preserving the command, shard map count, slot count, and routing mode fields while rejecting non-`SHARDJSON` intake.

Verification: covered by the evidence intake ledger focused test.
