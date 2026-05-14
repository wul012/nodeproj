import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
} from "./liveProbeReportUtils.js";
import {
  appendBlockingMessage,
  digestReleaseReport,
  renderReleaseReportMarkdown,
} from "./releaseReportShared.js";
import {
  loadProductionEnvironmentPreflightChecklist,
} from "./productionEnvironmentPreflightChecklist.js";
import type {
  ProductionEnvironmentPreflightChecklistProfile,
} from "./productionEnvironmentPreflightChecklist.js";
import {
  loadRollbackExecutionPreflightContract,
} from "./rollbackExecutionPreflightContract.js";
import type {
  RollbackExecutionPreflightContractProfile,
} from "./rollbackExecutionPreflightContract.js";

type SummaryState = "completed-with-production-blockers" | "blocked";

interface SummaryMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "post-v166-readiness-summary"
    | "rollback-execution-preflight-contract"
    | "production-environment-preflight-checklist"
    | "runtime-config"
    | "future-production-integration";
  message: string;
}

interface SummaryCategory {
  id:
    | "rollback-execution-preflight"
    | "production-environment-preflight"
    | "secret-and-digest-evidence"
    | "execution-safety"
    | "remaining-production-blockers";
  status: "pass" | "blocked";
  readinessPasses: boolean;
  productionReady: boolean;
  evidence: string;
  note: string;
}

export interface PostV166ReadinessSummaryProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  summaryVersion: "post-v166-readiness-summary.v1";
  summaryState: SummaryState;
  readyForPostV166ReadinessSummary: boolean;
  readyForProductionRollback: false;
  readyForProductionOperations: false;
  readOnly: true;
  dryRunOnly: true;
  executionAllowed: false;
  stage: Record<string, unknown>;
  checks: Record<string, boolean>;
  artifacts: Record<string, object>;
  categories: SummaryCategory[];
  summary: Record<string, number>;
  productionBlockers: SummaryMessage[];
  warnings: SummaryMessage[];
  recommendations: SummaryMessage[];
  evidenceEndpoints: Record<string, string>;
  nextActions: string[];
}

const ENDPOINTS = Object.freeze({
  postV166ReadinessSummaryJson: "/api/v1/production/post-v166-readiness-summary",
  postV166ReadinessSummaryMarkdown: "/api/v1/production/post-v166-readiness-summary?format=markdown",
  rollbackExecutionPreflightContractJson: "/api/v1/production/rollback-execution-preflight-contract",
  productionEnvironmentPreflightChecklistJson: "/api/v1/production/environment-preflight-checklist",
  currentRoadmap: "docs/plans/v166-post-rollback-window-roadmap.md",
  nextRoadmap: "docs/plans/v169-post-production-environment-preflight-roadmap.md",
});

