# v802 Controlled read-only shard preview evidence intake ledger Java acceptance entry

v802 adds `INTAKE_JAVA_ACCEPTANCE_ENTRY`.

The entry maps to `EVIDENCE_JAVA_ACCEPTANCE_RULE`. It preserves Java evidence status, read-only status, and failure class requirements. If Java evidence is absent or not explicitly read-only, intake remains pending or blocked by policy rather than accepted.

Cross-project status: Java can continue in parallel; Node does not require fresh Java evidence in this version.

Verification: covered by the v792-v811 evidence intake ledger focused test and final batch validation.
