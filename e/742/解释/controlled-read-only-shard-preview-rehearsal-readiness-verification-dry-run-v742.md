# v742 Controlled read-only shard preview rehearsal readiness verification dry run

v742 adds readiness verification for the rehearsal packet.

It records `REHEARSAL_READINESS_VERIFICATION_DRY_RUN`, mapping to `WINDOW_READINESS_CHECKLIST`. The step checks the packet gates before a live window and keeps `readyForLiveExecution=false`.

Cross-project status: Java and mini-kv do not wait on this gate because it only verifies Node's rehearsal packet.

Verification: covered by the v732-v751 rehearsal packet focused test and final batch validation.
