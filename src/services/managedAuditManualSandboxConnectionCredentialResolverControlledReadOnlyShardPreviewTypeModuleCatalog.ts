import { PUBLIC_ENTRY_POINT } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalogConstants.js";
import { TYPE_MODULE_CATALOG_ENTRIES } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalogEntries.js";
import type {
  ControlledReadOnlyShardPreviewTypeModuleCatalog,
  ControlledReadOnlyShardPreviewTypeModuleCatalogEntry,
  ControlledReadOnlyShardPreviewTypeModuleCatalogValidation,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalogTypes.js";

export type {
  ControlledReadOnlyShardPreviewTypeModuleCatalog,
  ControlledReadOnlyShardPreviewTypeModuleCatalogEntry,
  ControlledReadOnlyShardPreviewTypeModuleCatalogValidation,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalogTypes.js";

export function listControlledReadOnlyShardPreviewTypeModules(): ControlledReadOnlyShardPreviewTypeModuleCatalogEntry[] {
  return TYPE_MODULE_CATALOG_ENTRIES.map((entry) => ({
    ...entry,
    owns: [...entry.owns],
    consumedBy: [...entry.consumedBy],
  }));
}

export function createControlledReadOnlyShardPreviewTypeModuleCatalog():
  ControlledReadOnlyShardPreviewTypeModuleCatalog {
  const entries = listControlledReadOnlyShardPreviewTypeModules();

  return {
    catalogVersion: "Node v1581",
    publicEntryPoint: PUBLIC_ENTRY_POINT,
    moduleCount: entries.length,
    stableReExportModuleCount: entries.filter((entry) => entry.exportsViaStableProfileTypes).length,
    entries,
    stopCondition: "Use these ownership groups as the default boundary; add a new type module only when a new builder, renderer, or test lifecycle needs it.",
  };
}

export function validateControlledReadOnlyShardPreviewTypeModuleCatalog(
  catalog: ControlledReadOnlyShardPreviewTypeModuleCatalog =
    createControlledReadOnlyShardPreviewTypeModuleCatalog(),
): ControlledReadOnlyShardPreviewTypeModuleCatalogValidation {
  const uniqueIdCount = new Set(catalog.entries.map((entry) => entry.id)).size;
  const uniquePathCount = new Set(catalog.entries.map((entry) => entry.modulePath)).size;
  const stableReExportModuleCount = catalog.entries
    .filter((entry) => entry.exportsViaStableProfileTypes).length;
  const sequentialOrder = catalog.entries.every((entry, index) => entry.order === index + 1);
  const profileEntryLast = catalog.entries.at(-1)?.id === "profile-entry-types"
    && catalog.entries.at(-1)?.modulePath === catalog.publicEntryPoint;
  const modulesWithOwnershipCount = catalog.entries.filter((entry) => entry.owns.length > 0).length;
  const modulesWithConsumersCount = catalog.entries.filter((entry) => entry.consumedBy.length > 0).length;
  const modulesWithMaintenanceRuleCount = catalog.entries
    .filter((entry) => entry.maintenanceRule.length > 0).length;
  const modulesWithStopConditionCount = catalog.entries
    .filter((entry) => entry.stopCondition.length > 0).length;
  const blockedReasonCodes: string[] = [];

  if (catalog.moduleCount !== catalog.entries.length) {
    blockedReasonCodes.push("TYPE_MODULE_COUNT_MISMATCH");
  }
  if (uniqueIdCount !== catalog.entries.length) {
    blockedReasonCodes.push("TYPE_MODULE_IDS_NOT_UNIQUE");
  }
  if (uniquePathCount !== catalog.entries.length) {
    blockedReasonCodes.push("TYPE_MODULE_PATHS_NOT_UNIQUE");
  }
  if (stableReExportModuleCount !== catalog.entries.length
    || catalog.stableReExportModuleCount !== stableReExportModuleCount) {
    blockedReasonCodes.push("TYPE_MODULE_STABLE_REEXPORT_COUNT_MISMATCH");
  }
  if (!sequentialOrder) {
    blockedReasonCodes.push("TYPE_MODULE_ORDER_NOT_SEQUENTIAL");
  }
  if (!profileEntryLast) {
    blockedReasonCodes.push("TYPE_MODULE_PROFILE_ENTRY_NOT_LAST");
  }
  if (modulesWithOwnershipCount !== catalog.entries.length) {
    blockedReasonCodes.push("TYPE_MODULE_OWNERSHIP_MISSING");
  }
  if (modulesWithConsumersCount !== catalog.entries.length) {
    blockedReasonCodes.push("TYPE_MODULE_CONSUMERS_MISSING");
  }
  if (modulesWithMaintenanceRuleCount !== catalog.entries.length) {
    blockedReasonCodes.push("TYPE_MODULE_MAINTENANCE_RULE_MISSING");
  }
  if (modulesWithStopConditionCount !== catalog.entries.length) {
    blockedReasonCodes.push("TYPE_MODULE_STOP_CONDITION_MISSING");
  }

  return {
    validationVersion: "Node v1581",
    valid: blockedReasonCodes.length === 0,
    moduleCount: catalog.entries.length,
    uniqueIdCount,
    uniquePathCount,
    stableReExportModuleCount,
    sequentialOrder,
    profileEntryLast,
    modulesWithOwnershipCount,
    modulesWithConsumersCount,
    modulesWithMaintenanceRuleCount,
    modulesWithStopConditionCount,
    blockedReasonCodes,
    requiresFreshSiblingEvidence: true,
    startsServices: false,
    mutatesSiblingState: false,
  };
}
