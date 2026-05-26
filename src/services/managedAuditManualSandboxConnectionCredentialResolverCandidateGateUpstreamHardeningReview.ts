import type { AppConfig } from "../config.js";
import {
  createJavaV151EvidenceExportHintReference,
  createJavaV152InputHardeningDecisionEchoReference,
  createMiniKvV143ReceiptReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningEvidence.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision,
} from "./managedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision.js";
import type {
  CandidateGateUpstreamHardeningReviewChecks,
  CandidateGateUpstreamHardeningReviewMessage,
  CandidateGateUpstreamHardeningReviewRecord,
  CandidateGateUpstreamHardeningReviewSummary,
  JavaV151EvidenceExportHintReference,
  JavaV152InputHardeningDecisionEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReviewProfile,
  MiniKvV143InputHardeningReceiptReference,
  SourceNodeV329InputHardeningDecisionReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReviewTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReviewMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReviewRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-candidate-gate-upstream-hardening-review.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-candidate-gate-upstream-hardening-review";
const SOURCE_NODE_V329_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-candidate-gate-input-hardening-decision";
const ACTIVE_PLAN = "docs/plans2/v328-post-final-prerequisite-closure-roadmap.md";
const NEXT_PLAN = "docs/plans2/v330-post-candidate-gate-upstream-hardening-roadmap.md";
const JAVA_V151_EVIDENCE_PATH = "D:/javaproj/advanced-order-platform/d/151/解释/说明.md";
const JAVA_V152_EVIDENCE_PATH = "D:/javaproj/advanced-order-platform/d/152/解释/说明.md";
const MINI_KV_V143_RECEIPT_PATH =
  "D:/C/mini-kv/fixtures/release/credential-resolver-implementation-candidate-gate-input-hardening-non-participation-receipt.json";

export function loadManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview(input: {
  config: AppConfig;
  evidencePaths?: {
    javaV150EvidencePath?: string;
    miniKvV142ReceiptPath?: string;
    javaV151EvidencePath?: string;
    javaV152EvidencePath?: string;
    miniKvV143ReceiptPath?: string;
  };
}): ManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReviewProfile {
  const sourceNodeV329 = createSourceNodeV329(input.config, input.evidencePaths);
  const javaV151EvidenceExportHint = createJavaV151EvidenceExportHintReference(
    input.evidencePaths?.javaV151EvidencePath ?? JAVA_V151_EVIDENCE_PATH,
  );
  const javaV152InputHardeningDecisionEcho = createJavaV152InputHardeningDecisionEchoReference(
    input.evidencePaths?.javaV152EvidencePath ?? JAVA_V152_EVIDENCE_PATH,
  );
  const miniKvV143Receipt = createMiniKvV143ReceiptReference(
    input.evidencePaths?.miniKvV143ReceiptPath ?? MINI_KV_V143_RECEIPT_PATH,
  );
  const checks = createChecks(
    input.config,
    sourceNodeV329,
    javaV151EvidenceExportHint,
    javaV152InputHardeningDecisionEcho,
    miniKvV143Receipt,
  );
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview")
      .every(([, value]) => value);
  const hardeningReview = createHardeningReview(
    sourceNodeV329,
    javaV151EvidenceExportHint,
    javaV152InputHardeningDecisionEcho,
    miniKvV143Receipt,
    checks.readyForManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview,
  );
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(
    sourceNodeV329,
    javaV151EvidenceExportHint,
    javaV152InputHardeningDecisionEcho,
    miniKvV143Receipt,
    checks,
    productionBlockers,
    warnings,
    recommendations,
  );

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver candidate gate upstream hardening review",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    reviewState: checks.readyForManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview
      ? "candidate-gate-upstream-hardening-review-ready"
      : "blocked",
    upstreamAlignmentDecision: hardeningReview.decision,
    readyForManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview,
    readOnlyReview: true,
    activeNodeVersion: "Node v330",
    sourceNodeVersion: "Node v329",
    sourceJavaEvidenceExportVersion: "Java v151",
    sourceJavaInputHardeningEchoVersion: "Java v152",
    sourceMiniKvVersion: "mini-kv v143",
    consumesNodeV329ImplementationCandidateGateInputHardeningDecision: true,
    consumesJavaV151StableEvidenceExportHint: true,
    consumesJavaV152InputHardeningDecisionEcho: true,
    consumesMiniKvV143StableCurrentReceiptExport: true,
    readyForNextNodeDisabledRuntimeShellDesignDraftCandidate:
      hardeningReview.readyForNextNodeDisabledRuntimeShellDesignDraftCandidate,
    readyForDisabledRuntimeShellDesignDraft: false,
    readyForRuntimeShellImplementation: false,
    readyForRuntimeShellInvocation: false,
    readyForManagedAuditResolverImplementation: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    runtimeShellImplemented: false,
    runtimeShellEnabled: false,
    runtimeShellInvocationAllowed: false,
    realResolverImplementationAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    externalRequestSent: false,
    httpRequestSent: false,
    tcpConnectionAttempted: false,
    networkSocketOpened: false,
    javaServiceStarted: false,
    miniKvServiceStarted: false,
    javaSqlExecutionAllowed: false,
    approvalLedgerWritten: false,
    schemaMigrationExecuted: false,
    rollbackExecutionAllowed: false,
    deploymentActionAllowed: false,
    miniKvWriteCommandAllowed: false,
    miniKvLoadAllowed: false,
    miniKvCompactAllowed: false,
    miniKvRestoreAllowed: false,
    miniKvSetnxexAllowed: false,
    automaticUpstreamStart: false,
    sourceNodeV329,
    javaV151EvidenceExportHint,
    javaV152InputHardeningDecisionEcho,
    miniKvV143Receipt,
    hardeningReview,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      candidateGateUpstreamHardeningReviewJson: ROUTE_PATH,
      candidateGateUpstreamHardeningReviewMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV329Json: SOURCE_NODE_V329_ROUTE,
      sourceNodeV329Markdown: `${SOURCE_NODE_V329_ROUTE}?format=markdown`,
      javaV151EvidencePath: JAVA_V151_EVIDENCE_PATH,
      javaV152EvidencePath: JAVA_V152_EVIDENCE_PATH,
      miniKvV143ReceiptPath: MINI_KV_V143_RECEIPT_PATH,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v331",
    },
    nextActions: [
      "Archive Node v330 as an upstream hardening alignment review, not a runtime design draft.",
      "Start the next plan at Node v331 with a disabled runtime shell design draft candidate review only.",
      "Keep the design draft candidate disabled by default and continue to avoid provider/client instantiation, credential value reads, raw endpoint URL parsing, HTTP/TCP, Java writes, mini-kv writes/admin commands, and automatic upstream start.",
      "If a later step needs real credential value, raw endpoint URL, external network, Java SQL/ledger/schema, mini-kv write/admin command, or upstream auto-start, pause before coding.",
    ],
  };
}

