import {
  booleanField,
  evidenceFile,
  numberField,
  objectArrayField,
  objectField,
  readJsonObject,
  stringArrayField,
  stringField,
  type HistoricalEvidenceFile,
} from "./historicalEvidenceReportUtils.js";
import { countPassedReportChecks, countReportChecks } from "./liveProbeReportUtils.js";

export const JAVA_V207_CONTROLLER_SPLIT =
  "D:/javaproj/advanced-order-platform/e/207/evidence/java-shard-readiness-v1-contract-controller-split-v207.json";
export const JAVA_V208_ENDPOINT_CATALOG =
  "D:/javaproj/advanced-order-platform/e/208/evidence/java-shard-readiness-v1-contract-endpoint-catalog-v208.json";
export const JAVA_V208_ENDPOINT_CATALOG_FIXTURE =
  "D:/javaproj/advanced-order-platform/src/main/resources/static/contracts/java-shard-readiness-v1-contract-endpoint-catalog-v208.fixture.json";
export const MINI_KV_V193_HANDOFF_AUDIT_FREEZE =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v193.json";

export interface JavaV207ControllerSplitEvidence {
  version: string | null;
  status: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  sourceController: string | null;
  newController: string | null;
  v1RouteCount: number | null;
  mainControllerKeepsCount: number;
  guardsCount: number;
  boundaryRuntimeClosed: boolean;
}

export interface JavaV208EndpointCatalogEvidence {
  version: string | null;
  status: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  endpointCatalogEndpoint: string | null;
  endpointCatalogFixtureEndpoint: string | null;
  contractEndpointCount: number | null;
  catalogedArtifactCount: number;
  registryPairCount: number | null;
  includedInOpsEvidenceProbes: boolean | null;
  boundaryRuntimeClosed: boolean;
}

export interface JavaV208EndpointCatalogFixtureEvidence {
  version: string | null;
  contractName: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  endpointCount: number;
  liveProbeEndpointCount: number;
  fixtureProbeEndpointCount: number;
  evidencePathCount: number;
  probesAreGetOnly: boolean | null;
  upstreamActionsAllowed: boolean | null;
  nodeMayStartOrStopJavaOrMiniKv: boolean | null;
  status: string | null;
}

export interface MiniKvV193HandoffAuditFreezeEvidence {
  releaseVersion: string | null;
  status: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  shardEnabled: boolean | null;
  archivedNodeVersionCount: number;
  historicalFixtureCount: number;
  previousConsumedReleaseVersion: string | null;
  previousConsumptionNodeVersion: string | null;
  nodeConsumer: string | null;
  evidenceDigest: string | null;
  writeCommandsAllowed: boolean | null;
  activeRouterInstalled: boolean | null;
  fieldCount: number | null;
  groupCount: number | null;
}

export interface JavaMiniKvRouteCatalogCleanupLatestEvidence {
  files: {
    javaV207ControllerSplit: HistoricalEvidenceFile;
    javaV208EndpointCatalog: HistoricalEvidenceFile;
    javaV208EndpointCatalogFixture: HistoricalEvidenceFile;
    miniKvV193HandoffAuditFreeze: HistoricalEvidenceFile;
  };
  javaV207ControllerSplit: JavaV207ControllerSplitEvidence;
  javaV208EndpointCatalog: JavaV208EndpointCatalogEvidence;
  javaV208EndpointCatalogFixture: JavaV208EndpointCatalogFixtureEvidence;
  miniKvV193HandoffAuditFreeze: MiniKvV193HandoffAuditFreezeEvidence;
  checks: {
    javaV207FilePresent: boolean;
    javaV207ControllerSplitReady: boolean;
    javaV207RouteSplitCountStable: boolean;
    javaV207RuntimeBoundaryClosed: boolean;
    javaV208FilePresent: boolean;
    javaV208EndpointCatalogReady: boolean;
    javaV208EndpointCatalogCountsStable: boolean;
    javaV208RuntimeBoundaryClosed: boolean;
    javaV208FixtureFilePresent: boolean;
    javaV208FixtureReady: boolean;
    javaV208FixtureGetOnly: boolean;
    miniKvV193FilePresent: boolean;
    miniKvV193AuditFreezeReady: boolean;
    miniKvV193PreservesNodeV472Window: boolean;
    miniKvV193UsesV192Baseline: boolean;
    noRuntimeAuthorityOpened: boolean;
  };
  summary: {
    fileCount: number;
    presentFileCount: number;
    checkCount: number;
    passedCheckCount: number;
    javaV1RouteCount: number | null;
    javaEndpointCatalogCount: number | null;
    miniKvArchivedNodeVersionCount: number;
    miniKvHistoricalFixtureCount: number;
  };
}

