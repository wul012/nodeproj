import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification.js";
import type {
  DisabledRuntimeShellDesignDraftBodyDraftCandidateChecks,
  DisabledRuntimeShellDesignDraftBodyDraftCandidateEvidenceCitation,
  DisabledRuntimeShellDesignDraftBodyDraftCandidateMessage,
  DisabledRuntimeShellDesignDraftBodyDraftCandidateNecessityProof,
  DisabledRuntimeShellDesignDraftBodyDraftCandidateRecord,
  DisabledRuntimeShellDesignDraftBodyDraftCandidateSafetyGuard,
  DisabledRuntimeShellDesignDraftBodyDraftCandidateSection,
  DisabledRuntimeShellDesignDraftBodyDraftCandidateStopCondition,
  DisabledRuntimeShellDesignDraftBodyDraftCandidateSummary,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateProfile,
  SourceNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-draft-candidate.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-draft-candidate";
const SOURCE_NODE_V342_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-preparation-plan-archive-verification";
const ACTIVE_PLAN = "docs/plans2/v342-post-disabled-design-draft-body-preparation-plan-archive-verification-roadmap.md";
const NEXT_PLAN = ACTIVE_PLAN;

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidate(
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
): ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateProfile {
  const sourceNodeV342 = createSourceNodeV342(input.config, input.archiveRoot, input.evidencePaths);
  const necessityProof = createNecessityProof();
  const bodySections = createBodySections();
  const evidenceCitations = createEvidenceCitations();
  const safetyGuards = createSafetyGuards();
  const stopConditions = createStopConditions();
  const draftCandidate = createDraftCandidate(
    sourceNodeV342,
    necessityProof,
    bodySections,
    evidenceCitations,
    safetyGuards,
    stopConditions,
  );
  const checks = createChecks(
    input.config,
    sourceNodeV342,
    necessityProof,
    draftCandidate,
    bodySections,
    evidenceCitations,
    safetyGuards,
    stopConditions,
  );
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidate =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidate")
      .every(([, value]) => value);
  const ready = checks
    .readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidate;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV342, bodySections, evidenceCitations, safetyGuards, stopConditions, checks,
    productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body draft candidate",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    draftCandidateState: ready ? "disabled-runtime-shell-design-draft-body-draft-candidate-ready" : "blocked",
    draftCandidateDecision: ready ? draftCandidate.candidateDecision : "blocked",
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidate: ready,
    readOnlyDraftCandidate: true,
    draftCandidateOnly: true,
    consumesNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification: true,
    activeNodeVersion: "Node v343",
    sourceNodeVersion: "Node v342",
    readyForNodeV344DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification: ready,
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
    sourceNodeV342,
    necessityProof,
    draftCandidate: ready ? draftCandidate : {
      ...draftCandidate,
      candidateDecision: "blocked",
      readyForNodeV344DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification: false,
    },
    bodySections,
    evidenceCitations,
    safetyGuards,
    stopConditions,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledRuntimeShellDesignDraftBodyDraftCandidateJson: ROUTE_PATH,
      disabledRuntimeShellDesignDraftBodyDraftCandidateMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV342Json: SOURCE_NODE_V342_ROUTE,
      sourceNodeV342Markdown: `${SOURCE_NODE_V342_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v344",
    },
    nextActions: [
      "Archive Node v343 before treating any body draft candidate as stable project evidence.",
      "Let Node v344 verify the v343 route, Markdown, digest, screenshot, and code walkthrough.",
      "Do not request Java or mini-kv echo unless a later version defines new non-secret handoff fields.",
      "Pause before runtime implementation, credential value, raw endpoint URL, provider/client, HTTP/TCP, Java writes, mini-kv write/admin commands, or automatic upstream start.",
    ],
  };
}

function createSourceNodeV342(
  config: AppConfig,
  archiveRoot?: string,
  evidencePaths?: {
    javaV150EvidencePath?: string;
    miniKvV142ReceiptPath?: string;
    javaV151EvidencePath?: string;
    javaV152EvidencePath?: string;
    miniKvV143ReceiptPath?: string;
  },
): SourceNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationReference {
  const source =
    loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification({
      config,
      archiveRoot,
      evidencePaths,
    });

  return {
    sourceVersion: "Node v342",
    profileVersion: source.profileVersion,
    archiveVerificationState: source.archiveVerificationState,
    archiveVerificationDecision: source.archiveVerificationDecision,
    readyForArchiveVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification,
    readyForNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidate:
      source.readyForNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidate,
    readyForDisabledRuntimeShellDesignDraft: source.readyForDisabledRuntimeShellDesignDraft,
    archiveVerificationDigest: source.archiveVerification.verificationDigest,
    sourcePlanDigest: source.sourceNodeV341.planDigest,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceArchiveFileCount: source.summary.archiveFileCount,
    sourcePresentArchiveFileCount: source.summary.presentArchiveFileCount,
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

function createNecessityProof(): DisabledRuntimeShellDesignDraftBodyDraftCandidateNecessityProof {
  return {
    blockerResolved: "preparation-plan-archive-verified-but-body-draft-candidate-not-recorded",
    consumer: "Node v344 body draft candidate archive verification",
    whyV342CannotBeReused:
      "Node v342 proves the preparation plan is archived, but it intentionally does not write the bounded design body text that later reviewers need.",
    whyThisIsNotRuntimeImplementation:
      "v343 writes design prose only. It contains no provider/client construction, secret lookup, endpoint parsing, network request, Java write, mini-kv command, or startup behavior.",
    stopCondition:
      "Stop before any runtime behavior, secret material, raw endpoint URL, HTTP/TCP, Java write, mini-kv write/admin command, or automatic upstream start.",
    proofComplete: true,
  };
}

function createBodySections(): DisabledRuntimeShellDesignDraftBodyDraftCandidateSection[] {
  return [
    section("scope-and-non-goals", "Scope and Non-goals",
      "The disabled resolver body describes a controlled design path only. It may document inputs, evidence, and boundaries, but it does not implement a resolver or enable managed audit traffic."),
    section("evidence-chain", "Evidence Chain",
      "The draft cites Node v335 through v342 as the evidence chain. Each step must remain digest-backed and archive-verified before later versions can rely on it."),
    section("body-section-catalog", "Body Section Catalog",
      "The body follows the existing section catalog instead of inventing a new runtime sequence. This keeps the design text comparable with the preparation plan and later archive verification."),
    section("runtime-boundary", "Runtime Boundary",
      "Runtime shell implementation and invocation remain closed. The draft can name the boundary, but it cannot include executable resolver code or runtime wiring."),
    section("credential-and-endpoint-boundary", "Credential and Endpoint Boundary",
      "Credential values and raw endpoint URLs remain outside the draft. The only acceptable references are handles, review status, and allowlist decisions already modeled by earlier contracts."),
    section("cross-project-boundary", "Cross-project Boundary",
      "Java and mini-kv are not mutated by this draft. They remain read-only evidence providers unless a later non-secret handoff field is explicitly introduced and echoed."),
    section("verification-plan", "Verification Plan",
      "Node v344 must archive-verify this draft candidate, including route output, Markdown, digest, screenshot, walkthrough, and plan index alignment."),
    section("stop-conditions", "Stop Conditions",
      "Any request for secret values, raw URLs, network calls, Java writes, mini-kv write/admin commands, runtime invocation, or automatic startup pauses the chain before implementation."),
  ];
}

function section(
  id: DisabledRuntimeShellDesignDraftBodyDraftCandidateSection["id"],
  title: string,
  body: string,
): DisabledRuntimeShellDesignDraftBodyDraftCandidateSection {
  return { id, title, body, designTextOnly: true };
}

function createEvidenceCitations(): DisabledRuntimeShellDesignDraftBodyDraftCandidateEvidenceCitation[] {
  return [
    citation("node-v335-body-section-catalog", "Node v335", "body section catalog"),
    citation("node-v336-body-intake-archive", "Node v336", "body intake archive verification"),
    citation("node-v337-body-candidate-review", "Node v337", "body candidate review"),
    citation("node-v338-body-candidate-archive", "Node v338", "body candidate archive verification"),
    citation("node-v339-pre-draft-decision", "Node v339", "pre-draft decision"),
    citation("node-v340-pre-draft-decision-archive", "Node v340", "pre-draft archive verification"),
    citation("node-v341-preparation-plan", "Node v341", "body preparation plan"),
    citation("node-v342-preparation-plan-archive", "Node v342", "preparation plan archive verification"),
  ];
}

function citation(
  id: DisabledRuntimeShellDesignDraftBodyDraftCandidateEvidenceCitation["id"],
  sourceVersion: string,
  citationRole: string,
): DisabledRuntimeShellDesignDraftBodyDraftCandidateEvidenceCitation {
  return { id, sourceVersion, citationRole, citedByDraftCandidate: true };
}

function createSafetyGuards(): DisabledRuntimeShellDesignDraftBodyDraftCandidateSafetyGuard[] {
  return [
    "no-runtime-implementation",
    "no-runtime-invocation",
    "no-provider-client",
    "no-credential-value",
    "no-raw-endpoint",
    "no-http-tcp",
    "no-java-write",
    "no-mini-kv-write-admin",
    "no-auto-start",
  ].map((id) => ({ id: id as DisabledRuntimeShellDesignDraftBodyDraftCandidateSafetyGuard["id"], enforced: true }));
}

function createStopConditions(): DisabledRuntimeShellDesignDraftBodyDraftCandidateStopCondition[] {
  return [
    "RUNTIME_IMPLEMENTATION_REQUESTED",
    "RUNTIME_INVOCATION_REQUESTED",
    "CREDENTIAL_VALUE_REQUIRED",
    "RAW_ENDPOINT_URL_REQUIRED",
    "NETWORK_REQUEST_REQUIRED",
    "JAVA_WRITE_REQUIRED",
    "MINI_KV_WRITE_OR_ADMIN_REQUIRED",
    "AUTO_START_REQUIRED",
  ].map((code) => ({
    code: code as DisabledRuntimeShellDesignDraftBodyDraftCandidateStopCondition["code"],
    action: "pause-before-runtime-or-secret-boundary",
  }));
}

function createDraftCandidate(
  sourceNodeV342: SourceNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationReference,
  necessityProof: DisabledRuntimeShellDesignDraftBodyDraftCandidateNecessityProof,
  bodySections: readonly DisabledRuntimeShellDesignDraftBodyDraftCandidateSection[],
  evidenceCitations: readonly DisabledRuntimeShellDesignDraftBodyDraftCandidateEvidenceCitation[],
  safetyGuards: readonly DisabledRuntimeShellDesignDraftBodyDraftCandidateSafetyGuard[],
  stopConditions: readonly DisabledRuntimeShellDesignDraftBodyDraftCandidateStopCondition[],
): DisabledRuntimeShellDesignDraftBodyDraftCandidateRecord {
  const readyForNodeV344 =
    sourceNodeV342.readyForArchiveVerification
    && sourceNodeV342.readyForNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidate
    && necessityProof.proofComplete
    && bodySections.length === 8
    && bodySections.every((entry) => entry.designTextOnly && entry.body.length > 40)
    && evidenceCitations.length === 8
    && evidenceCitations.every((entry) => entry.citedByDraftCandidate)
    && safetyGuards.length === 9
    && safetyGuards.every((entry) => entry.enforced)
    && stopConditions.length === 8;

  return {
    candidateDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      sourceArchiveVerificationDigest: sourceNodeV342.archiveVerificationDigest,
      sourcePlanDigest: sourceNodeV342.sourcePlanDigest,
      necessityProof,
      bodySections,
      evidenceCitations,
      safetyGuards,
      stopConditions,
      readyForNodeV344,
    }),
    candidateMode: "disabled-runtime-shell-design-draft-body-draft-candidate-only",
    sourceSpan: "Node v342 disabled design draft body preparation plan archive verification",
    candidateDecision: readyForNodeV344
      ? "record-disabled-body-draft-candidate-under-non-runtime-boundary"
      : "blocked",
    candidateScope: "write-design-body-text-only-without-runtime-or-network-behavior",
    requestsJavaMiniKvEcho: false,
    sectionCount: bodySections.length,
    evidenceCitationCount: evidenceCitations.length,
    safetyGuardCount: safetyGuards.length,
    stopConditionCount: stopConditions.length,
    writesDesignBodyText: true,
    implementsRuntimeShell: false,
    invokesRuntimeShell: false,
    instantiatesProviderClient: false,
    readsCredentialValue: false,
    parsesRawEndpointUrl: false,
    sendsExternalRequest: false,
    writesJavaState: false,
    executesMiniKvWriteOrAdmin: false,
    startsUpstreamAutomatically: false,
    readyForNodeV344DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification: readyForNodeV344,
    nextNodeVersionSuggested: "Node v344",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV342: SourceNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationReference,
  necessityProof: DisabledRuntimeShellDesignDraftBodyDraftCandidateNecessityProof,
  candidate: DisabledRuntimeShellDesignDraftBodyDraftCandidateRecord,
  bodySections: readonly DisabledRuntimeShellDesignDraftBodyDraftCandidateSection[],
  evidenceCitations: readonly DisabledRuntimeShellDesignDraftBodyDraftCandidateEvidenceCitation[],
  safetyGuards: readonly DisabledRuntimeShellDesignDraftBodyDraftCandidateSafetyGuard[],
  stopConditions: readonly DisabledRuntimeShellDesignDraftBodyDraftCandidateStopCondition[],
): DisabledRuntimeShellDesignDraftBodyDraftCandidateChecks {
  return {
    sourceNodeV342Ready:
      sourceNodeV342.archiveVerificationState === "disabled-design-draft-body-preparation-plan-archive-verified"
      && sourceNodeV342.archiveVerificationDecision === "preparation-plan-archive-verified-before-body-draft"
      && sourceNodeV342.readyForArchiveVerification
      && sourceNodeV342.sourceProductionBlockerCount === 0,
    sourceNodeV342AllowsDraftCandidateOnly: sourceNodeV342.readyForNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidate,
    sourceNodeV342KeepsRuntimeAndSideEffectsClosed:
      !sourceNodeV342.runtimeShellImplemented
      && !sourceNodeV342.runtimeShellInvocationAllowed
      && !sourceNodeV342.realResolverImplementationAllowed
      && !sourceNodeV342.executionAllowed
      && !sourceNodeV342.connectsManagedAudit
      && !sourceNodeV342.credentialValueRead
      && !sourceNodeV342.rawEndpointUrlParsed
      && !sourceNodeV342.externalRequestSent
      && !sourceNodeV342.httpRequestSent
      && !sourceNodeV342.tcpConnectionAttempted
      && !sourceNodeV342.automaticUpstreamStart
      && !sourceNodeV342.javaSqlExecutionAllowed
      && !sourceNodeV342.approvalLedgerWritten
      && !sourceNodeV342.schemaMigrationExecuted
      && !sourceNodeV342.rollbackExecutionAllowed
      && !sourceNodeV342.miniKvWriteCommandAllowed
      && !sourceNodeV342.miniKvLoadAllowed
      && !sourceNodeV342.miniKvCompactAllowed
      && !sourceNodeV342.miniKvRestoreAllowed
      && !sourceNodeV342.miniKvSetnxexAllowed,
    necessityProofComplete: necessityProof.proofComplete,
    candidateModeIsTextOnly:
      candidate.candidateMode === "disabled-runtime-shell-design-draft-body-draft-candidate-only"
      && candidate.candidateScope === "write-design-body-text-only-without-runtime-or-network-behavior"
      && candidate.writesDesignBodyText,
    bodySectionsComplete: bodySections.length === 8 && bodySections.every((entry) => entry.designTextOnly),
    evidenceCitationsComplete:
      evidenceCitations.length === 8 && evidenceCitations.every((entry) => entry.citedByDraftCandidate),
    safetyGuardsEnforced: safetyGuards.length === 9 && safetyGuards.every((entry) => entry.enforced),
    stopConditionsComplete: stopConditions.length === 8,
    noUpstreamEchoRequested: !candidate.requestsJavaMiniKvEcho,
    noRuntimeImplementationCreated: !candidate.implementsRuntimeShell,
    noRuntimeInvocationAllowed: !candidate.invokesRuntimeShell,
    noCredentialValueRead: !candidate.readsCredentialValue,
    noRawEndpointUrlParsed: !candidate.parsesRawEndpointUrl,
    noProviderClientInstantiated: !candidate.instantiatesProviderClient,
    noExternalRequestSent: !candidate.sendsExternalRequest,
    noJavaOrMiniKvWrites: !candidate.writesJavaState && !candidate.executesMiniKvWriteOrAdmin,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidate: false,
  };
}

function collectProductionBlockers(
  checks: DisabledRuntimeShellDesignDraftBodyDraftCandidateChecks,
): DisabledRuntimeShellDesignDraftBodyDraftCandidateMessage[] {
  const blockers: DisabledRuntimeShellDesignDraftBodyDraftCandidateMessage[] = [];
  addBlocker(blockers, checks.sourceNodeV342Ready, "NODE_V342_NOT_READY", "node-v342",
    "Node v342 preparation plan archive verification is not ready.");
  addBlocker(blockers, checks.sourceNodeV342AllowsDraftCandidateOnly, "NODE_V342_DID_NOT_ALLOW_DRAFT_CANDIDATE",
    "node-v342", "Node v342 did not allow the bounded body draft candidate step.");
  addBlocker(blockers, checks.sourceNodeV342KeepsRuntimeAndSideEffectsClosed, "SOURCE_SIDE_EFFECT_BOUNDARY_OPEN",
    "runtime-boundary", "Node v342 opened runtime, credential, network, Java write, mini-kv write/admin, or auto-start behavior.");
  addBlocker(blockers, checks.necessityProofComplete, "NECESSITY_PROOF_INCOMPLETE", "necessity-proof",
    "v343 missing necessity proof.");
  addBlocker(blockers, checks.candidateModeIsTextOnly, "CANDIDATE_NOT_TEXT_ONLY", "draft-candidate",
    "v343 candidate must stay design text only.");
  addBlocker(blockers, checks.bodySectionsComplete, "BODY_SECTIONS_INCOMPLETE", "draft-candidate",
    "v343 body sections are incomplete.");
  addBlocker(blockers, checks.evidenceCitationsComplete, "EVIDENCE_CITATIONS_INCOMPLETE", "draft-candidate",
    "v343 evidence citations are incomplete.");
  addBlocker(blockers, checks.safetyGuardsEnforced, "SAFETY_GUARDS_INCOMPLETE", "runtime-boundary",
    "v343 safety guards are incomplete.");
  addBlocker(blockers, checks.noUpstreamEchoRequested, "UNNEEDED_UPSTREAM_ECHO_REQUESTED", "next-step",
    "v343 must not request Java/mini-kv echo unless it defines new contract fields.");
  addBlocker(blockers, checks.noRuntimeImplementationCreated, "RUNTIME_IMPLEMENTATION_CREATED", "runtime-boundary",
    "v343 created runtime implementation permission.");
  addBlocker(blockers, checks.noProviderClientInstantiated, "PROVIDER_CLIENT_INSTANTIATED", "runtime-boundary",
    "v343 allowed provider/client instantiation.");
  addBlocker(blockers, checks.upstreamProbesStillDisabled, "UPSTREAM_PROBES_ENABLED", "configuration",
    "UPSTREAM_PROBES_ENABLED must stay false for this draft candidate.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "configuration",
    "UPSTREAM_ACTIONS_ENABLED must stay false for this draft candidate.");
  return blockers;
}

function collectWarnings(): DisabledRuntimeShellDesignDraftBodyDraftCandidateMessage[] {
  return [{
    code: "DRAFT_CANDIDATE_IS_NOT_RUNTIME",
    severity: "warning",
    source: "draft-candidate",
    message: "v343 records bounded design body text only; it does not implement or invoke a runtime shell.",
  }];
}

function collectRecommendations(): DisabledRuntimeShellDesignDraftBodyDraftCandidateMessage[] {
  return [{
    code: "RUN_NODE_V344_ARCHIVE_VERIFICATION",
    severity: "recommendation",
    source: "next-step",
    message: "Use Node v344 to archive-verify the v343 body draft candidate before treating it as stable evidence.",
  }];
}

function createSummary(
  sourceNodeV342: SourceNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationReference,
  bodySections: readonly DisabledRuntimeShellDesignDraftBodyDraftCandidateSection[],
  evidenceCitations: readonly DisabledRuntimeShellDesignDraftBodyDraftCandidateEvidenceCitation[],
  safetyGuards: readonly DisabledRuntimeShellDesignDraftBodyDraftCandidateSafetyGuard[],
  stopConditions: readonly DisabledRuntimeShellDesignDraftBodyDraftCandidateStopCondition[],
  checks: DisabledRuntimeShellDesignDraftBodyDraftCandidateChecks,
  productionBlockers: readonly DisabledRuntimeShellDesignDraftBodyDraftCandidateMessage[],
  warnings: readonly DisabledRuntimeShellDesignDraftBodyDraftCandidateMessage[],
  recommendations: readonly DisabledRuntimeShellDesignDraftBodyDraftCandidateMessage[],
): DisabledRuntimeShellDesignDraftBodyDraftCandidateSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV342CheckCount: sourceNodeV342.sourceCheckCount,
    sourceNodeV342PassedCheckCount: sourceNodeV342.sourcePassedCheckCount,
    sourceArchiveFileCount: sourceNodeV342.sourceArchiveFileCount,
    sourcePresentArchiveFileCount: sourceNodeV342.sourcePresentArchiveFileCount,
    sourceProductionBlockerCount: sourceNodeV342.sourceProductionBlockerCount,
    sectionCount: bodySections.length,
    evidenceCitationCount: evidenceCitations.length,
    safetyGuardCount: safetyGuards.length,
    stopConditionCount: stopConditions.length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function addBlocker(
  messages: DisabledRuntimeShellDesignDraftBodyDraftCandidateMessage[],
  condition: boolean,
  code: string,
  source: DisabledRuntimeShellDesignDraftBodyDraftCandidateMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
