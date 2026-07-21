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

export const JAVA_V211_CONSUMER_HANDOFF_BUNDLE =
  "D:/javaproj/advanced-order-platform/e/211/evidence/java-shard-readiness-v1-contract-consumer-handoff-bundle-v211.json";
export const JAVA_V211_CONSUMER_HANDOFF_BUNDLE_FIXTURE =
  "D:/javaproj/advanced-order-platform/src/main/resources/static/contracts/java-shard-readiness-v1-contract-consumer-handoff-bundle-v211.fixture.json";
export const JAVA_V214_CONSUMER_HANDOFF_BUNDLE_INTEGRITY =
  "D:/javaproj/advanced-order-platform/e/214/evidence/java-shard-readiness-v1-contract-consumer-handoff-bundle-integrity-v214.json";
export const MINI_KV_V199_ROUTE_CATALOG_CLEANUP_BATCH_CLOSEOUT =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v199.json";
export const MINI_KV_V200_ROUTE_CATALOG_CLEANUP_BATCH_CLOSEOUT_AUDIT =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v200-frozen-from-rolling.json";
export const MINI_KV_V200_ROUTE_CATALOG_CLEANUP_BATCH_CLOSEOUT_AUDIT_NOTE =
  "D:/C/mini-kv/e/200/route-catalog-cleanup-evidence-batch-closeout-audit-v200.md";

export interface JavaV211ConsumerHandoffBundleEvidence {
  version: string | null;
  status: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  receiptId: string | null;
  handoffBundleEndpoint: string | null;
  handoffBundleFixtureEndpoint: string | null;
  endpointCatalogEndpoint: string | null;
  endpointCatalogReceiptId: string | null;
  catalogedArtifactCount: number | null;
  requiredEvidenceCount: number | null;
  handoffEvidenceCount: number;
  validationCount: number;
  boundaryRuntimeClosed: boolean;
}

export interface JavaV211ConsumerHandoffBundleFixtureEvidence {
  project: string | null;
  version: string | null;
  contractName: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  receiptId: string | null;
  status: string | null;
  catalogedArtifactCount: number | null;
  consumerReadTargetCount: number;
  fixtureReadTargetCount: number;
  requiredEvidenceCount: number;
  handoffEvidenceCount: number;
  blockedOperationCount: number;
  probesAreGetOnly: boolean | null;
  upstreamActionsAllowed: boolean | null;
  nodeMayStartOrStopJavaOrMiniKv: boolean | null;
}

