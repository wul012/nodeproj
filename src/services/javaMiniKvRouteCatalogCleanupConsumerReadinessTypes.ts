import type { MiniKvPostCloseoutReleaseVersion } from "./javaMiniKvRouteCatalogCleanupConsumerReadinessMiniKvSupport.js";
import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";

export interface JavaConsumerEvidenceDigest {
  version: string | null;
  status: string | null;
  scope: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  receiptId: string | null;
  endpoint: string | null;
  fixtureEndpoint: string | null;
  verificationChecklistEndpoint: string | null;
  digestEvidenceCount: number;
  digestCheckCount: number;
  validationCount: number;
  boundaryRuntimeClosed: boolean;
}

export interface JavaConsumerEvidenceDigestFixture {
  project: string | null;
  version: string | null;
  contractName: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  shardEnabled: boolean | null;
  evidenceDigestEndpoint: string | null;
  evidenceDigestFixtureEndpoint: string | null;
  verificationChecklistEndpoint: string | null;
  verificationChecklistFixtureEndpoint: string | null;
  checklistItemCount: number | null;
  requiredEvidenceCount: number | null;
  verificationCheckCount: number | null;
  digestEvidenceCount: number;
  digestCheckCount: number;
  blockedOperationCount: number;
  probesAreGetOnly: boolean | null;
  upstreamActionsAllowed: boolean | null;
  startsJavaService: boolean | null;
  startsMiniKvService: boolean | null;
  nodeMayStartOrStopJavaOrMiniKv: boolean | null;
  status: string | null;
}

export interface JavaConsumerReadinessGuard {
  version: string | null;
  status: string | null;
  scope: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  receiptId: string | null;
  guardCount: number;
  validationCount: number;
  boundaryRuntimeClosed: boolean;
}

export interface MiniKvPostCloseoutReleaseEvidence {
  releaseVersion: MiniKvPostCloseoutReleaseVersion | string | null;
  status: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  shardEnabled: boolean | null;
  evidenceDigest: string | null;
  previousConsumedReleaseVersion: string | null;
  previousConsumptionNodeVersion: string | null;
  nodeConsumer: string | null;
  stageSequence: number | null;
  sourceFrozenReleaseVersion: string | null;
  trackedPostCloseoutReleaseCount: number | null;
  readyForNextNodeBatch: boolean | null;
  fieldCount: number | null;
  groupCount: number | null;
  archivedNodeVersionCount: number;
  historicalFixtureCount: number;
  writeCommandsAllowed: boolean | null;
  adminCommandsAllowed: boolean | null;
  activeRouterInstalled: boolean | null;
  changesArchivedNodeEvidence: boolean | null;
}

export interface MiniKvLatestAuditNoteEvidence {
  releaseVersion: "v210";
  sourceVersionedRelease: "v209";
  rollingCurrentRejectedForBaseline: true;
  noteFilePresent: boolean;
  noteMentionsRollingFixture: boolean;
  noteMentionsFallbackV209: boolean;
  noteMentionsAllTestsPassed: boolean;
  noteMentionsTcpSmoke: boolean;
}

export interface JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence {
  files: {
    javaV220ConsumerEvidenceDigest: HistoricalEvidenceFile;
    javaV220ConsumerEvidenceDigestFixture: HistoricalEvidenceFile;
    javaV221ConsumerEvidenceDigestSnapshotFreeze: HistoricalEvidenceFile;
    javaV222ConsumerEvidenceDigestHistoricalCompatibility: HistoricalEvidenceFile;
    javaV223ConsumerEvidenceDigestIntegrity: HistoricalEvidenceFile;
    javaV224ConsumerReadinessCompletion: HistoricalEvidenceFile;
    miniKvV210RouteCatalogCleanupPostCloseoutAuditNote: HistoricalEvidenceFile;
  } & Record<`miniKv${MiniKvPostCloseoutReleaseVersion}PostCloseoutContinuity`, HistoricalEvidenceFile>;
  snippets: {
    miniKvV210RollingFixture: HistoricalSnippetMatch;
    miniKvV210FallbackV209: HistoricalSnippetMatch;
    miniKvV210AllTestsPassed: HistoricalSnippetMatch;
    miniKvV210TcpSmoke: HistoricalSnippetMatch;
  };
  javaV220ConsumerEvidenceDigest: JavaConsumerEvidenceDigest;
  javaV220ConsumerEvidenceDigestFixture: JavaConsumerEvidenceDigestFixture;
  javaV221ConsumerEvidenceDigestSnapshotFreeze: JavaConsumerReadinessGuard;
  javaV222ConsumerEvidenceDigestHistoricalCompatibility: JavaConsumerReadinessGuard;
  javaV223ConsumerEvidenceDigestIntegrity: JavaConsumerReadinessGuard;
  javaV224ConsumerReadinessCompletion: JavaConsumerReadinessGuard;
  miniKvPostCloseoutReleases: MiniKvPostCloseoutReleaseEvidence[];
  miniKvLatestAuditNote: MiniKvLatestAuditNoteEvidence;
  checks: {
    javaV220FilePresent: boolean;
    javaV220DigestReady: boolean;
    javaV220DigestCountsStable: boolean;
    javaV220FixtureFilePresent: boolean;
    javaV220FixtureReady: boolean;
    javaV220FixtureGetOnlyBoundary: boolean;
    javaV221FilePresent: boolean;
    javaV221SnapshotFreezeReady: boolean;
    javaV222FilePresent: boolean;
    javaV222HistoricalCompatibilityReady: boolean;
    javaV223FilePresent: boolean;
    javaV223IntegrityReady: boolean;
    javaV224FilePresent: boolean;
    javaV224CompletionReady: boolean;
    miniKvVersionedReleaseFilesPresent: boolean;
    miniKvPostCloseoutReleaseChainReady: boolean;
    miniKvPostCloseoutReleaseChainSequential: boolean;
    miniKvPostCloseoutDigestsStable: boolean;
    miniKvV210AuditNotePresent: boolean;
    miniKvV210AuditNoteDocumentsRollingBoundary: boolean;
    noRuntimeAuthorityOpened: boolean;
  };
  summary: {
    fileCount: number;
    presentFileCount: number;
    checkCount: number;
    passedCheckCount: number;
    javaGuardCount: number;
    javaDigestEvidenceCount: number;
    miniKvVersionedReleaseCount: number;
    miniKvLatestVersionedRelease: string | null;
    miniKvLatestObservedAuditRelease: "v210";
    miniKvLatestVersionedFixtureCount: number;
    miniKvBoundaryGroupCount: number | null;
  };
}
