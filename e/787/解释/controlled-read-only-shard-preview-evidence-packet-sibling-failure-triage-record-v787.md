# v787 Controlled read-only shard preview evidence packet sibling failure triage record

v787 adds `EVIDENCE_SIBLING_FAILURE_TRIAGE_RECORD`.

The record requires sibling failure class, retry decision, and stop decision. Write actions remain disabled.

Cross-project status: Java and mini-kv can continue independently.

Verification: covered by the v772-v791 evidence packet focused test and final batch validation.
