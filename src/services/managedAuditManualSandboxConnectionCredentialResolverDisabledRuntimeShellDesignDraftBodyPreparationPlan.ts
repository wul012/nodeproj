import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification.js";
import type {
  DisabledRuntimeShellDesignDraftBodyPreparationDraftGuard,
  DisabledRuntimeShellDesignDraftBodyPreparationEvidenceMapping,
  DisabledRuntimeShellDesignDraftBodyPreparationPlanChecks,
  DisabledRuntimeShellDesignDraftBodyPreparationPlanMessage,
  DisabledRuntimeShellDesignDraftBodyPreparationPlanNecessityProof,
  DisabledRuntimeShellDesignDraftBodyPreparationPlanRecord,
  DisabledRuntimeShellDesignDraftBodyPreparationPlanSummary,
  DisabledRuntimeShellDesignDraftBodyPreparationSectionPlan,
  DisabledRuntimeShellDesignDraftBodyPreparationStopCondition,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanProfile,
  SourceNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-preparation-plan.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-preparation-plan";
const SOURCE_NODE_V340_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-pre-draft-decision-archive-verification";
const ACTIVE_PLAN = "docs/plans2/v340-post-disabled-design-draft-body-pre-draft-decision-archive-verification-roadmap.md";
const NEXT_PLAN = ACTIVE_PLAN;

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlan(
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
): ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanProfile {
  const sourceNodeV340 = createSourceNodeV340(input.config, input.archiveRoot, input.evidencePaths);
  const necessityProof = createNecessityProof();
  const sectionPlans = createSectionPlans();
  const evidenceMappings = createEvidenceMappings();
  const draftGuards = createDraftGuards();
  const stopConditions = createStopConditions();
  const bodyPreparationPlan = createBodyPreparationPlan(
    sourceNodeV340,
    necessityProof,
    sectionPlans,
    evidenceMappings,
    draftGuards,
    stopConditions,
  );
  const checks = createChecks(
    input.config,
    sourceNodeV340,
    necessityProof,
    bodyPreparationPlan,
    sectionPlans,
    evidenceMappings,
    draftGuards,
    stopConditions,
  );
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlan =
    Object.entries(checks)
      .filter(([key]) =>
        key !==
        "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlan")
      .every(([, value]) => value);
  const ready = checks
    .readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlan;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(
    sourceNodeV340,
    sectionPlans,
    evidenceMappings,
    draftGuards,
    stopConditions,
    checks,
    productionBlockers,
    warnings,
    recommendations,
  );

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body preparation plan",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    preparationPlanState: ready ? "disabled-runtime-shell-design-draft-body-preparation-plan-ready" : "blocked",
    preparationPlanDecision: ready ? bodyPreparationPlan.planDecision : "blocked",
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlan:
      ready,
    readOnlyPreparationPlan: true,
    preparationPlanOnly: true,
    consumesNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification: true,
    activeNodeVersion: "Node v341",
    sourceNodeVersion: "Node v340",
    readyForNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification: ready,
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
    sourceNodeV340,
    necessityProof,
    bodyPreparationPlan: ready ? bodyPreparationPlan : {
      ...bodyPreparationPlan,
      planDecision: "blocked",
      readyForNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification: false,
    },
    sectionPlans,
    evidenceMappings,
    draftGuards,
    stopConditions,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledRuntimeShellDesignDraftBodyPreparationPlanJson: ROUTE_PATH,
      disabledRuntimeShellDesignDraftBodyPreparationPlanMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV340Json: SOURCE_NODE_V340_ROUTE,
      sourceNodeV340Markdown: `${SOURCE_NODE_V340_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v342",
    },
    nextActions: [
      "Archive Node v341 as a body preparation plan before any body draft content is written.",
      "Let Node v342 verify the v341 route, Markdown, digest, screenshot, and historical fallback.",
      "Do not request Java or mini-kv echo unless a future version defines new non-secret handoff fields.",
      "Pause before body draft content, credential value, raw endpoint URL, provider/client, HTTP/TCP, Java write, mini-kv write/admin command, or automatic upstream start.",
    ],
  };
}

function createSourceNodeV340(
  config: AppConfig,
  archiveRoot?: string,
  evidencePaths?: {
    javaV150EvidencePath?: string;
    miniKvV142ReceiptPath?: string;
    javaV151EvidencePath?: string;
    javaV152EvidencePath?: string;
    miniKvV143ReceiptPath?: string;
  },
): SourceNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationReference {
  const source =
    loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification({
      config,
      archiveRoot,
      evidencePaths,
    });

  return {
    sourceVersion: "Node v340",
    profileVersion: source.profileVersion,
    archiveVerificationState: source.archiveVerificationState,
    archiveVerificationDecision: source.archiveVerificationDecision,
    readyForArchiveVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification,
    readyForNodeV341DisabledRuntimeShellDesignDraftBodyPreparationPlan:
      source.readyForNodeV341DisabledRuntimeShellDesignDraftBodyPreparationPlan,
    readyForDisabledRuntimeShellDesignDraft: source.readyForDisabledRuntimeShellDesignDraft,
    readyForDisabledRuntimeShellDesignDraftOutline: source.readyForDisabledRuntimeShellDesignDraftOutline,
    archiveVerificationDigest: source.archiveVerification.verificationDigest,
    sourceDecisionDigest: source.sourceNodeV339.decisionDigest,
    sourceArchiveVerificationDigest: source.sourceNodeV339.sourceArchiveVerificationDigest,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceArchiveFileCount: source.summary.archiveFileCount,
    sourcePresentArchiveFileCount: source.summary.presentArchiveFileCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
    sourceBodySectionCount: source.summary.sourceBodySectionCount,
    sourceEvidenceItemCount: source.summary.sourceEvidenceItemCount,
    sourceStopConditionCount: source.summary.sourceStopConditionCount,
    sourceDecisionQuestionCount: source.summary.decisionQuestionCount,
    sourceAnsweredDecisionQuestionCount: source.summary.answeredDecisionQuestionCount,
    sourcePreparationControlCount: source.summary.preparationControlCount,
    sourceEnforcedPreparationControlCount: source.summary.enforcedPreparationControlCount,
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

function createNecessityProof(): DisabledRuntimeShellDesignDraftBodyPreparationPlanNecessityProof {
  return {
    blockerResolved: "pre-draft-decision-archive-verified-but-body-preparation-plan-not-recorded",
    consumer: "Node v342 body preparation plan archive verification",
    whyV340CannotBeReused:
      "Node v340 verifies the v339 pre-draft decision archive, but it intentionally does not define the section-by-section preparation plan for a future body draft.",
    whyThisIsNotBodyDraft:
      "v341 records section plans, evidence mappings, draft guards, and stop conditions only; it does not write body paragraphs, implementation steps, provider/client logic, or runtime behavior.",
    stopCondition:
      "Stop before body draft content, credential value, raw endpoint URL, provider/client, HTTP/TCP, Java write, mini-kv write/admin command, or automatic upstream start.",
    proofComplete: true,
  };
}

function createSectionPlans(): DisabledRuntimeShellDesignDraftBodyPreparationSectionPlan[] {
  return [
    sectionPlan("scope-and-non-goals", "Define what the future body draft may cover and what remains explicitly out of scope."),
    sectionPlan("source-evidence-chain", "List the v335-v340 evidence chain that the body draft may cite."),
    sectionPlan("body-section-catalog", "Reuse the existing body section catalog instead of inventing runtime implementation sections."),
    sectionPlan("evidence-mapping", "Map each future body section to existing route, digest, smoke, screenshot, walkthrough, and plan evidence."),
    sectionPlan("runtime-boundary", "Keep runtime shell implementation, invocation, provider/client, credential, and network surfaces closed."),
    sectionPlan("cross-project-boundary", "Keep Java and mini-kv as non-mutating upstream evidence references unless a later non-secret handoff is defined."),
    sectionPlan("archive-verification", "Require v342 to verify the preparation plan before any body draft text is written."),
    sectionPlan("stop-conditions", "Carry forward stop conditions for secrets, raw endpoints, network, Java writes, mini-kv admin/write, and auto-start."),
  ];
}

function sectionPlan(
  id: DisabledRuntimeShellDesignDraftBodyPreparationSectionPlan["id"],
  purpose: string,
): DisabledRuntimeShellDesignDraftBodyPreparationSectionPlan {
  return { id, purpose, bodyContentWritten: false, planned: true };
}

function createEvidenceMappings(): DisabledRuntimeShellDesignDraftBodyPreparationEvidenceMapping[] {
  return [
    evidenceMapping("node-v335-body-section-catalog", "Node v335", "body section catalog and evidence catalog"),
    evidenceMapping("node-v336-body-intake-archive", "Node v336", "body intake archive verification"),
    evidenceMapping("node-v337-body-candidate-review", "Node v337", "body candidate review"),
    evidenceMapping("node-v338-body-candidate-archive", "Node v338", "body candidate archive verification"),
    evidenceMapping("node-v339-pre-draft-decision", "Node v339", "pre-draft decision and preparation controls"),
    evidenceMapping("node-v340-pre-draft-decision-archive", "Node v340", "pre-draft decision archive verification"),
  ];
}

function evidenceMapping(
  id: DisabledRuntimeShellDesignDraftBodyPreparationEvidenceMapping["id"],
  sourceVersion: string,
  evidenceRole: string,
): DisabledRuntimeShellDesignDraftBodyPreparationEvidenceMapping {
  return { id, sourceVersion, evidenceRole, requiredForFutureBodyDraft: true };
}

function createDraftGuards(): DisabledRuntimeShellDesignDraftBodyPreparationDraftGuard[] {
  return [
    draftGuard("no-body-content", "Do not write body paragraphs or pseudo-code in v341."),
    draftGuard("no-provider-client", "Do not instantiate real or fake provider/client code."),
    draftGuard("no-credential-value", "Do not read, render, or validate credential values."),
    draftGuard("no-raw-endpoint", "Do not parse or expose raw endpoint URLs."),
    draftGuard("no-http-tcp", "Do not send HTTP/TCP requests to managed audit or sibling projects."),
    draftGuard("no-java-write", "Do not write Java ledger/schema/SQL/deployment/rollback state."),
    draftGuard("no-mini-kv-write-admin", "Do not execute mini-kv write/admin commands."),
    draftGuard("no-auto-start", "Do not automatically start Java, mini-kv, or external services."),
  ];
}

function draftGuard(
  id: DisabledRuntimeShellDesignDraftBodyPreparationDraftGuard["id"],
  guard: string,
): DisabledRuntimeShellDesignDraftBodyPreparationDraftGuard {
  return { id, guard, enforced: true };
}

function createStopConditions(): DisabledRuntimeShellDesignDraftBodyPreparationStopCondition[] {
  return [
    stop("BODY_CONTENT_REQUESTED", "The next step asks v341 to write actual body draft content."),
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
  code: DisabledRuntimeShellDesignDraftBodyPreparationStopCondition["code"],
  condition: string,
): DisabledRuntimeShellDesignDraftBodyPreparationStopCondition {
  return { code, condition, action: "pause-before-body-draft-or-runtime" };
}

function createBodyPreparationPlan(
  sourceNodeV340: SourceNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationReference,
  necessityProof: DisabledRuntimeShellDesignDraftBodyPreparationPlanNecessityProof,
  sectionPlans: readonly DisabledRuntimeShellDesignDraftBodyPreparationSectionPlan[],
  evidenceMappings: readonly DisabledRuntimeShellDesignDraftBodyPreparationEvidenceMapping[],
  draftGuards: readonly DisabledRuntimeShellDesignDraftBodyPreparationDraftGuard[],
  stopConditions: readonly DisabledRuntimeShellDesignDraftBodyPreparationStopCondition[],
): DisabledRuntimeShellDesignDraftBodyPreparationPlanRecord {
  const readyForNodeV342 =
    sourceNodeV340.readyForArchiveVerification
    && sourceNodeV340.readyForNodeV341DisabledRuntimeShellDesignDraftBodyPreparationPlan
    && necessityProof.proofComplete
    && sectionPlans.length === 8
    && sectionPlans.every((entry) => entry.planned && !entry.bodyContentWritten)
    && evidenceMappings.length === 6
    && evidenceMappings.every((entry) => entry.requiredForFutureBodyDraft)
    && draftGuards.length === 8
    && draftGuards.every((entry) => entry.enforced)
    && stopConditions.length === 8;

  return {
    planDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      sourceArchiveVerificationDigest: sourceNodeV340.archiveVerificationDigest,
      sourceDecisionDigest: sourceNodeV340.sourceDecisionDigest,
      necessityProof,
      sectionPlans,
      evidenceMappings,
      draftGuards,
      stopConditions,
      readyForNodeV342,
    }),
    planMode: "disabled-runtime-shell-design-draft-body-preparation-plan-only",
    sourceSpan: "Node v340 disabled design draft body pre-draft decision archive verification",
    planDecision: readyForNodeV342 ? "prepare-disabled-body-draft-plan-after-archive-verification" : "blocked",
    planScope: "plan-body-draft-sections-and-evidence-mapping-without-writing-body-content",
    requiresArchiveVerificationBeforeBodyDraft: true,
    requestsJavaMiniKvEcho: false,
    sectionPlanCount: sectionPlans.length,
    evidenceMappingCount: evidenceMappings.length,
    draftGuardCount: draftGuards.length,
    stopConditionCount: stopConditions.length,
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
    readyForNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification: readyForNodeV342,
    nextNodeVersionSuggested: "Node v342",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV340: SourceNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationReference,
  necessityProof: DisabledRuntimeShellDesignDraftBodyPreparationPlanNecessityProof,
  plan: DisabledRuntimeShellDesignDraftBodyPreparationPlanRecord,
  sectionPlans: readonly DisabledRuntimeShellDesignDraftBodyPreparationSectionPlan[],
  evidenceMappings: readonly DisabledRuntimeShellDesignDraftBodyPreparationEvidenceMapping[],
  draftGuards: readonly DisabledRuntimeShellDesignDraftBodyPreparationDraftGuard[],
  stopConditions: readonly DisabledRuntimeShellDesignDraftBodyPreparationStopCondition[],
): DisabledRuntimeShellDesignDraftBodyPreparationPlanChecks {
  return {
    sourceNodeV340Ready:
      sourceNodeV340.archiveVerificationState === "disabled-design-draft-body-pre-draft-decision-archive-verified"
      && sourceNodeV340.archiveVerificationDecision === "pre-draft-decision-archive-verified-before-body-draft"
      && sourceNodeV340.readyForArchiveVerification
      && sourceNodeV340.sourceProductionBlockerCount === 0,
    sourceNodeV340AllowsPreparationPlanOnly:
      sourceNodeV340.readyForNodeV341DisabledRuntimeShellDesignDraftBodyPreparationPlan,
    sourceNodeV340KeepsDesignDraftClosed:
      !sourceNodeV340.readyForDisabledRuntimeShellDesignDraft
      && !sourceNodeV340.readyForDisabledRuntimeShellDesignDraftOutline,
    sourceNodeV340KeepsRuntimeAndSideEffectsClosed:
      !sourceNodeV340.runtimeShellImplemented
      && !sourceNodeV340.runtimeShellInvocationAllowed
      && !sourceNodeV340.realResolverImplementationAllowed
      && !sourceNodeV340.executionAllowed
      && !sourceNodeV340.connectsManagedAudit
      && !sourceNodeV340.credentialValueRead
      && !sourceNodeV340.rawEndpointUrlParsed
      && !sourceNodeV340.externalRequestSent
      && !sourceNodeV340.httpRequestSent
      && !sourceNodeV340.tcpConnectionAttempted
      && !sourceNodeV340.automaticUpstreamStart
      && !sourceNodeV340.javaSqlExecutionAllowed
      && !sourceNodeV340.approvalLedgerWritten
      && !sourceNodeV340.schemaMigrationExecuted
      && !sourceNodeV340.rollbackExecutionAllowed
      && !sourceNodeV340.miniKvWriteCommandAllowed
      && !sourceNodeV340.miniKvLoadAllowed
      && !sourceNodeV340.miniKvCompactAllowed
      && !sourceNodeV340.miniKvRestoreAllowed
      && !sourceNodeV340.miniKvSetnxexAllowed,
    necessityProofComplete: necessityProof.proofComplete,
    preparationPlanOnly:
      plan.planMode === "disabled-runtime-shell-design-draft-body-preparation-plan-only"
      && plan.planScope === "plan-body-draft-sections-and-evidence-mapping-without-writing-body-content",
    sectionPlansComplete:
      sectionPlans.length === 8 && sectionPlans.every((entry) => entry.planned && !entry.bodyContentWritten),
    evidenceMappingsComplete:
      evidenceMappings.length === 6 && evidenceMappings.every((entry) => entry.requiredForFutureBodyDraft),
    draftGuardsEnforced: draftGuards.length === 8 && draftGuards.every((entry) => entry.enforced),
    stopConditionsComplete: stopConditions.length === 8,
    archiveVerificationRequiredBeforeBodyDraft: plan.requiresArchiveVerificationBeforeBodyDraft,
    noUpstreamEchoRequested: !plan.requestsJavaMiniKvEcho,
    noBodyDraftWritten:
      !plan.writesBodyDraftNow
      && !plan.allowsDisabledRuntimeShellDesignDraftNow
      && !plan.allowsDisabledRuntimeShellDesignDraftOutlineNow,
    noRuntimeImplementationCreated: !plan.allowsRuntimeShellImplementation,
    noRuntimeInvocationAllowed: !plan.allowsRuntimeShellInvocation,
    noCredentialValueRead: !plan.allowsCredentialValueRead,
    noRawEndpointUrlParsed: !plan.allowsRawEndpointUrlParse,
    noProviderClientInstantiated:
      !plan.allowsSecretProviderInstantiation
      && !plan.allowsResolverClientInstantiation,
    noExternalRequestSent:
      !plan.allowsExternalRequest
      && !plan.allowsManagedAuditConnection,
    noJavaOrMiniKvWrites:
      !plan.allowsSchemaMigration
      && !plan.allowsApprovalLedgerWrite
      && !plan.allowsRollbackExecution
      && !plan.allowsMiniKvWriteOrAdminCommand,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlan:
      false,
  };
}

function collectProductionBlockers(
  checks: DisabledRuntimeShellDesignDraftBodyPreparationPlanChecks,
): DisabledRuntimeShellDesignDraftBodyPreparationPlanMessage[] {
  const blockers: DisabledRuntimeShellDesignDraftBodyPreparationPlanMessage[] = [];
  addBlocker(blockers, checks.sourceNodeV340Ready, "NODE_V340_NOT_READY", "node-v340",
    "Node v340 pre-draft decision archive verification is not ready.");
  addBlocker(blockers, checks.sourceNodeV340AllowsPreparationPlanOnly,
    "NODE_V340_DID_NOT_ALLOW_PREPARATION_PLAN", "node-v340",
    "Node v340 did not allow the body preparation plan step.");
  addBlocker(blockers, checks.sourceNodeV340KeepsDesignDraftClosed, "SOURCE_DESIGN_DRAFT_ALREADY_OPEN",
    "runtime-boundary", "Node v340 already opened design draft body, outline, runtime implementation, or invocation.");
  addBlocker(blockers, checks.sourceNodeV340KeepsRuntimeAndSideEffectsClosed, "SOURCE_SIDE_EFFECT_BOUNDARY_OPEN",
    "runtime-boundary", "Node v340 source opened credential, network, Java write, mini-kv write/admin, or auto-start behavior.");
  addBlocker(blockers, checks.necessityProofComplete, "NECESSITY_PROOF_INCOMPLETE", "necessity-proof",
    "v341 missing necessity proof.");
  addBlocker(blockers, checks.sectionPlansComplete, "SECTION_PLANS_INCOMPLETE", "preparation-plan",
    "v341 section plans are incomplete.");
  addBlocker(blockers, checks.evidenceMappingsComplete, "EVIDENCE_MAPPINGS_INCOMPLETE", "preparation-plan",
    "v341 evidence mappings are incomplete.");
  addBlocker(blockers, checks.draftGuardsEnforced, "DRAFT_GUARDS_INCOMPLETE", "preparation-plan",
    "v341 draft guards are incomplete.");
  addBlocker(blockers, checks.archiveVerificationRequiredBeforeBodyDraft, "ARCHIVE_VERIFICATION_NOT_REQUIRED",
    "preparation-plan", "v341 must require archive verification before any body draft content.");
  addBlocker(blockers, checks.noUpstreamEchoRequested, "UNNEEDED_UPSTREAM_ECHO_REQUESTED", "preparation-plan",
    "v341 must not request Java/mini-kv echo unless it defines new contract fields.");
  addBlocker(blockers, checks.noBodyDraftWritten, "BODY_DRAFT_WRITTEN_TOO_EARLY", "runtime-boundary",
    "v341 wrote or allowed design body content before archive verification.");
  addBlocker(blockers, checks.noRuntimeImplementationCreated, "RUNTIME_IMPLEMENTATION_CREATED", "runtime-boundary",
    "v341 created runtime implementation permission.");
  addBlocker(blockers, checks.noProviderClientInstantiated, "PROVIDER_CLIENT_INSTANTIATED", "runtime-boundary",
    "v341 allowed provider/client instantiation.");
  addBlocker(blockers, checks.upstreamProbesStillDisabled, "UPSTREAM_PROBES_ENABLED", "configuration",
    "UPSTREAM_PROBES_ENABLED must stay false for this preparation plan.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "configuration",
    "UPSTREAM_ACTIONS_ENABLED must stay false for this preparation plan.");
  return blockers;
}

function collectWarnings(): DisabledRuntimeShellDesignDraftBodyPreparationPlanMessage[] {
  return [
    {
      code: "PREPARATION_PLAN_IS_NOT_BODY_DRAFT",
      severity: "warning",
      source: "preparation-plan",
      message: "v341 only plans how a future disabled design body may be drafted; it does not write the body.",
    },
  ];
}

function collectRecommendations(): DisabledRuntimeShellDesignDraftBodyPreparationPlanMessage[] {
  return [
    {
      code: "RUN_NODE_V342_ARCHIVE_VERIFICATION",
      severity: "recommendation",
      source: "next-step",
      message:
        "Use Node v342 to verify the v341 route, Markdown, digest, screenshot, and historical fallback before drafting any body content.",
    },
  ];
}

function createSummary(
  sourceNodeV340: SourceNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationReference,
  sectionPlans: readonly DisabledRuntimeShellDesignDraftBodyPreparationSectionPlan[],
  evidenceMappings: readonly DisabledRuntimeShellDesignDraftBodyPreparationEvidenceMapping[],
  draftGuards: readonly DisabledRuntimeShellDesignDraftBodyPreparationDraftGuard[],
  stopConditions: readonly DisabledRuntimeShellDesignDraftBodyPreparationStopCondition[],
  checks: DisabledRuntimeShellDesignDraftBodyPreparationPlanChecks,
  productionBlockers: readonly DisabledRuntimeShellDesignDraftBodyPreparationPlanMessage[],
  warnings: readonly DisabledRuntimeShellDesignDraftBodyPreparationPlanMessage[],
  recommendations: readonly DisabledRuntimeShellDesignDraftBodyPreparationPlanMessage[],
): DisabledRuntimeShellDesignDraftBodyPreparationPlanSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV340CheckCount: sourceNodeV340.sourceCheckCount,
    sourceNodeV340PassedCheckCount: sourceNodeV340.sourcePassedCheckCount,
    sourceArchiveFileCount: sourceNodeV340.sourceArchiveFileCount,
    sourcePresentArchiveFileCount: sourceNodeV340.sourcePresentArchiveFileCount,
    sourceProductionBlockerCount: sourceNodeV340.sourceProductionBlockerCount,
    sourceBodySectionCount: sourceNodeV340.sourceBodySectionCount,
    sourceEvidenceItemCount: sourceNodeV340.sourceEvidenceItemCount,
    sourceStopConditionCount: sourceNodeV340.sourceStopConditionCount,
    sectionPlanCount: sectionPlans.length,
    plannedSectionCount: sectionPlans.filter((entry) => entry.planned && !entry.bodyContentWritten).length,
    evidenceMappingCount: evidenceMappings.length,
    draftGuardCount: draftGuards.length,
    enforcedDraftGuardCount: draftGuards.filter((entry) => entry.enforced).length,
    stopConditionCount: stopConditions.length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function addBlocker(
  messages: DisabledRuntimeShellDesignDraftBodyPreparationPlanMessage[],
  condition: boolean,
  code: string,
  source: DisabledRuntimeShellDesignDraftBodyPreparationPlanMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
