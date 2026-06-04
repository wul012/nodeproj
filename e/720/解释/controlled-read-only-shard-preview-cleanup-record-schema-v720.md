# v720 Controlled read-only shard preview cleanup record schema

v720 records the cleanup schema section.

Every owned process in a future window must have `stopped=true` or a concrete cleanup blocker.

Cross-project status: Java and mini-kv can continue in parallel by providing cleanup record fields.

Verification: covered by the runbook package focused test.
