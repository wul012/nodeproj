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

export const JAVA_V215_CONSUMER_VERIFICATION_CHECKLIST =
  "D:/javaproj/advanced-order-platform/e/215/evidence/java-shard-readiness-v1-contract-consumer-verification-checklist-v215.json";
export const JAVA_V215_CONSUMER_VERIFICATION_CHECKLIST_FIXTURE =
  "D:/javaproj/advanced-order-platform/src/main/resources/static/contracts/java-shard-readiness-v1-contract-consumer-verification-checklist-v215.fixture.json";
export const JAVA_V216_CONSUMER_VERIFICATION_CHECKLIST_SNAPSHOT_FREEZE =
  "D:/javaproj/advanced-order-platform/e/216/evidence/java-shard-readiness-v215-consumer-verification-checklist-snapshot-freeze-v216.json";
export const JAVA_V217_CONSUMER_VERIFICATION_CHECKLIST_HISTORICAL_COMPATIBILITY =
  "D:/javaproj/advanced-order-platform/e/217/evidence/java-shard-readiness-v215-consumer-verification-checklist-historical-compatibility-v217.json";
export const MINI_KV_V201_ROUTE_CATALOG_CLEANUP_POST_CLOSEOUT_CONTINUITY =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v201.json";
export const MINI_KV_V201_ROUTE_CATALOG_CLEANUP_POST_CLOSEOUT_CONTINUITY_NOTE =
  "D:/C/mini-kv/e/201/route-catalog-cleanup-post-closeout-continuity-v201.md";

export interface JavaConsumerVerificationChecklistEvidence {
  version: string | null;
  status: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  receiptId: string | null;
  scope: string | null;
  endpoint: string | null;
  fixtureEndpoint: string | null;
  handoffBundleEndpoint: string | null;
  catalogedArtifactCount: number | null;
  verificationItemCount: number;
  requiredEvidenceCount: number;
  validationCount: number;
  boundaryRuntimeClosed: boolean;
}

export interface JavaConsumerVerificationChecklistFixtureEvidence {
  project: string | null;
  version: string | null;
  contractName: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  verificationChecklistEndpoint: string | null;
  verificationChecklistFixtureEndpoint: string | null;
  handoffBundleEndpoint: string | null;
  catalogedArtifactCount: number | null;
  verificationItemCount: number;
  requiredEvidenceCount: number;
  blockedOperationCount: number;
  verificationCheckCount: number;
  probesAreGetOnly: boolean | null;
  upstreamActionsAllowed: boolean | null;
  startsJavaService: boolean | null;
  startsMiniKvService: boolean | null;
  nodeMayStartOrStopJavaOrMiniKv: boolean | null;
  status: string | null;
}

export interface JavaChecklistGuardEvidence {
  version: string | null;
  status: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  receiptId: string | null;
  scope: string | null;
  guardCount: number;
  validationCount: number;
  boundaryRuntimeClosed: boolean;
}

export interface MiniKvPostCloseoutContinuityEvidence {
  releaseVersion: string | null;
  status: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  shardEnabled: boolean | null;
  evidenceDigest: string | null;
  fieldCount: number | null;
  groupCount: number | null;
  archivedNodeVersionCount: number;
  historicalFixtureCount: number;
  previousConsumedReleaseVersion: string | null;
  previousConsumptionNodeVersion: string | null;
  nodeConsumer: string | null;
  writeCommandsAllowed: boolean | null;
  adminCommandsAllowed: boolean | null;
  activeRouterInstalled: boolean | null;
  changesArchivedNodeEvidence: boolean | null;
}

