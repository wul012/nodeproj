# Node v805 code walkthrough: evidence intake ledger sibling cleanup entry

v805 adds sibling cleanup intake.

`INTAKE_SIBLING_CLEANUP_ENTRY` maps to `EVIDENCE_SIBLING_CLEANUP_RECORD` and preserves Java/mini-kv cleanup ownership without letting Node own sibling lifecycle.

Verification: covered by the evidence intake ledger focused test.
