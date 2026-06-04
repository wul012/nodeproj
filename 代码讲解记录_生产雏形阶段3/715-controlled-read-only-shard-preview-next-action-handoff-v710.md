# Node v710 code walkthrough: next action handoff

`NEXT_ACTION_HANDOFF` records the handoff to Java and mini-kv.

The handoff is limited to owned start/stop and read-only target requirements. It does not ask sibling projects to wait for Node.

Focused tests verify cross-project owner coverage.
