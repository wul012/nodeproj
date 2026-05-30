export interface SourceNodeV389DeclaredOperatorLifecycleArchiveVerificationReference {
  sourceVersion: "Node v389";
  profileVersion: string;
  archiveVerificationState: string;
  archiveVerificationDecision: string;
  readyForDeclaredOperatorLifecycleEvidenceIntakeArchiveVerification: boolean;
  readyForNodeV390RuntimeGatePlan: boolean;
  readyForRuntimeLiveReadGate: boolean;
  activeNodeVersion: "Node v389";
  sourceNodeVersion: string;
  archiveVerificationDigest: string;
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  replayCheckCount: number;
  replayPassedCheckCount: number;
  declaredOperatorEvidenceSourceCount: number;
  productionBlockerCount: number;
  archiveVerificationOnly: boolean;
  rerunsLiveRead: false;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  connectsManagedAudit: false;
  executionAllowed: false;
  activeShardPrototypeEnabled: false;
}

export interface SourceNodeV389ArchiveReplayReference {
  replayState: "ready" | "blocked";
  replayedProfileVersion: string;
  readyForDeclaredOperatorLifecycleEvidenceIntakeArchiveVerification: boolean;
  readyForNodeV390RuntimeGatePlan: boolean;
  readyForRuntimeLiveReadGate: boolean;
  archiveVerificationOnly: boolean;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  replayCheckCount: number;
  replayPassedCheckCount: number;
  checkCount: number;
  passedCheckCount: number;
  declaredOperatorEvidenceSourceCount: number;
  productionBlockerCount: number;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  executionAllowed: false;
  activeShardPrototypeEnabled: false;
}

