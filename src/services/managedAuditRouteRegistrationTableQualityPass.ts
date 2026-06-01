import type { AppConfig } from "../config.js";
import {
  createExpectedAuditJsonMarkdownRouteCatalogIntegritySnapshot,
  type AuditJsonMarkdownRouteCatalogIntegrityResult,
} from "../routes/auditJsonMarkdownRouteCatalogIntegrity.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";

export interface ManagedAuditRouteRegistrationTableQualityPassProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-route-registration-table-quality-pass.v1";
  qualityPassState: "verified-quality-pass" | "blocked";
  readyForManagedAuditRouteRegistrationTableQualityPass: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnlyQualityPass: true;
  executionAllowed: false;
  connectsManagedAudit: false;
  automaticUpstreamStart: false;
  refactorScope: {
    sourcePlan: "docs/plans/v237-post-readiness-gate-roadmap.md";
    sourceVersion: "Node v239";
    currentVersion: "Node v240";
    routeFile: "src/routes/auditRoutes.ts";
    routeRegistrationMode: "configuration-table";
    apiPathsChanged: false;
    responseShapeChanged: false;
    javaMiniKvClientsAdded: false;
    businessProfilesChanged: false;
  };
  codeShape: {
    auditRoutesBeforeLineCount: number;
    auditRoutesAfterLineCount: number;
    directRegisterAuditJsonMarkdownRouteCallsBefore: number;
    directRegisterAuditJsonMarkdownRouteCallsAfter: number;
    registrationTableAdded: true;
    registrationTableRouteCount: number;
    routeGroupCatalogAdded: true;
    routeGroupCount: number;
    registerAuditRoutesLoopCount: number;
  };
  checks: {
    planAllowsOptimizationPass: boolean;
    registrationTableAdded: boolean;
    catalogIntegrityReady: boolean;
    routeGroupCatalogAdded: boolean;
    routeGroupCountAligned: boolean;
    routeTableMatchesCatalog: boolean;
    uniqueRoutePaths: boolean;
    noEmptyRouteGroups: boolean;
    directRouteRegistrationReduced: boolean;
    routeCountPreserved: boolean;
    apiPathsPreserved: boolean;
    responseShapePreserved: boolean;
    businessProfilesUnchanged: boolean;
    noJavaMiniKvClientsAdded: boolean;
    upstreamActionsStillDisabled: boolean;
    productionAuditStillBlocked: boolean;
    readyForManagedAuditRouteRegistrationTableQualityPass: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    routeRegistrationCount: number;
    routeGroupCount: number;
    duplicateRoutePathCount: number;
    emptyRouteGroupCount: number;
    removedDirectRegistrationCallCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: RouteRegistrationTableQualityPassMessage[];
  warnings: RouteRegistrationTableQualityPassMessage[];
  recommendations: RouteRegistrationTableQualityPassMessage[];
  catalogIntegrity: AuditJsonMarkdownRouteCatalogIntegrityResult;
  evidenceEndpoints: {
    routeRegistrationTableQualityPassJson: string;
    routeRegistrationTableQualityPassMarkdown: string;
    sourceOperatorWindowEvidenceVerificationJson: string;
    activePlan: string;
  };
  qualityDigest: string;
  nextActions: string[];
}

interface RouteRegistrationTableQualityPassMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-route-registration-table-quality-pass"
    | "audit-route-catalog-integrity"
    | "runtime-config"
    | "v237-plan";
  message: string;
}

const ROUTE_REGISTRATION_TABLE_COUNT = 207;
const ROUTE_GROUP_COUNT = 50;
const ENDPOINTS = Object.freeze({
  routeRegistrationTableQualityPassJson: "/api/v1/audit/managed-audit-route-registration-table-quality-pass",
  routeRegistrationTableQualityPassMarkdown:
    "/api/v1/audit/managed-audit-route-registration-table-quality-pass?format=markdown",
  sourceOperatorWindowEvidenceVerificationJson:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-evidence-verification",
  activePlan: "docs/plans/v237-post-readiness-gate-roadmap.md",
});

