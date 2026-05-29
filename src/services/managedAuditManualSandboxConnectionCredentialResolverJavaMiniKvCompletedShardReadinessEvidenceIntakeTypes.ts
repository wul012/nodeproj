export interface CompletedShardEvidenceFileReference {
  id: string;
  configuredPath: string;
  resolvedPath: string;
  historicalFallbackPath: string;
  exists: boolean;
  usedHistoricalFallback: boolean;
  byteLength: number;
  digest: string | null;
}

export interface SourceNodeV377ArchiveVerificationReference {
  sourceVersion: "Node v377";
  profileVersion: string;
  archiveVerificationState: string;
  archiveVerificationDecision: string;
  readyForJavaMiniKvShardEvidenceConsumptionArchiveVerification: boolean;
  readyForNodeV378CompletedEvidenceIntake: boolean;
  activeNodeVersion: "Node v377";
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

export interface JavaCompletedShardEvidenceIndexReference {
  project: "advanced-order-platform" | "unknown";
  version: string;
  readOnly: boolean;
  executionAllowed: boolean;
  lastConsumedByNodeVersion: string | null;
  requiredContractFieldCount: number;
  evidenceEntryCount: number;
  frozenEntryCount: number;
  rollingCurrentPointerCount: number;
  evidenceVersions: string[];
  fallbackPolicy: string[];
  compatibilityGuarantees: string[];
  status: string;
  evidencePath: string | null;
}

export interface JavaCompletedShardEvidenceVerificationReference {
  project: "advanced-order-platform" | "unknown";
  version: string;
  readOnly: boolean;
  executionAllowed: boolean;
  sourceIndexVersion: string;
  sourceIndexEvidencePath: string | null;
  verifiedEntryCount: number;
  verifiedEvidenceVersions: string[];
  checkCount: number;
  passedCheckCount: number;
  failedCheckCount: number;
  fallbackPolicy: string[];
  status: string;
  evidencePath: string | null;
}

export interface MiniKvCompletedShardEvidenceReference {
  project: "mini-kv" | "unknown";
  contract: string;
  evidenceType: string;
  releaseVersion: string;
  readOnly: boolean;
  executionAllowed: boolean;
  shardEnabled: boolean;
  shardCount: number;
  slotCount: number;
  routingMode: string;
  status: string;
  evidencePath: string | null;
  previousConsumedReleaseVersion: string | null;
  previousConsumedFixturePath: string | null;
  rollingCurrentUsedForHistoricalBaseline: boolean;
  nodeV376ConsumptionPreserved: boolean;
  archivedNodeVersions: string[];
  changesArchivedNodeEvidence: boolean;
  writeCommandsAllowed: boolean;
  adminCommandsAllowed: boolean;
  loadRestoreCompactAllowed: boolean;
  activeRouterInstalled: boolean;
  storageDirectoriesCreated: boolean;
  multiProcessStarted: boolean;
  futureNodeConsumer: string | null;
  evidenceDigest: string | null;
}

export interface CompletedShardEvidenceIntakeRecord {
  intakeMode: "java-mini-kv-completed-shard-readiness-evidence-intake";
  sourceSpan: "Node v377 + Java v156/v155 + mini-kv v146";
  sourceNodeV377Digest: string;
  javaV156Digest: string | null;
  javaV155Digest: string | null;
  miniKvV146Digest: string | null;
  intakeDigest: string;
  usesFrozenJavaV156Verification: boolean;
  usesFrozenJavaV155Index: boolean;
  usesFrozenMiniKvV146Snapshot: boolean;
  consumesRollingCurrentAsHistoricalBaseline: false;
  startsUpstreamServices: false;
  stopsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  nextNodeVersionSuggested: "Node v379";
}

export interface CompletedShardEvidenceIntakeChecks {
  sourceNodeV377Ready: boolean;
  sourceNodeV377ArchiveVerified: boolean;
  sourceNodeV377BoundariesClosed: boolean;
  javaV156VerificationFilePresent: boolean;
  javaV155IndexFilePresent: boolean;
  javaV156VersionValid: boolean;
  javaV155VersionValid: boolean;
  javaV156ReadOnly: boolean;
  javaV156ExecutionBlocked: boolean;
  javaV156StatusPassed: boolean;
  javaV156ChecksAllPassed: boolean;
  javaV156ReferencesJavaV155: boolean;
  javaV156VerifiedEntryCountValid: boolean;
  javaV156NoRollingCurrentPolicy: boolean;
  javaV155EntriesFrozen: boolean;
  javaV155NoRollingCurrentPointers: boolean;
  javaV155RequiredFieldsIndexed: boolean;
  miniKvV146SnapshotPresent: boolean;
  miniKvV146ReleaseVersionValid: boolean;
  miniKvV146ReadOnly: boolean;
  miniKvV146ExecutionBlocked: boolean;
  miniKvV146StatusAccepted: boolean;
  miniKvV146HistoricalFallbackHardened: boolean;
  miniKvV146PreservesNodeV376: boolean;
  miniKvV146DoesNotMutateArchivedNodeEvidence: boolean;
  miniKvV146BoundarySafe: boolean;
  miniKvV146FutureNodeConsumerReady: boolean;
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
  readyForCompletedShardReadinessEvidenceIntake: boolean;
}

export interface CompletedShardEvidenceIntakeSummary {
  evidenceSourceCount: number;
  readyEvidenceSourceCount: number;
  javaVerificationCheckCount: number;
  javaVerificationPassedCheckCount: number;
  requiredContractFieldCount: number;
  archivedNodeVersionCount: number;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface CompletedShardEvidenceIntakeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-completed-shard-readiness-evidence-intake.v1";
  intakeState: "java-mini-kv-completed-shard-readiness-evidence-intake-ready" | "blocked";
  intakeDecision: "consume-java-v156-and-mini-kv-v146-completed-evidence" | "blocked";
  readyForCompletedShardReadinessEvidenceIntake: boolean;
  readyForNodeV379ArchiveVerification: boolean;
  activeNodeVersion: "Node v378";
  sourceNodeVersion: "Node v377";
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
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  sourceNodeV377: SourceNodeV377ArchiveVerificationReference;
  javaIndexFile: CompletedShardEvidenceFileReference;
  javaVerificationFile: CompletedShardEvidenceFileReference;
  miniKvSnapshotFile: CompletedShardEvidenceFileReference;
  javaIndex: JavaCompletedShardEvidenceIndexReference;
  javaVerification: JavaCompletedShardEvidenceVerificationReference;
  miniKvEvidence: MiniKvCompletedShardEvidenceReference;
  intake: CompletedShardEvidenceIntakeRecord;
  checks: CompletedShardEvidenceIntakeChecks;
  summary: CompletedShardEvidenceIntakeSummary;
  productionBlockers: CompletedShardEvidenceIntakeMessage[];
  warnings: CompletedShardEvidenceIntakeMessage[];
  recommendations: CompletedShardEvidenceIntakeMessage[];
  evidenceEndpoints: {
    completedEvidenceIntakeJson: string;
    completedEvidenceIntakeMarkdown: string;
    sourceNodeV377Json: string;
    sourceNodeV377Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v379";
  };
  nextActions: string[];
}
