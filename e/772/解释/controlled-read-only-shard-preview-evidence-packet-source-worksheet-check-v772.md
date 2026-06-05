# v772 Controlled read-only shard preview evidence packet source worksheet check

v772 starts the manual evidence packet by consuming the v771 command worksheet.

It records `EVIDENCE_SOURCE_WORKSHEET_CHECK`, which verifies worksheet state, digest, and blocked reasons before any manual evidence capture can begin. The record remains `pending-manual-capture` and includes no runtime payload.

Cross-project status: Java and mini-kv can continue in parallel; Node does not need fresh sibling evidence.

Verification: covered by the v772-v791 evidence packet focused test and final batch validation.
