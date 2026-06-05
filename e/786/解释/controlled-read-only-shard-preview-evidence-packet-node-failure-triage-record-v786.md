# v786 Controlled read-only shard preview evidence packet Node failure triage record

v786 adds `EVIDENCE_NODE_FAILURE_TRIAGE_RECORD`.

The record requires failure class, retry decision, and stop decision. Retry must remain read-only and stop must block mutation.

Cross-project status: Java and mini-kv are not blocked.

Verification: covered by the v772-v791 evidence packet focused test and final batch validation.
