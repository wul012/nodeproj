# v759 Controlled read-only shard preview command worksheet mini-kv allowlist template

v759 adds the mini-kv allowlist template.

It records `WORKSHEET_MINI_KV_ALLOWLIST_TEMPLATE`, confirming the manual window only allows the read-only `SHARDJSON` command shape. Mutating commands remain outside scope.

Cross-project status: mini-kv can continue in parallel; Node is only preserving the review contract.

Verification: covered by the v752-v771 command worksheet focused test and final batch validation.
