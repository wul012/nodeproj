import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import type { ProductionConnectionDryRunApprovalLedger } from "./productionConnectionDryRunApprovalLedger.js";
import {
  loadProductionLiveProbeRealReadSmokeOperatorRunbook,
} from "./productionLiveProbeRealReadSmokeOperatorRunbook.js";
import type {
  ProductionLiveProbeRealReadSmokeOperatorRunbookProfile,
} from "./productionLiveProbeRealReadSmokeOperatorRunbook.js";

export interface ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-real-read-smoke-operator-runbook-verification.v1";
  verificationState: "verified-operator-runbook" | "blocked";
  readyForOperatorRunbookVerification: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  verification: {
    verificationDigest: string;
    runbookDigest: string;
    expectedRunbookDigest: string;
    runbookProfileVersion: ProductionLiveProbeRealReadSmokeOperatorRunbookProfile["profileVersion"];
    runbookState: ProductionLiveProbeRealReadSmokeOperatorRunbookProfile["runbookState"];
    sourceArchiveVerificationDigest: string;
    sourceArchiveDigest: string;
    operatorStepCount: number;
    readOnlyTargetCount: number;
    forbiddenOperationCount: number;
    automaticUpstreamStart: false;
    upstreamActionsRequired: false;
    readyForProductionOperations: false;
  };
  checks: {
    sourceRunbookReady: boolean;
    runbookDigestValid: boolean;
    runbookDigestMatches: boolean;
    runbookProfileVersionValid: boolean;
    sourceArchiveVerificationDigestValid: boolean;
    sourceArchiveDigestValid: boolean;
    requiredEnvironmentValid: boolean;
    operatorStepCountMatches: boolean;
    operatorStepOrderValid: boolean;
    operatorStepTitlesPresent: boolean;
    javaTargetsReadOnlyOnly: boolean;
    javaTargetsIncludeOpsEvidence: boolean;
    miniKvTargetsReadOnlyOnly: boolean;
    miniKvTargetsIncludeSmokeCommands: boolean;
    forbiddenJavaReplayPostListed: boolean;
    forbiddenJavaOrderWriteListed: boolean;
    forbiddenMiniKvWritesListed: boolean;
    forbiddenUpstreamActionsListed: boolean;
    forbiddenAutomaticUpstreamStartListed: boolean;
    noAutomaticUpstreamStart: boolean;
    upstreamActionsStayDisabled: boolean;
    readyForProductionOperationsStillFalse: boolean;
    readyForOperatorRunbookVerification: boolean;
  };
  artifacts: {
    operatorRunbook: {
      profileVersion: ProductionLiveProbeRealReadSmokeOperatorRunbookProfile["profileVersion"];
      runbookDigest: string;
      runbookState: ProductionLiveProbeRealReadSmokeOperatorRunbookProfile["runbookState"];
      readyForOperatorRunbook: boolean;
      readyForProductionOperations: false;
    };
    sourceArchiveVerification: ProductionLiveProbeRealReadSmokeOperatorRunbookProfile["artifacts"]["archiveVerification"];
  };
  verifiedOperatorSteps: VerifiedItem[];
  verifiedReadOnlyTargets: {
    java: VerifiedItem[];
    miniKv: VerifiedItem[];
  };
  verifiedForbiddenOperations: VerifiedItem[];
  summary: {
    verificationCheckCount: number;
    passedVerificationCheckCount: number;
    operatorStepCount: number;
    readOnlyTargetCount: number;
    forbiddenOperationCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: OperatorRunbookVerificationMessage[];
  warnings: OperatorRunbookVerificationMessage[];
  recommendations: OperatorRunbookVerificationMessage[];
  evidenceEndpoints: {
    productionLiveProbeRealReadSmokeOperatorRunbookVerificationJson: string;
    productionLiveProbeRealReadSmokeOperatorRunbookVerificationMarkdown: string;
    productionLiveProbeRealReadSmokeOperatorRunbookJson: string;
    productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationJson: string;
  };
  nextActions: string[];
}

