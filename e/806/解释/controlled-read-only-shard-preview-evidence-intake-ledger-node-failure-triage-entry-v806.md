# v806 Controlled read-only shard preview evidence intake ledger Node failure triage entry

v806 adds `INTAKE_NODE_FAILURE_TRIAGE_ENTRY`.

The entry maps to `EVIDENCE_NODE_FAILURE_TRIAGE_RECORD`. It preserves Node failure class, retry decision, and stop decision fields while rejecting any retry path that would require a write or service mutation.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by the v792-v811 evidence intake ledger focused test and final batch validation.
