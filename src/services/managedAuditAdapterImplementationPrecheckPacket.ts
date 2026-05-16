import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditRouteHelperQualityPass,
  type ManagedAuditRouteHelperQualityPassProfile,
} from "./managedAuditRouteHelperQualityPass.js";

export interface ManagedAuditAdapterImplementationPrecheckPacketProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-adapter-implementation-precheck-packet.v1";
  precheckState: "ready-for-implementation-precheck-review" | "blocked";
  readyForManagedAuditAdapterImplementationPrecheck: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnlyPrecheck: true;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  connectsManagedAudit: false;
  realAdapterWiringAllowed: false;
  automaticUpstreamStart: false;
  sourceQualityPass: {
    sourceVersion: "Node v218";
    profileVersion: ManagedAuditRouteHelperQualityPassProfile["profileVersion"];
    qualityPassState: ManagedAuditRouteHelperQualityPassProfile["qualityPassState"];
    qualityDigest: string;
    readyForQualityPass: boolean;
  };
  upstreamReceipts: {
    javaV79: JavaV79OpsEvidenceServiceQualitySplitReceipt;
    miniKvV88: MiniKvV88CommandDispatchQualityReceipt;
  };
  implementationPrecheck: {
    precheckDigest: string;
    evidenceSpan: "Node v218 + Java v79 + mini-kv v88";
    configSwitchReady: boolean;
    ownerApprovalRequired: true;
    ownerApprovalPresent: false;
    schemaMigrationRequired: true;
    schemaMigrationApproved: false;
    retentionRecoveryReady: boolean;
    failureTaxonomyReady: boolean;
    rollbackDisablePathReady: boolean;
    dryRunOnly: true;
    externalManagedAuditAccessed: false;
    javaWriteAttempted: false;
    miniKvWriteAttempted: false;
    upstreamActionsEnabled: boolean;
    productionAuditAllowed: false;
  };
  checks: {
    nodeV218QualityPassReady: boolean;
    javaV79ReceiptAccepted: boolean;
    javaV79SplitBoundariesRecorded: boolean;
    javaV79NoWriteBoundaryValid: boolean;
    miniKvV88ReceiptAccepted: boolean;
    miniKvV88DispatchBoundaryValid: boolean;
    managedAuditStoreUrlConfigured: boolean;
    ownerApprovalStillRequired: boolean;
    schemaMigrationStillRequiresReview: boolean;
    retentionRecoveryPrerequisitesRecorded: boolean;
    failureTaxonomyPrerequisitesRecorded: boolean;
    rollbackDisablePathPrerequisitesRecorded: boolean;
    javaMiniKvWritesStillBlocked: boolean;
    realAdapterWiringStillBlocked: boolean;
    upstreamActionsStillDisabled: boolean;
    productionAuditStillBlocked: boolean;
    readyForManagedAuditAdapterImplementationPrecheck: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    precheckGateCount: number;
    passedPrecheckGateCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ImplementationPrecheckMessage[];
  warnings: ImplementationPrecheckMessage[];
  recommendations: ImplementationPrecheckMessage[];
  evidenceEndpoints: {
    managedAuditAdapterImplementationPrecheckPacketJson: string;
    managedAuditAdapterImplementationPrecheckPacketMarkdown: string;
    sourceQualityPassJson: string;
    javaV79ReceiptHint: string;
    miniKvV88ReceiptHint: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface JavaV79OpsEvidenceServiceQualitySplitReceipt {
  sourceVersion: "Java v79";
  receiptVersion: "java-release-approval-rehearsal-ops-evidence-service-quality-split-receipt.v1";
  sourceProductionAdapterPrerequisiteReceiptVersion: "java-release-approval-rehearsal-managed-audit-production-adapter-prerequisite-receipt.v1";
  consumedByNodeQualityPassVersion: "Node v218";
  consumedByNodeQualityPassProfile: "managed-audit-route-helper-quality-pass.v1";
  nextNodePrecheckVersion: "Node v219";
  nextNodePrecheckProfile: "managed-audit-adapter-implementation-precheck-packet.v1";
  responsibilityBoundaries: readonly ["receipt", "digest", "hint", "render", "record"];
  safeSplitSequence: readonly ["receipt helper", "digest helper", "hint helper", "render helper", "record helper"];
  readyForNodeV219ImplementationPrecheck: true;
  apiShapeChanged: false;
  approvalDecisionCreated: false;
  approvalLedgerWritten: false;
  approvalRecordPersisted: false;
  managedAuditStoreWritten: false;
  sqlExecuted: false;
  deploymentTriggered: false;
  rollbackTriggered: false;
  restoreExecuted: false;
}

interface MiniKvV88CommandDispatchQualityReceipt {
  sourceVersion: "mini-kv v88";
  projectVersion: "0.88.0";
  receiptVersion: "mini-kv-command-dispatch-quality-receipt.v1";
  consumer: "Node v219 managed audit adapter implementation precheck packet";
  consumedReleaseVersion: "v87";
  consumedReceiptDigest: "fnv1a64:111f0daf1283eab6";
  currentArtifactPathHint: "c/88/";
  receiptDigest: "fnv1a64:4aa6d12fb067e2a6";
  dispatchFamily: "runtime_evidence_command_family";
  dispatchSplitApplied: true;
  handlerTableRequired: false;
  writeHandlerChanged: false;
  adminHandlerChanged: false;
  walSnapshotRestoreTouched: false;
  behaviorChanged: false;
  fixtureContractPreserved: true;
  readOnly: true;
  executionAllowed: false;
  orderAuthoritative: false;
  readyForNodeV219ImplementationPrecheck: true;
}

interface ImplementationPrecheckMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-adapter-implementation-precheck-packet"
    | "node-v218-quality-pass"
    | "java-v79-quality-split-receipt"
    | "mini-kv-v88-command-dispatch-quality-receipt"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  managedAuditAdapterImplementationPrecheckPacketJson:
    "/api/v1/audit/managed-audit-adapter-implementation-precheck-packet",
  managedAuditAdapterImplementationPrecheckPacketMarkdown:
    "/api/v1/audit/managed-audit-adapter-implementation-precheck-packet?format=markdown",
  sourceQualityPassJson: "/api/v1/audit/managed-audit-route-helper-quality-pass",
  javaV79ReceiptHint: "advanced-order-platform:c/79/\u89e3\u91ca/\u8bf4\u660e.md",
  miniKvV88ReceiptHint: "mini-kv:c/88/\u89e3\u91ca/\u8bf4\u660e.md",
  activePlan: "docs/plans/v217-post-production-hardening-gate-roadmap.md",
});

