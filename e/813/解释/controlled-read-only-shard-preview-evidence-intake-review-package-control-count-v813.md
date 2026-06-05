# v813 Controlled read-only shard preview evidence intake review package control count

v813 adds `INTAKE_REVIEW_CONTROL_COUNT_COMPLETE`.

The control verifies that the review package has all twenty-five controls for Node v812-v836. This prevents later manual-entry work from consuming a partial review surface.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by the v812-v836 evidence intake review package focused test and final batch validation.
