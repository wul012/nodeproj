# v741 Controlled read-only shard preview rehearsal cleanup slot dry run

v741 reserves cleanup slots for the future manual rehearsal.

It records `REHEARSAL_CLEANUP_SLOT_DRY_RUN`, mapping to `CLEANUP_RECORD_SCHEMA`. The step is cleanup-required, but it does not start a process in this version; it only ensures the future record has a place to prove cleanup.

Cross-project status: Java and mini-kv remain parallel. Node is not taking ownership of their service lifecycles.

Verification: covered by the v732-v751 rehearsal packet focused test and final batch validation.
