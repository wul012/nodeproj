# v706 Controlled read-only shard preview window receipt archive

v706 records the receipt archive stage.

The stage is `WINDOW_RECEIPT_ARCHIVE`: later comparisons can use digest and count fields while avoiding secrets and runtime payloads.

Cross-project status: Java and mini-kv are recommended parallel work.

Verification: covered by focused stage ledger tests.
