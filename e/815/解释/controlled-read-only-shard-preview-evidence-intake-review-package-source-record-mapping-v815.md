# v815 Controlled read-only shard preview evidence intake review package source record mapping

v815 adds `INTAKE_REVIEW_SOURCE_RECORD_MAPPING`.

The control checks that every intake ledger entry still maps back to a v791 evidence packet record. Missing mapping blocks operator intake review instead of being patched by ad hoc manual entry.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by the v812-v836 evidence intake review package focused test and final batch validation.
