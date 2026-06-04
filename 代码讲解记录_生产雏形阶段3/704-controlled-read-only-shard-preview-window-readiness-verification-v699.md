# Node v699 code walkthrough: window readiness verification

`WINDOW_READINESS_VERIFICATION` records the Node-side verification before a live read-only window.

The ledger gates check source candidate readiness, version ordering, read-only flags, no writes, no automatic service start, cleanup coverage, and production execution false.

Focused tests verify all eight gates pass for the ready fixture.
