import {
  existsSync,
  readFileSync,
  statSync,
} from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import {
  ROUTE_QUALITY_ROUTE_COUNT,
} from "../contracts/auditRouteManifest.js";
import {
  EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY,
} from "../routes/auditJsonMarkdownRouteCatalogSummary.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  READABILITY_MAINTENANCE_ACTIVE_VERSION_RANGE,
  READABILITY_MAINTENANCE_DOCUMENTS,
  READABILITY_MAINTENANCE_PROFILE_VERSION,
  type ReadabilityMaintenanceDocumentEvaluation,
  type ReadabilityMaintenanceMessage,
  type ReadabilityMaintenanceProfile,
} from "./readabilityMaintenanceProfileTypes.js";

const ENDPOINTS = Object.freeze({
  readabilityMaintenanceProfileJson: "/api/v1/audit/managed-audit-readability-maintenance-profile",
  readabilityMaintenanceProfileMarkdown:
    "/api/v1/audit/managed-audit-readability-maintenance-profile?format=markdown",
  routeCatalogSummaryJson: "/api/v1/audit/json-markdown-route-catalog-summary",
  fFolderExplanationQualityGateJson: "/api/v1/audit/f-folder-explanation-quality-gate",
  codeWalkthroughDocumentationQualityGateJson: "/api/v1/audit/code-walkthrough-documentation-quality-gate",
});

export function loadReadabilityMaintenanceProfile(input: {
  config: AppConfig;
  projectRoot?: string;
}): ReadabilityMaintenanceProfile {
  const projectRoot = input.projectRoot ?? process.cwd();
  const documents = READABILITY_MAINTENANCE_DOCUMENTS.map((document) =>
    evaluateReadabilityDocument(projectRoot, document));
  const routeCatalog = {
    expectedGroupCount: EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.groupCount,
    expectedRouteCount: EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.routeCount,
    managedAuditRouteCount:
      EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.domainRouteCounts["managed-audit"],
    routeQualityRouteCount: ROUTE_QUALITY_ROUTE_COUNT,
  };
  const checks = {
    architectureDocumentsPresent: documents.every((document) => document.exists),
    controlPlaneMapDocumentsBoundaries: documentPasses(documents, "control-plane-map"),
    qualityGateFamilyDocumented: documentPasses(documents, "quality-gates-map"),
    evidenceFlowDocumentsReadOnlySafety: documentPasses(documents, "evidence-flow-map"),
    routeServiceTestMapDocumentsNewRoute: documentPasses(documents, "route-service-test-map"),
    fFolderStandardCloseoutDocumented: documentPasses(documents, "f-folder-explanation-standard-closeout"),
    routeCatalogCountsAligned:
      routeCatalog.expectedRouteCount === 254
      && routeCatalog.managedAuditRouteCount === 56
      && routeCatalog.routeQualityRouteCount === 6,
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
    noSiblingServiceStartup: true,
    noProductionExecutionEnabled: true,
    readyForReadabilityMaintenance: false,
  };
  checks.readyForReadabilityMaintenance = Object.entries(checks)
    .filter(([key]) => key !== "readyForReadabilityMaintenance")
    .every(([, value]) => value);
  const maintenanceState = checks.readyForReadabilityMaintenance
    ? "verified-readability-maintenance"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks, documents);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const qualityDigest = sha256StableJson({
    profileVersion: READABILITY_MAINTENANCE_PROFILE_VERSION,
    maintenanceState,
    routeCatalog,
    checks,
    documents: documents.map((document) => ({
      id: document.id,
      relativePath: document.relativePath,
      passes: document.passes,
      missingRequiredPhrases: document.missingRequiredPhrases,
    })),
  });

  return {
    service: "orderops-node",
    title: "Readability maintenance profile",
    generatedAt: new Date().toISOString(),
    profileVersion: READABILITY_MAINTENANCE_PROFILE_VERSION,
    maintenanceState,
    readyForReadabilityMaintenance: checks.readyForReadabilityMaintenance,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyProfile: true,
    executionAllowed: false,
    connectsManagedAudit: false,
    startsJavaService: false,
    startsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    scope: {
      sourceSuggestion: "D:\\C\\四项目理解统筹\\06-四项目可读性保养建议",
      activeVersionRange: READABILITY_MAINTENANCE_ACTIVE_VERSION_RANGE,
      routeGroup: "managed-audit-route-quality",
      localDocumentationOnly: true,
      javaMiniKvParallelRecommended: true,
      aiprojReadOnlyObserved: true,
    },
    routeCatalog,
    documents,
    checks,
    summary: {
      documentCount: documents.length,
      passingDocumentCount: documents.filter((document) => document.passes).length,
      missingDocumentCount: documents.filter((document) => !document.exists).length,
      missingPhraseCount: documents
        .reduce((count, document) => count + document.missingRequiredPhrases.length, 0),
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    qualityDigest,
    nextActions: [
      "Use the architecture maps as the first reading path before adding another governance route.",
      "Keep Java and mini-kv parallel: this profile is local documentation maintenance, not an upstream evidence blocker.",
      "Add a new readability rule only when the existing maps cannot express a real review failure.",
    ],
  };
}

