# v807 Controlled read-only shard preview evidence intake ledger sibling failure triage entry

v807 adds `INTAKE_SIBLING_FAILURE_TRIAGE_ENTRY`.

The entry maps to `EVIDENCE_SIBLING_FAILURE_TRIAGE_RECORD` and preserves sibling failure class, retry decision, and stop decision fields. The ledger keeps upstream actions disabled and rejects retry decisions that would require mutation.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by the v792-v811 evidence intake ledger focused test and final batch validation.
