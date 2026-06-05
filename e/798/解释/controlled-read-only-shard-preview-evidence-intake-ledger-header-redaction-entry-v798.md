# v798 Controlled read-only shard preview evidence intake ledger header redaction entry

v798 adds `INTAKE_HEADER_REDACTION_ENTRY`.

The entry maps to `EVIDENCE_HEADER_REDACTION_RECORD`. It requires header name count, redacted value count, and redaction policy while explicitly rejecting any captured header value. This keeps the manual intake ledger compatible with the no-secret archive boundary.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by the v792-v811 evidence intake ledger focused test and final batch validation.
