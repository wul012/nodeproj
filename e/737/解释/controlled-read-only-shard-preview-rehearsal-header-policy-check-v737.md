# v737 Controlled read-only shard preview rehearsal header policy check

v737 adds a rehearsal header policy check.

It records `REHEARSAL_HEADER_POLICY_CHECK`, mapping to `OPERATOR_HEADER_POLICY`. The rehearsal packet checks header names and policy boundaries without storing secret values and without opening guarded routes.

Cross-project status: this remains Node-owned. Java and mini-kv are not blocked.

Verification: covered by the v732-v751 rehearsal packet focused test and final batch validation.
