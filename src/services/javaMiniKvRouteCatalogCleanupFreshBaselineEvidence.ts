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

const JAVA_RECEIPT_PATHS = [
  {
    id: "java-v232-readiness-handoff-controller-mapping",
    path:
      "D:/javaproj/advanced-order-platform/e/232/evidence/java-shard-readiness-v1-contract-consumer-readiness-handoff-controller-mapping-v232.json",
    version: "Java v232",
    scope: "v1 contract consumer readiness handoff controller mapping",
  },
  {
    id: "java-v233-readiness-handoff-fixture-parity",
    path:
      "D:/javaproj/advanced-order-platform/e/233/evidence/java-shard-readiness-v1-contract-consumer-readiness-handoff-fixture-parity-v233.json",
    version: "Java v233",
    scope: "v1 contract consumer readiness handoff fixture parity",
  },
  {
    id: "java-v234-readiness-handoff-boundary-matrix",
    path:
      "D:/javaproj/advanced-order-platform/e/234/evidence/java-shard-readiness-v1-contract-consumer-readiness-handoff-boundary-matrix-v234.json",
    version: "Java v234",
    scope: "v1 contract consumer readiness handoff boundary matrix",
  },
  {
    id: "java-v235-readiness-handoff-endpoint-adjacency",
    path:
      "D:/javaproj/advanced-order-platform/e/235/evidence/java-shard-readiness-v1-contract-consumer-readiness-handoff-endpoint-adjacency-v235.json",
    version: "Java v235",
    scope: "v1 contract consumer readiness handoff endpoint adjacency",
  },
  {
    id: "java-v236-readiness-handoff-receipt-uniqueness",
    path:
      "D:/javaproj/advanced-order-platform/e/236/evidence/java-shard-readiness-v1-contract-consumer-readiness-handoff-receipt-uniqueness-v236.json",
    version: "Java v236",
    scope: "v1 contract consumer readiness handoff receipt uniqueness",
  },
  {
    id: "java-v237-readiness-handoff-node-consumer-boundary",
    path:
      "D:/javaproj/advanced-order-platform/e/237/evidence/java-shard-readiness-v1-contract-consumer-readiness-handoff-node-consumer-boundary-v237.json",
    version: "Java v237",
    scope: "v1 contract consumer readiness handoff node consumer boundary",
  },
  {
    id: "java-v238-readiness-handoff-artifact-presence",
    path:
      "D:/javaproj/advanced-order-platform/e/238/evidence/java-shard-readiness-v1-contract-consumer-readiness-handoff-artifact-presence-v238.json",
    version: "Java v238",
    scope: "v1 contract consumer readiness handoff artifact presence",
  },
  {
    id: "java-v239-readiness-handoff-completion",
    path:
      "D:/javaproj/advanced-order-platform/e/239/evidence/java-shard-readiness-v1-contract-consumer-readiness-handoff-completion-v239.json",
    version: "Java v239",
    scope: "v1 contract consumer readiness handoff completion",
  },
] as const;

const MINI_KV_RELEASE_PATHS = [
  ...[213, 214, 215, 216, 217, 218, 219].map((version) => ({
    id: `mini-kv-v${version}-post-closeout-continuity`,
    path: `D:/C/mini-kv/fixtures/release/shard-readiness-v${version}.json`,
    version: `v${version}`,
    stageSequence: version - 200,
  })),
  {
    id: "mini-kv-v220-post-closeout-continuity-node-frozen",
    path:
      "D:/nodeproj/orderops-node/fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v220-node-v507.json",
    version: "v220",
    stageSequence: 20,
  },
] as const;

