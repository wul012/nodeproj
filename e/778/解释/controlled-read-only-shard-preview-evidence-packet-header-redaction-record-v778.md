# v778 Controlled read-only shard preview evidence packet header redaction record

v778 adds `EVIDENCE_HEADER_REDACTION_RECORD`.

The record requires header name count, redacted value count, and redaction policy. The packet keeps `containsSecretValue=false`.

Cross-project status: Java and mini-kv are not blocked.

Verification: covered by the v772-v791 evidence packet focused test and final batch validation.