export function renderReadabilityMaintenanceProfileMarkdown(
  profile: ReadabilityMaintenanceProfile,
): string {
  return [
    "# Readability maintenance profile",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Maintenance state: ${profile.maintenanceState}`,
    `- Ready for readability maintenance: ${profile.readyForReadabilityMaintenance}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    `- Starts Java service: ${profile.startsJavaService}`,
    `- Starts mini-kv service: ${profile.startsMiniKvService}`,
    "",
    "## Scope",
    "",
    ...renderEntries(profile.scope),
    "",
    "## Route Catalog",
    "",
    ...renderEntries(profile.routeCatalog),
    "",
    "## Documents",
    "",
    ...renderList(profile.documents.map(formatDocument), "No readability maintenance documents found."),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No readability maintenance blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No readability maintenance warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No readability maintenance recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
    `Quality digest: ${profile.qualityDigest}`,
  ].join("\n");
}

function evaluateReadabilityDocument(
  projectRoot: string,
  document: typeof READABILITY_MAINTENANCE_DOCUMENTS[number],
): ReadabilityMaintenanceDocumentEvaluation {
  const absolutePath = path.join(projectRoot, document.path);
  if (!existsSync(absolutePath)) {
    return {
      id: document.id,
      relativePath: document.path,
      exists: false,
      byteLength: 0,
      lineCount: 0,
      missingRequiredPhrases: [...document.requiredPhrases],
      passes: false,
    };
  }
  const text = readFileSync(absolutePath, "utf8");
  const stats = statSync(absolutePath);
  const missingRequiredPhrases = document.requiredPhrases
    .filter((phrase) => !text.includes(phrase));

  return {
    id: document.id,
    relativePath: document.path,
    exists: true,
    byteLength: stats.size,
    lineCount: text.split(/\r?\n/).length,
    missingRequiredPhrases,
    passes: missingRequiredPhrases.length === 0,
  };
}

function documentPasses(
  documents: readonly ReadabilityMaintenanceDocumentEvaluation[],
  id: ReadabilityMaintenanceDocumentEvaluation["id"],
): boolean {
  return documents.some((document) => document.id === id && document.passes);
}

function collectProductionBlockers(
  checks: ReadabilityMaintenanceProfile["checks"],
  documents: readonly ReadabilityMaintenanceDocumentEvaluation[],
): ReadabilityMaintenanceMessage[] {
  const blockers: ReadabilityMaintenanceMessage[] = [];
  if (!checks.architectureDocumentsPresent) {
    blockers.push(message("READABILITY_DOCUMENT_MISSING", "readability-maintenance-profile",
      `${documents.filter((document) => !document.exists).length} readability maintenance documents are missing.`));
  }
  for (const document of documents.filter((item) => item.exists && !item.passes)) {
    blockers.push(message("READABILITY_DOCUMENT_INCOMPLETE", document.id,
      `${document.relativePath} misses: ${document.missingRequiredPhrases.join(", ")}`));
  }
  if (!checks.routeCatalogCountsAligned) {
    blockers.push(message("READABILITY_ROUTE_CATALOG_NOT_ALIGNED", "readability-maintenance-profile",
      "The audit route catalog summary must include the readability maintenance route."));
  }
  if (!checks.upstreamActionsStillDisabled) {
    blockers.push(message("UPSTREAM_ACTIONS_ENABLED", "runtime-config",
      "UPSTREAM_ACTIONS_ENABLED must stay false during readability maintenance."));
  }
  return blockers;
}

function collectWarnings(): ReadabilityMaintenanceMessage[] {
  return [
    {
      code: "MAINTENANCE_ONLY",
      severity: "warning",
      source: "readability-maintenance-profile",
      message: "This profile improves project readability and route ownership only; it does not approve production execution.",
    },
  ];
}

function collectRecommendations(): ReadabilityMaintenanceMessage[] {
  return [
    {
      code: "KEEP_GATE_GROWTH_BOUNDED",
      severity: "recommendation",
      source: "quality-gates-map",
      message: "Prefer updating the existing maps before adding another quality gate family.",
    },
    {
      code: "USE_ROUTE_SERVICE_TEST_MAP",
      severity: "recommendation",
      source: "route-service-test-map",
      message: "Every new audit route should be added to the route/service/test map in the same version.",
    },
  ];
}

function message(
  code: string,
  source: ReadabilityMaintenanceMessage["source"],
  text: string,
): ReadabilityMaintenanceMessage {
  return { code, severity: "blocker", source, message: text };
}

function formatDocument(document: ReadabilityMaintenanceDocumentEvaluation): string {
  return `${document.relativePath}: exists=${document.exists}; bytes=${document.byteLength}; lines=${document.lineCount}; passes=${document.passes}; missing=${document.missingRequiredPhrases.length}`;
}
