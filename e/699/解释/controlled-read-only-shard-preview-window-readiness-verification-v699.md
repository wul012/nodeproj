# v699 Controlled read-only shard preview window readiness verification

v699 records the readiness verification stage.

The stage is `WINDOW_READINESS_VERIFICATION`: Node verifies the candidate digest, stage ledger shape, and safety flags before any manual live read-only window.

Cross-project status: no fresh sibling evidence is required.

Verification: covered by focused stage ledger tests.
