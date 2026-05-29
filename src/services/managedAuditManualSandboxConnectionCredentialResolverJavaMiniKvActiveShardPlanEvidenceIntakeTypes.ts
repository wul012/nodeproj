export interface ActiveShardPlanEvidenceFileReference {
  id: string;
  configuredPath: string;
  resolvedPath: string;
  historicalFallbackPath: string;
  exists: boolean;
  usedHistoricalFallback: boolean;
  byteLength: number;
  digest: string | null;
}

export interface SourceNodeV379ArchiveVerificationReference {
  sourceVersion: "Node v379";
  profileVersion: string;
  archiveVerificationState: string;
  archiveVerificationDecision: string;
  readyForCompletedShardEvidenceIntakeArchiveVerification: boolean;
  readyForNodeV380NextCompletedEvidenceOrLiveGate: boolean;
  activeNodeVersion: "Node v379";
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
}

export interface JavaShardEvidenceHandoffReference {
  project: "advanced-order-platform" | "unknown";
  version: string;
  readOnly: boolean;
  executionAllowed: boolean;
  sourceIndexVersion: string;
  sourceVerificationVersion: string;
  lastConsumedByNodeVersion: string | null;
  completedEvidenceVersions: string[];
  handoffArtifacts: string[];
  consumerRules: string[];
  stopConditions: string[];
  status: string;
  evidencePath: string | null;
}

export interface MiniKvActiveShardPlanFrozenEvidenceReference {
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
  previousConsumedReleaseVersion: string | null;
  previousConsumedFixturePath: string | null;
  previousConsumptionNodeVersion: string | null;
  rollingCurrentUsedForHistoricalBaseline: boolean;
  archivedNodeVersions: string[];
  changesArchivedNodeEvidence: boolean;
  futureNodeConsumer: string | null;
  evidenceDigest: string | null;
}

export interface ActiveShardPlanEvidenceIntakeRecord {
  intakeMode: "java-mini-kv-active-shard-plan-evidence-intake";
  sourceSpan: "Node v379 + Java v157 + mini-kv v147";
  sourceNodeV379Digest: string;
  javaV157Digest: string | null;
  miniKvV147Digest: string | null;
  intakeDigest: string;
  usesFrozenJavaV157Handoff: boolean;
  usesFrozenMiniKvV147Snapshot: boolean;
  consumesRollingCurrentAsHistoricalBaseline: false;
  activeShardPrototypeEnabled: false;
  startsUpstreamServices: false;
  stopsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  nextNodeVersionSuggested: "Node v381";
  ready: boolean;
}

export interface ActiveShardPlanEvidenceIntakeChecks {
  sourceNodeV379Ready: boolean;
  sourceNodeV379ArchiveVerified: boolean;
  sourceNodeV379BoundariesClosed: boolean;
  javaV157HandoffFilePresent: boolean;
  javaV157VersionValid: boolean;
  javaV157ReadOnly: boolean;
  javaV157ExecutionBlocked: boolean;
  javaV157StatusPassed: boolean;
  javaV157ReferencesJavaV155AndV156: boolean;
  javaV157CompletedEvidenceVersionsValid: boolean;
  javaV157ConsumerRulesSafe: boolean;
  javaV157StopConditionsSafe: boolean;
  miniKvV147SnapshotPresent: boolean;
  miniKvV147ReleaseVersionValid: boolean;
  miniKvV147ReadOnly: boolean;
  miniKvV147ExecutionBlocked: boolean;
  miniKvV147StatusAccepted: boolean;
  miniKvV147ActivePrototypePlanPresent: boolean;
  miniKvV147ActivePrototypeStillDisabled: boolean;
  miniKvV147BoundarySafe: boolean;
  miniKvV147HistoricalFallbackSafe: boolean;
  miniKvV147PreservesNodeV378Path: boolean;
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
  readyForActiveShardPlanEvidenceIntake: boolean;
}

export interface ActiveShardPlanEvidenceIntakeSummary {
  evidenceSourceCount: number;
  readyEvidenceSourceCount: number;
  completedJavaEvidenceVersionCount: number;
  miniKvArchivedNodeVersionCount: number;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface ActiveShardPlanEvidenceIntakeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-evidence-intake.v1";
  intakeState: "java-mini-kv-active-shard-plan-evidence-intake-ready" | "blocked";
  intakeDecision: "consume-java-v157-and-mini-kv-v147-active-plan-evidence" | "blocked";
  readyForActiveShardPlanEvidenceIntake: boolean;
  readyForNodeV381ArchiveVerification: boolean;
  activeNodeVersion: "Node v380";
  sourceNodeVersion: "Node v379";
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
  sourceNodeV379: SourceNodeV379ArchiveVerificationReference;
  javaHandoffFile: ActiveShardPlanEvidenceFileReference;
  miniKvSnapshotFile: ActiveShardPlanEvidenceFileReference;
  javaHandoff: JavaShardEvidenceHandoffReference;
  miniKvEvidence: MiniKvActiveShardPlanFrozenEvidenceReference;
  intake: ActiveShardPlanEvidenceIntakeRecord;
  checks: ActiveShardPlanEvidenceIntakeChecks;
  summary: ActiveShardPlanEvidenceIntakeSummary;
  productionBlockers: ActiveShardPlanEvidenceIntakeMessage[];
  warnings: ActiveShardPlanEvidenceIntakeMessage[];
  recommendations: ActiveShardPlanEvidenceIntakeMessage[];
  evidenceEndpoints: {
    activeShardPlanEvidenceIntakeJson: string;
    activeShardPlanEvidenceIntakeMarkdown: string;
    sourceNodeV379Json: string;
    sourceNodeV379Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v381";
  };
  nextActions: string[];
}
