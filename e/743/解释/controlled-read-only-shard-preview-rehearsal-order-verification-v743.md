# v743 Controlled read-only shard preview rehearsal order verification

v743 verifies rehearsal order.

It records `REHEARSAL_ORDER_VERIFICATION`, mapping to `OPERATOR_RUNBOOK_ORDER`. The packet enforces Node v732-v751 order so archive reviewers can see the same progression as the code and tag sequence.

Cross-project status: no fresh sibling evidence is needed. Java and mini-kv can continue in parallel.

Verification: covered by the v732-v751 rehearsal packet focused test and final batch validation.
