# v804 Controlled read-only shard preview evidence intake ledger Node cleanup entry

v804 adds `INTAKE_NODE_CLEANUP_ENTRY`.

The entry maps to `EVIDENCE_NODE_CLEANUP_RECORD` and preserves Node process owner, PID-if-started, and close result fields. This prepares cleanup accounting for a future manual window while keeping the current version non-executing.

Cross-project status: Java and mini-kv can continue in parallel. Node cleanup only concerns Node-owned operator processes.

Verification: covered by the v792-v811 evidence intake ledger focused test and final batch validation.
