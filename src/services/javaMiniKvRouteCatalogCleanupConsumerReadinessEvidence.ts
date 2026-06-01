import {
  booleanField,
  evidenceFile,
  numberField,
  objectField,
  readJsonObject,
  snippet,
  snippetMatched,
  stringArrayField,
  stringField,
  type HistoricalEvidenceFile,
  type HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";
import { countPassedReportChecks, countReportChecks } from "./liveProbeReportUtils.js";

export const JAVA_V220_CONSUMER_EVIDENCE_DIGEST =
  "D:/javaproj/advanced-order-platform/e/220/evidence/java-shard-readiness-v1-contract-consumer-evidence-digest-v220.json";
export const JAVA_V220_CONSUMER_EVIDENCE_DIGEST_FIXTURE =
  "D:/javaproj/advanced-order-platform/src/main/resources/static/contracts/java-shard-readiness-v1-contract-consumer-evidence-digest-v220.fixture.json";
export const JAVA_V221_CONSUMER_EVIDENCE_DIGEST_SNAPSHOT_FREEZE =
  "D:/javaproj/advanced-order-platform/e/221/evidence/java-shard-readiness-v220-consumer-evidence-digest-snapshot-freeze-v221.json";
export const JAVA_V222_CONSUMER_EVIDENCE_DIGEST_HISTORICAL_COMPATIBILITY =
  "D:/javaproj/advanced-order-platform/e/222/evidence/java-shard-readiness-v220-consumer-evidence-digest-historical-compatibility-v222.json";
export const JAVA_V223_CONSUMER_EVIDENCE_DIGEST_INTEGRITY =
  "D:/javaproj/advanced-order-platform/e/223/evidence/java-shard-readiness-v1-contract-consumer-evidence-digest-integrity-v223.json";
export const JAVA_V224_CONSUMER_READINESS_COMPLETION =
  "D:/javaproj/advanced-order-platform/e/224/evidence/java-shard-readiness-v1-contract-consumer-readiness-completion-v224.json";
export const MINI_KV_V210_ROUTE_CATALOG_CLEANUP_POST_CLOSEOUT_AUDIT_NOTE =
  "D:/C/mini-kv/e/210/解释/说明.md";

const MINI_KV_RELEASES = [202, 203, 204, 205, 206, 207, 208, 209] as const;
const MINI_KV_EXPECTED_DIGESTS: Record<MiniKvPostCloseoutReleaseVersion, string> = {
  v202: "fnv1a64:cd0c634b2fc44eff",
  v203: "fnv1a64:bed1ac036b8f548e",
  v204: "fnv1a64:670b62f7c203b814",
  v205: "fnv1a64:c00dd62f28564fed",
  v206: "fnv1a64:1e5f3dc941b1a90e",
  v207: "fnv1a64:16dd9ba05e5b3fe4",
  v208: "fnv1a64:ef5973d3894665a6",
  v209: "fnv1a64:6c283479e8bb1988",
};

type MiniKvPostCloseoutReleaseVersion =
  | "v202"
  | "v203"
  | "v204"
  | "v205"
  | "v206"
  | "v207"
  | "v208"
  | "v209";

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

export function loadJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence():
  JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence {
  const miniKvFiles = Object.fromEntries(MINI_KV_RELEASES.map((version) => [
    `miniKvv${version}PostCloseoutContinuity`,
    evidenceFile(
      `mini-kv-v${version}-post-closeout-continuity`,
      `D:/C/mini-kv/fixtures/release/shard-readiness-v${version}.json`,
    ),
  ])) as Record<`miniKv${MiniKvPostCloseoutReleaseVersion}PostCloseoutContinuity`, HistoricalEvidenceFile>;
  const files = {
    javaV220ConsumerEvidenceDigest:
      evidenceFile("java-v220-consumer-evidence-digest", JAVA_V220_CONSUMER_EVIDENCE_DIGEST),
    javaV220ConsumerEvidenceDigestFixture:
      evidenceFile("java-v220-consumer-evidence-digest-fixture", JAVA_V220_CONSUMER_EVIDENCE_DIGEST_FIXTURE),
    javaV221ConsumerEvidenceDigestSnapshotFreeze:
      evidenceFile("java-v221-consumer-evidence-digest-snapshot-freeze",
        JAVA_V221_CONSUMER_EVIDENCE_DIGEST_SNAPSHOT_FREEZE),
    javaV222ConsumerEvidenceDigestHistoricalCompatibility:
      evidenceFile("java-v222-consumer-evidence-digest-historical-compatibility",
        JAVA_V222_CONSUMER_EVIDENCE_DIGEST_HISTORICAL_COMPATIBILITY),
    javaV223ConsumerEvidenceDigestIntegrity:
      evidenceFile("java-v223-consumer-evidence-digest-integrity", JAVA_V223_CONSUMER_EVIDENCE_DIGEST_INTEGRITY),
    javaV224ConsumerReadinessCompletion:
      evidenceFile("java-v224-consumer-readiness-completion", JAVA_V224_CONSUMER_READINESS_COMPLETION),
    miniKvV210RouteCatalogCleanupPostCloseoutAuditNote:
      evidenceFile("mini-kv-v210-route-catalog-cleanup-post-closeout-audit-note",
        MINI_KV_V210_ROUTE_CATALOG_CLEANUP_POST_CLOSEOUT_AUDIT_NOTE),
    ...miniKvFiles,
  };
  const snippets = {
    miniKvV210RollingFixture:
      snippet("mini-kv-v210-rolling-fixture", MINI_KV_V210_ROUTE_CATALOG_CLEANUP_POST_CLOSEOUT_AUDIT_NOTE,
        "rolling fixture is v210"),
    miniKvV210FallbackV209:
      snippet("mini-kv-v210-fallback-v209", MINI_KV_V210_ROUTE_CATALOG_CLEANUP_POST_CLOSEOUT_AUDIT_NOTE,
        "fallback `v209`"),
    miniKvV210AllTestsPassed:
      snippet("mini-kv-v210-all-tests-passed", MINI_KV_V210_ROUTE_CATALOG_CLEANUP_POST_CLOSEOUT_AUDIT_NOTE,
        "all 71 tests passed"),
    miniKvV210TcpSmoke:
      snippet("mini-kv-v210-tcp-smoke", MINI_KV_V210_ROUTE_CATALOG_CLEANUP_POST_CLOSEOUT_AUDIT_NOTE,
        "TCP smoke returned v210"),
  };
  const javaV220ConsumerEvidenceDigest =
    createJavaConsumerEvidenceDigest(readJsonObject(JAVA_V220_CONSUMER_EVIDENCE_DIGEST));
  const javaV220ConsumerEvidenceDigestFixture =
    createJavaConsumerEvidenceDigestFixture(readJsonObject(JAVA_V220_CONSUMER_EVIDENCE_DIGEST_FIXTURE));
  const javaV221ConsumerEvidenceDigestSnapshotFreeze =
    createJavaConsumerReadinessGuard(readJsonObject(JAVA_V221_CONSUMER_EVIDENCE_DIGEST_SNAPSHOT_FREEZE));
  const javaV222ConsumerEvidenceDigestHistoricalCompatibility =
    createJavaConsumerReadinessGuard(readJsonObject(JAVA_V222_CONSUMER_EVIDENCE_DIGEST_HISTORICAL_COMPATIBILITY));
  const javaV223ConsumerEvidenceDigestIntegrity =
    createJavaConsumerReadinessGuard(readJsonObject(JAVA_V223_CONSUMER_EVIDENCE_DIGEST_INTEGRITY));
  const javaV224ConsumerReadinessCompletion =
    createJavaConsumerReadinessGuard(readJsonObject(JAVA_V224_CONSUMER_READINESS_COMPLETION));
  const miniKvPostCloseoutReleases = MINI_KV_RELEASES.map((version) =>
    createMiniKvPostCloseoutRelease(readJsonObject(`D:/C/mini-kv/fixtures/release/shard-readiness-v${version}.json`)));
  const miniKvLatestAuditNote = createMiniKvLatestAuditNote(files, snippets);
  const checks = createChecks({
    files,
    javaV220ConsumerEvidenceDigest,
    javaV220ConsumerEvidenceDigestFixture,
    javaV221ConsumerEvidenceDigestSnapshotFreeze,
    javaV222ConsumerEvidenceDigestHistoricalCompatibility,
    javaV223ConsumerEvidenceDigestIntegrity,
    javaV224ConsumerReadinessCompletion,
    miniKvPostCloseoutReleases,
    miniKvLatestAuditNote,
  });
  const latestMiniKv = miniKvPostCloseoutReleases.at(-1);

  return {
    files,
    snippets,
    javaV220ConsumerEvidenceDigest,
    javaV220ConsumerEvidenceDigestFixture,
    javaV221ConsumerEvidenceDigestSnapshotFreeze,
    javaV222ConsumerEvidenceDigestHistoricalCompatibility,
    javaV223ConsumerEvidenceDigestIntegrity,
    javaV224ConsumerReadinessCompletion,
    miniKvPostCloseoutReleases,
    miniKvLatestAuditNote,
    checks,
    summary: {
      fileCount: Object.keys(files).length,
      presentFileCount: Object.values(files).filter((file) => file.exists).length,
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      javaGuardCount:
        javaV221ConsumerEvidenceDigestSnapshotFreeze.guardCount
        + javaV222ConsumerEvidenceDigestHistoricalCompatibility.guardCount
        + javaV223ConsumerEvidenceDigestIntegrity.guardCount
        + javaV224ConsumerReadinessCompletion.guardCount,
      javaDigestEvidenceCount: javaV220ConsumerEvidenceDigest.digestEvidenceCount,
      miniKvVersionedReleaseCount: miniKvPostCloseoutReleases.length,
      miniKvLatestVersionedRelease: latestMiniKv?.releaseVersion ?? null,
      miniKvLatestObservedAuditRelease: "v210",
      miniKvLatestVersionedFixtureCount: latestMiniKv?.historicalFixtureCount ?? 0,
      miniKvBoundaryGroupCount: latestMiniKv?.groupCount ?? null,
    },
  };
}

function createJavaConsumerEvidenceDigest(source: Record<string, unknown>): JavaConsumerEvidenceDigest {
  return {
    version: stringField(source, "version"),
    status: stringField(source, "status"),
    scope: stringField(source, "scope"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    receiptId: stringField(source, "receiptId"),
    endpoint: stringField(source, "endpoint"),
    fixtureEndpoint: stringField(source, "fixtureEndpoint"),
    verificationChecklistEndpoint: stringField(source, "verificationChecklistEndpoint"),
    digestEvidenceCount: stringArrayField(source, "digestEvidence").length,
    digestCheckCount: stringArrayField(source, "digestChecks").length,
    validationCount: stringArrayField(source, "validation").length,
    boundaryRuntimeClosed: javaBoundaryRuntimeClosed(objectField(source, "boundary")),
  };
}

function createJavaConsumerEvidenceDigestFixture(
  source: Record<string, unknown>,
): JavaConsumerEvidenceDigestFixture {
  return {
    project: stringField(source, "project"),
    version: stringField(source, "version"),
    contractName: stringField(source, "contractName"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    shardEnabled: booleanField(source, "shardEnabled"),
    evidenceDigestEndpoint: stringField(source, "evidenceDigestEndpoint"),
    evidenceDigestFixtureEndpoint: stringField(source, "evidenceDigestFixtureEndpoint"),
    verificationChecklistEndpoint: stringField(source, "verificationChecklistEndpoint"),
    verificationChecklistFixtureEndpoint: stringField(source, "verificationChecklistFixtureEndpoint"),
    checklistItemCount: numberField(source, "checklistItemCount"),
    requiredEvidenceCount: numberField(source, "requiredEvidenceCount"),
    verificationCheckCount: numberField(source, "verificationCheckCount"),
    digestEvidenceCount: stringArrayField(source, "digestEvidence").length,
    digestCheckCount: stringArrayField(source, "digestChecks").length,
    blockedOperationCount: stringArrayField(source, "blockedOperations").length,
    probesAreGetOnly: booleanField(source, "probesAreGetOnly"),
    upstreamActionsAllowed: booleanField(source, "upstreamActionsAllowed"),
    startsJavaService: booleanField(source, "startsJavaService"),
    startsMiniKvService: booleanField(source, "startsMiniKvService"),
    nodeMayStartOrStopJavaOrMiniKv: booleanField(source, "nodeMayStartOrStopJavaOrMiniKv"),
    status: stringField(source, "status"),
  };
}

function createJavaConsumerReadinessGuard(source: Record<string, unknown>): JavaConsumerReadinessGuard {
  return {
    version: stringField(source, "version"),
    status: stringField(source, "status"),
    scope: stringField(source, "scope"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    receiptId: stringField(source, "receiptId"),
    guardCount: stringArrayField(source, "guards").length,
    validationCount: stringArrayField(source, "validation").length,
    boundaryRuntimeClosed: javaBoundaryRuntimeClosed(objectField(source, "boundary")),
  };
}

function createMiniKvPostCloseoutRelease(source: Record<string, unknown>): MiniKvPostCloseoutReleaseEvidence {
  const continuity = objectField(source, "nodeRouteCatalogCleanupPostCloseoutContinuity");
  const historicalFallback = objectField(source, "historicalFallback");
  const diagnostics = objectField(source, "diagnostics");
  const boundaryCatalog = objectField(source, "boundaryCatalogIndex");
  const archiveCompatibility = objectField(source, "archiveCompatibility");
  const fixtureParity = objectField(source, "fixtureParity");
  const boundaries = objectField(source, "boundaries");

  return {
    releaseVersion: stringField(source, "releaseVersion"),
    status: stringField(source, "status"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    shardEnabled: booleanField(source, "shardEnabled"),
    evidenceDigest: stringField(source, "evidenceDigest"),
    previousConsumedReleaseVersion: stringField(historicalFallback, "previousConsumedReleaseVersion"),
    previousConsumptionNodeVersion: stringField(historicalFallback, "previousConsumptionNodeVersion"),
    nodeConsumer: stringField(diagnostics, "nodeConsumer"),
    stageSequence: numberField(continuity, "stageSequence"),
    sourceFrozenReleaseVersion: stringField(continuity, "sourceFrozenReleaseVersion"),
    trackedPostCloseoutReleaseCount: numberField(continuity, "trackedPostCloseoutReleaseCount"),
    readyForNextNodeBatch: booleanField(continuity, "readyForNextNodeBatch"),
    fieldCount: numberField(boundaryCatalog, "fieldCount"),
    groupCount: numberField(boundaryCatalog, "groupCount"),
    archivedNodeVersionCount: stringArrayField(archiveCompatibility, "archivedNodeVersions").length,
    historicalFixtureCount: stringArrayField(fixtureParity, "historicalFixturePaths").length,
    writeCommandsAllowed: booleanField(boundaries, "writeCommandsAllowed"),
    adminCommandsAllowed: booleanField(boundaries, "adminCommandsAllowed"),
    activeRouterInstalled: booleanField(boundaries, "activeRouterInstalled"),
    changesArchivedNodeEvidence: booleanField(archiveCompatibility, "changesArchivedNodeEvidence"),
  };
}

function createMiniKvLatestAuditNote(
  files: JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence["files"],
  snippets: JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence["snippets"],
): MiniKvLatestAuditNoteEvidence {
  return {
    releaseVersion: "v210",
    sourceVersionedRelease: "v209",
    rollingCurrentRejectedForBaseline: true,
    noteFilePresent: files.miniKvV210RouteCatalogCleanupPostCloseoutAuditNote.exists,
    noteMentionsRollingFixture: snippetMatched(Object.values(snippets), "mini-kv-v210-rolling-fixture"),
    noteMentionsFallbackV209: snippetMatched(Object.values(snippets), "mini-kv-v210-fallback-v209"),
    noteMentionsAllTestsPassed: snippetMatched(Object.values(snippets), "mini-kv-v210-all-tests-passed"),
    noteMentionsTcpSmoke: snippetMatched(Object.values(snippets), "mini-kv-v210-tcp-smoke"),
  };
}

function createChecks(input: {
  files: JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence["files"];
  javaV220ConsumerEvidenceDigest: JavaConsumerEvidenceDigest;
  javaV220ConsumerEvidenceDigestFixture: JavaConsumerEvidenceDigestFixture;
  javaV221ConsumerEvidenceDigestSnapshotFreeze: JavaConsumerReadinessGuard;
  javaV222ConsumerEvidenceDigestHistoricalCompatibility: JavaConsumerReadinessGuard;
  javaV223ConsumerEvidenceDigestIntegrity: JavaConsumerReadinessGuard;
  javaV224ConsumerReadinessCompletion: JavaConsumerReadinessGuard;
  miniKvPostCloseoutReleases: MiniKvPostCloseoutReleaseEvidence[];
  miniKvLatestAuditNote: MiniKvLatestAuditNoteEvidence;
}): JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence["checks"] {
  const javaV220 = input.javaV220ConsumerEvidenceDigest;
  const javaV220Fixture = input.javaV220ConsumerEvidenceDigestFixture;
  const javaV221 = input.javaV221ConsumerEvidenceDigestSnapshotFreeze;
  const javaV222 = input.javaV222ConsumerEvidenceDigestHistoricalCompatibility;
  const javaV223 = input.javaV223ConsumerEvidenceDigestIntegrity;
  const javaV224 = input.javaV224ConsumerReadinessCompletion;
  const miniKvReleases = input.miniKvPostCloseoutReleases;

  return {
    javaV220FilePresent: input.files.javaV220ConsumerEvidenceDigest.exists,
    javaV220DigestReady:
      javaV220.version === "Java v220"
      && javaV220.status === "passed"
      && javaV220.readOnly === true
      && javaV220.executionAllowed === false
      && javaV220.scope === "v1 contract consumer evidence digest",
    javaV220DigestCountsStable:
      javaV220.endpoint === "/api/v1/ops/shard-readiness/v1-contract-consumer-evidence-digest"
      && javaV220.fixtureEndpoint === "/contracts/java-shard-readiness-v1-contract-consumer-evidence-digest-v220.fixture.json"
      && javaV220.verificationChecklistEndpoint
        === "/api/v1/ops/shard-readiness/v1-contract-consumer-verification-checklist"
      && javaV220.digestEvidenceCount === 5
      && javaV220.digestCheckCount === 7
      && javaV220.validationCount === 2
      && javaV220.boundaryRuntimeClosed,
    javaV220FixtureFilePresent: input.files.javaV220ConsumerEvidenceDigestFixture.exists,
    javaV220FixtureReady:
      javaV220Fixture.project === "advanced-order-platform"
      && javaV220Fixture.version === "Java v220"
      && javaV220Fixture.contractName === "shard-readiness.v1"
      && javaV220Fixture.status === "passed"
      && javaV220Fixture.shardEnabled === false
      && javaV220Fixture.checklistItemCount === 7
      && javaV220Fixture.requiredEvidenceCount === 5
      && javaV220Fixture.verificationCheckCount === 7,
    javaV220FixtureGetOnlyBoundary:
      javaV220Fixture.digestEvidenceCount === 5
      && javaV220Fixture.digestCheckCount === 7
      && javaV220Fixture.blockedOperationCount === 7
      && javaV220Fixture.probesAreGetOnly === true
      && javaV220Fixture.upstreamActionsAllowed === false
      && javaV220Fixture.startsJavaService === false
      && javaV220Fixture.startsMiniKvService === false
      && javaV220Fixture.nodeMayStartOrStopJavaOrMiniKv === false,
    javaV221FilePresent: input.files.javaV221ConsumerEvidenceDigestSnapshotFreeze.exists,
    javaV221SnapshotFreezeReady:
      javaGuardReady(javaV221, "Java v221", "v220 consumer evidence digest snapshot freeze", 5),
    javaV222FilePresent: input.files.javaV222ConsumerEvidenceDigestHistoricalCompatibility.exists,
    javaV222HistoricalCompatibilityReady:
      javaGuardReady(javaV222, "Java v222", "v220 consumer evidence digest historical compatibility", 4),
    javaV223FilePresent: input.files.javaV223ConsumerEvidenceDigestIntegrity.exists,
    javaV223IntegrityReady:
      javaGuardReady(javaV223, "Java v223", "v1 contract consumer evidence digest integrity", 6),
    javaV224FilePresent: input.files.javaV224ConsumerReadinessCompletion.exists,
    javaV224CompletionReady:
      javaGuardReady(javaV224, "Java v224", "v1 contract consumer readiness completion", 5),
    miniKvVersionedReleaseFilesPresent:
      MINI_KV_RELEASES.every((version) =>
        input.files[`miniKvv${version}PostCloseoutContinuity` as const].exists),
    miniKvPostCloseoutReleaseChainReady:
      miniKvReleases.length === MINI_KV_RELEASES.length
      && miniKvReleases.every((release) =>
        release.status === "node-route-catalog-cleanup-post-closeout-continuity-read-only"
        && release.readOnly === true
        && release.executionAllowed === false
        && release.shardEnabled === false
        && release.fieldCount === 821
        && release.groupCount === 40
        && release.readyForNextNodeBatch === true),
    miniKvPostCloseoutReleaseChainSequential: miniKvReleaseChainSequential(miniKvReleases),
    miniKvPostCloseoutDigestsStable:
      miniKvReleases.every((release) =>
        release.releaseVersion !== null
        && MINI_KV_EXPECTED_DIGESTS[release.releaseVersion as MiniKvPostCloseoutReleaseVersion]
          === release.evidenceDigest),
    miniKvV210AuditNotePresent: input.miniKvLatestAuditNote.noteFilePresent,
    miniKvV210AuditNoteDocumentsRollingBoundary:
      input.miniKvLatestAuditNote.rollingCurrentRejectedForBaseline
      && input.miniKvLatestAuditNote.sourceVersionedRelease === "v209"
      && input.miniKvLatestAuditNote.noteMentionsRollingFixture
      && input.miniKvLatestAuditNote.noteMentionsFallbackV209
      && input.miniKvLatestAuditNote.noteMentionsAllTestsPassed
      && input.miniKvLatestAuditNote.noteMentionsTcpSmoke,
    noRuntimeAuthorityOpened:
      javaV220.executionAllowed === false
      && javaV220Fixture.executionAllowed === false
      && javaV221.executionAllowed === false
      && javaV222.executionAllowed === false
      && javaV223.executionAllowed === false
      && javaV224.executionAllowed === false
      && miniKvReleases.every((release) =>
        release.executionAllowed === false
        && release.writeCommandsAllowed === false
        && release.adminCommandsAllowed === false
        && release.activeRouterInstalled === false
        && release.changesArchivedNodeEvidence === false),
  };
}

function javaGuardReady(
  guard: JavaConsumerReadinessGuard,
  version: string,
  scope: string,
  guardCount: number,
): boolean {
  return guard.version === version
    && guard.status === "passed"
    && guard.readOnly === true
    && guard.executionAllowed === false
    && guard.scope === scope
    && guard.guardCount === guardCount
    && guard.validationCount === 2
    && guard.boundaryRuntimeClosed;
}

function miniKvReleaseChainSequential(releases: MiniKvPostCloseoutReleaseEvidence[]): boolean {
  return releases.every((release, index) => {
    const version = `v${MINI_KV_RELEASES[index]}`;
    const previousVersion = index === 0 ? "v201" : `v${MINI_KV_RELEASES[index - 1]}`;
    return release.releaseVersion === version
      && release.previousConsumedReleaseVersion === previousVersion
      && release.sourceFrozenReleaseVersion === previousVersion
      && release.stageSequence === index + 2
      && release.trackedPostCloseoutReleaseCount === index + 2
      && release.historicalFixtureCount === 58 + index
      && release.archivedNodeVersionCount >= 97;
  });
}

function javaBoundaryRuntimeClosed(boundary: Record<string, unknown>): boolean {
  return booleanField(boundary, "writeRoutingAllowed") === false
    && booleanField(boundary, "activeShardRouterAllowed") === false
    && booleanField(boundary, "credentialValueRead") === false
    && booleanField(boundary, "rawEndpointParsed") === false
    && booleanField(boundary, "managedAuditConnectionAllowed") === false
    && booleanField(boundary, "deploymentOrRollbackAllowed") === false
    && booleanField(boundary, "nodeMayStartOrStopJavaOrMiniKv") === false;
}
