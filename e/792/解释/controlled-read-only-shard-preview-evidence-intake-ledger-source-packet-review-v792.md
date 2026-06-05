# v792 Controlled read-only shard preview evidence intake ledger source packet review

v792 starts the manual evidence intake ledger and adds `INTAKE_SOURCE_WORKSHEET_REVIEW`.

This entry maps to `EVIDENCE_SOURCE_WORKSHEET_CHECK` from the v791 evidence packet. It preserves the source packet required fields, acceptance criteria, and redaction rule before any operator-entered evidence is accepted. The entry stays `awaiting-manual-entry`; it does not import runtime payload, does not accept synthetic evidence, and does not authorize live execution.

Cross-project status: Java and mini-kv can continue in parallel. Node only consumes the frozen v791 packet shape and does not request fresh sibling evidence.

Verification: covered by the v792-v811 evidence intake ledger focused test and final batch validation.
