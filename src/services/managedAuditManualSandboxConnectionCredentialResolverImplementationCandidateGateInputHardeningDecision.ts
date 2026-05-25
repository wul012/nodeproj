import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview,
} from "./managedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview.js";
import type {
  ImplementationCandidateGateInputHardeningDecisionChecks,
  ImplementationCandidateGateInputHardeningDecisionMessage,
  ImplementationCandidateGateInputHardeningDecisionRecord,
  ImplementationCandidateGateInputHardeningDecisionSummary,
  ImplementationCandidateGateInputHardeningRequirement,
  ImplementationCandidateGateNecessityProof,
  ImplementationCandidateGateNoGoCondition,
  ManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecisionProfile,
  SourceNodeV328FinalPrerequisiteClosureReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecisionTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecisionMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecisionRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-implementation-candidate-gate-input-hardening-decision.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-candidate-gate-input-hardening-decision";
const SOURCE_NODE_V328_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-final-prerequisite-closure-review";
const ACTIVE_PLAN = "docs/plans2/v328-post-final-prerequisite-closure-roadmap.md";
const RECOMMENDED_PARALLEL_JAVA_V151 = "Java v151 stable evidence export candidate gate echo";
const RECOMMENDED_PARALLEL_MINI_KV_V143 = "mini-kv v143 stable receipt export non-participation receipt";
const NEXT_NODE_VERSION = "Node v330 candidate gate upstream alignment / hardening review";

export function loadManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision(input: {
  config: AppConfig;
  evidencePaths?: {
    javaV150EvidencePath?: string;
    miniKvV142ReceiptPath?: string;
  };
}): ManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecisionProfile {
  const sourceNodeV328 = createSourceNodeV328(input.config, input.evidencePaths);
  const necessityProof = createNecessityProof();
  const decisionRecord = createDecisionRecord(sourceNodeV328);
  const checks = createChecks(input.config, sourceNodeV328, decisionRecord, necessityProof);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision =
    Object.entries(checks)
      .filter(([key]) =>
        key !==
        "readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision")
      .every(([, value]) => value);
  const candidateGateState =
    checks.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision
      ? "implementation-candidate-gate-input-hardening-decision-ready"
      : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV328, decisionRecord, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver implementation candidate gate input-hardening decision",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    candidateGateState,
    candidateGateDecision: "require-input-export-hardening-before-disabled-runtime-design",
    readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision,
    readOnlyDecisionRecord: true,
    implementationCandidateGateOnly: true,
    consumesNodeV328FinalPrerequisiteClosureReview: true,
    activeNodeVersion: "Node v329",
    sourceNodeClosureVersion: "Node v328",
    readyForParallelJavaV151MiniKvV143EchoRequest:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision,
    readyForNodeV330CandidateGateUpstreamAlignment: false,
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
    sourceNodeV328,
    decisionRecord,
    necessityProof,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      implementationCandidateGateInputHardeningDecisionJson: ROUTE_PATH,
      implementationCandidateGateInputHardeningDecisionMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV328Json: SOURCE_NODE_V328_ROUTE,
      sourceNodeV328Markdown: `${SOURCE_NODE_V328_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      recommendedParallelJavaV151: RECOMMENDED_PARALLEL_JAVA_V151,
      recommendedParallelMiniKvV143: RECOMMENDED_PARALLEL_MINI_KV_V143,
      nextNodeVersion: NEXT_NODE_VERSION,
    },
    nextActions: [
      "Archive Node v329 as the candidate gate decision, not as runtime shell design or implementation.",
      "After v329, request Java v151 and mini-kv v143 in parallel for read-only input-hardening echo / receipt work.",
      "Let Node v330 consume those two upstream artifacts before any disabled runtime design draft is considered.",
      "Keep credential values, raw endpoint URLs, provider clients, HTTP/TCP, Java SQL, rollback, ledger/schema writes, mini-kv writes/admin commands, and automatic upstream start closed.",
    ],
  };
}

function createSourceNodeV328(
  config: AppConfig,
  evidencePaths?: {
    javaV150EvidencePath?: string;
    miniKvV142ReceiptPath?: string;
  },
): SourceNodeV328FinalPrerequisiteClosureReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview({
    config,
    evidencePaths,
  });

  return {
    sourceVersion: "Node v328",
    profileVersion: source.profileVersion,
    reviewState: source.reviewState,
    readyForFinalPrerequisiteClosureReview:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview,
    allPrerequisitesClosed: source.allPrerequisitesClosed,
    readyForImplementationCandidateGate: source.readyForImplementationCandidateGate,
    nextNodeVersionSuggested: source.nextNodeVersionSuggested,
    closureDigest: source.closureDigest,
    sourceNodeReadinessVersion: source.sourceNodeReadinessVersion,
    completedPrerequisiteCount: source.closureReview.completedPrerequisiteCount,
    remainingPrerequisiteCount: source.closureReview.remainingPrerequisiteCount,
    originalPrerequisiteCount: source.closureReview.originalPrerequisiteCount,
    nextStepMode: source.closureReview.nextStepMode,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
    sourceWarningCount: source.summary.warningCount,
    sourceRecommendationCount: source.summary.recommendationCount,
    sourceChecks: source.checks,
    sourceSummary: source.summary,
    runtimeShellImplemented: source.runtimeShellImplemented,
    runtimeShellInvocationAllowed: source.runtimeShellInvocationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    httpRequestSent: source.httpRequestSent,
    tcpConnectionAttempted: source.tcpConnectionAttempted,
    networkSocketOpened: source.networkSocketOpened,
    javaServiceStarted: source.javaServiceStarted,
    miniKvServiceStarted: source.miniKvServiceStarted,
    javaSqlExecutionAllowed: source.javaSqlExecutionAllowed,
    approvalLedgerWritten: source.approvalLedgerWritten,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    rollbackExecutionAllowed: source.rollbackExecutionAllowed,
    deploymentActionAllowed: source.deploymentActionAllowed,
    miniKvWriteCommandAllowed: source.miniKvWriteCommandAllowed,
    miniKvLoadAllowed: source.miniKvLoadAllowed,
    miniKvCompactAllowed: source.miniKvCompactAllowed,
    miniKvRestoreAllowed: source.miniKvRestoreAllowed,
    miniKvSetnxexAllowed: source.miniKvSetnxexAllowed,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createDecisionRecord(
  sourceNodeV328: SourceNodeV328FinalPrerequisiteClosureReference,
): ImplementationCandidateGateInputHardeningDecisionRecord {
  const inputHardeningRequirements = createInputHardeningRequirements();
  const explicitNoGoConditions = createNoGoConditions();
  const partialRecord = {
    recordMode: "implementation-candidate-gate-input-hardening-decision-only" as const,
    decisionScope: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell" as const,
    sourceSpan: "Node v328 final prerequisite closure review" as const,
    decision: "require-input-export-hardening-before-disabled-runtime-design" as const,
    decisionReason:
      "Node v328 closed all prerequisites, but v327 still consumes Java Markdown archive evidence and a mini-kv release receipt file; v329 therefore enters the implementation candidate gate only to require stable input export hardening before any disabled runtime design draft.",
    allPrerequisitesClosed: sourceNodeV328.allPrerequisitesClosed,
    candidateGateEntered: sourceNodeV328.readyForImplementationCandidateGate,
    allowsParallelJavaV151MiniKvV143EchoRequest: sourceNodeV328.readyForImplementationCandidateGate,
    allowsNodeV330BeforeUpstreamEcho: false as const,
    allowsDisabledRuntimeShellDesignDraft: false as const,
    allowsDisabledRuntimeShellImplementation: false as const,
    allowsDisabledRuntimeShellInvocation: false as const,
    allowsRealResolverImplementation: false as const,
    allowsSecretProviderInstantiation: false as const,
    allowsResolverClientInstantiation: false as const,
    allowsCredentialValueRead: false as const,
    allowsRawEndpointUrlParse: false as const,
    allowsExternalRequest: false as const,
    allowsManagedAuditConnection: false as const,
    allowsSchemaMigration: false as const,
    allowsApprovalLedgerWrite: false as const,
    allowsRollbackExecution: false as const,
    allowsMiniKvWriteOrAdminCommand: false as const,
    allowsAutomaticUpstreamStart: false as const,
    inputHardeningRequirementCount: inputHardeningRequirements.length,
    noGoConditionCount: explicitNoGoConditions.length,
    inputHardeningRequirements,
    explicitNoGoConditions,
  };

  return {
    decisionDigest: sha256StableJson({
      sourceClosureDigest: sourceNodeV328.closureDigest,
      decision: partialRecord.decision,
      inputHardeningRequirements,
      explicitNoGoConditions,
    }),
    ...partialRecord,
  };
}

function createInputHardeningRequirements(): ImplementationCandidateGateInputHardeningRequirement[] {
  return [
    requirement(
      "java-stable-evidence-export",
      "java",
      "Stabilize Java evidence export",
      "Node v327 currently reads Java v150 archive Markdown; Java v151 should echo whether a stable JSON/current evidence export is required before design draft.",
      "Java v151",
    ),
    requirement(
      "mini-kv-stable-current-receipt",
      "mini-kv",
      "Stabilize mini-kv current receipt export",
      "Node v327 currently reads a mini-kv v142 release receipt file; mini-kv v143 should echo whether a stable current receipt path is required before design draft.",
      "mini-kv v143",
    ),
    requirement(
      "node-fail-closed-diagnostics",
      "node",
      "Keep fail-closed diagnostics as a candidate gate requirement",
      "Node v329 must preserve missing-input and enabled-upstream-action blockers before Node v330 evaluates upstream alignment.",
      "Node v330",
    ),
    requirement(
      "route-evidence-consumability",
      "node",
      "Keep JSON/Markdown evidence consumable",
      "Node v329 keeps the report route readable and screenshot-friendly so v330 can consume the archived decision without manual reconstruction.",
      "Node v330",
    ),
  ];
}

function requirement(
  id: string,
  owner: ImplementationCandidateGateInputHardeningRequirement["owner"],
  label: string,
  currentEvidence: string,
  requestedVersion: ImplementationCandidateGateInputHardeningRequirement["requestedVersion"],
): ImplementationCandidateGateInputHardeningRequirement {
  return {
    id,
    owner,
    label,
    currentEvidence,
    requiredBeforeDesignDraft: true,
    requestedVersion,
    status: "required",
  };
}

function createNoGoConditions(): ImplementationCandidateGateNoGoCondition[] {
  return [
    noGo("CREDENTIAL_VALUE_REQUIRED", "The next step requires reading or rendering credential values."),
    noGo("RAW_ENDPOINT_URL_REQUIRED", "The next step requires parsing or rendering a raw endpoint URL."),
    noGo("PROVIDER_OR_CLIENT_REQUIRED", "The next step requires instantiating a provider, resolver client, or fake client."),
    noGo("NETWORK_REQUEST_REQUIRED", "The next step requires HTTP/TCP or managed audit network access."),
    noGo("JAVA_WRITE_REQUIRED", "The next step requires Java SQL, deployment, rollback, ledger, or schema writes."),
    noGo("MINI_KV_WRITE_OR_ADMIN_REQUIRED", "The next step requires mini-kv LOAD, COMPACT, RESTORE, SETNXEX, or write commands."),
    noGo("AUTO_START_REQUIRED", "The next step requires automatically starting Java, mini-kv, or external services."),
  ];
}

function noGo(code: string, condition: string): ImplementationCandidateGateNoGoCondition {
  return { code, condition, action: "pause-and-do-not-implement-runtime-shell" };
}

function createNecessityProof(): ImplementationCandidateGateNecessityProof {
  return {
    blockerResolved:
      "The six-prerequisite catalog is closed, but implementation still lacks stable input-export contracts for Java and mini-kv evidence consumption.",
    consumer: "Java v151 and mini-kv v143, then Node v330",
    whyV328CannotBeReused:
      "Node v328 only proves prerequisite closure. It does not decide whether Java Markdown archive input and mini-kv release receipt input are stable enough for a disabled runtime design draft.",
    existingReportReuseDecision:
      "Reuse v328 as the source closure evidence, but create v329 because the next blocker is input export hardening rather than another closure review.",
    stopCondition:
      "Stop this chain if the next step asks for runtime shell implementation, credential value, raw endpoint URL, provider/client, HTTP/TCP, Java write, mini-kv write/admin command, or automatic upstream start.",
    proofComplete: true,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV328: SourceNodeV328FinalPrerequisiteClosureReference,
  decisionRecord: ImplementationCandidateGateInputHardeningDecisionRecord,
  necessityProof: ImplementationCandidateGateNecessityProof,
): ImplementationCandidateGateInputHardeningDecisionChecks {
  return {
    sourceNodeV328Ready:
      sourceNodeV328.reviewState === "final-prerequisite-closure-review-ready"
      && sourceNodeV328.readyForFinalPrerequisiteClosureReview
      && sourceNodeV328.sourceProductionBlockerCount === 0,
    sourceNodeV328ClosedAllPrerequisites:
      sourceNodeV328.allPrerequisitesClosed
      && sourceNodeV328.completedPrerequisiteCount === 6
      && sourceNodeV328.remainingPrerequisiteCount === 0,
    sourceNodeV328AllowsCandidateGateOnly:
      sourceNodeV328.readyForImplementationCandidateGate
      && sourceNodeV328.nextStepMode === "implementation-candidate-gate-only",
    sourceNodeV328KeepsRuntimeBlocked:
      !sourceNodeV328.runtimeShellImplemented
      && !sourceNodeV328.runtimeShellInvocationAllowed
      && !sourceNodeV328.executionAllowed,
    sourceNodeV328KeepsSideEffectsClosed:
      !sourceNodeV328.connectsManagedAudit
      && !sourceNodeV328.credentialValueRead
      && !sourceNodeV328.rawEndpointUrlParsed
      && !sourceNodeV328.externalRequestSent
      && !sourceNodeV328.httpRequestSent
      && !sourceNodeV328.tcpConnectionAttempted
      && !sourceNodeV328.networkSocketOpened
      && !sourceNodeV328.javaServiceStarted
      && !sourceNodeV328.miniKvServiceStarted
      && !sourceNodeV328.javaSqlExecutionAllowed
      && !sourceNodeV328.approvalLedgerWritten
      && !sourceNodeV328.schemaMigrationExecuted
      && !sourceNodeV328.rollbackExecutionAllowed
      && !sourceNodeV328.deploymentActionAllowed
      && !sourceNodeV328.miniKvWriteCommandAllowed
      && !sourceNodeV328.miniKvLoadAllowed
      && !sourceNodeV328.miniKvCompactAllowed
      && !sourceNodeV328.miniKvRestoreAllowed
      && !sourceNodeV328.miniKvSetnxexAllowed
      && !sourceNodeV328.automaticUpstreamStart,
    candidateGateRequiresInputHardening:
      decisionRecord.decision === "require-input-export-hardening-before-disabled-runtime-design"
      && decisionRecord.inputHardeningRequirementCount >= 4,
    candidateGateDoesNotOpenRuntime:
      !decisionRecord.allowsDisabledRuntimeShellDesignDraft
      && !decisionRecord.allowsDisabledRuntimeShellImplementation
      && !decisionRecord.allowsDisabledRuntimeShellInvocation
      && !decisionRecord.allowsCredentialValueRead
      && !decisionRecord.allowsRawEndpointUrlParse
      && !decisionRecord.allowsExternalRequest
      && !decisionRecord.allowsManagedAuditConnection
      && !decisionRecord.allowsSchemaMigration
      && !decisionRecord.allowsApprovalLedgerWrite
      && !decisionRecord.allowsRollbackExecution
      && !decisionRecord.allowsMiniKvWriteOrAdminCommand
      && !decisionRecord.allowsAutomaticUpstreamStart,
    necessityProofComplete: necessityProof.proofComplete,
    inputHardeningRequirementsDocumented:
      decisionRecord.inputHardeningRequirements.every((entry) => entry.status === "required")
      && decisionRecord.inputHardeningRequirements.some((entry) => entry.owner === "java")
      && decisionRecord.inputHardeningRequirements.some((entry) => entry.owner === "mini-kv")
      && decisionRecord.inputHardeningRequirements.some((entry) => entry.owner === "node"),
    parallelJavaV151MiniKvV143EchoRecommended: decisionRecord.allowsParallelJavaV151MiniKvV143EchoRequest,
    nodeV330BlockedUntilUpstreamEcho: !decisionRecord.allowsNodeV330BeforeUpstreamEcho,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision:
      false,
  };
}

function collectProductionBlockers(
  checks: ImplementationCandidateGateInputHardeningDecisionChecks,
): ImplementationCandidateGateInputHardeningDecisionMessage[] {
  const blockers: ImplementationCandidateGateInputHardeningDecisionMessage[] = [];
  addBlocker(blockers, checks.sourceNodeV328Ready, "NODE_V328_NOT_READY",
    "node-v328-final-prerequisite-closure-review", "Node v328 final prerequisite closure review is not ready.");
  addBlocker(blockers, checks.sourceNodeV328ClosedAllPrerequisites, "NODE_V328_PREREQUISITES_NOT_CLOSED",
    "node-v328-final-prerequisite-closure-review", "Node v328 did not close all six prerequisites.");
  addBlocker(blockers, checks.sourceNodeV328AllowsCandidateGateOnly, "NODE_V328_NOT_CANDIDATE_GATE_ONLY",
    "node-v328-final-prerequisite-closure-review", "Node v328 does not point to an implementation candidate gate only.");
  addBlocker(blockers, checks.sourceNodeV328KeepsRuntimeBlocked, "SOURCE_RUNTIME_BOUNDARY_OPEN",
    "runtime-boundary", "Node v328 source no longer keeps runtime blocked.");
  addBlocker(blockers, checks.sourceNodeV328KeepsSideEffectsClosed, "SOURCE_SIDE_EFFECT_BOUNDARY_OPEN",
    "runtime-boundary", "Node v328 source opens a credential, network, Java, mini-kv, ledger, schema, or auto-start side effect.");
  addBlocker(blockers, checks.candidateGateRequiresInputHardening, "INPUT_HARDENING_NOT_REQUIRED",
    "input-hardening", "v329 must require input export hardening before design draft.");
  addBlocker(blockers, checks.candidateGateDoesNotOpenRuntime, "CANDIDATE_GATE_OPENED_RUNTIME",
    "implementation-candidate-gate", "v329 candidate gate opened runtime design, implementation, or side effects.");
  addBlocker(blockers, checks.necessityProofComplete, "NECESSITY_PROOF_INCOMPLETE",
    "implementation-candidate-gate", "v329 missing necessity proof.");
  addBlocker(blockers, checks.inputHardeningRequirementsDocumented, "INPUT_HARDENING_REQUIREMENTS_INCOMPLETE",
    "input-hardening", "v329 did not document Java, mini-kv, and Node input-hardening requirements.");
  addBlocker(blockers, checks.upstreamProbesStillDisabled, "UPSTREAM_PROBES_ENABLED",
    "configuration", "UPSTREAM_PROBES_ENABLED must stay false for the candidate gate.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED",
    "configuration", "UPSTREAM_ACTIONS_ENABLED must stay false for the candidate gate.");
  return blockers;
}

function collectWarnings(): ImplementationCandidateGateInputHardeningDecisionMessage[] {
  return [
    {
      code: "CANDIDATE_GATE_IS_NOT_RUNTIME_DESIGN",
      severity: "warning",
      source: "implementation-candidate-gate",
      message: "v329 enters a candidate gate only to require input hardening; it is not a disabled runtime design draft.",
    },
  ];
}

function collectRecommendations(): ImplementationCandidateGateInputHardeningDecisionMessage[] {
  return [
    {
      code: "REQUEST_PARALLEL_JAVA_V151_MINI_KV_V143",
      severity: "recommendation",
      source: "next-step",
      message: "After v329, request Java v151 and mini-kv v143 in parallel for read-only input-hardening echo / receipt work.",
    },
    {
      code: "LET_NODE_V330_CONSUME_UPSTREAM_INPUT_HARDENING",
      severity: "recommendation",
      source: "next-step",
      message: "Node v330 should consume Java v151 and mini-kv v143 before deciding whether disabled runtime design is even draftable.",
    },
  ];
}

function createSummary(
  sourceNodeV328: SourceNodeV328FinalPrerequisiteClosureReference,
  decisionRecord: ImplementationCandidateGateInputHardeningDecisionRecord,
  checks: ImplementationCandidateGateInputHardeningDecisionChecks,
  productionBlockers: readonly ImplementationCandidateGateInputHardeningDecisionMessage[],
  warnings: readonly ImplementationCandidateGateInputHardeningDecisionMessage[],
  recommendations: readonly ImplementationCandidateGateInputHardeningDecisionMessage[],
): ImplementationCandidateGateInputHardeningDecisionSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV328CheckCount: sourceNodeV328.sourceCheckCount,
    sourceNodeV328PassedCheckCount: sourceNodeV328.sourcePassedCheckCount,
    sourceProductionBlockerCount: sourceNodeV328.sourceProductionBlockerCount,
    inputHardeningRequirementCount: decisionRecord.inputHardeningRequirementCount,
    noGoConditionCount: decisionRecord.noGoConditionCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function addBlocker(
  messages: ImplementationCandidateGateInputHardeningDecisionMessage[],
  condition: boolean,
  code: string,
  source: ImplementationCandidateGateInputHardeningDecisionMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