export function loadPostV166ReadinessSummary(config: AppConfig): PostV166ReadinessSummaryProfile {
  const rollbackPreflight = loadRollbackExecutionPreflightContract(config);
  const environmentPreflight = loadProductionEnvironmentPreflightChecklist(config);
  const checks = createChecks(config, rollbackPreflight, environmentPreflight);
  const summaryReady = checks.rollbackExecutionPreflightReady
    && checks.productionEnvironmentPreflightReady
    && checks.rollbackPreflightDigestPresent
    && checks.environmentChecklistDigestPresent
    && checks.executionStillBlocked
    && checks.secretValueAccessStillBlocked
    && checks.productionDatabaseStillBlocked
    && checks.miniKvRestoreStillBlocked
    && checks.upstreamActionsStillDisabled
    && checks.automaticUpstreamStartDisabled;
  checks.readyForPostV166ReadinessSummary = summaryReady;
  const summaryState: SummaryState = summaryReady ? "completed-with-production-blockers" : "blocked";
  const stageDigest = digestReleaseReport({
    summaryVersion: "post-v166-readiness-summary.v1",
    rollbackPreflightDigest: rollbackPreflight.contract.contractDigest,
    environmentChecklistDigest: environmentPreflight.checklist.checklistDigest,
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    checks,
  });
  const categories = createCategories(checks);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(summaryState);
  const recommendations = collectRecommendations(summaryState);

  return {
    service: "orderops-node",
    title: "Post-v166 readiness summary",
    generatedAt: new Date().toISOString(),
    summaryVersion: "post-v166-readiness-summary.v1",
    summaryState,
    readyForPostV166ReadinessSummary: summaryReady,
    readyForProductionRollback: false,
    readyForProductionOperations: false,
    readOnly: true,
    dryRunOnly: true,
    executionAllowed: false,
    stage: {
      stageDigest,
      stageName: "post-v166-production-gap-closure",
      sourcePlan: "docs/plans/v166-post-rollback-window-roadmap.md",
      nextPlan: "docs/plans/v169-post-production-environment-preflight-roadmap.md",
      nodeBaselineTag: "v168",
      summarizedVersions: [
        "Node v167 rollback execution preflight contract",
        "Node v168 production environment preflight checklist",
      ],
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      productionRollbackAuthorized: false,
      productionOperationsAuthorized: false,
    },
    checks,
    artifacts: {
      rollbackExecutionPreflightContract: summarizeRollbackPreflight(rollbackPreflight),
      productionEnvironmentPreflightChecklist: summarizeEnvironmentPreflight(environmentPreflight),
      remainingProductionBoundary: {
        realSecretManagerConnected: false,
        productionDatabaseConnected: false,
        realProductionIdpConnected: false,
        productionRollbackApprovalConnected: false,
        miniKvRestoreApprovalConnected: false,
        nextStepMustStartNewPlan: true,
      },
    },
    categories,
    summary: {
      categoryCount: categories.length,
      passedCategoryCount: categories.filter((category) => category.status === "pass").length,
      blockedCategoryCount: categories.filter((category) => category.status === "blocked").length,
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
    nextActions: [
      "Close the v166-derived plan after archiving Node v169 evidence.",
      "Start the new v169-derived plan instead of appending more overlapping work to the v166 plan.",
      "Recommended parallel next stage: Java v60 plus mini-kv v69 should add production deployment and artifact evidence without executing rollback or restore.",
      "Node v170 should wait for Java v60 and mini-kv v69 before consuming those new evidence records.",
    ],
  };
}

export function renderPostV166ReadinessSummaryMarkdown(profile: PostV166ReadinessSummaryProfile): string {
  return renderReleaseReportMarkdown({
    title: "Post-v166 readiness summary",
    header: {
      Service: profile.service,
      "Generated at": profile.generatedAt,
      "Summary version": profile.summaryVersion,
      "Summary state": profile.summaryState,
      "Ready for post-v166 readiness summary": profile.readyForPostV166ReadinessSummary,
      "Ready for production rollback": profile.readyForProductionRollback,
      "Ready for production operations": profile.readyForProductionOperations,
      "Read only": profile.readOnly,
      "Dry run only": profile.dryRunOnly,
      "Execution allowed": profile.executionAllowed,
    },
    sections: [
      { heading: "Stage", entries: profile.stage },
      { heading: "Checks", entries: profile.checks },
      {
        heading: "Rollback Execution Preflight Contract",
        entries: profile.artifacts.rollbackExecutionPreflightContract,
      },
      {
        heading: "Production Environment Preflight Checklist",
        entries: profile.artifacts.productionEnvironmentPreflightChecklist,
      },
      { heading: "Remaining Production Boundary", entries: profile.artifacts.remainingProductionBoundary },
      { heading: "Summary", entries: profile.summary },
    ],
    itemSections: [
      { heading: "Categories", items: profile.categories, renderItem: renderCategory },
    ],
    messageSections: [
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No post-v166 production blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No post-v166 warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No post-v166 recommendations.",
      },
    ],
    evidenceEndpoints: profile.evidenceEndpoints,
    nextActions: profile.nextActions,
  });
}

