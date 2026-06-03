import type {
  ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlanTypes.js";
import type {
  ControlledReadOnlyShardPreviewSourceMatrixReviewChecklist,
  ControlledReadOnlyShardPreviewSourceMatrixReviewDigest,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewDecisionTypes.js";
import type {
  ControlledReadOnlyShardPreviewSourceMatrixArchiveSnapshot,
  ControlledReadOnlyShardPreviewSourceMatrixArchiveSnapshotSummaryExport,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewArchiveTypes.js";
import type {
  ControlledReadOnlyShardPreviewSourceMatrixHandoffNotes,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffTypes.js";
import type {
  ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumer,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerExport,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceipt,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffConsumerTypes.js";
import type {
  ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffReceiptArchiveTypes.js";
import type {
  ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverage,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRouteCoverageTypes.js";

export type {
  ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan,
  ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlanStep,
  ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlanStepCode,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlanTypes.js";

export type {
  ControlledReadOnlyShardPreviewSourceMatrixReviewChecklist,
  ControlledReadOnlyShardPreviewSourceMatrixReviewChecklistItem,
  ControlledReadOnlyShardPreviewSourceMatrixReviewDigest,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewDecisionTypes.js";

export type {
  ControlledReadOnlyShardPreviewSourceMatrixArchiveSnapshot,
  ControlledReadOnlyShardPreviewSourceMatrixArchiveSnapshotSummaryExport,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewArchiveTypes.js";

export type {
  ControlledReadOnlyShardPreviewSourceMatrixHandoffAudience,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffNote,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffNotes,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffTypes.js";

export type {
  ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumer,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerExport,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerGates,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceipt,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffConsumerTypes.js";

export type {
  ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveVerificationGates,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffReceiptArchiveTypes.js";

export type {
  ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverage,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageVerification,
  ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageVerificationGates,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRouteCoverageTypes.js";

export type PreviewProject = "advanced-order-platform" | "mini-kv";
export type PreviewStatus = "passed-read" | "failed-read" | "skipped-probes-disabled";
export type PreviewTransport = "http-json" | "tcp-command";
export type PreviewMessageSource = "java-shard-preview" | "mini-kv-shard-preview" | "runtime-boundary" | "next-plan";
export type ControlledReadOnlyShardPreviewSource = "java" | "miniKv";

export interface ControlledReadOnlyShardPreviewObservationPreview {
  version: string | null;
  releaseVersion: string | null;
  shardEnabled: boolean | null;
  shardCount: number | null;
  slotCount: number | null;
  routingMode: string | null;
  status: string | null;
  shardMapCount: number | null;
  keyRoutingSampleCount: number | null;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixEntry {
  source: ControlledReadOnlyShardPreviewSource;
  project: PreviewProject;
  version: string | null;
  releaseVersion: string | null;
  status: PreviewStatus;
  readyForPreview: boolean;
  readOnlySafe: boolean;
  executionBlocked: boolean;
  shardEnabled: boolean | null;
  shardCount: number | null;
  slotCount: number | null;
  routingMode: string | null;
  endpoint: string;
  command: string | null;
  latencyMs: number | null;
}

export interface ControlledReadOnlyShardPreviewSourceMatrix {
  sources: ControlledReadOnlyShardPreviewSourceMatrixEntry[];
  sourceCount: number;
  readySourceCount: number;
  failedSourceCount: number;
  skippedSourceCount: number;
  routingModes: string[];
  shardCountDelta: number | null;
  slotCountDelta: number | null;
  shardCountsComparable: boolean;
  slotCountsComparable: boolean;
  allSourcesReady: boolean;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixConsumerGates {
  observedRequiredSources: boolean;
  allSourcesReady: boolean;
  shardCountsComparable: boolean;
  slotCountsComparable: boolean;
  routingModesDeclared: boolean;
  readOnlyConsumerOnly: true;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixConsumerComparison {
  routingModes: string[];
  routingModeCount: number;
  javaShardCount: number | null;
  miniKvShardCount: number | null;
  shardCountDelta: number | null;
  javaSlotCount: number | null;
  miniKvSlotCount: number | null;
  slotCountDelta: number | null;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixConsumer {
  consumerVersion: "Node v599";
  inputSourceVersion: "Node v598";
  decision: "ready-for-controlled-read-only-consumption" | "blocked";
  readyForControlledReadOnlyConsumption: boolean;
  requiredSources: ControlledReadOnlyShardPreviewSource[];
  observedSources: ControlledReadOnlyShardPreviewSource[];
  missingSources: ControlledReadOnlyShardPreviewSource[];
  gateCount: number;
  passedGateCount: number;
  gates: ControlledReadOnlyShardPreviewSourceMatrixConsumerGates;
  comparison: ControlledReadOnlyShardPreviewSourceMatrixConsumerComparison;
  blockedReasonCodes: string[];
  activatesRouting: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export type ControlledReadOnlyShardPreviewSourceMatrixDriftDimension =
  "consumerReadiness" | "routingMode" | "shardCount" | "slotCount";

export interface ControlledReadOnlyShardPreviewSourceMatrixDriftFinding {
  dimension: ControlledReadOnlyShardPreviewSourceMatrixDriftDimension;
  status: "aligned" | "drift-detected" | "not-comparable" | "blocked";
  severity: "info" | "warning" | "blocker";
  javaValue: string | number | null;
  miniKvValue: string | number | null;
  message: string;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixDriftSummary {
  summaryVersion: "Node v600";
  inputConsumerVersion: "Node v599";
  driftState: "aligned" | "controlled-drift-detected" | "blocked";
  readyForControlledDriftReview: boolean;
  findingCount: number;
  driftFindingCount: number;
  blockingFindingCount: number;
  comparableFindingCount: number;
  findings: ControlledReadOnlyShardPreviewSourceMatrixDriftFinding[];
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSnapshot {
  snapshotVersion: "Node v622";
  inputVerificationVersion: "Node v621";
  snapshotState: "ready-for-read-only-handoff-route-coverage-archive" | "blocked";
  readyForReadOnlyHandoffRouteCoverageArchive: boolean;
  coverageDigestValue: string;
  snapshotDigest: {
    algorithm: "sha256";
    scope: "handoff-route-coverage-archive-snapshot";
    value: string;
    coveredSectionCount: number;
  };
  archivedSections: string[];
  archivedSectionCount: number;
  verificationGateCount: number;
  verificationPassedGateCount: number;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveVerificationGates {
  snapshotReady: boolean;
  snapshotDigestPresent: boolean;
  archivedSectionsComplete: boolean;
  verificationGatesPreserved: boolean;
  noRoutingActivationRequired: boolean;
  noFreshSiblingEvidenceRequired: boolean;
  readOnlyVerificationOnly: true;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveVerification {
  verificationVersion: "Node v623";
  inputSnapshotVersion: "Node v622";
  verificationState: "ready-for-read-only-handoff-route-coverage-archive-verification" | "blocked";
  readyForReadOnlyHandoffRouteCoverageArchiveVerification: boolean;
  gateCount: number;
  passedGateCount: number;
  gates: ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveVerificationGates;
  blockedReasonCodes: string[];
  snapshotDigestValue: string;
  archivedSectionCount: number;
  verificationGateCount: number;
  verificationPassedGateCount: number;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummary {
  summaryVersion: "Node v624";
  inputVerificationVersion: "Node v623";
  summaryState: "ready-for-read-only-handoff-route-coverage-archive-summary" | "blocked";
  readyForReadOnlyHandoffRouteCoverageArchiveSummary: boolean;
  verificationState:
    ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveVerification["verificationState"];
  snapshotDigestValue: string;
  summaryDigest: {
    algorithm: "sha256";
    scope: "handoff-route-coverage-archive-summary-lines";
    value: string;
    coveredLineCount: number;
  };
  summaryLines: string[];
  summaryLineCount: number;
  gateCount: number;
  passedGateCount: number;
  archivedSectionCount: number;
  blockedReasonCount: number;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceipt {
  receiptVersion: "Node v625";
  inputSummaryVersion: "Node v624";
  receiptState: "ready-for-read-only-handoff-route-coverage-archive-summary-receipt" | "blocked";
  readyForReadOnlyHandoffRouteCoverageArchiveSummaryReceipt: boolean;
  summaryState: ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummary["summaryState"];
  summaryDigestValue: string;
  receiptDigest: {
    algorithm: "sha256";
    scope: "handoff-route-coverage-archive-summary-receipt";
    value: string;
    coveredSummaryLineCount: number;
    coveredBlockedReasonCount: number;
  };
  receiptLines: string[];
  receiptLineCount: number;
  summaryLineCount: number;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCount: number;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot {
  snapshotVersion: "Node v626";
  inputReceiptVersion: "Node v625";
  snapshotState: "ready-for-read-only-handoff-route-coverage-archive-summary-receipt-archive" | "blocked";
  readyForReadOnlyHandoffRouteCoverageArchiveSummaryReceiptArchive: boolean;
  receiptDigestValue: string;
  snapshotDigest: {
    algorithm: "sha256";
    scope: "handoff-route-coverage-archive-summary-receipt-archive-snapshot";
    value: string;
    coveredSectionCount: number;
  };
  archivedSections: string[];
  archivedSectionCount: number;
  receiptLineCount: number;
  summaryLineCount: number;
  blockedReasonCount: number;
  includesRawCredential: false;
  includesRuntimePayload: false;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerificationGates {
  snapshotReady: boolean;
  snapshotDigestPresent: boolean;
  archivedSectionsComplete: boolean;
  excludesRawCredential: boolean;
  excludesRuntimePayload: boolean;
  noRoutingActivationRequired: boolean;
  noFreshSiblingEvidenceRequired: boolean;
  readOnlyVerificationOnly: true;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification {
  verificationVersion: "Node v627";
  inputSnapshotVersion: "Node v626";
  verificationState: "ready-for-read-only-handoff-route-coverage-archive-summary-receipt-archive-verification" | "blocked";
  readyForReadOnlyHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification: boolean;
  gateCount: number;
  passedGateCount: number;
  gates: ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerificationGates;
  blockedReasonCodes: string[];
  snapshotDigestValue: string;
  archivedSectionCount: number;
  receiptLineCount: number;
  summaryLineCount: number;
  blockedReasonCount: number;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewObservation {
  project: PreviewProject;
  attempted: boolean;
  status: PreviewStatus;
  transport: PreviewTransport;
  endpoint: string;
  command: string | null;
  statusCode: number | null;
  latencyMs: number | null;
  errorCode: string | null;
  errorMessage: string | null;
  evidence: Record<string, unknown> | null;
  preview: ControlledReadOnlyShardPreviewObservationPreview;
  requiredFieldCount: number;
  presentRequiredFieldCount: number;
  missingRequiredFields: string[];
  readOnlySafe: boolean;
  executionBlocked: boolean;
  shardShapeValid: boolean;
  statusAccepted: boolean;
  boundarySafe: boolean;
  readyForPreview: boolean;
}

export interface ControlledReadOnlyShardPreviewMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: PreviewMessageSource;
  message: string;
}

export interface ControlledReadOnlyShardPreviewChecks {
  upstreamProbesEnabledForPreview: boolean;
  upstreamActionsDisabled: boolean;
  javaPreviewAttempted: boolean;
  javaPreviewPassed: boolean;
  javaReadOnlySafe: boolean;
  javaExecutionBlocked: boolean;
  miniKvPreviewAttempted: boolean;
  miniKvPreviewPassed: boolean;
  miniKvReadOnlySafe: boolean;
  miniKvExecutionBlocked: boolean;
  miniKvBoundarySafe: boolean;
  bothPreviewsReady: boolean;
  nodeDoesNotStartUpstreams: boolean;
  nodeDoesNotStopUpstreams: boolean;
  nodeDoesNotMutateSiblingState: boolean;
  noActiveShardRouter: boolean;
  noWriteRouting: boolean;
  noLoadRestoreCompact: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  previewDigestStable: boolean;
  sourceMatrixConsumptionPlanReady: boolean;
  sourceMatrixConsumptionPlanHasNoBlockedSteps: boolean;
  sourceMatrixConsumptionPlanHasNoUnsafeSteps: boolean;
  sourceMatrixConsumptionPlanRiskAccepted: boolean;
  sourceMatrixConsumptionPlanPromotionHoldSafe: boolean;
  sourceMatrixConsumptionPlanPromotionHoldClosureReady: boolean;
  sourceMatrixConsumptionPlanReadOnlyReviewScopeSafe: boolean;
  sourceMatrixConsumptionPlanReadOnlyReviewScopeDigestStable: boolean;
  productionWindowStillBlocked: boolean;
  readyForControlledReadOnlyShardPreview: boolean;
}

export interface ControlledReadOnlyShardPreviewSummary {
  checkCount: number;
  passedCheckCount: number;
  attemptedReadCount: number;
  passedReadCount: number;
  failedReadCount: number;
  skippedReadCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface ControlledReadOnlyShardPreviewProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-controlled-read-only-shard-preview.v1";
  previewState: "controlled-read-only-shard-preview-ready" | "blocked";
  previewDecision: "preview-java-and-mini-kv-shard-readiness" | "blocked";
  readyForControlledReadOnlyShardPreview: boolean;
  activeNodeVersion: "Node v638";
  sourceNodeVersion: "Node v637";
  consumesNodeV580MaturityRunCloseout: true;
  previewOnly: true;
  liveReadOnly: true;
  executionAllowed: false;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  activeShardRouterAllowed: false;
  writeRoutingAllowed: false;
  loadRestoreCompactAllowed: false;
  connectsManagedAudit: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  reads: {
    java: ControlledReadOnlyShardPreviewObservation;
    miniKv: ControlledReadOnlyShardPreviewObservation;
  };
  preview: {
    java: ControlledReadOnlyShardPreviewObservationPreview;
    miniKv: ControlledReadOnlyShardPreviewObservationPreview;
    combinedSlotCount: number | null;
    combinedShardCount: number | null;
    bothReadOnly: boolean;
    bothExecutionBlocked: boolean;
    sourceMatrix: ControlledReadOnlyShardPreviewSourceMatrix;
    sourceMatrixConsumer: ControlledReadOnlyShardPreviewSourceMatrixConsumer;
    sourceMatrixDriftSummary: ControlledReadOnlyShardPreviewSourceMatrixDriftSummary;
    sourceMatrixConsumptionPlan: ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan;
    sourceMatrixReviewChecklist: ControlledReadOnlyShardPreviewSourceMatrixReviewChecklist;
    sourceMatrixReviewDigest: ControlledReadOnlyShardPreviewSourceMatrixReviewDigest;
    sourceMatrixArchiveSnapshot: ControlledReadOnlyShardPreviewSourceMatrixArchiveSnapshot;
    sourceMatrixArchiveSnapshotSummaryExport: ControlledReadOnlyShardPreviewSourceMatrixArchiveSnapshotSummaryExport;
    sourceMatrixHandoffNotes: ControlledReadOnlyShardPreviewSourceMatrixHandoffNotes;
    sourceMatrixHandoffSummary: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummary;
    sourceMatrixHandoffSummaryConsumer: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumer;
    sourceMatrixHandoffSummaryConsumerExport: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerExport;
    sourceMatrixHandoffSummaryConsumerReceipt: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceipt;
    sourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot:
      ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot;
    sourceMatrixHandoffSummaryConsumerReceiptArchiveVerification:
      ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification;
    sourceMatrixHandoffRouteCoverage: ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverage;
    sourceMatrixHandoffRouteCoverageVerification:
      ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageVerification;
    sourceMatrixHandoffRouteCoverageArchiveSnapshot:
      ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSnapshot;
    sourceMatrixHandoffRouteCoverageArchiveVerification:
      ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveVerification;
    sourceMatrixHandoffRouteCoverageArchiveSummary:
      ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummary;
    sourceMatrixHandoffRouteCoverageArchiveSummaryReceipt:
      ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceipt;
    sourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot:
      ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot;
    sourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification:
      ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification;
    previewDigest: string;
  };
  checks: ControlledReadOnlyShardPreviewChecks;
  summary: ControlledReadOnlyShardPreviewSummary;
  productionBlockers: ControlledReadOnlyShardPreviewMessage[];
  warnings: ControlledReadOnlyShardPreviewMessage[];
  recommendations: ControlledReadOnlyShardPreviewMessage[];
  evidenceEndpoints: {
    controlledReadOnlyShardPreviewJson: string;
    controlledReadOnlyShardPreviewMarkdown: string;
    javaShardReadinessEndpoint: string;
    miniKvShardJsonCommand: "SHARDJSON";
    sourceNodeV580ArchiveIndex: "e/README.md";
    nextNodeVersion: "Node v639";
  };
  nextActions: string[];
}
