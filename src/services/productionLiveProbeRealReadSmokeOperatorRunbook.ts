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
  loadProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerification,
} from "./productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerification.js";
import type {
  ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationProfile,
  UpstreamEvidenceReference,
} from "./productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerification.js";

export interface ProductionLiveProbeRealReadSmokeOperatorRunbookProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-real-read-smoke-operator-runbook.v1";
  runbookState: "ready-for-manual-read-only-window" | "blocked";
  readyForOperatorRunbook: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  runbook: {
    runbookDigest: string;
    sourceArchiveVerificationDigest: string;
    sourceArchiveDigest: string;
    sourceVerificationState: ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationProfile["verificationState"];
    sourceArchiveState: ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationProfile["verification"]["archiveState"];
    sourceCaptureMode: ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationProfile["verification"]["captureMode"];
    upstreamEvidenceReady: boolean;
    requiredEnvironment: RequiredOperatorEnvironment;
    runtimeFileRead: false;
    automaticUpstreamStart: false;
    mutatesUpstreamState: false;
    skippedOrMixedEvidenceRemainsNonPass: boolean;
  };
  checks: {
    sourceArchiveVerificationReady: boolean;
    sourceVerificationDigestValid: boolean;
    sourceArchiveDigestValid: boolean;
    upstreamEvidenceReady: boolean;
    requiredProbeEnvDocumented: boolean;
    requiredActionsEnvDocumented: boolean;
    sourceUpstreamActionsStillDisabled: boolean;
    javaReadOnlyTargetsListed: boolean;
    miniKvReadOnlyCommandsListed: boolean;
    forbiddenJavaWritesListed: boolean;
    forbiddenMiniKvWritesListed: boolean;
    noAutomaticUpstreamStart: boolean;
    skippedOrMixedStillNonPass: boolean;
    readyForProductionOperationsStillFalse: boolean;
    readyForOperatorRunbook: boolean;
  };
  artifacts: {
    archiveVerification: {
      profileVersion: ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationProfile["profileVersion"];
      verificationDigest: string;
      verificationState: ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationProfile["verificationState"];
      readyForArchiveVerification: boolean;
      readyForProductionOperations: false;
    };
    javaEvidence: UpstreamEvidenceReference;
    miniKvEvidence: UpstreamEvidenceReference;
  };
  operatorSteps: OperatorRunbookStep[];
  readOnlyTargets: {
    java: ReadOnlyTarget[];
    miniKv: ReadOnlyTarget[];
  };
  forbiddenOperations: ForbiddenOperation[];
  summary: {
    operatorStepCount: number;
    readOnlyTargetCount: number;
    forbiddenOperationCount: number;
    runbookCheckCount: number;
    passedRunbookCheckCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: OperatorRunbookMessage[];
  warnings: OperatorRunbookMessage[];
  recommendations: OperatorRunbookMessage[];
  evidenceEndpoints: {
    productionLiveProbeRealReadSmokeOperatorRunbookJson: string;
    productionLiveProbeRealReadSmokeOperatorRunbookMarkdown: string;
    productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationJson: string;
    productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveJson: string;
  };
  nextActions: string[];
}

interface RequiredOperatorEnvironment {
  UPSTREAM_PROBES_ENABLED: true;
  UPSTREAM_ACTIONS_ENABLED: false;
  ACCESS_GUARD_ENFORCEMENT_ENABLED: true;
  NODE_AUTOMATIC_UPSTREAM_START: false;
  operatorApprovalRequired: true;
}

interface OperatorRunbookStep {
  order: number;
  title: string;
  action: string;
  expectedEvidence: string;
}

interface ReadOnlyTarget {
  project: "advanced-order-platform" | "mini-kv";
  target: string;
  kind: "http-get" | "tcp-command" | "contract-sample";
  purpose: string;
  executionOwner: "operator" | "node-read-only-probe";
  mutatesState: false;
}

interface ForbiddenOperation {
  project: "advanced-order-platform" | "mini-kv" | "orderops-node";
  operation: string;
  reason: string;
}

