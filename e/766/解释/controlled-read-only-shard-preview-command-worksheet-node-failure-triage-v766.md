# v766 Controlled read-only shard preview command worksheet Node failure triage

v766 adds Node failure triage.

It records `WORKSHEET_FAILURE_TRIAGE_NODE`, classifying Node route, header, and Markdown failures before any retry. The worksheet requires a read-only retry or stop decision.

Cross-project status: Java and mini-kv are not blocked.

Verification: covered by the v752-v771 command worksheet focused test and final batch validation.
