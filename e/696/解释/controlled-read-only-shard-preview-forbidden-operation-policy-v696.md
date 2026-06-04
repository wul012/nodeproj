# v696 Controlled read-only shard preview forbidden operation policy

v696 records the forbidden-operation policy stage for the future manual live read-only window.

The stage is `FORBIDDEN_OPERATION_POLICY`: write routing, active shard routing, and mini-kv admin commands remain outside the read-only window.

Cross-project status: Java and mini-kv are recommended parallel work; neither project waits on Node for this policy.

Verification: covered by focused stage ledger tests.
