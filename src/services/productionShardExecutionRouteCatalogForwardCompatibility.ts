import type { AppConfig } from "../config.js";
import {
  EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY,
} from "../routes/auditJsonMarkdownRouteCatalogSummary.js";
import {
  closedBoundaryChecks,
  createProductionShardExecutionProfile,
  productionApprovalControls,
  profileSource,
  routeEndpoints,
  satisfiedControl,
} from "./productionShardExecutionReadinessBuilder.js";
import { loadProductionShardExecutionCloseout } from "./productionShardExecutionCloseout.js";
import { renderProductionShardExecutionReadinessMarkdown } from "./productionShardExecutionReadinessRenderer.js";
import type { ProductionShardExecutionReadinessProfile } from "./productionShardExecutionReadinessTypes.js";

const ROUTE =
  "/api/v1/audit/production-shard-execution-route-catalog-forward-compatibility";

const PRE_BATCH_CATALOG_FLOOR = {
  groupCount: 51,
  routeCount: 236,
  javaMiniKvDomainRouteCount: 70,
} as const;

const LEGACY_ROUTE_CATALOG_FLOOR = {
  groupCount: 50,
  routeCount: 223,
  javaMiniKvDomainRouteCount: 59,
} as const;

export function loadProductionShardExecutionRouteCatalogForwardCompatibility(
  input: { config: AppConfig },
): ProductionShardExecutionReadinessProfile {
  const source = loadProductionShardExecutionCloseout(input);
  const sources = [
    profileSource("node-v2083-production-shard-execution-closeout", source, "Production shard execution closeout"),
  ];
  const controls = [
    satisfiedControl({
      id: "route-catalog-uses-forward-compatible-floors",
      title: "Route catalog growth is checked with lower bounds",
      owner: "node",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: `routeCount>=${PRE_BATCH_CATALOG_FLOOR.routeCount}; groupCount>=${PRE_BATCH_CATALOG_FLOOR.groupCount}`,
      nextAction: "Keep archived closeouts historical, but compare the live catalog with floors when new routes are added.",
    }),
    satisfiedControl({
      id: "artifact-folders-remain-per-version",
      title: "Archive artifacts remain separated by Node version",
      owner: "node",
      blocksNextStage: false,
      blocksProductionExecution: false,
      evidence: "e/<version>/evidence and e/<version>/解释 are the only default archive folders for this batch.",
      nextAction: "Create a per-version 图片 folder only when a browser screenshot is actually produced.",
    }),
    ...productionApprovalControls(),
  ];
  const currentCatalog = EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY;
  const currentJavaMiniKvRouteCount = currentCatalog.domainRouteCounts["java-mini-kv"];
  const checks = {
    sourceV2083Ready: source.readyForNextStage,
    sourceV2083DigestValid: /^[a-f0-9]{64}$/.test(source.stage.readinessDigest),
    liveCatalogKeepsCurrentGroupFloor: currentCatalog.groupCount >= PRE_BATCH_CATALOG_FLOOR.groupCount,
    liveCatalogKeepsCurrentRouteFloor: currentCatalog.routeCount >= PRE_BATCH_CATALOG_FLOOR.routeCount,
    liveCatalogKeepsJavaMiniKvRouteFloor:
      currentJavaMiniKvRouteCount >= PRE_BATCH_CATALOG_FLOOR.javaMiniKvDomainRouteCount,
    legacyCloseoutFloorStillSatisfied:
      currentCatalog.groupCount >= LEGACY_ROUTE_CATALOG_FLOOR.groupCount
      && currentCatalog.routeCount >= LEGACY_ROUTE_CATALOG_FLOOR.routeCount
      && currentJavaMiniKvRouteCount >= LEGACY_ROUTE_CATALOG_FLOOR.javaMiniKvDomainRouteCount,
    routeCatalogGrowthDoesNotInvalidateHistoricalArchives: true,
    archiveFolderPolicySeparatedByVersion: true,
    javaMiniKvCanContinueParallel: source.javaMiniKvRecommendedParallel,
    noFreshSiblingEvidenceRequiredForCatalogCompatibility: true,
    ...closedBoundaryChecks(),
  };

  return createProductionShardExecutionProfile({
    title: "Production shard execution route catalog forward compatibility",
    profileVersion: "production-shard-execution-route-catalog-forward-compatibility.v1",
    stageId: "route-catalog-forward-compatibility",
    activeNodeVersion: "Node v2084",
    sourceNodeVersion: "Node v2083",
    readyState: "route-catalog-forward-compatibility-ready",
    readyDecision: "accept-route-catalog-forward-compatibility",
    sources,
    controls,
    stagePayload: {
      routeCatalogCompatibility: {
        liveCatalog: currentCatalog,
        preBatchFloor: PRE_BATCH_CATALOG_FLOOR,
        legacyCloseoutFloor: LEGACY_ROUTE_CATALOG_FLOOR,
        comparisonMode: "lower-bound-forward-compatible",
      },
      artifactLayoutPolicy: {
        evidenceDirectory: "e/<node-version>/evidence",
        explanationDirectory: "e/<node-version>/解释",
        screenshotDirectory: "e/<node-version>/图片 only when screenshot evidence exists",
      },
      growthStopCondition:
        "Do not add another route-catalog repair stage unless a new route group changes domain ownership or catalog integrity.",
    },
    checks,
    evidenceEndpoints: routeEndpoints(
      ROUTE,
      "docs/plans3/v2084-production-shard-execution-route-catalog-forward-compatibility-roadmap.md",
      "docs/plans3/v2085-production-shard-execution-signed-approval-intake-contract-roadmap.md",
    ),
    nextActions: [
      "Use v2084 as the compatibility baseline for the external-evidence precondition batch.",
      "Write v2085 as a schema-only signed approval intake contract; do not claim a real approval artifact exists.",
      "Keep screenshots and explanations separated by version when archiving this batch.",
    ],
    warnings: [
      {
        code: "CATALOG_COMPATIBILITY_IS_NOT_EXECUTION_APPROVAL",
        severity: "warning",
        source: "node-v2084",
        message: "v2084 makes route growth compatible with historical archives but still grants no runtime authority.",
      },
    ],
    recommendations: [
      {
        code: "DEFINE_SIGNED_APPROVAL_SCHEMA_NEXT",
        severity: "recommendation",
        source: "node-v2084",
        message: "Move next to the signed approval intake schema so real approval can later be validated without code churn.",
      },
    ],
  });
}

export {
  renderProductionShardExecutionReadinessMarkdown
    as renderProductionShardExecutionRouteCatalogForwardCompatibilityMarkdown,
};
