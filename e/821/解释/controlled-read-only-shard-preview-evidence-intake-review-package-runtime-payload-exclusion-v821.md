# v821 Controlled read-only shard preview evidence intake review package runtime payload exclusion

v821 adds `INTAKE_REVIEW_RUNTIME_PAYLOAD_EXCLUSION`.

The control verifies that runtime payload import remains false. A future importer must be explicit; this review package cannot smuggle captured runtime data into the archive.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by the v812-v836 evidence intake review package focused test and final batch validation.