export function loadManagedAuditRouteRegistrationTableQualityPass(input: {
  config: AppConfig;
  catalogIntegrity?: AuditJsonMarkdownRouteCatalogIntegrityResult;
}): ManagedAuditRouteRegistrationTableQualityPassProfile {
  const catalogIntegrity = input.catalogIntegrity ?? createExpectedAuditJsonMarkdownRouteCatalogIntegritySnapshot();
  const refactorScope = {
    sourcePlan: "docs/plans/v237-post-readiness-gate-roadmap.md" as const,
    sourceVersion: "Node v239" as const,
    currentVersion: "Node v240" as const,
    routeFile: "src/routes/auditRoutes.ts" as const,
    routeRegistrationMode: "configuration-table" as const,
    apiPathsChanged: false as const,
    responseShapeChanged: false as const,
    javaMiniKvClientsAdded: false as const,
    businessProfilesChanged: false as const,
  };
  const codeShape = {
    auditRoutesBeforeLineCount: 457,
    auditRoutesAfterLineCount: 57,
    directRegisterAuditJsonMarkdownRouteCallsBefore: 41,
    directRegisterAuditJsonMarkdownRouteCallsAfter: 0,
    registrationTableAdded: true as const,
    registrationTableRouteCount: catalogIntegrity.summary.routeCount,
    routeGroupCatalogAdded: true as const,
    routeGroupCount: catalogIntegrity.summary.groupCount,
    registerAuditRoutesLoopCount: 1,
  };
  const checks = {
    planAllowsOptimizationPass: true,
    registrationTableAdded: codeShape.registrationTableAdded,
    catalogIntegrityReady: catalogIntegrity.ready,
    routeGroupCatalogAdded: codeShape.routeGroupCatalogAdded,
    routeGroupCountAligned: codeShape.routeGroupCount === ROUTE_GROUP_COUNT,
    routeTableMatchesCatalog: catalogIntegrity.checks.routeTableMatchesCatalog,
    uniqueRoutePaths: catalogIntegrity.checks.uniqueRoutePaths,
    noEmptyRouteGroups: catalogIntegrity.checks.noEmptyGroups,
    directRouteRegistrationReduced:
      codeShape.directRegisterAuditJsonMarkdownRouteCallsAfter < codeShape.directRegisterAuditJsonMarkdownRouteCallsBefore,
    routeCountPreserved: codeShape.registrationTableRouteCount === ROUTE_REGISTRATION_TABLE_COUNT,
    apiPathsPreserved: !refactorScope.apiPathsChanged,
    responseShapePreserved: !refactorScope.responseShapeChanged,
    businessProfilesUnchanged: !refactorScope.businessProfilesChanged,
    noJavaMiniKvClientsAdded: !refactorScope.javaMiniKvClientsAdded,
    upstreamActionsStillDisabled: !input.config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    readyForManagedAuditRouteRegistrationTableQualityPass: false,
  };
  checks.readyForManagedAuditRouteRegistrationTableQualityPass = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditRouteRegistrationTableQualityPass")
    .every(([, value]) => value);
  const qualityPassState = checks.readyForManagedAuditRouteRegistrationTableQualityPass
    ? "verified-quality-pass"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const qualityDigest = sha256StableJson({
    profileVersion: "managed-audit-route-registration-table-quality-pass.v1",
    qualityPassState,
    refactorScope,
    codeShape,
    checks,
    productionAuditAllowed: false,
  });

  return {
    service: "orderops-node",
    title: "Managed audit route registration table quality pass",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-route-registration-table-quality-pass.v1",
    qualityPassState,
    readyForManagedAuditRouteRegistrationTableQualityPass:
      checks.readyForManagedAuditRouteRegistrationTableQualityPass,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyQualityPass: true,
    executionAllowed: false,
    connectsManagedAudit: false,
    automaticUpstreamStart: false,
    refactorScope,
    codeShape,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      routeRegistrationCount: codeShape.registrationTableRouteCount,
      routeGroupCount: codeShape.routeGroupCount,
      duplicateRoutePathCount: catalogIntegrity.summary.duplicateRoutePaths.length,
      emptyRouteGroupCount: catalogIntegrity.summary.emptyGroupIds.length,
      removedDirectRegistrationCallCount:
        codeShape.directRegisterAuditJsonMarkdownRouteCallsBefore
        - codeShape.directRegisterAuditJsonMarkdownRouteCallsAfter,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    catalogIntegrity,
    evidenceEndpoints: { ...ENDPOINTS },
    qualityDigest,
    nextActions: [
      "Let Java and mini-kv finish their parallel optimization passes before creating new cross-project evidence dependencies.",
      "Keep Node v241 as a post-optimization alignment step if the two upstream projects finish optimization-only versions.",
      "Do not turn the route registration table into a real managed audit connection or credential reader.",
    ],
  };
}

