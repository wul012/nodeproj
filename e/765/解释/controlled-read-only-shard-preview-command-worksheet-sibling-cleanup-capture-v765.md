# v765 Controlled read-only shard preview command worksheet sibling cleanup capture

v765 adds the sibling cleanup capture slot.

It records `WORKSHEET_CLEANUP_CAPTURE_SIBLING`, a slot for operator-started Java and mini-kv process cleanup results. The field explicitly preserves that Node does not own those sibling lifecycles.

Cross-project status: Java and mini-kv can continue in parallel and keep their own cleanup ownership.

Verification: covered by the v752-v771 command worksheet focused test and final batch validation.
