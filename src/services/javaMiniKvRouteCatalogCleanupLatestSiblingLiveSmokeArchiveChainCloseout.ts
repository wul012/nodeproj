import type { AppConfig } from "../config.js";
import { CLEANUP_HANDOFF_ROUTE_COUNT } from "../contracts/auditRouteManifest.js";
import {
  EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY,
} from "../routes/auditJsonMarkdownRouteCatalogSummary.js";
import { countPassedReportChecks, countReportChecks } from "./liveProbeReportUtils.js";
import {
  loadJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerification,
} from "./javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerification.js";

export {
  renderJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseoutMarkdown,
} from "./javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseoutRenderer.js";

export interface JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseoutProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-chain-closeout.v1";
  activeNodeVersion: "Node v554";
  sourceNodeVersion: "Node v553";
  closeoutState: "ready" | "blocked";
  readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  closeoutOnly: true;
  exposesNewRoute: false;
  startsJavaService: false;
  startsMiniKvService: false;
  executionAllowed: false;
  crossProjectMode: {
    java: "recommended-parallel";
    miniKv: "recommended-parallel";
    nodeWaitsForFreshSiblingEvidence: false;
    siblingEvidenceMode: "archived-fixture-only";
  };
  completedNodeVersions: readonly [
    "v545",
    "v546",
    "v547",
    "v548",
    "v549",
    "v550",
    "v551",
    "v552",
    "v553",
  ];
  necessityProof: {
    blockerResolved: string;
    laterConsumer: string;
    existingReportReuseDecision: string;
    growthStopCondition: string;
  };
  latestVerifier: {
    ready: boolean;
    activeNodeVersion: string;
    sourceNodeVersion: string;
    checkCount: number;
    passedCheckCount: number;
    sourceArchiveRouteCount: number;
    sourceArchiveJavaMiniKvRouteCount: number;
    sourceArchiveCleanupHandoffRouteCount: number;
    archivedRouteCatalogRouteCount: number;
    archivedRouteCatalogJavaMiniKvRouteCount: number;
    archivedRouteCatalogCleanupHandoffRouteCount: number;
  };
  currentRouteCatalog: {
    groupCount: number;
    routeCount: number;
    javaMiniKvDomainRouteCount: number;
    cleanupHandoffRouteGroupRouteCount: number;
  };
  checks: {
    requestedVersionSpanClosed: boolean;
    latestVerifierReady: boolean;
    latestVerifierChecksPassed: boolean;
    sourceArchiveBaselinePreserved: boolean;
    routeArchiveBaselinePreserved: boolean;
    currentRouteCatalogCoversArchive: boolean;
    chainGrowthStoppedUnlessPublicConsumerAppears: boolean;
    javaMiniKvParallelRecommended: boolean;
    noRuntimeAuthorityOpened: boolean;
    readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout: boolean;
  };
  summary: {
    completedNodeVersionCount: number;
    checkCount: number;
    passedCheckCount: number;
    routeCount: number;
    javaMiniKvDomainRouteCount: number;
    cleanupHandoffRouteGroupRouteCount: number;
  };
  nextActions: string[];
}

const COMPLETED_NODE_VERSIONS = [
  "v545",
  "v546",
  "v547",
  "v548",
  "v549",
  "v550",
  "v551",
  "v552",
  "v553",
] as const;

