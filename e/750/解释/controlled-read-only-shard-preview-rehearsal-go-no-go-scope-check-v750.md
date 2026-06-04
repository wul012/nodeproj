# v750 Controlled read-only shard preview rehearsal go/no-go scope check

v750 checks the rehearsal go/no-go scope.

It records `REHEARSAL_GO_NO_GO_SCOPE_CHECK`, mapping to `GO_NO_GO_DECISION_PACKET`. The packet can become ready for manual rehearsal, but it still keeps `readyForLiveExecution=false` and `readyForProductionExecution=false`.

Cross-project status: Java and mini-kv can continue in parallel. Node is not issuing a live go command.

Verification: covered by the v732-v751 rehearsal packet focused test and final batch validation.
