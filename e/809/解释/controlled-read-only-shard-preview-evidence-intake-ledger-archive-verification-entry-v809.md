# v809 Controlled read-only shard preview evidence intake ledger archive verification entry

v809 adds `INTAKE_ARCHIVE_VERIFICATION_ENTRY`.

The entry maps to `EVIDENCE_ARCHIVE_VERIFICATION_RECORD` and preserves archive verification digest, passed gate count, and blocked reason fields. Release remains blocked if the archive verification digest is missing.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by the v792-v811 evidence intake ledger focused test and final batch validation.
