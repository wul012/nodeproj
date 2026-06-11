# Node v776 code walkthrough: evidence packet Java shard readiness record

v776 adds the pending Java readiness evidence record.

`EVIDENCE_JAVA_SHARD_READINESS_RECORD` targets `java-http` and requires status code, shard count, slot count, and routing mode. Node does not start Java.

Verification: covered by the evidence packet focused test.
