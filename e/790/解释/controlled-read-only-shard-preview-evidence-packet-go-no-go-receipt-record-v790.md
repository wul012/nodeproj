# v790 Controlled read-only shard preview evidence packet go/no-go receipt record

v790 adds `EVIDENCE_GO_NO_GO_RECEIPT_RECORD`.

The record requires manual decision, decision scope, and production execution allowed flag. The scope remains manual read-only evidence capture.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by the v772-v791 evidence packet focused test and final batch validation.