export interface JavaV214ConsumerHandoffBundleIntegrityEvidence {
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

export interface MiniKvRouteCatalogCleanupBatchCloseoutEvidence {
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

export interface JavaMiniKvRouteCatalogCleanupCurrentEvidence {
  files: {
    javaV211ConsumerHandoffBundle: HistoricalEvidenceFile;
    javaV211ConsumerHandoffBundleFixture: HistoricalEvidenceFile;
    javaV214ConsumerHandoffBundleIntegrity: HistoricalEvidenceFile;
    miniKvV199RouteCatalogCleanupBatchCloseout: HistoricalEvidenceFile;
    miniKvV200RouteCatalogCleanupBatchCloseoutAudit: HistoricalEvidenceFile;
    miniKvV200RouteCatalogCleanupBatchCloseoutAuditNote: HistoricalEvidenceFile;
  };
  snippets: {
    miniKvV200Release: HistoricalSnippetMatch;
    miniKvV200Digest: HistoricalSnippetMatch;
    miniKvV200FullCtest: HistoricalSnippetMatch;
    miniKvV200TcpSmoke: HistoricalSnippetMatch;
  };
  javaV211ConsumerHandoffBundle: JavaV211ConsumerHandoffBundleEvidence;
  javaV211ConsumerHandoffBundleFixture: JavaV211ConsumerHandoffBundleFixtureEvidence;
  javaV214ConsumerHandoffBundleIntegrity: JavaV214ConsumerHandoffBundleIntegrityEvidence;
  miniKvV199RouteCatalogCleanupBatchCloseout: MiniKvRouteCatalogCleanupBatchCloseoutEvidence;
  miniKvV200RouteCatalogCleanupBatchCloseoutAudit: MiniKvRouteCatalogCleanupBatchCloseoutEvidence;
  checks: {
    javaV211FilePresent: boolean;
    javaV211HandoffBundleReady: boolean;
    javaV211HandoffBundleCountsStable: boolean;
    javaV211FixtureFilePresent: boolean;
    javaV211FixtureReady: boolean;
    javaV211FixtureGetOnly: boolean;
    javaV214FilePresent: boolean;
    javaV214IntegrityReady: boolean;
    javaV214IntegrityGuardsComplete: boolean;
    miniKvV199FilePresent: boolean;
    miniKvV199CloseoutReady: boolean;
    miniKvV199PreservesNodeV480Window: boolean;
    miniKvV200FilePresent: boolean;
    miniKvV200AuditReady: boolean;
    miniKvV200UsesV199Baseline: boolean;
    miniKvV200AuditNotePresent: boolean;
    miniKvV200AuditNoteMatchesFixture: boolean;
    noRuntimeAuthorityOpened: boolean;
  };
  summary: {
    fileCount: number;
    presentFileCount: number;
    checkCount: number;
    passedCheckCount: number;
    javaCatalogedArtifactCount: number | null;
    javaConsumerReadTargetCount: number;
    miniKvV199ArchivedNodeVersionCount: number;
    miniKvV200HistoricalFixtureCount: number;
    miniKvV200BoundaryGroupCount: number | null;
  };
}

export function loadJavaMiniKvRouteCatalogCleanupCurrentEvidence():
  JavaMiniKvRouteCatalogCleanupCurrentEvidence {
  const files = {
    javaV211ConsumerHandoffBundle: evidenceFile("java-v211-consumer-handoff-bundle",
      JAVA_V211_CONSUMER_HANDOFF_BUNDLE),
    javaV211ConsumerHandoffBundleFixture: evidenceFile("java-v211-consumer-handoff-bundle-fixture",
      JAVA_V211_CONSUMER_HANDOFF_BUNDLE_FIXTURE),
    javaV214ConsumerHandoffBundleIntegrity: evidenceFile("java-v214-consumer-handoff-bundle-integrity",
      JAVA_V214_CONSUMER_HANDOFF_BUNDLE_INTEGRITY),
    miniKvV199RouteCatalogCleanupBatchCloseout: evidenceFile("mini-kv-v199-route-catalog-cleanup-batch-closeout",
      MINI_KV_V199_ROUTE_CATALOG_CLEANUP_BATCH_CLOSEOUT),
    miniKvV200RouteCatalogCleanupBatchCloseoutAudit:
      evidenceFile("mini-kv-v200-route-catalog-cleanup-batch-closeout-audit",
        MINI_KV_V200_ROUTE_CATALOG_CLEANUP_BATCH_CLOSEOUT_AUDIT),
    miniKvV200RouteCatalogCleanupBatchCloseoutAuditNote:
      evidenceFile("mini-kv-v200-route-catalog-cleanup-batch-closeout-audit-note",
        MINI_KV_V200_ROUTE_CATALOG_CLEANUP_BATCH_CLOSEOUT_AUDIT_NOTE),
  };
  const snippets = {
    miniKvV200Release:
      snippet("mini-kv-v200-release", MINI_KV_V200_ROUTE_CATALOG_CLEANUP_BATCH_CLOSEOUT_AUDIT_NOTE,
        "releaseVersion=v200"),
    miniKvV200Digest:
      snippet("mini-kv-v200-digest", MINI_KV_V200_ROUTE_CATALOG_CLEANUP_BATCH_CLOSEOUT_AUDIT_NOTE,
        "fnv1a64:d1e889711b5d8574"),
    miniKvV200FullCtest:
      snippet("mini-kv-v200-full-ctest", MINI_KV_V200_ROUTE_CATALOG_CLEANUP_BATCH_CLOSEOUT_AUDIT_NOTE,
        "all 71 tests passed"),
    miniKvV200TcpSmoke:
      snippet("mini-kv-v200-tcp-smoke", MINI_KV_V200_ROUTE_CATALOG_CLEANUP_BATCH_CLOSEOUT_AUDIT_NOTE,
        "TCP smoke returned v200"),
  };
  const javaV211ConsumerHandoffBundle =
    createJavaV211ConsumerHandoffBundle(readJsonObject(JAVA_V211_CONSUMER_HANDOFF_BUNDLE));
  const javaV211ConsumerHandoffBundleFixture =
    createJavaV211ConsumerHandoffBundleFixture(readJsonObject(JAVA_V211_CONSUMER_HANDOFF_BUNDLE_FIXTURE));
  const javaV214ConsumerHandoffBundleIntegrity =
    createJavaV214ConsumerHandoffBundleIntegrity(readJsonObject(JAVA_V214_CONSUMER_HANDOFF_BUNDLE_INTEGRITY));
  const miniKvV199RouteCatalogCleanupBatchCloseout =
    createMiniKvRouteCatalogCleanupBatchCloseout(readJsonObject(MINI_KV_V199_ROUTE_CATALOG_CLEANUP_BATCH_CLOSEOUT));
  const miniKvV200RouteCatalogCleanupBatchCloseoutAudit =
    createMiniKvRouteCatalogCleanupBatchCloseout(
      readJsonObject(MINI_KV_V200_ROUTE_CATALOG_CLEANUP_BATCH_CLOSEOUT_AUDIT),
    );
  const checks = createChecks({
    files,
    snippets,
    javaV211ConsumerHandoffBundle,
    javaV211ConsumerHandoffBundleFixture,
    javaV214ConsumerHandoffBundleIntegrity,
    miniKvV199RouteCatalogCleanupBatchCloseout,
    miniKvV200RouteCatalogCleanupBatchCloseoutAudit,
  });

  return {
    files,
    snippets,
    javaV211ConsumerHandoffBundle,
    javaV211ConsumerHandoffBundleFixture,
    javaV214ConsumerHandoffBundleIntegrity,
    miniKvV199RouteCatalogCleanupBatchCloseout,
    miniKvV200RouteCatalogCleanupBatchCloseoutAudit,
    checks,
    summary: {
      fileCount: Object.keys(files).length,
      presentFileCount: Object.values(files).filter((file) => file.exists).length,
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      javaCatalogedArtifactCount: javaV211ConsumerHandoffBundle.catalogedArtifactCount,
      javaConsumerReadTargetCount: javaV211ConsumerHandoffBundleFixture.consumerReadTargetCount,
      miniKvV199ArchivedNodeVersionCount: miniKvV199RouteCatalogCleanupBatchCloseout.archivedNodeVersionCount,
      miniKvV200HistoricalFixtureCount: miniKvV200RouteCatalogCleanupBatchCloseoutAudit.historicalFixtureCount,
      miniKvV200BoundaryGroupCount: miniKvV200RouteCatalogCleanupBatchCloseoutAudit.groupCount,
    },
  };
}

function createJavaV211ConsumerHandoffBundle(
  source: Record<string, unknown>,
): JavaV211ConsumerHandoffBundleEvidence {
  return {
    version: stringField(source, "version"),
    status: stringField(source, "status"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    receiptId: stringField(source, "receiptId"),
    handoffBundleEndpoint: stringField(source, "handoffBundleEndpoint"),
    handoffBundleFixtureEndpoint: stringField(source, "handoffBundleFixtureEndpoint"),
    endpointCatalogEndpoint: stringField(source, "endpointCatalogEndpoint"),
    endpointCatalogReceiptId: stringField(source, "endpointCatalogReceiptId"),
    catalogedArtifactCount: numberField(source, "catalogedArtifactCount"),
    requiredEvidenceCount: numberField(source, "requiredEvidenceCount"),
    handoffEvidenceCount: stringArrayField(source, "handoffEvidence").length,
    validationCount: stringArrayField(source, "validation").length,
    boundaryRuntimeClosed: boundaryRuntimeClosed(objectField(source, "boundary")),
  };
}

function createJavaV211ConsumerHandoffBundleFixture(
  source: Record<string, unknown>,
): JavaV211ConsumerHandoffBundleFixtureEvidence {
  return {
    project: stringField(source, "project"),
    version: stringField(source, "version"),
    contractName: stringField(source, "contractName"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    receiptId: stringField(source, "receiptId"),
    status: stringField(source, "status"),
    catalogedArtifactCount: numberField(source, "catalogedArtifactCount"),
    consumerReadTargetCount: stringArrayField(source, "consumerReadTargets").length,
    fixtureReadTargetCount: stringArrayField(source, "fixtureReadTargets").length,
    requiredEvidenceCount: stringArrayField(source, "requiredEvidence").length,
    handoffEvidenceCount: stringArrayField(source, "handoffEvidence").length,
    blockedOperationCount: stringArrayField(source, "blockedOperations").length,
    probesAreGetOnly: booleanField(source, "probesAreGetOnly"),
    upstreamActionsAllowed: booleanField(source, "upstreamActionsAllowed"),
    nodeMayStartOrStopJavaOrMiniKv: booleanField(source, "nodeMayStartOrStopJavaOrMiniKv"),
  };
}

function createJavaV214ConsumerHandoffBundleIntegrity(
  source: Record<string, unknown>,
): JavaV214ConsumerHandoffBundleIntegrityEvidence {
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

function createMiniKvRouteCatalogCleanupBatchCloseout(
  source: Record<string, unknown>,
): MiniKvRouteCatalogCleanupBatchCloseoutEvidence {
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
  files: JavaMiniKvRouteCatalogCleanupCurrentEvidence["files"];
  snippets: JavaMiniKvRouteCatalogCleanupCurrentEvidence["snippets"];
  javaV211ConsumerHandoffBundle: JavaV211ConsumerHandoffBundleEvidence;
  javaV211ConsumerHandoffBundleFixture: JavaV211ConsumerHandoffBundleFixtureEvidence;
  javaV214ConsumerHandoffBundleIntegrity: JavaV214ConsumerHandoffBundleIntegrityEvidence;
  miniKvV199RouteCatalogCleanupBatchCloseout: MiniKvRouteCatalogCleanupBatchCloseoutEvidence;
  miniKvV200RouteCatalogCleanupBatchCloseoutAudit: MiniKvRouteCatalogCleanupBatchCloseoutEvidence;
}): JavaMiniKvRouteCatalogCleanupCurrentEvidence["checks"] {
  const javaV211 = input.javaV211ConsumerHandoffBundle;
  const javaV211Fixture = input.javaV211ConsumerHandoffBundleFixture;
  const javaV214 = input.javaV214ConsumerHandoffBundleIntegrity;
  const miniKvV199 = input.miniKvV199RouteCatalogCleanupBatchCloseout;
  const miniKvV200 = input.miniKvV200RouteCatalogCleanupBatchCloseoutAudit;

  return {
    ...javaV211Checks(input, javaV211),
    ...javaV211FixtureChecks(input, javaV211Fixture),
    ...javaV214Checks(input, javaV214),
    ...miniKvV199Checks(input, miniKvV199),
    ...miniKvV200Checks(input, miniKvV200),
    ...runtimeAuthorityChecks(javaV211, javaV211Fixture, javaV214, miniKvV199, miniKvV200),
  };
}

function javaV211Checks(
  input: Parameters<typeof createChecks>[0],
  javaV211: JavaV211ConsumerHandoffBundleEvidence,
) {
  return {
    javaV211FilePresent: input.files.javaV211ConsumerHandoffBundle.exists,
    javaV211HandoffBundleReady:
      javaV211.version === "Java v211"
      && javaV211.status === "passed"
      && javaV211.readOnly === true
      && javaV211.executionAllowed === false,
    javaV211HandoffBundleCountsStable:
      javaV211.handoffBundleEndpoint === "/api/v1/ops/shard-readiness/v1-contract-consumer-handoff-bundle"
      && javaV211.handoffBundleFixtureEndpoint
        === "/contracts/java-shard-readiness-v1-contract-consumer-handoff-bundle-v211.fixture.json"
      && javaV211.endpointCatalogEndpoint === "/api/v1/ops/shard-readiness/v1-contract-endpoint-catalog"
      && javaV211.endpointCatalogReceiptId === "java-shard-readiness-v1-contract-endpoint-catalog-receipt-v208"
      && javaV211.catalogedArtifactCount === 6
      && javaV211.requiredEvidenceCount === 9
      && javaV211.handoffEvidenceCount === 4
      && javaV211.validationCount >= 3
      && javaV211.boundaryRuntimeClosed,
  };
}

function javaV211FixtureChecks(
  input: Parameters<typeof createChecks>[0],
  javaV211Fixture: JavaV211ConsumerHandoffBundleFixtureEvidence,
) {
  return {
    javaV211FixtureFilePresent: input.files.javaV211ConsumerHandoffBundleFixture.exists,
    javaV211FixtureReady:
      javaV211Fixture.project === "advanced-order-platform"
      && javaV211Fixture.version === "Java v211"
      && javaV211Fixture.contractName === "shard-readiness.v1"
      && javaV211Fixture.status === "passed"
      && javaV211Fixture.catalogedArtifactCount === 6,
    javaV211FixtureGetOnly:
      javaV211Fixture.consumerReadTargetCount === 6
      && javaV211Fixture.fixtureReadTargetCount === 6
      && javaV211Fixture.requiredEvidenceCount === 9
      && javaV211Fixture.handoffEvidenceCount === 4
      && javaV211Fixture.blockedOperationCount >= 7
      && javaV211Fixture.probesAreGetOnly === true
      && javaV211Fixture.upstreamActionsAllowed === false
      && javaV211Fixture.nodeMayStartOrStopJavaOrMiniKv === false,
  };
}

function javaV214Checks(
  input: Parameters<typeof createChecks>[0],
  javaV214: JavaV214ConsumerHandoffBundleIntegrityEvidence,
) {
  return {
    javaV214FilePresent: input.files.javaV214ConsumerHandoffBundleIntegrity.exists,
    javaV214IntegrityReady:
      javaV214.version === "Java v214"
      && javaV214.status === "passed"
      && javaV214.readOnly === true
      && javaV214.executionAllowed === false,
    javaV214IntegrityGuardsComplete:
      javaV214.scope === "v1 contract consumer handoff bundle integrity"
      && javaV214.guardCount === 6
      && javaV214.validationCount === 3
      && javaV214.boundaryRuntimeClosed,
  };
}

function miniKvV199Checks(
  input: Parameters<typeof createChecks>[0],
  miniKvV199: MiniKvRouteCatalogCleanupBatchCloseoutEvidence,
) {
  return {
    miniKvV199FilePresent: input.files.miniKvV199RouteCatalogCleanupBatchCloseout.exists,
    miniKvV199CloseoutReady:
      miniKvV199.releaseVersion === "v199"
      && miniKvV199.status === "node-route-catalog-cleanup-evidence-batch-closeout-read-only"
      && miniKvV199.readOnly === true
      && miniKvV199.executionAllowed === false
      && miniKvV199.shardEnabled === false,
    miniKvV199PreservesNodeV480Window:
      miniKvV199.archivedNodeVersionCount >= 97
      && miniKvV199.historicalFixtureCount >= 55
      && miniKvV199.previousConsumedReleaseVersion === "v198"
      && (miniKvV199.previousConsumptionNodeVersion?.includes("Node v480") ?? false)
      && (miniKvV199.nodeConsumer?.includes("Node v481+") ?? false)
      && miniKvV199.evidenceDigest === "fnv1a64:3a5716f6f09c2b3b"
      && miniKvV199.changesArchivedNodeEvidence === false,
  };
}

function miniKvV200Checks(
  input: Parameters<typeof createChecks>[0],
  miniKvV200: MiniKvRouteCatalogCleanupBatchCloseoutEvidence,
) {
  return {
    miniKvV200FilePresent: input.files.miniKvV200RouteCatalogCleanupBatchCloseoutAudit.exists,
    miniKvV200AuditReady:
      miniKvV200.releaseVersion === "v200"
      && miniKvV200.status === "node-route-catalog-cleanup-evidence-batch-closeout-audit-read-only"
      && miniKvV200.readOnly === true
      && miniKvV200.executionAllowed === false
      && miniKvV200.shardEnabled === false,
    miniKvV200UsesV199Baseline:
      miniKvV200.archivedNodeVersionCount >= 97
      && miniKvV200.historicalFixtureCount >= 56
      && miniKvV200.previousConsumedReleaseVersion === "v199"
      && (miniKvV200.previousConsumptionNodeVersion?.includes("Node v480") ?? false)
      && (miniKvV200.nodeConsumer?.includes("Node v481+") ?? false)
      && miniKvV200.evidenceDigest === "fnv1a64:d1e889711b5d8574"
      && miniKvV200.fieldCount === 800
      && miniKvV200.groupCount === 39,
    miniKvV200AuditNotePresent: input.files.miniKvV200RouteCatalogCleanupBatchCloseoutAuditNote.exists,
    miniKvV200AuditNoteMatchesFixture:
      snippetMatched(Object.values(input.snippets), "mini-kv-v200-release")
      && snippetMatched(Object.values(input.snippets), "mini-kv-v200-digest")
      && snippetMatched(Object.values(input.snippets), "mini-kv-v200-full-ctest")
      && snippetMatched(Object.values(input.snippets), "mini-kv-v200-tcp-smoke"),
  };
}

function runtimeAuthorityChecks(
  javaV211: JavaV211ConsumerHandoffBundleEvidence,
  javaV211Fixture: JavaV211ConsumerHandoffBundleFixtureEvidence,
  javaV214: JavaV214ConsumerHandoffBundleIntegrityEvidence,
  miniKvV199: MiniKvRouteCatalogCleanupBatchCloseoutEvidence,
  miniKvV200: MiniKvRouteCatalogCleanupBatchCloseoutEvidence,
) {
  return {
    noRuntimeAuthorityOpened:
      javaV211.executionAllowed === false
      && javaV211Fixture.executionAllowed === false
      && javaV214.executionAllowed === false
      && miniKvV199.executionAllowed === false
      && miniKvV200.executionAllowed === false
      && miniKvV199.writeCommandsAllowed === false
      && miniKvV200.writeCommandsAllowed === false
      && miniKvV199.adminCommandsAllowed === false
      && miniKvV200.adminCommandsAllowed === false
      && miniKvV199.activeRouterInstalled === false
      && miniKvV200.activeRouterInstalled === false,
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
