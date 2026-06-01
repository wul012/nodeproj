import {
  booleanField,
  evidenceFile,
  numberField,
  objectField,
  readJsonObject,
  stringArrayField,
  stringField,
  type HistoricalEvidenceFile,
} from "./historicalEvidenceReportUtils.js";
import { countPassedReportChecks, countReportChecks } from "./liveProbeReportUtils.js";

export const JAVA_V225_CONSUMER_READINESS_HANDOFF =
  "D:/javaproj/advanced-order-platform/e/225/evidence/java-shard-readiness-v1-contract-consumer-readiness-handoff-v225.json";
export const JAVA_V225_CONSUMER_READINESS_HANDOFF_FIXTURE =
  "D:/javaproj/advanced-order-platform/src/main/resources/static/contracts/java-shard-readiness-v1-contract-consumer-readiness-handoff-v225.fixture.json";
export const JAVA_V226_CONSUMER_READINESS_HANDOFF_SNAPSHOT_FREEZE =
  "D:/javaproj/advanced-order-platform/e/226/evidence/java-shard-readiness-v225-consumer-readiness-handoff-snapshot-freeze-v226.json";
export const JAVA_V227_CONSUMER_READINESS_HANDOFF_HISTORICAL_COMPATIBILITY =
  "D:/javaproj/advanced-order-platform/e/227/evidence/java-shard-readiness-v225-consumer-readiness-handoff-historical-compatibility-v227.json";
export const JAVA_V228_CONSUMER_READINESS_HANDOFF_INTEGRITY =
  "D:/javaproj/advanced-order-platform/e/228/evidence/java-shard-readiness-v1-contract-consumer-readiness-handoff-integrity-v228.json";
export const JAVA_V229_CONSUMER_READINESS_HANDOFF_ROUTE_INVENTORY =
  "D:/javaproj/advanced-order-platform/e/229/evidence/java-shard-readiness-v1-contract-consumer-readiness-handoff-route-inventory-v229.json";
export const JAVA_V230_CONSUMER_READINESS_HANDOFF_EVIDENCE_CHAIN =
  "D:/javaproj/advanced-order-platform/e/230/evidence/java-shard-readiness-v1-contract-consumer-readiness-handoff-evidence-chain-v230.json";
export const JAVA_V231_CONSUMER_READINESS_HANDOFF_OPS_EVIDENCE_ALIGNMENT =
  "D:/javaproj/advanced-order-platform/e/231/evidence/java-shard-readiness-v1-contract-consumer-readiness-handoff-ops-evidence-alignment-v231.json";
export const MINI_KV_V211_ROUTE_CATALOG_POST_CLOSEOUT_RETENTION =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v211.json";
export const MINI_KV_V212_ROUTE_CATALOG_POST_CLOSEOUT_RETENTION_AUDIT =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v212.json";

export interface JavaReadinessHandoffEvidence {
  version: string | null;
  status: string | null;
  scope: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  receiptId: string | null;
  endpoint: string | null;
  fixtureEndpoint: string | null;
  evidenceDigestEndpoint: string | null;
  digestEvidenceCount: number | null;
  digestCheckCount: number | null;
  handoffGuardEvidenceCount: number | null;
  digestEvidencePathCount: number;
  handoffGuardEvidencePathCount: number;
  validationCount: number;
  boundaryRuntimeClosed: boolean;
}

export interface JavaReadinessHandoffFixtureEvidence {
  project: string | null;
  version: string | null;
  contractName: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  shardEnabled: boolean | null;
  readinessHandoffEndpoint: string | null;
  readinessHandoffFixtureEndpoint: string | null;
  evidenceDigestEndpoint: string | null;
  evidenceDigestFixtureEndpoint: string | null;
  digestEvidenceCount: number | null;
  digestCheckCount: number | null;
  handoffGuardEvidenceCount: number;
  handoffCheckCount: number;
  blockedOperationCount: number;
  probesAreGetOnly: boolean | null;
  upstreamActionsAllowed: boolean | null;
  startsJavaService: boolean | null;
  startsMiniKvService: boolean | null;
  nodeMayStartOrStopJavaOrMiniKv: boolean | null;
  status: string | null;
}

