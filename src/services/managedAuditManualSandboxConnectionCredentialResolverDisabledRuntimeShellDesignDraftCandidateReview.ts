import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview,
} from "./managedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview.js";
import type {
  DisabledRuntimeShellDesignDraftCandidateNecessityProof,
  DisabledRuntimeShellDesignDraftCandidateReviewChecks,
  DisabledRuntimeShellDesignDraftCandidateReviewMessage,
  DisabledRuntimeShellDesignDraftCandidateReviewQuestion,
  DisabledRuntimeShellDesignDraftCandidateReviewRecord,
  DisabledRuntimeShellDesignDraftCandidateReviewSummary,
  DisabledRuntimeShellDesignDraftCandidateStopCondition,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReviewProfile,
  SourceNodeV330CandidateGateUpstreamHardeningReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReviewTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReviewMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReviewRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-candidate-review.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-candidate-review";
const SOURCE_NODE_V330_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-candidate-gate-upstream-hardening-review";
const ACTIVE_PLAN = "docs/plans2/v330-post-candidate-gate-upstream-hardening-roadmap.md";
const NEXT_PLAN = ACTIVE_PLAN;

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReview(
  input: {
    config: AppConfig;
    evidencePaths?: {
      javaV150EvidencePath?: string;
      miniKvV142ReceiptPath?: string;
      javaV151EvidencePath?: string;
      javaV152EvidencePath?: string;
      miniKvV143ReceiptPath?: string;
    };
  },
): ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReviewProfile {
  const sourceNodeV330 = createSourceNodeV330(input.config, input.evidencePaths);
  const necessityProof = createNecessityProof();
  const reviewQuestions = createReviewQuestions();
  const stopConditions = createStopConditions();
  const candidateReview = createCandidateReview(sourceNodeV330, necessityProof, reviewQuestions, stopConditions);
  const checks = createChecks(input.config, sourceNodeV330, necessityProof, candidateReview, reviewQuestions);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReview =
    Object.entries(checks)
      .filter(([key]) =>
        key !==
        "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReview")
      .every(([, value]) => value);
  const ready = checks
    .readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReview;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV330, reviewQuestions, stopConditions, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver disabled runtime shell design draft candidate review",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    candidateReviewState: ready ? "disabled-runtime-shell-design-draft-candidate-review-ready" : "blocked",
    candidateReviewDecision: ready ? candidateReview.decision : "blocked",
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReview: ready,
    readOnlyCandidateReview: true,
    disabledRuntimeShellDesignDraftCandidateReviewOnly: true,
    consumesNodeV330CandidateGateUpstreamHardeningReview: true,
    activeNodeVersion: "Node v331",
    sourceNodeVersion: "Node v330",
    readyForNodeV332ArchiveVerification: ready,
    readyForDisabledRuntimeShellDesignDraft: false,
    readyForDisabledRuntimeShellDesignDraftOutline: false,
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
    sourceNodeV330,
    necessityProof,
    candidateReview,
    reviewQuestions,
    stopConditions,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledRuntimeShellDesignDraftCandidateReviewJson: ROUTE_PATH,
      disabledRuntimeShellDesignDraftCandidateReviewMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV330Json: SOURCE_NODE_V330_ROUTE,
      sourceNodeV330Markdown: `${SOURCE_NODE_V330_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v332",
    },
    nextActions: [
      "Archive Node v331 as a disabled design draft candidate review, not as a design draft or runtime implementation.",
      "Let Node v332 verify the v331 route, Markdown, digest, screenshot, and historical fallback before any design outline is drafted.",
      "Do not request Java or mini-kv echo until a later version defines new contract fields that need upstream confirmation.",
      "Pause before any credential value, raw endpoint URL, provider/client, HTTP/TCP, Java write, mini-kv write/admin command, or automatic upstream start.",
    ],
  };
}

function createSourceNodeV330(
  config: AppConfig,
  evidencePaths?: {
    javaV150EvidencePath?: string;
    miniKvV142ReceiptPath?: string;
    javaV151EvidencePath?: string;
    javaV152EvidencePath?: string;
    miniKvV143ReceiptPath?: string;
  },
): SourceNodeV330CandidateGateUpstreamHardeningReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview({
    config,
    evidencePaths,
  });
  return {
    sourceVersion: "Node v330",
    profileVersion: source.profileVersion,
    reviewState: source.reviewState,
    upstreamAlignmentDecision: source.upstreamAlignmentDecision,
    readyForCandidateGateUpstreamHardeningReview:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview,
    readyForNextNodeDisabledRuntimeShellDesignDraftCandidate:
      source.readyForNextNodeDisabledRuntimeShellDesignDraftCandidate,
    readyForDisabledRuntimeShellDesignDraft: source.readyForDisabledRuntimeShellDesignDraft,
    readyForRuntimeShellImplementation: source.readyForRuntimeShellImplementation,
    readyForRuntimeShellInvocation: source.readyForRuntimeShellInvocation,
    hardeningReviewDigest: source.hardeningReview.reviewDigest,
    sourceSpan: source.hardeningReview.sourceSpan,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
    sourceWarningCount: source.summary.warningCount,
    sourceRecommendationCount: source.summary.recommendationCount,
    runtimeShellImplemented: source.runtimeShellImplemented,
    runtimeShellInvocationAllowed: source.runtimeShellInvocationAllowed,
    realResolverImplementationAllowed: source.realResolverImplementationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    httpRequestSent: source.httpRequestSent,
    tcpConnectionAttempted: source.tcpConnectionAttempted,
    automaticUpstreamStart: source.automaticUpstreamStart,
    javaSqlExecutionAllowed: source.javaSqlExecutionAllowed,
    approvalLedgerWritten: source.approvalLedgerWritten,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    rollbackExecutionAllowed: source.rollbackExecutionAllowed,
    miniKvWriteCommandAllowed: source.miniKvWriteCommandAllowed,
    miniKvLoadAllowed: source.miniKvLoadAllowed,
    miniKvCompactAllowed: source.miniKvCompactAllowed,
    miniKvRestoreAllowed: source.miniKvRestoreAllowed,
    miniKvSetnxexAllowed: source.miniKvSetnxexAllowed,
  };
}

function createNecessityProof(): DisabledRuntimeShellDesignDraftCandidateNecessityProof {
  return {
    blockerResolved: "input-hardening-aligned-but-design-draft-is-not-yet-reviewable",
    consumer: "Node v332 archive verification",
    whyV330CannotBeReused:
      "Node v330 proves upstream input-hardening alignment, but it intentionally does not define review questions, stop conditions, or archive gates for a disabled design draft candidate.",
    whyExistingDesignReviewCannotBeReused:
      "The older Node v295 design review predates the final prerequisite closure, Java v151/v152 stable evidence export, and mini-kv v143 stable current receipt; v331 must bind the new evidence chain without reviving old runtime assumptions.",
    stopCondition:
      "Stop before drafting if the next step asks for credential values, raw endpoint URLs, provider/client instantiation, HTTP/TCP, Java writes, mini-kv write/admin commands, or automatic upstream start.",
    proofComplete: true,
  };
}

function createReviewQuestions(): DisabledRuntimeShellDesignDraftCandidateReviewQuestion[] {
  return [
    question(
      "why-design-draft-candidate-now",
      "Why consider a disabled design draft candidate now?",
      "Node v330 aligned stable Java and mini-kv input-hardening evidence, so the next useful step is to verify whether a non-executing design draft candidate is worth archiving.",
    ),
    question(
      "input-hardening-aligned",
      "Is the input evidence stable enough for candidate review?",
      "Yes. v330 consumed Node v329, Java v151/v152, and mini-kv v143 with historical fallback and zero production blockers.",
    ),
    question(
      "candidate-scope-bounded",
      "Is the scope bounded away from implementation?",
      "Yes. v331 only reviews whether a design draft candidate should be archived; it does not outline, implement, or invoke a runtime shell.",
    ),
    question(
      "archive-before-outline",
      "What must happen before a design outline?",
      "Node v332 must verify the v331 route, Markdown, digest, screenshot, and fallback evidence before any design outline is drafted.",
    ),
    question(
      "no-runtime-side-effects",
      "Are runtime side effects still closed?",
      "Yes. Credential value, raw endpoint URL, provider/client, HTTP/TCP, Java writes, mini-kv writes/admin commands, and upstream auto-start all remain false.",
    ),
  ];
}

function question(
  id: DisabledRuntimeShellDesignDraftCandidateReviewQuestion["id"],
  questionText: string,
  answer: string,
): DisabledRuntimeShellDesignDraftCandidateReviewQuestion {
  return { id, question: questionText, answer, answered: true };
}

function createStopConditions(): DisabledRuntimeShellDesignDraftCandidateStopCondition[] {
  return [
    stop("CREDENTIAL_VALUE_REQUIRED", "The next step requires reading or rendering credential values."),
    stop("RAW_ENDPOINT_URL_REQUIRED", "The next step requires parsing or rendering a raw endpoint URL."),
    stop("PROVIDER_OR_CLIENT_REQUIRED", "The next step requires instantiating a provider, resolver client, or fake client."),
    stop("NETWORK_REQUEST_REQUIRED", "The next step requires HTTP/TCP or managed audit network access."),
    stop("JAVA_WRITE_REQUIRED", "The next step requires Java SQL, deployment, rollback, ledger, or schema writes."),
    stop("MINI_KV_WRITE_OR_ADMIN_REQUIRED", "The next step requires mini-kv LOAD, COMPACT, RESTORE, SETNXEX, or write commands."),
    stop("AUTO_START_REQUIRED", "The next step requires automatically starting Java, mini-kv, or external services."),
    stop("DIRECT_DESIGN_DRAFT_REQUESTED", "The next step tries to draft the disabled runtime shell outline before v332 archive verification."),
  ];
}

function stop(
  code: DisabledRuntimeShellDesignDraftCandidateStopCondition["code"],
  condition: string,
): DisabledRuntimeShellDesignDraftCandidateStopCondition {
  return { code, condition, action: "pause-before-design-draft-or-runtime" };
}

function createCandidateReview(
  sourceNodeV330: SourceNodeV330CandidateGateUpstreamHardeningReference,
  necessityProof: DisabledRuntimeShellDesignDraftCandidateNecessityProof,
  reviewQuestions: readonly DisabledRuntimeShellDesignDraftCandidateReviewQuestion[],
  stopConditions: readonly DisabledRuntimeShellDesignDraftCandidateStopCondition[],
): DisabledRuntimeShellDesignDraftCandidateReviewRecord {
  const readyForNodeV332ArchiveVerification =
    sourceNodeV330.readyForCandidateGateUpstreamHardeningReview
    && sourceNodeV330.readyForNextNodeDisabledRuntimeShellDesignDraftCandidate
    && necessityProof.proofComplete
    && reviewQuestions.every((entry) => entry.answered);

  return {
    reviewDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      sourceHardeningReviewDigest: sourceNodeV330.hardeningReviewDigest,
      necessityProof,
      reviewQuestions,
      stopConditions,
      readyForNodeV332ArchiveVerification,
    }),
    recordMode: "disabled-runtime-shell-design-draft-candidate-review-only",
    decision: readyForNodeV332ArchiveVerification
      ? "archive-before-disabled-design-draft-outline"
      : "blocked",
    sourceSpan: "Node v330 candidate gate upstream hardening review",
    candidateScope: "review-whether-a-disabled-runtime-shell-design-draft-is-worth-archiving-before-any-outline",
    requiresArchiveVerificationBeforeDesignDraft: true,
    requestsJavaMiniKvEcho: false,
    readyForNodeV332ArchiveVerification,
    allowsDisabledRuntimeShellDesignDraftNow: false,
    allowsDisabledRuntimeShellDesignDraftOutline: false,
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
    nextNodeVersionSuggested: "Node v332",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV330: SourceNodeV330CandidateGateUpstreamHardeningReference,
  necessityProof: DisabledRuntimeShellDesignDraftCandidateNecessityProof,
  candidateReview: DisabledRuntimeShellDesignDraftCandidateReviewRecord,
  reviewQuestions: readonly DisabledRuntimeShellDesignDraftCandidateReviewQuestion[],
): DisabledRuntimeShellDesignDraftCandidateReviewChecks {
  return {
    sourceNodeV330Ready:
      sourceNodeV330.reviewState === "candidate-gate-upstream-hardening-review-ready"
      && sourceNodeV330.readyForCandidateGateUpstreamHardeningReview
      && sourceNodeV330.sourceProductionBlockerCount === 0,
    sourceNodeV330AllowsCandidateReviewOnly:
      sourceNodeV330.upstreamAlignmentDecision
        === "input-hardening-aligned-proceed-to-disabled-design-draft-candidate-review"
      && sourceNodeV330.readyForNextNodeDisabledRuntimeShellDesignDraftCandidate,
    sourceNodeV330KeepsDesignDraftClosed:
      !sourceNodeV330.readyForDisabledRuntimeShellDesignDraft
      && !sourceNodeV330.readyForRuntimeShellImplementation
      && !sourceNodeV330.readyForRuntimeShellInvocation,
    sourceNodeV330KeepsRuntimeAndSideEffectsClosed:
      !sourceNodeV330.runtimeShellImplemented
      && !sourceNodeV330.runtimeShellInvocationAllowed
      && !sourceNodeV330.realResolverImplementationAllowed
      && !sourceNodeV330.executionAllowed
      && !sourceNodeV330.connectsManagedAudit
      && !sourceNodeV330.credentialValueRead
      && !sourceNodeV330.rawEndpointUrlParsed
      && !sourceNodeV330.externalRequestSent
      && !sourceNodeV330.httpRequestSent
      && !sourceNodeV330.tcpConnectionAttempted
      && !sourceNodeV330.automaticUpstreamStart
      && !sourceNodeV330.javaSqlExecutionAllowed
      && !sourceNodeV330.approvalLedgerWritten
      && !sourceNodeV330.schemaMigrationExecuted
      && !sourceNodeV330.rollbackExecutionAllowed
      && !sourceNodeV330.miniKvWriteCommandAllowed
      && !sourceNodeV330.miniKvLoadAllowed
      && !sourceNodeV330.miniKvCompactAllowed
      && !sourceNodeV330.miniKvRestoreAllowed
      && !sourceNodeV330.miniKvSetnxexAllowed,
    necessityProofComplete: necessityProof.proofComplete,
    candidateReviewOnly:
      candidateReview.recordMode === "disabled-runtime-shell-design-draft-candidate-review-only"
      && candidateReview.candidateScope
        === "review-whether-a-disabled-runtime-shell-design-draft-is-worth-archiving-before-any-outline",
    reviewQuestionsAnswered: reviewQuestions.length === 5 && reviewQuestions.every((entry) => entry.answered),
    archiveVerificationRequiredBeforeDesignDraft: candidateReview.requiresArchiveVerificationBeforeDesignDraft,
    noUpstreamEchoRequested: !candidateReview.requestsJavaMiniKvEcho,
    noRuntimeDesignDraftCreated:
      !candidateReview.allowsDisabledRuntimeShellDesignDraftNow
      && !candidateReview.allowsDisabledRuntimeShellDesignDraftOutline,
    noRuntimeImplementationCreated: !candidateReview.allowsRuntimeShellImplementation,
    noRuntimeInvocationAllowed: !candidateReview.allowsRuntimeShellInvocation,
    noCredentialValueRead: !candidateReview.allowsCredentialValueRead,
    noRawEndpointUrlParsed: !candidateReview.allowsRawEndpointUrlParse,
    noProviderClientInstantiated:
      !candidateReview.allowsSecretProviderInstantiation
      && !candidateReview.allowsResolverClientInstantiation,
    noExternalRequestSent:
      !candidateReview.allowsExternalRequest
      && !candidateReview.allowsManagedAuditConnection,
    noJavaOrMiniKvWrites:
      !candidateReview.allowsSchemaMigration
      && !candidateReview.allowsApprovalLedgerWrite
      && !candidateReview.allowsRollbackExecution
      && !candidateReview.allowsMiniKvWriteOrAdminCommand,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReview:
      false,
  };
}

function collectProductionBlockers(
  checks: DisabledRuntimeShellDesignDraftCandidateReviewChecks,
): DisabledRuntimeShellDesignDraftCandidateReviewMessage[] {
  const blockers: DisabledRuntimeShellDesignDraftCandidateReviewMessage[] = [];
  addBlocker(blockers, checks.sourceNodeV330Ready, "NODE_V330_NOT_READY", "node-v330",
    "Node v330 upstream hardening review is not ready.");
  addBlocker(blockers, checks.sourceNodeV330AllowsCandidateReviewOnly, "NODE_V330_DID_NOT_ALLOW_CANDIDATE_REVIEW",
    "node-v330", "Node v330 does not allow the disabled design draft candidate review step.");
  addBlocker(blockers, checks.sourceNodeV330KeepsDesignDraftClosed, "SOURCE_DESIGN_DRAFT_ALREADY_OPEN",
    "runtime-boundary", "Node v330 already opened design draft, runtime implementation, or invocation.");
  addBlocker(blockers, checks.sourceNodeV330KeepsRuntimeAndSideEffectsClosed, "SOURCE_SIDE_EFFECT_BOUNDARY_OPEN",
    "runtime-boundary", "Node v330 source opened credential, network, Java write, mini-kv write/admin, or auto-start behavior.");
  addBlocker(blockers, checks.necessityProofComplete, "NECESSITY_PROOF_INCOMPLETE", "necessity-proof",
    "v331 missing necessity proof.");
  addBlocker(blockers, checks.reviewQuestionsAnswered, "REVIEW_QUESTIONS_INCOMPLETE", "candidate-review",
    "v331 design draft candidate questions are incomplete.");
  addBlocker(blockers, checks.archiveVerificationRequiredBeforeDesignDraft, "ARCHIVE_VERIFICATION_NOT_REQUIRED",
    "candidate-review", "v331 must require archive verification before any design draft outline.");
  addBlocker(blockers, checks.noUpstreamEchoRequested, "UNNEEDED_UPSTREAM_ECHO_REQUESTED", "candidate-review",
    "v331 must not request Java/mini-kv echo unless it defines new contract fields.");
  addBlocker(blockers, checks.noRuntimeDesignDraftCreated, "DESIGN_DRAFT_CREATED_TOO_EARLY", "runtime-boundary",
    "v331 created or allowed a design draft outline before archive verification.");
  addBlocker(blockers, checks.noRuntimeImplementationCreated, "RUNTIME_IMPLEMENTATION_CREATED", "runtime-boundary",
    "v331 created runtime implementation permission.");
  addBlocker(blockers, checks.noProviderClientInstantiated, "PROVIDER_CLIENT_INSTANTIATED", "runtime-boundary",
    "v331 allowed provider/client instantiation.");
  addBlocker(blockers, checks.upstreamProbesStillDisabled, "UPSTREAM_PROBES_ENABLED", "configuration",
    "UPSTREAM_PROBES_ENABLED must stay false for this candidate review.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "configuration",
    "UPSTREAM_ACTIONS_ENABLED must stay false for this candidate review.");
  return blockers;
}

function collectWarnings(): DisabledRuntimeShellDesignDraftCandidateReviewMessage[] {
  return [
    {
      code: "CANDIDATE_REVIEW_IS_NOT_DESIGN_DRAFT",
      severity: "warning",
      source: "candidate-review",
      message: "v331 only reviews whether a disabled design draft candidate should be archived; it does not draft the shell.",
    },
  ];
}

function collectRecommendations(): DisabledRuntimeShellDesignDraftCandidateReviewMessage[] {
  return [
    {
      code: "RUN_NODE_V332_ARCHIVE_VERIFICATION",
      severity: "recommendation",
      source: "next-step",
      message:
        "Use Node v332 to verify the v331 route, Markdown, digest, screenshot, and historical fallback before drafting any design outline.",
    },
  ];
}

function createSummary(
  sourceNodeV330: SourceNodeV330CandidateGateUpstreamHardeningReference,
  reviewQuestions: readonly DisabledRuntimeShellDesignDraftCandidateReviewQuestion[],
  stopConditions: readonly DisabledRuntimeShellDesignDraftCandidateStopCondition[],
  checks: DisabledRuntimeShellDesignDraftCandidateReviewChecks,
  productionBlockers: readonly DisabledRuntimeShellDesignDraftCandidateReviewMessage[],
  warnings: readonly DisabledRuntimeShellDesignDraftCandidateReviewMessage[],
  recommendations: readonly DisabledRuntimeShellDesignDraftCandidateReviewMessage[],
): DisabledRuntimeShellDesignDraftCandidateReviewSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV330CheckCount: sourceNodeV330.sourceCheckCount,
    sourceNodeV330PassedCheckCount: sourceNodeV330.sourcePassedCheckCount,
    sourceProductionBlockerCount: sourceNodeV330.sourceProductionBlockerCount,
    reviewQuestionCount: reviewQuestions.length,
    answeredReviewQuestionCount: reviewQuestions.filter((entry) => entry.answered).length,
    stopConditionCount: stopConditions.length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function addBlocker(
  messages: DisabledRuntimeShellDesignDraftCandidateReviewMessage[],
  condition: boolean,
  code: string,
  source: DisabledRuntimeShellDesignDraftCandidateReviewMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
