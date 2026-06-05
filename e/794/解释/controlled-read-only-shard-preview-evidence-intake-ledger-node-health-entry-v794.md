# v794 Controlled read-only shard preview evidence intake ledger Node health entry

v794 adds `INTAKE_NODE_HEALTH_ENTRY`.

The entry maps to `EVIDENCE_NODE_HEALTH_RECORD`. It requires Node health status, redacted header names, latency, and health summary, while preserving the rule that header values and response internals must not be archived. Missing Node health evidence remains triage input; it is not silently accepted.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by the v792-v811 evidence intake ledger focused test and final batch validation.
