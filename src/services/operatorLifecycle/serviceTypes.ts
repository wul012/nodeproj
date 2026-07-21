export interface LifecycleEvidenceFile {
  id: string;
  configuredPath: string;
  resolvedPath: string;
  historicalFallbackPath: string;
  exists: boolean;
  usedHistoricalFallback: boolean;
  byteLength: number;
  digest: string | null;
}

export interface SourceV385Archive {
  sourceVersion: "Node v385";
  profileVersion: string;
  archiveVerificationState: string;
  archiveVerificationDecision: string;
  readyForLiveReadGatePlanIntakeArchiveVerification: boolean;
  readyForNodeV386ServiceLifecycleEvidenceOrRuntimeGate: boolean;
  activeNodeVersion: "Node v385";
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

export interface JavaServiceLifecycle {
  project: "advanced-order-platform" | "unknown";
  version: string;
  readOnly: boolean;
  executionAllowed: boolean;
  operatorOwned: boolean;
  runtimeProbeAllowed: boolean;
  nodeMayStartService: boolean;
  nodeMayStopService: boolean;
  sourceGatePlanVersion: string;
  lastVerifiedByNodeVersion: string;
  nextNodeConsumerHint: string;
  javaServiceOwner: string | null;
  javaStartOwner: string | null;
  javaStopOwner: string | null;
  javaPortDeclaration: string | null;
  javaBaseUrlTemplate: string | null;
  operatorPrerequisites: string[];
  getOnlySmokeTargets: string[];
  failClosedRules: string[];
  cleanupResponsibilities: string[];
  stopConditions: string[];
  evidencePath: string | null;
  status: string;
}

export interface MiniKvServiceTemplate {
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
  previousConsumedReleaseVersion: string | null;
  previousConsumedFixturePath: string | null;
  previousConsumptionNodeVersion: string | null;
  rollingCurrentUsedForHistoricalBaseline: boolean;
  nodeV385ArchiveVerificationPreserved: boolean;
  nodeV386ReadsUnfinishedUpstream: boolean;
  archivedNodeVersions: string[];
  changesArchivedNodeEvidence: boolean;
  futureNodeConsumer: string | null;
  liveReadGatePlanFreezeFrozenReleaseVersion: string | null;
  liveReadGatePlanFreezeFrozenFixturePath: string | null;
  liveReadGatePlanFreezePreservesLiveReadGatePlan: boolean;
  frozenLiveReadGateAllowed: boolean;
  frozenRuntimeProbeAllowed: boolean;
  frozenStartsServices: boolean;
  frozenRouterActivationAllowed: boolean;
  frozenWriteRoutingAllowed: boolean;
  frozenExecutionAllowed: boolean;
  liveReadGatePlanFreezeRollingCurrentUsedForFrozenBaseline: boolean;
  operatorEvidenceMode: string;
  operatorSourceFrozenReleaseVersion: string | null;
  operatorSourceFrozenFixturePath: string | null;
  operatorOwnedServiceLifecycleRequired: boolean;
  serviceOwnerDeclared: boolean;
  startupCommandDeclared: boolean;
  portListDeclared: boolean;
  getOnlySmokeTargetDeclared: boolean;
  failClosedBehaviorRequired: boolean;
  cleanupResponsibilityDeclared: boolean;
  operatorStartsServices: boolean;
  operatorRuntimeProbeAllowed: boolean;
  operatorLiveReadAllowed: boolean;
  operatorRouterActivationAllowed: boolean;
  operatorWriteRoutingAllowed: boolean;
  operatorExecutionAllowed: boolean;
  requiredOperatorEvidence: string[];
  readOnlyBoundaryFields: string[];
  evidenceDigest: string | null;
}

export interface FrozenLiveReadPlan {
  project: "mini-kv" | "unknown";
  releaseVersion: string;
  readOnly: boolean;
  executionAllowed: boolean;
  shardEnabled: boolean;
  status: string;
  liveReadGatePlanMode: string;
  liveReadGateAllowed: boolean;
  runtimeProbeAllowed: boolean;
  startsServices: boolean;
  routerActivationAllowed: boolean;
  writeRoutingAllowed: boolean;
  liveReadGateExecutionAllowed: boolean;
}

export interface ServiceIntakeRecord {
  intakeDigest: string;
  intakeMode: "java-mini-kv-operator-service-lifecycle-evidence-intake";
  sourceSpan: "Node v385 + Java v160 + mini-kv v151";
  sourceNodeV385Digest: string;
  javaV160Digest: string | null;
  miniKvV151Digest: string | null;
  miniKvV150Digest: string | null;
  usesFrozenJavaV160OperatorLifecycleEvidence: boolean;
  usesFrozenMiniKvV151LifecycleTemplate: boolean;
  verifiesMiniKvV150LiveReadGatePlanFreeze: boolean;
  javaOperatorLifecycleEvidencePresent: boolean;
  miniKvLifecycleTemplateOnly: boolean;
  runtimeGateStillBlocked: true;
  consumesRollingCurrentAsHistoricalBaseline: false;
  liveReadGateAllowed: false;
  runtimeProbeAllowed: false;
  activeShardPrototypeEnabled: false;
  startsUpstreamServices: false;
  stopsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  nextNodeVersionSuggested: "Node v387";
  ready: boolean;
}

export interface ServiceIntakeChecks {
  sourceNodeV385Ready: boolean;
  sourceNodeV385ArchiveVerified: boolean;
  sourceNodeV385ChecksAllPassed: boolean;
  sourceNodeV385BoundariesClosed: boolean;
  javaV160FilePresent: boolean;
  javaV160VersionValid: boolean;
  javaV160ReadOnly: boolean;
  javaV160ExecutionBlocked: boolean;
  javaV160OperatorOwned: boolean;
  javaV160RuntimeProbeBlocked: boolean;
  javaV160NodeLifecycleBlocked: boolean;
  javaV160ReferencesV159AndNodeV385: boolean;
  javaV160OwnerAndPortPlaceholdersPresent: boolean;
  javaV160OperatorPrerequisitesComplete: boolean;
  javaV160SmokeTargetsReadOnlyGet: boolean;
  javaV160FailClosedRulesComplete: boolean;
  javaV160CleanupResponsibilitiesSafe: boolean;
  javaV160StopConditionsSafe: boolean;
  javaV160StatusPassed: boolean;
  miniKvV151FilePresent: boolean;
  miniKvV151ReleaseVersionValid: boolean;
  miniKvV151ReadOnly: boolean;
  miniKvV151ExecutionBlocked: boolean;
  miniKvV151ShardDisabled: boolean;
  miniKvV151StatusAccepted: boolean;
  miniKvV151BoundarySafe: boolean;
  miniKvV151HistoricalFallbackSafe: boolean;
  miniKvV151PreservesNodeV385Archive: boolean;
  miniKvV151LiveReadGatePlanFreezeSafe: boolean;
  miniKvV151OperatorTemplateRequiresEvidence: boolean;
  miniKvV151OperatorTemplateNotRuntimeReady: boolean;
  miniKvV151NoRollingCurrentBaseline: boolean;
  miniKvV150FrozenGatePlanPresent: boolean;
  miniKvV150FrozenGatePlanSafe: boolean;
  allEvidenceUsesHistoricalFallbackSnapshots: boolean;
  runtimeGateStillBlocked: boolean;
  intakeDigestStable: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForOperatorServiceLifecycleEvidenceIntake: boolean;
}

export interface ServiceIntakeSummary {
  evidenceSourceCount: number;
  readyEvidenceSourceCount: number;
  javaSmokeTargetCount: number;
  miniKvArchivedNodeVersionCount: number;
  requiredOperatorEvidenceCount: number;
  declaredMiniKvOperatorEvidenceCount: number;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface ServiceIntakeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ServiceIntakeProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-operator-service-lifecycle-evidence-intake.v1";
  intakeState: "java-mini-kv-operator-service-lifecycle-evidence-intake-ready" | "blocked";
  intakeDecision: "consume-java-v160-and-mini-kv-v151-operator-service-lifecycle-evidence" | "blocked";
  readyForOperatorServiceLifecycleEvidenceIntake: boolean;
  readyForNodeV387ArchiveVerification: boolean;
  readyForRuntimeLiveReadGate: false;
  activeNodeVersion: "Node v386";
  sourceNodeVersion: "Node v385";
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
  sourceNodeV385: SourceV385Archive;
  javaOperatorServiceLifecycleFile: LifecycleEvidenceFile;
  miniKvOperatorServiceLifecycleTemplateFile: LifecycleEvidenceFile;
  miniKvFrozenLiveReadGatePlanFile: LifecycleEvidenceFile;
  javaOperatorServiceLifecycle: JavaServiceLifecycle;
  miniKvOperatorServiceLifecycleTemplate: MiniKvServiceTemplate;
  miniKvFrozenLiveReadGatePlan: FrozenLiveReadPlan;
  intake: ServiceIntakeRecord;
  checks: ServiceIntakeChecks;
  summary: ServiceIntakeSummary;
  productionBlockers: ServiceIntakeMessage[];
  warnings: ServiceIntakeMessage[];
  recommendations: ServiceIntakeMessage[];
  evidenceEndpoints: {
    operatorServiceLifecycleEvidenceIntakeJson: string;
    operatorServiceLifecycleEvidenceIntakeMarkdown: string;
    sourceNodeV385Json: string;
    sourceNodeV385Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v387";
  };
  nextActions: string[];
}
