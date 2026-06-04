# Node v698 code walkthrough: process cleanup record

`PROCESS_CLEANUP_RECORD` makes cleanup a first-class stage.

The ledger counts cleanup-required stages and verifies cleanup coverage for process-ownership and cleanup categories.

Focused tests verify `cleanupRequiredStageCount` and fail-closed behavior.
