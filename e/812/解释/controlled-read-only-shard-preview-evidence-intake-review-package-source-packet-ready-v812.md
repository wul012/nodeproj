# v812 Controlled read-only shard preview evidence intake review package source packet ready

v812 starts the operator evidence intake review package and adds `INTAKE_REVIEW_SOURCE_PACKET_READY`.

The control consumes the v811 intake ledger and checks the `sourceEvidencePacketReady` gate before any manual evidence entry is considered. It remains `awaiting-operator-review`; it does not import runtime payload, accept synthetic evidence, start services, or allow writes.

Cross-project status: Java and mini-kv can continue in parallel. Node does not request fresh sibling evidence.

Verification: covered by the v812-v836 evidence intake review package focused test and final batch validation.
