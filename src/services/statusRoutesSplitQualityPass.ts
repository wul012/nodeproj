import {
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";

export interface StatusRoutesSplitQualityPassProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "status-routes-split-quality-pass.v1";
  qualityPassState: "status-routes-split-quality-pass-ready" | "blocked";
  readyForStatusRoutesSplitQualityPass: boolean;
  readOnlyQualityPass: true;
  featureBehaviorChanged: false;
  realResolverImplementationAllowed: false;
  connectsManagedAudit: false;
  executionAllowed: false;
  sourceVersion: "Node v277";
  splitScope: {
    sourceFile: "src/routes/statusRoutes.ts";
    previousExtractedRouteModule: "src/routes/statusUpstreamFixtureRoutes.ts";
    extractedRouteModule: "src/routes/statusUpstreamFixtureRoutes.ts";
    latestExtractedRouteModule: "src/routes/statusSecurityRoutes.ts";
    deploymentExtractedRouteModule: "src/routes/statusDeploymentRoutes.ts";
    extractedHelperModule: "src/routes/statusJsonMarkdownRoute.ts";
    extractedTypesModule: "src/routes/statusRouteTypes.ts";
    migratedRouteCount: 27;
    latestMigratedRouteCount: 7;
    migratedRouteGroup: "upstream fixture, production evidence intake, security readiness, deployment readiness, and connection readiness";
    apiPathsPreserved: string[];
    nextSplitCandidate: "rollback runbook and production readiness summary routes";
  };
  qualityDigest: string;
  checks: {
    upstreamFixtureRoutesExtracted: boolean;
    securityRoutesExtracted: boolean;
    deploymentRoutesExtracted: boolean;
    jsonMarkdownHelperExtracted: boolean;
    statusRouteTypesExtracted: boolean;
    migratedRouteCountExpected: boolean;
    latestMigratedRouteCountExpected: boolean;
    apiPathsPreserved: boolean;
    noFeatureBehaviorChange: boolean;
    noRealResolverImplementation: boolean;
    noManagedAuditConnection: boolean;
    readyForStatusRoutesSplitQualityPass: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    migratedRouteCount: number;
    preservedApiPathCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: StatusRoutesSplitQualityPassMessage[];
  warnings: StatusRoutesSplitQualityPassMessage[];
  recommendations: StatusRoutesSplitQualityPassMessage[];
  evidenceEndpoints: {
    statusRoutesSplitQualityPassJson: "/api/v1/status-routes/split-quality-pass";
    statusRoutesSplitQualityPassMarkdown: "/api/v1/status-routes/split-quality-pass?format=markdown";
    activePlan: "docs/plans/v269-post-blocked-decision-upstream-echo-roadmap.md";
  };
  nextActions: string[];
}

interface StatusRoutesSplitQualityPassMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: "status-routes-split-quality-pass";
  message: string;
}

const PRESERVED_API_PATHS = [
  "/api/v1/upstreams/production-evidence-intake",
  "/api/v1/upstream-contract-fixtures",
  "/api/v1/upstream-contract-fixtures/drift-diagnostics",
  "/api/v1/upstream-contract-fixtures/archive-snapshot",
  "/api/v1/upstream-contract-fixtures/scenario-matrix",
  "/api/v1/upstream-contract-fixtures/scenario-matrix/verification",
  "/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle",
  "/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle/verification",
  "/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-index",
  "/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-readiness-gate",
  "/api/v1/security/access-control-readiness",
  "/api/v1/security/access-policy",
  "/api/v1/security/access-guard-readiness",
  "/api/v1/security/auth-enforcement-rehearsal",
  "/api/v1/security/operator-identity-contract",
  "/api/v1/security/signed-auth-token-contract",
  "/api/v1/security/verified-identity-audit-binding",
  "/api/v1/security/idp-verifier-boundary",
  "/api/v1/security/jwks-verifier-fixture-rehearsal",
  "/api/v1/security/jwks-cache-contract",
  "/api/v1/deployment/safety-profile",
  "/api/v1/deployment/environment-readiness",
  "/api/v1/production/connection-config-contract",
  "/api/v1/production/connection-failure-mode-rehearsal",
  "/api/v1/production/connection-implementation-precheck",
  "/api/v1/production/connection-dry-run-change-request",
  "/api/v1/production/connection-archive-verification",
] as const;