const PRECHECK_GATES = Object.freeze([
  "config switch documented",
  "owner approval required",
  "schema migration review required",
  "retention recovery recorded",
  "failure taxonomy recorded",
  "rollback disable path recorded",
]);

export function loadManagedAuditAdapterImplementationPrecheckPacket(input: {
  config: AppConfig;
}): ManagedAuditAdapterImplementationPrecheckPacketProfile {
  const sourceQualityPass = loadManagedAuditRouteHelperQualityPass({ config: input.config });
  const javaV79 = createJavaV79Receipt();
  const miniKvV88 = createMiniKvV88Receipt();
  const checks = createChecks(input.config, sourceQualityPass, javaV79, miniKvV88);
  checks.readyForManagedAuditAdapterImplementationPrecheck = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditAdapterImplementationPrecheck")
    .every(([, value]) => value);
  const precheckState = checks.readyForManagedAuditAdapterImplementationPrecheck
    ? "ready-for-implementation-precheck-review"
    : "blocked";
  const precheckDigest = sha256StableJson({
    profileVersion: "managed-audit-adapter-implementation-precheck-packet.v1",
    precheckState,
    nodeQualityDigest: sourceQualityPass.qualityDigest,
    javaReceiptVersion: javaV79.receiptVersion,
    miniKvReceiptDigest: miniKvV88.receiptDigest,
    checks,
    realAdapterWiringAllowed: false,
  });
  const implementationPrecheck = {
    precheckDigest,
    evidenceSpan: "Node v218 + Java v79 + mini-kv v88" as const,
    configSwitchReady: checks.managedAuditStoreUrlConfigured,
    ownerApprovalRequired: true as const,
    ownerApprovalPresent: false as const,
    schemaMigrationRequired: true as const,
    schemaMigrationApproved: false as const,
    retentionRecoveryReady: checks.retentionRecoveryPrerequisitesRecorded,
    failureTaxonomyReady: checks.failureTaxonomyPrerequisitesRecorded,
    rollbackDisablePathReady: checks.rollbackDisablePathPrerequisitesRecorded,
    dryRunOnly: true as const,
    externalManagedAuditAccessed: false as const,
    javaWriteAttempted: false as const,
    miniKvWriteAttempted: false as const,
    upstreamActionsEnabled: input.config.upstreamActionsEnabled,
    productionAuditAllowed: false as const,
  };
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const passedPrecheckGateCount = [
    checks.managedAuditStoreUrlConfigured,
    checks.ownerApprovalStillRequired,
    checks.schemaMigrationStillRequiresReview,
    checks.retentionRecoveryPrerequisitesRecorded,
    checks.failureTaxonomyPrerequisitesRecorded,
    checks.rollbackDisablePathPrerequisitesRecorded,
  ].filter(Boolean).length;

  return {
    service: "orderops-node",
    title: "Managed audit adapter implementation precheck packet",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-adapter-implementation-precheck-packet.v1",
    precheckState,
    readyForManagedAuditAdapterImplementationPrecheck: checks.readyForManagedAuditAdapterImplementationPrecheck,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyPrecheck: true,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    connectsManagedAudit: false,
    realAdapterWiringAllowed: false,
    automaticUpstreamStart: false,
    sourceQualityPass: {
      sourceVersion: "Node v218",
      profileVersion: sourceQualityPass.profileVersion,
      qualityPassState: sourceQualityPass.qualityPassState,
      qualityDigest: sourceQualityPass.qualityDigest,
      readyForQualityPass: sourceQualityPass.readyForManagedAuditRouteHelperQualityPass,
    },
    upstreamReceipts: {
      javaV79,
      miniKvV88,
    },
    implementationPrecheck,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      precheckGateCount: PRECHECK_GATES.length,
      passedPrecheckGateCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Start a new post-v219 plan before adding any real managed audit adapter implementation.",
      "Keep the first implementation version behind explicit owner approval, migration review, retention/recovery review, and rollback disable path.",
      "Do not enable production audit until the real adapter has append/query/digest/restore evidence in a dedicated version.",
    ],
  };
}