function createChecks(
  config: AppConfig,
  rollbackPreflight: RollbackExecutionPreflightContractProfile,
  environmentPreflight: ProductionEnvironmentPreflightChecklistProfile,
): Record<string, boolean> {
  return {
    rollbackExecutionPreflightReady: rollbackPreflight.readyForRollbackExecutionPreflightContract
      && rollbackPreflight.contractState === "ready-for-manual-preflight-review",
    productionEnvironmentPreflightReady: environmentPreflight.readyForProductionEnvironmentPreflightChecklist
      && environmentPreflight.checklistState === "ready-for-manual-environment-review",
    rollbackPreflightDigestPresent: typeof rollbackPreflight.contract.contractDigest === "string"
      && /^[a-f0-9]{64}$/.test(String(rollbackPreflight.contract.contractDigest)),
    environmentChecklistDigestPresent: typeof environmentPreflight.checklist.checklistDigest === "string"
      && /^[a-f0-9]{64}$/.test(String(environmentPreflight.checklist.checklistDigest)),
    secretSourceEvidenceConsumed: environmentPreflight.checklist.javaVersion === "Java v59"
      && environmentPreflight.checks.javaSecretValuesClosed,
    artifactDigestEvidenceConsumed: environmentPreflight.checklist.miniKvVersion === "mini-kv v68"
      && environmentPreflight.checks.miniKvDigestMatrixComplete,
    executionStillBlocked: rollbackPreflight.executionAllowed === false
      && environmentPreflight.executionAllowed === false
      && rollbackPreflight.readyForProductionRollback === false
      && environmentPreflight.readyForProductionOperations === false,
    secretValueAccessStillBlocked: environmentPreflight.checks.javaSecretValuesClosed
      && environmentPreflight.checklist.nodeMayReadSecretValues === false,
    productionDatabaseStillBlocked: environmentPreflight.checks.noProductionDatabaseConnection
      && environmentPreflight.checklist.nodeMayConnectProductionDatabase === false,
    miniKvRestoreStillBlocked: environmentPreflight.checks.miniKvExecutionBoundariesClosed
      && environmentPreflight.checklist.nodeMayExecuteMiniKvRestore === false,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    automaticUpstreamStartDisabled: rollbackPreflight.checks.noAutomaticUpstreamStart
      && environmentPreflight.checks.noAutomaticUpstreamStart,
    realSecretManagerConnected: false,
    productionDatabaseConnected: false,
    realProductionIdpConnected: false,
    productionRollbackApprovalConnected: false,
    readyForPostV166ReadinessSummary: false,
  };
}

function summarizeRollbackPreflight(profile: RollbackExecutionPreflightContractProfile): Record<string, object | string | boolean | number | unknown> {
  return {
    profileVersion: profile.profileVersion,
    contractState: profile.contractState,
    contractDigest: profile.contract.contractDigest,
    javaVersion: profile.contract.javaVersion,
    miniKvVersion: profile.contract.miniKvVersion,
    readyForRollbackExecutionPreflightContract: profile.readyForRollbackExecutionPreflightContract,
    readyForProductionRollback: profile.readyForProductionRollback,
    executionAllowed: profile.executionAllowed,
    passedPreflightCheckCount: profile.summary.passedPreflightCheckCount,
    preflightCheckCount: profile.summary.preflightCheckCount,
  };
}

function summarizeEnvironmentPreflight(
  profile: ProductionEnvironmentPreflightChecklistProfile,
): Record<string, object | string | boolean | number | unknown> {
  return {
    profileVersion: profile.profileVersion,
    checklistState: profile.checklistState,
    checklistDigest: profile.checklist.checklistDigest,
    javaVersion: profile.checklist.javaVersion,
    miniKvVersion: profile.checklist.miniKvVersion,
    readyForProductionEnvironmentPreflightChecklist: profile.readyForProductionEnvironmentPreflightChecklist,
    readyForProductionRollback: profile.readyForProductionRollback,
    readyForProductionOperations: profile.readyForProductionOperations,
    executionAllowed: profile.executionAllowed,
    passedChecklistCheckCount: profile.summary.passedChecklistCheckCount,
    checklistCheckCount: profile.summary.checklistCheckCount,
  };
}

function createCategories(checks: Record<string, boolean>): SummaryCategory[] {
  return [
    {
      id: "rollback-execution-preflight",
      status: checks.rollbackExecutionPreflightReady ? "pass" : "blocked",
      readinessPasses: checks.rollbackExecutionPreflightReady,
      productionReady: false,
      evidence: "Node v167 rollback execution preflight contract",
      note: checks.rollbackExecutionPreflightReady
        ? "Rollback execution preflight evidence is ready for manual review only."
        : "Rollback execution preflight evidence is incomplete.",
    },
    {
      id: "production-environment-preflight",
      status: checks.productionEnvironmentPreflightReady ? "pass" : "blocked",
      readinessPasses: checks.productionEnvironmentPreflightReady,
      productionReady: false,
      evidence: "Node v168 production environment preflight checklist",
      note: checks.productionEnvironmentPreflightReady
        ? "Environment preflight evidence is ready for manual review only."
        : "Environment preflight evidence is incomplete.",
    },
    {
      id: "secret-and-digest-evidence",
      status: checks.secretSourceEvidenceConsumed && checks.artifactDigestEvidenceConsumed ? "pass" : "blocked",
      readinessPasses: checks.secretSourceEvidenceConsumed && checks.artifactDigestEvidenceConsumed,
      productionReady: false,
      evidence: "Java v59 secret source contract + mini-kv v68 digest matrix",
      note: "Secret source and digest evidence are consumed as metadata; secret values and restore execution remain blocked.",
    },
    {
      id: "execution-safety",
      status: checks.executionStillBlocked
        && checks.secretValueAccessStillBlocked
        && checks.productionDatabaseStillBlocked
        && checks.miniKvRestoreStillBlocked
        && checks.upstreamActionsStillDisabled
        ? "pass"
        : "blocked",
      readinessPasses: checks.executionStillBlocked
        && checks.secretValueAccessStillBlocked
        && checks.productionDatabaseStillBlocked
        && checks.miniKvRestoreStillBlocked
        && checks.upstreamActionsStillDisabled,
      productionReady: false,
      evidence: "Node v167/v168 checks plus runtime safety flags",
      note: "Execution remains blocked while the summary is produced.",
    },
    {
      id: "remaining-production-blockers",
      status: "blocked",
      readinessPasses: false,
      productionReady: false,
      evidence: "future production secret manager, database, IdP, and approval integration",
      note: "The stage is summarized, but real production integrations still do not exist.",
    },
  ];
}