function createSourceNodeV329(
  config: AppConfig,
  evidencePaths?: {
    javaV150EvidencePath?: string;
    miniKvV142ReceiptPath?: string;
  },
): SourceNodeV329InputHardeningDecisionReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision({
    config,
    evidencePaths,
  });
  return {
    sourceVersion: "Node v329",
    profileVersion: source.profileVersion,
    candidateGateState: source.candidateGateState,
    readyForInputHardeningDecision:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision,
    candidateGateDecision: source.candidateGateDecision,
    decisionDigest: source.decisionRecord.decisionDigest,
    inputHardeningRequirementCount: source.decisionRecord.inputHardeningRequirementCount,
    noGoConditionCount: source.decisionRecord.noGoConditionCount,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
    runtimeShellImplemented: source.runtimeShellImplemented,
    runtimeShellInvocationAllowed: source.runtimeShellInvocationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    httpRequestSent: source.httpRequestSent,
    tcpConnectionAttempted: source.tcpConnectionAttempted,
    automaticUpstreamStart: source.automaticUpstreamStart,
    readyForNodeV330CandidateGateUpstreamAlignment: source.readyForNodeV330CandidateGateUpstreamAlignment,
    readyForDisabledRuntimeShellDesignDraft: source.readyForDisabledRuntimeShellDesignDraft,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV329: SourceNodeV329InputHardeningDecisionReference,
  javaV151EvidenceExportHint: JavaV151EvidenceExportHintReference,
  javaV152InputHardeningDecisionEcho: JavaV152InputHardeningDecisionEchoReference,
  miniKvV143Receipt: MiniKvV143InputHardeningReceiptReference,
): CandidateGateUpstreamHardeningReviewChecks {
  return {
    sourceNodeV329Ready:
      sourceNodeV329.candidateGateState === "implementation-candidate-gate-input-hardening-decision-ready"
      && sourceNodeV329.readyForInputHardeningDecision
      && sourceNodeV329.sourceProductionBlockerCount === 0,
    sourceNodeV329RequiresInputHardening:
      sourceNodeV329.candidateGateDecision === "require-input-export-hardening-before-disabled-runtime-design"
      && sourceNodeV329.inputHardeningRequirementCount === 4,
    sourceNodeV329KeepsRuntimeBlocked:
      !sourceNodeV329.runtimeShellImplemented
      && !sourceNodeV329.runtimeShellInvocationAllowed
      && !sourceNodeV329.executionAllowed
      && !sourceNodeV329.connectsManagedAudit
      && !sourceNodeV329.credentialValueRead
      && !sourceNodeV329.rawEndpointUrlParsed
      && !sourceNodeV329.externalRequestSent
      && !sourceNodeV329.httpRequestSent
      && !sourceNodeV329.tcpConnectionAttempted
      && !sourceNodeV329.automaticUpstreamStart
      && !sourceNodeV329.readyForNodeV330CandidateGateUpstreamAlignment
      && !sourceNodeV329.readyForDisabledRuntimeShellDesignDraft,
    javaV151EvidencePresent: javaV151EvidenceExportHint.evidencePresent,
    javaV151StableEvidenceExportReady: javaV151EvidenceExportHint.readyForNodeConsumption,
    javaV151BoundariesDocumented:
      javaV151EvidenceExportHint.credentialAndEndpointBoundariesDocumented
      && javaV151EvidenceExportHint.networkWriteRollbackSchemaBoundariesDocumented
      && javaV151EvidenceExportHint.automaticUpstreamStartDenied,
    javaV152EvidencePresent: javaV152InputHardeningDecisionEcho.evidencePresent,
    javaV152ConsumesNodeV329: javaV152InputHardeningDecisionEcho.consumesNodeV329Decision,
    javaV152ConfirmsJavaStableEvidenceExport:
      javaV152InputHardeningDecisionEcho.confirmsJavaV151StableEvidenceExport,
    javaV152BoundariesDocumented:
      javaV152InputHardeningDecisionEcho.providerClientNetworkBoundariesDocumented
      && javaV152InputHardeningDecisionEcho.javaWriteBoundariesDocumented
      && javaV152InputHardeningDecisionEcho.automaticUpstreamStartDenied,
    miniKvV143ReceiptPresent: miniKvV143Receipt.evidencePresent,
    miniKvV143ReleaseVersionMatches: miniKvV143Receipt.releaseVersion === "v143",
    miniKvV143StableCurrentReceiptReady:
      miniKvV143Receipt.stableCurrentReceiptExportReady === true
      && miniKvV143Receipt.stableCurrentReceiptPathRequired === true,
    miniKvV143ReadyAfterJavaV151: miniKvV143Receipt.readyForNodeV330AfterJavaV151 === true,
    miniKvV143BlocksBeforeJavaV151: miniKvV143Receipt.readyForNodeV330BeforeJavaV151 === false,
    miniKvV143KeepsRuntimeAndWriteBoundariesClosed:
      miniKvV143Receipt.readyForDisabledRuntimeShellDesignDraft === false
      && miniKvV143Receipt.runtimeShellImplemented === false
      && miniKvV143Receipt.runtimeShellInvocationAllowed === false
      && miniKvV143Receipt.realResolverImplementationAllowed === false
      && miniKvV143Receipt.credentialValueRead === false
      && miniKvV143Receipt.rawEndpointUrlParsed === false
      && miniKvV143Receipt.externalRequestSent === false
      && miniKvV143Receipt.httpRequestSent === false
      && miniKvV143Receipt.tcpConnectionAttempted === false
      && miniKvV143Receipt.javaSqlExecutionAllowed === false
      && miniKvV143Receipt.rollbackExecutionAllowed === false
      && miniKvV143Receipt.approvalLedgerWritten === false
      && miniKvV143Receipt.schemaMigrationExecuted === false
      && miniKvV143Receipt.miniKvWriteCommandAllowed === false
      && miniKvV143Receipt.miniKvLoadAllowed === false
      && miniKvV143Receipt.miniKvCompactAllowed === false
      && miniKvV143Receipt.miniKvRestoreAllowed === false
      && miniKvV143Receipt.miniKvSetnxexAllowed === false
      && miniKvV143Receipt.automaticUpstreamStart === false,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview: false,
  };
}

