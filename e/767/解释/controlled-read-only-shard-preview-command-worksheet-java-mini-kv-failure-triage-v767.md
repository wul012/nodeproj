# v767 Controlled read-only shard preview command worksheet Java and mini-kv failure triage

v767 adds Java and mini-kv failure triage.

It records `WORKSHEET_FAILURE_TRIAGE_JAVA_MINI_KV`, classifying sibling read failures without enabling write actions. It keeps retry and stop decisions scoped to read-only review.

Cross-project status: Java and mini-kv can continue independently; Node is only documenting the future triage shape.

Verification: covered by the v752-v771 command worksheet focused test and final batch validation.
