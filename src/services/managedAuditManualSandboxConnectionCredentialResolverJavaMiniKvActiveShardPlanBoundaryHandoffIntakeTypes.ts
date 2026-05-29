export interface ActiveShardPlanBoundaryHandoffEvidenceFileReference {
  id: string;
  configuredPath: string;
  resolvedPath: string;
  historicalFallbackPath: string;
  exists: boolean;
  usedHistoricalFallback: boolean;
  byteLength: number;
  digest: string | null;
}

export interface SourceNodeV381ArchiveVerificationReference {
  sourceVersion: "Node v381";
  profileVersion: string;
  archiveVerificationState: string;
  archiveVerificationDecision: string;
  readyForActiveShardPlanEvidenceIntakeArchiveVerification: boolean;
  readyForNodeV381NextArchiveVerification: boolean;
  activeNodeVersion: "Node v381";
  sourceNodeVersion: string;
  archiveVerificationDigest: string;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  connectsManagedAudit: false;
  executionAllowed: false;
  activeShardPrototypeEnabled: false;
}

export interface JavaActiveShardPlanBoundaryHandoffReference {
  project: "advanced-order-platform" | "unknown";
  version: string;
  readOnly: boolean;
  executionAllowed: boolean;
  activeShardPrototypeEnabled: boolean;
  liveReadAllowed: boolean;
  sourceHandoffVersion: string;
  lastConsumedByNodeVersion: string | null;
  nodeArchiveVerificationVersion: string | null;
  javaRole: string;
  activePrototypeAuthority: string;
  frozenJavaEvidence: string[];
  nodeConsumptionReferences: string[];
  javaBoundaryRules: string[];
  stopConditions: string[];
  evidencePath: string | null;
  status: string;
}

export interface MiniKvActiveShardPlanConsumerHandoffReference {
  project: "mini-kv" | "unknown";
  contract: string;
  releaseVersion: string;
  readOnly: boolean;
  executionAllowed: boolean;
  shardEnabled: boolean;
  shardCount: number;
  slotCount: number;
  routingMode: string;
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
  previousConsumedReleaseVersion: string | null;
  previousConsumedFixturePath: string | null;
  previousConsumptionNodeVersion: string | null;
  rollingCurrentUsedForHistoricalBaseline: boolean;
  nodeV381ArchiveVerificationPreserved: boolean;
  nodeV382ReadsUnfinishedUpstream: boolean;
  archivedNodeVersions: string[];
  changesArchivedNodeEvidence: boolean;
  futureNodeConsumer: string | null;
  evidenceDigest: string | null;
}

export interface MiniKvFrozenActivePlanReference {
  project: "mini-kv" | "unknown";
  releaseVersion: string;
  readOnly: boolean;
  executionAllowed: boolean;
  status: string;
  activeShardPrototypeAllowed: boolean;
  routerActivationAllowed: boolean;
  writeRoutingAllowed: boolean;
  rollingCurrentUsedForFrozenBaseline: boolean;
}

export interface ActiveShardPlanBoundaryHandoffIntakeRecord {
  intakeMode: "java-mini-kv-active-shard-plan-boundary-handoff-intake";
  sourceSpan: "Node v381 + Java v158 + mini-kv v149";
  sourceNodeV381Digest: string;
  javaV158Digest: string | null;
  miniKvV149Digest: string | null;
  miniKvV148Digest: string | null;
  intakeDigest: string;
  usesFrozenJavaV158Handoff: boolean;
  usesFrozenMiniKvV149Handoff: boolean;
  verifiesMiniKvV148FrozenPlan: boolean;
  consumesRollingCurrentAsHistoricalBaseline: false;
  activeShardPrototypeEnabled: false;
  liveReadGateRequiredBeforeRuntimeProbe: true;
  startsUpstreamServices: false;
  stopsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  nextNodeVersionSuggested: "Node v383";
  ready: boolean;
}

