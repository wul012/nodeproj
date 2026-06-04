# v733 Controlled read-only shard preview rehearsal owner dry run

v733 turns owner binding into a rehearsal-only checklist step.

It records `REHEARSAL_OWNER_DRY_RUN`, mapping back to `OWNER_BINDING_CHECKLIST`. The step checks owner ids, port ownership, PID policy, and cleanup ownership without opening a live window. It is marked cleanup-required because a later real rehearsal must prove who owns any process it starts.

Cross-project status: Java and mini-kv can prepare matching owner records in parallel. Node remains a planning consumer, not a service starter.

Verification: covered by the v732-v751 rehearsal packet focused test and final batch validation.
