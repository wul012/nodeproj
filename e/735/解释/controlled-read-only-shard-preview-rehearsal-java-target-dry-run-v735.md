# v735 Controlled read-only shard preview rehearsal Java target dry run

v735 adds the Java read target dry run to the rehearsal packet.

It records `REHEARSAL_JAVA_TARGET_DRY_RUN`, mapping to `JAVA_TARGET_CHECKLIST`. Node records the intended Java GET target order for operator review, but does not start Java and does not require fresh Java evidence in this version.

Cross-project status: Java can continue its own work in parallel. Node is only preserving the manual target checklist.

Verification: covered by the v732-v751 rehearsal packet focused test and final batch validation.