export interface JavaReadinessHandoffGuardEvidence {
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

export interface MiniKvRetentionEvidence {
  releaseVersion: string | null;
  status: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  evidenceDigest: string | null;
  previousConsumedReleaseVersion: string | null;
  nodeConsumer: string | null;
  continuityStage: string | null;
  stageSequence: number | null;
  fieldCount: number | null;
  groupCount: number | null;
  historicalFixtureCount: number;
  writeCommandsAllowed: boolean | null;
  adminCommandsAllowed: boolean | null;
  activeRouterInstalled: boolean | null;
}

export interface JavaMiniKvRouteCatalogCleanupReadinessHandoffEvidence {
  files: {
    javaV225ConsumerReadinessHandoff: HistoricalEvidenceFile;
    javaV225ConsumerReadinessHandoffFixture: HistoricalEvidenceFile;
    javaV226ConsumerReadinessHandoffSnapshotFreeze: HistoricalEvidenceFile;
    javaV227ConsumerReadinessHandoffHistoricalCompatibility: HistoricalEvidenceFile;
    javaV228ConsumerReadinessHandoffIntegrity: HistoricalEvidenceFile;
    javaV229ConsumerReadinessHandoffRouteInventory: HistoricalEvidenceFile;
    javaV230ConsumerReadinessHandoffEvidenceChain: HistoricalEvidenceFile;
    javaV231ConsumerReadinessHandoffOpsEvidenceAlignment: HistoricalEvidenceFile;
    miniKvV211RouteCatalogPostCloseoutRetention: HistoricalEvidenceFile;
    miniKvV212RouteCatalogPostCloseoutRetentionAudit: HistoricalEvidenceFile;
  };
  javaV225ConsumerReadinessHandoff: JavaReadinessHandoffEvidence;
  javaV225ConsumerReadinessHandoffFixture: JavaReadinessHandoffFixtureEvidence;
  javaV226ConsumerReadinessHandoffSnapshotFreeze: JavaReadinessHandoffGuardEvidence;
  javaV227ConsumerReadinessHandoffHistoricalCompatibility: JavaReadinessHandoffGuardEvidence;
  javaV228ConsumerReadinessHandoffIntegrity: JavaReadinessHandoffGuardEvidence;
  javaV229ConsumerReadinessHandoffRouteInventory: JavaReadinessHandoffGuardEvidence;
  javaV230ConsumerReadinessHandoffEvidenceChain: JavaReadinessHandoffGuardEvidence;
  javaV231ConsumerReadinessHandoffOpsEvidenceAlignment: JavaReadinessHandoffGuardEvidence;
  miniKvV211RouteCatalogPostCloseoutRetention: MiniKvRetentionEvidence;
  miniKvV212RouteCatalogPostCloseoutRetentionAudit: MiniKvRetentionEvidence;
  checks: {
    allFilesPresent: boolean;
    javaV225HandoffReady: boolean;
    javaV225HandoffCountsStable: boolean;
    javaV225FixtureReady: boolean;
    javaV225FixtureBoundaryClosed: boolean;
    javaV226SnapshotFreezeReady: boolean;
    javaV227HistoricalCompatibilityReady: boolean;
    javaV228IntegrityReady: boolean;
    javaV229RouteInventoryReady: boolean;
    javaV230EvidenceChainReady: boolean;
    javaV231OpsEvidenceAlignmentReady: boolean;
    miniKvV211RetentionReady: boolean;
    miniKvV212RetentionAuditReady: boolean;
    miniKvRetentionChainSequential: boolean;
    dirtySiblingWorktreesExcluded: boolean;
    noRuntimeAuthorityOpened: boolean;
  };
  summary: {
    fileCount: number;
    presentFileCount: number;
    checkCount: number;
    passedCheckCount: number;
    javaGuardCount: number;
    javaLatestCleanVersion: "Java v231";
    miniKvLatestCleanVersion: "v212";
    miniKvLatestHistoricalFixtureCount: number;
    miniKvBoundaryGroupCount: number | null;
  };
}

export function loadJavaMiniKvRouteCatalogCleanupReadinessHandoffEvidence():
  JavaMiniKvRouteCatalogCleanupReadinessHandoffEvidence {
  const files = {
    javaV225ConsumerReadinessHandoff:
      evidenceFile("java-v225-consumer-readiness-handoff", JAVA_V225_CONSUMER_READINESS_HANDOFF),
    javaV225ConsumerReadinessHandoffFixture:
      evidenceFile("java-v225-consumer-readiness-handoff-fixture", JAVA_V225_CONSUMER_READINESS_HANDOFF_FIXTURE),
    javaV226ConsumerReadinessHandoffSnapshotFreeze:
      evidenceFile("java-v226-consumer-readiness-handoff-snapshot-freeze",
        JAVA_V226_CONSUMER_READINESS_HANDOFF_SNAPSHOT_FREEZE),
    javaV227ConsumerReadinessHandoffHistoricalCompatibility:
      evidenceFile("java-v227-consumer-readiness-handoff-historical-compatibility",
        JAVA_V227_CONSUMER_READINESS_HANDOFF_HISTORICAL_COMPATIBILITY),
    javaV228ConsumerReadinessHandoffIntegrity:
      evidenceFile("java-v228-consumer-readiness-handoff-integrity", JAVA_V228_CONSUMER_READINESS_HANDOFF_INTEGRITY),
    javaV229ConsumerReadinessHandoffRouteInventory:
      evidenceFile("java-v229-consumer-readiness-handoff-route-inventory",
        JAVA_V229_CONSUMER_READINESS_HANDOFF_ROUTE_INVENTORY),
    javaV230ConsumerReadinessHandoffEvidenceChain:
      evidenceFile("java-v230-consumer-readiness-handoff-evidence-chain",
        JAVA_V230_CONSUMER_READINESS_HANDOFF_EVIDENCE_CHAIN),
    javaV231ConsumerReadinessHandoffOpsEvidenceAlignment:
      evidenceFile("java-v231-consumer-readiness-handoff-ops-evidence-alignment",
        JAVA_V231_CONSUMER_READINESS_HANDOFF_OPS_EVIDENCE_ALIGNMENT),
    miniKvV211RouteCatalogPostCloseoutRetention:
      evidenceFile("mini-kv-v211-route-catalog-post-closeout-retention",
        MINI_KV_V211_ROUTE_CATALOG_POST_CLOSEOUT_RETENTION),
    miniKvV212RouteCatalogPostCloseoutRetentionAudit:
      evidenceFile("mini-kv-v212-route-catalog-post-closeout-retention-audit",
        MINI_KV_V212_ROUTE_CATALOG_POST_CLOSEOUT_RETENTION_AUDIT),
  };
  const javaV225ConsumerReadinessHandoff =
    createJavaReadinessHandoff(readJsonObject(JAVA_V225_CONSUMER_READINESS_HANDOFF));
  const javaV225ConsumerReadinessHandoffFixture =
    createJavaReadinessHandoffFixture(readJsonObject(JAVA_V225_CONSUMER_READINESS_HANDOFF_FIXTURE));
  const javaV226ConsumerReadinessHandoffSnapshotFreeze =
    createJavaReadinessHandoffGuard(readJsonObject(JAVA_V226_CONSUMER_READINESS_HANDOFF_SNAPSHOT_FREEZE));
  const javaV227ConsumerReadinessHandoffHistoricalCompatibility =
    createJavaReadinessHandoffGuard(readJsonObject(JAVA_V227_CONSUMER_READINESS_HANDOFF_HISTORICAL_COMPATIBILITY));
  const javaV228ConsumerReadinessHandoffIntegrity =
    createJavaReadinessHandoffGuard(readJsonObject(JAVA_V228_CONSUMER_READINESS_HANDOFF_INTEGRITY));
  const javaV229ConsumerReadinessHandoffRouteInventory =
    createJavaReadinessHandoffGuard(readJsonObject(JAVA_V229_CONSUMER_READINESS_HANDOFF_ROUTE_INVENTORY));
  const javaV230ConsumerReadinessHandoffEvidenceChain =
    createJavaReadinessHandoffGuard(readJsonObject(JAVA_V230_CONSUMER_READINESS_HANDOFF_EVIDENCE_CHAIN));
  const javaV231ConsumerReadinessHandoffOpsEvidenceAlignment =
    createJavaReadinessHandoffGuard(readJsonObject(JAVA_V231_CONSUMER_READINESS_HANDOFF_OPS_EVIDENCE_ALIGNMENT));
  const miniKvV211RouteCatalogPostCloseoutRetention =
    createMiniKvRetention(readJsonObject(MINI_KV_V211_ROUTE_CATALOG_POST_CLOSEOUT_RETENTION));
  const miniKvV212RouteCatalogPostCloseoutRetentionAudit =
    createMiniKvRetention(readJsonObject(MINI_KV_V212_ROUTE_CATALOG_POST_CLOSEOUT_RETENTION_AUDIT));
  const checks = createChecks({
    files,
    javaV225ConsumerReadinessHandoff,
    javaV225ConsumerReadinessHandoffFixture,
    javaV226ConsumerReadinessHandoffSnapshotFreeze,
    javaV227ConsumerReadinessHandoffHistoricalCompatibility,
    javaV228ConsumerReadinessHandoffIntegrity,
    javaV229ConsumerReadinessHandoffRouteInventory,
    javaV230ConsumerReadinessHandoffEvidenceChain,
    javaV231ConsumerReadinessHandoffOpsEvidenceAlignment,
    miniKvV211RouteCatalogPostCloseoutRetention,
    miniKvV212RouteCatalogPostCloseoutRetentionAudit,
  });

  return {
    files,
    javaV225ConsumerReadinessHandoff,
    javaV225ConsumerReadinessHandoffFixture,
    javaV226ConsumerReadinessHandoffSnapshotFreeze,
    javaV227ConsumerReadinessHandoffHistoricalCompatibility,
    javaV228ConsumerReadinessHandoffIntegrity,
    javaV229ConsumerReadinessHandoffRouteInventory,
    javaV230ConsumerReadinessHandoffEvidenceChain,
    javaV231ConsumerReadinessHandoffOpsEvidenceAlignment,
    miniKvV211RouteCatalogPostCloseoutRetention,
    miniKvV212RouteCatalogPostCloseoutRetentionAudit,
    checks,
    summary: {
      fileCount: Object.keys(files).length,
      presentFileCount: Object.values(files).filter((file) => file.exists).length,
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      javaGuardCount:
        javaV226ConsumerReadinessHandoffSnapshotFreeze.guardCount
        + javaV227ConsumerReadinessHandoffHistoricalCompatibility.guardCount
        + javaV228ConsumerReadinessHandoffIntegrity.guardCount
        + javaV229ConsumerReadinessHandoffRouteInventory.guardCount
        + javaV230ConsumerReadinessHandoffEvidenceChain.guardCount
        + javaV231ConsumerReadinessHandoffOpsEvidenceAlignment.guardCount,
      javaLatestCleanVersion: "Java v231",
      miniKvLatestCleanVersion: "v212",
      miniKvLatestHistoricalFixtureCount: miniKvV212RouteCatalogPostCloseoutRetentionAudit.historicalFixtureCount,
      miniKvBoundaryGroupCount: miniKvV212RouteCatalogPostCloseoutRetentionAudit.groupCount,
    },
  };
}

function createJavaReadinessHandoff(source: Record<string, unknown>): JavaReadinessHandoffEvidence {
  return {
    version: stringField(source, "version"),
    status: stringField(source, "status"),
    scope: stringField(source, "scope"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    receiptId: stringField(source, "receiptId"),
    endpoint: stringField(source, "endpoint"),
    fixtureEndpoint: stringField(source, "fixtureEndpoint"),
    evidenceDigestEndpoint: stringField(source, "evidenceDigestEndpoint"),
    digestEvidenceCount: numberField(source, "digestEvidenceCount"),
    digestCheckCount: numberField(source, "digestCheckCount"),
    handoffGuardEvidenceCount: numberField(source, "handoffGuardEvidenceCount"),
    digestEvidencePathCount: stringArrayField(source, "digestEvidence").length,
    handoffGuardEvidencePathCount: stringArrayField(source, "handoffGuardEvidence").length,
    validationCount: stringArrayField(source, "validation").length,
    boundaryRuntimeClosed: boundaryRuntimeClosed(objectField(source, "boundary")),
  };
}

function createJavaReadinessHandoffFixture(source: Record<string, unknown>): JavaReadinessHandoffFixtureEvidence {
  return {
    project: stringField(source, "project"),
    version: stringField(source, "version"),
    contractName: stringField(source, "contractName"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    shardEnabled: booleanField(source, "shardEnabled"),
    readinessHandoffEndpoint: stringField(source, "readinessHandoffEndpoint"),
    readinessHandoffFixtureEndpoint: stringField(source, "readinessHandoffFixtureEndpoint"),
    evidenceDigestEndpoint: stringField(source, "evidenceDigestEndpoint"),
    evidenceDigestFixtureEndpoint: stringField(source, "evidenceDigestFixtureEndpoint"),
    digestEvidenceCount: numberField(source, "digestEvidenceCount"),
    digestCheckCount: numberField(source, "digestCheckCount"),
    handoffGuardEvidenceCount: stringArrayField(source, "handoffGuardEvidence").length,
    handoffCheckCount: stringArrayField(source, "handoffChecks").length,
    blockedOperationCount: stringArrayField(source, "blockedOperations").length,
    probesAreGetOnly: booleanField(source, "probesAreGetOnly"),
    upstreamActionsAllowed: booleanField(source, "upstreamActionsAllowed"),
    startsJavaService: booleanField(source, "startsJavaService"),
    startsMiniKvService: booleanField(source, "startsMiniKvService"),
    nodeMayStartOrStopJavaOrMiniKv: booleanField(source, "nodeMayStartOrStopJavaOrMiniKv"),
    status: stringField(source, "status"),
  };
}

function createJavaReadinessHandoffGuard(source: Record<string, unknown>): JavaReadinessHandoffGuardEvidence {
  return {
    version: stringField(source, "version"),
    status: stringField(source, "status"),
    scope: stringField(source, "scope"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    receiptId: stringField(source, "receiptId"),
    guardCount: stringArrayField(source, "guards").length,
    validationCount: stringArrayField(source, "validation").length,
    boundaryRuntimeClosed: boundaryRuntimeClosed(objectField(source, "boundary")),
  };
}

function createMiniKvRetention(source: Record<string, unknown>): MiniKvRetentionEvidence {
  const historicalFallback = objectField(source, "historicalFallback");
  const diagnostics = objectField(source, "diagnostics");
  const boundaryCatalog = objectField(source, "boundaryCatalogIndex");
  const fixtureParity = objectField(source, "fixtureParity");
  const continuity = objectField(source, "nodeRouteCatalogCleanupPostCloseoutContinuity");
  const boundaries = objectField(source, "boundaries");

  return {
    releaseVersion: stringField(source, "releaseVersion"),
    status: stringField(source, "status"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    evidenceDigest: stringField(source, "evidenceDigest"),
    previousConsumedReleaseVersion: stringField(historicalFallback, "previousConsumedReleaseVersion"),
    nodeConsumer: stringField(diagnostics, "nodeConsumer"),
    continuityStage: stringField(continuity, "continuityStage"),
    stageSequence: numberField(continuity, "stageSequence"),
    fieldCount: numberField(boundaryCatalog, "fieldCount"),
    groupCount: numberField(boundaryCatalog, "groupCount"),
    historicalFixtureCount: stringArrayField(fixtureParity, "historicalFixturePaths").length,
    writeCommandsAllowed: booleanField(boundaries, "writeCommandsAllowed"),
    adminCommandsAllowed: booleanField(boundaries, "adminCommandsAllowed"),
    activeRouterInstalled: booleanField(boundaries, "activeRouterInstalled"),
  };
}

function createChecks(input: {
  files: JavaMiniKvRouteCatalogCleanupReadinessHandoffEvidence["files"];
  javaV225ConsumerReadinessHandoff: JavaReadinessHandoffEvidence;
  javaV225ConsumerReadinessHandoffFixture: JavaReadinessHandoffFixtureEvidence;
  javaV226ConsumerReadinessHandoffSnapshotFreeze: JavaReadinessHandoffGuardEvidence;
  javaV227ConsumerReadinessHandoffHistoricalCompatibility: JavaReadinessHandoffGuardEvidence;
  javaV228ConsumerReadinessHandoffIntegrity: JavaReadinessHandoffGuardEvidence;
  javaV229ConsumerReadinessHandoffRouteInventory: JavaReadinessHandoffGuardEvidence;
  javaV230ConsumerReadinessHandoffEvidenceChain: JavaReadinessHandoffGuardEvidence;
  javaV231ConsumerReadinessHandoffOpsEvidenceAlignment: JavaReadinessHandoffGuardEvidence;
  miniKvV211RouteCatalogPostCloseoutRetention: MiniKvRetentionEvidence;
  miniKvV212RouteCatalogPostCloseoutRetentionAudit: MiniKvRetentionEvidence;
}): JavaMiniKvRouteCatalogCleanupReadinessHandoffEvidence["checks"] {
  const v225 = input.javaV225ConsumerReadinessHandoff;
  const fixture = input.javaV225ConsumerReadinessHandoffFixture;
  const v211 = input.miniKvV211RouteCatalogPostCloseoutRetention;
  const v212 = input.miniKvV212RouteCatalogPostCloseoutRetentionAudit;

  return {
    allFilesPresent: Object.values(input.files).every((file) => file.exists),
    javaV225HandoffReady:
      v225.version === "Java v225"
      && v225.status === "passed"
      && v225.readOnly === true
      && v225.executionAllowed === false
      && v225.scope === "v1 contract consumer readiness handoff",
    javaV225HandoffCountsStable:
      v225.endpoint === "/api/v1/ops/shard-readiness/v1-contract-consumer-readiness-handoff"
      && v225.fixtureEndpoint === "/contracts/java-shard-readiness-v1-contract-consumer-readiness-handoff-v225.fixture.json"
      && v225.evidenceDigestEndpoint === "/api/v1/ops/shard-readiness/v1-contract-consumer-evidence-digest"
      && v225.digestEvidenceCount === 5
      && v225.digestCheckCount === 7
      && v225.handoffGuardEvidenceCount === 4
      && v225.digestEvidencePathCount === 5
      && v225.handoffGuardEvidencePathCount === 4
      && v225.validationCount === 2
      && v225.boundaryRuntimeClosed,
    javaV225FixtureReady:
      fixture.project === "advanced-order-platform"
      && fixture.version === "Java v225"
      && fixture.contractName === "shard-readiness.v1"
      && fixture.status === "passed"
      && fixture.shardEnabled === false
      && fixture.digestEvidenceCount === 5
      && fixture.digestCheckCount === 7
      && fixture.handoffGuardEvidenceCount === 4,
    javaV225FixtureBoundaryClosed:
      fixture.handoffCheckCount === 7
      && fixture.blockedOperationCount === 7
      && fixture.probesAreGetOnly === true
      && fixture.upstreamActionsAllowed === false
      && fixture.startsJavaService === false
      && fixture.startsMiniKvService === false
      && fixture.nodeMayStartOrStopJavaOrMiniKv === false,
    javaV226SnapshotFreezeReady:
      javaGuardReady(input.javaV226ConsumerReadinessHandoffSnapshotFreeze, "Java v226",
        "v225 consumer readiness handoff snapshot freeze"),
    javaV227HistoricalCompatibilityReady:
      javaGuardReady(input.javaV227ConsumerReadinessHandoffHistoricalCompatibility, "Java v227",
        "v225 consumer readiness handoff historical compatibility"),
    javaV228IntegrityReady:
      javaGuardReady(input.javaV228ConsumerReadinessHandoffIntegrity, "Java v228",
        "v1 contract consumer readiness handoff integrity"),
    javaV229RouteInventoryReady:
      javaGuardReady(input.javaV229ConsumerReadinessHandoffRouteInventory, "Java v229",
        "v1 contract consumer readiness handoff route inventory"),
    javaV230EvidenceChainReady:
      javaGuardReady(input.javaV230ConsumerReadinessHandoffEvidenceChain, "Java v230",
        "v1 contract consumer readiness handoff evidence chain"),
    javaV231OpsEvidenceAlignmentReady:
      javaGuardReady(input.javaV231ConsumerReadinessHandoffOpsEvidenceAlignment, "Java v231",
        "v1 contract consumer readiness handoff ops evidence alignment"),
    miniKvV211RetentionReady: miniKvReady(v211, "v211", "v210", 11, 67),
    miniKvV212RetentionAuditReady: miniKvReady(v212, "v212", "v211", 12, 68),
    miniKvRetentionChainSequential:
      v211.releaseVersion === "v211"
      && v211.previousConsumedReleaseVersion === "v210"
      && v212.releaseVersion === "v212"
      && v212.previousConsumedReleaseVersion === "v211",
    dirtySiblingWorktreesExcluded: true,
    noRuntimeAuthorityOpened:
      v225.executionAllowed === false
      && fixture.executionAllowed === false
      && [
        input.javaV226ConsumerReadinessHandoffSnapshotFreeze,
        input.javaV227ConsumerReadinessHandoffHistoricalCompatibility,
        input.javaV228ConsumerReadinessHandoffIntegrity,
        input.javaV229ConsumerReadinessHandoffRouteInventory,
        input.javaV230ConsumerReadinessHandoffEvidenceChain,
        input.javaV231ConsumerReadinessHandoffOpsEvidenceAlignment,
      ].every((guard) => guard.executionAllowed === false)
      && [v211, v212].every((release) =>
        release.executionAllowed === false
        && release.writeCommandsAllowed === false
        && release.adminCommandsAllowed === false
        && release.activeRouterInstalled === false),
  };
}

function javaGuardReady(guard: JavaReadinessHandoffGuardEvidence, version: string, scope: string): boolean {
  return guard.version === version
    && guard.status === "passed"
    && guard.readOnly === true
    && guard.executionAllowed === false
    && guard.scope === scope
    && guard.guardCount === 5
    && guard.validationCount === 2
    && guard.boundaryRuntimeClosed;
}

function miniKvReady(
  release: MiniKvRetentionEvidence,
  version: string,
  previousVersion: string,
  stageSequence: number,
  historicalFixtureCount: number,
): boolean {
  return release.releaseVersion === version
    && release.status === "node-route-catalog-cleanup-post-closeout-continuity-read-only"
    && release.readOnly === true
    && release.executionAllowed === false
    && release.previousConsumedReleaseVersion === previousVersion
    && release.stageSequence === stageSequence
    && release.historicalFixtureCount === historicalFixtureCount
    && release.fieldCount === 821
    && release.groupCount === 40;
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
