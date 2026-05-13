import {
  countPassedReportChecks,
  countReportChecks,
  formatValue,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import {
  loadProductionLiveProbeRealReadSmokeExecutionRequest,
} from "./productionLiveProbeRealReadSmokeExecutionRequest.js";
import {
  loadProductionLiveProbeRealReadSmokeReleaseEvidenceGate,
} from "./productionLiveProbeRealReadSmokeReleaseEvidenceGate.js";
import {
  loadProductionLiveProbeRealReadSmokeResultImporter,
} from "./productionLiveProbeRealReadSmokeResultImporter.js";
import type { ProductionConnectionDryRunApprovalLedger } from "./productionConnectionDryRunApprovalLedger.js";

export interface ProductionLiveProbeRealReadSmokeDryRunCommandPackageProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-real-read-smoke-dry-run-command-package.v1";
  packageState: "ready-for-operator-review" | "blocked";
  readyForDryRunPackage: boolean;
  readyForRealPassCapture: false;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  package: {
    packageDigest: string;
    executionRequestDigest: string;
    resultImportDigest: string;
    releaseEvidenceGateDigest: string;
    releaseGateDecision: "production-pass-evidence-ready" | "not-production-pass-evidence" | "blocked";
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
    dryRunOnly: true;
    startsJavaAutomatically: false;
    startsMiniKvAutomatically: false;
    mutatesUpstreamState: false;
  };
  operatorSteps: ProductionLiveProbeDryRunCommandStep[];
  checks: {
    executionRequestReady: boolean;
    executionRequestDigestValid: boolean;
    resultImporterReady: boolean;
    resultImportDigestValid: boolean;
    releaseEvidenceGateReady: boolean;
    releaseEvidenceGateDigestValid: boolean;
    releaseGateStillNotProductionPass: boolean;
    upstreamActionsStillDisabled: boolean;
    startsNoUpstreamsAutomatically: boolean;
    dryRunPackageOnly: boolean;
    readyForDryRunPackage: boolean;
  };
  summary: {
    operatorStepCount: number;
    manualStepCount: number;
    nodeStepCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ProductionLiveProbeDryRunCommandPackageMessage[];
  warnings: ProductionLiveProbeDryRunCommandPackageMessage[];
  recommendations: ProductionLiveProbeDryRunCommandPackageMessage[];
  evidenceEndpoints: {
    productionLiveProbeRealReadSmokeDryRunCommandPackageJson: string;
    productionLiveProbeRealReadSmokeDryRunCommandPackageMarkdown: string;
    productionLiveProbeRealReadSmokeExecutionRequestJson: string;
    productionLiveProbeRealReadSmokeResultImporterJson: string;
    productionLiveProbeRealReadSmokeReleaseEvidenceGateJson: string;
  };
  nextActions: string[];
}

export interface ProductionLiveProbeDryRunCommandStep {
  id:
    | "review-execution-request"
    | "review-result-importer"
    | "review-release-evidence-gate"
    | "confirm-read-only-window-requirements"
    | "prepare-manual-upstream-start"
    | "defer-real-pass-capture";
  owner: "node" | "operator";
  status: "ready" | "manual-required" | "blocked";
  command: string;
  evidence: string;
  note: string;
}

export interface ProductionLiveProbeDryRunCommandPackageMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: "dry-run-command-package" | "execution-request" | "result-importer" | "release-evidence-gate" | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionLiveProbeRealReadSmokeDryRunCommandPackageJson: "/api/v1/production/live-probe-real-read-smoke-dry-run-command-package",
  productionLiveProbeRealReadSmokeDryRunCommandPackageMarkdown: "/api/v1/production/live-probe-real-read-smoke-dry-run-command-package?format=markdown",
  productionLiveProbeRealReadSmokeExecutionRequestJson: "/api/v1/production/live-probe-real-read-smoke-execution-request",
  productionLiveProbeRealReadSmokeResultImporterJson: "/api/v1/production/live-probe-real-read-smoke-result-importer",
  productionLiveProbeRealReadSmokeReleaseEvidenceGateJson: "/api/v1/production/live-probe-real-read-smoke-release-evidence-gate",
});