function createHardeningReview(
  sourceNodeV329: SourceNodeV329InputHardeningDecisionReference,
  javaV151EvidenceExportHint: JavaV151EvidenceExportHintReference,
  javaV152InputHardeningDecisionEcho: JavaV152InputHardeningDecisionEchoReference,
  miniKvV143Receipt: MiniKvV143InputHardeningReceiptReference,
  ready: boolean,
): CandidateGateUpstreamHardeningReviewRecord {
  const decision = ready
    ? "input-hardening-aligned-proceed-to-disabled-design-draft-candidate-review"
    : "blocked";
  return {
    reviewDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      sourceNodeDecisionDigest: sourceNodeV329.decisionDigest,
      javaV151Digest: javaV151EvidenceExportHint.evidenceFile.digest,
      javaV152Digest: javaV152InputHardeningDecisionEcho.evidenceFile.digest,
      miniKvV143Digest: miniKvV143Receipt.evidenceFile.digest,
      decision,
    }),
    recordMode: "candidate-gate-upstream-hardening-review-only",
    decision,
    sourceSpan: "Node v329 + Java v151/v152 + mini-kv v143",
    javaEvidenceExportStatus: javaV151EvidenceExportHint.readyForNodeConsumption
      ? "stable-read-only-export-hint-present"
      : "missing-or-blocked",
    javaInputHardeningEchoStatus: javaV152InputHardeningDecisionEcho.readyForNodeConsumption
      ? "input-hardening-decision-echo-present"
      : "missing-or-blocked",
    miniKvStableReceiptStatus: miniKvV143Receipt.readyForNodeConsumption
      ? "stable-current-receipt-ready"
      : "missing-or-blocked",
    readyForNextNodeDisabledRuntimeShellDesignDraftCandidate: ready,
    allowsDisabledRuntimeShellDesignDraftNow: false,
    allowsRuntimeShellImplementation: false,
    allowsRuntimeShellInvocation: false,
    allowsRealResolverImplementation: false,
    allowsSecretProviderInstantiation: false,
    allowsResolverClientInstantiation: false,
    allowsCredentialValueRead: false,
    allowsRawEndpointUrlParse: false,
    allowsExternalRequest: false,
    allowsManagedAuditConnection: false,
    allowsSchemaMigration: false,
    allowsApprovalLedgerWrite: false,
    allowsRollbackExecution: false,
    allowsMiniKvWriteOrAdminCommand: false,
    allowsAutomaticUpstreamStart: false,
    nextNodeVersionSuggested: "Node v331",
  };
}

