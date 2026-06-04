# v715 Controlled read-only shard preview mini-kv target checklist

v715 records the mini-kv target checklist.

The section maps to `MINI_KV_READ_TARGET_SPEC` and keeps mini-kv to read commands only.

Cross-project status: mini-kv can continue in parallel by keeping command ownership and cleanup explicit.

Verification: covered by the runbook package focused test.
