import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerification.js";
import type {
  DisabledRuntimeShellDesignDraftOutlineIntakeChecks,
  DisabledRuntimeShellDesignDraftOutlineIntakeMessage,
  DisabledRuntimeShellDesignDraftOutlineIntakeNecessityProof,
  DisabledRuntimeShellDesignDraftOutlineIntakeRecord,
  DisabledRuntimeShellDesignDraftOutlineIntakeSummary,
  DisabledRuntimeShellDesignDraftOutlineSection,
  DisabledRuntimeShellDesignDraftOutlineStopCondition,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntakeProfile,
  SourceNodeV332DisabledDesignDraftCandidateArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntakeTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntakeMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntakeRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-outline-intake.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-outline-intake";
const SOURCE_NODE_V332_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-candidate-archive-verification";
const ACTIVE_PLAN = "docs/plans2/v332-post-disabled-design-draft-candidate-archive-verification-roadmap.md";
const NEXT_PLAN = ACTIVE_PLAN;

const OUTLINE_SECTIONS: readonly DisabledRuntimeShellDesignDraftOutlineSection[] = [
  section(
    "purpose-and-non-goals",
    "Purpose and non-goals",
    "Which future outline problem is being framed?",
    "May describe the non-executable design goal and the explicit non-goals.",
    "Must not describe implementation code, runtime entry points, live provider/client wiring, or production rollout steps.",
  ),
  section(
    "input-contract-boundaries",
    "Input contract boundaries",
    "Which non-secret input contracts would a later outline name?",
    "May list already-closed prerequisite artifacts, handles, review states, and archive evidence references.",
    "Must not introduce new secret values, raw endpoint URLs, or unreviewed contract fields.",
  ),
  section(
    "credential-handle-boundaries",
    "Credential handle boundaries",
    "How should a later outline talk about credential handles without reading credential values?",
    "May require handle presence, approval status, and provenance fields.",
    "Must not read, render, store, validate, or derive credential values.",
  ),
  section(
    "endpoint-handle-boundaries",
    "Endpoint handle boundaries",
    "How should a later outline talk about endpoint handles without raw URLs?",
    "May require endpoint handle IDs and allowlist review status.",
    "Must not parse or output raw endpoint URLs, hostnames, ports, paths, query strings, or connection targets.",
  ),
  section(
    "no-network-safety-boundaries",
    "No-network safety boundaries",
    "How should a later outline keep the design disconnected?",
    "May require no-network proofs, fake-disabled markers, and archive checks.",
    "Must not create HTTP/TCP clients, sockets, probes, or external audit requests.",
  ),
  section(
    "abort-rollback-boundaries",
    "Abort and rollback boundaries",
    "How should a later outline describe stop semantics without executing rollback?",
    "May describe abort states, manual review checkpoints, and rollback prohibition evidence.",
    "Must not execute Java SQL, deployment, rollback, ledger writes, schema migration, or mini-kv write/admin commands.",
  ),
  section(
    "operator-approval-boundaries",
    "Operator approval boundaries",
    "How should a later outline bind operator approval without opening execution?",
    "May reference signed approval artifacts, operator identity, audit correlation ID, and approval provenance.",
    "Must not turn approval into execution permission or managed audit connection permission.",
  ),
  section(
    "verification-and-stop-conditions",
    "Verification and stop conditions",
    "Which verification and stop gates must a later outline preserve?",
    "May define archive verification, historical fallback, screenshot, route, Markdown, and digest checks.",
    "Must not skip v334 archive verification or continue if any credential, network, provider/client, Java write, mini-kv write/admin, or auto-start condition appears.",
  ),
];

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntake(
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
): ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntakeProfile {
  const sourceNodeV332 = createSourceNodeV332(input.config, input.archiveRoot, input.evidencePaths);
  const necessityProof = createNecessityProof();
  const stopConditions = createStopConditions();
  const outlineIntake = createOutlineIntake(sourceNodeV332, necessityProof, OUTLINE_SECTIONS, stopConditions);
  const checks = createChecks(input.config, sourceNodeV332, necessityProof, outlineIntake, OUTLINE_SECTIONS);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntake =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntake")
      .every(([, value]) => value);
  const ready = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntake;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV332, OUTLINE_SECTIONS, stopConditions, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver disabled runtime shell design draft outline intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    outlineIntakeState: ready ? "disabled-runtime-shell-design-draft-outline-intake-ready" : "blocked",
    outlineIntakeDecision: ready ? "archive-disabled-outline-intake-before-drafting-outline" : "blocked",
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntake: ready,
    readOnlyOutlineIntake: true,
    outlineIntakeOnly: true,
    consumesNodeV332DisabledDesignDraftCandidateArchiveVerification: true,
    activeNodeVersion: "Node v333",
    sourceNodeVersion: "Node v332",
    readyForNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerification: ready,
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
    sourceNodeV332,
    necessityProof,
    outlineIntake: ready ? outlineIntake : { ...outlineIntake, decision: "blocked", readyForNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerification: false },
    outlineSections: [...OUTLINE_SECTIONS],
    stopConditions,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledRuntimeShellDesignDraftOutlineIntakeJson: ROUTE_PATH,
      disabledRuntimeShellDesignDraftOutlineIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV332Json: SOURCE_NODE_V332_ROUTE,
      sourceNodeV332Markdown: `${SOURCE_NODE_V332_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v334",
    },
    nextActions: [
      "Archive Node v333 as an outline intake record before drafting any disabled runtime shell outline body.",
      "Use Node v334 to verify the v333 route, Markdown, digest, screenshot, and historical fallback before any outline draft.",
      "Do not request Java or mini-kv echo until a later version defines new non-secret handoff fields that need upstream confirmation.",
      "Pause before any credential value, raw endpoint URL, provider/client, HTTP/TCP, Java write, mini-kv write/admin command, or automatic upstream start.",
    ],
  };
}

function createSourceNodeV332(
  config: AppConfig,
  archiveRoot?: string,
  evidencePaths?: {
    javaV150EvidencePath?: string;
    miniKvV142ReceiptPath?: string;
    javaV151EvidencePath?: string;
    javaV152EvidencePath?: string;
    miniKvV143ReceiptPath?: string;
  },
): SourceNodeV332DisabledDesignDraftCandidateArchiveVerificationReference {
  const source =
    loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerification({
      config,
      archiveRoot,
      evidencePaths,
    });

  return {
    sourceVersion: "Node v332",
    profileVersion: source.profileVersion,
    archiveVerificationState: source.archiveVerificationState,
    archiveVerificationDecision: source.archiveVerificationDecision,
    readyForArchiveVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerification,
    readyForNodeV333DisabledRuntimeShellDesignDraftOutlineIntake:
      source.readyForNodeV333DisabledRuntimeShellDesignDraftOutlineIntake,
    readyForDisabledRuntimeShellDesignDraft: source.readyForDisabledRuntimeShellDesignDraft,
    readyForDisabledRuntimeShellDesignDraftOutline: source.readyForDisabledRuntimeShellDesignDraftOutline,
    archiveVerificationDigest: source.archiveVerification.verificationDigest,
    sourceCandidateReviewDigest: source.sourceNodeV331.candidateReviewDigest,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    archiveFileCount: source.summary.archiveFileCount,
    presentArchiveFileCount: source.summary.presentArchiveFileCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
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

function createNecessityProof(): DisabledRuntimeShellDesignDraftOutlineIntakeNecessityProof {
  return {
    blockerResolved: "candidate-archive-verified-but-outline-boundaries-not-yet-declared",
    consumer: "Node v334 outline intake archive verification",
    whyV332CannotBeReused:
      "Node v332 verifies the v331 archive evidence, but it intentionally does not declare the outline section catalog or the forbidden content rules for a future non-executable outline.",
    whyThisIsNotDesignDraft:
      "v333 only names sections, questions, allowed content, forbidden content, and stop conditions; it does not draft the disabled runtime shell design body.",
    stopCondition:
      "Stop before any outline body, provider/client, credential value, raw endpoint URL, HTTP/TCP, Java write, mini-kv write/admin command, or automatic upstream start.",
    proofComplete: true,
  };
}

function createOutlineIntake(
  sourceNodeV332: SourceNodeV332DisabledDesignDraftCandidateArchiveVerificationReference,
  necessityProof: DisabledRuntimeShellDesignDraftOutlineIntakeNecessityProof,
  sections: readonly DisabledRuntimeShellDesignDraftOutlineSection[],
  stopConditions: readonly DisabledRuntimeShellDesignDraftOutlineStopCondition[],
): DisabledRuntimeShellDesignDraftOutlineIntakeRecord {
  const ready =
    sourceNodeV332.readyForArchiveVerification
    && sourceNodeV332.readyForNodeV333DisabledRuntimeShellDesignDraftOutlineIntake
    && necessityProof.proofComplete
    && sections.length === 8
    && sections.every((entry) => entry.requiresFutureArchiveVerification);

  return {
    intakeDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      sourceArchiveVerificationDigest: sourceNodeV332.archiveVerificationDigest,
      necessityProof,
      sections,
      stopConditions,
      ready,
    }),
    recordMode: "disabled-runtime-shell-design-draft-outline-intake-only",
    decision: ready ? "archive-disabled-outline-intake-before-drafting-outline" : "blocked",
    sourceSpan: "Node v332 disabled design draft candidate archive verification",
    outlineScope: "declare-non-executable-outline-sections-and-boundaries-only",
    sectionCatalogVersion: "disabled-runtime-shell-design-draft-outline-section-catalog.v1",
    allowedSectionCount: sections.length,
    forbiddenContentCount: sections.length,
    requiresArchiveVerificationBeforeOutlineDraft: true,
    requestsJavaMiniKvEcho: false,
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
    readyForNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerification: ready,
    nextNodeVersionSuggested: "Node v334",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV332: SourceNodeV332DisabledDesignDraftCandidateArchiveVerificationReference,
  necessityProof: DisabledRuntimeShellDesignDraftOutlineIntakeNecessityProof,
  intake: DisabledRuntimeShellDesignDraftOutlineIntakeRecord,
  sections: readonly DisabledRuntimeShellDesignDraftOutlineSection[],
): DisabledRuntimeShellDesignDraftOutlineIntakeChecks {
  return {
    sourceNodeV332Ready:
      sourceNodeV332.archiveVerificationState === "disabled-design-draft-candidate-archive-verified"
      && sourceNodeV332.archiveVerificationDecision === "proceed-to-disabled-design-draft-outline-intake"
      && sourceNodeV332.readyForArchiveVerification
      && sourceNodeV332.sourceProductionBlockerCount === 0,
    sourceNodeV332AllowsOutlineIntakeOnly:
      sourceNodeV332.readyForNodeV333DisabledRuntimeShellDesignDraftOutlineIntake,
    sourceNodeV332KeepsDesignDraftClosed:
      !sourceNodeV332.readyForDisabledRuntimeShellDesignDraft
      && !sourceNodeV332.readyForDisabledRuntimeShellDesignDraftOutline,
    sourceNodeV332KeepsRuntimeAndSideEffectsClosed:
      !sourceNodeV332.runtimeShellImplemented
      && !sourceNodeV332.runtimeShellInvocationAllowed
      && !sourceNodeV332.realResolverImplementationAllowed
      && !sourceNodeV332.executionAllowed
      && !sourceNodeV332.connectsManagedAudit
      && !sourceNodeV332.credentialValueRead
      && !sourceNodeV332.rawEndpointUrlParsed
      && !sourceNodeV332.externalRequestSent
      && !sourceNodeV332.httpRequestSent
      && !sourceNodeV332.tcpConnectionAttempted
      && !sourceNodeV332.automaticUpstreamStart
      && !sourceNodeV332.javaSqlExecutionAllowed
      && !sourceNodeV332.approvalLedgerWritten
      && !sourceNodeV332.schemaMigrationExecuted
      && !sourceNodeV332.rollbackExecutionAllowed
      && !sourceNodeV332.miniKvWriteCommandAllowed
      && !sourceNodeV332.miniKvLoadAllowed
      && !sourceNodeV332.miniKvCompactAllowed
      && !sourceNodeV332.miniKvRestoreAllowed
      && !sourceNodeV332.miniKvSetnxexAllowed,
    necessityProofComplete: necessityProof.proofComplete,
    outlineIntakeOnly:
      intake.recordMode === "disabled-runtime-shell-design-draft-outline-intake-only"
      && intake.outlineScope === "declare-non-executable-outline-sections-and-boundaries-only",
    sectionCatalogComplete: sections.length === 8 && new Set(sections.map((entry) => entry.id)).size === 8,
    sectionCatalogIsNonExecutable:
      sections.every((entry) =>
        entry.requiresFutureArchiveVerification
        && entry.forbiddenContent.length > 0
        && entry.allowedContent.length > 0),
    archiveVerificationRequiredBeforeOutlineDraft: intake.requiresArchiveVerificationBeforeOutlineDraft,
    noUpstreamEchoRequested: !intake.requestsJavaMiniKvEcho,
    noRuntimeDesignDraftCreated:
      !intake.allowsDisabledRuntimeShellDesignDraftNow
      && !intake.allowsDisabledRuntimeShellDesignDraftOutlineNow,
    noRuntimeImplementationCreated: !intake.allowsRuntimeShellImplementation,
    noRuntimeInvocationAllowed: !intake.allowsRuntimeShellInvocation,
    noCredentialValueRead: !intake.allowsCredentialValueRead,
    noRawEndpointUrlParsed: !intake.allowsRawEndpointUrlParse,
    noProviderClientInstantiated:
      !intake.allowsSecretProviderInstantiation
      && !intake.allowsResolverClientInstantiation,
    noExternalRequestSent:
      !intake.allowsExternalRequest
      && !intake.allowsManagedAuditConnection,
    noJavaOrMiniKvWrites:
      !intake.allowsSchemaMigration
      && !intake.allowsApprovalLedgerWrite
      && !intake.allowsRollbackExecution
      && !intake.allowsMiniKvWriteOrAdminCommand,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntake: false,
  };
}

function collectProductionBlockers(
  checks: DisabledRuntimeShellDesignDraftOutlineIntakeChecks,
): DisabledRuntimeShellDesignDraftOutlineIntakeMessage[] {
  const messages: DisabledRuntimeShellDesignDraftOutlineIntakeMessage[] = [];
  addBlocker(messages, checks.sourceNodeV332Ready, "NODE_V332_NOT_READY", "node-v332",
    "Node v332 archive verification is not ready for outline intake.");
  addBlocker(messages, checks.sourceNodeV332AllowsOutlineIntakeOnly, "NODE_V332_DID_NOT_ALLOW_OUTLINE_INTAKE",
    "node-v332", "Node v332 did not allow the disabled design draft outline intake step.");
  addBlocker(messages, checks.sourceNodeV332KeepsDesignDraftClosed, "SOURCE_DESIGN_DRAFT_ALREADY_OPEN",
    "runtime-boundary", "Node v332 already opened a design draft or outline.");
  addBlocker(messages, checks.sourceNodeV332KeepsRuntimeAndSideEffectsClosed, "SOURCE_RUNTIME_BOUNDARY_OPEN",
    "runtime-boundary", "Node v332 opened runtime, credential, network, Java write, mini-kv write/admin, or auto-start behavior.");
  addBlocker(messages, checks.necessityProofComplete, "NECESSITY_PROOF_INCOMPLETE", "necessity-proof",
    "v333 missing necessity proof.");
  addBlocker(messages, checks.sectionCatalogComplete, "SECTION_CATALOG_INCOMPLETE", "section-catalog",
    "v333 outline intake section catalog is incomplete.");
  addBlocker(messages, checks.sectionCatalogIsNonExecutable, "SECTION_CATALOG_EXECUTABLE_CONTENT", "section-catalog",
    "v333 section catalog must remain non-executable and require future archive verification.");
  addBlocker(messages, checks.archiveVerificationRequiredBeforeOutlineDraft, "ARCHIVE_VERIFICATION_NOT_REQUIRED",
    "outline-intake", "v333 must require v334 archive verification before an outline draft.");
  addBlocker(messages, checks.noRuntimeDesignDraftCreated, "OUTLINE_DRAFT_CREATED_TOO_EARLY", "runtime-boundary",
    "v333 created or allowed an outline draft before archive verification.");
  addBlocker(messages, checks.noUpstreamEchoRequested, "UNNEEDED_UPSTREAM_ECHO_REQUESTED", "next-step",
    "v333 must not request Java/mini-kv echo unless it defines new contract fields.");
  addBlocker(messages, checks.upstreamProbesStillDisabled, "UPSTREAM_PROBES_ENABLED", "configuration",
    "UPSTREAM_PROBES_ENABLED must stay false for this outline intake.");
  addBlocker(messages, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "configuration",
    "UPSTREAM_ACTIONS_ENABLED must stay false for this outline intake.");
  return messages;
}

function collectWarnings(): DisabledRuntimeShellDesignDraftOutlineIntakeMessage[] {
  return [
    {
      code: "OUTLINE_INTAKE_IS_NOT_OUTLINE_DRAFT",
      severity: "warning",
      source: "outline-intake",
      message: "v333 defines a section catalog and boundaries only; it does not draft the disabled runtime shell design body.",
    },
  ];
}

function collectRecommendations(): DisabledRuntimeShellDesignDraftOutlineIntakeMessage[] {
  return [
    {
      code: "RUN_NODE_V334_ARCHIVE_VERIFICATION",
      severity: "recommendation",
      source: "next-step",
      message:
        "Use Node v334 to verify the v333 route, Markdown, digest, screenshot, and historical fallback before drafting any outline body.",
    },
  ];
}

function createSummary(
  sourceNodeV332: SourceNodeV332DisabledDesignDraftCandidateArchiveVerificationReference,
  sections: readonly DisabledRuntimeShellDesignDraftOutlineSection[],
  stopConditions: readonly DisabledRuntimeShellDesignDraftOutlineStopCondition[],
  checks: DisabledRuntimeShellDesignDraftOutlineIntakeChecks,
  productionBlockers: readonly DisabledRuntimeShellDesignDraftOutlineIntakeMessage[],
  warnings: readonly DisabledRuntimeShellDesignDraftOutlineIntakeMessage[],
  recommendations: readonly DisabledRuntimeShellDesignDraftOutlineIntakeMessage[],
): DisabledRuntimeShellDesignDraftOutlineIntakeSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV332CheckCount: sourceNodeV332.sourceCheckCount,
    sourceNodeV332PassedCheckCount: sourceNodeV332.sourcePassedCheckCount,
    sourceArchiveFileCount: sourceNodeV332.archiveFileCount,
    sourcePresentArchiveFileCount: sourceNodeV332.presentArchiveFileCount,
    sectionCount: sections.length,
    stopConditionCount: stopConditions.length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function section(
  id: DisabledRuntimeShellDesignDraftOutlineSection["id"],
  title: string,
  intakeQuestion: string,
  allowedContent: string,
  forbiddenContent: string,
): DisabledRuntimeShellDesignDraftOutlineSection {
  return { id, title, intakeQuestion, allowedContent, forbiddenContent, requiresFutureArchiveVerification: true };
}

function createStopConditions(): DisabledRuntimeShellDesignDraftOutlineStopCondition[] {
  return [
    stop("OUTLINE_BODY_REQUESTED", "The next step asks v333 to draft the actual outline body."),
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
  code: DisabledRuntimeShellDesignDraftOutlineStopCondition["code"],
  condition: string,
): DisabledRuntimeShellDesignDraftOutlineStopCondition {
  return { code, condition, action: "pause-before-outline-draft-or-runtime" };
}

function addBlocker(
  messages: DisabledRuntimeShellDesignDraftOutlineIntakeMessage[],
  condition: boolean,
  code: string,
  source: DisabledRuntimeShellDesignDraftOutlineIntakeMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
