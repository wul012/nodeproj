import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionTypes.js";

export interface JavaMiniKvShardEvidenceConsumptionArchiveFileReference {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface JavaMiniKvShardEvidenceConsumptionArchiveReferences {
  archiveRoot: "e/376";
  jsonEvidence: JavaMiniKvShardEvidenceConsumptionArchiveFileReference;
  markdownEvidence: JavaMiniKvShardEvidenceConsumptionArchiveFileReference;
  summaryEvidence: JavaMiniKvShardEvidenceConsumptionArchiveFileReference;
  browserSnapshot: JavaMiniKvShardEvidenceConsumptionArchiveFileReference;
  htmlArchive: JavaMiniKvShardEvidenceConsumptionArchiveFileReference;
  screenshot: JavaMiniKvShardEvidenceConsumptionArchiveFileReference;
  explanation: JavaMiniKvShardEvidenceConsumptionArchiveFileReference;
  codeWalkthrough: JavaMiniKvShardEvidenceConsumptionArchiveFileReference;
  sourcePlan: JavaMiniKvShardEvidenceConsumptionArchiveFileReference;
  plansIndex: JavaMiniKvShardEvidenceConsumptionArchiveFileReference;
  archiveIndex: JavaMiniKvShardEvidenceConsumptionArchiveFileReference;
}

export interface SourceNodeV376JavaMiniKvShardEvidenceConsumptionArchiveReference {
  sourceVersion: "Node v376";
  profileVersion: string;
  evidenceConsumptionState: "java-mini-kv-shard-readiness-evidence-consumed" | "blocked";
  evidenceConsumptionDecision: "consume-java-v154-and-mini-kv-v145-hardening" | "blocked";
  readyForJavaMiniKvShardReadinessEvidenceConsumption: boolean;
  readyForNodeV377ShardReadinessEvidenceConsumptionArchiveVerification: boolean;
  activeNodeVersion: "Node v376";
  sourceNodeVersion: string;
  sourceNodeV375Ready: boolean;
  consumptionDigest: string;
  sourceNodeV375Digest: string;
  javaVersion: string;
  javaSourceCoreVersion: string | null;
  miniKvReleaseVersion: string | null;
  javaHardeningDigest: string | null;
  javaSourceCoreDigest: string | null;
  miniKvDigest: string | null;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  historicalFallbackCovered: boolean;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  executionAllowed: false;
}

export interface ForcedHistoricalFallbackReplayReference {
  replayState: "ready" | "blocked";
  replayedProfileVersion: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionProfile["profileVersion"];
  readyForJavaMiniKvShardReadinessEvidenceConsumption: boolean;
  javaHardeningUsedHistoricalFallback: boolean;
  javaSourceCoreUsedHistoricalFallback: boolean;
  miniKvUsedHistoricalFallback: boolean;
  miniKvResolvedPath: string;
  miniKvReleaseVersion: string | null;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  executionAllowed: false;
}

export interface JavaMiniKvShardEvidenceConsumptionArchiveVerificationRecord {
  archiveVerificationDigest: string;
  verificationMode: "java-mini-kv-shard-readiness-evidence-consumption-archive-verification";
  sourceSpan: "Node v376 Java/mini-kv shard readiness evidence consumption";
  archiveRoot: "e/376";
  archiveVerificationDecision: "archive-java-mini-kv-shard-evidence-consumption-and-prepare-v378" | "blocked";
  sourceConsumptionDigest: string;
  sourceNodeV375Digest: string;
  forcedHistoricalFallbackReplayReady: boolean;
  verifiesJsonMarkdownAndSummary: true;
  verifiesScreenshotExplanationAndWalkthrough: true;
  verifiesPlanAndArchiveIndexes: true;
  verifiesForcedHistoricalFallback: true;
  rerunsLiveRead: false;
  startsUpstreamServices: false;
  stopsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  nextNodeVersionSuggested: "Node v378";
  archiveFileDigests: Array<{
    path: string;
    digest: string | null;
    byteLength: number;
  }>;
}

export type JavaMiniKvShardEvidenceConsumptionArchiveVerificationChecks = {
  archiveFilesPresent: boolean;
  jsonEvidenceReadable: boolean;
  jsonProfileVersionValid: boolean;
  jsonEvidenceConsumptionReady: boolean;
  jsonSourceNodeV375Ready: boolean;
  jsonEvidenceVersionsMatch: boolean;
  jsonConsumptionDigestStable: boolean;
  jsonChecksAllPassed: boolean;
  summaryMatchesJson: boolean;
  markdownRecordsConsumption: boolean;
  browserSnapshotPresent: boolean;
  screenshotAndHtmlPresent: boolean;
  explanationRecordsBoundaryAndFallback: boolean;
  codeWalkthroughPresent: boolean;
  sourcePlanPointsToV377AndParallelUpstreams: boolean;
  planIndexReferencesV376AndV377: boolean;
  archiveIndexReferencesV376: boolean;
  routeRecordedInArchive: boolean;
  forcedHistoricalFallbackReplayReady: boolean;
  forcedFallbackUsesVersionedMiniKvSnapshot: boolean;
  archiveVerificationDoesNotRerunLiveRead: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  archiveVerificationDigestStable: boolean;
  readyForJavaMiniKvShardEvidenceConsumptionArchiveVerification: boolean;
};

export interface JavaMiniKvShardEvidenceConsumptionArchiveVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  forcedFallbackCheckCount: number;
  forcedFallbackPassedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface JavaMiniKvShardEvidenceConsumptionArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "archive-files"
    | "archive-json"
    | "archive-markdown"
    | "archive-docs"
    | "node-v376"
    | "forced-historical-fallback"
    | "runtime-boundary"
    | "archive-verification";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-shard-readiness-evidence-consumption-archive-verification.v1";
  archiveVerificationState: "java-mini-kv-shard-readiness-evidence-consumption-archive-verified" | "blocked";
  archiveVerificationDecision: "archive-java-mini-kv-shard-evidence-consumption-and-prepare-v378" | "blocked";
  readyForJavaMiniKvShardEvidenceConsumptionArchiveVerification: boolean;
  readyForNodeV378CompletedEvidenceIntake: boolean;
  consumesNodeV376JavaMiniKvShardEvidenceConsumption: true;
  activeNodeVersion: "Node v377";
  sourceNodeVersion: "Node v376";
  archiveVerificationOnly: true;
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
  archiveReferences: JavaMiniKvShardEvidenceConsumptionArchiveReferences;
  sourceNodeV376: SourceNodeV376JavaMiniKvShardEvidenceConsumptionArchiveReference;
  forcedHistoricalFallbackReplay: ForcedHistoricalFallbackReplayReference;
  archiveVerification: JavaMiniKvShardEvidenceConsumptionArchiveVerificationRecord;
  checks: JavaMiniKvShardEvidenceConsumptionArchiveVerificationChecks;
  summary: JavaMiniKvShardEvidenceConsumptionArchiveVerificationSummary;
  productionBlockers: JavaMiniKvShardEvidenceConsumptionArchiveVerificationMessage[];
  warnings: JavaMiniKvShardEvidenceConsumptionArchiveVerificationMessage[];
  recommendations: JavaMiniKvShardEvidenceConsumptionArchiveVerificationMessage[];
  evidenceEndpoints: {
    archiveVerificationJson: string;
    archiveVerificationMarkdown: string;
    sourceNodeV376Json: string;
    sourceNodeV376Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
