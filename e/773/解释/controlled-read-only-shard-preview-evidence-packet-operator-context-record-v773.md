# v773 Controlled read-only shard preview evidence packet operator context record

v773 adds `EVIDENCE_OPERATOR_CONTEXT_RECORD`.

The record requires operator role, approval reference, and read-only environment flags. It stores no credential values and does not authorize execution.

Cross-project status: Java and mini-kv can continue independently.

Verification: covered by the v772-v791 evidence packet focused test and final batch validation.
