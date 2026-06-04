# v734 Controlled read-only shard preview rehearsal Node target dry run

v734 adds the Node read target dry run.

It records `REHEARSAL_NODE_TARGET_DRY_RUN`, mapping to `NODE_TARGET_CHECKLIST`. The target order can be reviewed before a live window, but the packet still reports `startsServices=false` and `executionAllowed=false`.

Cross-project status: Java and mini-kv are not blocked by this Node-local target review.

Verification: covered by the v732-v751 rehearsal packet focused test and final batch validation.
