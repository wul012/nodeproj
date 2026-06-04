# v760 Controlled read-only shard preview command worksheet forbidden operation confirmation

v760 adds forbidden operation confirmation.

It records `WORKSHEET_FORBIDDEN_OPERATION_CONFIRMATION`, confirming write routing, LOAD, RESTORE, COMPACT, and sibling mutation remain forbidden. This keeps the worksheet bounded before any live read-only command review.

Cross-project status: Java and mini-kv are not asked to run new probes here.

Verification: covered by the v752-v771 command worksheet focused test and final batch validation.
