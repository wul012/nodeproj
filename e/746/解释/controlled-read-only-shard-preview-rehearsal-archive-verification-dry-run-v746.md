# v746 Controlled read-only shard preview rehearsal archive verification dry run

v746 dry-runs archive verification inputs.

It records `REHEARSAL_ARCHIVE_VERIFICATION_DRY_RUN`, mapping to `ARCHIVE_VERIFICATION_INPUTS`. The step keeps the future archive verification explicit before any live read-only result is collected.

Cross-project status: Java and mini-kv can continue independently. Node is only preparing archive verification boundaries.

Verification: covered by the v732-v751 rehearsal packet focused test and final batch validation.
