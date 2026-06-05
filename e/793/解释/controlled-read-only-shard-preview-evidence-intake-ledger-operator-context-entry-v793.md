# v793 Controlled read-only shard preview evidence intake ledger operator context entry

v793 adds `INTAKE_OPERATOR_CONTEXT_ENTRY`.

The entry maps to `EVIDENCE_OPERATOR_CONTEXT_RECORD` and requires operator role, approval reference, probe/action flags, and read-only environment context to be entered manually. The ledger preserves the original no-credential redaction policy and blocks intake if the approval reference or action-disabled boundary is missing.

Cross-project status: Java and mini-kv can continue in parallel. This Node version records the intake contract only.

Verification: covered by the v792-v811 evidence intake ledger focused test and final batch validation.
