# v757 Controlled read-only shard preview command worksheet mini-kv SHARDJSON template

v757 adds the mini-kv `SHARDJSON` command template.

It records `WORKSHEET_MINI_KV_SHARDJSON_TEMPLATE`, scoped to an operator-started mini-kv TCP endpoint. The worksheet confirms the command remains read-only and excludes LOAD, RESTORE, and COMPACT.

Cross-project status: mini-kv can continue independently. Node is not starting or mutating mini-kv.

Verification: covered by the v752-v771 command worksheet focused test and final batch validation.
