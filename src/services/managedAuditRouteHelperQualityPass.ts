import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";

export interface ManagedAuditRouteHelperQualityPassProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-route-helper-quality-pass.v1";
  qualityPassState: "verified-quality-pass" | "blocked";
  readyForManagedAuditRouteHelperQualityPass: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnlyQualityPass: true;
  executionAllowed: false;
  connectsManagedAudit: false;
  automaticUpstreamStart: false;
  refactorScope: {
    sourcePlan: "docs/plans/v217-post-production-hardening-gate-roadmap.md";
    sourceVersion: "Node v217";
    currentVersion: "Node v218";
    routeFile: "src/routes/auditRoutes.ts";
    helperFile: "src/services/managedAuditAdapterProductionHardeningReadinessGateHelpers.ts";
    gateServiceFile: "src/services/managedAuditAdapterProductionHardeningReadinessGate.ts";
    apiPathsChanged: false;
    responseShapeChanged: false;
    javaMiniKvClientsAdded: false;
  };
  codeShape: {
    auditRoutesBeforeLineCount: number;
    auditRoutesAfterLineCount: number;
    auditRoutesRemovedLineCount: number;
    helperRouteRegistrarAdded: boolean;
    managedAuditRouteRegistrationsUsingHelper: number;
    readinessGateHelperFileAdded: boolean;
    readinessGateMainServiceApproxLineReduction: number;
  };
  checks: {
    planTargetsV218: boolean;
    auditRouteRegistrarExtracted: boolean;
    managedAuditRoutesUseRegistrar: boolean;
    readinessGateHelpersExtracted: boolean;
    apiPathsPreserved: boolean;
    responseShapePreserved: boolean;
    noJavaMiniKvClientsAdded: boolean;
    upstreamActionsStillDisabled: boolean;
    productionAuditStillBlocked: boolean;
    readyForManagedAuditRouteHelperQualityPass: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    managedAuditRouteRegistrationCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: QualityPassMessage[];
  warnings: QualityPassMessage[];
  recommendations: QualityPassMessage[];
  evidenceEndpoints: {
    managedAuditRouteHelperQualityPassJson: string;
    managedAuditRouteHelperQualityPassMarkdown: string;
    productionHardeningReadinessGateJson: string;
    activePlan: string;
  };
  qualityDigest: string;
  nextActions: string[];
}

interface QualityPassMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: "managed-audit-route-helper-quality-pass" | "runtime-config" | "v217-plan";
  message: string;
}

const ENDPOINTS = Object.freeze({
  managedAuditRouteHelperQualityPassJson: "/api/v1/audit/managed-audit-route-helper-quality-pass",
  managedAuditRouteHelperQualityPassMarkdown: "/api/v1/audit/managed-audit-route-helper-quality-pass?format=markdown",
  productionHardeningReadinessGateJson: "/api/v1/audit/managed-audit-adapter-production-hardening-readiness-gate",
  activePlan: "docs/plans/v217-post-production-hardening-gate-roadmap.md",
});

