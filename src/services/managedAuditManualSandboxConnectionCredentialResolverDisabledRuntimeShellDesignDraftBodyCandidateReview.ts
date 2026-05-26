import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification.js";
import type {
  DisabledRuntimeShellDesignDraftBodyCandidateNecessityProof,
  DisabledRuntimeShellDesignDraftBodyCandidateReviewChecks,
  DisabledRuntimeShellDesignDraftBodyCandidateReviewMessage,
  DisabledRuntimeShellDesignDraftBodyCandidateReviewQuestion,
  DisabledRuntimeShellDesignDraftBodyCandidateReviewRecord,
  DisabledRuntimeShellDesignDraftBodyCandidateReviewSummary,
  DisabledRuntimeShellDesignDraftBodyCandidateStopCondition,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReviewProfile,
  SourceNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReviewTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReviewMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReviewRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-candidate-review.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-candidate-review";
const SOURCE_NODE_V336_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-intake-archive-verification";
const ACTIVE_PLAN = "docs/plans2/v336-post-disabled-design-draft-body-intake-archive-verification-roadmap.md";
const NEXT_PLAN = ACTIVE_PLAN;

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReview(
  input: {
    config: AppConfig;
    archiveRoot?: string;
    evidencePaths?: {
      javaV150EvidencePath?: string;
      miniKvV142ReceiptPath?: string;
      javaV151EvidencePath?: string;
      javaV152EvidencePath?: string;
      miniKvV143ReceiptPath?: string;
    };
  },
): ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReviewProfile {
  const sourceNodeV336 = createSourceNodeV336(input.config, input.archiveRoot, input.evidencePaths);
  const necessityProof = createNecessityProof();
  const reviewQuestions = createReviewQuestions();
  const stopConditions = createStopConditions();
  const bodyCandidateReview = createBodyCandidateReview(sourceNodeV336, necessityProof, reviewQuestions,
    stopConditions);
  const checks = createChecks(input.config, sourceNodeV336, necessityProof, bodyCandidateReview, reviewQuestions);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReview =
    Object.entries(checks)
      .filter(([key]) =>
        key !==
        "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReview")
      .every(([, value]) => value);
  const ready = checks
    .readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReview;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV336, reviewQuestions, stopConditions, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body candidate review",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    bodyCandidateReviewState: ready ? "disabled-runtime-shell-design-draft-body-candidate-review-ready" : "blocked",
    bodyCandidateReviewDecision: ready ? bodyCandidateReview.decision : "blocked",
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReview:
      ready,
    readOnlyBodyCandidateReview: true,
    bodyCandidateReviewOnly: true,
    consumesNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification: true,
    activeNodeVersion: "Node v337",
    sourceNodeVersion: "Node v336",
    readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification: ready,
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
    sourceNodeV336,
    necessityProof,
    bodyCandidateReview: ready ? bodyCandidateReview : {
      ...bodyCandidateReview,
      decision: "blocked",
      readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification: false,
    },
    reviewQuestions,
    stopConditions,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledRuntimeShellDesignDraftBodyCandidateReviewJson: ROUTE_PATH,
      disabledRuntimeShellDesignDraftBodyCandidateReviewMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV336Json: SOURCE_NODE_V336_ROUTE,
      sourceNodeV336Markdown: `${SOURCE_NODE_V336_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v338",
    },
    nextActions: [
      "Archive Node v337 as a disabled design draft body candidate review, not as a design body or runtime implementation.",
      "Let Node v338 verify the v337 route, Markdown, digest, screenshot, and historical fallback before any design body is drafted.",
      "Do not request Java or mini-kv echo until a later version defines new non-secret handoff fields that need upstream confirmation.",
      "Pause before any body draft, credential value, raw endpoint URL, provider/client, HTTP/TCP, Java write, mini-kv write/admin command, or automatic upstream start.",
    ],
  };
}

function createSourceNodeV336(
  config: AppConfig,
  archiveRoot?: string,
  evidencePaths?: {
    javaV150EvidencePath?: string;
    miniKvV142ReceiptPath?: string;
    javaV151EvidencePath?: string;
    javaV152EvidencePath?: string;
    miniKvV143ReceiptPath?: string;
  },
): SourceNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationReference {
  const source =
    loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification({
      config,
      archiveRoot,
      evidencePaths,
    });

  return {
    sourceVersion: "Node v336",
    profileVersion: source.profileVersion,
    archiveVerificationState: source.archiveVerificationState,
    archiveVerificationDecision: source.archiveVerificationDecision,
    readyForArchiveVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification,
    readyForNodeV337DisabledRuntimeShellDesignDraftBodyCandidateReview:
      source.readyForNodeV337DisabledRuntimeShellDesignDraftBodyCandidateReview,
    readyForDisabledRuntimeShellDesignDraft: source.readyForDisabledRuntimeShellDesignDraft,
    readyForDisabledRuntimeShellDesignDraftOutline: source.readyForDisabledRuntimeShellDesignDraftOutline,
    archiveVerificationDigest: source.archiveVerification.verificationDigest,
    sourceBodyIntakeDigest: source.sourceNodeV335.bodyIntakeDigest,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    archiveFileCount: source.summary.archiveFileCount,
    presentArchiveFileCount: source.summary.presentArchiveFileCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
    sourceWarningCount: source.summary.warningCount,
    sourceRecommendationCount: source.summary.recommendationCount,
    sourceBodySectionCount: source.summary.sourceBodySectionCount,
    sourceEvidenceItemCount: source.summary.sourceEvidenceItemCount,
    sourceStopConditionCount: source.summary.sourceStopConditionCount,
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

function createNecessityProof(): DisabledRuntimeShellDesignDraftBodyCandidateNecessityProof {
  return {
    blockerResolved: "body-intake-archive-verified-but-body-candidate-not-reviewed",
    consumer: "Node v338 body candidate archive verification",
    whyV336CannotBeReused:
      "Node v336 verifies the v335 body intake archive, but it intentionally does not answer whether the body candidate is ready to be archived before any body draft.",
    whyThisIsNotDesignDraftBody:
      "v337 only reviews readiness questions and stop conditions for a future body; it does not draft body paragraphs, implementation steps, provider/client logic, or runtime behavior.",
    stopCondition:
      "Stop before any body draft, credential value, raw endpoint URL, provider/client, HTTP/TCP, Java write, mini-kv write/admin command, or automatic upstream start.",
    proofComplete: true,
  };
}

function createReviewQuestions(): DisabledRuntimeShellDesignDraftBodyCandidateReviewQuestion[] {
  return [
    question(
      "why-body-candidate-review-now",
      "Why review the disabled design draft body candidate now?",
      "Node v336 verified the v335 body intake archive, so the next useful step is to decide whether a body candidate may be archived before any body draft is written.",
    ),
    question(
      "body-intake-archive-stable",
      "Is the body intake archive stable enough for candidate review?",
      "Yes. v336 verified route, Markdown, digest, smoke, screenshot, explanation, walkthrough, plan index, and historical fallback evidence.",
    ),
    question(
      "body-candidate-scope-bounded",
      "Is the candidate scope bounded away from implementation?",
      "Yes. v337 only reviews candidate readiness and does not write a design body, outline, runtime shell, adapter, provider, or client.",
    ),
    question(
      "archive-before-body-draft",
      "What must happen before a design body draft?",
      "Node v338 must verify the v337 route, Markdown, digest, screenshot, and fallback evidence before any body draft is written.",
    ),
    question(
      "no-runtime-side-effects",
      "Are runtime side effects still closed?",
      "Yes. Credential values, raw endpoint URLs, provider/client instantiation, HTTP/TCP, Java writes, mini-kv write/admin commands, and upstream auto-start all remain false.",
    ),
  ];
}

function question(
  id: DisabledRuntimeShellDesignDraftBodyCandidateReviewQuestion["id"],
  questionText: string,
  answer: string,
): DisabledRuntimeShellDesignDraftBodyCandidateReviewQuestion {
  return { id, question: questionText, answer, answered: true };
}

function createStopConditions(): DisabledRuntimeShellDesignDraftBodyCandidateStopCondition[] {
  return [
    stop("BODY_DRAFT_REQUESTED", "The next step asks v337 to draft the actual design body."),
    stop("CREDENTIAL_VALUE_REQUIRED", "The next step requires reading or rendering credential values."),
    stop("RAW_ENDPOINT_URL_REQUIRED", "The next step requires parsing or rendering a raw endpoint URL."),
    stop("PROVIDER_OR_CLIENT_REQUIRED", "The next step requires instantiating a provider, resolver client, or fake client."),
    stop("NETWORK_REQUEST_REQUIRED", "The next step requires HTTP/TCP or managed audit network access."),
    stop("JAVA_WRITE_REQUIRED", "The next step requires Java SQL, deployment, rollback, ledger, or schema writes."),
    stop("MINI_KV_WRITE_OR_ADMIN_REQUIRED", "The next step requires mini-kv LOAD, COMPACT, RESTORE, SETNXEX, or write commands."),
    stop("AUTO_START_REQUIRED", "The next step requires automatically starting Java, mini-kv, or external services."),
  ];
}

function stop(
  code: DisabledRuntimeShellDesignDraftBodyCandidateStopCondition["code"],
  condition: string,
): DisabledRuntimeShellDesignDraftBodyCandidateStopCondition {
  return { code, condition, action: "pause-before-body-draft-or-runtime" };
}

function createBodyCandidateReview(
  sourceNodeV336: SourceNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationReference,
  necessityProof: DisabledRuntimeShellDesignDraftBodyCandidateNecessityProof,
  reviewQuestions: readonly DisabledRuntimeShellDesignDraftBodyCandidateReviewQuestion[],
  stopConditions: readonly DisabledRuntimeShellDesignDraftBodyCandidateStopCondition[],
): DisabledRuntimeShellDesignDraftBodyCandidateReviewRecord {
  const readyForNodeV338ArchiveVerification =
    sourceNodeV336.readyForArchiveVerification
    && sourceNodeV336.readyForNodeV337DisabledRuntimeShellDesignDraftBodyCandidateReview
    && necessityProof.proofComplete
    && reviewQuestions.length === 5
    && reviewQuestions.every((entry) => entry.answered)
    && stopConditions.length === 8;

  return {
    reviewDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      sourceArchiveVerificationDigest: sourceNodeV336.archiveVerificationDigest,
      sourceBodyIntakeDigest: sourceNodeV336.sourceBodyIntakeDigest,
      necessityProof,
      reviewQuestions,
      stopConditions,
      readyForNodeV338ArchiveVerification,
    }),
    recordMode: "disabled-runtime-shell-design-draft-body-candidate-review-only",
    decision: readyForNodeV338ArchiveVerification
      ? "archive-before-disabled-design-draft-body"
      : "blocked",
    sourceSpan: "Node v336 disabled design draft body intake archive verification",
    candidateScope: "review-whether-disabled-design-draft-body-is-ready-for-archive-before-any-body-draft",
    requiresArchiveVerificationBeforeBodyDraft: true,
    requestsJavaMiniKvEcho: false,
    reviewQuestionCount: reviewQuestions.length,
    stopConditionCount: stopConditions.length,
    allowsDisabledRuntimeShellDesignDraftNow: false,
    allowsDisabledRuntimeShellDesignDraftOutlineNow: false,
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
    readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification: readyForNodeV338ArchiveVerification,
    nextNodeVersionSuggested: "Node v338",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV336: SourceNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationReference,
  necessityProof: DisabledRuntimeShellDesignDraftBodyCandidateNecessityProof,
  candidateReview: DisabledRuntimeShellDesignDraftBodyCandidateReviewRecord,
  reviewQuestions: readonly DisabledRuntimeShellDesignDraftBodyCandidateReviewQuestion[],
): DisabledRuntimeShellDesignDraftBodyCandidateReviewChecks {
  return {
    sourceNodeV336Ready:
      sourceNodeV336.archiveVerificationState === "disabled-design-draft-body-intake-archive-verified"
      && sourceNodeV336.archiveVerificationDecision === "proceed-to-disabled-design-draft-body-candidate-review"
      && sourceNodeV336.readyForArchiveVerification
      && sourceNodeV336.sourceProductionBlockerCount === 0,
    sourceNodeV336AllowsBodyCandidateReviewOnly:
      sourceNodeV336.readyForNodeV337DisabledRuntimeShellDesignDraftBodyCandidateReview,
    sourceNodeV336KeepsDesignDraftClosed:
      !sourceNodeV336.readyForDisabledRuntimeShellDesignDraft
      && !sourceNodeV336.readyForDisabledRuntimeShellDesignDraftOutline,
    sourceNodeV336KeepsRuntimeAndSideEffectsClosed:
      !sourceNodeV336.runtimeShellImplemented
      && !sourceNodeV336.runtimeShellInvocationAllowed
      && !sourceNodeV336.realResolverImplementationAllowed
      && !sourceNodeV336.executionAllowed
      && !sourceNodeV336.connectsManagedAudit
      && !sourceNodeV336.credentialValueRead
      && !sourceNodeV336.rawEndpointUrlParsed
      && !sourceNodeV336.externalRequestSent
      && !sourceNodeV336.httpRequestSent
      && !sourceNodeV336.tcpConnectionAttempted
      && !sourceNodeV336.automaticUpstreamStart
      && !sourceNodeV336.javaSqlExecutionAllowed
      && !sourceNodeV336.approvalLedgerWritten
      && !sourceNodeV336.schemaMigrationExecuted
      && !sourceNodeV336.rollbackExecutionAllowed
      && !sourceNodeV336.miniKvWriteCommandAllowed
      && !sourceNodeV336.miniKvLoadAllowed
      && !sourceNodeV336.miniKvCompactAllowed
      && !sourceNodeV336.miniKvRestoreAllowed
      && !sourceNodeV336.miniKvSetnxexAllowed,
    necessityProofComplete: necessityProof.proofComplete,
    bodyCandidateReviewOnly:
      candidateReview.recordMode === "disabled-runtime-shell-design-draft-body-candidate-review-only"
      && candidateReview.candidateScope
        === "review-whether-disabled-design-draft-body-is-ready-for-archive-before-any-body-draft",
    reviewQuestionsAnswered: reviewQuestions.length === 5 && reviewQuestions.every((entry) => entry.answered),
    archiveVerificationRequiredBeforeBodyDraft: candidateReview.requiresArchiveVerificationBeforeBodyDraft,
    noUpstreamEchoRequested: !candidateReview.requestsJavaMiniKvEcho,
    noBodyDraftCreated:
      !candidateReview.allowsDisabledRuntimeShellDesignDraftNow
      && !candidateReview.allowsDisabledRuntimeShellDesignDraftOutlineNow,
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
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReview:
      false,
  };
}

function collectProductionBlockers(
  checks: DisabledRuntimeShellDesignDraftBodyCandidateReviewChecks,
): DisabledRuntimeShellDesignDraftBodyCandidateReviewMessage[] {
  const blockers: DisabledRuntimeShellDesignDraftBodyCandidateReviewMessage[] = [];
  addBlocker(blockers, checks.sourceNodeV336Ready, "NODE_V336_NOT_READY", "node-v336",
    "Node v336 body intake archive verification is not ready.");
  addBlocker(blockers, checks.sourceNodeV336AllowsBodyCandidateReviewOnly,
    "NODE_V336_DID_NOT_ALLOW_BODY_CANDIDATE_REVIEW", "node-v336",
    "Node v336 did not allow the disabled design draft body candidate review step.");
  addBlocker(blockers, checks.sourceNodeV336KeepsDesignDraftClosed, "SOURCE_DESIGN_DRAFT_ALREADY_OPEN",
    "runtime-boundary", "Node v336 already opened design draft body, outline, runtime implementation, or invocation.");
  addBlocker(blockers, checks.sourceNodeV336KeepsRuntimeAndSideEffectsClosed, "SOURCE_SIDE_EFFECT_BOUNDARY_OPEN",
    "runtime-boundary", "Node v336 source opened credential, network, Java write, mini-kv write/admin, or auto-start behavior.");
  addBlocker(blockers, checks.necessityProofComplete, "NECESSITY_PROOF_INCOMPLETE", "necessity-proof",
    "v337 missing necessity proof.");
  addBlocker(blockers, checks.reviewQuestionsAnswered, "REVIEW_QUESTIONS_INCOMPLETE", "body-candidate-review",
    "v337 body candidate review questions are incomplete.");
  addBlocker(blockers, checks.archiveVerificationRequiredBeforeBodyDraft, "ARCHIVE_VERIFICATION_NOT_REQUIRED",
    "body-candidate-review", "v337 must require archive verification before any body draft.");
  addBlocker(blockers, checks.noUpstreamEchoRequested, "UNNEEDED_UPSTREAM_ECHO_REQUESTED", "body-candidate-review",
    "v337 must not request Java/mini-kv echo unless it defines new contract fields.");
  addBlocker(blockers, checks.noBodyDraftCreated, "BODY_DRAFT_CREATED_TOO_EARLY", "runtime-boundary",
    "v337 created or allowed a design body before archive verification.");
  addBlocker(blockers, checks.noRuntimeImplementationCreated, "RUNTIME_IMPLEMENTATION_CREATED", "runtime-boundary",
    "v337 created runtime implementation permission.");
  addBlocker(blockers, checks.noProviderClientInstantiated, "PROVIDER_CLIENT_INSTANTIATED", "runtime-boundary",
    "v337 allowed provider/client instantiation.");
  addBlocker(blockers, checks.upstreamProbesStillDisabled, "UPSTREAM_PROBES_ENABLED", "configuration",
    "UPSTREAM_PROBES_ENABLED must stay false for this body candidate review.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "configuration",
    "UPSTREAM_ACTIONS_ENABLED must stay false for this body candidate review.");
  return blockers;
}

function collectWarnings(): DisabledRuntimeShellDesignDraftBodyCandidateReviewMessage[] {
  return [
    {
      code: "BODY_CANDIDATE_REVIEW_IS_NOT_BODY_DRAFT",
      severity: "warning",
      source: "body-candidate-review",
      message: "v337 only reviews whether a disabled design draft body candidate may be archived; it does not write the body.",
    },
  ];
}

function collectRecommendations(): DisabledRuntimeShellDesignDraftBodyCandidateReviewMessage[] {
  return [
    {
      code: "RUN_NODE_V338_ARCHIVE_VERIFICATION",
      severity: "recommendation",
      source: "next-step",
      message:
        "Use Node v338 to verify the v337 route, Markdown, digest, screenshot, and historical fallback before drafting any design body.",
    },
  ];
}

function createSummary(
  sourceNodeV336: SourceNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationReference,
  reviewQuestions: readonly DisabledRuntimeShellDesignDraftBodyCandidateReviewQuestion[],
  stopConditions: readonly DisabledRuntimeShellDesignDraftBodyCandidateStopCondition[],
  checks: DisabledRuntimeShellDesignDraftBodyCandidateReviewChecks,
  productionBlockers: readonly DisabledRuntimeShellDesignDraftBodyCandidateReviewMessage[],
  warnings: readonly DisabledRuntimeShellDesignDraftBodyCandidateReviewMessage[],
  recommendations: readonly DisabledRuntimeShellDesignDraftBodyCandidateReviewMessage[],
): DisabledRuntimeShellDesignDraftBodyCandidateReviewSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV336CheckCount: sourceNodeV336.sourceCheckCount,
    sourceNodeV336PassedCheckCount: sourceNodeV336.sourcePassedCheckCount,
    sourceArchiveFileCount: sourceNodeV336.archiveFileCount,
    sourcePresentArchiveFileCount: sourceNodeV336.presentArchiveFileCount,
    sourceProductionBlockerCount: sourceNodeV336.sourceProductionBlockerCount,
    sourceBodySectionCount: sourceNodeV336.sourceBodySectionCount,
    sourceEvidenceItemCount: sourceNodeV336.sourceEvidenceItemCount,
    sourceStopConditionCount: sourceNodeV336.sourceStopConditionCount,
    reviewQuestionCount: reviewQuestions.length,
    answeredReviewQuestionCount: reviewQuestions.filter((entry) => entry.answered).length,
    stopConditionCount: stopConditions.length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function addBlocker(
  messages: DisabledRuntimeShellDesignDraftBodyCandidateReviewMessage[],
  condition: boolean,
  code: string,
  source: DisabledRuntimeShellDesignDraftBodyCandidateReviewMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
