# Node v774 code walkthrough: evidence packet Node health record

v774 adds the pending Node health evidence record.

`EVIDENCE_NODE_HEALTH_RECORD` targets `node-http` and requires status code, header names, latency, and health summary. The record remains `pending-manual-capture`.

Verification: covered by the evidence packet focused test.
