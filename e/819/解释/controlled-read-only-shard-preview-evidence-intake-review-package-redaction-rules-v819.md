# v819 Controlled read-only shard preview evidence intake review package redaction rules

v819 adds `INTAKE_REVIEW_REDACTION_RULES_PRESERVED`.

The control verifies that redaction rules remain present before manual evidence entry. This keeps secret exclusion visible before any operator-entered data exists.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by the v812-v836 evidence intake review package focused test and final batch validation.
