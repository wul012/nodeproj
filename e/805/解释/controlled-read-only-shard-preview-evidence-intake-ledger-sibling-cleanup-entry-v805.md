# v805 Controlled read-only shard preview evidence intake ledger sibling cleanup entry

v805 adds `INTAKE_SIBLING_CLEANUP_ENTRY`.

The entry maps to `EVIDENCE_SIBLING_CLEANUP_RECORD` and preserves Java cleanup owner, mini-kv cleanup owner, and sibling close result fields. It records ownership boundaries so Node does not accidentally claim control over sibling service lifecycle.

Cross-project status: Java and mini-kv can continue in parallel and keep their own cleanup rules.

Verification: covered by the v792-v811 evidence intake ledger focused test and final batch validation.
