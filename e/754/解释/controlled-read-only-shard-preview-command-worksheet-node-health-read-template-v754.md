# v754 Controlled read-only shard preview command worksheet Node health read template

v754 adds the Node health read template.

It records `WORKSHEET_NODE_HEALTH_READ_TEMPLATE`, a manual `GET /health` template with identity and approval headers. Header values are not stored and Node still does not start a service in this version.

Cross-project status: Java and mini-kv are not blocked by this Node-owned command template.

Verification: covered by the v752-v771 command worksheet focused test and final batch validation.
