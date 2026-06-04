# v761 Controlled read-only shard preview command worksheet Node evidence capture

v761 adds the Node evidence capture slot.

It records `WORKSHEET_EVIDENCE_CAPTURE_NODE`, which defines the bounded fields for Node status, route status, and digest summary. It prepares the evidence shape without collecting live evidence in this version.

Cross-project status: Java and mini-kv continue in parallel.

Verification: covered by the v752-v771 command worksheet focused test and final batch validation.
