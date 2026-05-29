export interface LiveReadGatePlanEvidenceFileReference {
  id: string;
  configuredPath: string;
  resolvedPath: string;
  historicalFallbackPath: string;
  exists: boolean;
  usedHistoricalFallback: boolean;
  byteLength: number;
  digest: string | null;
}

export interface SourceNodeV383ArchiveVerificationReference {
  sourceVersion: "Node v383";
  profileVersion: string;
  archiveVerificationState: string;
  archiveVerificationDecision: string;
  readyForActiveShardPlanBoundaryHandoffIntakeArchiveVerification: boolean;
  readyForNodeV384NextBoundaryEvidenceOrLiveGate: boolean;
  activeNodeVersion: "Node v383";
  sourceNodeVersion: string;
  archiveVerificationDigest: string;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  replayCheckCount: number;
  replayPassedCheckCount: number;
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

export interface JavaLiveReadGatePlanReference {
  project: "advanced-order-platform" | "unknown";
  version: string;
  readOnly: boolean;
  executionAllowed: boolean;
  liveReadGateAllowed: boolean;
  serviceStartAllowedByNode: boolean;
  serviceStopAllowedByNode: boolean;
  failClosedRequired: boolean;
  sourceBoundaryHandoffVersion: string;
  lastVerifiedByNodeVersion: string;
  nextNodeConsumerHint: string;
  requiredServiceOwnershipFields: string[];
  javaServiceLifecyclePlan: string[];
  smokeTargets: string[];
  failClosedRules: string[];
  cleanupResponsibilities: string[];
  stopConditions: string[];
  evidencePath: string | null;
  status: string;
}

export interface MiniKvLiveReadGatePlanReference {
  project: "mini-kv" | "unknown";
  contract: string;
  releaseVersion: string;
  readOnly: boolean;
  executionAllowed: boolean;
  shardEnabled: boolean;
  status: string;
  evidencePath: string | null;
  writeCommandsAllowed: boolean;
  adminCommandsAllowed: boolean;
  loadRestoreCompactAllowed: boolean;
  setnxexExecutionAllowed: boolean;
  activeRouterInstalled: boolean;
  storageDirectoriesCreated: boolean;
  multiProcessStarted: boolean;
  archivedNodeEvidenceMutated: boolean;
  activeShardPrototypeAllowed: boolean;
  routerActivationAllowed: boolean;
  shardDirectoryCreationAllowed: boolean;
  multiProcessStartAllowed: boolean;
  writeRoutingAllowed: boolean;
  activePlanFreezeFrozenReleaseVersion: string | null;
  activePlanFreezeFrozenFixturePath: string | null;
  activePlanFreezePreservesActivePrototypePlan: boolean;
  activePlanFreezeRouterActivationAllowed: boolean;
  activePlanFreezeWriteRoutingAllowed: boolean;
  activePlanFreezeRollingCurrentUsedForFrozenBaseline: boolean;
  consumerHandoffMode: string;
  consumerFrozenReleaseVersion: string | null;
  consumerFrozenFixturePath: string | null;
  readyForNodeConsumption: boolean;
  liveReadGateRequiredBeforeRuntimeProbe: boolean;
  consumerStartsServices: boolean;
  consumerActiveShardPrototypeEnabled: boolean;
  consumerRouterActivationAllowed: boolean;
  consumerWriteRoutingAllowed: boolean;
  consumerExecutionAllowed: boolean;
  liveReadGatePlanMode: string;
  liveReadGateAllowed: boolean;
  runtimeProbeAllowed: boolean;
  liveReadGateStartsServices: boolean;
  requiresServiceOwner: boolean;
  requiresPortList: boolean;
  requiresSmokeTarget: boolean;
  requiresFailClosedBehavior: boolean;
  requiresCleanup: boolean;
  liveReadGateRouterActivationAllowed: boolean;
  liveReadGateWriteRoutingAllowed: boolean;
  liveReadGateExecutionAllowed: boolean;
  requiredBeforeLiveRead: string[];
  previousConsumedReleaseVersion: string | null;
  previousConsumedFixturePath: string | null;
  previousConsumptionNodeVersion: string | null;
  rollingCurrentUsedForHistoricalBaseline: boolean;
  nodeV383ArchiveVerificationPreserved: boolean;
  nodeV384ReadsUnfinishedUpstream: boolean;
  archivedNodeVersions: string[];
  changesArchivedNodeEvidence: boolean;
  futureNodeConsumer: string | null;
  readOnlyBoundaryFields: string[];
  evidenceDigest: string | null;
}

export interface MiniKvFrozenConsumerHandoffReference {
  project: "mini-kv" | "unknown";
  releaseVersion: string;
  readOnly: boolean;
  executionAllowed: boolean;
  shardEnabled: boolean;
  status: string;
  consumerHandoffMode: string;
  consumerFrozenReleaseVersion: string | null;
  consumerFrozenFixturePath: string | null;
  readyForNodeConsumption: boolean;
  liveReadGateRequiredBeforeRuntimeProbe: boolean;
  consumerStartsServices: boolean;
  consumerActiveShardPrototypeEnabled: boolean;
  consumerRouterActivationAllowed: boolean;
  consumerWriteRoutingAllowed: boolean;
  consumerExecutionAllowed: boolean;
}

export interface LiveReadGatePlanIntakeRecord {
  intakeDigest: string;
  intakeMode: "java-mini-kv-live-read-gate-plan-intake";
  sourceSpan: "Node v383 + Java v159 + mini-kv v150";
  sourceNodeV383Digest: string;
  javaV159Digest: string | null;
  miniKvV150Digest: string | null;
  miniKvV149Digest: string | null;
  usesFrozenJavaV159LiveReadGatePlan: boolean;
  usesFrozenMiniKvV150LiveReadGatePlan: boolean;
  verifiesMiniKvV149FrozenConsumerHandoff: boolean;
  consumesRollingCurrentAsHistoricalBaseline: false;
  liveReadGateAllowed: false;
  runtimeProbeAllowed: false;
  activeShardPrototypeEnabled: false;
  startsUpstreamServices: false;
  stopsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  nextNodeVersionSuggested: "Node v385";
  ready: boolean;
}

export interface LiveReadGatePlanIntakeChecks {
  sourceNodeV383Ready: boolean;
  sourceNodeV383ArchiveVerified: boolean;
  sourceNodeV383ChecksAllPassed: boolean;
  sourceNodeV383BoundariesClosed: boolean;
  javaV159FilePresent: boolean;
  javaV159VersionValid: boolean;
  javaV159ReadOnly: boolean;
  javaV159ExecutionBlocked: boolean;
  javaV159LiveReadGateClosed: boolean;
  javaV159ServiceLifecycleNotOwnedByNode: boolean;
  javaV159FailClosedRequired: boolean;
  javaV159ReferencesV158AndNodeV383: boolean;
  javaV159OwnershipFieldsComplete: boolean;
  javaV159LifecyclePlanSafe: boolean;
  javaV159SmokeTargetsReadOnlyGet: boolean;
  javaV159FailClosedRulesComplete: boolean;
  javaV159CleanupResponsibilitiesSafe: boolean;
  javaV159StopConditionsSafe: boolean;
  javaV159StatusPassed: boolean;
  miniKvV150FilePresent: boolean;
  miniKvV150ReleaseVersionValid: boolean;
  miniKvV150ReadOnly: boolean;
  miniKvV150ExecutionBlocked: boolean;
  miniKvV150ShardDisabled: boolean;
  miniKvV150StatusAccepted: boolean;
  miniKvV150BoundarySafe: boolean;
  miniKvV150ConsumerHandoffReady: boolean;
  miniKvV150LiveReadGatePlanPrerequisiteOnly: boolean;
  miniKvV150RequiresServicePlanFields: boolean;
  miniKvV150ActivePlanStillDisabled: boolean;
  miniKvV150ActivePlanFreezeSafe: boolean;
  miniKvV150HistoricalFallbackSafe: boolean;
  miniKvV150PreservesNodeV383Archive: boolean;
  miniKvV150NoRollingCurrentBaseline: boolean;
  miniKvV149FrozenConsumerEvidencePresent: boolean;
  miniKvV149FrozenConsumerEvidenceSafe: boolean;
  allEvidenceUsesHistoricalFallbackSnapshots: boolean;
  intakeDigestStable: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForJavaMiniKvLiveReadGatePlanIntake: boolean;
}

export interface LiveReadGatePlanIntakeSummary {
  evidenceSourceCount: number;
  readyEvidenceSourceCount: number;
  javaOwnershipFieldCount: number;
  javaSmokeTargetCount: number;
  miniKvArchivedNodeVersionCount: number;
  miniKvRequiredBeforeLiveReadCount: number;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface LiveReadGatePlanIntakeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-live-read-gate-plan-intake.v1";
  intakeState: "java-mini-kv-live-read-gate-plan-intake-ready" | "blocked";
  intakeDecision: "consume-java-v159-and-mini-kv-v150-live-read-gate-plan-evidence" | "blocked";
  readyForJavaMiniKvLiveReadGatePlanIntake: boolean;
  readyForNodeV385ArchiveVerification: boolean;
  activeNodeVersion: "Node v384";
  sourceNodeVersion: "Node v383";
  evidenceIntakeOnly: true;
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
  sourceNodeV383: SourceNodeV383ArchiveVerificationReference;
  javaLiveReadGatePlanFile: LiveReadGatePlanEvidenceFileReference;
  miniKvLiveReadGatePlanFile: LiveReadGatePlanEvidenceFileReference;
  miniKvFrozenConsumerHandoffFile: LiveReadGatePlanEvidenceFileReference;
  javaLiveReadGatePlan: JavaLiveReadGatePlanReference;
  miniKvLiveReadGatePlan: MiniKvLiveReadGatePlanReference;
  miniKvFrozenConsumerHandoff: MiniKvFrozenConsumerHandoffReference;
  intake: LiveReadGatePlanIntakeRecord;
  checks: LiveReadGatePlanIntakeChecks;
  summary: LiveReadGatePlanIntakeSummary;
  productionBlockers: LiveReadGatePlanIntakeMessage[];
  warnings: LiveReadGatePlanIntakeMessage[];
  recommendations: LiveReadGatePlanIntakeMessage[];
  evidenceEndpoints: {
    liveReadGatePlanIntakeJson: string;
    liveReadGatePlanIntakeMarkdown: string;
    sourceNodeV383Json: string;
    sourceNodeV383Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v385";
  };
  nextActions: string[];
}
