# v744 Controlled read-only shard preview rehearsal alignment verification

v744 verifies every rehearsal step maps back to a runbook section.

It records `REHEARSAL_ALIGNMENT_VERIFICATION`, mapping to `RUNBOOK_ALIGNMENT_CHECK`. The gate prevents a rehearsal-only chain from drifting away from the v731 operator runbook package.

Cross-project status: Java and mini-kv are not blocked. This is a Node catalog and archive integrity step.

Verification: covered by the v732-v751 rehearsal packet focused test and final batch validation.
