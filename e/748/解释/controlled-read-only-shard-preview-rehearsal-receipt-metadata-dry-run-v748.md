# v748 Controlled read-only shard preview rehearsal receipt metadata dry run

v748 dry-runs receipt metadata.

It records `REHEARSAL_RECEIPT_METADATA_DRY_RUN`, mapping to `SUMMARY_RECEIPT_METADATA`. The packet preserves metadata boundaries for future operator review without treating this version as a live execution receipt.

Cross-project status: Java and mini-kv are not blocked.

Verification: covered by the v732-v751 rehearsal packet focused test and final batch validation.
