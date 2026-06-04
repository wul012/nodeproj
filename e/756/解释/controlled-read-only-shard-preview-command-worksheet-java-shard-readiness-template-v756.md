# v756 Controlled read-only shard preview command worksheet Java shard readiness template

v756 adds the Java shard readiness command template.

It records `WORKSHEET_JAVA_SHARD_READINESS_TEMPLATE`, a manual `GET /api/v1/ops/shard-readiness` against an operator-started Java service. Node does not start Java and does not require new Java evidence in this version.

Cross-project status: Java can continue independently and only needs to preserve its read-only readiness surface.

Verification: covered by the v752-v771 command worksheet focused test and final batch validation.