function collectProductionBlockers(
  checks: CandidateGateUpstreamHardeningReviewChecks,
): CandidateGateUpstreamHardeningReviewMessage[] {
  const blockers: CandidateGateUpstreamHardeningReviewMessage[] = [];
  addBlocker(blockers, checks.sourceNodeV329Ready, "NODE_V329_NOT_READY", "node-v329",
    "Node v329 input-hardening decision is not ready.");
  addBlocker(blockers, checks.sourceNodeV329RequiresInputHardening, "NODE_V329_INPUT_HARDENING_NOT_REQUIRED",
    "node-v329", "Node v329 no longer requires input hardening before design draft.");
  addBlocker(blockers, checks.sourceNodeV329KeepsRuntimeBlocked, "NODE_V329_RUNTIME_BOUNDARY_OPEN",
    "runtime-boundary", "Node v329 source opened runtime, credential, network, or auto-start behavior.");
  addBlocker(blockers, checks.javaV151EvidencePresent, "JAVA_V151_EVIDENCE_MISSING", "java-v151",
    "Java v151 evidence export hint is missing.");
  addBlocker(blockers, checks.javaV151StableEvidenceExportReady, "JAVA_V151_EXPORT_NOT_READY", "java-v151",
    "Java v151 does not prove stable read-only evidence export readiness.");
  addBlocker(blockers, checks.javaV152EvidencePresent, "JAVA_V152_EVIDENCE_MISSING", "java-v152",
    "Java v152 input-hardening decision echo is missing.");
  addBlocker(blockers, checks.javaV152ConsumesNodeV329, "JAVA_V152_DOES_NOT_CONSUME_NODE_V329", "java-v152",
    "Java v152 does not document consumption of Node v329.");
  addBlocker(blockers, checks.javaV152ConfirmsJavaStableEvidenceExport, "JAVA_V152_DID_NOT_CONFIRM_V151_EXPORT",
    "java-v152", "Java v152 does not confirm Java v151 stable evidence export.");
  addBlocker(blockers, checks.miniKvV143ReceiptPresent, "MINI_KV_V143_RECEIPT_MISSING", "mini-kv-v143",
    "mini-kv v143 receipt is missing.");
  addBlocker(blockers, checks.miniKvV143ReleaseVersionMatches, "MINI_KV_V143_RELEASE_MISMATCH", "mini-kv-v143",
    "mini-kv receipt release version is not v143.");
  addBlocker(blockers, checks.miniKvV143StableCurrentReceiptReady, "MINI_KV_V143_STABLE_RECEIPT_NOT_READY",
    "mini-kv-v143", "mini-kv v143 does not expose a stable current receipt export.");
  addBlocker(blockers, checks.miniKvV143ReadyAfterJavaV151, "MINI_KV_V143_NOT_READY_AFTER_JAVA_V151",
    "mini-kv-v143", "mini-kv v143 does not declare readiness after Java v151.");
  addBlocker(blockers, checks.miniKvV143BlocksBeforeJavaV151, "MINI_KV_V143_ALLOWS_NODE_BEFORE_JAVA",
    "mini-kv-v143", "mini-kv v143 must not allow Node v330 before Java evidence is present.");
  addBlocker(blockers, checks.miniKvV143KeepsRuntimeAndWriteBoundariesClosed,
    "MINI_KV_V143_RUNTIME_OR_WRITE_BOUNDARY_OPEN", "mini-kv-v143",
    "mini-kv v143 opens runtime, credential, network, write, admin, restore, or auto-start behavior.");
  addBlocker(blockers, checks.upstreamProbesStillDisabled, "UPSTREAM_PROBES_ENABLED", "configuration",
    "UPSTREAM_PROBES_ENABLED must stay false for this hardening review.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "configuration",
    "UPSTREAM_ACTIONS_ENABLED must stay false for this hardening review.");
  return blockers;
}

