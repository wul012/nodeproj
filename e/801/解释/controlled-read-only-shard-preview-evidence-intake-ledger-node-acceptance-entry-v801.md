# v801 Controlled read-only shard preview evidence intake ledger Node acceptance entry

v801 adds `INTAKE_NODE_ACCEPTANCE_ENTRY`.

The entry maps to `EVIDENCE_NODE_ACCEPTANCE_RULE`. It preserves Node evidence status, digest, and failure class requirements so Node evidence can be accepted or explicitly triaged without pretending that live capture has already happened.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by the v792-v811 evidence intake ledger focused test and final batch validation.
