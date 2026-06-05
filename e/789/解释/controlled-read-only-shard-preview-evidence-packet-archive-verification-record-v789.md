# v789 Controlled read-only shard preview evidence packet archive verification record

v789 adds `EVIDENCE_ARCHIVE_VERIFICATION_RECORD`.

The record requires archive verification digest, passed gate count, and blocked reasons. The packet prepares verification shape before live capture.

Cross-project status: Java and mini-kv are not blocked.

Verification: covered by the v772-v791 evidence packet focused test and final batch validation.
