import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerification.js";
import type {
  DisabledRuntimeShellDesignDraftBodyEvidence,
  DisabledRuntimeShellDesignDraftBodyIntakeChecks,
  DisabledRuntimeShellDesignDraftBodyIntakeMessage,
  DisabledRuntimeShellDesignDraftBodyIntakeNecessityProof,
  DisabledRuntimeShellDesignDraftBodyIntakeRecord,
  DisabledRuntimeShellDesignDraftBodyIntakeSummary,
  DisabledRuntimeShellDesignDraftBodySection,
  DisabledRuntimeShellDesignDraftBodyStopCondition,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeProfile,
  SourceNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-intake.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-intake";
const SOURCE_NODE_V334_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-outline-archive-verification";
const ACTIVE_PLAN = "docs/plans2/v334-post-disabled-design-draft-outline-archive-verification-roadmap.md";
const NEXT_PLAN = ACTIVE_PLAN;

const BODY_SECTIONS: readonly DisabledRuntimeShellDesignDraftBodySection[] = [
  bodySection(
    "purpose-and-non-goals-body",
    "purpose-and-non-goals",
    "Purpose and non-goals body intake",
    "Node v334 archive verification and v333 outline section catalog.",
    "May map the future body paragraph to non-executable design intent and explicit non-goals.",
    "Must not include runtime entry points, implementation tasks, provider/client code, or production rollout instructions.",
  ),
  bodySection(
    "input-contract-boundaries-body",
    "input-contract-boundaries",
    "Input contract boundaries body intake",
    "Closed prerequisite artifacts, non-secret handles, review states, and archive evidence references.",
    "May map already-approved non-secret inputs to body subsections.",
    "Must not add new secret fields, raw URLs, credential values, or unreviewed handoff fields.",
  ),
  bodySection(
    "credential-handle-boundaries-body",
    "credential-handle-boundaries",
    "Credential handle boundaries body intake",
    "Credential handle approval status, provenance, and non-value review markers.",
    "May describe handle presence and approval provenance without value access.",
    "Must not read, render, store, validate, derive, hash, or echo credential values.",
  ),
  bodySection(
    "endpoint-handle-boundaries-body",
    "endpoint-handle-boundaries",
    "Endpoint handle boundaries body intake",
    "Endpoint handle allowlist approval status and non-raw endpoint evidence.",
    "May describe endpoint handle IDs and allowlist review status.",
    "Must not parse, render, or derive hostnames, ports, paths, query strings, or raw endpoint URLs.",
  ),
  bodySection(
    "no-network-safety-boundaries-body",
    "no-network-safety-boundaries",
    "No-network safety boundaries body intake",
    "No-network safety fixture, disabled fake markers, and archived smoke proof.",
    "May describe no-network proofs and future manual verification checkpoints.",
    "Must not create HTTP/TCP clients, sockets, probes, request builders, or managed audit calls.",
  ),
  bodySection(
    "abort-rollback-boundaries-body",
    "abort-rollback-boundaries",
    "Abort and rollback boundaries body intake",
    "Abort/rollback semantics contract and no-write evidence.",
    "May describe stop states, manual review checkpoints, and rollback prohibition proof.",
    "Must not execute Java SQL, deployment, rollback, ledger writes, schema migration, or mini-kv write/admin commands.",
  ),
  bodySection(
    "operator-approval-boundaries-body",
    "operator-approval-boundaries",
    "Operator approval boundaries body intake",
    "Signed human approval artifact, operator identity, audit correlation ID, and provenance evidence.",
    "May map approval evidence to future body subsections.",
    "Must not convert approval evidence into execution permission, connection permission, or automatic promotion.",
  ),
  bodySection(
    "verification-and-stop-conditions-body",
    "verification-and-stop-conditions",
    "Verification and stop conditions body intake",
    "Archive verification, historical fallback, screenshot, route, Markdown, digest, and cleanup evidence.",
    "May define body draft verification gates and stop conditions.",
    "Must not skip Node v336 archive verification or continue if any credential, network, provider/client, Java write, mini-kv write/admin, or auto-start condition appears.",
  ),
];

const EVIDENCE_CATALOG: readonly DisabledRuntimeShellDesignDraftBodyEvidence[] = [
  evidence("node-v334-archive-verification", "Node v334 archive verification profile"),
  evidence("node-v333-outline-intake-archive", "Node v333 outline intake archived JSON/Markdown/smoke/screenshot"),
  evidence("historical-fallback-proof", "Forced historical fixture fallback evidence"),
  evidence("credential-and-endpoint-handle-proof", "Closed credential-handle and endpoint-handle prerequisite evidence"),
  evidence("no-network-and-side-effect-proof", "No-network, no Java write, and no mini-kv write/admin evidence"),
  evidence("manual-operator-boundary-proof", "Signed approval and operator-boundary prerequisite evidence"),
];

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake(
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
): ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeProfile {
  const sourceNodeV334 = createSourceNodeV334(input.config, input.archiveRoot, input.evidencePaths);
  const necessityProof = createNecessityProof();
  const stopConditions = createStopConditions();
  const bodyIntake = createBodyIntake(sourceNodeV334, necessityProof, BODY_SECTIONS, EVIDENCE_CATALOG,
    stopConditions);
  const checks = createChecks(input.config, sourceNodeV334, necessityProof, bodyIntake, BODY_SECTIONS,
    EVIDENCE_CATALOG);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake")
      .every(([, value]) => value);
  const ready = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV334, BODY_SECTIONS, EVIDENCE_CATALOG, stopConditions, checks,
    productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    bodyIntakeState: ready ? "disabled-runtime-shell-design-draft-body-intake-ready" : "blocked",
    bodyIntakeDecision: ready ? "archive-disabled-body-intake-before-drafting-body" : "blocked",
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake: ready,
    readOnlyBodyIntake: true,
    bodyIntakeOnly: true,
    consumesNodeV334DisabledDesignDraftOutlineArchiveVerification: true,
    activeNodeVersion: "Node v335",
    sourceNodeVersion: "Node v334",
    readyForNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification: ready,
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
    sourceNodeV334,
    necessityProof,
    bodyIntake: ready ? bodyIntake : {
      ...bodyIntake,
      decision: "blocked",
      readyForNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification: false,
    },
    bodySections: [...BODY_SECTIONS],
    evidenceCatalog: [...EVIDENCE_CATALOG],
    stopConditions,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledRuntimeShellDesignDraftBodyIntakeJson: ROUTE_PATH,
      disabledRuntimeShellDesignDraftBodyIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV334Json: SOURCE_NODE_V334_ROUTE,
      sourceNodeV334Markdown: `${SOURCE_NODE_V334_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v336",
    },
    nextActions: [
      "Archive Node v335 as a body intake record before drafting any disabled runtime shell design body.",
      "Use Node v336 to verify the v335 route, Markdown, digest, screenshot, and historical fallback before any body draft.",
      "Do not request Java or mini-kv echo until a later version defines new non-secret handoff fields that need upstream confirmation.",
      "Pause before any credential value, raw endpoint URL, provider/client, HTTP/TCP, Java write, mini-kv write/admin command, or automatic upstream start.",
    ],
  };
}

function createSourceNodeV334(
  config: AppConfig,
  archiveRoot?: string,
  evidencePaths?: {
    javaV150EvidencePath?: string;
    miniKvV142ReceiptPath?: string;
    javaV151EvidencePath?: string;
    javaV152EvidencePath?: string;
    miniKvV143ReceiptPath?: string;
  },
): SourceNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerificationReference {
  const source =
    loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerification({
      config,
      archiveRoot,
      evidencePaths,
    });

  return {
    sourceVersion: "Node v334",
    profileVersion: source.profileVersion,
    archiveVerificationState: source.archiveVerificationState,
    archiveVerificationDecision: source.archiveVerificationDecision,
    readyForArchiveVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerification,
    readyForNodeV335DisabledRuntimeShellDesignDraftBodyIntake:
      source.readyForNodeV335DisabledRuntimeShellDesignDraftBodyIntake,
    readyForDisabledRuntimeShellDesignDraft: source.readyForDisabledRuntimeShellDesignDraft,
    readyForDisabledRuntimeShellDesignDraftOutline: source.readyForDisabledRuntimeShellDesignDraftOutline,
    archiveVerificationDigest: source.archiveVerification.verificationDigest,
    sourceOutlineIntakeDigest: source.sourceNodeV333.outlineIntakeDigest,
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

function createNecessityProof(): DisabledRuntimeShellDesignDraftBodyIntakeNecessityProof {
  return {
    blockerResolved: "outline-archive-verified-but-body-intake-not-yet-declared",
    consumer: "Node v336 body intake archive verification",
    whyV334CannotBeReused:
      "Node v334 verifies the v333 outline intake archive, but it intentionally does not map the outline catalog to body intake sections or evidence requirements.",
    whyThisIsNotDesignDraftBody:
      "v335 only maps future body sections to required evidence, allowed content, forbidden content, and stop conditions; it does not draft the design body.",
    stopCondition:
      "Stop before any body draft, provider/client, credential value, raw endpoint URL, HTTP/TCP, Java write, mini-kv write/admin command, or automatic upstream start.",
    proofComplete: true,
  };
}

function createBodyIntake(
  sourceNodeV334: SourceNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerificationReference,
  necessityProof: DisabledRuntimeShellDesignDraftBodyIntakeNecessityProof,
  sections: readonly DisabledRuntimeShellDesignDraftBodySection[],
  evidenceCatalog: readonly DisabledRuntimeShellDesignDraftBodyEvidence[],
  stopConditions: readonly DisabledRuntimeShellDesignDraftBodyStopCondition[],
): DisabledRuntimeShellDesignDraftBodyIntakeRecord {
  const ready =
    sourceNodeV334.readyForArchiveVerification
    && sourceNodeV334.readyForNodeV335DisabledRuntimeShellDesignDraftBodyIntake
    && necessityProof.proofComplete
    && sections.length === 8
    && evidenceCatalog.length === 6
    && stopConditions.length === 8
    && sections.every((entry) => entry.requiresFutureArchiveVerification);

  return {
    intakeDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      sourceArchiveVerificationDigest: sourceNodeV334.archiveVerificationDigest,
      necessityProof,
      sections,
      evidenceCatalog,
      stopConditions,
      ready,
    }),
    recordMode: "disabled-runtime-shell-design-draft-body-intake-only",
    decision: ready ? "archive-disabled-body-intake-before-drafting-body" : "blocked",
    sourceSpan: "Node v334 disabled design draft outline archive verification",
    bodyScope: "map-outline-sections-to-non-executable-body-intake-only",
    bodySectionCatalogVersion: "disabled-runtime-shell-design-draft-body-section-catalog.v1",
    evidenceCatalogVersion: "disabled-runtime-shell-design-draft-body-evidence-catalog.v1",
    bodySectionCount: sections.length,
    evidenceItemCount: evidenceCatalog.length,
    stopConditionCount: stopConditions.length,
    requiresArchiveVerificationBeforeBodyDraft: true,
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
    readyForNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification: ready,
    nextNodeVersionSuggested: "Node v336",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV334: SourceNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerificationReference,
  necessityProof: DisabledRuntimeShellDesignDraftBodyIntakeNecessityProof,
  intake: DisabledRuntimeShellDesignDraftBodyIntakeRecord,
  sections: readonly DisabledRuntimeShellDesignDraftBodySection[],
  evidenceCatalog: readonly DisabledRuntimeShellDesignDraftBodyEvidence[],
): DisabledRuntimeShellDesignDraftBodyIntakeChecks {
  return {
    sourceNodeV334Ready:
      sourceNodeV334.archiveVerificationState === "disabled-design-draft-outline-archive-verified"
      && sourceNodeV334.archiveVerificationDecision === "proceed-to-disabled-design-draft-body-intake"
      && sourceNodeV334.readyForArchiveVerification
      && sourceNodeV334.sourceProductionBlockerCount === 0,
    sourceNodeV334AllowsBodyIntakeOnly:
      sourceNodeV334.readyForNodeV335DisabledRuntimeShellDesignDraftBodyIntake,
    sourceNodeV334KeepsDesignDraftClosed:
      !sourceNodeV334.readyForDisabledRuntimeShellDesignDraft
      && !sourceNodeV334.readyForDisabledRuntimeShellDesignDraftOutline,
    sourceNodeV334KeepsRuntimeAndSideEffectsClosed:
      !sourceNodeV334.runtimeShellImplemented
      && !sourceNodeV334.runtimeShellInvocationAllowed
      && !sourceNodeV334.realResolverImplementationAllowed
      && !sourceNodeV334.executionAllowed
      && !sourceNodeV334.connectsManagedAudit
      && !sourceNodeV334.credentialValueRead
      && !sourceNodeV334.rawEndpointUrlParsed
      && !sourceNodeV334.externalRequestSent
      && !sourceNodeV334.httpRequestSent
      && !sourceNodeV334.tcpConnectionAttempted
      && !sourceNodeV334.automaticUpstreamStart
      && !sourceNodeV334.javaSqlExecutionAllowed
      && !sourceNodeV334.approvalLedgerWritten
      && !sourceNodeV334.schemaMigrationExecuted
      && !sourceNodeV334.rollbackExecutionAllowed
      && !sourceNodeV334.miniKvWriteCommandAllowed
      && !sourceNodeV334.miniKvLoadAllowed
      && !sourceNodeV334.miniKvCompactAllowed
      && !sourceNodeV334.miniKvRestoreAllowed
      && !sourceNodeV334.miniKvSetnxexAllowed,
    necessityProofComplete: necessityProof.proofComplete,
    bodyIntakeOnly:
      intake.recordMode === "disabled-runtime-shell-design-draft-body-intake-only"
      && intake.bodyScope === "map-outline-sections-to-non-executable-body-intake-only",
    bodySectionCatalogComplete:
      sections.length === 8 && new Set(sections.map((entry) => entry.id)).size === 8,
    bodySectionCatalogMapsOutlineSections:
      sections.length === 8 && new Set(sections.map((entry) => entry.sourceOutlineSection)).size === 8,
    evidenceCatalogComplete:
      evidenceCatalog.length === 6
      && evidenceCatalog.every((entry) => entry.requiredForBodyIntake && !entry.allowsRuntimeBehavior),
    bodyCatalogIsNonExecutable:
      sections.every((entry) =>
        entry.requiresFutureArchiveVerification
        && entry.forbiddenBodyContent.length > 0
        && entry.allowedBodyContent.length > 0),
    archiveVerificationRequiredBeforeBodyDraft: intake.requiresArchiveVerificationBeforeBodyDraft,
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
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake: false,
  };
}

function collectProductionBlockers(
  checks: DisabledRuntimeShellDesignDraftBodyIntakeChecks,
): DisabledRuntimeShellDesignDraftBodyIntakeMessage[] {
  const messages: DisabledRuntimeShellDesignDraftBodyIntakeMessage[] = [];
  addBlocker(messages, checks.sourceNodeV334Ready, "NODE_V334_NOT_READY", "node-v334",
    "Node v334 archive verification is not ready for body intake.");
  addBlocker(messages, checks.sourceNodeV334AllowsBodyIntakeOnly, "NODE_V334_DID_NOT_ALLOW_BODY_INTAKE",
    "node-v334", "Node v334 did not allow the disabled design draft body intake step.");
  addBlocker(messages, checks.sourceNodeV334KeepsDesignDraftClosed, "SOURCE_DESIGN_DRAFT_ALREADY_OPEN",
    "runtime-boundary", "Node v334 already opened a design draft or outline body.");
  addBlocker(messages, checks.sourceNodeV334KeepsRuntimeAndSideEffectsClosed, "SOURCE_RUNTIME_BOUNDARY_OPEN",
    "runtime-boundary", "Node v334 opened runtime, credential, network, Java write, mini-kv write/admin, or auto-start behavior.");
  addBlocker(messages, checks.necessityProofComplete, "NECESSITY_PROOF_INCOMPLETE", "necessity-proof",
    "v335 missing necessity proof.");
  addBlocker(messages, checks.bodySectionCatalogComplete, "BODY_SECTION_CATALOG_INCOMPLETE", "body-section-catalog",
    "v335 body section catalog is incomplete.");
  addBlocker(messages, checks.bodySectionCatalogMapsOutlineSections, "BODY_SECTION_OUTLINE_MAPPING_INCOMPLETE",
    "body-section-catalog", "v335 body section catalog must map each v333 outline section exactly once.");
  addBlocker(messages, checks.evidenceCatalogComplete, "BODY_EVIDENCE_CATALOG_INCOMPLETE",
    "body-evidence-catalog", "v335 evidence catalog must remain complete and non-runtime.");
  addBlocker(messages, checks.bodyCatalogIsNonExecutable, "BODY_CATALOG_EXECUTABLE_CONTENT", "body-section-catalog",
    "v335 body catalog must remain non-executable and require future archive verification.");
  addBlocker(messages, checks.archiveVerificationRequiredBeforeBodyDraft, "ARCHIVE_VERIFICATION_NOT_REQUIRED",
    "body-intake", "v335 must require v336 archive verification before a body draft.");
  addBlocker(messages, checks.noRuntimeDesignDraftCreated, "BODY_DRAFT_CREATED_TOO_EARLY", "runtime-boundary",
    "v335 created or allowed a design body draft before archive verification.");
  addBlocker(messages, checks.noUpstreamEchoRequested, "UNNEEDED_UPSTREAM_ECHO_REQUESTED", "next-step",
    "v335 must not request Java/mini-kv echo unless it defines new contract fields.");
  addBlocker(messages, checks.upstreamProbesStillDisabled, "UPSTREAM_PROBES_ENABLED", "configuration",
    "UPSTREAM_PROBES_ENABLED must stay false for this body intake.");
  addBlocker(messages, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "configuration",
    "UPSTREAM_ACTIONS_ENABLED must stay false for this body intake.");
  return messages;
}

function collectWarnings(): DisabledRuntimeShellDesignDraftBodyIntakeMessage[] {
  return [
    {
      code: "BODY_INTAKE_IS_NOT_BODY_DRAFT",
      severity: "warning",
      source: "body-intake",
      message: "v335 maps body sections and evidence only; it does not draft the disabled runtime shell design body.",
    },
  ];
}

function collectRecommendations(): DisabledRuntimeShellDesignDraftBodyIntakeMessage[] {
  return [
    {
      code: "RUN_NODE_V336_ARCHIVE_VERIFICATION",
      severity: "recommendation",
      source: "next-step",
      message:
        "Use Node v336 to verify the v335 route, Markdown, digest, screenshot, and historical fallback before drafting any body.",
    },
  ];
}

function createSummary(
  sourceNodeV334: SourceNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerificationReference,
  sections: readonly DisabledRuntimeShellDesignDraftBodySection[],
  evidenceCatalog: readonly DisabledRuntimeShellDesignDraftBodyEvidence[],
  stopConditions: readonly DisabledRuntimeShellDesignDraftBodyStopCondition[],
  checks: DisabledRuntimeShellDesignDraftBodyIntakeChecks,
  productionBlockers: readonly DisabledRuntimeShellDesignDraftBodyIntakeMessage[],
  warnings: readonly DisabledRuntimeShellDesignDraftBodyIntakeMessage[],
  recommendations: readonly DisabledRuntimeShellDesignDraftBodyIntakeMessage[],
): DisabledRuntimeShellDesignDraftBodyIntakeSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV334CheckCount: sourceNodeV334.sourceCheckCount,
    sourceNodeV334PassedCheckCount: sourceNodeV334.sourcePassedCheckCount,
    sourceArchiveFileCount: sourceNodeV334.archiveFileCount,
    sourcePresentArchiveFileCount: sourceNodeV334.presentArchiveFileCount,
    bodySectionCount: sections.length,
    evidenceItemCount: evidenceCatalog.length,
    stopConditionCount: stopConditions.length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function bodySection(
  id: DisabledRuntimeShellDesignDraftBodySection["id"],
  sourceOutlineSection: DisabledRuntimeShellDesignDraftBodySection["sourceOutlineSection"],
  title: string,
  requiredEvidence: string,
  allowedBodyContent: string,
  forbiddenBodyContent: string,
): DisabledRuntimeShellDesignDraftBodySection {
  return {
    id,
    sourceOutlineSection,
    title,
    requiredEvidence,
    allowedBodyContent,
    forbiddenBodyContent,
    requiresFutureArchiveVerification: true,
  };
}

function evidence(
  id: DisabledRuntimeShellDesignDraftBodyEvidence["id"],
  source: string,
): DisabledRuntimeShellDesignDraftBodyEvidence {
  return { id, source, requiredForBodyIntake: true, allowsRuntimeBehavior: false };
}

function createStopConditions(): DisabledRuntimeShellDesignDraftBodyStopCondition[] {
  return [
    stop("BODY_DRAFT_REQUESTED", "The next step asks v335 to draft the actual design body."),
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
  code: DisabledRuntimeShellDesignDraftBodyStopCondition["code"],
  condition: string,
): DisabledRuntimeShellDesignDraftBodyStopCondition {
  return { code, condition, action: "pause-before-body-draft-or-runtime" };
}

function addBlocker(
  messages: DisabledRuntimeShellDesignDraftBodyIntakeMessage[],
  condition: boolean,
  code: string,
  source: DisabledRuntimeShellDesignDraftBodyIntakeMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