interface VerifiedItem {
  name: string;
  verified: boolean;
  evidence: string;
}

interface OperatorRunbookVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "operator-runbook"
    | "runbook-digest"
    | "operator-steps"
    | "read-only-targets"
    | "forbidden-operations"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionLiveProbeRealReadSmokeOperatorRunbookVerificationJson: "/api/v1/production/live-probe-real-read-smoke-operator-runbook-verification",
  productionLiveProbeRealReadSmokeOperatorRunbookVerificationMarkdown: "/api/v1/production/live-probe-real-read-smoke-operator-runbook-verification?format=markdown",
  productionLiveProbeRealReadSmokeOperatorRunbookJson: "/api/v1/production/live-probe-real-read-smoke-operator-runbook",
  productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationJson: "/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-archive-verification",
});

export async function loadProductionLiveProbeRealReadSmokeOperatorRunbookVerification(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile> {
  const runbook = await loadProductionLiveProbeRealReadSmokeOperatorRunbook(input);
  const expectedRunbookDigest = digestRunbook(createRunbookDigestInput(runbook));
  const checks = createChecks(runbook, expectedRunbookDigest);
  checks.readyForOperatorRunbookVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForOperatorRunbookVerification")
    .every(([, value]) => value);
  const verificationState = checks.readyForOperatorRunbookVerification
    ? "verified-operator-runbook"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(runbook, verificationState);
  const recommendations = collectRecommendations(verificationState);
  const verificationDigest = digestVerification({
    profileVersion: "production-live-probe-real-read-smoke-operator-runbook-verification.v1",
    runbookDigest: runbook.runbook.runbookDigest,
    expectedRunbookDigest,
    verificationState,
    runbookState: runbook.runbookState,
    sourceArchiveVerificationDigest: runbook.runbook.sourceArchiveVerificationDigest,
    checks,
  });

  return {
    service: "orderops-node",
    title: "Production live probe real-read smoke operator runbook verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-real-read-smoke-operator-runbook-verification.v1",
    verificationState,
    readyForOperatorRunbookVerification: checks.readyForOperatorRunbookVerification,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    verification: {
      verificationDigest,
      runbookDigest: runbook.runbook.runbookDigest,
      expectedRunbookDigest,
      runbookProfileVersion: runbook.profileVersion,
      runbookState: runbook.runbookState,
      sourceArchiveVerificationDigest: runbook.runbook.sourceArchiveVerificationDigest,
      sourceArchiveDigest: runbook.runbook.sourceArchiveDigest,
      operatorStepCount: runbook.operatorSteps.length,
      readOnlyTargetCount: runbook.readOnlyTargets.java.length + runbook.readOnlyTargets.miniKv.length,
      forbiddenOperationCount: runbook.forbiddenOperations.length,
      automaticUpstreamStart: false,
      upstreamActionsRequired: false,
      readyForProductionOperations: false,
    },
    checks,
    artifacts: {
      operatorRunbook: {
        profileVersion: runbook.profileVersion,
        runbookDigest: runbook.runbook.runbookDigest,
        runbookState: runbook.runbookState,
        readyForOperatorRunbook: runbook.readyForOperatorRunbook,
        readyForProductionOperations: runbook.readyForProductionOperations,
      },
      sourceArchiveVerification: runbook.artifacts.archiveVerification,
    },
    verifiedOperatorSteps: createVerifiedOperatorSteps(runbook),
    verifiedReadOnlyTargets: {
      java: createVerifiedJavaTargets(runbook),
      miniKv: createVerifiedMiniKvTargets(runbook),
    },
    verifiedForbiddenOperations: createVerifiedForbiddenOperations(runbook),
    summary: {
      verificationCheckCount: countReportChecks(checks),
      passedVerificationCheckCount: countPassedReportChecks(checks),
      operatorStepCount: runbook.operatorSteps.length,
      readOnlyTargetCount: runbook.readOnlyTargets.java.length + runbook.readOnlyTargets.miniKv.length,
      forbiddenOperationCount: runbook.forbiddenOperations.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Use this verification before packaging the v155 read-only window readiness packet.",
      "Keep Java and mini-kv startup manual; this verification does not open a live probe window.",
      "If any runbook digest, step, target, or forbidden-operation check fails, regenerate or fix the v153 runbook first.",
    ],
  };
}

export function renderProductionLiveProbeRealReadSmokeOperatorRunbookVerificationMarkdown(
  profile: ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile,
): string {
  return [
    "# Production live probe real-read smoke operator runbook verification",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Verification state: ${profile.verificationState}`,
    `- Ready for operator runbook verification: ${profile.readyForOperatorRunbookVerification}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Verification",
    "",
    ...renderEntries(profile.verification),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Verified Operator Steps",
    "",
    ...renderVerifiedItems(profile.verifiedOperatorSteps),
    "",
    "## Verified Java Read-Only Targets",
    "",
    ...renderVerifiedItems(profile.verifiedReadOnlyTargets.java),
    "",
    "## Verified mini-kv Read-Only Targets",
    "",
    ...renderVerifiedItems(profile.verifiedReadOnlyTargets.miniKv),
    "",
    "## Verified Forbidden Operations",
    "",
    ...renderVerifiedItems(profile.verifiedForbiddenOperations),
    "",
    "## Artifacts",
    "",
    "### Operator Runbook",
    "",
    ...renderEntries(profile.artifacts.operatorRunbook),
    "",
    "### Source Archive Verification",
    "",
    ...renderEntries(profile.artifacts.sourceArchiveVerification),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No operator runbook verification blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No operator runbook verification warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No operator runbook verification recommendations."),
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

function createRunbookDigestInput(runbook: ProductionLiveProbeRealReadSmokeOperatorRunbookProfile): object {
  return {
    profileVersion: runbook.profileVersion,
    sourceArchiveVerificationDigest: runbook.runbook.sourceArchiveVerificationDigest,
    sourceArchiveDigest: runbook.runbook.sourceArchiveDigest,
    sourceVerificationState: runbook.runbook.sourceVerificationState,
    requiredEnvironment: runbook.runbook.requiredEnvironment,
    operatorSteps: runbook.operatorSteps,
    readOnlyTargets: runbook.readOnlyTargets,
    forbiddenOperations: runbook.forbiddenOperations,
    checks: runbook.checks,
  };
}

function createChecks(
  runbook: ProductionLiveProbeRealReadSmokeOperatorRunbookProfile,
  expectedRunbookDigest: string,
): ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile["checks"] {
  return {
    sourceRunbookReady: runbook.readyForOperatorRunbook,
    runbookDigestValid: /^[a-f0-9]{64}$/.test(runbook.runbook.runbookDigest),
    runbookDigestMatches: runbook.runbook.runbookDigest === expectedRunbookDigest,
    runbookProfileVersionValid: runbook.profileVersion === "production-live-probe-real-read-smoke-operator-runbook.v1",
    sourceArchiveVerificationDigestValid: /^[a-f0-9]{64}$/.test(runbook.runbook.sourceArchiveVerificationDigest),
    sourceArchiveDigestValid: /^[a-f0-9]{64}$/.test(runbook.runbook.sourceArchiveDigest),
    requiredEnvironmentValid: runbook.runbook.requiredEnvironment.UPSTREAM_PROBES_ENABLED === true
      && runbook.runbook.requiredEnvironment.UPSTREAM_ACTIONS_ENABLED === false
      && runbook.runbook.requiredEnvironment.NODE_AUTOMATIC_UPSTREAM_START === false
      && runbook.runbook.requiredEnvironment.operatorApprovalRequired === true,
    operatorStepCountMatches: runbook.operatorSteps.length === 5
      && runbook.summary.operatorStepCount === 5,
    operatorStepOrderValid: runbook.operatorSteps.map((step) => step.order).join(",") === "1,2,3,4,5",
    operatorStepTitlesPresent: hasAllOperatorStepTitles(runbook),
    javaTargetsReadOnlyOnly: runbook.readOnlyTargets.java.every((target) => target.mutatesState === false
      && (target.kind === "contract-sample" || target.target.startsWith("GET ")))
      && runbook.readOnlyTargets.java.every((target) => !target.target.includes("POST ")),
    javaTargetsIncludeOpsEvidence: runbook.readOnlyTargets.java.some((target) => target.target === "GET /api/v1/ops/evidence")
      && runbook.readOnlyTargets.java.some((target) => target.target === "GET /api/v1/failed-events/replay-evidence-index"),
    miniKvTargetsReadOnlyOnly: runbook.readOnlyTargets.miniKv.every((target) => target.mutatesState === false)
      && runbook.readOnlyTargets.miniKv.every((target) => !/^SET |^DEL |^EXPIRE /.test(target.target)),
    miniKvTargetsIncludeSmokeCommands: ["HEALTH", "INFOJSON", "STATSJSON", "CHECKJSON GET orderops:1"]
      .every((expected) => runbook.readOnlyTargets.miniKv.some((target) => target.target === expected)),
    forbiddenJavaReplayPostListed: runbook.forbiddenOperations.some((operation) => operation.operation === "POST /api/v1/failed-events/{id}/replay"),
    forbiddenJavaOrderWriteListed: runbook.forbiddenOperations.some((operation) => operation.operation === "POST /api/v1/orders"),
    forbiddenMiniKvWritesListed: runbook.forbiddenOperations.some((operation) => operation.operation === "SET / DEL / EXPIRE")
      && runbook.forbiddenOperations.some((operation) => operation.operation === "CHECKJSON SET orderops:1 value"),
    forbiddenUpstreamActionsListed: runbook.forbiddenOperations.some((operation) => operation.operation === "UPSTREAM_ACTIONS_ENABLED=true"),
    forbiddenAutomaticUpstreamStartListed: runbook.forbiddenOperations.some((operation) => operation.operation === "Automatically start Java or mini-kv"),
    noAutomaticUpstreamStart: runbook.runbook.automaticUpstreamStart === false
      && runbook.checks.noAutomaticUpstreamStart,
    upstreamActionsStayDisabled: runbook.runbook.requiredEnvironment.UPSTREAM_ACTIONS_ENABLED === false
      && runbook.checks.sourceUpstreamActionsStillDisabled,
    readyForProductionOperationsStillFalse: runbook.readyForProductionOperations === false,
    readyForOperatorRunbookVerification: false,
  };
}

function hasAllOperatorStepTitles(runbook: ProductionLiveProbeRealReadSmokeOperatorRunbookProfile): boolean {
  const titles = runbook.operatorSteps.map((step) => step.title);
  return [
    "Review Node archive verification",
    "Open a manual read-only window",
    "Configure Node probes",
    "Capture read-only evidence",
    "Archive the outcome",
  ].every((title) => titles.includes(title));
}

function createVerifiedOperatorSteps(runbook: ProductionLiveProbeRealReadSmokeOperatorRunbookProfile): VerifiedItem[] {
  return runbook.operatorSteps.map((step) => ({
    name: `${step.order}. ${step.title}`,
    verified: step.order >= 1
      && step.order <= 5
      && step.action.length > 0
      && step.expectedEvidence.length > 0,
    evidence: step.expectedEvidence,
  }));
}

function createVerifiedJavaTargets(runbook: ProductionLiveProbeRealReadSmokeOperatorRunbookProfile): VerifiedItem[] {
  return runbook.readOnlyTargets.java.map((target) => ({
    name: target.target,
    verified: target.mutatesState === false
      && (target.kind === "contract-sample" || target.target.startsWith("GET ")),
    evidence: target.purpose,
  }));
}

function createVerifiedMiniKvTargets(runbook: ProductionLiveProbeRealReadSmokeOperatorRunbookProfile): VerifiedItem[] {
  return runbook.readOnlyTargets.miniKv.map((target) => ({
    name: target.target,
    verified: target.mutatesState === false
      && !/^SET |^DEL |^EXPIRE /.test(target.target),
    evidence: target.purpose,
  }));
}

function createVerifiedForbiddenOperations(runbook: ProductionLiveProbeRealReadSmokeOperatorRunbookProfile): VerifiedItem[] {
  return runbook.forbiddenOperations.map((operation) => ({
    name: `${operation.project}: ${operation.operation}`,
    verified: operation.reason.length > 0,
    evidence: operation.reason,
  }));
}

function collectProductionBlockers(
  checks: ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile["checks"],
): OperatorRunbookVerificationMessage[] {
  const blockers: OperatorRunbookVerificationMessage[] = [];
  addMessage(blockers, checks.sourceRunbookReady, "SOURCE_RUNBOOK_NOT_READY", "operator-runbook", "v153 operator runbook must be ready before v154 verification can pass.");
  addMessage(blockers, checks.runbookDigestValid, "RUNBOOK_DIGEST_INVALID", "runbook-digest", "Runbook digest must be a valid sha256 hex digest.");
  addMessage(blockers, checks.runbookDigestMatches, "RUNBOOK_DIGEST_MISMATCH", "runbook-digest", "Recomputed runbook digest must match the v153 runbook digest.");
  addMessage(blockers, checks.runbookProfileVersionValid, "RUNBOOK_PROFILE_VERSION_INVALID", "operator-runbook", "Runbook profile version must match v153.");
  addMessage(blockers, checks.sourceArchiveVerificationDigestValid, "SOURCE_ARCHIVE_VERIFICATION_DIGEST_INVALID", "runbook-digest", "Source archive verification digest must be valid.");
  addMessage(blockers, checks.sourceArchiveDigestValid, "SOURCE_ARCHIVE_DIGEST_INVALID", "runbook-digest", "Source archive digest must be valid.");
  addMessage(blockers, checks.requiredEnvironmentValid, "REQUIRED_ENVIRONMENT_INVALID", "runtime-config", "Runbook must require probes=true, actions=false, approval, and no automatic upstream start.");
  addMessage(blockers, checks.operatorStepCountMatches, "OPERATOR_STEP_COUNT_MISMATCH", "operator-steps", "Runbook must contain exactly five operator steps.");
  addMessage(blockers, checks.operatorStepOrderValid, "OPERATOR_STEP_ORDER_INVALID", "operator-steps", "Operator steps must be ordered 1 through 5.");
  addMessage(blockers, checks.operatorStepTitlesPresent, "OPERATOR_STEP_TITLE_MISSING", "operator-steps", "All expected operator step titles must be present.");
  addMessage(blockers, checks.javaTargetsReadOnlyOnly, "JAVA_TARGETS_NOT_READ_ONLY", "read-only-targets", "Java targets must be GET or contract sample only.");
  addMessage(blockers, checks.javaTargetsIncludeOpsEvidence, "JAVA_OPS_EVIDENCE_TARGET_MISSING", "read-only-targets", "Java ops evidence and replay evidence index targets must be listed.");
  addMessage(blockers, checks.miniKvTargetsReadOnlyOnly, "MINI_KV_TARGETS_NOT_READ_ONLY", "read-only-targets", "mini-kv targets must not contain write commands.");
  addMessage(blockers, checks.miniKvTargetsIncludeSmokeCommands, "MINI_KV_SMOKE_COMMAND_MISSING", "read-only-targets", "mini-kv HEALTH, INFOJSON, STATSJSON, and CHECKJSON GET targets must be listed.");
  addMessage(blockers, checks.forbiddenJavaReplayPostListed, "JAVA_REPLAY_POST_NOT_FORBIDDEN", "forbidden-operations", "Java replay POST must be explicitly forbidden.");
  addMessage(blockers, checks.forbiddenJavaOrderWriteListed, "JAVA_ORDER_WRITE_NOT_FORBIDDEN", "forbidden-operations", "Java order write must be explicitly forbidden.");
  addMessage(blockers, checks.forbiddenMiniKvWritesListed, "MINI_KV_WRITES_NOT_FORBIDDEN", "forbidden-operations", "mini-kv write commands must be explicitly forbidden.");
  addMessage(blockers, checks.forbiddenUpstreamActionsListed, "UPSTREAM_ACTIONS_TRUE_NOT_FORBIDDEN", "forbidden-operations", "UPSTREAM_ACTIONS_ENABLED=true must be explicitly forbidden.");
  addMessage(blockers, checks.forbiddenAutomaticUpstreamStartListed, "AUTO_START_NOT_FORBIDDEN", "forbidden-operations", "Automatic Java / mini-kv startup must be explicitly forbidden.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_ALLOWED", "operator-runbook", "Runbook must keep automatic upstream start disabled.");
  addMessage(blockers, checks.upstreamActionsStayDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "Runbook must keep upstream actions disabled.");
  addMessage(blockers, checks.readyForProductionOperationsStillFalse, "PRODUCTION_OPERATIONS_UNLOCKED", "runtime-config", "Verification must not unlock production operations.");
  return blockers;
}

function collectWarnings(
  runbook: ProductionLiveProbeRealReadSmokeOperatorRunbookProfile,
  verificationState: ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile["verificationState"],
): OperatorRunbookVerificationMessage[] {
  return [
    {
      code: verificationState === "verified-operator-runbook"
        ? "RUNBOOK_VERIFIED"
        : "RUNBOOK_VERIFICATION_BLOCKED",
      severity: "warning",
      source: "operator-runbook",
      message: verificationState === "verified-operator-runbook"
        ? "The operator runbook is verified for a manual read-only window, not for production writes."
        : "The operator runbook cannot be used until verification blockers are cleared.",
    },
    {
      code: runbook.runbook.sourceVerificationState === "verified-production-pass-archive"
        ? "SOURCE_ARCHIVE_PASS"
        : "SOURCE_ARCHIVE_NON_PASS",
      severity: "warning",
      source: "operator-runbook",
      message: runbook.runbook.sourceVerificationState === "verified-production-pass-archive"
        ? "Source archive is pass evidence, but production operations remain separately gated."
        : "Source archive remains non-pass evidence; this is still a manual read-only window checklist.",
    },
  ];
}

function collectRecommendations(
  verificationState: ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile["verificationState"],
): OperatorRunbookVerificationMessage[] {
  return [
    {
      code: verificationState === "verified-operator-runbook"
        ? "PROCEED_TO_READ_ONLY_WINDOW_PACKET"
        : "FIX_RUNBOOK_VERIFICATION_BLOCKERS",
      severity: "recommendation",
      source: "operator-runbook",
      message: verificationState === "verified-operator-runbook"
        ? "Proceed to v155 readiness packet packaging without starting Java or mini-kv automatically."
        : "Fix digest, step, target, or forbidden-operation drift before packaging v155.",
    },
  ];
}

function renderVerifiedItems(items: VerifiedItem[]): string[] {
  if (items.length === 0) {
    return ["- No verified items."];
  }

  return items.map((item) => `- ${item.name}: verified=${item.verified}; evidence=${item.evidence}`);
}

function addMessage(
  messages: OperatorRunbookVerificationMessage[],
  condition: boolean,
  code: string,
  source: OperatorRunbookVerificationMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function digestRunbook(value: unknown): string {
  return sha256StableJson(value);
}

function digestVerification(value: unknown): string {
  return sha256StableJson(value);
}
