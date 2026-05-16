import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
} from "./liveProbeReportUtils.js";
import {
  collectReadinessGateProductionBlockers,
  collectReadinessGateRecommendations,
  collectReadinessGateWarnings,
  createManagedAuditAdapterProductionHardeningGateDigest,
  MANAGED_AUDIT_ADAPTER_PRODUCTION_HARDENING_ENDPOINTS,
  MANAGED_AUDIT_ADAPTER_PRODUCTION_HARDENING_PREREQUISITES,
  type ManagedAuditAdapterProductionHardeningReadinessGateChecks,
  type ReadinessGateMessage,
} from "./managedAuditAdapterProductionHardeningReadinessGateHelpers.js";
import {
  loadManagedAuditDryRunAdapterArchiveVerification,
  type ManagedAuditDryRunAdapterArchiveVerificationProfile,
} from "./managedAuditDryRunAdapterArchiveVerification.js";

export interface ManagedAuditAdapterProductionHardeningReadinessGateProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-adapter-production-hardening-readiness-gate.v1";
  gateState: "ready-for-production-hardening-review" | "blocked";
  readyForManagedAuditAdapterProductionHardeningReadinessGate: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnlyGate: true;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  connectsManagedAudit: false;
  localDryRunWritePerformed: false;
  automaticUpstreamStart: false;
  sourceArchiveVerification: {
    sourceVersion: "Node v216";
    profileVersion: ManagedAuditDryRunAdapterArchiveVerificationProfile["profileVersion"];
    verificationState: ManagedAuditDryRunAdapterArchiveVerificationProfile["verificationState"];
    verificationDigest: string;
    readyForArchiveVerification: boolean;
  };
  upstreamReceipts: {
    javaV78: JavaV78ManagedAuditProductionAdapterPrerequisiteReceipt;
    miniKvV87: MiniKvV87ManagedAuditAdapterNonAuthoritativeStorageReceipt;
  };
  productionHardeningGate: {
    gateDigest: string;
    evidenceSpan: "Node v216 + Java v78 + mini-kv v87";
    managedAuditStoreConfigured: boolean;
    managedAuditStoreConnected: false;
    identityApprovalLedgerBound: boolean;
    retentionRecoveryOwnerRecorded: boolean;
    failureHandlingRecorded: boolean;
    rollbackReviewRecorded: boolean;
    miniKvConfirmedNonAuthoritative: boolean;
    externalManagedAuditAccessed: false;
    javaWriteAttempted: false;
    miniKvWriteAttempted: false;
    upstreamActionsEnabled: boolean;
    productionAuditAllowed: false;
  };
  checks: {
    nodeV216ArchiveVerificationReady: boolean;
    javaV78ReceiptAccepted: boolean;
    javaV78PrerequisitesRecorded: boolean;
    javaV78NoWriteBoundaryValid: boolean;
    miniKvV87ReceiptAccepted: boolean;
    miniKvV87NonAuthoritativeBoundaryValid: boolean;
    managedAuditStoreUrlConfigured: boolean;
    realManagedAuditAdapterStillDisconnected: boolean;
    operatorIdentityPrerequisiteRecorded: boolean;
    approvalDecisionSourcePrerequisiteRecorded: boolean;
    ledgerHandoffPrerequisiteRecorded: boolean;
    retentionOwnerPrerequisiteRecorded: boolean;
    failureHandlingPrerequisiteRecorded: boolean;
    rollbackReviewPrerequisiteRecorded: boolean;
    javaMiniKvWritesStillBlocked: boolean;
    upstreamActionsStillDisabled: boolean;
    productionAuditStillBlocked: boolean;
    productionWindowStillBlocked: boolean;
    readyForManagedAuditAdapterProductionHardeningReadinessGate: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    hardPrerequisiteCount: number;
    satisfiedHardPrerequisiteCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ReadinessGateMessage[];
  warnings: ReadinessGateMessage[];
  recommendations: ReadinessGateMessage[];
  evidenceEndpoints: {
    managedAuditAdapterProductionHardeningReadinessGateJson: string;
    managedAuditAdapterProductionHardeningReadinessGateMarkdown: string;
    sourceArchiveVerificationJson: string;
    javaV78ReceiptHint: string;
    miniKvV87ReceiptHint: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface JavaV78ManagedAuditProductionAdapterPrerequisiteReceipt {
  sourceVersion: "Java v78";
  receiptVersion: "java-release-approval-rehearsal-managed-audit-production-adapter-prerequisite-receipt.v1";
  sourceManagedAuditAdapterBoundaryReceiptVersion: "java-release-approval-rehearsal-managed-audit-adapter-boundary-receipt.v1";
  consumedByNodeArchiveVerificationVersion: "Node v216";
  consumedByNodeArchiveVerificationProfile: "managed-audit-dry-run-adapter-archive-verification.v1";
  nextNodeGateVersion: "Node v217";
  nextNodeGateProfile: "managed-audit-adapter-production-hardening-readiness-gate.v1";
  operatorIdentityPrerequisiteRecorded: true;
  approvalDecisionSourcePrerequisiteRecorded: true;
  ledgerHandoffPrerequisiteRecorded: true;
  retentionOwnerPrerequisiteRecorded: true;
  failureHandlingPrerequisiteRecorded: true;
  rollbackReviewPrerequisiteRecorded: true;
  nodeV217MayConnectManagedAudit: false;
  nodeV217MayCreateApprovalDecision: false;
  nodeV217MayWriteApprovalLedger: false;
  nodeV217MayPersistApprovalRecord: false;
  nodeV217MayExecuteSql: false;
  nodeV217MayTriggerDeployment: false;
  nodeV217MayTriggerRollback: false;
  nodeV217MayExecuteRestore: false;
  javaCreatesApprovalDecision: false;
  javaWritesApprovalLedger: false;
  javaPersistsApprovalRecord: false;
  javaWritesManagedAuditStore: false;
  javaExecutesSql: false;
  readyForNodeV217ProductionHardeningReadinessGate: true;
}

interface MiniKvV87ManagedAuditAdapterNonAuthoritativeStorageReceipt {
  sourceVersion: "mini-kv v87";
  projectVersion: "0.87.0";
  receiptVersion: "mini-kv-managed-audit-adapter-non-authoritative-storage-receipt.v1";
  consumer: "Node v217 managed audit adapter production-hardening readiness gate";
  consumedReleaseVersion: "v86";
  consumedReceiptDigest: "fnv1a64:f39d8e3ef98654ea";
  currentArtifactPathHint: "c/87/";
  receiptDigest: "fnv1a64:111f0daf1283eab6";
  managedAuditStore: false;
  storageWriteAllowed: false;
  adminCommandsAllowed: false;
  restoreExecutionAllowed: false;
  loadRestoreCompactExecuted: false;
  managedAuditWriteExecuted: false;
  orderAuthoritative: false;
  readyForNodeV217ProductionHardeningReadinessGate: true;
}

export function loadManagedAuditAdapterProductionHardeningReadinessGate(input: {
  config: AppConfig;
}): ManagedAuditAdapterProductionHardeningReadinessGateProfile {
  const sourceArchive = loadManagedAuditDryRunAdapterArchiveVerification({ config: input.config });
  const javaV78 = createJavaV78Receipt();
  const miniKvV87 = createMiniKvV87Receipt();
  const checks = createChecks(input.config, sourceArchive, javaV78, miniKvV87);
  checks.readyForManagedAuditAdapterProductionHardeningReadinessGate = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditAdapterProductionHardeningReadinessGate")
    .every(([, value]) => value);
  const gateState = checks.readyForManagedAuditAdapterProductionHardeningReadinessGate
    ? "ready-for-production-hardening-review"
    : "blocked";
  const gateDigest = createManagedAuditAdapterProductionHardeningGateDigest({
    gateState,
    sourceArchiveDigest: sourceArchive.verification.verificationDigest,
    javaReceiptVersion: javaV78.receiptVersion,
    miniKvReceiptDigest: miniKvV87.receiptDigest,
    checks,
  });
  const productionHardeningGate = {
    gateDigest,
    evidenceSpan: "Node v216 + Java v78 + mini-kv v87" as const,
    managedAuditStoreConfigured: checks.managedAuditStoreUrlConfigured,
    managedAuditStoreConnected: false as const,
    identityApprovalLedgerBound: checks.operatorIdentityPrerequisiteRecorded
      && checks.approvalDecisionSourcePrerequisiteRecorded
      && checks.ledgerHandoffPrerequisiteRecorded,
    retentionRecoveryOwnerRecorded: checks.retentionOwnerPrerequisiteRecorded,
    failureHandlingRecorded: checks.failureHandlingPrerequisiteRecorded,
    rollbackReviewRecorded: checks.rollbackReviewPrerequisiteRecorded,
    miniKvConfirmedNonAuthoritative: checks.miniKvV87NonAuthoritativeBoundaryValid,
    externalManagedAuditAccessed: false as const,
    javaWriteAttempted: false as const,
    miniKvWriteAttempted: false as const,
    upstreamActionsEnabled: input.config.upstreamActionsEnabled,
    productionAuditAllowed: false as const,
  };
  const productionBlockers = collectReadinessGateProductionBlockers(checks);
  const warnings = collectReadinessGateWarnings();
  const recommendations = collectReadinessGateRecommendations();
  const satisfiedHardPrerequisiteCount = [
    checks.managedAuditStoreUrlConfigured,
    checks.operatorIdentityPrerequisiteRecorded,
    checks.approvalDecisionSourcePrerequisiteRecorded,
    checks.ledgerHandoffPrerequisiteRecorded,
    checks.retentionOwnerPrerequisiteRecorded,
    checks.failureHandlingPrerequisiteRecorded,
    checks.rollbackReviewPrerequisiteRecorded,
    checks.miniKvV87NonAuthoritativeBoundaryValid,
  ].filter(Boolean).length;

  return {
    service: "orderops-node",
    title: "Managed audit adapter production-hardening readiness gate",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-adapter-production-hardening-readiness-gate.v1",
    gateState,
    readyForManagedAuditAdapterProductionHardeningReadinessGate:
      checks.readyForManagedAuditAdapterProductionHardeningReadinessGate,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyGate: true,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    connectsManagedAudit: false,
    localDryRunWritePerformed: false,
    automaticUpstreamStart: false,
    sourceArchiveVerification: {
      sourceVersion: "Node v216",
      profileVersion: sourceArchive.profileVersion,
      verificationState: sourceArchive.verificationState,
      verificationDigest: sourceArchive.verification.verificationDigest,
      readyForArchiveVerification: sourceArchive.readyForManagedAuditDryRunAdapterArchiveVerification,
    },
    upstreamReceipts: {
      javaV78,
      miniKvV87,
    },
    productionHardeningGate,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      hardPrerequisiteCount: MANAGED_AUDIT_ADAPTER_PRODUCTION_HARDENING_PREREQUISITES.length,
      satisfiedHardPrerequisiteCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...MANAGED_AUDIT_ADAPTER_PRODUCTION_HARDENING_ENDPOINTS },
    nextActions: [
      "Keep the v217 gate read-only; it is a production-hardening review gate, not a production audit adapter.",
      "Use the next plan to split audit route registration and managed audit service helpers before implementing real adapter wiring.",
      "Do not connect real managed audit storage until identity, approval ledger, retention, recovery, and rollback owners approve the target.",
    ],
  };
}

export function renderManagedAuditAdapterProductionHardeningReadinessGateMarkdown(
  profile: ManagedAuditAdapterProductionHardeningReadinessGateProfile,
): string {
  return [
    "# Managed audit adapter production-hardening readiness gate",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Gate state: ${profile.gateState}`,
    `- Ready for production-hardening gate: ${profile.readyForManagedAuditAdapterProductionHardeningReadinessGate}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Ready for production window: ${profile.readyForProductionWindow}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    `- Restore execution allowed: ${profile.restoreExecutionAllowed}`,
    "",
    "## Source Archive Verification",
    "",
    ...renderEntries(profile.sourceArchiveVerification),
    "",
    "## Java v78 Receipt",
    "",
    ...renderEntries(profile.upstreamReceipts.javaV78),
    "",
    "## mini-kv v87 Receipt",
    "",
    ...renderEntries(profile.upstreamReceipts.miniKvV87),
    "",
    "## Production Hardening Gate",
    "",
    ...renderEntries(profile.productionHardeningGate),
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
    ...renderMessages(profile.productionBlockers, "No blockers for this readiness gate."),
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

function createJavaV78Receipt(): JavaV78ManagedAuditProductionAdapterPrerequisiteReceipt {
  return {
    sourceVersion: "Java v78",
    receiptVersion: "java-release-approval-rehearsal-managed-audit-production-adapter-prerequisite-receipt.v1",
    sourceManagedAuditAdapterBoundaryReceiptVersion:
      "java-release-approval-rehearsal-managed-audit-adapter-boundary-receipt.v1",
    consumedByNodeArchiveVerificationVersion: "Node v216",
    consumedByNodeArchiveVerificationProfile: "managed-audit-dry-run-adapter-archive-verification.v1",
    nextNodeGateVersion: "Node v217",
    nextNodeGateProfile: "managed-audit-adapter-production-hardening-readiness-gate.v1",
    operatorIdentityPrerequisiteRecorded: true,
    approvalDecisionSourcePrerequisiteRecorded: true,
    ledgerHandoffPrerequisiteRecorded: true,
    retentionOwnerPrerequisiteRecorded: true,
    failureHandlingPrerequisiteRecorded: true,
    rollbackReviewPrerequisiteRecorded: true,
    nodeV217MayConnectManagedAudit: false,
    nodeV217MayCreateApprovalDecision: false,
    nodeV217MayWriteApprovalLedger: false,
    nodeV217MayPersistApprovalRecord: false,
    nodeV217MayExecuteSql: false,
    nodeV217MayTriggerDeployment: false,
    nodeV217MayTriggerRollback: false,
    nodeV217MayExecuteRestore: false,
    javaCreatesApprovalDecision: false,
    javaWritesApprovalLedger: false,
    javaPersistsApprovalRecord: false,
    javaWritesManagedAuditStore: false,
    javaExecutesSql: false,
    readyForNodeV217ProductionHardeningReadinessGate: true,
  };
}

function createMiniKvV87Receipt(): MiniKvV87ManagedAuditAdapterNonAuthoritativeStorageReceipt {
  return {
    sourceVersion: "mini-kv v87",
    projectVersion: "0.87.0",
    receiptVersion: "mini-kv-managed-audit-adapter-non-authoritative-storage-receipt.v1",
    consumer: "Node v217 managed audit adapter production-hardening readiness gate",
    consumedReleaseVersion: "v86",
    consumedReceiptDigest: "fnv1a64:f39d8e3ef98654ea",
    currentArtifactPathHint: "c/87/",
    receiptDigest: "fnv1a64:111f0daf1283eab6",
    managedAuditStore: false,
    storageWriteAllowed: false,
    adminCommandsAllowed: false,
    restoreExecutionAllowed: false,
    loadRestoreCompactExecuted: false,
    managedAuditWriteExecuted: false,
    orderAuthoritative: false,
    readyForNodeV217ProductionHardeningReadinessGate: true,
  };
}

function createChecks(
  config: AppConfig,
  sourceArchive: ManagedAuditDryRunAdapterArchiveVerificationProfile,
  javaV78: JavaV78ManagedAuditProductionAdapterPrerequisiteReceipt,
  miniKvV87: MiniKvV87ManagedAuditAdapterNonAuthoritativeStorageReceipt,
): ManagedAuditAdapterProductionHardeningReadinessGateProfile["checks"] {
  return {
    nodeV216ArchiveVerificationReady: sourceArchive.readyForManagedAuditDryRunAdapterArchiveVerification
      && sourceArchive.verificationState === "verified-dry-run-adapter-archive",
    javaV78ReceiptAccepted: javaV78.readyForNodeV217ProductionHardeningReadinessGate
      && javaV78.consumedByNodeArchiveVerificationVersion === "Node v216",
    javaV78PrerequisitesRecorded: javaV78.operatorIdentityPrerequisiteRecorded
      && javaV78.approvalDecisionSourcePrerequisiteRecorded
      && javaV78.ledgerHandoffPrerequisiteRecorded
      && javaV78.retentionOwnerPrerequisiteRecorded
      && javaV78.failureHandlingPrerequisiteRecorded
      && javaV78.rollbackReviewPrerequisiteRecorded,
    javaV78NoWriteBoundaryValid: !javaV78.nodeV217MayConnectManagedAudit
      && !javaV78.nodeV217MayCreateApprovalDecision
      && !javaV78.nodeV217MayWriteApprovalLedger
      && !javaV78.nodeV217MayPersistApprovalRecord
      && !javaV78.nodeV217MayExecuteSql
      && !javaV78.nodeV217MayTriggerDeployment
      && !javaV78.nodeV217MayTriggerRollback
      && !javaV78.nodeV217MayExecuteRestore
      && !javaV78.javaCreatesApprovalDecision
      && !javaV78.javaWritesApprovalLedger
      && !javaV78.javaPersistsApprovalRecord
      && !javaV78.javaWritesManagedAuditStore
      && !javaV78.javaExecutesSql,
    miniKvV87ReceiptAccepted: miniKvV87.readyForNodeV217ProductionHardeningReadinessGate
      && miniKvV87.consumedReleaseVersion === "v86"
      && miniKvV87.consumedReceiptDigest === "fnv1a64:f39d8e3ef98654ea",
    miniKvV87NonAuthoritativeBoundaryValid: !miniKvV87.managedAuditStore
      && !miniKvV87.storageWriteAllowed
      && !miniKvV87.adminCommandsAllowed
      && !miniKvV87.restoreExecutionAllowed
      && !miniKvV87.loadRestoreCompactExecuted
      && !miniKvV87.managedAuditWriteExecuted
      && !miniKvV87.orderAuthoritative,
    managedAuditStoreUrlConfigured: Boolean(config.auditStoreUrl),
    realManagedAuditAdapterStillDisconnected: true,
    operatorIdentityPrerequisiteRecorded: javaV78.operatorIdentityPrerequisiteRecorded,
    approvalDecisionSourcePrerequisiteRecorded: javaV78.approvalDecisionSourcePrerequisiteRecorded,
    ledgerHandoffPrerequisiteRecorded: javaV78.ledgerHandoffPrerequisiteRecorded,
    retentionOwnerPrerequisiteRecorded: javaV78.retentionOwnerPrerequisiteRecorded,
    failureHandlingPrerequisiteRecorded: javaV78.failureHandlingPrerequisiteRecorded,
    rollbackReviewPrerequisiteRecorded: javaV78.rollbackReviewPrerequisiteRecorded,
    javaMiniKvWritesStillBlocked: !javaV78.javaWritesManagedAuditStore
      && !javaV78.javaExecutesSql
      && !miniKvV87.storageWriteAllowed
      && !miniKvV87.adminCommandsAllowed,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditAdapterProductionHardeningReadinessGate: false,
  };
}
