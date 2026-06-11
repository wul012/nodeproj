# Code walkthrough 996: Node v991 typed value shape review control

## Files Touched

- src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewTypes.ts defines the review package, control, gate, and version contracts.
- src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewControlCatalog.ts owns control VALUE_SUPPLY_APPROVAL_REVIEW_VALUE_SHAPE and the other review templates.
- src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewSlotBuilder.ts maps VALUE_SUPPLY_APPROVAL_REVIEW_VALUE_SHAPE to source draft slot VALUE_SUPPLY_APPROVAL_PACKET_JAVA_SUPPLIED_STATE.
- src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewArtifacts.ts computes readiness, gates, counts, blockers, and the review digest.
- src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewRenderer.ts renders the control for archive and route review.

## Flow

The controlled preview profile builds the Node v986 approval packet draft first. The review package then loads the declarative control catalog, finds source slot VALUE_SUPPLY_APPROVAL_PACKET_JAVA_SUPPLIED_STATE, verifies the required approval and review fields, checks the expected policy, and marks VALUE_SUPPLY_APPROVAL_REVIEW_VALUE_SHAPE ready only when all of those conditions hold.

## Why It Is Safe

This version does not parse or accept operator-supplied values. It does not capture approval identity or approval timestamp. It keeps signed approval capture, operator value supply, evidence import, runtime payload, live execution, production execution, writes, service starts, and sibling mutation disabled.

## Tests

The focused review test checks all twenty-five controls, including VALUE_SUPPLY_APPROVAL_REVIEW_VALUE_SHAPE, the ready profile path, the blocked-source fail-closed path, renderer output, profile inclusion, and forced historical fallback through the source draft.
