# Node v772 code walkthrough: evidence packet source worksheet check

v772 starts the evidence packet from the v771 command worksheet.

Key code: `EvidencePacketTypes.ts` defines the v772-v791 contract, and `EvidencePacketArtifacts.ts` adds `EVIDENCE_SOURCE_WORKSHEET_CHECK`.

The packet fails closed if the source worksheet is not ready.

Verification: covered by the evidence packet focused test.