export interface JavaMiniKvRouteCatalogCleanupVerificationChecklistEvidence {
  files: {
    javaV215ConsumerVerificationChecklist: HistoricalEvidenceFile;
    javaV215ConsumerVerificationChecklistFixture: HistoricalEvidenceFile;
    javaV216ConsumerVerificationChecklistSnapshotFreeze: HistoricalEvidenceFile;
    javaV217ConsumerVerificationChecklistHistoricalCompatibility: HistoricalEvidenceFile;
    miniKvV201RouteCatalogCleanupPostCloseoutContinuity: HistoricalEvidenceFile;
    miniKvV201RouteCatalogCleanupPostCloseoutContinuityNote: HistoricalEvidenceFile;
  };
  snippets: {
    miniKvV201Release: HistoricalSnippetMatch;
    miniKvV201Digest: HistoricalSnippetMatch;
    miniKvV201FullCtest: HistoricalSnippetMatch;
    miniKvV201TcpSmoke: HistoricalSnippetMatch;
  };
  javaV215ConsumerVerificationChecklist: JavaConsumerVerificationChecklistEvidence;
  javaV215ConsumerVerificationChecklistFixture: JavaConsumerVerificationChecklistFixtureEvidence;
  javaV216ConsumerVerificationChecklistSnapshotFreeze: JavaChecklistGuardEvidence;
  javaV217ConsumerVerificationChecklistHistoricalCompatibility: JavaChecklistGuardEvidence;
  miniKvV201RouteCatalogCleanupPostCloseoutContinuity: MiniKvPostCloseoutContinuityEvidence;
  checks: {
    javaV215FilePresent: boolean;
    javaV215ChecklistReady: boolean;
    javaV215ChecklistCountsStable: boolean;
    javaV215FixtureFilePresent: boolean;
    javaV215FixtureReady: boolean;
    javaV215FixtureGetOnly: boolean;
    javaV216FilePresent: boolean;
    javaV216SnapshotFreezeReady: boolean;
    javaV216SnapshotGuardsStable: boolean;
    javaV217FilePresent: boolean;
    javaV217HistoricalCompatibilityReady: boolean;
    javaV217HistoricalGuardsStable: boolean;
    miniKvV201FilePresent: boolean;
    miniKvV201ContinuityReady: boolean;
    miniKvV201UsesV200Baseline: boolean;
    miniKvV201AuditNotePresent: boolean;
    miniKvV201AuditNoteMatchesFixture: boolean;
    noRuntimeAuthorityOpened: boolean;
  };
  summary: {
    fileCount: number;
    presentFileCount: number;
    checkCount: number;
    passedCheckCount: number;
    javaVerificationItemCount: number;
    javaRequiredEvidenceCount: number;
    miniKvV201HistoricalFixtureCount: number;
    miniKvV201BoundaryGroupCount: number | null;
  };
}

