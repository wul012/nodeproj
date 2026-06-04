# v763 Controlled read-only shard preview command worksheet mini-kv evidence capture

v763 adds the mini-kv evidence capture slot.

It records `WORKSHEET_EVIDENCE_CAPTURE_MINI_KV`, defining the bounded fields for command result and shard map summary. The worksheet does not connect to mini-kv.

Cross-project status: mini-kv can continue independently.

Verification: covered by the v752-v771 command worksheet focused test and final batch validation.