function collectProductionBlockers(checks: Record<string, boolean>): SummaryMessage[] {
  const blockers: SummaryMessage[] = [];
  addMessage(blockers, checks.rollbackExecutionPreflightReady, "ROLLBACK_PREFLIGHT_NOT_READY", "rollback-execution-preflight-contract", "Node v167 rollback execution preflight must be ready before v169 can summarize the stage.");
  addMessage(blockers, checks.productionEnvironmentPreflightReady, "ENVIRONMENT_PREFLIGHT_NOT_READY", "production-environment-preflight-checklist", "Node v168 production environment preflight must be ready before v169 can summarize the stage.");
  addMessage(blockers, checks.executionStillBlocked, "EXECUTION_BOUNDARY_OPEN", "post-v166-readiness-summary", "v169 must not authorize rollback, restore, or production operations.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false while production blockers remain.");
  addMessage(blockers, checks.realSecretManagerConnected, "REAL_SECRET_MANAGER_NOT_CONNECTED", "future-production-integration", "A real secret manager/source integration is still required before production operations.");
  addMessage(blockers, checks.productionDatabaseConnected, "PRODUCTION_DATABASE_NOT_CONNECTED", "future-production-integration", "Production database access and approval evidence are still required before real rollback.");
  addMessage(blockers, checks.realProductionIdpConnected, "REAL_PRODUCTION_IDP_NOT_CONNECTED", "future-production-integration", "A real production IdP/JWKS verifier is still required before production operations.");
  addMessage(blockers, checks.productionRollbackApprovalConnected, "PRODUCTION_ROLLBACK_APPROVAL_NOT_CONNECTED", "future-production-integration", "A real production rollback approval workflow is still required before execution.");
  return blockers;
}

function collectWarnings(summaryState: SummaryState): SummaryMessage[] {
  return [
    {
      code: summaryState === "blocked" ? "POST_V166_SUMMARY_BLOCKED" : "POST_V166_SUMMARY_NOT_PRODUCTION_APPROVAL",
      severity: "warning",
      source: "post-v166-readiness-summary",
      message: summaryState === "blocked"
        ? "Post-v166 summary has missing input evidence."
        : "Post-v166 summary is complete as review evidence, but it is not production approval.",
    },
    {
      code: "NEW_PLAN_REQUIRED_AFTER_V169",
      severity: "warning",
      source: "post-v166-readiness-summary",
      message: "The v166-derived plan is complete after v169; future work must start from a new plan to avoid overlap.",
    },
  ];
}

function collectRecommendations(summaryState: SummaryState): SummaryMessage[] {
  return [
    {
      code: summaryState === "blocked"
        ? "FIX_POST_V166_SUMMARY_INPUTS"
        : "START_V169_DERIVED_PLAN",
      severity: "recommendation",
      source: "post-v166-readiness-summary",
      message: summaryState === "blocked"
        ? "Fix v167/v168 evidence before starting a new plan."
        : "Start a v169-derived plan with recommended parallel Java v60 plus mini-kv v69, then Node v170.",
    },
  ];
}

function addMessage(
  messages: SummaryMessage[],
  condition: boolean | undefined,
  code: string,
  source: SummaryMessage["source"],
  message: string,
): void {
  appendBlockingMessage(messages, Boolean(condition), code, source, message);
}

function renderCategory(category: SummaryCategory): string[] {
  return [
    `### ${category.id}`,
    "",
    `- Status: ${category.status}`,
    `- Readiness passes: ${category.readinessPasses}`,
    `- Production ready: ${category.productionReady}`,
    `- Evidence: ${category.evidence}`,
    `- Note: ${category.note}`,
    "",
  ];
}