export function loadJavaMiniKvRouteCatalogCleanupVerificationChecklistEvidence():
  JavaMiniKvRouteCatalogCleanupVerificationChecklistEvidence {
  const files = {
    javaV215ConsumerVerificationChecklist:
      evidenceFile("java-v215-consumer-verification-checklist", JAVA_V215_CONSUMER_VERIFICATION_CHECKLIST),
    javaV215ConsumerVerificationChecklistFixture:
      evidenceFile("java-v215-consumer-verification-checklist-fixture",
        JAVA_V215_CONSUMER_VERIFICATION_CHECKLIST_FIXTURE),
    javaV216ConsumerVerificationChecklistSnapshotFreeze:
      evidenceFile("java-v216-consumer-verification-checklist-snapshot-freeze",
        JAVA_V216_CONSUMER_VERIFICATION_CHECKLIST_SNAPSHOT_FREEZE),
    javaV217ConsumerVerificationChecklistHistoricalCompatibility:
      evidenceFile("java-v217-consumer-verification-checklist-historical-compatibility",
        JAVA_V217_CONSUMER_VERIFICATION_CHECKLIST_HISTORICAL_COMPATIBILITY),
    miniKvV201RouteCatalogCleanupPostCloseoutContinuity:
      evidenceFile("mini-kv-v201-route-catalog-cleanup-post-closeout-continuity",
        MINI_KV_V201_ROUTE_CATALOG_CLEANUP_POST_CLOSEOUT_CONTINUITY),
    miniKvV201RouteCatalogCleanupPostCloseoutContinuityNote:
      evidenceFile("mini-kv-v201-route-catalog-cleanup-post-closeout-continuity-note",
        MINI_KV_V201_ROUTE_CATALOG_CLEANUP_POST_CLOSEOUT_CONTINUITY_NOTE),
  };
  const snippets = {
    miniKvV201Release:
      snippet("mini-kv-v201-release", MINI_KV_V201_ROUTE_CATALOG_CLEANUP_POST_CLOSEOUT_CONTINUITY_NOTE,
        "releaseVersion=v201"),
    miniKvV201Digest:
      snippet("mini-kv-v201-digest", MINI_KV_V201_ROUTE_CATALOG_CLEANUP_POST_CLOSEOUT_CONTINUITY_NOTE,
        "fnv1a64:9a3abb5ab3aaeb1c"),
    miniKvV201FullCtest:
      snippet("mini-kv-v201-full-ctest", MINI_KV_V201_ROUTE_CATALOG_CLEANUP_POST_CLOSEOUT_CONTINUITY_NOTE,
        "all 71 tests passed"),
    miniKvV201TcpSmoke:
      snippet("mini-kv-v201-tcp-smoke", MINI_KV_V201_ROUTE_CATALOG_CLEANUP_POST_CLOSEOUT_CONTINUITY_NOTE,
        "TCP smoke returned v201"),
  };
  const javaV215ConsumerVerificationChecklist =
    createJavaV215Checklist(readJsonObject(JAVA_V215_CONSUMER_VERIFICATION_CHECKLIST));
  const javaV215ConsumerVerificationChecklistFixture =
    createJavaV215ChecklistFixture(readJsonObject(JAVA_V215_CONSUMER_VERIFICATION_CHECKLIST_FIXTURE));
  const javaV216ConsumerVerificationChecklistSnapshotFreeze =
    createJavaChecklistGuard(readJsonObject(JAVA_V216_CONSUMER_VERIFICATION_CHECKLIST_SNAPSHOT_FREEZE));
  const javaV217ConsumerVerificationChecklistHistoricalCompatibility =
    createJavaChecklistGuard(readJsonObject(JAVA_V217_CONSUMER_VERIFICATION_CHECKLIST_HISTORICAL_COMPATIBILITY));
  const miniKvV201RouteCatalogCleanupPostCloseoutContinuity =
    createMiniKvV201(readJsonObject(MINI_KV_V201_ROUTE_CATALOG_CLEANUP_POST_CLOSEOUT_CONTINUITY));
  const checks = createChecks({
    files,
    snippets,
    javaV215ConsumerVerificationChecklist,
    javaV215ConsumerVerificationChecklistFixture,
    javaV216ConsumerVerificationChecklistSnapshotFreeze,
    javaV217ConsumerVerificationChecklistHistoricalCompatibility,
    miniKvV201RouteCatalogCleanupPostCloseoutContinuity,
  });

  return {
    files,
    snippets,
    javaV215ConsumerVerificationChecklist,
    javaV215ConsumerVerificationChecklistFixture,
    javaV216ConsumerVerificationChecklistSnapshotFreeze,
    javaV217ConsumerVerificationChecklistHistoricalCompatibility,
    miniKvV201RouteCatalogCleanupPostCloseoutContinuity,
    checks,
    summary: {
      fileCount: Object.keys(files).length,
      presentFileCount: Object.values(files).filter((file) => file.exists).length,
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      javaVerificationItemCount: javaV215ConsumerVerificationChecklist.verificationItemCount,
      javaRequiredEvidenceCount: javaV215ConsumerVerificationChecklist.requiredEvidenceCount,
      miniKvV201HistoricalFixtureCount: miniKvV201RouteCatalogCleanupPostCloseoutContinuity.historicalFixtureCount,
      miniKvV201BoundaryGroupCount: miniKvV201RouteCatalogCleanupPostCloseoutContinuity.groupCount,
    },
  };
}

