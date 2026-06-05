# v816 Controlled read-only shard preview evidence intake review package pending capture state

v816 adds `INTAKE_REVIEW_PENDING_CAPTURE_STATE`.

The control verifies that source records remain pending manual capture. If a record has already moved beyond pending state, review is blocked so the next layer cannot mistake captured evidence for a template.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by the v812-v836 evidence intake review package focused test and final batch validation.