interface OperatorRunbookMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "archive-verification"
    | "operator-runbook"
    | "java-read-only-targets"
    | "mini-kv-read-only-targets"
    | "runtime-config";
  message: string;
}

const REQUIRED_ENVIRONMENT: RequiredOperatorEnvironment = Object.freeze({
  UPSTREAM_PROBES_ENABLED: true,
  UPSTREAM_ACTIONS_ENABLED: false,
  ACCESS_GUARD_ENFORCEMENT_ENABLED: true,
  NODE_AUTOMATIC_UPSTREAM_START: false,
  operatorApprovalRequired: true,
});

const JAVA_READ_ONLY_TARGETS: readonly ReadOnlyTarget[] = Object.freeze([
  {
    project: "advanced-order-platform",
    target: "GET /actuator/health",
    kind: "http-get",
    purpose: "Confirm the Java order platform is reachable during the operator-owned read-only window.",
    executionOwner: "node-read-only-probe",
    mutatesState: false,
  },
  {
    project: "advanced-order-platform",
    target: "GET /api/v1/ops/overview",
    kind: "http-get",
    purpose: "Read order, outbox, and failed-event counters without changing Java state.",
    executionOwner: "node-read-only-probe",
    mutatesState: false,
  },
  {
    project: "advanced-order-platform",
    target: "GET /api/v1/ops/evidence",
    kind: "http-get",
    purpose: "Read Java v49 ops evidence produced for Node control-plane verification.",
    executionOwner: "node-read-only-probe",
    mutatesState: false,
  },
  {
    project: "advanced-order-platform",
    target: "GET /api/v1/failed-events/replay-evidence-index",
    kind: "http-get",
    purpose: "Read replay evidence index only; replay execution remains forbidden.",
    executionOwner: "node-read-only-probe",
    mutatesState: false,
  },
  {
    project: "advanced-order-platform",
    target: "/contracts/ops-read-only-evidence.sample.json",
    kind: "contract-sample",
    purpose: "Keep Java v49 static evidence visible as a versioned contract reference.",
    executionOwner: "operator",
    mutatesState: false,
  },
]);

const MINI_KV_READ_ONLY_TARGETS: readonly ReadOnlyTarget[] = Object.freeze([
  {
    project: "mini-kv",
    target: "HEALTH",
    kind: "tcp-command",
    purpose: "Confirm mini-kv is reachable during the operator-owned read-only window.",
    executionOwner: "node-read-only-probe",
    mutatesState: false,
  },
  {
    project: "mini-kv",
    target: "INFOJSON",
    kind: "tcp-command",
    purpose: "Read mini-kv server and storage metadata as JSON.",
    executionOwner: "node-read-only-probe",
    mutatesState: false,
  },
  {
    project: "mini-kv",
    target: "STATSJSON",
    kind: "tcp-command",
    purpose: "Read mini-kv counters and storage stats as JSON.",
    executionOwner: "node-read-only-probe",
    mutatesState: false,
  },
  {
    project: "mini-kv",
    target: "CHECKJSON GET orderops:1",
    kind: "tcp-command",
    purpose: "Explain a read command without mutating the store.",
    executionOwner: "node-read-only-probe",
    mutatesState: false,
  },
  {
    project: "mini-kv",
    target: "fixtures/readonly/index.json",
    kind: "contract-sample",
    purpose: "Keep mini-kv v58 readonly fixture pack visible as a versioned contract reference.",
    executionOwner: "operator",
    mutatesState: false,
  },
]);

