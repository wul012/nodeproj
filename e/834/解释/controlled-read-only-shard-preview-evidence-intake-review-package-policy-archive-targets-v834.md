# v834 Controlled read-only shard preview evidence intake review package policy archive targets

v834 adds `INTAKE_REVIEW_POLICY_ARCHIVE_TARGETS`.

The control groups policy and archive intake records so later manual-entry or archive review can consume one bounded policy/archive slice instead of scanning every ledger entry.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by the v812-v836 evidence intake review package focused test and final batch validation.
