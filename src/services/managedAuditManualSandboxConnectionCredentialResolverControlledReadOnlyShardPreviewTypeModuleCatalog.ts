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
  catalogVersion: "Node v811";
  publicEntryPoint: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts";
  moduleCount: number;
  stableReExportModuleCount: number;
  entries: ControlledReadOnlyShardPreviewTypeModuleCatalogEntry[];
  stopCondition: string;
}

export interface ControlledReadOnlyShardPreviewTypeModuleCatalogValidation {
  validationVersion: "Node v811";
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
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
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
    id: "execution-readiness-types",
    modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewExecutionReadinessTypes.ts",
    owns: ["execution gap matrix", "live read-only packet candidate", "candidate verification"],
    consumedBy: ["execution readiness artifacts", "execution readiness renderer", "profile types"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep real-execution readiness contracts together so planning, candidate, and verification share one safety vocabulary.",
    stopCondition: "Do not split unless live packet execution and production execution gain separate builders.",
  },
  {
    order: 14,
    id: "execution-readiness-artifacts",
    modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewExecutionReadinessArtifacts.ts",
    owns: ["execution gap matrix builder", "live read-only packet candidate builder", "candidate verification builder"],
    consumedBy: ["review artifact barrel", "execution readiness tests", "future archive pages"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep the three-step read-only execution readiness chain in one builder file until execution starts using runtime clients.",
    stopCondition: "Do not split unless a builder begins starting services or consuming fresh runtime evidence.",
  },
  {
    order: 15,
    id: "execution-readiness-renderer",
    modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewExecutionReadinessRenderer.ts",
    owns: ["gap matrix markdown", "candidate markdown", "candidate verification markdown"],
    consumedBy: ["review artifact barrel", "archive explanations", "future route surfaces"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep execution readiness markdown isolated from runtime builders.",
    stopCondition: "Do not split unless the renderer grows a route-specific or archive-specific lifecycle.",
  },
  {
    order: 16,
    id: "live-read-only-window-stage-ledger-types",
    modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedgerTypes.ts",
    owns: ["manual window stage ledger", "twenty-version stage records", "stage ledger gates"],
    consumedBy: ["stage ledger artifacts", "stage ledger renderer", "profile types"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep the twenty-stage live read-only window ledger contract isolated from packet candidate verification.",
    stopCondition: "Do not split unless individual stage families gain independent builders.",
  },
  {
    order: 17,
    id: "live-read-only-window-stage-ledger-artifacts",
    modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedgerArtifacts.ts",
    owns: ["stage ledger builder", "stage safety gates", "ledger digest"],
    consumedBy: ["review artifact barrel", "stage ledger tests", "profile assembly"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep live read-only window stage creation and validation together while it remains a planning artifact.",
    stopCondition: "Do not split unless a stage begins executing runtime clients.",
  },
  {
    order: 18,
    id: "live-read-only-window-stage-ledger-renderer",
    modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedgerRenderer.ts",
    owns: ["stage ledger markdown", "stage summary rendering"],
    consumedBy: ["review artifact barrel", "archive explanations", "future route surfaces"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep stage ledger Markdown separate from builder logic.",
    stopCondition: "Do not split unless stage rendering gains route-specific behavior.",
  },
  {
    order: 19,
    id: "live-read-only-window-runbook-types",
    modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookTypes.ts",
    owns: ["operator runbook package", "runbook sections", "runbook gates"],
    consumedBy: ["runbook artifacts", "runbook renderer", "profile types"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep operator runbook package contracts separate from stage ledger contracts.",
    stopCondition: "Do not split unless target manifest, evidence schema, or archive handoff gain independent builders.",
  },
  {
    order: 20,
    id: "live-read-only-window-runbook-artifacts",
    modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookArtifacts.ts",
    owns: ["runbook package builder", "runbook mapping gates", "package digest"],
    consumedBy: ["review artifact barrel", "runbook package tests", "profile assembly"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep runbook section generation and gate validation together while it remains a planning package.",
    stopCondition: "Do not split unless the package starts consuming live runtime evidence.",
  },
  {
    order: 21,
    id: "live-read-only-window-runbook-renderer",
    modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookRenderer.ts",
    owns: ["runbook package markdown", "runbook section rendering"],
    consumedBy: ["review artifact barrel", "archive explanations", "future route surfaces"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep runbook Markdown separate from package generation.",
    stopCondition: "Do not split unless route rendering and archive rendering diverge.",
  },
  {
    order: 22,
    id: "live-read-only-window-rehearsal-types",
    modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalTypes.ts",
    owns: ["manual rehearsal packet", "rehearsal steps", "rehearsal gates"],
    consumedBy: ["rehearsal artifacts", "rehearsal renderer", "profile types"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep rehearsal packet contracts separate from operator runbook contracts.",
    stopCondition: "Do not split unless evidence slots, cleanup slots, or failure taxonomy gain independent builders.",
  },
  {
    order: 23,
    id: "live-read-only-window-rehearsal-artifacts",
    modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalArtifacts.ts",
    owns: ["rehearsal packet builder", "rehearsal safety gates", "packet digest"],
    consumedBy: ["review artifact barrel", "rehearsal packet tests", "profile assembly"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep rehearsal step generation and validation together while it remains non-executing.",
    stopCondition: "Do not split unless the packet starts consuming live runtime evidence.",
  },
  {
    order: 24,
    id: "live-read-only-window-rehearsal-renderer",
    modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalRenderer.ts",
    owns: ["rehearsal packet markdown", "rehearsal step rendering"],
    consumedBy: ["review artifact barrel", "archive explanations", "future route surfaces"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep rehearsal Markdown separate from packet generation.",
    stopCondition: "Do not split unless route rendering and archive rendering diverge.",
  },
  {
    order: 25,
    id: "live-read-only-window-command-worksheet-types",
    modulePath:
      "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetTypes.ts",
    owns: ["manual command worksheet", "command templates", "worksheet gates"],
    consumedBy: ["command worksheet artifacts", "command worksheet renderer", "profile types"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep manual command worksheet contracts separate from rehearsal packet contracts.",
    stopCondition: "Do not split unless command templates, evidence capture, or cleanup capture gain independent builders.",
  },
  {
    order: 26,
    id: "live-read-only-window-command-worksheet-artifacts",
    modulePath:
      "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetArtifacts.ts",
    owns: ["command worksheet builder", "worksheet safety gates", "worksheet digest"],
    consumedBy: ["review artifact barrel", "command worksheet tests", "profile assembly"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep command worksheet step generation and validation together while it remains non-executing.",
    stopCondition: "Do not split unless the worksheet starts consuming live runtime evidence.",
  },
  {
    order: 27,
    id: "live-read-only-window-command-worksheet-renderer",
    modulePath:
      "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetRenderer.ts",
    owns: ["command worksheet markdown", "command template rendering"],
    consumedBy: ["review artifact barrel", "archive explanations", "future route surfaces"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep command worksheet Markdown separate from worksheet generation.",
    stopCondition: "Do not split unless route rendering and archive rendering diverge.",
  },
  {
    order: 28,
    id: "live-read-only-window-evidence-packet-types",
    modulePath:
      "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketTypes.ts",
    owns: ["manual evidence packet", "pending capture records", "evidence packet gates"],
    consumedBy: ["evidence packet artifacts", "evidence packet renderer", "profile types"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep manual evidence packet contracts separate from command worksheet contracts.",
    stopCondition: "Do not split unless record capture, archive verification, or go/no-go receipts gain independent builders.",
  },
  {
    order: 29,
    id: "live-read-only-window-evidence-packet-artifacts",
    modulePath:
      "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketArtifacts.ts",
    owns: ["evidence packet builder", "pending capture validation", "evidence packet digest"],
    consumedBy: ["review artifact barrel", "evidence packet tests", "profile assembly"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep evidence record generation and validation together while it remains pending manual capture.",
    stopCondition: "Do not split unless the packet starts importing actual live evidence files.",
  },
  {
    order: 30,
    id: "live-read-only-window-evidence-packet-renderer",
    modulePath:
      "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketRenderer.ts",
    owns: ["evidence packet markdown", "pending capture record rendering"],
    consumedBy: ["review artifact barrel", "archive explanations", "future route surfaces"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep evidence packet Markdown separate from packet generation.",
    stopCondition: "Do not split unless route rendering and archive rendering diverge.",
  },
  {
    order: 31,
    id: "live-read-only-window-evidence-intake-ledger-types",
    modulePath:
      "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerTypes.ts",
    owns: ["manual evidence intake ledger", "intake entries", "intake ledger gates"],
    consumedBy: ["evidence intake ledger artifacts", "evidence intake ledger renderer", "profile types"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep evidence intake contracts separate from pending evidence packet contracts.",
    stopCondition: "Do not split unless manual-entry persistence or captured evidence import gains its own lifecycle.",
  },
  {
    order: 32,
    id: "live-read-only-window-evidence-intake-ledger-artifacts",
    modulePath:
      "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerArtifacts.ts",
    owns: ["intake ledger builder", "manual intake safety gates", "intake ledger digest"],
    consumedBy: ["review artifact barrel", "evidence intake ledger tests", "profile assembly"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep manual evidence intake validation with the ledger digest while it remains non-executing.",
    stopCondition: "Do not split unless the ledger starts consuming actual captured runtime evidence files.",
  },
  {
    order: 33,
    id: "live-read-only-window-evidence-intake-ledger-renderer",
    modulePath:
      "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerRenderer.ts",
    owns: ["evidence intake ledger markdown", "manual intake entry rendering"],
    consumedBy: ["review artifact barrel", "archive explanations", "future route surfaces"],
    exportsViaStableProfileTypes: true,
    maintenanceRule: "Keep intake ledger Markdown separate from ledger generation.",
    stopCondition: "Do not split unless route rendering and archive rendering diverge.",
  },
  {
    order: 34,
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
    catalogVersion: "Node v811",
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
    validationVersion: "Node v811",
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
    requiresFreshSiblingEvidence: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}
