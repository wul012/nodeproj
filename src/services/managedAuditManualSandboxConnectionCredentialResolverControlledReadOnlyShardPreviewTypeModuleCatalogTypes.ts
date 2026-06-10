export interface ControlledReadOnlyShardPreviewTypeModuleCatalogEntry {
  order: number;
  id: string;
  modulePath: string;
  owns: string[];
  consumedBy: string[];
  exportsViaStableProfileTypes: true;
  maintenanceRule: string;
  stopCondition: string;
}

export interface ControlledReadOnlyShardPreviewTypeModuleCatalog {
  catalogVersion: "Node v1581";
  publicEntryPoint: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts";
  moduleCount: number;
  stableReExportModuleCount: number;
  entries: ControlledReadOnlyShardPreviewTypeModuleCatalogEntry[];
  stopCondition: string;
}

export interface ControlledReadOnlyShardPreviewTypeModuleCatalogValidation {
  validationVersion: "Node v1581";
  valid: boolean;
  moduleCount: number;
  uniqueIdCount: number;
  uniquePathCount: number;
  stableReExportModuleCount: number;
  sequentialOrder: boolean;
  profileEntryLast: boolean;
  modulesWithOwnershipCount: number;
  modulesWithConsumersCount: number;
  modulesWithMaintenanceRuleCount: number;
  modulesWithStopConditionCount: number;
  blockedReasonCodes: string[];
  requiresFreshSiblingEvidence: true;
  startsServices: false;
  mutatesSiblingState: false;
}
