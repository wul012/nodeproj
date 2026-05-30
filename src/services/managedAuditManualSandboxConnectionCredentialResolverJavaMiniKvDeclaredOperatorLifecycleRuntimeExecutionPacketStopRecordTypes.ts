export interface RuntimeExecutionPacketStopRecordFileReference {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface SourceNodeV391RuntimeLiveReadGatePlanArchiveVerificationReference {
  sourceVersion: "Node v391";
  profileVersion: string;
  archiveVerificationState: string;
  archiveVerificationDecision: string;
  readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification: boolean;
  readyForNodeV392RuntimeExecutionPacket: boolean;
  readyForRuntimeLiveReadGate: boolean;
  activeNodeVersion: "Node v391";
  sourceNodeVersion: string;
  archiveVerificationOnly: boolean;
  runtimeExecutionPacketPresent: boolean;
  runtimeGateApprovalPresent: boolean;
  concreteLoopbackPortsAssigned: boolean;
  operatorApprovalRecordRequired: boolean;
  concreteLoopbackPortsRequired: boolean;
  getOnlySmokeCommandRequired: boolean;
  cleanupProofRequired: boolean;
  archiveVerificationDigest: string;
  sourcePlanDigest: string;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  replayCheckCount: number;
  replayPassedCheckCount: number;
  requiredRuntimeGateArtifactCount: number;
  declaredOperatorEvidenceSourceCount: number;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  connectsManagedAudit: false;
  executionAllowed: false;
  activeShardPrototypeEnabled: false;
}

export interface RuntimeExecutionPacketStopRecordReplayReference {
  replayState: "ready" | "blocked";
  replayedProfileVersion: string;
  archiveVerificationState: string;
  archiveVerificationDecision: string;
  readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification: boolean;
  readyForNodeV392RuntimeExecutionPacket: boolean;
  readyForRuntimeLiveReadGate: boolean;
  archiveVerificationOnly: boolean;
  runtimeExecutionPacketPresent: boolean;
  runtimeGateApprovalPresent: boolean;
  concreteLoopbackPortsAssigned: boolean;
  archiveVerificationDigest: string;
  sourcePlanDigest: string;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  replayCheckCount: number;
  replayPassedCheckCount: number;
  requiredRuntimeGateArtifactCount: number;
  declaredOperatorEvidenceSourceCount: number;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  executionAllowed: false;
  activeShardPrototypeEnabled: false;
}

export interface RuntimeExecutionStopReason {
  code: string;
  source: string;
  required: true;
  present: false;
  message: string;
}

export interface RuntimeExecutionPacketStopRecordArchiveReferences {
  archiveRoot: "e/391";
  jsonEvidence: RuntimeExecutionPacketStopRecordFileReference;
  markdownEvidence: RuntimeExecutionPacketStopRecordFileReference;
  summaryEvidence: RuntimeExecutionPacketStopRecordFileReference;
  browserSnapshot: RuntimeExecutionPacketStopRecordFileReference;
  htmlArchive: RuntimeExecutionPacketStopRecordFileReference;
  screenshot: RuntimeExecutionPacketStopRecordFileReference;
  explanation: RuntimeExecutionPacketStopRecordFileReference;
  codeWalkthrough: RuntimeExecutionPacketStopRecordFileReference;
  sourcePlan: RuntimeExecutionPacketStopRecordFileReference;
  plansIndex: RuntimeExecutionPacketStopRecordFileReference;
  archiveIndex: RuntimeExecutionPacketStopRecordFileReference;
}

export interface RuntimeExecutionPacketStopRecord {
  packetDigest: string;
  packetMode: "java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record";
  sourceSpan: "Node v391 + Node v390 + Node v389 + Node v388 + Java v161 + mini-kv v152";
  sourceNodeV391ArchiveVerificationDigest: string;
  sourceNodeV390PlanDigest: string;
  packetDecision: "stop-before-runtime-execution-missing-operator-artifacts" | "blocked";
  missingArtifactCount: number;
  missingArtifacts: RuntimeExecutionStopReason[];
  operatorApprovalRecordPresent: false;
  concreteLoopbackPortsPresent: false;
  getOnlySmokeCommandPresent: false;
  cleanupProofPresent: false;
  serviceOwnerPresent: false;
  processCleanupRulesPresent: false;
  runtimeExecutionPacketPresent: false;
  runtimeExecutionPacketExecutable: false;
  executionAttempted: false;
  liveReadGateAllowed: false;
  runtimeProbeAllowed: false;
  startsUpstreamServices: false;
  stopsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  activeShardPrototypeEnabled: false;
  nextNodeVersionSuggested: "Node v393";
}

export interface RuntimeExecutionPacketStopRecordChecks {
  sourceArchiveFilesPresent: boolean;
  sourceJsonReadable: boolean;
  sourceProfileVersionValid: boolean;
  sourceArchiveVerificationReady: boolean;
  sourceNodeV390PlanReady: boolean;
  sourceRuntimeGateClosed: boolean;
  sourceExecutionPacketAbsent: boolean;
  sourceChecksAllPassed: boolean;
  sourceArchiveDigestStable: boolean;
  sourceSummaryMatchesJson: boolean;
  sourceMarkdownRecordsArchiveVerification: boolean;
  sourceBrowserSnapshotPresent: boolean;
  sourceScreenshotAndHtmlPresent: boolean;
  sourceExplanationRecordsRuntimeBoundary: boolean;
  sourceCodeWalkthroughPresent: boolean;
  sourcePlanPointsToV392RuntimeExecutionPacket: boolean;
  planIndexReferencesV391AndV392: boolean;
  archiveIndexReferencesV391: boolean;
  routeRecordedInArchive: boolean;
  replayReady: boolean;
  replayKeepsRuntimeGateClosed: boolean;
  replayKeepsExecutionPacketAbsent: boolean;
  replayPreservesPlanArtifactCounts: boolean;
  replayPreservesSourceCheckCounts: boolean;
  operatorApprovalStillMissing: boolean;
  concreteLoopbackPortsStillMissing: boolean;
  getOnlySmokeCommandStillMissing: boolean;
  cleanupProofStillMissing: boolean;
  serviceOwnerStillMissing: boolean;
  processCleanupRulesStillMissing: boolean;
  stopRecordDoesNotApproveRuntime: boolean;
  executionAttemptSkipped: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  activeShardPrototypeStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  packetDigestStable: boolean;
  readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord: boolean;
}

export interface RuntimeExecutionPacketStopRecordSummary {
  checkCount: number;
  passedCheckCount: number;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  replayCheckCount: number;
  replayPassedCheckCount: number;
  requiredRuntimeGateArtifactCount: number;
  requiredRuntimeExecutionArtifactCount: number;
  missingRuntimeExecutionArtifactCount: number;
  declaredOperatorEvidenceSourceCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface RuntimeExecutionPacketStopRecordMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record.v1";
  stopRecordState: "java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stopped" | "blocked";
  stopRecordDecision: "stop-before-runtime-execution-missing-operator-artifacts" | "blocked";
  readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord: boolean;
  readyForNodeV393ArchiveVerification: boolean;
  readyForRuntimeLiveReadGate: false;
  activeNodeVersion: "Node v392";
  sourceNodeVersion: "Node v391";
  stopRecordOnly: true;
  runtimeGateRequiresSeparateApproval: true;
  runtimeExecutionPacketPresent: false;
  runtimeExecutionPacketExecutable: false;
  runtimeGateApprovalPresent: false;
  concreteLoopbackPortsAssigned: false;
  operatorApprovalRecordRequired: true;
  concreteLoopbackPortsRequired: true;
  getOnlySmokeCommandRequired: true;
  cleanupProofRequired: true;
  serviceOwnerRequired: true;
  processCleanupRulesRequired: true;
  operatorApprovalRecordPresent: false;
  concreteLoopbackPortsPresent: false;
  getOnlySmokeCommandPresent: false;
  cleanupProofPresent: false;
  serviceOwnerPresent: false;
  processCleanupRulesPresent: false;
  executionAttempted: false;
  rerunsLiveRead: false;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  sendsManagedAuditHttpTcp: false;
  credentialValueRequested: false;
  credentialValueRead: false;
  rawEndpointUrlRequested: false;
  rawEndpointUrlParsed: false;
  executionAllowed: false;
  activeShardPrototypeEnabled: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  archiveReferences: RuntimeExecutionPacketStopRecordArchiveReferences;
  sourceNodeV391: SourceNodeV391RuntimeLiveReadGatePlanArchiveVerificationReference;
  replay: RuntimeExecutionPacketStopRecordReplayReference;
  runtimeExecutionPacket: RuntimeExecutionPacketStopRecord;
  checks: RuntimeExecutionPacketStopRecordChecks;
  summary: RuntimeExecutionPacketStopRecordSummary;
  stopReasons: RuntimeExecutionStopReason[];
  productionBlockers: RuntimeExecutionPacketStopRecordMessage[];
  warnings: RuntimeExecutionPacketStopRecordMessage[];
  recommendations: RuntimeExecutionPacketStopRecordMessage[];
  evidenceEndpoints: {
    runtimeExecutionPacketStopRecordJson: string;
    runtimeExecutionPacketStopRecordMarkdown: string;
    sourceNodeV391Json: string;
    sourceNodeV391Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v393";
  };
  nextActions: string[];
}
