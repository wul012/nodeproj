# v732 Controlled read-only shard preview rehearsal source package precheck

v732 starts the manual rehearsal packet by consuming the v731 runbook package closeout.

It records `REHEARSAL_SOURCE_PACKAGE_PRECHECK`, which checks that the source runbook package is ready before any live read-only rehearsal can be considered. The step only reads the v731 package digest and readiness state; it starts no service, writes no sibling state, and keeps live execution disabled.

Cross-project status: Java and mini-kv can continue in parallel. Node does not need fresh upstream evidence for this version.

Verification: covered by the v732-v751 rehearsal packet focused test and final batch validation.