const FORBIDDEN_OPERATIONS: readonly ForbiddenOperation[] = Object.freeze([
  {
    project: "advanced-order-platform",
    operation: "POST /api/v1/orders",
    reason: "Order writes are outside the read-only smoke window.",
  },
  {
    project: "advanced-order-platform",
    operation: "POST /api/v1/failed-events/{id}/replay",
    reason: "Replay execution must stay behind a later explicit approval flow.",
  },
  {
    project: "advanced-order-platform",
    operation: "RabbitMQ replay publish",
    reason: "Message publication is a side effect and is not part of read-only evidence capture.",
  },
  {
    project: "mini-kv",
    operation: "SET / DEL / EXPIRE",
    reason: "mini-kv writes are forbidden in this operator runbook.",
  },
  {
    project: "mini-kv",
    operation: "CHECKJSON SET orderops:1 value",
    reason: "Write explanations may appear as fixtures only; runtime smoke must not execute write commands.",
  },
  {
    project: "orderops-node",
    operation: "UPSTREAM_ACTIONS_ENABLED=true",
    reason: "Node may probe read-only upstreams, but it must not enable upstream write actions.",
  },
  {
    project: "orderops-node",
    operation: "Automatically start Java or mini-kv",
    reason: "Starting upstreams is an operator-controlled step, not a Node side effect.",
  },
]);

const ENDPOINTS = Object.freeze({
  productionLiveProbeRealReadSmokeOperatorRunbookJson: "/api/v1/production/live-probe-real-read-smoke-operator-runbook",
  productionLiveProbeRealReadSmokeOperatorRunbookMarkdown: "/api/v1/production/live-probe-real-read-smoke-operator-runbook?format=markdown",
  productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationJson: "/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-archive-verification",
  productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveJson: "/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-archive",
});

export async function loadProductionLiveProbeRealReadSmokeOperatorRunbook(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeOperatorRunbookProfile> {
  const archiveVerification = await loadProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerification(input);
  const steps = createOperatorSteps(archiveVerification);
  const checks = createChecks(archiveVerification);
  checks.readyForOperatorRunbook = Object.entries(checks)
    .filter(([key]) => key !== "readyForOperatorRunbook")
    .every(([, value]) => value);
  const runbookState = checks.readyForOperatorRunbook
    ? "ready-for-manual-read-only-window"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks, archiveVerification);
  const warnings = collectWarnings(archiveVerification);
  const recommendations = collectRecommendations(runbookState);
  const runbookDigest = digestRunbook({
    profileVersion: "production-live-probe-real-read-smoke-operator-runbook.v1",
    sourceArchiveVerificationDigest: archiveVerification.verification.verificationDigest,
    sourceArchiveDigest: archiveVerification.verification.archiveDigest,
    sourceVerificationState: archiveVerification.verificationState,
    requiredEnvironment: REQUIRED_ENVIRONMENT,
    operatorSteps: steps,
    readOnlyTargets: {
      java: JAVA_READ_ONLY_TARGETS,
      miniKv: MINI_KV_READ_ONLY_TARGETS,
    },
    forbiddenOperations: FORBIDDEN_OPERATIONS,
    checks,
  });

  return {
    service: "orderops-node",
    title: "Production live probe real-read smoke operator runbook",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-real-read-smoke-operator-runbook.v1",
    runbookState,
    readyForOperatorRunbook: checks.readyForOperatorRunbook,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    runbook: {
      runbookDigest,
      sourceArchiveVerificationDigest: archiveVerification.verification.verificationDigest,
      sourceArchiveDigest: archiveVerification.verification.archiveDigest,
      sourceVerificationState: archiveVerification.verificationState,
      sourceArchiveState: archiveVerification.verification.archiveState,
      sourceCaptureMode: archiveVerification.verification.captureMode,
      upstreamEvidenceReady: archiveVerification.verification.upstreamEvidenceReady,
      requiredEnvironment: { ...REQUIRED_ENVIRONMENT },
      runtimeFileRead: false,
      automaticUpstreamStart: false,
      mutatesUpstreamState: false,
      skippedOrMixedEvidenceRemainsNonPass: archiveVerification.checks.skippedOrMixedRemainsNonPass,
    },
    checks,
    artifacts: {
      archiveVerification: {
        profileVersion: archiveVerification.profileVersion,
        verificationDigest: archiveVerification.verification.verificationDigest,
        verificationState: archiveVerification.verificationState,
        readyForArchiveVerification: archiveVerification.readyForArchiveVerification,
        readyForProductionOperations: archiveVerification.readyForProductionOperations,
      },
      javaEvidence: archiveVerification.artifacts.javaEvidence,
      miniKvEvidence: archiveVerification.artifacts.miniKvEvidence,
    },
    operatorSteps: steps,
    readOnlyTargets: {
      java: [...JAVA_READ_ONLY_TARGETS],
      miniKv: [...MINI_KV_READ_ONLY_TARGETS],
    },
    forbiddenOperations: [...FORBIDDEN_OPERATIONS],
    summary: {
      operatorStepCount: steps.length,
      readOnlyTargetCount: JAVA_READ_ONLY_TARGETS.length + MINI_KV_READ_ONLY_TARGETS.length,
      forbiddenOperationCount: FORBIDDEN_OPERATIONS.length,
      runbookCheckCount: countReportChecks(checks),
      passedRunbookCheckCount: countPassedReportChecks(checks),
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Review this runbook before opening any real read-only upstream window.",
      "If a real read-only window is approved, the operator starts Java and mini-kv manually; Node must not start them.",
      "Run Node with UPSTREAM_PROBES_ENABLED=true and UPSTREAM_ACTIONS_ENABLED=false for read-only smoke capture.",
      "Archive skipped, mixed, and pass outcomes separately; skipped or mixed evidence must remain non-pass.",
    ],
  };
}

