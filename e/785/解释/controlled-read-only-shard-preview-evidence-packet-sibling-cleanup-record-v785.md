# v785 Controlled read-only shard preview evidence packet sibling cleanup record

v785 adds `EVIDENCE_SIBLING_CLEANUP_RECORD`.

The record requires Java cleanup owner, mini-kv cleanup owner, and sibling close result. It preserves that Node does not own sibling lifecycles.

Cross-project status: Java and mini-kv can continue independently.

Verification: covered by the v772-v791 evidence packet focused test and final batch validation.
