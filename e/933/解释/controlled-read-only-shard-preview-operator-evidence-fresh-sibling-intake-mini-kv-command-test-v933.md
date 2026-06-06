# Node v933 controlled read-only shard preview operator evidence fresh sibling intake: mini-kv command test

## What This Version Owns

v933 contributes mini-kv command test to the Node v912-v936 fresh sibling intake package. The slice is owned by mini-kv evidence consumption, but the implementation lives only in Node and reads committed sibling files through historical fallback-aware evidence helpers.

Detail: matches the focused test command constant for SHARDROUTEIMPORTPREFLIGHTJSON.

## Files Touched By The Package

- src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeTypes.ts
- src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeEvidence.ts
- src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeSlotBuilder.ts
- src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeArtifacts.ts
- src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeRenderer.ts
- fixtures/historical/sibling-workspaces/... contains the frozen Java v608 and mini-kv v560 source snippets required by CI runners without sibling workspaces.

## Safety Boundary

This version is not real execution. It does not supply operator values, import evidence, accept manual entry, accept runtime payloads, normalize synthetic evidence, store credentials or secrets, start services, mutate Java, mutate mini-kv, enable write routing, touch WAL, or allow production execution.

The only ready state is readyForFreshSiblingEvidenceIntake=true, and even that means Node has enough read-only sibling evidence to prepare the next value-supply design. readyForOperatorValueSupply, readyForEvidenceImport, readyForManualEvidenceEntry, readyForLiveExecution, and readyForProductionExecution remain false.

## Verification Notes

Focused validation for the batch covers fresh sibling ready/blocked behavior, renderer output, profile wiring, forced historical fallback, v886/v911 adjacent tests, route Markdown, catalog, and barrel exports. Broader verification is batched at package closeout rather than repeated for each version.
