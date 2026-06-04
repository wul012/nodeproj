# v752 Controlled read-only shard preview command worksheet source rehearsal check

v752 starts the manual command worksheet by consuming the v751 rehearsal packet.

It records `WORKSHEET_SOURCE_REHEARSAL_PACKET_CHECK`, which verifies the source rehearsal packet before any command template can be reviewed. The worksheet only references the rehearsal packet digest and blocked reasons; it does not execute commands or start services.

Cross-project status: Java and mini-kv can continue in parallel. Node does not need fresh sibling evidence for this version.

Verification: covered by the v752-v771 command worksheet focused test and final batch validation.
