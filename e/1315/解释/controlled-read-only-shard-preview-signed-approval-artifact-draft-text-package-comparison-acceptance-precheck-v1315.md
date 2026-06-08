# Node v1315 signed approval artifact draft text package comparison acceptance precheck

Node v1315 adds the detached signature envelope acceptance checkpoint. It groups the three signature-envelope comparison lanes and matching controls into one acceptance precheck.

The guard requires future compared package evidence for the detached signature envelope while preserving the current no-payload boundary. Signature payload ingestion remains disabled and approval-grant capture remains separate.

This is still a precheck, not signature verification. The package counts remain zero, and the runtime/write/sibling mutation flags remain false.

Java and mini-kv can continue in parallel without waiting for this Node version.
