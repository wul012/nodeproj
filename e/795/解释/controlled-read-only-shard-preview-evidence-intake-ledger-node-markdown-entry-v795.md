# v795 Controlled read-only shard preview evidence intake ledger Node Markdown entry

v795 adds `INTAKE_NODE_MARKDOWN_ENTRY`.

The entry maps to `EVIDENCE_NODE_MARKDOWN_RECORD` and preserves the expected Markdown status, content type, section count, and profile digest fields. It records only section and digest information, keeping secret headers and runtime payload outside the archive.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by the v792-v811 evidence intake ledger focused test and final batch validation.
