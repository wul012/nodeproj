import {
  EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY,
} from "../routes/auditJsonMarkdownRouteCatalogSummary.js";
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

const JAVA_V274_RECEIPT_PATH =
  "D:/javaproj/advanced-order-platform/e/274/evidence/java-shard-readiness-v1-contract-consumer-readiness-handoff-fifteen-version-completion-v274.json";
const JAVA_V274_EXPLANATION_PATH =
  "D:/javaproj/advanced-order-platform/e/274/解释/说明.md";
const MINI_KV_V247_FROZEN_PATH =
  "D:/nodeproj/orderops-node/fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v247-node-v538.json";
const MINI_KV_V247_EXPLANATION_PATH =
  "D:/C/mini-kv/e/247/解释/说明.md";

const FILES = [
  {
    id: "java-v274-fifteen-version-completion-receipt",
    path: JAVA_V274_RECEIPT_PATH,
  },
  {
    id: "java-v274-fifteen-version-completion-explanation",
    path: JAVA_V274_EXPLANATION_PATH,
  },
  {
    id: "mini-kv-v247-node-v538-frozen-shard-readiness",
    path: MINI_KV_V247_FROZEN_PATH,
  },
  {
    id: "mini-kv-v247-command-evidence-explanation",
    path: MINI_KV_V247_EXPLANATION_PATH,
  },
] as const;

const SNIPPETS = [
  {
    id: "java-v274-sequence-complete",
    path: JAVA_V274_EXPLANATION_PATH,
    text: "v274 completes the v260-v274 sequence",
  },
  {
    id: "java-v274-frozen-v225-separated",
    path: JAVA_V274_EXPLANATION_PATH,
    text: "frozen v225 readiness handoff is still separate",
  },
  {
    id: "mini-kv-v247-full-ctest",
    path: MINI_KV_V247_EXPLANATION_PATH,
    text: "03-full-ctest.png records the full CTest run",
  },
  {
    id: "mini-kv-v247-tcp-cleanup",
    path: MINI_KV_V247_EXPLANATION_PATH,
    text: "TCP server process on port 6524 stopped",
  },
] as const;

export interface JavaMiniKvLatestSiblingJavaReceipt {
  version: string | null;
  status: string | null;
  scope: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  receiptId: string | null;
  summary: string | null;
  guardCount: number;
  validationCount: number;
  boundaryRuntimeClosed: boolean;
}

export interface JavaMiniKvLatestSiblingMiniKvRelease {
  releaseVersion: string | null;
  status: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  evidenceDigest: string | null;
  sourceFrozenReleaseVersion: string | null;
  sourceFrozenFixturePath: string | null;
  continuityStage: string | null;
  stageSequence: number | null;
  trackedPostCloseoutReleaseCount: number | null;
  nodeBatchCloseoutVersion: string | null;
  nodePlanStillLatestForMiniKv: boolean | null;
  readyForNextNodeBatch: boolean | null;
  nodeConsumesFreshMiniKvEvidence: boolean | null;
  previousConsumedReleaseVersion: string | null;
  historicalFixtureCount: number;
  boundaryGroupCount: number | null;
  nodeConsumer: string | null;
  writeCommandsAllowed: boolean | null;
  adminCommandsAllowed: boolean | null;
  activeRouterInstalled: boolean | null;
  archivedNodeEvidenceMutated: boolean | null;
  runtimeBoundaryClosed: boolean;
}

