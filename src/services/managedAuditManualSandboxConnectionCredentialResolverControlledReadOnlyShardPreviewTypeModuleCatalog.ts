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
  catalogVersion: "Node v685";
  publicEntryPoint: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts";
  moduleCount: number;
  stableReExportModuleCount: number;
  entries: ControlledReadOnlyShardPreviewTypeModuleCatalogEntry[];
  stopCondition: string;
}

const PUBLIC_ENTRY_POINT = "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts";

const TYPE_MODULE_CATALOG_ENTRIES: ControlledReadOnlyShardPreviewTypeModuleCatalogEntry[] = [
  {
    order: 1,
    id: "source-matrix-types",
    modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixTypes.ts",
    owns: ["source matrix primitives", "consumer gates", "drift summary"],
    consumedBy: ["source matrix builders", "consumption plan builders", "profile types"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep source observation shape and drift comparison contracts together.",
    stopCondition: "Do not split unless source matrix runtime contracts exceed one focused ownership group.",
  },
  {
    order: 2,
    id: "support-types",
    modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSupportTypes.ts",
    owns: ["observation", "message", "checks", "summary"],
    consumedBy: ["checks", "support helpers", "profile types"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep top-level preview support records together.",
    stopCondition: "Do not split unless checks or summaries gain independent builders.",
  },
  {
    order: 3,
    id: "consumption-plan-types",
    modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlanTypes.ts",
    owns: ["consumption plan", "plan steps", "read-only review scope"],
    consumedBy: ["consumption plan artifacts", "guidance formatters", "profile types"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep plan, risk, promotion hold, and review scope fields in one plan contract.",
    stopCondition: "Do not split unless a sub-contract gains its own builder and tests.",
  },
  {
    order: 4,
    id: "review-decision-types",
    modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewDecisionTypes.ts",
    owns: ["review checklist", "review digest"],
    consumedBy: ["review decision artifacts", "archive handoff artifacts", "profile types"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep operator review decisions with their digest contract.",
    stopCondition: "Do not split unless checklist and digest start separate version lifecycles.",
  },
  {
    order: 5,
    id: "archive-types",
    modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewArchiveTypes.ts",
    owns: ["review archive snapshot", "archive summary export"],
    consumedBy: ["archive handoff artifacts", "source matrix renderer", "profile types"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep review archive snapshot and its export together.",
    stopCondition: "Do not split unless archive export gains independent consumers.",
  },
  {
    order: 6,
    id: "handoff-types",
    modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffTypes.ts",
    owns: ["handoff notes", "handoff summary"],
    consumedBy: ["handoff artifacts", "handoff renderer", "profile types"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep note and summary audience semantics together.",
    stopCondition: "Do not split unless notes and summary diverge into separate handoff workflows.",
  },
  {
    order: 7,
    id: "handoff-consumer-types",
    modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffConsumerTypes.ts",
    owns: ["handoff consumer", "consumer export", "consumer receipt"],
    consumedBy: ["handoff artifacts", "handoff renderer", "profile types"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep consumer, export, and receipt contracts in one read-only consumption chain.",
    stopCondition: "Do not split unless a receipt workflow gains independent ownership.",
  },
  {
    order: 8,
    id: "handoff-receipt-archive-types",
    modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffReceiptArchiveTypes.ts",
    owns: ["handoff receipt archive snapshot", "handoff receipt archive verification"],
    consumedBy: ["handoff artifacts", "route coverage artifacts", "profile types"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep receipt archive snapshot and verification together.",
    stopCondition: "Do not split unless archive verification has separate route coverage ownership.",
  },
  {
    order: 9,
    id: "route-coverage-types",
    modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRouteCoverageTypes.ts",
    owns: ["route coverage", "route coverage verification"],
    consumedBy: ["route coverage artifacts", "route coverage renderer", "profile types"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep route coverage surface and verification gates together.",
    stopCondition: "Do not split unless coverage and verification gain independent test lifecycles.",
  },
  {
    order: 10,
    id: "route-coverage-archive-types",
    modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRouteCoverageArchiveTypes.ts",
    owns: ["route coverage archive snapshot", "route coverage archive verification"],
    consumedBy: ["route coverage artifacts", "route coverage renderer", "profile types"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep route coverage archive snapshot and verification together.",
    stopCondition: "Do not split unless archive verification is reused outside route coverage.",
  },
  {
    order: 11,
    id: "route-coverage-archive-summary-types",
    modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRouteCoverageArchiveSummaryTypes.ts",
    owns: ["route coverage archive summary", "route coverage archive summary receipt"],
    consumedBy: ["route coverage artifacts", "route coverage renderer", "profile types"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep archive summary and summary receipt together.",
    stopCondition: "Do not split unless summary and receipt gain independent version lifecycles.",
  },
  {
    order: 12,
    id: "route-coverage-archive-receipt-types",
    modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRouteCoverageArchiveReceiptTypes.ts",
    owns: ["route coverage archive receipt snapshot", "route coverage archive receipt verification"],
    consumedBy: ["route coverage artifacts", "route coverage renderer", "profile types"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep receipt archive snapshot and verification together.",
    stopCondition: "Do not split unless receipt archive verification is reused outside route coverage.",
  },
  {
    order: 13,
    id: "profile-entry-types",
    modulePath: PUBLIC_ENTRY_POINT,
    owns: ["profile aggregate", "stable type re-exports"],
    consumedBy: ["all existing controlled shard preview type imports"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep the public entry point stable and aggregate only top-level profile wiring.",
    stopCondition: "Do not split the profile entry point; keep it as the stable import path.",
  },
];

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
    catalogVersion: "Node v685",
    publicEntryPoint: PUBLIC_ENTRY_POINT,
    moduleCount: entries.length,
    stableReExportModuleCount: entries.filter((entry) => entry.exportsViaStableProfileTypes).length,
    entries,
    stopCondition: "Use these ownership groups as the default boundary; add a new type module only when a new builder, renderer, or test lifecycle needs it.",
  };
}