export interface SourceNodeV388DeclaredOperatorLifecycleReplayReference {
  replayState: "ready" | "blocked";
  replayedProfileVersion: string;
  readyForDeclaredOperatorLifecycleEvidenceIntake: boolean;
  readyForNodeV389ArchiveVerification: boolean;
  readyForRuntimeLiveReadGate: boolean;
  declaredOperatorLifecycleEvidencePresent: boolean;
  runtimeGateRequiresSeparateApproval: boolean;
  javaDeclaredOperatorLifecycleVersion: string;
  javaDeclaredPortCount: number;
  javaGetOnlySmokeTargetCount: number;
  javaStartupCommandDeclared: boolean;
  javaCleanupDeclared: boolean;
  javaFailClosedDeclared: boolean;
  javaNodeMayStartService: boolean;
  javaNodeMayStopService: boolean;
  miniKvDeclaredOperatorLifecycleReleaseVersion: string;
  miniKvDeclaredPortHandleCount: number;
  miniKvRequiredBeforeRuntimeGateCount: number;
  miniKvStartupCommandDeclared: boolean;
  miniKvCleanupResponsibilityDeclared: boolean;
  miniKvFailClosedBehaviorDeclared: boolean;
  miniKvRuntimeGateApproved: boolean;
  miniKvStartsServices: boolean;
  javaDeclaredOperatorLifecycleUsedHistoricalFallback: boolean;
  miniKvDeclaredOperatorLifecycleUsedHistoricalFallback: boolean;
  miniKvFrozenOperatorTemplateUsedHistoricalFallback: boolean;
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

export interface RuntimeLiveReadGatePlanRecord {
  planDigest: string;
  planMode: "java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan";
  sourceSpan: "Node v389 + Node v388 + Java v161 + mini-kv v152";
  sourceNodeV389ArchiveVerificationDigest: string;
  sourceNodeV388ReplayProfileVersion: string;
  operatorApprovalRecordRequired: true;
  concreteLoopbackPortsRequired: true;
  getOnlySmokeCommandRequired: true;
  cleanupProofRequired: true;
  failClosedResultRequired: true;
  runtimeGateApprovalPresent: false;
  concreteLoopbackPortsAssigned: false;
  javaOperatorMustStartService: true;
  miniKvOperatorMustStartService: true;
  nodeMayStartJavaService: false;
  nodeMayStartMiniKvService: false;
  nodeMayStopJavaService: false;
  nodeMayStopMiniKvService: false;
  javaDeclaredPortHandles: string[];
  miniKvDeclaredPortHandles: string[];
  javaGetOnlySmokeTargetCount: number;
  miniKvGetOnlySmokeTargetDeclared: boolean;
  requiredBeforeRuntimeGate: string[];
  liveReadGateAllowed: false;
  runtimeProbeAllowed: false;
  activeShardPrototypeEnabled: false;
  startsUpstreamServices: false;
  stopsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  nextNodeVersionSuggested: "Node v391";
  ready: boolean;
}

export interface RuntimeLiveReadGatePlanChecks {
  sourceNodeV389Ready: boolean;
  sourceNodeV389ArchiveVerified: boolean;
  sourceNodeV389ChecksAllPassed: boolean;
  sourceNodeV389BoundariesClosed: boolean;
  sourceNodeV389ReplayReady: boolean;
  sourceNodeV388DeclaredEvidenceReady: boolean;
  sourceNodeV388EvidenceVersionsMatch: boolean;
  sourceNodeV388UsesFrozenHistoricalSnapshots: boolean;
  javaLifecyclePlanComplete: boolean;
  javaStartupOwnershipDeclared: boolean;
  javaGetOnlySmokeDeclared: boolean;
  javaCleanupAndFailClosedDeclared: boolean;
  javaRuntimePrerequisitesContainRuntimeGate: boolean;
  miniKvLifecyclePlanComplete: boolean;
  miniKvStartupOwnershipDeclared: boolean;
  miniKvGetOnlySmokeDeclared: boolean;
  miniKvCleanupAndFailClosedDeclared: boolean;
  miniKvRequiresSeparateRuntimeGate: boolean;
  miniKvRuntimeGateStillBlocked: boolean;
  runtimeApprovalRecordRequired: boolean;
  concreteLoopbackPortsRequired: boolean;
  getOnlySmokeCommandRequired: boolean;
  cleanupProofRequired: boolean;
  runtimeGatePlanDoesNotApproveRuntime: boolean;
  runtimeProbeStillBlocked: boolean;
  liveReadGateStillBlocked: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  activeShardPrototypeStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  planDigestStable: boolean;
  readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlan: boolean;
}

export interface RuntimeLiveReadGatePlanSummary {
  checkCount: number;
  passedCheckCount: number;
  requiredRuntimeGateArtifactCount: number;
  declaredOperatorEvidenceSourceCount: number;
  javaDeclaredPortCount: number;
  miniKvDeclaredPortHandleCount: number;
  javaGetOnlySmokeTargetCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface RuntimeLiveReadGatePlanMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan.v1";
  planState: "java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-ready" | "blocked";
  planDecision: "write-separate-runtime-live-read-gate-plan-after-v389-archive-verification" | "blocked";
  readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlan: boolean;
  readyForNodeV391ArchiveVerification: boolean;
  readyForRuntimeLiveReadGate: false;
  activeNodeVersion: "Node v390";
  sourceNodeVersion: "Node v389";
  runtimeGatePlanOnly: true;
  runtimeGateRequiresSeparateApproval: true;
  operatorApprovalRecordRequired: true;
  concreteLoopbackPortsRequired: true;
  getOnlySmokeCommandRequired: true;
  cleanupProofRequired: true;
  runtimeGateApprovalPresent: false;
  concreteLoopbackPortsAssigned: false;
  liveReadGateAllowed: false;
  runtimeProbeAllowed: false;
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
  sourceNodeV389: SourceNodeV389DeclaredOperatorLifecycleArchiveVerificationReference;
  sourceNodeV389Replay: SourceNodeV389ArchiveReplayReference;
  sourceNodeV388Replay: SourceNodeV388DeclaredOperatorLifecycleReplayReference;
  runtimeGatePlan: RuntimeLiveReadGatePlanRecord;
  checks: RuntimeLiveReadGatePlanChecks;
  summary: RuntimeLiveReadGatePlanSummary;
  productionBlockers: RuntimeLiveReadGatePlanMessage[];
  warnings: RuntimeLiveReadGatePlanMessage[];
  recommendations: RuntimeLiveReadGatePlanMessage[];
  evidenceEndpoints: {
    runtimeLiveReadGatePlanJson: string;
    runtimeLiveReadGatePlanMarkdown: string;
    sourceNodeV389Json: string;
    sourceNodeV389Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v391";
  };
  nextActions: string[];
}
