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
  activeNodeVersion: "Node v603";
  sourceNodeVersion: "Node v602";
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
    nextNodeVersion: "Node v604";
  };
  nextActions: string[];
}