function collectWarnings(): CandidateGateUpstreamHardeningReviewMessage[] {
  return [
    {
      code: "JAVA_V152_SUPERSEDES_PLANNED_V151_ECHO",
      severity: "warning",
      source: "java-v152",
      message:
        "The active plan named Java v151, but Java advanced to v152 and explicitly confirms v151 stable evidence export plus Node v329 consumption.",
    },
    {
      code: "NEXT_STEP_IS_STILL_ONLY_A_CANDIDATE_REVIEW",
      severity: "warning",
      source: "next-step",
      message: "Node v330 does not create a disabled runtime shell design draft; it only allows a later candidate review.",
    },
  ];
}

function collectRecommendations(): CandidateGateUpstreamHardeningReviewMessage[] {
  return [
    {
      code: "START_NODE_V331_DISABLED_DESIGN_DRAFT_CANDIDATE_REVIEW",
      severity: "recommendation",
      source: "next-step",
      message:
        "Use Node v331 for a disabled runtime shell design draft candidate review, still without provider/client, credential value, raw endpoint URL, HTTP/TCP, Java write, mini-kv write/admin, or auto-start.",
    },
  ];
}

function createSummary(
  sourceNodeV329: SourceNodeV329InputHardeningDecisionReference,
  javaV151EvidenceExportHint: JavaV151EvidenceExportHintReference,
  javaV152InputHardeningDecisionEcho: JavaV152InputHardeningDecisionEchoReference,
  miniKvV143Receipt: MiniKvV143InputHardeningReceiptReference,
  checks: CandidateGateUpstreamHardeningReviewChecks,
  productionBlockers: readonly CandidateGateUpstreamHardeningReviewMessage[],
  warnings: readonly CandidateGateUpstreamHardeningReviewMessage[],
  recommendations: readonly CandidateGateUpstreamHardeningReviewMessage[],
): CandidateGateUpstreamHardeningReviewSummary {
  const javaSnippets = [
    ...javaV151EvidenceExportHint.expectedSnippets,
    ...javaV152InputHardeningDecisionEcho.expectedSnippets,
  ];
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV329CheckCount: sourceNodeV329.sourceCheckCount,
    sourceNodeV329PassedCheckCount: sourceNodeV329.sourcePassedCheckCount,
    javaEvidenceFileCount:
      (javaV151EvidenceExportHint.evidencePresent ? 1 : 0)
      + (javaV152InputHardeningDecisionEcho.evidencePresent ? 1 : 0),
    javaSnippetCount: javaSnippets.length,
    javaMatchedSnippetCount: javaSnippets.filter((match) => match.matched).length,
    miniKvReceiptFileCount: miniKvV143Receipt.evidencePresent ? 1 : 0,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function addBlocker(
  messages: CandidateGateUpstreamHardeningReviewMessage[],
  condition: boolean,
  code: string,
  source: CandidateGateUpstreamHardeningReviewMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
