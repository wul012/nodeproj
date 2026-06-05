import type {
  ControlledReadOnlyShardPreviewTypeModuleCatalogEntry,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.js";

export function createControlledReadOnlyShardPreviewTypeModuleCatalogEntry(
  input: Omit<ControlledReadOnlyShardPreviewTypeModuleCatalogEntry, "exportsViaStableProfileTypes">,
): ControlledReadOnlyShardPreviewTypeModuleCatalogEntry {
  return {
    ...input,
    exportsViaStableProfileTypes: true,
  };
}
