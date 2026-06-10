# Code walkthrough - Node v1832

## Focus

Run typecheck across profile imports and aggregate re-exports.

## Code reading notes

- managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts is now a compatibility barrel, not the owner of the full profile shape.
- managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewProfileTypes.ts owns the ControlledReadOnlyShardPreviewProfile interface and its named reads, preview graph, and evidence endpoint boundaries.
- managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeExports.ts owns downstream type re-exports, keeping compatibility for existing importers.
- test/controlledReadOnlyShardPreviewTypeBarrelSplit.test.ts uses type-level assertions to prove the stable barrel still exposes representative profile, source-matrix, value-supply envelope, and narrow profile boundary types.

## Maintenance rule

Future controlled read-only shard preview type additions should go into the narrow owning module first. The stable barrel should stay thin and only preserve compatibility.
