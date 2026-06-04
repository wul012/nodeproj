# v724 Controlled read-only shard preview archive snapshot inputs

v724 records archive snapshot inputs for a future live read-only window.

Only ledger digest, package digest, target sections, and non-secret metadata are allowed.

Cross-project status: Java and mini-kv are recommended parallel work.

Verification: covered by the runbook package focused test.