export async function loadProductionLiveProbeRealReadSmokeDryRunCommandPackage(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeDryRunCommandPackageProfile> {
  const executionRequest = await loadProductionLiveProbeRealReadSmokeExecutionRequest(input);
  const resultImporter = await loadProductionLiveProbeRealReadSmokeResultImporter(input);
  const releaseGate = await loadProductionLiveProbeRealReadSmokeReleaseEvidenceGate(input);
  const checks = {
    executionRequestReady: executionRequest.readyForOperatorReview,
    executionRequestDigestValid: /^[a-f0-9]{64}$/.test(executionRequest.request.requestDigest),
    resultImporterReady: resultImporter.readyForResultImport,
    resultImportDigestValid: /^[a-f0-9]{64}$/.test(resultImporter.importEnvelope.importDigest),
    releaseEvidenceGateReady: releaseGate.readyForReleaseEvidenceGate,
    releaseEvidenceGateDigestValid: /^[a-f0-9]{64}$/.test(releaseGate.gate.gateDigest),
    releaseGateStillNotProductionPass: releaseGate.readyForProductionPassEvidence === false
      && releaseGate.gateDecision === "not-production-pass-evidence",
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
    startsNoUpstreamsAutomatically: true,
    dryRunPackageOnly: true,
    readyForDryRunPackage: false,
  };
  checks.readyForDryRunPackage = checks.executionRequestReady
    && checks.executionRequestDigestValid
    && checks.resultImporterReady
    && checks.resultImportDigestValid
    && checks.releaseEvidenceGateReady
    && checks.releaseEvidenceGateDigestValid
    && checks.releaseGateStillNotProductionPass
    && checks.upstreamActionsStillDisabled
    && checks.startsNoUpstreamsAutomatically
    && checks.dryRunPackageOnly;
  const operatorSteps = createOperatorSteps(input.config, executionRequest, resultImporter, releaseGate, checks);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(releaseGate.gateDecision, input.config.upstreamProbesEnabled);
  const recommendations = collectRecommendations();
  const packageDigest = digestPackage({
    profileVersion: "production-live-probe-real-read-smoke-dry-run-command-package.v1",
    executionRequestDigest: executionRequest.request.requestDigest,
    resultImportDigest: resultImporter.importEnvelope.importDigest,
    releaseEvidenceGateDigest: releaseGate.gate.gateDigest,
    releaseGateDecision: releaseGate.gateDecision,
    upstreamProbesEnabled: input.config.upstreamProbesEnabled,
    upstreamActionsEnabled: input.config.upstreamActionsEnabled,
    operatorSteps: operatorSteps.map((step) => [step.id, step.status]),
    checks: {
      ...checks,
      readyForDryRunPackage: checks.readyForDryRunPackage,
    },
  });

  return {
    service: "orderops-node",
    title: "Production live probe real-read smoke dry-run command package",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-real-read-smoke-dry-run-command-package.v1",
    packageState: productionBlockers.length === 0 ? "ready-for-operator-review" : "blocked",
    readyForDryRunPackage: checks.readyForDryRunPackage,
    readyForRealPassCapture: false,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    package: {
      packageDigest,
      executionRequestDigest: executionRequest.request.requestDigest,
      resultImportDigest: resultImporter.importEnvelope.importDigest,
      releaseEvidenceGateDigest: releaseGate.gate.gateDigest,
      releaseGateDecision: releaseGate.gateDecision,
      upstreamProbesEnabled: input.config.upstreamProbesEnabled,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      dryRunOnly: true,
      startsJavaAutomatically: false,
      startsMiniKvAutomatically: false,
      mutatesUpstreamState: false,
    },
    operatorSteps,
    checks,
    summary: {
      operatorStepCount: operatorSteps.length,
      manualStepCount: operatorSteps.filter((step) => step.owner === "operator").length,
      nodeStepCount: operatorSteps.filter((step) => step.owner === "node").length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Review this dry-run package before any real upstream smoke window.",
      "Do not start Java or mini-kv from Node; keep manual upstream startup explicit.",
      "Use v148 only after Java and mini-kv are intentionally running and the read-only probe window is opened.",
    ],
  };
}

export function renderProductionLiveProbeRealReadSmokeDryRunCommandPackageMarkdown(
  profile: ProductionLiveProbeRealReadSmokeDryRunCommandPackageProfile,
): string {
  return [
    "# Production live probe real-read smoke dry-run command package",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Package state: ${profile.packageState}`,
    `- Ready for dry-run package: ${profile.readyForDryRunPackage}`,
    `- Ready for real pass capture: ${profile.readyForRealPassCapture}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Package",
    "",
    ...renderEntries(profile.package),
    "",
    "## Operator Steps",
    "",
    ...profile.operatorSteps.flatMap(renderStep),
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
    ...renderMessages(profile.productionBlockers, "No dry-run command package blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No dry-run command package warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No dry-run command package recommendations."),
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
  config: AppConfig,
  executionRequest: Awaited<ReturnType<typeof loadProductionLiveProbeRealReadSmokeExecutionRequest>>,
  resultImporter: Awaited<ReturnType<typeof loadProductionLiveProbeRealReadSmokeResultImporter>>,
  releaseGate: Awaited<ReturnType<typeof loadProductionLiveProbeRealReadSmokeReleaseEvidenceGate>>,
  checks: ProductionLiveProbeRealReadSmokeDryRunCommandPackageProfile["checks"],
): ProductionLiveProbeDryRunCommandStep[] {
  return [
    {
      id: "review-execution-request",
      owner: "node",
      status: checks.executionRequestReady ? "ready" : "blocked",
      command: "GET /api/v1/production/live-probe-real-read-smoke-execution-request",
      evidence: executionRequest.request.requestDigest,
      note: "Confirms required environment and forbidden write actions before real smoke.",
    },
    {
      id: "review-result-importer",
      owner: "node",
      status: checks.resultImporterReady ? "ready" : "blocked",
      command: "GET /api/v1/production/live-probe-real-read-smoke-result-importer",
      evidence: resultImporter.importEnvelope.importDigest,
      note: "Confirms skipped/pass smoke records can be normalized into the import schema.",
    },
    {
      id: "review-release-evidence-gate",
      owner: "node",
      status: checks.releaseEvidenceGateReady ? "ready" : "blocked",
      command: "GET /api/v1/production/live-probe-real-read-smoke-release-evidence-gate",
      evidence: releaseGate.gate.gateDigest,
      note: "Confirms current skipped evidence is not production pass evidence.",
    },
    {
      id: "confirm-read-only-window-requirements",
      owner: "operator",
      status: config.upstreamActionsEnabled ? "blocked" : "manual-required",
      command: "Confirm future capture uses UPSTREAM_PROBES_ENABLED=true and UPSTREAM_ACTIONS_ENABLED=false.",
      evidence: `current UPSTREAM_PROBES_ENABLED=${config.upstreamProbesEnabled}, UPSTREAM_ACTIONS_ENABLED=${config.upstreamActionsEnabled}`,
      note: "This package does not open the real probe window.",
    },
    {
      id: "prepare-manual-upstream-start",
      owner: "operator",
      status: "manual-required",
      command: "Prepare to start Java and mini-kv manually only when v148 pass capture is requested.",
      evidence: `${config.orderPlatformUrl}; ${config.miniKvHost}:${config.miniKvPort}`,
      note: "Node must not start Java or mini-kv automatically.",
    },
    {
      id: "defer-real-pass-capture",
      owner: "operator",
      status: "manual-required",
      command: "Do not run v148 pass capture until both upstreams are intentionally running.",
      evidence: "/api/v1/production/live-probe-smoke-harness",
      note: "Skipped evidence remains the safe default until the real read-only window opens.",
    },
  ];
}

function collectProductionBlockers(
  checks: ProductionLiveProbeRealReadSmokeDryRunCommandPackageProfile["checks"],
): ProductionLiveProbeDryRunCommandPackageMessage[] {
  const blockers: ProductionLiveProbeDryRunCommandPackageMessage[] = [];
  addMessage(blockers, checks.executionRequestReady, "EXECUTION_REQUEST_NOT_READY", "execution-request", "v144 execution request must be ready before packaging.");
  addMessage(blockers, checks.executionRequestDigestValid, "EXECUTION_REQUEST_DIGEST_INVALID", "execution-request", "Execution request digest must be valid.");
  addMessage(blockers, checks.resultImporterReady, "RESULT_IMPORTER_NOT_READY", "result-importer", "v145 result importer must be ready before packaging.");
  addMessage(blockers, checks.resultImportDigestValid, "RESULT_IMPORT_DIGEST_INVALID", "result-importer", "Result import digest must be valid.");
  addMessage(blockers, checks.releaseEvidenceGateReady, "RELEASE_EVIDENCE_GATE_NOT_READY", "release-evidence-gate", "v146 release evidence gate must be ready before packaging.");
  addMessage(blockers, checks.releaseEvidenceGateDigestValid, "RELEASE_EVIDENCE_GATE_DIGEST_INVALID", "release-evidence-gate", "Release evidence gate digest must be valid.");
  addMessage(blockers, checks.releaseGateStillNotProductionPass, "DRY_RUN_ALREADY_PRODUCTION_PASS", "dry-run-command-package", "Dry-run package should not claim production pass evidence.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.startsNoUpstreamsAutomatically, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "dry-run-command-package", "Dry-run package must not start Java or mini-kv automatically.");
  addMessage(blockers, checks.dryRunPackageOnly, "PACKAGE_NOT_DRY_RUN_ONLY", "dry-run-command-package", "v147 package must remain dry-run only.");
  return blockers;
}

function collectWarnings(
  gateDecision: ProductionLiveProbeRealReadSmokeDryRunCommandPackageProfile["package"]["releaseGateDecision"],
  probesEnabled: boolean,
): ProductionLiveProbeDryRunCommandPackageMessage[] {
  return [
    {
      code: "DRY_RUN_PACKAGE_ONLY",
      severity: "warning",
      source: "dry-run-command-package",
      message: "This package prepares operator review only; it does not capture real pass evidence.",
    },
    {
      code: gateDecision === "not-production-pass-evidence"
        ? "SOURCE_GATE_NOT_PRODUCTION_PASS"
        : "SOURCE_GATE_UNEXPECTED_STATE",
      severity: "warning",
      source: "release-evidence-gate",
      message: gateDecision === "not-production-pass-evidence"
        ? "Source release gate correctly remains not-production-pass-evidence for skipped inputs."
        : "Source release gate is not in the expected dry-run skipped state.",
    },
    {
      code: probesEnabled ? "PROBE_WINDOW_OPEN_DURING_DRY_RUN" : "PROBE_WINDOW_CLOSED_FOR_DRY_RUN",
      severity: "warning",
      source: "runtime-config",
      message: probesEnabled
        ? "UPSTREAM_PROBES_ENABLED=true during dry-run package generation; verify no real capture was intended."
        : "UPSTREAM_PROBES_ENABLED=false; dry-run package did not touch upstreams.",
    },
  ];
}

function collectRecommendations(): ProductionLiveProbeDryRunCommandPackageMessage[] {
  return [
    {
      code: "START_REAL_CAPTURE_ONLY_AFTER_MANUAL_UPSTREAMS",
      severity: "recommendation",
      source: "dry-run-command-package",
      message: "Proceed to v148 only after Java and mini-kv are intentionally started for a read-only smoke window.",
    },
  ];
}

function addMessage(
  messages: ProductionLiveProbeDryRunCommandPackageMessage[],
  condition: boolean,
  code: string,
  source: ProductionLiveProbeDryRunCommandPackageMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function digestPackage(value: unknown): string {
  return sha256StableJson(value);
}

function renderStep(step: ProductionLiveProbeDryRunCommandStep): string[] {
  return [
    `### ${step.id}`,
    "",
    `- Owner: ${step.owner}`,
    `- Status: ${step.status}`,
    `- Command: ${step.command}`,
    `- Evidence: ${step.evidence}`,
    `- Note: ${step.note}`,
    "",
  ];
}