function createJavaV215Checklist(source: Record<string, unknown>): JavaConsumerVerificationChecklistEvidence {
  return {
    version: stringField(source, "version"),
    status: stringField(source, "status"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    receiptId: stringField(source, "receiptId"),
    scope: stringField(source, "scope"),
    endpoint: stringField(source, "endpoint"),
    fixtureEndpoint: stringField(source, "fixtureEndpoint"),
    handoffBundleEndpoint: stringField(source, "handoffBundleEndpoint"),
    catalogedArtifactCount: numberField(source, "catalogedArtifactCount"),
    verificationItemCount: stringArrayField(source, "verificationItems").length,
    requiredEvidenceCount: stringArrayField(source, "requiredEvidence").length,
    validationCount: stringArrayField(source, "validation").length,
    boundaryRuntimeClosed: boundaryRuntimeClosed(objectField(source, "boundary")),
  };
}

function createJavaV215ChecklistFixture(
  source: Record<string, unknown>,
): JavaConsumerVerificationChecklistFixtureEvidence {
  return {
    project: stringField(source, "project"),
    version: stringField(source, "version"),
    contractName: stringField(source, "contractName"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    verificationChecklistEndpoint: stringField(source, "verificationChecklistEndpoint"),
    verificationChecklistFixtureEndpoint: stringField(source, "verificationChecklistFixtureEndpoint"),
    handoffBundleEndpoint: stringField(source, "handoffBundleEndpoint"),
    catalogedArtifactCount: numberField(source, "catalogedArtifactCount"),
    verificationItemCount: stringArrayField(source, "verificationItems").length,
    requiredEvidenceCount: stringArrayField(source, "requiredEvidence").length,
    blockedOperationCount: stringArrayField(source, "blockedOperations").length,
    verificationCheckCount: stringArrayField(source, "verificationChecks").length,
    probesAreGetOnly: booleanField(source, "probesAreGetOnly"),
    upstreamActionsAllowed: booleanField(source, "upstreamActionsAllowed"),
    startsJavaService: booleanField(source, "startsJavaService"),
    startsMiniKvService: booleanField(source, "startsMiniKvService"),
    nodeMayStartOrStopJavaOrMiniKv: booleanField(source, "nodeMayStartOrStopJavaOrMiniKv"),
    status: stringField(source, "status"),
  };
}

function createJavaChecklistGuard(source: Record<string, unknown>): JavaChecklistGuardEvidence {
  return {
    version: stringField(source, "version"),
    status: stringField(source, "status"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    receiptId: stringField(source, "receiptId"),
    scope: stringField(source, "scope"),
    guardCount: stringArrayField(source, "guards").length,
    validationCount: stringArrayField(source, "validation").length,
    boundaryRuntimeClosed: boundaryRuntimeClosed(objectField(source, "boundary")),
  };
}

function createMiniKvV201(source: Record<string, unknown>): MiniKvPostCloseoutContinuityEvidence {
  const archiveCompatibility = objectField(source, "archiveCompatibility");
  const fixtureParity = objectField(source, "fixtureParity");
  const historicalFallback = objectField(source, "historicalFallback");
  const diagnostics = objectField(source, "diagnostics");
  const boundaries = objectField(source, "boundaries");
  const boundaryCatalog = objectField(source, "boundaryCatalogIndex");

  return {
    releaseVersion: stringField(source, "releaseVersion"),
    status: stringField(source, "status"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    shardEnabled: booleanField(source, "shardEnabled"),
    evidenceDigest: stringField(source, "evidenceDigest"),
    fieldCount: numberField(boundaryCatalog, "fieldCount"),
    groupCount: numberField(boundaryCatalog, "groupCount"),
    archivedNodeVersionCount: stringArrayField(archiveCompatibility, "archivedNodeVersions").length,
    historicalFixtureCount: stringArrayField(fixtureParity, "historicalFixturePaths").length,
    previousConsumedReleaseVersion: stringField(historicalFallback, "previousConsumedReleaseVersion"),
    previousConsumptionNodeVersion: stringField(historicalFallback, "previousConsumptionNodeVersion"),
    nodeConsumer: stringField(diagnostics, "nodeConsumer"),
    writeCommandsAllowed: booleanField(boundaries, "writeCommandsAllowed"),
    adminCommandsAllowed: booleanField(boundaries, "adminCommandsAllowed"),
    activeRouterInstalled: booleanField(boundaries, "activeRouterInstalled"),
    changesArchivedNodeEvidence: booleanField(archiveCompatibility, "changesArchivedNodeEvidence"),
  };
}

function createChecks(input: {
  files: JavaMiniKvRouteCatalogCleanupVerificationChecklistEvidence["files"];
  snippets: JavaMiniKvRouteCatalogCleanupVerificationChecklistEvidence["snippets"];
  javaV215ConsumerVerificationChecklist: JavaConsumerVerificationChecklistEvidence;
  javaV215ConsumerVerificationChecklistFixture: JavaConsumerVerificationChecklistFixtureEvidence;
  javaV216ConsumerVerificationChecklistSnapshotFreeze: JavaChecklistGuardEvidence;
  javaV217ConsumerVerificationChecklistHistoricalCompatibility: JavaChecklistGuardEvidence;
  miniKvV201RouteCatalogCleanupPostCloseoutContinuity: MiniKvPostCloseoutContinuityEvidence;
}): JavaMiniKvRouteCatalogCleanupVerificationChecklistEvidence["checks"] {
  const javaV215 = input.javaV215ConsumerVerificationChecklist;
  const javaV215Fixture = input.javaV215ConsumerVerificationChecklistFixture;
  const javaV216 = input.javaV216ConsumerVerificationChecklistSnapshotFreeze;
  const javaV217 = input.javaV217ConsumerVerificationChecklistHistoricalCompatibility;
  const miniKv = input.miniKvV201RouteCatalogCleanupPostCloseoutContinuity;

  return {
    javaV215FilePresent: input.files.javaV215ConsumerVerificationChecklist.exists,
    javaV215ChecklistReady:
      javaV215.version === "Java v215"
      && javaV215.status === "passed"
      && javaV215.readOnly === true
      && javaV215.executionAllowed === false,
    javaV215ChecklistCountsStable:
      javaV215.endpoint === "/api/v1/ops/shard-readiness/v1-contract-consumer-verification-checklist"
      && javaV215.fixtureEndpoint
        === "/contracts/java-shard-readiness-v1-contract-consumer-verification-checklist-v215.fixture.json"
      && javaV215.handoffBundleEndpoint === "/api/v1/ops/shard-readiness/v1-contract-consumer-handoff-bundle"
      && javaV215.catalogedArtifactCount === 6
      && javaV215.verificationItemCount === 7
      && javaV215.requiredEvidenceCount === 5
      && javaV215.validationCount === 2
      && javaV215.boundaryRuntimeClosed,
    javaV215FixtureFilePresent: input.files.javaV215ConsumerVerificationChecklistFixture.exists,
    javaV215FixtureReady:
      javaV215Fixture.project === "advanced-order-platform"
      && javaV215Fixture.version === "Java v215"
      && javaV215Fixture.contractName === "shard-readiness.v1"
      && javaV215Fixture.status === "passed"
      && javaV215Fixture.catalogedArtifactCount === 6,
    javaV215FixtureGetOnly:
      javaV215Fixture.verificationItemCount === 7
      && javaV215Fixture.requiredEvidenceCount === 5
      && javaV215Fixture.blockedOperationCount === 7
      && javaV215Fixture.verificationCheckCount === 7
      && javaV215Fixture.probesAreGetOnly === true
      && javaV215Fixture.upstreamActionsAllowed === false
      && javaV215Fixture.startsJavaService === false
      && javaV215Fixture.startsMiniKvService === false
      && javaV215Fixture.nodeMayStartOrStopJavaOrMiniKv === false,
    javaV216FilePresent: input.files.javaV216ConsumerVerificationChecklistSnapshotFreeze.exists,
    javaV216SnapshotFreezeReady:
      javaV216.version === "Java v216"
      && javaV216.status === "passed"
      && javaV216.readOnly === true
      && javaV216.executionAllowed === false,
    javaV216SnapshotGuardsStable:
      javaV216.scope === "v215 consumer verification checklist snapshot freeze"
      && javaV216.guardCount === 6
      && javaV216.validationCount === 2
      && javaV216.boundaryRuntimeClosed,
    javaV217FilePresent: input.files.javaV217ConsumerVerificationChecklistHistoricalCompatibility.exists,
    javaV217HistoricalCompatibilityReady:
      javaV217.version === "Java v217"
      && javaV217.status === "passed"
      && javaV217.readOnly === true
      && javaV217.executionAllowed === false,
    javaV217HistoricalGuardsStable:
      javaV217.scope === "v215 consumer verification checklist historical compatibility"
      && javaV217.guardCount === 4
      && javaV217.validationCount === 2
      && javaV217.boundaryRuntimeClosed,
    miniKvV201FilePresent: input.files.miniKvV201RouteCatalogCleanupPostCloseoutContinuity.exists,
    miniKvV201ContinuityReady:
      miniKv.releaseVersion === "v201"
      && miniKv.status === "node-route-catalog-cleanup-post-closeout-continuity-read-only"
      && miniKv.readOnly === true
      && miniKv.executionAllowed === false
      && miniKv.shardEnabled === false,
    miniKvV201UsesV200Baseline:
      miniKv.archivedNodeVersionCount >= 97
      && miniKv.historicalFixtureCount >= 57
      && miniKv.previousConsumedReleaseVersion === "v200"
      && (miniKv.previousConsumptionNodeVersion?.includes("Node v481+") ?? false)
      && (miniKv.nodeConsumer?.includes("Node v481+") ?? false)
      && miniKv.evidenceDigest === "fnv1a64:9a3abb5ab3aaeb1c"
      && miniKv.fieldCount === 821
      && miniKv.groupCount === 40
      && miniKv.changesArchivedNodeEvidence === false,
    miniKvV201AuditNotePresent: input.files.miniKvV201RouteCatalogCleanupPostCloseoutContinuityNote.exists,
    miniKvV201AuditNoteMatchesFixture:
      snippetMatched(Object.values(input.snippets), "mini-kv-v201-release")
      && snippetMatched(Object.values(input.snippets), "mini-kv-v201-digest")
      && snippetMatched(Object.values(input.snippets), "mini-kv-v201-full-ctest")
      && snippetMatched(Object.values(input.snippets), "mini-kv-v201-tcp-smoke"),
    noRuntimeAuthorityOpened:
      javaV215.executionAllowed === false
      && javaV215Fixture.executionAllowed === false
      && javaV216.executionAllowed === false
      && javaV217.executionAllowed === false
      && miniKv.executionAllowed === false
      && miniKv.writeCommandsAllowed === false
      && miniKv.adminCommandsAllowed === false
      && miniKv.activeRouterInstalled === false,
  };
}

function boundaryRuntimeClosed(boundary: Record<string, unknown>): boolean {
  return booleanField(boundary, "writeRoutingAllowed") === false
    && booleanField(boundary, "activeShardRouterAllowed") === false
    && booleanField(boundary, "credentialValueRead") === false
    && booleanField(boundary, "rawEndpointParsed") === false
    && booleanField(boundary, "managedAuditConnectionAllowed") === false
    && booleanField(boundary, "deploymentOrRollbackAllowed") === false
    && booleanField(boundary, "nodeMayStartOrStopJavaOrMiniKv") === false;
}
