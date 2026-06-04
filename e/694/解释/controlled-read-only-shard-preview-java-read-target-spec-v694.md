# v694 Controlled read-only shard preview Java read target spec

v694 records the Java read target stage for the future manual live read-only window.

The stage is `JAVA_READ_TARGET_SPEC`: Java contributes only shard-readiness and health-style GET evidence. Node still does not start or stop Java in this version.

Cross-project status: Java can continue in parallel by keeping read-only service start/stop ownership explicit.

Verification: covered by focused stage ledger tests.
