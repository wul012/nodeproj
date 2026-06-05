# v810 Controlled read-only shard preview evidence intake ledger go/no-go receipt entry

v810 adds `INTAKE_GO_NO_GO_RECEIPT_ENTRY`.

The entry maps to `EVIDENCE_GO_NO_GO_RECEIPT_RECORD`. It preserves manual decision, decision scope, and production execution flag, and rejects any receipt that allows production execution.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by the v792-v811 evidence intake ledger focused test and final batch validation.
