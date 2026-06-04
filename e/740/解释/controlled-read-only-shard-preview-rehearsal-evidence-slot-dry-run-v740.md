# v740 Controlled read-only shard preview rehearsal evidence slot dry run

v740 reserves evidence slots for the future manual rehearsal.

It records `REHEARSAL_EVIDENCE_SLOT_DRY_RUN`, mapping to `EVIDENCE_RECORD_SCHEMA`. The packet verifies that every rehearsal step has a unique evidence slot before any live evidence is collected.

Cross-project status: no fresh Java or mini-kv evidence is required. This version prepares the Node archive contract.

Verification: covered by the v732-v751 rehearsal packet focused test and final batch validation.
