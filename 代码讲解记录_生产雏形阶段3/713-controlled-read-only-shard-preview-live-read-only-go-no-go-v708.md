# Node v708 code walkthrough: live read-only go/no-go

`LIVE_READ_ONLY_GO_NO_GO` records that the next decision may approve only a manual live read-only window.

Production execution remains false and write approval remains outside this chain.

Focused tests verify no production execution across the ledger.