export interface ActiveShardPlanBoundaryHandoffIntakeChecks {
  sourceNodeV381Ready: boolean;
  sourceNodeV381ArchiveVerified: boolean;
  sourceNodeV381BoundariesClosed: boolean;
  javaV158HandoffFilePresent: boolean;
  javaV158VersionValid: boolean;
  javaV158ReadOnly: boolean;
  javaV158ExecutionBlocked: boolean;
  javaV158ActivePrototypeDisabled: boolean;
  javaV158LiveReadDisabled: boolean;
  javaV158StatusPassed: boolean;
  javaV158SourceReferencesV157: boolean;
  javaV158ReferencesNodeV380AndV381: boolean;
  javaV158BoundaryRulesSafe: boolean;
  javaV158StopConditionsSafe: boolean;
  miniKvV149HandoffFilePresent: boolean;
  miniKvV149ReleaseVersionValid: boolean;
  miniKvV149ReadOnly: boolean;
  miniKvV149ExecutionBlocked: boolean;
  miniKvV149StatusAccepted: boolean;
  miniKvV149ConsumerHandoffReady: boolean;
  miniKvV149ConsumerHandoffRequiresLiveGate: boolean;
  miniKvV149BoundarySafe: boolean;
  miniKvV149ActivePrototypeStillDisabled: boolean;
  miniKvV149ActivePlanFreezeSafe: boolean;
  miniKvV149HistoricalFallbackSafe: boolean;
  miniKvV149PreservesNodeV381Path: boolean;
  miniKvV148FrozenPlanFilePresent: boolean;
  miniKvV148FrozenPlanValid: boolean;
  allEvidenceUsesHistoricalFallbackSnapshots: boolean;
  intakeDigestStable: boolean;
  noRollingCurrentHistoricalBaseline: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForActiveShardPlanBoundaryHandoffIntake: boolean;
}

export interface ActiveShardPlanBoundaryHandoffIntakeSummary {
  evidenceSourceCount: number;
  readyEvidenceSourceCount: number;
  javaBoundaryRuleCount: number;
  miniKvArchivedNodeVersionCount: number;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface ActiveShardPlanBoundaryHandoffIntakeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-boundary-handoff-intake.v1";
  intakeState: "java-mini-kv-active-shard-plan-boundary-handoff-intake-ready" | "blocked";
  intakeDecision: "consume-java-v158-and-mini-kv-v149-boundary-handoff-evidence" | "blocked";
  readyForActiveShardPlanBoundaryHandoffIntake: boolean;
  readyForNodeV383ArchiveVerification: boolean;
  activeNodeVersion: "Node v382";
  sourceNodeVersion: "Node v381";
  evidenceIntakeOnly: true;
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
  sourceNodeV381: SourceNodeV381ArchiveVerificationReference;
  javaHandoffFile: ActiveShardPlanBoundaryHandoffEvidenceFileReference;
  miniKvHandoffFile: ActiveShardPlanBoundaryHandoffEvidenceFileReference;
  miniKvFrozenPlanFile: ActiveShardPlanBoundaryHandoffEvidenceFileReference;
  javaHandoff: JavaActiveShardPlanBoundaryHandoffReference;
  miniKvHandoff: MiniKvActiveShardPlanConsumerHandoffReference;
  miniKvFrozenPlan: MiniKvFrozenActivePlanReference;
  intake: ActiveShardPlanBoundaryHandoffIntakeRecord;
  checks: ActiveShardPlanBoundaryHandoffIntakeChecks;
  summary: ActiveShardPlanBoundaryHandoffIntakeSummary;
  productionBlockers: ActiveShardPlanBoundaryHandoffIntakeMessage[];
  warnings: ActiveShardPlanBoundaryHandoffIntakeMessage[];
  recommendations: ActiveShardPlanBoundaryHandoffIntakeMessage[];
  evidenceEndpoints: {
    activeShardPlanBoundaryHandoffIntakeJson: string;
    activeShardPlanBoundaryHandoffIntakeMarkdown: string;
    sourceNodeV381Json: string;
    sourceNodeV381Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v383";
  };
  nextActions: string[];
}
