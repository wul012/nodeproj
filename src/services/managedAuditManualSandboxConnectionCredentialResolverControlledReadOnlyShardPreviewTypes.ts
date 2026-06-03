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

export interface ControlledReadOnlyShardPreviewSourceMatrixReviewChecklistItem {
  order: number;
  check:
    | "confirm-source-matrix-consumer"
    | "review-controlled-drift-findings"
    | "confirm-routing-remains-disabled"
    | "confirm-sibling-projects-can-continue";
  status: "ready" | "needs-review" | "blocked";
  severity: "info" | "warning" | "blocker";
  evidence: string;
  operatorAction: string;
  routingActivationAllowed: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixReviewChecklist {
  checklistVersion: "Node v601";
  inputDriftSummaryVersion: "Node v600";
  checklistState: "ready-for-controlled-review" | "blocked";
  readyForOperatorReview: boolean;
  itemCount: number;
  readyItemCount: number;
  reviewItemCount: number;
  blockedItemCount: number;
  items: ControlledReadOnlyShardPreviewSourceMatrixReviewChecklistItem[];
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixReviewDigest {
  digestVersion: "Node v602";
  inputChecklistVersion: "Node v601";
  algorithm: "sha256";
  value: string;
  coveredFields: string[];
  readyForControlledReviewArchive: boolean;
  checklistState: ControlledReadOnlyShardPreviewSourceMatrixReviewChecklist["checklistState"];
  itemCount: number;
  blockedItemCount: number;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixArchiveSnapshot {
  snapshotVersion: "Node v603";
  inputReviewDigestVersion: "Node v602";
  archiveState: "ready-for-controlled-review-archive" | "blocked";
  readyForControlledReviewArchive: boolean;
  digestValue: string;
  archivedSections: string[];
  archivedSectionCount: number;
  checklistState: ControlledReadOnlyShardPreviewSourceMatrixReviewDigest["checklistState"];
  itemCount: number;
  blockedItemCount: number;
  includesRawCredential: false;
  includesRuntimePayload: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixArchiveSnapshotSummaryExport {
  exportVersion: "Node v605";
  inputArchiveSnapshotVersion: "Node v603";
  exportState: "ready-for-summary-export" | "blocked";
  readyForSummaryExport: boolean;
  digestValue: string;
  summaryDigest: {
    algorithm: "sha256";
    scope: "archive-snapshot-summary-lines";
    value: string;
    coveredLineCount: number;
  };
  summaryLines: string[];
  summaryLineCount: number;
  archivedSectionCount: number;
  blockedItemCount: number;
  includesRawCredential: false;
  includesRuntimePayload: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffNote {
  order: number;
  audience: "operator" | "node" | "java" | "miniKv";
  message: string;
  actionRequired: boolean;
  routingActivationAllowed: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffNotes {
  notesVersion: "Node v608";
  inputSummaryExportVersion: "Node v605";
  handoffState: "ready-for-read-only-handoff" | "blocked";
  readyForReadOnlyHandoff: boolean;
  handoffDigest: {
    algorithm: "sha256";
    scope: "read-only-handoff-notes";
    value: string;
    coveredNoteCount: number;
  };
  noteCount: number;
  actionRequiredCount: number;
  notes: ControlledReadOnlyShardPreviewSourceMatrixHandoffNote[];
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export type ControlledReadOnlyShardPreviewSourceMatrixHandoffAudience =
  ControlledReadOnlyShardPreviewSourceMatrixHandoffNote["audience"];

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffSummary {
  summaryVersion: "Node v611";
  inputNotesVersion: "Node v608";
  summaryState: "ready-for-read-only-handoff-summary" | "blocked";
  readyForReadOnlyHandoffSummary: boolean;
  audiences: ControlledReadOnlyShardPreviewSourceMatrixHandoffAudience[];
  audienceCount: number;
  actionRequiredCount: number;
  handoffDigestValue: string;
  summaryDigest: {
    algorithm: "sha256";
    scope: "read-only-handoff-summary";
    value: string;
    coveredAudienceCount: number;
    coveredActionRequiredCount: number;
  };
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerGates {
  inputSummaryReady: boolean;
  summaryDigestPresent: boolean;
  summaryDigestScopeDeclared: boolean;
  allAudiencesCovered: boolean;
  noActionRequired: boolean;
  readOnlyConsumerOnly: true;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumer {
  consumerVersion: "Node v613";
  inputSummaryVersion: "Node v611";
  decision: "ready-for-read-only-summary-consumption" | "blocked";
  readyForReadOnlySummaryConsumption: boolean;
  gateCount: number;
  passedGateCount: number;
  gates: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerGates;
  blockedReasonCodes: string[];
  summaryDigestValue: string;
  summaryDigestScope: "read-only-handoff-summary";
  coveredAudienceCount: number;
  actionRequiredCount: number;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerExport {
  exportVersion: "Node v614";
  inputConsumerVersion: "Node v613";
  exportState: "ready-for-read-only-summary-consumer-export" | "blocked";
  readyForReadOnlySummaryConsumerExport: boolean;
  consumerDecision: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumer["decision"];
  summaryDigestValue: string;
  exportDigest: {
    algorithm: "sha256";
    scope: "handoff-summary-consumer-export-lines";
    value: string;
    coveredLineCount: number;
  };
  exportLines: string[];
  exportLineCount: number;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCount: number;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceipt {
  receiptVersion: "Node v615";
  inputExportVersion: "Node v614";
  receiptState: "ready-for-read-only-summary-consumer-receipt" | "blocked";
  readyForReadOnlySummaryConsumerReceipt: boolean;
  exportState: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerExport["exportState"];
  exportDigestValue: string;
  receiptDigest: {
    algorithm: "sha256";
    scope: "handoff-summary-consumer-receipt";
    value: string;
    coveredExportLineCount: number;
    coveredBlockedReasonCount: number;
  };
  receiptLines: string[];
  receiptLineCount: number;
  exportLineCount: number;
  blockedReasonCount: number;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot {
  snapshotVersion: "Node v616";
  inputReceiptVersion: "Node v615";
  snapshotState: "ready-for-read-only-summary-consumer-receipt-archive" | "blocked";
  readyForReadOnlySummaryConsumerReceiptArchive: boolean;
  receiptDigestValue: string;
  snapshotDigest: {
    algorithm: "sha256";
    scope: "handoff-summary-consumer-receipt-archive-snapshot";
    value: string;
    coveredSectionCount: number;
  };
  archivedSections: string[];
  archivedSectionCount: number;
  receiptLineCount: number;
  blockedReasonCount: number;
  includesRawCredential: false;
  includesRuntimePayload: false;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveVerificationGates {
  snapshotReady: boolean;
  snapshotDigestPresent: boolean;
  archivedSectionsComplete: boolean;
  excludesRawCredential: boolean;
  excludesRuntimePayload: boolean;
  readOnlyVerificationOnly: true;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification {
  verificationVersion: "Node v617";
  inputSnapshotVersion: "Node v616";
  verificationState: "ready-for-read-only-summary-consumer-receipt-archive-verification" | "blocked";
  readyForReadOnlySummaryConsumerReceiptArchiveVerification: boolean;
  gateCount: number;
  passedGateCount: number;
  gates: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveVerificationGates;
  blockedReasonCodes: string[];
  snapshotDigestValue: string;
  archivedSectionCount: number;
  blockedReasonCount: number;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverage {
  coverageVersion: "Node v620";
  inputVerificationVersion: "Node v617";
  coverageState: "ready-for-read-only-handoff-route-coverage" | "blocked";
  readyForReadOnlyHandoffRouteCoverage: boolean;
  routeSurface: "controlled-read-only-shard-preview";
  verificationState:
    ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification["verificationState"];
  coveredSections: string[];
  coveredSectionCount: number;
  coverageDigest: {
    algorithm: "sha256";
    scope: "handoff-route-markdown-sections";
    value: string;
    coveredSectionCount: number;
  };
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageVerificationGates {
  coverageReady: boolean;
  coverageDigestPresent: boolean;
  sectionCountCovered: boolean;
  noRoutingActivationRequired: boolean;
  noFreshSiblingEvidenceRequired: boolean;
  readOnlyVerificationOnly: true;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageVerification {
  verificationVersion: "Node v621";
  inputCoverageVersion: "Node v620";
  verificationState: "ready-for-read-only-handoff-route-coverage-verification" | "blocked";
  readyForReadOnlyHandoffRouteCoverageVerification: boolean;
  gateCount: number;
  passedGateCount: number;
  gates: ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageVerificationGates;
  blockedReasonCodes: string[];
  coverageDigestValue: string;
  coveredSectionCount: number;
  requiresApproval: false;
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
  activeNodeVersion: "Node v627";
  sourceNodeVersion: "Node v626";
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
    nextNodeVersion: "Node v628";
  };
  nextActions: string[];
}