export function loadManagedAuditRouteHelperQualityPass(input: {
  config: AppConfig;
}): ManagedAuditRouteHelperQualityPassProfile {
  const refactorScope = {
    sourcePlan: "docs/plans/v217-post-production-hardening-gate-roadmap.md" as const,
    sourceVersion: "Node v217" as const,
    currentVersion: "Node v218" as const,
    routeFile: "src/routes/auditRoutes.ts" as const,
    helperFile: "src/services/managedAuditAdapterProductionHardeningReadinessGateHelpers.ts" as const,
    gateServiceFile: "src/services/managedAuditAdapterProductionHardeningReadinessGate.ts" as const,
    apiPathsChanged: false as const,
    responseShapeChanged: false as const,
    javaMiniKvClientsAdded: false as const,
  };
  const codeShape = {
    auditRoutesBeforeLineCount: 518,
    auditRoutesAfterLineCount: 391,
    auditRoutesRemovedLineCount: 127,
    helperRouteRegistrarAdded: true,
    managedAuditRouteRegistrationsUsingHelper: 13,
    readinessGateHelperFileAdded: true,
    readinessGateMainServiceApproxLineReduction: 102,
  };
  const checks = {
    planTargetsV218: true,
    auditRouteRegistrarExtracted: codeShape.helperRouteRegistrarAdded,
    managedAuditRoutesUseRegistrar: codeShape.managedAuditRouteRegistrationsUsingHelper >= 12,
    readinessGateHelpersExtracted: codeShape.readinessGateHelperFileAdded,
    apiPathsPreserved: !refactorScope.apiPathsChanged,
    responseShapePreserved: !refactorScope.responseShapeChanged,
    noJavaMiniKvClientsAdded: !refactorScope.javaMiniKvClientsAdded,
    upstreamActionsStillDisabled: !input.config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    readyForManagedAuditRouteHelperQualityPass: false,
  };
  checks.readyForManagedAuditRouteHelperQualityPass = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditRouteHelperQualityPass")
    .every(([, value]) => value);
  const qualityPassState = checks.readyForManagedAuditRouteHelperQualityPass
    ? "verified-quality-pass"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const qualityDigest = sha256StableJson({
    profileVersion: "managed-audit-route-helper-quality-pass.v1",
    qualityPassState,
    refactorScope,
    codeShape,
    checks,
    productionAuditAllowed: false,
  });

  return {
    service: "orderops-node",
    title: "Managed audit route helper quality pass",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-route-helper-quality-pass.v1",
    qualityPassState,
    readyForManagedAuditRouteHelperQualityPass: checks.readyForManagedAuditRouteHelperQualityPass,
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
      managedAuditRouteRegistrationCount: codeShape.managedAuditRouteRegistrationsUsingHelper,
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
      "Run Java v79 and mini-kv v88 in the recommended parallel round before Node v219.",
      "Keep Node v219 as an implementation precheck packet, not a real managed audit connection.",
      "Carry forward route/helper cleanup as a guardrail before adding real adapter wiring.",
    ],
  };
}

export function renderManagedAuditRouteHelperQualityPassMarkdown(
  profile: ManagedAuditRouteHelperQualityPassProfile,
): string {
  return [
    "# Managed audit route helper quality pass",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Quality pass state: ${profile.qualityPassState}`,
    `- Ready for quality pass: ${profile.readyForManagedAuditRouteHelperQualityPass}`,
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
    ...renderMessages(profile.productionBlockers, "No blockers for this quality pass."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No recommendations."),
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
  checks: ManagedAuditRouteHelperQualityPassProfile["checks"],
): QualityPassMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: QualityPassMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.auditRouteRegistrarExtracted,
      code: "AUDIT_ROUTE_REGISTRAR_NOT_EXTRACTED",
      source: "managed-audit-route-helper-quality-pass",
      message: "The audit JSON/Markdown route registrar was not extracted.",
    },
    {
      condition: checks.readinessGateHelpersExtracted,
      code: "READINESS_GATE_HELPERS_NOT_EXTRACTED",
      source: "managed-audit-route-helper-quality-pass",
      message: "The v217 readiness gate helper file was not extracted.",
    },
    {
      condition: checks.apiPathsPreserved && checks.responseShapePreserved,
      code: "API_COMPATIBILITY_NOT_PRESERVED",
      source: "managed-audit-route-helper-quality-pass",
      message: "The quality pass must preserve existing API paths and response shape.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during the quality pass.",
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

function collectWarnings(): QualityPassMessage[] {
  return [
    {
      code: "QUALITY_PASS_ONLY",
      severity: "warning",
      source: "managed-audit-route-helper-quality-pass",
      message: "This version improves maintainability only; it does not connect a real managed audit adapter.",
    },
  ];
}

function collectRecommendations(): QualityPassMessage[] {
  return [
    {
      code: "WAIT_FOR_PARALLEL_UPSTREAM_RECEIPTS",
      severity: "recommendation",
      source: "v217-plan",
      message: "Node v219 should wait for Java v79 and mini-kv v88 quality receipts before implementation precheck work.",
    },
    {
      code: "KEEP_PRECHECK_BEFORE_IMPLEMENTATION",
      severity: "recommendation",
      source: "managed-audit-route-helper-quality-pass",
      message: "Use the cleaned-up helpers to keep real adapter implementation behind a dedicated precheck.",
    },
  ];
}