export function loadJavaMiniKvRouteCatalogCleanupLatestEvidence():
  JavaMiniKvRouteCatalogCleanupLatestEvidence {
  const files = {
    javaV207ControllerSplit: evidenceFile("java-v207-controller-split", JAVA_V207_CONTROLLER_SPLIT),
    javaV208EndpointCatalog: evidenceFile("java-v208-endpoint-catalog", JAVA_V208_ENDPOINT_CATALOG),
    javaV208EndpointCatalogFixture: evidenceFile("java-v208-endpoint-catalog-fixture",
      JAVA_V208_ENDPOINT_CATALOG_FIXTURE),
    miniKvV193HandoffAuditFreeze: evidenceFile("mini-kv-v193-handoff-audit-freeze",
      MINI_KV_V193_HANDOFF_AUDIT_FREEZE),
  };
  const javaV207ControllerSplit = createJavaV207(readJsonObject(JAVA_V207_CONTROLLER_SPLIT));
  const javaV208EndpointCatalog = createJavaV208(readJsonObject(JAVA_V208_ENDPOINT_CATALOG));
  const javaV208EndpointCatalogFixture = createJavaV208Fixture(readJsonObject(JAVA_V208_ENDPOINT_CATALOG_FIXTURE));
  const miniKvV193HandoffAuditFreeze = createMiniKvV193(readJsonObject(MINI_KV_V193_HANDOFF_AUDIT_FREEZE));
  const checks = createChecks({
    files,
    javaV207ControllerSplit,
    javaV208EndpointCatalog,
    javaV208EndpointCatalogFixture,
    miniKvV193HandoffAuditFreeze,
  });

  return {
    files,
    javaV207ControllerSplit,
    javaV208EndpointCatalog,
    javaV208EndpointCatalogFixture,
    miniKvV193HandoffAuditFreeze,
    checks,
    summary: {
      fileCount: Object.keys(files).length,
      presentFileCount: Object.values(files).filter((file) => file.exists).length,
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      javaV1RouteCount: javaV207ControllerSplit.v1RouteCount,
      javaEndpointCatalogCount: javaV208EndpointCatalog.contractEndpointCount,
      miniKvArchivedNodeVersionCount: miniKvV193HandoffAuditFreeze.archivedNodeVersionCount,
      miniKvHistoricalFixtureCount: miniKvV193HandoffAuditFreeze.historicalFixtureCount,
    },
  };
}

