# v749 Controlled read-only shard preview rehearsal receipt archive boundary check

v749 checks the receipt archive boundary.

It records `REHEARSAL_RECEIPT_ARCHIVE_BOUNDARY_CHECK`, mapping to `RECEIPT_ARCHIVE_BOUNDARY`. The step keeps future receipt archive records separate from source package, evidence, cleanup, and go/no-go records.

Cross-project status: no fresh sibling evidence is required.

Verification: covered by the v732-v751 rehearsal packet focused test and final batch validation.
