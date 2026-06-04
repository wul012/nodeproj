# v739 Controlled read-only shard preview rehearsal forbidden operation check

v739 adds the forbidden operation check.

It records `REHEARSAL_FORBIDDEN_OPERATION_CHECK`, mapping to `FORBIDDEN_OPERATION_CHECKLIST`. The step keeps LOAD, RESTORE, COMPACT, write routing, and sibling mutation outside the rehearsal scope.

Cross-project status: Java and mini-kv can proceed in parallel because Node is not asking them to run forbidden-operation probes.

Verification: covered by the v732-v751 rehearsal packet focused test and final batch validation.
