# v775 Controlled read-only shard preview evidence packet Node Markdown record

v775 adds `EVIDENCE_NODE_MARKDOWN_RECORD`.

The pending record defines status code, content type, Markdown section count, and profile digest. It prepares future capture without calling the route automatically.

Cross-project status: Java and mini-kv are not blocked.

Verification: covered by the v772-v791 evidence packet focused test and final batch validation.
