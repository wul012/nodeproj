# Node v812 code walkthrough: evidence intake review package source packet ready

v812 starts the operator intake review package.

`INTAKE_REVIEW_SOURCE_PACKET_READY` checks the v811 ledger `sourceEvidencePacketReady` gate. The package remains review-only and does not import runtime payload.

Verification: covered by the evidence intake review package focused test.