export interface JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceIntake {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-intake.v1";
  intakeState: "ready" | "blocked";
  activeNodeVersion: "Node v538";
  sourceNodeVersion: "Node v537";
  readyForRouteCatalogCleanupLatestSiblingEvidenceIntake: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  evidenceIntakeOnly: true;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  executionAllowed: false;
  crossProjectMode: {
    java: "recommended-parallel";
    miniKv: "recommended-parallel";
    nodeWaitsForFreshSiblingEvidence: false;
    consumedFreshSiblingEvidence: true;
  };
  files: Record<string, HistoricalEvidenceFile>;
  snippets: HistoricalSnippetMatch[];
  javaReceipt: JavaMiniKvLatestSiblingJavaReceipt;
  miniKvRelease: JavaMiniKvLatestSiblingMiniKvRelease;
  routeCatalogSnapshot: {
    groupCount: 50;
    routeCount: 223;
    javaMiniKvDomainRouteCount: 59;
    cleanupHandoffRouteGroupRouteCount: 25;
  };
  checks: {
    allFilesPresent: boolean;
    evidenceResolvedFromHistoricalFixtures: boolean;
    javaLatestReceiptReady: boolean;
    javaFifteenVersionRunComplete: boolean;
    javaRuntimeBoundaryClosed: boolean;
    miniKvLatestReleaseReady: boolean;
    miniKvFinalVerificationRouteReady: boolean;
    miniKvRuntimeBoundaryClosed: boolean;
    commandEvidenceExplainsVerification: boolean;
    nodeRouteCatalogStillStable: boolean;
    crossProjectParallelReady: boolean;
    noRuntimeAuthorityOpened: boolean;
    readyForRouteCatalogCleanupLatestSiblingEvidenceIntake: boolean;
  };
  summary: {
    fileCount: number;
    presentFileCount: number;
    snippetCount: number;
    matchedSnippetCount: number;
    checkCount: number;
    passedCheckCount: number;
    javaLatestCleanVersion: "Java v274";
    javaGuardCount: number;
    javaValidationCount: number;
    miniKvLatestCleanVersion: "v247";
    miniKvEvidenceDigest: string | null;
    miniKvHistoricalFixtureCount: number;
    routeCount: 223;
    javaMiniKvDomainRouteCount: 59;
    cleanupHandoffRouteGroupRouteCount: 25;
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceIntake():
  JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceIntake {
  const files = Object.fromEntries(
    FILES.map((file) => [file.id, evidenceFile(file.id, file.path)]),
  ) as Record<string, HistoricalEvidenceFile>;
  const snippets = SNIPPETS.map((item) => snippet(item.id, item.path, item.text));
  const javaReceipt = createJavaReceipt(readJsonObject(JAVA_V274_RECEIPT_PATH));
  const miniKvRelease = createMiniKvRelease(readJsonObject(MINI_KV_V247_FROZEN_PATH));
  const routeCatalogSnapshot = {
    groupCount: 50,
    routeCount: 223,
    javaMiniKvDomainRouteCount: 59,
    cleanupHandoffRouteGroupRouteCount: 25,
  } as const;
  const checks = createChecks({
    files,
    snippets,
    javaReceipt,
    miniKvRelease,
    routeCatalogSnapshot,
  });
  checks.readyForRouteCatalogCleanupLatestSiblingEvidenceIntake = Object.entries(checks)
    .filter(([key]) => key !== "readyForRouteCatalogCleanupLatestSiblingEvidenceIntake")
    .every(([, value]) => value);
  const ready = checks.readyForRouteCatalogCleanupLatestSiblingEvidenceIntake;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup latest sibling evidence intake",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-intake.v1",
    intakeState: ready ? "ready" : "blocked",
    activeNodeVersion: "Node v538",
    sourceNodeVersion: "Node v537",
    readyForRouteCatalogCleanupLatestSiblingEvidenceIntake: ready,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    evidenceIntakeOnly: true,
    startsJavaService: false,
    startsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    executionAllowed: false,
    crossProjectMode: {
      java: "recommended-parallel",
      miniKv: "recommended-parallel",
      nodeWaitsForFreshSiblingEvidence: false,
      consumedFreshSiblingEvidence: true,
    },
    files,
    snippets,
    javaReceipt,
    miniKvRelease,
    routeCatalogSnapshot,
    checks,
    summary: {
      fileCount: Object.keys(files).length,
      presentFileCount: Object.values(files).filter((file) => file.exists).length,
      snippetCount: snippets.length,
      matchedSnippetCount: snippets.filter((item) => item.matched).length,
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      javaLatestCleanVersion: "Java v274",
      javaGuardCount: javaReceipt.guardCount,
      javaValidationCount: javaReceipt.validationCount,
      miniKvLatestCleanVersion: "v247",
      miniKvEvidenceDigest: miniKvRelease.evidenceDigest,
      miniKvHistoricalFixtureCount: miniKvRelease.historicalFixtureCount,
      routeCount: 223,
      javaMiniKvDomainRouteCount: 59,
      cleanupHandoffRouteGroupRouteCount: 25,
    },
    nextActions: ready
      ? [
        "Keep Java and mini-kv parallel; Node v538 has frozen their latest clean evidence.",
        "Use v539 for a report route only if a public JSON/Markdown endpoint is needed.",
        "Do not open live integration until a separate service startup, port, owner, and cleanup plan exists.",
      ]
      : [
        "Repair missing latest sibling evidence or historical fixtures before report exposure.",
        "Do not make Java or mini-kv wait on Node unless a later version needs a fresh contract change.",
      ],
  };
}

function createJavaReceipt(source: Record<string, unknown>): JavaMiniKvLatestSiblingJavaReceipt {
  return {
    version: stringField(source, "version"),
    status: stringField(source, "status"),
    scope: stringField(source, "scope"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    receiptId: stringField(source, "receiptId"),
    summary: stringField(source, "summary"),
    guardCount: stringArrayField(source, "guards").length,
    validationCount: stringArrayField(source, "validation").length,
    boundaryRuntimeClosed: javaBoundaryRuntimeClosed(objectField(source, "boundary")),
  };
}

function createMiniKvRelease(source: Record<string, unknown>): JavaMiniKvLatestSiblingMiniKvRelease {
  const continuity = objectField(source, "nodeRouteCatalogCleanupPostCloseoutContinuity");
  const historicalFallback = objectField(source, "historicalFallback");
  const fixtureParity = objectField(source, "fixtureParity");
  const boundaryCatalog = objectField(source, "boundaryCatalogIndex");
  const boundaries = objectField(source, "boundaries");
  const diagnostics = objectField(source, "diagnostics");

  return {
    releaseVersion: stringField(source, "releaseVersion"),
    status: stringField(source, "status"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    evidenceDigest: stringField(source, "evidenceDigest"),
    sourceFrozenReleaseVersion: stringField(continuity, "sourceFrozenReleaseVersion"),
    sourceFrozenFixturePath: stringField(continuity, "sourceFrozenFixturePath"),
    continuityStage: stringField(continuity, "continuityStage"),
    stageSequence: numberField(continuity, "stageSequence"),
    trackedPostCloseoutReleaseCount: numberField(continuity, "trackedPostCloseoutReleaseCount"),
    nodeBatchCloseoutVersion: stringField(continuity, "nodeBatchCloseoutVersion"),
    nodePlanStillLatestForMiniKv: booleanField(continuity, "nodePlanStillLatestForMiniKv"),
    readyForNextNodeBatch: booleanField(continuity, "readyForNextNodeBatch"),
    nodeConsumesFreshMiniKvEvidence: booleanField(continuity, "nodeConsumesFreshMiniKvEvidence"),
    previousConsumedReleaseVersion: stringField(historicalFallback, "previousConsumedReleaseVersion"),
    historicalFixtureCount: stringArrayField(fixtureParity, "historicalFixturePaths").length,
    boundaryGroupCount: numberField(boundaryCatalog, "groupCount"),
    nodeConsumer: stringField(diagnostics, "nodeConsumer"),
    writeCommandsAllowed: booleanField(boundaries, "writeCommandsAllowed"),
    adminCommandsAllowed: booleanField(boundaries, "adminCommandsAllowed"),
    activeRouterInstalled: booleanField(boundaries, "activeRouterInstalled"),
    archivedNodeEvidenceMutated: booleanField(boundaries, "archivedNodeEvidenceMutated"),
    runtimeBoundaryClosed: miniKvRuntimeBoundaryClosed({ continuity, boundaries }),
  };
}

function createChecks(input: {
  files: Record<string, HistoricalEvidenceFile>;
  snippets: HistoricalSnippetMatch[];
  javaReceipt: JavaMiniKvLatestSiblingJavaReceipt;
  miniKvRelease: JavaMiniKvLatestSiblingMiniKvRelease;
  routeCatalogSnapshot: JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceIntake["routeCatalogSnapshot"];
}): JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceIntake["checks"] {
  return {
    allFilesPresent: Object.values(input.files).every((file) => file.exists),
    evidenceResolvedFromHistoricalFixtures: Object.values(input.files).every((file) =>
      file.resolvedPath.replace(/\\/g, "/").includes("fixtures/historical/sibling-workspaces"),
    ),
    javaLatestReceiptReady:
      input.javaReceipt.version === "Java v274"
      && input.javaReceipt.status === "passed"
      && input.javaReceipt.scope === "v1 contract consumer readiness handoff fifteen-version completion"
      && input.javaReceipt.readOnly === true
      && input.javaReceipt.executionAllowed === false
      && input.javaReceipt.guardCount === 4
      && input.javaReceipt.validationCount === 3,
    javaFifteenVersionRunComplete:
      input.javaReceipt.summary?.includes("v260-v274 fifteen-version run") === true
      && snippetMatched(input.snippets, "java-v274-sequence-complete")
      && snippetMatched(input.snippets, "java-v274-frozen-v225-separated"),
    javaRuntimeBoundaryClosed: input.javaReceipt.boundaryRuntimeClosed,
    miniKvLatestReleaseReady:
      input.miniKvRelease.releaseVersion === "v247"
      && input.miniKvRelease.status === "node-route-catalog-cleanup-post-closeout-continuity-read-only"
      && input.miniKvRelease.readOnly === true
      && input.miniKvRelease.executionAllowed === false
      && input.miniKvRelease.evidenceDigest === "fnv1a64:9fb71e13c517fff8"
      && input.miniKvRelease.sourceFrozenReleaseVersion === "v246"
      && input.miniKvRelease.sourceFrozenFixturePath === "fixtures/release/shard-readiness-v246.json",
    miniKvFinalVerificationRouteReady:
      input.miniKvRelease.continuityStage ===
        "post-closeout-continuity-node-v522-final-verification-route-readiness"
      && input.miniKvRelease.stageSequence === 47
      && input.miniKvRelease.trackedPostCloseoutReleaseCount === 47
      && input.miniKvRelease.nodeBatchCloseoutVersion === "Node v522"
      && input.miniKvRelease.nodePlanStillLatestForMiniKv === true
      && input.miniKvRelease.readyForNextNodeBatch === true
      && input.miniKvRelease.boundaryGroupCount === 40,
    miniKvRuntimeBoundaryClosed: input.miniKvRelease.runtimeBoundaryClosed,
    commandEvidenceExplainsVerification:
      snippetMatched(input.snippets, "mini-kv-v247-full-ctest")
      && snippetMatched(input.snippets, "mini-kv-v247-tcp-cleanup"),
    nodeRouteCatalogStillStable:
      EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.groupCount === input.routeCatalogSnapshot.groupCount
      && EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.routeCount === input.routeCatalogSnapshot.routeCount
      && EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.domainRouteCounts["java-mini-kv"] ===
        input.routeCatalogSnapshot.javaMiniKvDomainRouteCount,
    crossProjectParallelReady: true,
    noRuntimeAuthorityOpened:
      input.javaReceipt.executionAllowed === false
      && input.javaReceipt.boundaryRuntimeClosed
      && input.miniKvRelease.executionAllowed === false
      && input.miniKvRelease.runtimeBoundaryClosed,
    readyForRouteCatalogCleanupLatestSiblingEvidenceIntake: false,
  };
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

function miniKvRuntimeBoundaryClosed(input: {
  continuity: Record<string, unknown>;
  boundaries: Record<string, unknown>;
}): boolean {
  return booleanField(input.boundaries, "writeCommandsAllowed") === false
    && booleanField(input.boundaries, "adminCommandsAllowed") === false
    && booleanField(input.boundaries, "loadRestoreCompactAllowed") === false
    && booleanField(input.boundaries, "activeRouterInstalled") === false
    && booleanField(input.boundaries, "archivedNodeEvidenceMutated") === false
    && booleanField(input.continuity, "routerActivationAllowed") === false
    && booleanField(input.continuity, "writeRoutingAllowed") === false
    && booleanField(input.continuity, "runtimeProbeAllowed") === false
    && booleanField(input.continuity, "liveReadAllowed") === false
    && booleanField(input.continuity, "startsJavaService") === false
    && booleanField(input.continuity, "startsMiniKvService") === false
    && booleanField(input.continuity, "executionAllowed") === false;
}
