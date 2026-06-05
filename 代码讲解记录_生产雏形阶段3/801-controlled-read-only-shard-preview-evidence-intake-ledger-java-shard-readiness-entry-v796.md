# Node v796 code walkthrough: evidence intake ledger Java shard readiness entry

v796 adds Java shard readiness intake.

`INTAKE_JAVA_SHARD_READINESS_ENTRY` maps to `EVIDENCE_JAVA_SHARD_READINESS_RECORD`. Node does not start Java; it only defines the manual intake fields and missing-input policy.

Verification: covered by the evidence intake ledger focused test.
