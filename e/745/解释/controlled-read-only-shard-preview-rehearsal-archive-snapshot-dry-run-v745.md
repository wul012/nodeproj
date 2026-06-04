# v745 Controlled read-only shard preview rehearsal archive snapshot dry run

v745 dry-runs archive snapshot inputs.

It records `REHEARSAL_ARCHIVE_SNAPSHOT_DRY_RUN`, mapping to `ARCHIVE_SNAPSHOT_INPUTS`. The step defines what the future manual rehearsal should archive without writing live evidence in this version.

Cross-project status: no Java or mini-kv output is requested. This remains a Node-side archive preparation step.

Verification: covered by the v732-v751 rehearsal packet focused test and final batch validation.