export function renderManagedAuditAdapterImplementationPrecheckPacketMarkdown(
  profile: ManagedAuditAdapterImplementationPrecheckPacketProfile,
): string {
  return [
    "# Managed audit adapter implementation precheck packet",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Precheck state: ${profile.precheckState}`,
    `- Ready for implementation precheck: ${profile.readyForManagedAuditAdapterImplementationPrecheck}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Real adapter wiring allowed: ${profile.realAdapterWiringAllowed}`,
    "",
    "## Source Quality Pass",
    "",
    ...renderEntries(profile.sourceQualityPass),
    "",
    "## Java v79 Receipt",
    "",
    ...renderEntries(profile.upstreamReceipts.javaV79),
    "",
    "## mini-kv v88 Receipt",
    "",
    ...renderEntries(profile.upstreamReceipts.miniKvV88),
    "",
    "## Implementation Precheck",
    "",
    ...renderEntries(profile.implementationPrecheck),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No blockers for this implementation precheck."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function createJavaV79Receipt(): JavaV79OpsEvidenceServiceQualitySplitReceipt {
  return {
    sourceVersion: "Java v79",
    receiptVersion: "java-release-approval-rehearsal-ops-evidence-service-quality-split-receipt.v1",
    sourceProductionAdapterPrerequisiteReceiptVersion:
      "java-release-approval-rehearsal-managed-audit-production-adapter-prerequisite-receipt.v1",
    consumedByNodeQualityPassVersion: "Node v218",
    consumedByNodeQualityPassProfile: "managed-audit-route-helper-quality-pass.v1",
    nextNodePrecheckVersion: "Node v219",
    nextNodePrecheckProfile: "managed-audit-adapter-implementation-precheck-packet.v1",
    responsibilityBoundaries: ["receipt", "digest", "hint", "render", "record"],
    safeSplitSequence: ["receipt helper", "digest helper", "hint helper", "render helper", "record helper"],
    readyForNodeV219ImplementationPrecheck: true,
    apiShapeChanged: false,
    approvalDecisionCreated: false,
    approvalLedgerWritten: false,
    approvalRecordPersisted: false,
    managedAuditStoreWritten: false,
    sqlExecuted: false,
    deploymentTriggered: false,
    rollbackTriggered: false,
    restoreExecuted: false,
  };
}

function createMiniKvV88Receipt(): MiniKvV88CommandDispatchQualityReceipt {
  return {
    sourceVersion: "mini-kv v88",
    projectVersion: "0.88.0",
    receiptVersion: "mini-kv-command-dispatch-quality-receipt.v1",
    consumer: "Node v219 managed audit adapter implementation precheck packet",
    consumedReleaseVersion: "v87",
    consumedReceiptDigest: "fnv1a64:111f0daf1283eab6",
    currentArtifactPathHint: "c/88/",
    receiptDigest: "fnv1a64:4aa6d12fb067e2a6",
    dispatchFamily: "runtime_evidence_command_family",
    dispatchSplitApplied: true,
    handlerTableRequired: false,
    writeHandlerChanged: false,
    adminHandlerChanged: false,
    walSnapshotRestoreTouched: false,
    behaviorChanged: false,
    fixtureContractPreserved: true,
    readOnly: true,
    executionAllowed: false,
    orderAuthoritative: false,
    readyForNodeV219ImplementationPrecheck: true,
  };
}

function createChecks(
  config: AppConfig,
  sourceQualityPass: ManagedAuditRouteHelperQualityPassProfile,
  javaV79: JavaV79OpsEvidenceServiceQualitySplitReceipt,
  miniKvV88: MiniKvV88CommandDispatchQualityReceipt,
): ManagedAuditAdapterImplementationPrecheckPacketProfile["checks"] {
  return {
    nodeV218QualityPassReady: sourceQualityPass.readyForManagedAuditRouteHelperQualityPass
      && sourceQualityPass.qualityPassState === "verified-quality-pass",
    javaV79ReceiptAccepted: javaV79.readyForNodeV219ImplementationPrecheck
      && javaV79.consumedByNodeQualityPassVersion === "Node v218",
    javaV79SplitBoundariesRecorded: javaV79.responsibilityBoundaries.length === 5
      && javaV79.safeSplitSequence.length === 5,
    javaV79NoWriteBoundaryValid: !javaV79.apiShapeChanged
      && !javaV79.approvalDecisionCreated
      && !javaV79.approvalLedgerWritten
      && !javaV79.approvalRecordPersisted
      && !javaV79.managedAuditStoreWritten
      && !javaV79.sqlExecuted
      && !javaV79.deploymentTriggered
      && !javaV79.rollbackTriggered
      && !javaV79.restoreExecuted,
    miniKvV88ReceiptAccepted: miniKvV88.readyForNodeV219ImplementationPrecheck
      && miniKvV88.consumedReleaseVersion === "v87"
      && miniKvV88.receiptDigest === "fnv1a64:4aa6d12fb067e2a6",
    miniKvV88DispatchBoundaryValid: miniKvV88.dispatchSplitApplied
      && miniKvV88.dispatchFamily === "runtime_evidence_command_family"
      && !miniKvV88.writeHandlerChanged
      && !miniKvV88.adminHandlerChanged
      && !miniKvV88.walSnapshotRestoreTouched
      && !miniKvV88.behaviorChanged
      && miniKvV88.fixtureContractPreserved
      && miniKvV88.readOnly
      && !miniKvV88.executionAllowed
      && !miniKvV88.orderAuthoritative,
    managedAuditStoreUrlConfigured: Boolean(config.auditStoreUrl),
    ownerApprovalStillRequired: true,
    schemaMigrationStillRequiresReview: true,
    retentionRecoveryPrerequisitesRecorded: true,
    failureTaxonomyPrerequisitesRecorded: true,
    rollbackDisablePathPrerequisitesRecorded: true,
    javaMiniKvWritesStillBlocked: !javaV79.managedAuditStoreWritten
      && !javaV79.sqlExecuted
      && !miniKvV88.writeHandlerChanged
      && !miniKvV88.adminHandlerChanged
      && !miniKvV88.executionAllowed,
    realAdapterWiringStillBlocked: true,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    readyForManagedAuditAdapterImplementationPrecheck: false,
  };
}

function collectProductionBlockers(
  checks: ManagedAuditAdapterImplementationPrecheckPacketProfile["checks"],
): ImplementationPrecheckMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: ImplementationPrecheckMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.nodeV218QualityPassReady,
      code: "NODE_V218_QUALITY_PASS_NOT_READY",
      source: "node-v218-quality-pass",
      message: "Node v218 route/helper quality pass must be ready before implementation precheck.",
    },
    {
      condition: checks.javaV79ReceiptAccepted,
      code: "JAVA_V79_RECEIPT_NOT_ACCEPTED",
      source: "java-v79-quality-split-receipt",
      message: "Java v79 quality split receipt is missing or not accepted.",
    },
    {
      condition: checks.miniKvV88ReceiptAccepted,
      code: "MINI_KV_V88_RECEIPT_NOT_ACCEPTED",
      source: "mini-kv-v88-command-dispatch-quality-receipt",
      message: "mini-kv v88 command dispatch quality receipt is missing or not accepted.",
    },
    {
      condition: checks.javaV79NoWriteBoundaryValid && checks.miniKvV88DispatchBoundaryValid,
      code: "QUALITY_RECEIPT_BOUNDARY_NOT_VALID",
      source: "managed-audit-adapter-implementation-precheck-packet",
      message: "Java or mini-kv quality receipts do not preserve the no-write implementation boundary.",
    },
    {
      condition: checks.managedAuditStoreUrlConfigured,
      code: "AUDIT_STORE_URL_MISSING",
      source: "runtime-config",
      message: "AUDIT_STORE_URL must identify the future managed audit target for implementation precheck.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during implementation precheck.",
    },
  ];

  return rules
    .filter((rule) => !rule.condition)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker" as const,
      source: rule.source,
      message: rule.message,
    }));
}

function collectWarnings(): ImplementationPrecheckMessage[] {
  return [
    {
      code: "REAL_ADAPTER_WIRING_STILL_BLOCKED",
      severity: "warning",
      source: "managed-audit-adapter-implementation-precheck-packet",
      message: "The precheck can be review-ready while real managed audit adapter wiring remains blocked.",
    },
    {
      code: "OWNER_AND_MIGRATION_REVIEW_REQUIRED",
      severity: "warning",
      source: "managed-audit-adapter-implementation-precheck-packet",
      message: "Owner approval and schema migration review are required before any real adapter implementation version.",
    },
  ];
}

function collectRecommendations(): ImplementationPrecheckMessage[] {
  return [
    {
      code: "START_POST_V219_PLAN",
      severity: "recommendation",
      source: "managed-audit-adapter-implementation-precheck-packet",
      message: "Open a new post-v219 plan before implementing any real adapter wiring.",
    },
    {
      code: "KEEP_REAL_ADAPTER_BEHIND_EXPLICIT_SWITCHES",
      severity: "recommendation",
      source: "runtime-config",
      message: "Real adapter implementation should stay behind explicit config switches and owner-approved migration/rollback rules.",
    },
  ];
}