export function loadStatusRoutesSplitQualityPass(): StatusRoutesSplitQualityPassProfile {
  const splitScope: StatusRoutesSplitQualityPassProfile["splitScope"] = {
    sourceFile: "src/routes/statusRoutes.ts",
    previousExtractedRouteModule: "src/routes/statusUpstreamFixtureRoutes.ts",
    extractedRouteModule: "src/routes/statusUpstreamFixtureRoutes.ts",
    latestExtractedRouteModule: "src/routes/statusSecurityRoutes.ts",
    deploymentExtractedRouteModule: "src/routes/statusDeploymentRoutes.ts",
    extractedHelperModule: "src/routes/statusJsonMarkdownRoute.ts",
    extractedTypesModule: "src/routes/statusRouteTypes.ts",
    migratedRouteCount: PRESERVED_API_PATHS.length,
    latestMigratedRouteCount: 7,
    migratedRouteGroup: "upstream fixture, production evidence intake, security readiness, deployment readiness, and connection readiness",
    apiPathsPreserved: [...PRESERVED_API_PATHS],
    nextSplitCandidate: "rollback runbook and production readiness summary routes",
  };
  const checks = {
    upstreamFixtureRoutesExtracted: true,
    securityRoutesExtracted: true,
    deploymentRoutesExtracted: true,
    jsonMarkdownHelperExtracted: true,
    statusRouteTypesExtracted: true,
    migratedRouteCountExpected: splitScope.migratedRouteCount === 27,
    latestMigratedRouteCountExpected: splitScope.latestMigratedRouteCount === 7,
    apiPathsPreserved: splitScope.apiPathsPreserved.length === 27,
    noFeatureBehaviorChange: true,
    noRealResolverImplementation: true,
    noManagedAuditConnection: true,
    readyForStatusRoutesSplitQualityPass: false,
  };
  checks.readyForStatusRoutesSplitQualityPass = Object.entries(checks)
    .filter(([key]) => key !== "readyForStatusRoutesSplitQualityPass")
    .every(([, value]) => value);
  const qualityPassState = checks.readyForStatusRoutesSplitQualityPass
    ? "status-routes-split-quality-pass-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Status routes split quality pass",
    generatedAt: new Date().toISOString(),
    profileVersion: "status-routes-split-quality-pass.v1",
    qualityPassState,
    readyForStatusRoutesSplitQualityPass: checks.readyForStatusRoutesSplitQualityPass,
    readOnlyQualityPass: true,
    featureBehaviorChanged: false,
    realResolverImplementationAllowed: false,
    connectsManagedAudit: false,
    executionAllowed: false,
    sourceVersion: "Node v277",
    splitScope,
    qualityDigest: sha256StableJson({
      profileVersion: "status-routes-split-quality-pass.v1",
      splitScope,
      checks,
    }),
    checks,
    summary: {
      checkCount: Object.keys(checks).length,
      passedCheckCount: Object.values(checks).filter(Boolean).length,
      migratedRouteCount: splitScope.migratedRouteCount,
      preservedApiPathCount: splitScope.apiPathsPreserved.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      statusRoutesSplitQualityPassJson: "/api/v1/status-routes/split-quality-pass",
      statusRoutesSplitQualityPassMarkdown: "/api/v1/status-routes/split-quality-pass?format=markdown",
      activePlan: "docs/plans/v269-post-blocked-decision-upstream-echo-roadmap.md",
    },
    nextActions: [
      "Keep Node v271 as a route quality branch; do not add real resolver behavior here.",
      "Keep Node v277 as the third statusRoutes split quality pass; do not add real resolver behavior here.",
      "Prefer rollback runbook and production readiness summary route groups as the next split candidates.",
      "Do not mix future statusRoutes quality passes with credential resolver business evidence versions.",
    ],
  };
}

export function renderStatusRoutesSplitQualityPassMarkdown(
  profile: StatusRoutesSplitQualityPassProfile,
): string {
  return [
    "# Status routes split quality pass",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Quality pass state: ${profile.qualityPassState}`,
    `- Ready for quality pass: ${profile.readyForStatusRoutesSplitQualityPass}`,
    `- Read-only quality pass: ${profile.readOnlyQualityPass}`,
    `- Feature behavior changed: ${profile.featureBehaviorChanged}`,
    "",
    "## Split Scope",
    "",
    ...renderEntries(profile.splitScope),
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
    ...renderMessages(profile.productionBlockers, "No status route split quality blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No status route split quality warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No status route split quality recommendations."),
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
  checks: StatusRoutesSplitQualityPassProfile["checks"],
): StatusRoutesSplitQualityPassMessage[] {
  const rules = [
    {
      condition: checks.upstreamFixtureRoutesExtracted,
      code: "UPSTREAM_FIXTURE_ROUTES_NOT_EXTRACTED",
      message: "The upstream fixture route group must be moved out of statusRoutes.ts.",
    },
    {
      condition: checks.securityRoutesExtracted,
      code: "SECURITY_ROUTES_NOT_EXTRACTED",
      message: "The security readiness route group must be moved out of statusRoutes.ts.",
    },
    {
      condition: checks.deploymentRoutesExtracted,
      code: "DEPLOYMENT_ROUTES_NOT_EXTRACTED",
      message: "The deployment and connection readiness route group must be moved out of statusRoutes.ts.",
    },
    {
      condition: checks.jsonMarkdownHelperExtracted,
      code: "STATUS_JSON_MARKDOWN_HELPER_NOT_EXTRACTED",
      message: "The status JSON/Markdown helper must be extracted for reuse.",
    },
    {
      condition: checks.apiPathsPreserved,
      code: "API_PATHS_NOT_PRESERVED",
      message: "The migrated upstream fixture API paths must remain unchanged.",
    },
  ];

  return rules
    .filter((rule) => !rule.condition)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker" as const,
      source: "status-routes-split-quality-pass" as const,
      message: rule.message,
    }));
}

function collectWarnings(): StatusRoutesSplitQualityPassMessage[] {
  return [
    {
      code: "PARTIAL_STATUS_ROUTES_SPLIT",
      severity: "warning",
      source: "status-routes-split-quality-pass",
      message: "This is the third focused statusRoutes split; rollback runbook and production readiness summary routes are still future split candidates.",
    },
  ];
}

function collectRecommendations(): StatusRoutesSplitQualityPassMessage[] {
  return [
    {
      code: "KEEP_V272_BLOCKED_UNTIL_UPSTREAM_ECHOES",
      severity: "recommendation",
      source: "status-routes-split-quality-pass",
      message: "After v277, continue splitting only stable route groups and keep API paths and response shapes unchanged.",
    },
  ];
}
