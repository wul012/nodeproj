# Node v693 code walkthrough: Node read target spec

The stage ledger records `NODE_READ_TARGET_SPEC` for Node health and controlled preview JSON/Markdown reads.

The target stays in the ledger as planning evidence only. It does not start the Node server and does not create a new route.

Focused tests verify v693 ordering and safety flags.
