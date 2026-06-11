# Node v696 code walkthrough: forbidden operation policy

`FORBIDDEN_OPERATION_POLICY` keeps active routing, write routing, and admin commands out of the manual live read-only window.

The policy is encoded as a stage, not a new approval chain.

Focused tests verify every stage has `writesAllowed=false`.
