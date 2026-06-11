# Code walkthrough 967: Node v962 approval packet draft Java closeout profile

## Version Position

This walkthrough covers Node v962 in the v962-v986 approval packet draft batch. The slice consumes java-v658-value-supply-closeout-service / java-value-supply-closeout-profile and maps it from source envelope slot VALUE_SUPPLY_ENVELOPE_JAVA_CLOSEOUT_PROFILE.

## Key Files

- managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftTypes.ts
- managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftEvidence.ts
- managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftPolicyCatalog.ts
- managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftSlotBuilder.ts
- managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftArtifacts.ts
- managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftRenderer.ts

## Flow

The artifact builder loads historical fallback-aware files, matches snippets, asks the slot builder to map Node v961 envelope slots to v962-v986 approval draft slots, applies policy catalog fields, calculates fail-closed gates, and emits a stable digest. v962 becomes ready only when its evidence file and snippet match and the source envelope slot is already ready.

## Why This Is Maintainable

Policy metadata is centralized in the policy catalog, evidence paths stay in the evidence module, and per-version mapping stays in the slot builder. The profile only receives the final artifact, and the renderer only formats it. That keeps future signed approval capture from being mixed into this read-only draft layer.

## Safety Result

The slice remains read-only and value-free: no approval grant, no signed approval, no supplied value, no accepted value, no imported value, no runtime payload, no write routing, no service startup, and no sibling mutation.
