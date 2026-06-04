# v709 Controlled read-only shard preview post-window evidence spec

v709 records the post-window evidence stage.

The stage is `POST_WINDOW_EVIDENCE_SPEC`: after a future window, Node expects target results and cleanup outcome. Skipped or mixed windows are not production pass evidence.

Cross-project status: Java and mini-kv may mirror this evidence shape.

Verification: covered by focused stage ledger tests.
