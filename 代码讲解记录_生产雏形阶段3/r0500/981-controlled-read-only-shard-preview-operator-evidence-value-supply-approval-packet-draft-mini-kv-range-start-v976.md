# Code walkthrough 981: Node v976 approval packet draft mini-kv release range start

## Version Position

This walkthrough covers Node v976 in the v962-v986 approval packet draft batch. The slice consumes mini-kv-v610-value-supply-source / mini-kv-value-supply-range-start and maps it from source envelope slot VALUE_SUPPLY_ENVELOPE_MINI_KV_NODE_PLAN.

## Key Files

- managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftTypes.ts
- managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftEvidence.ts
- managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftPolicyCatalog.ts
- managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftSlotBuilder.ts
- managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftArtifacts.ts
- managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftRenderer.ts

## Flow

The artifact builder loads historical fallback-aware files, matches snippets, asks the slot builder to map Node v961 envelope slots to v962-v986 approval draft slots, applies policy catalog fields, calculates fail-closed gates, and emits a stable digest. v976 becomes ready only when its evidence file and snippet match and the source envelope slot is already ready.

## Why This Is Maintainable

Policy metadata is centralized in the policy catalog, evidence paths stay in the evidence module, and per-version mapping stays in the slot builder. The profile only receives the final artifact, and the renderer only formats it. That keeps future signed approval capture from being mixed into this read-only draft layer.

## Safety Result

The slice remains read-only and value-free: no approval grant, no signed approval, no supplied value, no accepted value, no imported value, no runtime payload, no write routing, no service startup, and no sibling mutation.