export function renderProductionLiveProbeRealReadSmokeOperatorRunbookMarkdown(
  profile: ProductionLiveProbeRealReadSmokeOperatorRunbookProfile,
): string {
  return [
    "# Production live probe real-read smoke operator runbook",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Runbook state: ${profile.runbookState}`,
    `- Ready for operator runbook: ${profile.readyForOperatorRunbook}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Runbook",
    "",
    ...renderEntries(profile.runbook),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Operator Steps",
    "",
    ...renderOperatorSteps(profile.operatorSteps),
    "",
    "## Java Read-Only Targets",
    "",
    ...renderReadOnlyTargets(profile.readOnlyTargets.java),
    "",
    "## mini-kv Read-Only Targets",
    "",
    ...renderReadOnlyTargets(profile.readOnlyTargets.miniKv),
    "",
    "## Forbidden Operations",
    "",
    ...renderForbiddenOperations(profile.forbiddenOperations),
    "",
    "## Artifacts",
    "",
    "### Archive Verification",
    "",
    ...renderEntries(profile.artifacts.archiveVerification),
    "",
    "### Java Evidence",
    "",
    ...renderEntries(profile.artifacts.javaEvidence),
    "",
    "### mini-kv Evidence",
    "",
    ...renderEntries(profile.artifacts.miniKvEvidence),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No operator runbook blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No operator runbook warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No operator runbook recommendations."),
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

function createOperatorSteps(
  archiveVerification: ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationProfile,
): OperatorRunbookStep[] {
  return [
    {
      order: 1,
      title: "Review Node archive verification",
      action: `Confirm source verification state is ${archiveVerification.verificationState} and archive digest is ${archiveVerification.verification.archiveDigest}.`,
      expectedEvidence: "Operator records the v152 archive verification digest before touching upstream runtimes.",
    },
    {
      order: 2,
      title: "Open a manual read-only window",
      action: "Operator manually starts Java and mini-kv only after approving the read-only window.",
      expectedEvidence: "Node does not start or stop either upstream process.",
    },
    {
      order: 3,
      title: "Configure Node probes",
      action: "Run Node with UPSTREAM_PROBES_ENABLED=true and UPSTREAM_ACTIONS_ENABLED=false.",
      expectedEvidence: "Runtime config shows read-only probes enabled while upstream actions remain disabled.",
    },
    {
      order: 4,
      title: "Capture read-only evidence",
      action: "Probe only the listed Java GET endpoints and mini-kv read-only commands.",
      expectedEvidence: "Captured evidence contains read-only target results and no write operation results.",
    },
    {
      order: 5,
      title: "Archive the outcome",
      action: "Archive pass, mixed, or skipped results without promoting mixed/skipped evidence.",
      expectedEvidence: "Result archive keeps readyForProductionOperations=false unless a later explicit production gate changes it.",
    },
  ];
}

function createChecks(
  archiveVerification: ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationProfile,
): ProductionLiveProbeRealReadSmokeOperatorRunbookProfile["checks"] {
  return {
    sourceArchiveVerificationReady: archiveVerification.readyForArchiveVerification,
    sourceVerificationDigestValid: /^[a-f0-9]{64}$/.test(archiveVerification.verification.verificationDigest),
    sourceArchiveDigestValid: /^[a-f0-9]{64}$/.test(archiveVerification.verification.archiveDigest),
    upstreamEvidenceReady: archiveVerification.verification.upstreamEvidenceReady,
    requiredProbeEnvDocumented: REQUIRED_ENVIRONMENT.UPSTREAM_PROBES_ENABLED === true,
    requiredActionsEnvDocumented: REQUIRED_ENVIRONMENT.UPSTREAM_ACTIONS_ENABLED === false,
    sourceUpstreamActionsStillDisabled: archiveVerification.checks.upstreamActionsStillDisabled,
    javaReadOnlyTargetsListed: JAVA_READ_ONLY_TARGETS.some((target) => target.target === "GET /api/v1/ops/evidence")
      && JAVA_READ_ONLY_TARGETS.every((target) => target.mutatesState === false),
    miniKvReadOnlyCommandsListed: MINI_KV_READ_ONLY_TARGETS.some((target) => target.target === "INFOJSON")
      && MINI_KV_READ_ONLY_TARGETS.some((target) => target.target === "STATSJSON")
      && MINI_KV_READ_ONLY_TARGETS.every((target) => target.mutatesState === false),
    forbiddenJavaWritesListed: FORBIDDEN_OPERATIONS.some((operation) => operation.operation === "POST /api/v1/failed-events/{id}/replay")
      && FORBIDDEN_OPERATIONS.some((operation) => operation.operation === "POST /api/v1/orders"),
    forbiddenMiniKvWritesListed: FORBIDDEN_OPERATIONS.some((operation) => operation.operation === "SET / DEL / EXPIRE")
      && FORBIDDEN_OPERATIONS.some((operation) => operation.operation === "CHECKJSON SET orderops:1 value"),
    noAutomaticUpstreamStart: archiveVerification.checks.noAutomaticUpstreamStart
      && REQUIRED_ENVIRONMENT.NODE_AUTOMATIC_UPSTREAM_START === false,
    skippedOrMixedStillNonPass: archiveVerification.checks.skippedOrMixedRemainsNonPass,
    readyForProductionOperationsStillFalse: archiveVerification.readyForProductionOperations === false,
    readyForOperatorRunbook: false,
  };
}

function collectProductionBlockers(
  checks: ProductionLiveProbeRealReadSmokeOperatorRunbookProfile["checks"],
  archiveVerification: ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationProfile,
): OperatorRunbookMessage[] {
  const blockers: OperatorRunbookMessage[] = [];
  addMessage(blockers, checks.sourceArchiveVerificationReady, "SOURCE_ARCHIVE_VERIFICATION_NOT_READY", "archive-verification", "v152 archive verification must be ready before v153 runbook can pass.");
  addMessage(blockers, checks.sourceVerificationDigestValid, "SOURCE_VERIFICATION_DIGEST_INVALID", "archive-verification", "Source verification digest must be a valid sha256 hex digest.");
  addMessage(blockers, checks.sourceArchiveDigestValid, "SOURCE_ARCHIVE_DIGEST_INVALID", "archive-verification", "Source archive digest must be a valid sha256 hex digest.");
  addMessage(blockers, checks.upstreamEvidenceReady, "UPSTREAM_EVIDENCE_NOT_READY", "archive-verification", "Java v49 and mini-kv v58 evidence references must be ready.");
  addMessage(blockers, checks.sourceUpstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.javaReadOnlyTargetsListed, "JAVA_READ_ONLY_TARGETS_MISSING", "java-read-only-targets", "Java read-only GET targets must be listed.");
  addMessage(blockers, checks.miniKvReadOnlyCommandsListed, "MINI_KV_READ_ONLY_COMMANDS_MISSING", "mini-kv-read-only-targets", "mini-kv read-only commands must be listed.");
  addMessage(blockers, checks.forbiddenJavaWritesListed, "JAVA_WRITE_FORBIDDEN_LIST_MISSING", "operator-runbook", "Java write and replay operations must be explicitly forbidden.");
  addMessage(blockers, checks.forbiddenMiniKvWritesListed, "MINI_KV_WRITE_FORBIDDEN_LIST_MISSING", "operator-runbook", "mini-kv write commands must be explicitly forbidden.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "operator-runbook", "Node must not automatically start Java or mini-kv.");
  addMessage(blockers, checks.skippedOrMixedStillNonPass, "SKIPPED_OR_MIXED_PROMOTED", "archive-verification", "Skipped or mixed evidence must remain non-pass.");
  addMessage(blockers, checks.readyForProductionOperationsStillFalse, "PRODUCTION_OPERATIONS_UNLOCKED", "runtime-config", "Runbook must not unlock production operations.");

  if (archiveVerification.verificationState === "blocked") {
    blockers.push({
      code: "SOURCE_VERIFICATION_BLOCKED",
      severity: "blocker",
      source: "archive-verification",
      message: "Source archive verification is blocked and must be fixed before opening a read-only window.",
    });
  }

  return blockers;
}

function collectWarnings(
  archiveVerification: ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationProfile,
): OperatorRunbookMessage[] {
  return [
    {
      code: archiveVerification.verificationState === "verified-production-pass-archive"
        ? "SOURCE_PASS_ARCHIVE_VERIFIED"
        : "SOURCE_NON_PASS_ARCHIVE_VERIFIED",
      severity: "warning",
      source: "archive-verification",
      message: archiveVerification.verificationState === "verified-production-pass-archive"
        ? "Source archive verifies as pass evidence, but this runbook still keeps production operations closed."
        : "Source archive verifies as non-pass evidence; the next window is only a manual read-only smoke.",
    },
    {
      code: "OPERATOR_OWNS_UPSTREAM_START",
      severity: "warning",
      source: "operator-runbook",
      message: "Java and mini-kv startup remains an operator step; Node exposes the checklist but does not start them.",
    },
  ];
}

function collectRecommendations(
  runbookState: ProductionLiveProbeRealReadSmokeOperatorRunbookProfile["runbookState"],
): OperatorRunbookMessage[] {
  return [
    {
      code: runbookState === "ready-for-manual-read-only-window"
        ? "READY_FOR_READ_ONLY_WINDOW_REVIEW"
        : "FIX_RUNBOOK_BLOCKERS_FIRST",
      severity: "recommendation",
      source: "operator-runbook",
      message: runbookState === "ready-for-manual-read-only-window"
        ? "Use this runbook as the manual checklist before any real Java or mini-kv startup."
        : "Resolve blockers before starting upstreams or enabling probes.",
    },
  ];
}

function renderOperatorSteps(steps: readonly OperatorRunbookStep[]): string[] {
  return steps.map((step) => [
    `- ${step.order}. ${step.title}`,
    `  - Action: ${step.action}`,
    `  - Expected evidence: ${step.expectedEvidence}`,
  ].join("\n"));
}

function renderReadOnlyTargets(targets: readonly ReadOnlyTarget[]): string[] {
  return targets.map((target) => [
    `- ${target.project}: ${target.target}`,
    `  - Kind: ${target.kind}`,
    `  - Owner: ${target.executionOwner}`,
    `  - Mutates state: ${target.mutatesState}`,
    `  - Purpose: ${target.purpose}`,
  ].join("\n"));
}

function renderForbiddenOperations(operations: readonly ForbiddenOperation[]): string[] {
  return operations.map((operation) => [
    `- ${operation.project}: ${operation.operation}`,
    `  - Reason: ${operation.reason}`,
  ].join("\n"));
}

function addMessage(
  messages: OperatorRunbookMessage[],
  condition: boolean,
  code: string,
  source: OperatorRunbookMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function digestRunbook(value: unknown): string {
  return sha256StableJson(value);
}