export function loadJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout(input: {
  config: AppConfig;
  projectRoot?: string;
}): JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseoutProfile {
  const latestVerifier =
    loadJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerification({
      config: input.config,
      projectRoot: input.projectRoot,
    });
  const latestVerifierSummary = {
    ready:
      latestVerifier.readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerification,
    activeNodeVersion: latestVerifier.activeNodeVersion,
    sourceNodeVersion: latestVerifier.sourceNodeVersion,
    checkCount: latestVerifier.summary.checkCount,
    passedCheckCount: latestVerifier.summary.passedCheckCount,
    sourceArchiveRouteCount: latestVerifier.sourceRouteArchive.sourceArchiveRouteCount,
    sourceArchiveJavaMiniKvRouteCount: latestVerifier.sourceRouteArchive.sourceArchiveJavaMiniKvRouteCount,
    sourceArchiveCleanupHandoffRouteCount: latestVerifier.sourceRouteArchive.sourceArchiveCleanupHandoffRouteCount,
    archivedRouteCatalogRouteCount: latestVerifier.sourceRouteArchive.archivedRouteCatalogRouteCount,
    archivedRouteCatalogJavaMiniKvRouteCount:
      latestVerifier.sourceRouteArchive.archivedRouteCatalogJavaMiniKvRouteCount,
    archivedRouteCatalogCleanupHandoffRouteCount:
      latestVerifier.sourceRouteArchive.archivedRouteCatalogCleanupHandoffRouteCount,
  };
  const currentRouteCatalog = {
    groupCount: EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.groupCount,
    routeCount: EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.routeCount,
    javaMiniKvDomainRouteCount:
      EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.domainRouteCounts["java-mini-kv"],
    cleanupHandoffRouteGroupRouteCount: CLEANUP_HANDOFF_ROUTE_COUNT,
  } as const;
  const checks = createChecks({ latestVerifier: latestVerifierSummary, currentRouteCatalog });
  checks.readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout = Object.entries(checks)
    .filter(([key]) => key !== "readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout")
    .every(([, value]) => value);
  const ready = checks.readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup latest sibling live smoke archive chain closeout",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-chain-closeout.v1",
    activeNodeVersion: "Node v554",
    sourceNodeVersion: "Node v553",
    closeoutState: ready ? "ready" : "blocked",
    readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout: ready,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    closeoutOnly: true,
    exposesNewRoute: false,
    startsJavaService: false,
    startsMiniKvService: false,
    executionAllowed: false,
    crossProjectMode: {
      java: "recommended-parallel",
      miniKv: "recommended-parallel",
      nodeWaitsForFreshSiblingEvidence: false,
      siblingEvidenceMode: "archived-fixture-only",
    },
    completedNodeVersions: COMPLETED_NODE_VERSIONS,
    necessityProof: {
      blockerResolved:
        "Closes the latest sibling live-smoke archive chain after v553 verified the v552 route archive.",
      laterConsumer:
        "A later public route may consume this closeout only if a human-facing audit endpoint is required.",
      existingReportReuseDecision:
        "Existing archive verifiers prove individual files; this closeout records the chain stop decision.",
      growthStopCondition:
        "Do not add another archive-verifier route unless a public consumer needs it; route growth only needs catalog coverage checks.",
    },
    latestVerifier: latestVerifierSummary,
    currentRouteCatalog,
    checks,
    summary: {
      completedNodeVersionCount: COMPLETED_NODE_VERSIONS.length,
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      routeCount: currentRouteCatalog.routeCount,
      javaMiniKvDomainRouteCount: currentRouteCatalog.javaMiniKvDomainRouteCount,
      cleanupHandoffRouteGroupRouteCount: currentRouteCatalog.cleanupHandoffRouteGroupRouteCount,
    },
    nextActions: ready
      ? [
        "Stop the latest sibling live-smoke archive-verifier chain unless a public audit consumer requires another route.",
        "Continue Node maturity work with compact closeouts or new evidence only when it removes a real blocker.",
        "Keep Java and mini-kv parallel; Node is not waiting for fresh sibling evidence.",
      ]
      : [
        "Repair the v553 archive verifier before closing this chain.",
        "Do not start Java or mini-kv for this closeout; it reads archived Node evidence only.",
      ],
  };
}

function createChecks(input: {
  latestVerifier: JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseoutProfile["latestVerifier"];
  currentRouteCatalog: JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseoutProfile["currentRouteCatalog"];
}): JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseoutProfile["checks"] {
  return {
    requestedVersionSpanClosed: COMPLETED_NODE_VERSIONS.length === 9,
    latestVerifierReady: input.latestVerifier.ready,
    latestVerifierChecksPassed: input.latestVerifier.checkCount === input.latestVerifier.passedCheckCount,
    sourceArchiveBaselinePreserved:
      input.latestVerifier.sourceArchiveRouteCount === 226
      && input.latestVerifier.sourceArchiveJavaMiniKvRouteCount === 62
      && input.latestVerifier.sourceArchiveCleanupHandoffRouteCount === 28,
    routeArchiveBaselinePreserved:
      input.latestVerifier.archivedRouteCatalogRouteCount === 227
      && input.latestVerifier.archivedRouteCatalogJavaMiniKvRouteCount === 63
      && input.latestVerifier.archivedRouteCatalogCleanupHandoffRouteCount === 29,
    currentRouteCatalogCoversArchive:
      input.currentRouteCatalog.routeCount >= input.latestVerifier.archivedRouteCatalogRouteCount
      && input.currentRouteCatalog.javaMiniKvDomainRouteCount
        >= input.latestVerifier.archivedRouteCatalogJavaMiniKvRouteCount
      && input.currentRouteCatalog.cleanupHandoffRouteGroupRouteCount
        >= input.latestVerifier.archivedRouteCatalogCleanupHandoffRouteCount,
    chainGrowthStoppedUnlessPublicConsumerAppears: true,
    javaMiniKvParallelRecommended: true,
    noRuntimeAuthorityOpened: true,
    readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout: false,
  };
}
