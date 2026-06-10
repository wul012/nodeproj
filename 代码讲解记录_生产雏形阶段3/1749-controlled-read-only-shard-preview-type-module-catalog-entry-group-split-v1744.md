# Code walkthrough - Node v1744

## Focus

Confirm no fresh Java evidence is required for this Node-only split.

## Code reading notes

- managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.ts remains the stable API surface for list/create/validate behavior.
- managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalogTypes.ts owns the catalog contracts.
- managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalogConstants.ts owns the stable profile entrypoint constant.
- managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalogEntries.ts owns the deterministic group registry and flattening boundary.
- The six entry modules split foundation/live window, operator evidence supply, signed approval capture draft, text package preflight, text package evidence, and candidate document/profile entries.
- test/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.test.ts locks the group ordering and contiguous order coverage.

## Maintenance rule

Do not place new entry records back in the catalog API module. Add a record to the matching entry group, and create another group only when a new route, builder, renderer, or test lifecycle owns it.
