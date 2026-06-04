# v710 Controlled read-only shard preview next action handoff

v710 records the next-action handoff stage.

The stage is `NEXT_ACTION_HANDOFF`: hand Java and mini-kv only their owned start/stop and read-only target requirements.

Cross-project status: Java and mini-kv are recommended parallel work; Node is not a pre-approval blocker.

Verification: covered by focused stage ledger tests.