function createJavaV207(source: Record<string, unknown>): JavaV207ControllerSplitEvidence {
  const controllerSplit = objectField(source, "controllerSplit");
  return {
    version: stringField(source, "version"),
    status: stringField(source, "status"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    sourceController: stringField(controllerSplit, "sourceController"),
    newController: stringField(controllerSplit, "newController"),
    v1RouteCount: numberField(controllerSplit, "v1RouteCount"),
    mainControllerKeepsCount: stringArrayField(controllerSplit, "mainControllerKeeps").length,
    guardsCount: stringArrayField(source, "guards").length,
    boundaryRuntimeClosed: boundaryRuntimeClosed(objectField(source, "boundary")),
  };
}

function createJavaV208(source: Record<string, unknown>): JavaV208EndpointCatalogEvidence {
  const registry = objectField(source, "registry");
  return {
    version: stringField(source, "version"),
    status: stringField(source, "status"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    endpointCatalogEndpoint: stringField(source, "endpointCatalogEndpoint"),
    endpointCatalogFixtureEndpoint: stringField(source, "endpointCatalogFixtureEndpoint"),
    contractEndpointCount: numberField(source, "contractEndpointCount"),
    catalogedArtifactCount: stringArrayField(source, "catalogedArtifacts").length,
    registryPairCount: numberField(registry, "v1ContractRegistryPairs"),
    includedInOpsEvidenceProbes: booleanField(registry, "includedInOpsEvidenceProbes"),
    boundaryRuntimeClosed: boundaryRuntimeClosed(objectField(source, "boundary")),
  };
}

function createJavaV208Fixture(source: Record<string, unknown>): JavaV208EndpointCatalogFixtureEvidence {
  return {
    version: stringField(source, "version"),
    contractName: stringField(source, "contractName"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    endpointCount: objectArrayField(source, "endpoints").length,
    liveProbeEndpointCount: stringArrayField(source, "liveProbeEndpoints").length,
    fixtureProbeEndpointCount: stringArrayField(source, "fixtureProbeEndpoints").length,
    evidencePathCount: stringArrayField(source, "evidencePaths").length,
    probesAreGetOnly: booleanField(source, "probesAreGetOnly"),
    upstreamActionsAllowed: booleanField(source, "upstreamActionsAllowed"),
    nodeMayStartOrStopJavaOrMiniKv: booleanField(source, "nodeMayStartOrStopJavaOrMiniKv"),
    status: stringField(source, "status"),
  };
}

function createMiniKvV193(source: Record<string, unknown>): MiniKvV193HandoffAuditFreezeEvidence {
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
    archivedNodeVersionCount: stringArrayField(archiveCompatibility, "archivedNodeVersions").length,
    historicalFixtureCount: stringArrayField(fixtureParity, "historicalFixturePaths").length,
    previousConsumedReleaseVersion: stringField(historicalFallback, "previousConsumedReleaseVersion"),
    previousConsumptionNodeVersion: stringField(historicalFallback, "previousConsumptionNodeVersion"),
    nodeConsumer: stringField(diagnostics, "nodeConsumer"),
    evidenceDigest: stringField(source, "evidenceDigest"),
    writeCommandsAllowed: booleanField(boundaries, "writeCommandsAllowed"),
    activeRouterInstalled: booleanField(boundaries, "activeRouterInstalled"),
    fieldCount: numberField(boundaryCatalog, "fieldCount"),
    groupCount: numberField(boundaryCatalog, "groupCount"),
  };
}

function createChecks(input: {
  files: JavaMiniKvRouteCatalogCleanupLatestEvidence["files"];
  javaV207ControllerSplit: JavaV207ControllerSplitEvidence;
  javaV208EndpointCatalog: JavaV208EndpointCatalogEvidence;
  javaV208EndpointCatalogFixture: JavaV208EndpointCatalogFixtureEvidence;
  miniKvV193HandoffAuditFreeze: MiniKvV193HandoffAuditFreezeEvidence;
}): JavaMiniKvRouteCatalogCleanupLatestEvidence["checks"] {
  const javaV207 = input.javaV207ControllerSplit;
  const javaV208 = input.javaV208EndpointCatalog;
  const javaV208Fixture = input.javaV208EndpointCatalogFixture;
  const miniKv = input.miniKvV193HandoffAuditFreeze;

  return {
    javaV207FilePresent: input.files.javaV207ControllerSplit.exists,
    javaV207ControllerSplitReady:
      javaV207.version === "Java v207"
      && javaV207.status === "passed"
      && javaV207.readOnly === true
      && javaV207.executionAllowed === false,
    javaV207RouteSplitCountStable:
      javaV207.sourceController === "OpsShardReadinessController"
      && javaV207.newController === "OpsShardReadinessV1ContractController"
      && javaV207.v1RouteCount === 6
      && javaV207.mainControllerKeepsCount === 3
      && javaV207.guardsCount >= 4,
    javaV207RuntimeBoundaryClosed: javaV207.boundaryRuntimeClosed,
    javaV208FilePresent: input.files.javaV208EndpointCatalog.exists,
    javaV208EndpointCatalogReady:
      javaV208.version === "Java v208"
      && javaV208.status === "passed"
      && javaV208.readOnly === true
      && javaV208.executionAllowed === false,
    javaV208EndpointCatalogCountsStable:
      javaV208.contractEndpointCount === 6
      && javaV208.catalogedArtifactCount === 6
      && javaV208.registryPairCount === 7
      && javaV208.includedInOpsEvidenceProbes === true,
    javaV208RuntimeBoundaryClosed: javaV208.boundaryRuntimeClosed,
    javaV208FixtureFilePresent: input.files.javaV208EndpointCatalogFixture.exists,
    javaV208FixtureReady:
      javaV208Fixture.version === "Java v208"
      && javaV208Fixture.contractName === "shard-readiness.v1"
      && javaV208Fixture.status === "passed"
      && javaV208Fixture.endpointCount === 6,
    javaV208FixtureGetOnly:
      javaV208Fixture.liveProbeEndpointCount === 6
      && javaV208Fixture.fixtureProbeEndpointCount === 6
      && javaV208Fixture.evidencePathCount === 6
      && javaV208Fixture.probesAreGetOnly === true
      && javaV208Fixture.upstreamActionsAllowed === false
      && javaV208Fixture.nodeMayStartOrStopJavaOrMiniKv === false,
    miniKvV193FilePresent: input.files.miniKvV193HandoffAuditFreeze.exists,
    miniKvV193AuditFreezeReady:
      miniKv.releaseVersion === "v193"
      && miniKv.status === "node-route-catalog-cleanup-closeout-handoff-audit-freeze-read-only"
      && miniKv.readOnly === true
      && miniKv.executionAllowed === false
      && miniKv.shardEnabled === false,
    miniKvV193PreservesNodeV472Window:
      miniKv.archivedNodeVersionCount >= 89
      && miniKv.historicalFixtureCount >= 49
      && (miniKv.nodeConsumer?.includes("Node v472+") ?? false),
    miniKvV193UsesV192Baseline:
      miniKv.previousConsumedReleaseVersion === "v192"
      && (miniKv.previousConsumptionNodeVersion?.includes("Node v472") ?? false)
      && miniKv.evidenceDigest === "fnv1a64:0aad0fd5d2732af5",
    noRuntimeAuthorityOpened:
      javaV207.executionAllowed === false
      && javaV208.executionAllowed === false
      && javaV208Fixture.executionAllowed === false
      && miniKv.executionAllowed === false
      && miniKv.writeCommandsAllowed === false
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
