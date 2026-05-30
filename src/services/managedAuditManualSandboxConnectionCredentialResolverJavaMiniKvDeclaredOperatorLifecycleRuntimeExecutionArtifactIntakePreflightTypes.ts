export type RuntimeExecutionArtifactKey =
  | "operatorApprovalRecord"
  | "concreteLoopbackPorts"
  | "getOnlySmokeCommand"
  | "cleanupProof"
  | "serviceOwner"
  | "processCleanupRules";

export interface RuntimeExecutionArtifactIntakePreflightFileReference {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface RuntimeExecutionArtifactRequirement {
  key: RuntimeExecutionArtifactKey;
  label: string;
  required: true;
  present: boolean;
  source: "node-drop-zone" | "java-mini-kv-sibling-workspace" | "mixed";
  missingReasonCode:
    | "OPERATOR_APPROVAL_RECORD_MISSING"
    | "CONCRETE_LOOPBACK_PORTS_MISSING"
    | "GET_ONLY_SMOKE_COMMAND_MISSING"
    | "CLEANUP_PROOF_MISSING"
    | "SERVICE_OWNER_MISSING"
    | "PROCESS_CLEANUP_RULES_MISSING";
  candidatePaths: RuntimeExecutionArtifactIntakePreflightFileReference[];
}

export interface SourceNodeV393RuntimeExecutionPacketStopRecordArchiveVerificationReference {
  sourceVersion: "Node v393";
  profileVersion: string;
  archiveVerificationState: string;
  archiveVerificationDecision: string;
  readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerification: boolean;
  readyForNodeV394RuntimeExecutionArtifactIntake: boolean;
  readyForRuntimeLiveReadGate: boolean;
  activeNodeVersion: "Node v393";
  sourceNodeVersion: string;
  archiveVerificationOnly: boolean;
  runtimeExecutionPacketPresent: boolean;
  runtimeExecutionPacketExecutable: boolean;
  runtimeGateApprovalPresent: boolean;
  concreteLoopbackPortsAssigned: boolean;
  missingRuntimeExecutionArtifactCount: number;
  executionAttempted: boolean;
  archiveVerificationDigest: string;
  sourcePacketDigest: string;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  replayCheckCount: number;
  replayPassedCheckCount: number;
  requiredRuntimeGateArtifactCount: number;
  requiredRuntimeExecutionArtifactCount: number;
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

export interface RuntimeExecutionArtifactIntakePreflightReplayReference {
  replayState: "ready" | "blocked";
  replayedProfileVersion: string;
  archiveVerificationState: string;
  archiveVerificationDecision: string;
  readyForNodeV394RuntimeExecutionArtifactIntake: boolean;
  readyForRuntimeLiveReadGate: boolean;
  archiveVerificationOnly: boolean;
  runtimeExecutionPacketPresent: boolean;
  runtimeExecutionPacketExecutable: boolean;
  runtimeGateApprovalPresent: boolean;
  concreteLoopbackPortsAssigned: boolean;
  missingRuntimeExecutionArtifactCount: number;
  executionAttempted: boolean;
  archiveVerificationDigest: string;
  sourcePacketDigest: string;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  replayCheckCount: number;
  replayPassedCheckCount: number;
  requiredRuntimeGateArtifactCount: number;
  requiredRuntimeExecutionArtifactCount: number;
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

export interface RuntimeExecutionArtifactSiblingWorkspaceSnapshot {
  javaWorkspace: RuntimeExecutionArtifactIntakePreflightFileReference;
  miniKvWorkspace: RuntimeExecutionArtifactIntakePreflightFileReference;
  javaV161DeclaredLifecycle: RuntimeExecutionArtifactIntakePreflightFileReference;
  javaV162RuntimeArtifactCandidate: RuntimeExecutionArtifactIntakePreflightFileReference;
  miniKvV152DeclaredLifecycle: RuntimeExecutionArtifactIntakePreflightFileReference;
  miniKvV153RuntimeArtifactCandidate: RuntimeExecutionArtifactIntakePreflightFileReference;
  latestKnownJavaEvidenceVersion: "Java v161";
  latestKnownMiniKvEvidenceVersion: "mini-kv v152";
  runtimeArtifactFallbackAllowed: false;
}

export interface RuntimeExecutionArtifactIntakePreflightRecord {
  artifactIntakeDigest: string;
  preflightMode: "java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight";
  sourceSpan: "Node v393 + Java v161 + mini-kv v152 local artifact scan";
  intakeDecision:
    | "block-runtime-execution-artifact-intake-missing-concrete-artifacts"
    | "blocked";
  sourceNodeV393ArchiveVerificationDigest: string;
  sourceNodeV392PacketDigest: string;
  scansNodeDropZone: true;
  scansLocalSiblingWorkspaces: true;
  usesHistoricalFallbackForRuntimeArtifacts: false;
  runtimeExecutionArtifactsComplete: boolean;
  requiredRuntimeExecutionArtifactCount: 6;
  presentRuntimeExecutionArtifactCount: number;
  missingRuntimeExecutionArtifactCount: number;
  missingReasonCodes: string[];
  javaNextRuntimeArtifactPresent: boolean;
  miniKvNextRuntimeArtifactPresent: boolean;
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
  nextNodeVersionSuggested: "Node v395";
}

export interface RuntimeExecutionArtifactIntakePreflightChecks {
  sourceArchiveFilesPresent: boolean;
  sourceJsonReadable: boolean;
  sourceProfileVersionValid: boolean;
  sourceArchiveVerificationReady: boolean;
  sourceReadyForV394Intake: boolean;
  sourceRuntimeGateClosed: boolean;
  sourceExecutionPacketStopped: boolean;
  sourceMissingArtifactsRecorded: boolean;
  sourceChecksAllPassed: boolean;
  sourceDigestStable: boolean;
  sourceSummaryMatchesJson: boolean;
  sourceMarkdownRecordsV394Intake: boolean;
  sourceBrowserSnapshotPresent: boolean;
  sourceScreenshotAndHtmlPresent: boolean;
  sourceExplanationRecordsV394Boundary: boolean;
  sourceCodeWalkthroughPresent: boolean;
  sourcePlanPointsToConcreteArtifacts: boolean;
  planIndexReferencesV393AndV394: boolean;
  archiveIndexReferencesV393: boolean;
  routeRecordedInArchive: boolean;
  replayReady: boolean;
  replayKeepsRuntimeGateClosed: boolean;
  replayKeepsExecutionPacketStopped: boolean;
  replayPreservesMissingArtifacts: boolean;
  replayPreservesSourceCheckCounts: boolean;
  javaWorkspaceScanRecorded: boolean;
  miniKvWorkspaceScanRecorded: boolean;
  latestDeclaredLifecycleEvidenceBaselineRecorded: boolean;
  javaNextRuntimeArtifactAbsent: boolean;
  miniKvNextRuntimeArtifactAbsent: boolean;
  artifactRequirementCountStable: boolean;
  artifactRequirementsAllAbsent: boolean;
  artifactIntakeDigestStable: boolean;
  noHistoricalRuntimeArtifactFallback: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  activeShardPrototypeStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight: boolean;
}

export interface RuntimeExecutionArtifactIntakePreflightSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  replayCheckCount: number;
  replayPassedCheckCount: number;
  requiredRuntimeGateArtifactCount: number;
  requiredRuntimeExecutionArtifactCount: number;
  presentRuntimeExecutionArtifactCount: number;
  missingRuntimeExecutionArtifactCount: number;
  declaredOperatorEvidenceSourceCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface RuntimeExecutionArtifactIntakePreflightMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight.v1";
  intakePreflightState:
    | "java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-complete"
    | "blocked";
  intakeDecision:
    | "block-runtime-execution-artifact-intake-missing-concrete-artifacts"
    | "blocked";
  readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight: boolean;
  readyForNodeV395ArchiveVerification: boolean;
  readyForRuntimeExecutionPacket: false;
  readyForRuntimeLiveReadGate: false;
  activeNodeVersion: "Node v394";
  sourceNodeVersion: "Node v393";
  artifactIntakePreflightOnly: true;
  runtimeGateRequiresSeparateApproval: true;
  runtimeExecutionArtifactsComplete: boolean;
  presentRuntimeExecutionArtifactCount: number;
  missingRuntimeExecutionArtifactCount: number;
  runtimeExecutionPacketPresent: false;
  runtimeExecutionPacketExecutable: false;
  runtimeGateApprovalPresent: false;
  concreteLoopbackPortsAssigned: false;
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
  sourceArchiveReferences: Record<string, RuntimeExecutionArtifactIntakePreflightFileReference>;
  sourceNodeV393: SourceNodeV393RuntimeExecutionPacketStopRecordArchiveVerificationReference;
  replay: RuntimeExecutionArtifactIntakePreflightReplayReference;
  siblingWorkspaceSnapshot: RuntimeExecutionArtifactSiblingWorkspaceSnapshot;
  artifactRequirements: RuntimeExecutionArtifactRequirement[];
  artifactIntakePreflight: RuntimeExecutionArtifactIntakePreflightRecord;
  checks: RuntimeExecutionArtifactIntakePreflightChecks;
  summary: RuntimeExecutionArtifactIntakePreflightSummary;
  productionBlockers: RuntimeExecutionArtifactIntakePreflightMessage[];
  warnings: RuntimeExecutionArtifactIntakePreflightMessage[];
  recommendations: RuntimeExecutionArtifactIntakePreflightMessage[];
  evidenceEndpoints: {
    runtimeExecutionArtifactIntakePreflightJson: string;
    runtimeExecutionArtifactIntakePreflightMarkdown: string;
    sourceNodeV393Json: string;
    sourceNodeV393Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v395";
  };
  nextActions: string[];
}
