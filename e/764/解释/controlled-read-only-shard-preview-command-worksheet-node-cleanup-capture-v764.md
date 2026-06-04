# v764 Controlled read-only shard preview command worksheet Node cleanup capture

v764 adds the Node cleanup capture slot.

It records `WORKSHEET_CLEANUP_CAPTURE_NODE`, a slot for any future operator-started Node process and its close result. This version starts no process; it only requires the future record to prove cleanup.

Cross-project status: Java and mini-kv are not blocked.

Verification: covered by the v752-v771 command worksheet focused test and final batch validation.
