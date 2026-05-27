import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification.js";
import type {
  DisabledRuntimeShellDesignDraftBodyPreDraftDecisionChecks,
  DisabledRuntimeShellDesignDraftBodyPreDraftDecisionMessage,
  DisabledRuntimeShellDesignDraftBodyPreDraftDecisionQuestion,
  DisabledRuntimeShellDesignDraftBodyPreDraftDecisionRecord,
  DisabledRuntimeShellDesignDraftBodyPreDraftDecisionSummary,
  DisabledRuntimeShellDesignDraftBodyPreDraftNecessityProof,
  DisabledRuntimeShellDesignDraftBodyPreDraftPreparationControl,
  DisabledRuntimeShellDesignDraftBodyPreDraftStopCondition,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionProfile,
  SourceNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-pre-draft-decision.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-pre-draft-decision";
const SOURCE_NODE_V338_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-candidate-archive-verification";
const ACTIVE_PLAN = "docs/plans2/v338-post-disabled-design-draft-body-candidate-archive-verification-roadmap.md";
const NEXT_PLAN = ACTIVE_PLAN;

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecision(
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
): ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionProfile {
  const sourceNodeV338 = createSourceNodeV338(input.config, input.archiveRoot, input.evidencePaths);
  const necessityProof = createNecessityProof();
  const decisionQuestions = createDecisionQuestions();
  const preparationControls = createPreparationControls();
  const stopConditions = createStopConditions();
  const preDraftDecisionRecord = createPreDraftDecisionRecord(
    sourceNodeV338,
    necessityProof,
    decisionQuestions,
    preparationControls,
    stopConditions,
  );
  const checks = createChecks(
    input.config,
    sourceNodeV338,
    necessityProof,
    preDraftDecisionRecord,
    decisionQuestions,
    preparationControls,
  );
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecision =
    Object.entries(checks)
      .filter(([key]) =>
        key !==
        "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecision")
      .every(([, value]) => value);
  const ready = checks
    .readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecision;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(
    sourceNodeV338,
    decisionQuestions,
    preparationControls,
    stopConditions,
    checks,
    productionBlockers,
    warnings,
    recommendations,
  );

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body pre-draft decision",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    preDraftDecisionState: ready ? "disabled-runtime-shell-design-draft-body-pre-draft-decision-ready" : "blocked",
    preDraftDecision: ready ? preDraftDecisionRecord.decision : "blocked",
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecision:
      ready,
    readOnlyPreDraftDecision: true,
    preDraftDecisionOnly: true,
    consumesNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification: true,
    activeNodeVersion: "Node v339",
    sourceNodeVersion: "Node v338",
    readyForNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification: ready,
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
    sourceNodeV338,
    necessityProof,
    preDraftDecisionRecord: ready ? preDraftDecisionRecord : {
      ...preDraftDecisionRecord,
      decision: "blocked",
      readyForNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification: false,
    },
    decisionQuestions,
    preparationControls,
    stopConditions,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledRuntimeShellDesignDraftBodyPreDraftDecisionJson: ROUTE_PATH,
      disabledRuntimeShellDesignDraftBodyPreDraftDecisionMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV338Json: SOURCE_NODE_V338_ROUTE,
      sourceNodeV338Markdown: `${SOURCE_NODE_V338_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v340",
    },
    nextActions: [
      "Archive Node v339 as a pre-draft decision before any design body content is written.",
      "Let Node v340 verify the v339 route, Markdown, digest, screenshot, and historical fallback.",
      "Do not request Java or mini-kv echo unless a future version defines new non-secret handoff fields.",
      "Pause before body draft content, credential value, raw endpoint URL, provider/client, HTTP/TCP, Java write, mini-kv write/admin command, or automatic upstream start.",
    ],
  };
}

function createSourceNodeV338(
  config: AppConfig,
  archiveRoot?: string,
  evidencePaths?: {
    javaV150EvidencePath?: string;
    miniKvV142ReceiptPath?: string;
    javaV151EvidencePath?: string;
    javaV152EvidencePath?: string;
    miniKvV143ReceiptPath?: string;
  },
): SourceNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationReference {
  const source =
    loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification({
      config,
      archiveRoot,
      evidencePaths,
    });

  return {
    sourceVersion: "Node v338",
    profileVersion: source.profileVersion,
    archiveVerificationState: source.archiveVerificationState,
    archiveVerificationDecision: source.archiveVerificationDecision,
    readyForArchiveVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification,
    readyForNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecision:
      source.readyForNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecision,
    readyForDisabledRuntimeShellDesignDraft: source.readyForDisabledRuntimeShellDesignDraft,
    readyForDisabledRuntimeShellDesignDraftOutline: source.readyForDisabledRuntimeShellDesignDraftOutline,
    archiveVerificationDigest: source.archiveVerification.verificationDigest,
    sourceReviewDigest: source.sourceNodeV337.reviewDigest,
    sourceArchiveFileCount: source.summary.archiveFileCount,
    sourcePresentArchiveFileCount: source.summary.presentArchiveFileCount,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
    sourceWarningCount: source.summary.warningCount,
    sourceRecommendationCount: source.summary.recommendationCount,
    sourceBodySectionCount: source.summary.sourceBodySectionCount,
    sourceEvidenceItemCount: source.summary.sourceEvidenceItemCount,
    sourceStopConditionCount: source.summary.sourceStopConditionCount,
    sourceReviewQuestionCount: source.summary.reviewQuestionCount,
    sourceAnsweredReviewQuestionCount: source.summary.answeredReviewQuestionCount,
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

function createNecessityProof(): DisabledRuntimeShellDesignDraftBodyPreDraftNecessityProof {
  return {
    blockerResolved: "body-candidate-archive-verified-but-pre-draft-decision-not-recorded",
    consumer: "Node v340 pre-draft decision archive verification",
    whyV338CannotBeReused:
      "Node v338 verifies the v337 body candidate archive, but it intentionally does not decide whether the next step may prepare a body draft under disabled boundaries.",
    whyThisIsNotBodyDraft:
      "v339 records a pre-draft decision and controls only; it does not write body content, implementation steps, provider/client logic, or runtime behavior.",
    stopCondition:
      "Stop before body draft content, credential value, raw endpoint URL, provider/client, HTTP/TCP, Java write, mini-kv write/admin command, or automatic upstream start.",
    proofComplete: true,
  };
}

function createDecisionQuestions(): DisabledRuntimeShellDesignDraftBodyPreDraftDecisionQuestion[] {
  return [
    decisionQuestion(
      "why-pre-draft-decision-now",
      "Why make a pre-draft decision now?",
      "Node v338 verified the v337 body candidate archive, so the next useful step is deciding whether a future disabled body draft may be prepared without writing it yet.",
    ),
    decisionQuestion(
      "candidate-archive-stable",
      "Is the body candidate archive stable enough for a pre-draft decision?",
      "Yes. v338 verified route, Markdown, digest, smoke, screenshot, explanation, walkthrough, plan index, and historical fallback evidence.",
    ),
    decisionQuestion(
      "pre-draft-scope-bounded",
      "Is the pre-draft scope bounded away from implementation?",
      "Yes. v339 only records decision questions, preparation controls, and stop conditions; it does not write body content or runtime behavior.",
    ),
    decisionQuestion(
      "archive-before-body-draft",
      "What must happen before body content is written?",
      "Node v340 must verify the v339 route, Markdown, digest, screenshot, and fallback evidence before any body draft content is written.",
    ),
    decisionQuestion(
      "no-runtime-side-effects",
      "Are runtime side effects still closed?",
      "Yes. Credential values, raw endpoint URLs, provider/client instantiation, HTTP/TCP, Java writes, mini-kv write/admin commands, and upstream auto-start all remain false.",
    ),
  ];
}

function decisionQuestion(
  id: DisabledRuntimeShellDesignDraftBodyPreDraftDecisionQuestion["id"],
  question: string,
  answer: string,
): DisabledRuntimeShellDesignDraftBodyPreDraftDecisionQuestion {
  return { id, question, answer, answered: true };
}

function createPreparationControls(): DisabledRuntimeShellDesignDraftBodyPreDraftPreparationControl[] {
  return [
    preparationControl("use-existing-body-section-catalog", "Reuse the v335 body section catalog instead of inventing new runtime sections."),
    preparationControl("write-no-body-content-yet", "Do not write body paragraphs, pseudo-code, provider/client details, or runtime steps in v339."),
    preparationControl("no-new-cross-project-contract", "Do not request Java/mini-kv echo unless a later version defines new non-secret handoff fields."),
    preparationControl("keep-runtime-shell-disabled", "Keep runtime shell implementation, invocation, provider/client, and network surfaces disabled."),
    preparationControl("archive-pre-draft-decision-first", "Require v340 archive verification before any body draft content is written."),
    preparationControl("stop-on-secret-network-or-write", "Pause if the next step needs secrets, raw endpoints, network calls, Java writes, or mini-kv write/admin commands."),
  ];
}

function preparationControl(
  id: DisabledRuntimeShellDesignDraftBodyPreDraftPreparationControl["id"],
  control: string,
): DisabledRuntimeShellDesignDraftBodyPreDraftPreparationControl {
  return { id, control, enforced: true };
}

function createStopConditions(): DisabledRuntimeShellDesignDraftBodyPreDraftStopCondition[] {
  return [
    stop("BODY_DRAFT_CONTENT_REQUESTED", "The next step asks v339 to write actual design body content."),
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
  code: DisabledRuntimeShellDesignDraftBodyPreDraftStopCondition["code"],
  condition: string,
): DisabledRuntimeShellDesignDraftBodyPreDraftStopCondition {
  return { code, condition, action: "pause-before-body-draft-or-runtime" };
}

function createPreDraftDecisionRecord(
  sourceNodeV338: SourceNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationReference,
  necessityProof: DisabledRuntimeShellDesignDraftBodyPreDraftNecessityProof,
  decisionQuestions: readonly DisabledRuntimeShellDesignDraftBodyPreDraftDecisionQuestion[],
  preparationControls: readonly DisabledRuntimeShellDesignDraftBodyPreDraftPreparationControl[],
  stopConditions: readonly DisabledRuntimeShellDesignDraftBodyPreDraftStopCondition[],
): DisabledRuntimeShellDesignDraftBodyPreDraftDecisionRecord {
  const readyForNodeV340 =
    sourceNodeV338.readyForArchiveVerification
    && sourceNodeV338.readyForNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecision
    && necessityProof.proofComplete
    && decisionQuestions.length === 5
    && decisionQuestions.every((entry) => entry.answered)
    && preparationControls.length === 6
    && preparationControls.every((entry) => entry.enforced)
    && stopConditions.length === 8;

  return {
    decisionDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      sourceArchiveVerificationDigest: sourceNodeV338.archiveVerificationDigest,
      sourceReviewDigest: sourceNodeV338.sourceReviewDigest,
      necessityProof,
      decisionQuestions,
      preparationControls,
      stopConditions,
      readyForNodeV340,
    }),
    decisionMode: "disabled-runtime-shell-design-draft-body-pre-draft-decision-only",
    decision: readyForNodeV340 ? "prepare-body-draft-under-disabled-boundary-after-archive" : "blocked",
    sourceSpan: "Node v338 disabled design draft body candidate archive verification",
    preDraftScope: "decide-whether-a-future-disabled-body-draft-may-be-prepared-without-writing-it-now",
    requiresArchiveVerificationBeforeBodyDraft: true,
    requestsJavaMiniKvEcho: false,
    decisionQuestionCount: decisionQuestions.length,
    preparationControlCount: preparationControls.length,
    stopConditionCount: stopConditions.length,
    allowsBodyDraftPreparation: true,
    writesBodyDraftNow: false,
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
    readyForNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification: readyForNodeV340,
    nextNodeVersionSuggested: "Node v340",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV338: SourceNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationReference,
  necessityProof: DisabledRuntimeShellDesignDraftBodyPreDraftNecessityProof,
  preDraftDecision: DisabledRuntimeShellDesignDraftBodyPreDraftDecisionRecord,
  decisionQuestions: readonly DisabledRuntimeShellDesignDraftBodyPreDraftDecisionQuestion[],
  preparationControls: readonly DisabledRuntimeShellDesignDraftBodyPreDraftPreparationControl[],
): DisabledRuntimeShellDesignDraftBodyPreDraftDecisionChecks {
  return {
    sourceNodeV338Ready:
      sourceNodeV338.archiveVerificationState === "disabled-design-draft-body-candidate-archive-verified"
      && sourceNodeV338.archiveVerificationDecision === "body-candidate-archive-verified-before-design-body"
      && sourceNodeV338.readyForArchiveVerification
      && sourceNodeV338.sourceProductionBlockerCount === 0,
    sourceNodeV338AllowsPreDraftDecisionOnly:
      sourceNodeV338.readyForNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecision,
    sourceNodeV338KeepsDesignDraftClosed:
      !sourceNodeV338.readyForDisabledRuntimeShellDesignDraft
      && !sourceNodeV338.readyForDisabledRuntimeShellDesignDraftOutline,
    sourceNodeV338KeepsRuntimeAndSideEffectsClosed:
      !sourceNodeV338.runtimeShellImplemented
      && !sourceNodeV338.runtimeShellInvocationAllowed
      && !sourceNodeV338.realResolverImplementationAllowed
      && !sourceNodeV338.executionAllowed
      && !sourceNodeV338.connectsManagedAudit
      && !sourceNodeV338.credentialValueRead
      && !sourceNodeV338.rawEndpointUrlParsed
      && !sourceNodeV338.externalRequestSent
      && !sourceNodeV338.httpRequestSent
      && !sourceNodeV338.tcpConnectionAttempted
      && !sourceNodeV338.automaticUpstreamStart
      && !sourceNodeV338.javaSqlExecutionAllowed
      && !sourceNodeV338.approvalLedgerWritten
      && !sourceNodeV338.schemaMigrationExecuted
      && !sourceNodeV338.rollbackExecutionAllowed
      && !sourceNodeV338.miniKvWriteCommandAllowed
      && !sourceNodeV338.miniKvLoadAllowed
      && !sourceNodeV338.miniKvCompactAllowed
      && !sourceNodeV338.miniKvRestoreAllowed
      && !sourceNodeV338.miniKvSetnxexAllowed,
    necessityProofComplete: necessityProof.proofComplete,
    preDraftDecisionOnly:
      preDraftDecision.decisionMode === "disabled-runtime-shell-design-draft-body-pre-draft-decision-only"
      && preDraftDecision.preDraftScope
        === "decide-whether-a-future-disabled-body-draft-may-be-prepared-without-writing-it-now",
    decisionQuestionsAnswered: decisionQuestions.length === 5 && decisionQuestions.every((entry) => entry.answered),
    preparationControlsEnforced:
      preparationControls.length === 6 && preparationControls.every((entry) => entry.enforced),
    archiveVerificationRequiredBeforeBodyDraft: preDraftDecision.requiresArchiveVerificationBeforeBodyDraft,
    noUpstreamEchoRequested: !preDraftDecision.requestsJavaMiniKvEcho,
    noBodyDraftWritten:
      preDraftDecision.allowsBodyDraftPreparation
      && !preDraftDecision.writesBodyDraftNow
      && !preDraftDecision.allowsDisabledRuntimeShellDesignDraftNow
      && !preDraftDecision.allowsDisabledRuntimeShellDesignDraftOutlineNow,
    noRuntimeImplementationCreated: !preDraftDecision.allowsRuntimeShellImplementation,
    noRuntimeInvocationAllowed: !preDraftDecision.allowsRuntimeShellInvocation,
    noCredentialValueRead: !preDraftDecision.allowsCredentialValueRead,
    noRawEndpointUrlParsed: !preDraftDecision.allowsRawEndpointUrlParse,
    noProviderClientInstantiated:
      !preDraftDecision.allowsSecretProviderInstantiation
      && !preDraftDecision.allowsResolverClientInstantiation,
    noExternalRequestSent:
      !preDraftDecision.allowsExternalRequest
      && !preDraftDecision.allowsManagedAuditConnection,
    noJavaOrMiniKvWrites:
      !preDraftDecision.allowsSchemaMigration
      && !preDraftDecision.allowsApprovalLedgerWrite
      && !preDraftDecision.allowsRollbackExecution
      && !preDraftDecision.allowsMiniKvWriteOrAdminCommand,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecision:
      false,
  };
}

function collectProductionBlockers(
  checks: DisabledRuntimeShellDesignDraftBodyPreDraftDecisionChecks,
): DisabledRuntimeShellDesignDraftBodyPreDraftDecisionMessage[] {
  const blockers: DisabledRuntimeShellDesignDraftBodyPreDraftDecisionMessage[] = [];
  addBlocker(blockers, checks.sourceNodeV338Ready, "NODE_V338_NOT_READY", "node-v338",
    "Node v338 body candidate archive verification is not ready.");
  addBlocker(blockers, checks.sourceNodeV338AllowsPreDraftDecisionOnly,
    "NODE_V338_DID_NOT_ALLOW_PRE_DRAFT_DECISION", "node-v338",
    "Node v338 did not allow the pre-draft decision step.");
  addBlocker(blockers, checks.sourceNodeV338KeepsDesignDraftClosed, "SOURCE_DESIGN_DRAFT_ALREADY_OPEN",
    "runtime-boundary", "Node v338 already opened design draft body, outline, runtime implementation, or invocation.");
  addBlocker(blockers, checks.sourceNodeV338KeepsRuntimeAndSideEffectsClosed, "SOURCE_SIDE_EFFECT_BOUNDARY_OPEN",
    "runtime-boundary", "Node v338 source opened credential, network, Java write, mini-kv write/admin, or auto-start behavior.");
  addBlocker(blockers, checks.necessityProofComplete, "NECESSITY_PROOF_INCOMPLETE", "necessity-proof",
    "v339 missing necessity proof.");
  addBlocker(blockers, checks.decisionQuestionsAnswered, "DECISION_QUESTIONS_INCOMPLETE", "pre-draft-decision",
    "v339 pre-draft decision questions are incomplete.");
  addBlocker(blockers, checks.preparationControlsEnforced, "PREPARATION_CONTROLS_INCOMPLETE",
    "pre-draft-decision", "v339 preparation controls are incomplete.");
  addBlocker(blockers, checks.archiveVerificationRequiredBeforeBodyDraft, "ARCHIVE_VERIFICATION_NOT_REQUIRED",
    "pre-draft-decision", "v339 must require archive verification before any body draft content.");
  addBlocker(blockers, checks.noUpstreamEchoRequested, "UNNEEDED_UPSTREAM_ECHO_REQUESTED", "pre-draft-decision",
    "v339 must not request Java/mini-kv echo unless it defines new contract fields.");
  addBlocker(blockers, checks.noBodyDraftWritten, "BODY_DRAFT_WRITTEN_TOO_EARLY", "runtime-boundary",
    "v339 wrote or allowed design body content before archive verification.");
  addBlocker(blockers, checks.noRuntimeImplementationCreated, "RUNTIME_IMPLEMENTATION_CREATED", "runtime-boundary",
    "v339 created runtime implementation permission.");
  addBlocker(blockers, checks.noProviderClientInstantiated, "PROVIDER_CLIENT_INSTANTIATED", "runtime-boundary",
    "v339 allowed provider/client instantiation.");
  addBlocker(blockers, checks.upstreamProbesStillDisabled, "UPSTREAM_PROBES_ENABLED", "configuration",
    "UPSTREAM_PROBES_ENABLED must stay false for this pre-draft decision.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "configuration",
    "UPSTREAM_ACTIONS_ENABLED must stay false for this pre-draft decision.");
  return blockers;
}

function collectWarnings(): DisabledRuntimeShellDesignDraftBodyPreDraftDecisionMessage[] {
  return [
    {
      code: "PRE_DRAFT_DECISION_IS_NOT_BODY_DRAFT",
      severity: "warning",
      source: "pre-draft-decision",
      message: "v339 only records whether a future disabled design body may be prepared; it does not write the body.",
    },
  ];
}

function collectRecommendations(): DisabledRuntimeShellDesignDraftBodyPreDraftDecisionMessage[] {
  return [
    {
      code: "RUN_NODE_V340_ARCHIVE_VERIFICATION",
      severity: "recommendation",
      source: "next-step",
      message:
        "Use Node v340 to verify the v339 route, Markdown, digest, screenshot, and historical fallback before drafting any body content.",
    },
  ];
}

function createSummary(
  sourceNodeV338: SourceNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationReference,
  decisionQuestions: readonly DisabledRuntimeShellDesignDraftBodyPreDraftDecisionQuestion[],
  preparationControls: readonly DisabledRuntimeShellDesignDraftBodyPreDraftPreparationControl[],
  stopConditions: readonly DisabledRuntimeShellDesignDraftBodyPreDraftStopCondition[],
  checks: DisabledRuntimeShellDesignDraftBodyPreDraftDecisionChecks,
  productionBlockers: readonly DisabledRuntimeShellDesignDraftBodyPreDraftDecisionMessage[],
  warnings: readonly DisabledRuntimeShellDesignDraftBodyPreDraftDecisionMessage[],
  recommendations: readonly DisabledRuntimeShellDesignDraftBodyPreDraftDecisionMessage[],
): DisabledRuntimeShellDesignDraftBodyPreDraftDecisionSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV338CheckCount: sourceNodeV338.sourceCheckCount,
    sourceNodeV338PassedCheckCount: sourceNodeV338.sourcePassedCheckCount,
    sourceArchiveFileCount: sourceNodeV338.sourceArchiveFileCount,
    sourcePresentArchiveFileCount: sourceNodeV338.sourcePresentArchiveFileCount,
    sourceProductionBlockerCount: sourceNodeV338.sourceProductionBlockerCount,
    sourceBodySectionCount: sourceNodeV338.sourceBodySectionCount,
    sourceEvidenceItemCount: sourceNodeV338.sourceEvidenceItemCount,
    sourceStopConditionCount: sourceNodeV338.sourceStopConditionCount,
    sourceReviewQuestionCount: sourceNodeV338.sourceReviewQuestionCount,
    sourceAnsweredReviewQuestionCount: sourceNodeV338.sourceAnsweredReviewQuestionCount,
    decisionQuestionCount: decisionQuestions.length,
    answeredDecisionQuestionCount: decisionQuestions.filter((entry) => entry.answered).length,
    preparationControlCount: preparationControls.length,
    enforcedPreparationControlCount: preparationControls.filter((entry) => entry.enforced).length,
    stopConditionCount: stopConditions.length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function addBlocker(
  messages: DisabledRuntimeShellDesignDraftBodyPreDraftDecisionMessage[],
  condition: boolean,
  code: string,
  source: DisabledRuntimeShellDesignDraftBodyPreDraftDecisionMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
