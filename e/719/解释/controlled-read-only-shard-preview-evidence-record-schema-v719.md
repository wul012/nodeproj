# v719 Controlled read-only shard preview evidence record schema

v719 records the evidence schema section.

Future window evidence must include request or command, owner, digest, result status, and read-only flag.

Cross-project status: Java and mini-kv may mirror the schema in parallel.

Verification: covered by the runbook package focused test.
