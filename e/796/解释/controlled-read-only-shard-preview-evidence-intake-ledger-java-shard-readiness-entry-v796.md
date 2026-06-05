# v796 Controlled read-only shard preview evidence intake ledger Java shard readiness entry

v796 adds `INTAKE_JAVA_SHARD_READINESS_ENTRY`.

The entry maps to `EVIDENCE_JAVA_SHARD_READINESS_RECORD` and preserves Java status code, shard count, slot count, and routing mode fields. This version does not start Java; it only defines how an operator-provided read-only Java result must be recorded or triaged later.

Cross-project status: Java can continue in parallel and owns its service lifecycle. mini-kv can continue in parallel as well.

Verification: covered by the v792-v811 evidence intake ledger focused test and final batch validation.
