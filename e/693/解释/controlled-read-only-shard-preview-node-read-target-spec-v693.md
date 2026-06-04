# v693 Controlled read-only shard preview Node read target spec

v693 records the Node read target stage for the future manual live read-only window.

The stage is `NODE_READ_TARGET_SPEC`: health plus controlled preview JSON/Markdown targets. It remains GET/read-only, with no automatic service start and no production execution.

Cross-project status: Java and mini-kv are not blocked by v693.

Verification: covered by focused stage ledger tests and the controlled preview profile test.
