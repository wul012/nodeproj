# v800 Controlled read-only shard preview evidence intake ledger forbidden operation entry

v800 adds `INTAKE_FORBIDDEN_OPERATION_ENTRY`.

The entry maps to `EVIDENCE_FORBIDDEN_OPERATION_RECORD` and preserves write-routing, LOAD/RESTORE/COMPACT, and sibling mutation flags. The ledger rejects any intake where those forbidden operation flags are true.

Cross-project status: Java and mini-kv can continue in parallel; this version adds no service start, stop, write, or routing activation.

Verification: covered by the v792-v811 evidence intake ledger focused test and final batch validation.