export interface JavaFreshBaselineReceipt {
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

export interface MiniKvFreshBaselineRelease {
  releaseVersion: string | null;
  status: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  evidenceDigest: string | null;
  previousConsumedReleaseVersion: string | null;
  sourceFrozenReleaseVersion: string | null;
  continuityStage: string | null;
  stageSequence: number | null;
  trackedPostCloseoutReleaseCount: number | null;
  nodeBatchCloseoutVersion: string | null;
  readyForNextNodeBatch: boolean | null;
  historicalFixtureCount: number;
  boundaryGroupCount: number | null;
  writeCommandsAllowed: boolean | null;
  adminCommandsAllowed: boolean | null;
  activeRouterInstalled: boolean | null;
  nodeConsumesFreshMiniKvEvidence: boolean | null;
}

export interface JavaMiniKvRouteCatalogCleanupFreshBaselineEvidence {
  files: Record<string, HistoricalEvidenceFile>;
  javaReceipts: JavaFreshBaselineReceipt[];
  miniKvReleases: MiniKvFreshBaselineRelease[];
  checks: {
    allFilesPresent: boolean;
    javaReceiptsReady: boolean;
    javaReceiptRangeComplete: boolean;
    javaCompletionReady: boolean;
    miniKvReleasesReady: boolean;
    miniKvReleaseRangeComplete: boolean;
    miniKvReleaseSequenceContinuous: boolean;
    miniKvV220FrozenByNode: boolean;
    noRuntimeAuthorityOpened: boolean;
  };
  summary: {
    fileCount: number;
    presentFileCount: number;
    checkCount: number;
    passedCheckCount: number;
    javaReceiptCount: number;
    javaGuardCount: number;
    javaValidationCount: number;
    javaLatestCleanVersion: "Java v239";
    miniKvVersionedReleaseCount: number;
    miniKvLatestCleanVersion: "v220";
    miniKvLatestHistoricalFixtureCount: number;
    miniKvBoundaryGroupCount: number | null;
  };
}

export function loadJavaMiniKvRouteCatalogCleanupFreshBaselineEvidence():
  JavaMiniKvRouteCatalogCleanupFreshBaselineEvidence {
  const files: Record<string, HistoricalEvidenceFile> = Object.fromEntries([
    ...JAVA_RECEIPT_PATHS.map((item) => [item.id, evidenceFile(item.id, item.path)]),
    ...MINI_KV_RELEASE_PATHS.map((item) => [item.id, evidenceFile(item.id, item.path)]),
  ]);
  const javaReceipts = JAVA_RECEIPT_PATHS.map((item) =>
    createJavaReceipt(readJsonObject(item.path)),
  );
  const miniKvReleases = MINI_KV_RELEASE_PATHS.map((item) =>
    createMiniKvRelease(readJsonObject(item.path)),
  );
  const checks = createChecks({ files, javaReceipts, miniKvReleases });
  const latestMiniKv = miniKvReleases.at(-1);

  return {
    files,
    javaReceipts,
    miniKvReleases,
    checks,
    summary: {
      fileCount: Object.keys(files).length,
      presentFileCount: Object.values(files).filter((file) => file.exists).length,
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      javaReceiptCount: javaReceipts.length,
      javaGuardCount: javaReceipts.reduce((sum, receipt) => sum + receipt.guardCount, 0),
      javaValidationCount: javaReceipts.reduce((sum, receipt) => sum + receipt.validationCount, 0),
      javaLatestCleanVersion: "Java v239",
      miniKvVersionedReleaseCount: miniKvReleases.length,
      miniKvLatestCleanVersion: "v220",
      miniKvLatestHistoricalFixtureCount: latestMiniKv?.historicalFixtureCount ?? 0,
      miniKvBoundaryGroupCount: latestMiniKv?.boundaryGroupCount ?? null,
    },
  };
}

function createJavaReceipt(source: Record<string, unknown>): JavaFreshBaselineReceipt {
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

function createMiniKvRelease(source: Record<string, unknown>): MiniKvFreshBaselineRelease {
  const continuity = objectField(source, "nodeRouteCatalogCleanupPostCloseoutContinuity");
  const historicalFallback = objectField(source, "historicalFallback");
  const fixtureParity = objectField(source, "fixtureParity");
  const boundaryCatalog = objectField(source, "boundaryCatalogIndex");
  const boundaries = objectField(source, "boundaries");

  return {
    releaseVersion: stringField(source, "releaseVersion"),
    status: stringField(source, "status"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    evidenceDigest: stringField(source, "evidenceDigest"),
    previousConsumedReleaseVersion: stringField(historicalFallback, "previousConsumedReleaseVersion"),
    sourceFrozenReleaseVersion: stringField(continuity, "sourceFrozenReleaseVersion"),
    continuityStage: stringField(continuity, "continuityStage"),
    stageSequence: numberField(continuity, "stageSequence"),
    trackedPostCloseoutReleaseCount: numberField(continuity, "trackedPostCloseoutReleaseCount"),
    nodeBatchCloseoutVersion: stringField(continuity, "nodeBatchCloseoutVersion"),
    readyForNextNodeBatch: booleanField(continuity, "readyForNextNodeBatch"),
    historicalFixtureCount: stringArrayField(fixtureParity, "historicalFixturePaths").length,
    boundaryGroupCount: numberField(boundaryCatalog, "groupCount"),
    writeCommandsAllowed: booleanField(boundaries, "writeCommandsAllowed"),
    adminCommandsAllowed: booleanField(boundaries, "adminCommandsAllowed"),
    activeRouterInstalled: booleanField(boundaries, "activeRouterInstalled"),
    nodeConsumesFreshMiniKvEvidence: booleanField(continuity, "nodeConsumesFreshMiniKvEvidence"),
  };
}

function createChecks(input: {
  files: JavaMiniKvRouteCatalogCleanupFreshBaselineEvidence["files"];
  javaReceipts: JavaFreshBaselineReceipt[];
  miniKvReleases: MiniKvFreshBaselineRelease[];
}): JavaMiniKvRouteCatalogCleanupFreshBaselineEvidence["checks"] {
  return {
    allFilesPresent: Object.values(input.files).every((file) => file.exists),
    javaReceiptsReady: input.javaReceipts.every((receipt, index) =>
      javaReceiptReady(receipt, JAVA_RECEIPT_PATHS[index].version, JAVA_RECEIPT_PATHS[index].scope),
    ),
    javaReceiptRangeComplete:
      input.javaReceipts.map((receipt) => receipt.version).join(",") ===
      "Java v232,Java v233,Java v234,Java v235,Java v236,Java v237,Java v238,Java v239",
    javaCompletionReady:
      input.javaReceipts.at(-1)?.version === "Java v239"
      && input.javaReceipts.at(-1)?.scope === "v1 contract consumer readiness handoff completion",
    miniKvReleasesReady: input.miniKvReleases.every((release, index) =>
      miniKvReleaseReady(release, MINI_KV_RELEASE_PATHS[index].version, MINI_KV_RELEASE_PATHS[index].stageSequence),
    ),
    miniKvReleaseRangeComplete:
      input.miniKvReleases.map((release) => release.releaseVersion).join(",") ===
      "v213,v214,v215,v216,v217,v218,v219,v220",
    miniKvReleaseSequenceContinuous:
      input.miniKvReleases.every((release, index) =>
        release.stageSequence === index + 13
        && release.trackedPostCloseoutReleaseCount === index + 13,
      ),
    miniKvV220FrozenByNode:
      input.files["mini-kv-v220-post-closeout-continuity-node-frozen"]?.resolvedPath
        .replace(/\\/g, "/")
        .endsWith("fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v220-node-v507.json")
      && input.miniKvReleases.at(-1)?.releaseVersion === "v220"
      && input.miniKvReleases.at(-1)?.sourceFrozenReleaseVersion === "v219",
    noRuntimeAuthorityOpened:
      input.javaReceipts.every((receipt) =>
        receipt.executionAllowed === false
        && receipt.boundaryRuntimeClosed,
      )
      && input.miniKvReleases.every((release) =>
        release.executionAllowed === false
        && release.writeCommandsAllowed === false
        && release.adminCommandsAllowed === false
        && release.activeRouterInstalled === false
        && release.nodeConsumesFreshMiniKvEvidence === false,
      ),
  };
}

function javaReceiptReady(
  receipt: JavaFreshBaselineReceipt,
  version: string,
  scope: string,
): boolean {
  return receipt.version === version
    && receipt.status === "passed"
    && receipt.scope === scope
    && receipt.readOnly === true
    && receipt.executionAllowed === false
    && receipt.guardCount === 5
    && receipt.validationCount === 2
    && receipt.boundaryRuntimeClosed;
}

function miniKvReleaseReady(
  release: MiniKvFreshBaselineRelease,
  version: string,
  stageSequence: number,
): boolean {
  return release.releaseVersion === version
    && release.status === "node-route-catalog-cleanup-post-closeout-continuity-read-only"
    && release.readOnly === true
    && release.executionAllowed === false
    && release.stageSequence === stageSequence
    && release.trackedPostCloseoutReleaseCount === stageSequence
    && release.readyForNextNodeBatch === true
    && release.boundaryGroupCount === 40;
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
