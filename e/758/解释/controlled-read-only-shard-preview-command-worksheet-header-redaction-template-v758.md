# v758 Controlled read-only shard preview command worksheet header redaction template

v758 adds the header redaction template.

It records `WORKSHEET_HEADER_REDACTION_TEMPLATE`, which allows header names to be recorded while all header values stay redacted. The worksheet reports `containsSecretValue=false`.

Cross-project status: Java and mini-kv are not blocked.

Verification: covered by the v752-v771 command worksheet focused test and final batch validation.
