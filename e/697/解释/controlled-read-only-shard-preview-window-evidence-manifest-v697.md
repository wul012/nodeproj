# v697 Controlled read-only shard preview window evidence manifest

v697 records the evidence manifest stage.

The stage is `WINDOW_EVIDENCE_MANIFEST`: future window evidence must include request or command, read-only result, digest, and owner. It does not claim live evidence already exists.

Cross-project status: Java and mini-kv may prepare matching evidence records in parallel.

Verification: covered by focused stage ledger tests.
