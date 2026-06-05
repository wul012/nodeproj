# Node v784 code walkthrough: evidence packet Node cleanup record

v784 adds Node cleanup evidence shape.

`EVIDENCE_NODE_CLEANUP_RECORD` sets `cleanupRequired=true`; the packet counts cleanup records and requires two cleanup slots. No process is started.

Verification: covered by the evidence packet focused test.