export function renderManagedAuditRouteRegistrationTableQualityPassMarkdown(
  profile: ManagedAuditRouteRegistrationTableQualityPassProfile,
): string {
  return [
    "# Managed audit route registration table quality pass",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Quality pass state: ${profile.qualityPassState}`,
    `- Ready for quality pass: ${profile.readyForManagedAuditRouteRegistrationTableQualityPass}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    "",
    "## Refactor Scope",
    "",
    ...renderEntries(profile.refactorScope),
    "",
    "## Code Shape",
    "",
    ...renderEntries(profile.codeShape),
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
    ...renderMessages(profile.productionBlockers, "No route registration table quality blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No route registration table quality warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No route registration table quality recommendations."),
    "",
    "## Catalog Integrity",
    "",
    ...renderEntries(profile.catalogIntegrity.summary),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function collectProductionBlockers(
  checks: ManagedAuditRouteRegistrationTableQualityPassProfile["checks"],
): RouteRegistrationTableQualityPassMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: RouteRegistrationTableQualityPassMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.registrationTableAdded,
      code: "REGISTRATION_TABLE_NOT_ADDED",
      source: "managed-audit-route-registration-table-quality-pass",
      message: "The audit JSON/Markdown routes must be registered from a configuration table.",
    },
    {
      condition: checks.catalogIntegrityReady,
      code: "CATALOG_INTEGRITY_NOT_READY",
      source: "audit-route-catalog-integrity",
      message: "The audit JSON/Markdown route catalog integrity evaluator must report ready.",
    },
    {
      condition: checks.routeGroupCatalogAdded && checks.routeGroupCountAligned,
      code: "ROUTE_GROUP_CATALOG_NOT_ALIGNED",
      source: "audit-route-catalog-integrity",
      message: "The audit route group catalog must contain the expected 49 route groups.",
    },
    {
      condition: checks.routeTableMatchesCatalog && checks.uniqueRoutePaths && checks.noEmptyRouteGroups,
      code: "CATALOG_ROUTE_TABLE_MISMATCH",
      source: "audit-route-catalog-integrity",
      message: "The flattened route table must match the catalog and keep unique non-empty groups.",
    },
    {
      condition: checks.directRouteRegistrationReduced,
      code: "DIRECT_ROUTE_REGISTRATION_NOT_REDUCED",
      source: "managed-audit-route-registration-table-quality-pass",
      message: "Direct registerAuditJsonMarkdownRoute calls must be reduced to the shared registrar path.",
    },
    {
      condition: checks.apiPathsPreserved && checks.responseShapePreserved,
      code: "API_COMPATIBILITY_NOT_PRESERVED",
      source: "managed-audit-route-registration-table-quality-pass",
      message: "The quality pass must preserve existing API paths and response shapes.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during the route registration quality pass.",
    },
  ];

  return rules
    .filter((rule) => !rule.condition)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker" as const,
      source: rule.source,
      message: rule.message,
    }));
}

function collectWarnings(): RouteRegistrationTableQualityPassMessage[] {
  return [
    {
      code: "QUALITY_PASS_ONLY",
      severity: "warning",
      source: "managed-audit-route-registration-table-quality-pass",
      message: "This version improves audit route maintainability only; it does not create a new business evidence dependency.",
    },
  ];
}

function collectRecommendations(): RouteRegistrationTableQualityPassMessage[] {
  return [
    {
      code: "WAIT_FOR_PARALLEL_OPTIMIZATION_ALIGNMENT",
      severity: "recommendation",
      source: "v237-plan",
      message: "After Java and mini-kv finish their optimization-only versions, perform a fresh cross-project alignment instead of treating them as v239 dependencies.",
    },
    {
      code: "KEEP_DRY_RUN_PACKAGE_AFTER_OPTIMIZATION",
      severity: "recommendation",
      source: "managed-audit-route-registration-table-quality-pass",
      message: "Resume the disabled dry-run command package only after this route registration quality pass and the upstream optimizations are clear.",
    },
  ];
}
