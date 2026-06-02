import {
  createConsumerReadinessEvidenceFiles,
  createMiniKvLatestAuditNoteSnippets,
} from "./javaMiniKvRouteCatalogCleanupConsumerReadinessFileBuilders.js";
import {
  loadJavaConsumerReadinessEvidenceParts,
} from "./javaMiniKvRouteCatalogCleanupConsumerReadinessJavaEvidence.js";
import {
  MINI_KV_EXPECTED_DIGESTS,
  MINI_KV_POST_CLOSEOUT_RELEASES,
  type MiniKvPostCloseoutReleaseVersion,
} from "./javaMiniKvRouteCatalogCleanupConsumerReadinessMiniKvSupport.js";
import {
  booleanField,
  numberField,
  objectField,
  readJsonObject,
  snippetMatched,
  stringArrayField,
  stringField,
} from "./historicalEvidenceReportUtils.js";
import type {
  JavaConsumerEvidenceDigest,
  JavaConsumerEvidenceDigestFixture,
  JavaConsumerReadinessGuard,
  JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence,
  MiniKvLatestAuditNoteEvidence,
  MiniKvPostCloseoutReleaseEvidence,
} from "./javaMiniKvRouteCatalogCleanupConsumerReadinessTypes.js";
import { countPassedReportChecks, countReportChecks } from "./liveProbeReportUtils.js";

export type {
  JavaConsumerEvidenceDigest,
  JavaConsumerEvidenceDigestFixture,
  JavaConsumerReadinessGuard,
  JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence,
  MiniKvLatestAuditNoteEvidence,
  MiniKvPostCloseoutReleaseEvidence,
} from "./javaMiniKvRouteCatalogCleanupConsumerReadinessTypes.js";

export function loadJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence():
  JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence {
  const files = createConsumerReadinessEvidenceFiles();
  const snippets = createMiniKvLatestAuditNoteSnippets();
  const javaEvidence = loadJavaConsumerReadinessEvidenceParts();
  const miniKvPostCloseoutReleases = MINI_KV_POST_CLOSEOUT_RELEASES.map((version) =>
    createMiniKvPostCloseoutRelease(readJsonObject(`D:/C/mini-kv/fixtures/release/shard-readiness-v${version}.json`)));
  const miniKvLatestAuditNote = createMiniKvLatestAuditNote(files, snippets);
  const checks = createChecks({
    files,
    ...javaEvidence,
    miniKvPostCloseoutReleases,
    miniKvLatestAuditNote,
  });
  const latestMiniKv = miniKvPostCloseoutReleases.at(-1);

  return {
    files,
    snippets,
    ...javaEvidence,
    miniKvPostCloseoutReleases,
    miniKvLatestAuditNote,
    checks,
    summary: {
      fileCount: Object.keys(files).length,
      presentFileCount: Object.values(files).filter((file) => file.exists).length,
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      javaGuardCount:
        javaEvidence.javaV221ConsumerEvidenceDigestSnapshotFreeze.guardCount
        + javaEvidence.javaV222ConsumerEvidenceDigestHistoricalCompatibility.guardCount
        + javaEvidence.javaV223ConsumerEvidenceDigestIntegrity.guardCount
        + javaEvidence.javaV224ConsumerReadinessCompletion.guardCount,
      javaDigestEvidenceCount: javaEvidence.javaV220ConsumerEvidenceDigest.digestEvidenceCount,
      miniKvVersionedReleaseCount: miniKvPostCloseoutReleases.length,
      miniKvLatestVersionedRelease: latestMiniKv?.releaseVersion ?? null,
      miniKvLatestObservedAuditRelease: "v210",
      miniKvLatestVersionedFixtureCount: latestMiniKv?.historicalFixtureCount ?? 0,
      miniKvBoundaryGroupCount: latestMiniKv?.groupCount ?? null,
    },
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
      MINI_KV_POST_CLOSEOUT_RELEASES.every((version) =>
        input.files[`miniKvv${version}PostCloseoutContinuity` as const].exists),
    miniKvPostCloseoutReleaseChainReady:
      miniKvReleases.length === MINI_KV_POST_CLOSEOUT_RELEASES.length
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
    const version = `v${MINI_KV_POST_CLOSEOUT_RELEASES[index]}`;
    const previousVersion = index === 0 ? "v201" : `v${MINI_KV_POST_CLOSEOUT_RELEASES[index - 1]}`;
    return release.releaseVersion === version
      && release.previousConsumedReleaseVersion === previousVersion
      && release.sourceFrozenReleaseVersion === previousVersion
      && release.stageSequence === index + 2
      && release.trackedPostCloseoutReleaseCount === index + 2
      && release.historicalFixtureCount === 58 + index
      && release.archivedNodeVersionCount >= 97;
  });
}
