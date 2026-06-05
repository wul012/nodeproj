# v781 Controlled read-only shard preview evidence packet Node acceptance rule

v781 adds `EVIDENCE_NODE_ACCEPTANCE_RULE`.

The record defines how Node evidence becomes accepted or triaged. It expects a digest and failure class, not raw runtime payload.

Cross-project status: Java and mini-kv can continue independently.

Verification: covered by the v772-v791 evidence packet focused test and final batch validation.
