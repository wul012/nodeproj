import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerification.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerificationTypes.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionProfile,
  SandboxHandleReviewContractDecisionChecks,
  SandboxHandleReviewContractDecisionMessage,
  SandboxHandleReviewContractDecisionNecessityProof,
  SandboxHandleReviewContractDecisionRecord,
  SandboxHandleReviewContractDecisionSummary,
  SandboxHandleReviewContractInput,
  SandboxHandleReviewContractSection,
  SourceNodeV355SandboxHandleReviewPrerequisiteArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-contract-decision.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-contract-decision";
const SOURCE_NODE_V355_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-intake-archive-verification";
const ACTIVE_PLAN =
  "docs/plans2/v355-post-sandbox-handle-review-prerequisite-intake-archive-verification-roadmap.md";
const NEXT_PLAN =
  "docs/plans2/v356-post-sandbox-handle-review-contract-decision-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision(
  input: { config: AppConfig; sourceArchiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionProfile {
  const sourceProfile =
    loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerification({
      config: input.config,
      archiveRoot: input.sourceArchiveRoot,
    });
  const sourceNodeV355 = createSourceNodeV355(sourceProfile);
  const necessityProof = createNecessityProof();
  const contractInputs = createContractInputs();
  const contractSections = createContractSections();
  const draftDecisionRecord = createDecisionRecord(sourceNodeV355, contractInputs, contractSections, false);
  const checks = createChecks(input.config, sourceNodeV355, necessityProof, contractInputs, contractSections,
    draftDecisionRecord);
  checks.readyForSandboxHandleReviewContractDecision = Object.entries(checks)
    .filter(([key]) => key !== "readyForSandboxHandleReviewContractDecision")
    .every(([, value]) => value);
  const ready = checks.readyForSandboxHandleReviewContractDecision;
  const decisionRecord = createDecisionRecord(sourceNodeV355, contractInputs, contractSections, ready);
  checks.decisionDigestStable = isDigest(decisionRecord.decisionDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(ready);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV355, contractInputs, contractSections, checks, productionBlockers,
    warnings, recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver sandbox handle review contract decision",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    decisionState: ready ? "sandbox-handle-review-contract-decision-ready" : "blocked",
    decision: decisionRecord.decision,
    readyForSandboxHandleReviewContractDecision: ready,
    readyForNodeV357SandboxHandleReviewContractDecisionArchiveVerification: ready,
    consumesNodeV355SandboxHandleReviewPrerequisiteIntakeArchiveVerification: true,
    activeNodeVersion: "Node v356",
    sourceNodeVersion: "Node v355",
    contractDecisionOnly: true,
    sandboxHandleReviewOnly: true,
    rerunsLiveProbe: false,
    startsJavaService: false,
    startsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    sendsManagedAuditHttpTcp: false,
    credentialValueRequested: false,
    credentialValueRead: false,
    rawEndpointUrlRequested: false,
    rawEndpointUrlParsed: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    runtimeShellImplemented: false,
    runtimeShellInvocationAllowed: false,
    executionAllowed: false,
    requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    sourceNodeV355,
    necessityProof,
    contractInputs,
    contractSections,
    decisionRecord,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      sandboxHandleReviewContractDecisionJson: ROUTE_PATH,
      sandboxHandleReviewContractDecisionMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV355Json: SOURCE_NODE_V355_ROUTE,
      sourceNodeV355Markdown: `${SOURCE_NODE_V355_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v357",
    },
    nextActions: ready
      ? [
        "Use Node v357 to verify the v356 archive before any new sandbox handle review behavior.",
        "Keep all contract inputs as opaque references or review status, not credential values or raw endpoint URLs.",
        "Pause if the next step asks for provider/client instantiation, runtime shell invocation, managed audit HTTP/TCP, Java writes, or mini-kv write/admin scope.",
      ]
      : [
        "Fix Node v355 archive verification before recording the v356 contract decision.",
        "Do not request Java or mini-kv changes from this decision failure alone.",
      ],
  };
}

function createSourceNodeV355(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerificationProfile,
): SourceNodeV355SandboxHandleReviewPrerequisiteArchiveVerificationReference {
  return {
    sourceVersion: "Node v355",
    profileVersion: profile.profileVersion,
    archiveVerificationState: profile.archiveVerificationState,
    archiveVerificationDecision: profile.archiveVerificationDecision,
    readyForArchiveVerification: profile.readyForSandboxHandleReviewPrerequisiteIntakeArchiveVerification,
    readyForNodeV356ContractDecision: profile.readyForNodeV356SandboxHandleReviewContractDecision,
    archiveVerificationDigest: profile.archiveVerification.archiveVerificationDigest,
    archiveFileCount: profile.summary.archiveFileCount,
    presentArchiveFileCount: profile.summary.presentArchiveFileCount,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
    prerequisiteInputCount: profile.summary.prerequisiteInputCount,
    closedScopeCount: profile.summary.closedScopeCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
    rerunsLiveProbe: profile.rerunsLiveProbe,
    startsJavaService: profile.startsJavaService,
    startsMiniKvService: profile.startsMiniKvService,
    mutatesJavaState: profile.mutatesJavaState,
    mutatesMiniKvState: profile.mutatesMiniKvState,
    connectsManagedAudit: profile.connectsManagedAudit,
    sendsManagedAuditHttpTcp: profile.sendsManagedAuditHttpTcp,
    credentialValueRequested: profile.credentialValueRequested,
    credentialValueRead: profile.credentialValueRead,
    rawEndpointUrlRequested: profile.rawEndpointUrlRequested,
    rawEndpointUrlParsed: profile.rawEndpointUrlParsed,
    secretProviderInstantiated: profile.secretProviderInstantiated,
    resolverClientInstantiated: profile.resolverClientInstantiated,
    runtimeShellImplemented: profile.runtimeShellImplemented,
    runtimeShellInvocationAllowed: profile.runtimeShellInvocationAllowed,
    executionAllowed: profile.executionAllowed,
  };
}

function createNecessityProof(): SandboxHandleReviewContractDecisionNecessityProof {
  return {
    blockerResolved: "sandbox-handle-review-needs-contract-decision-after-archive-verification",
    consumedBy: "Node v357 sandbox handle review contract decision archive verification or later non-secret handle review gate",
    cannotReuseExistingReportBecause:
      "Node v355 verifies the v354 archive, but it does not declare the contract decision that downstream handle review gates can consume.",
    growthStopCondition:
      "Stop when the chain requests credential value, raw endpoint URL, provider/client instantiation, runtime shell, managed audit HTTP/TCP, or upstream write/admin scope.",
  };
}

function createContractInputs(): SandboxHandleReviewContractInput[] {
  return [
    contractInput("sandbox-handle-reference", "Sandbox credential handle reference", "handle-reference",
      "sandbox-handle-reference", "opaque handle id or alias must be present and must not contain credential material"),
    contractInput("allowlist-review-status", "Endpoint allowlist review status", "review-status",
      "allowlist-review-status", "review state must be approved, rejected, pending, or not-requested without URL text"),
    contractInput("credential-handle-binding-status", "Credential handle binding status", "binding-status",
      "credential-handle-binding-status", "binding state must be bound, unbound, pending, or not-requested"),
    contractInput("operator-approval-correlation", "Operator approval correlation id", "operator-context",
      "operator-approval-correlation", "correlation id must link evidence without granting execution authority"),
    contractInput("source-decision-digest", "Source decision digest", "source-evidence",
      "source-decision-digest", "source digest must be a sha256 value from the archived prerequisite intake chain"),
  ];
}

function contractInput(
  id: string,
  label: string,
  category: SandboxHandleReviewContractInput["category"],
  sourcePrerequisiteId: string,
  contractRequirement: string,
): SandboxHandleReviewContractInput {
  return {
    id,
    label,
    category,
    sourcePrerequisiteId,
    contractRequirement,
    containsSecretValue: false,
    containsRawEndpointUrl: false,
    allowsNetworkConnection: false,
    allowsRuntimeInvocation: false,
    status: "contract-required",
  };
}

function createContractSections(): SandboxHandleReviewContractSection[] {
  return [
    contractSection("opaque-handle-reference", "Opaque handle reference",
      "Only opaque handle identifiers or aliases may enter review; credential values are rejected."),
    contractSection("allowlist-review-state", "Allowlist review state",
      "Review state may describe approval status but cannot include raw endpoint URLs."),
    contractSection("binding-review-state", "Binding review state",
      "Binding state is informational and cannot instantiate provider/client code."),
    contractSection("operator-correlation", "Operator correlation",
      "Correlation ids link review artifacts without enabling execution."),
    contractSection("source-evidence-digest", "Source evidence digest",
      "Digest checks bind the contract to v355 evidence before any later review gate consumes it."),
    contractSection("stop-conditions", "Stop conditions",
      "Any request for secrets, raw endpoints, network, runtime shell, or upstream writes stops the chain."),
  ];
}

function contractSection(
  id: string,
  title: string,
  decisionRule: string,
): SandboxHandleReviewContractSection {
  return {
    id,
    title,
    decisionRule,
    acceptsOnlyOpaqueReference: true,
    containsSecretValue: false,
    containsRawEndpointUrl: false,
    opensManagedAuditConnection: false,
    invokesRuntimeShell: false,
    mutatesUpstreamState: false,
  };
}

function createDecisionRecord(
  source: SourceNodeV355SandboxHandleReviewPrerequisiteArchiveVerificationReference,
  inputs: readonly SandboxHandleReviewContractInput[],
  sections: readonly SandboxHandleReviewContractSection[],
  ready: boolean,
): SandboxHandleReviewContractDecisionRecord {
  const recordWithoutDigest = {
    decisionMode: "sandbox-handle-review-contract-decision" as const,
    sourceSpan: "Node v355 sandbox handle review prerequisite intake archive verification" as const,
    sourceArchiveVerificationDigest: source.archiveVerificationDigest,
    decision: ready ? "define-sandbox-handle-review-contract" as const : "blocked" as const,
    decisionReason: ready
      ? "v355 archive verification is complete, so v356 can define a non-secret sandbox handle review contract."
      : "v355 archive verification is not ready, so v356 remains blocked.",
    contractInputCount: inputs.length,
    contractSectionCount: sections.length,
    permitsOnlyNonSecretContract: true as const,
    requestsCredentialValue: false as const,
    requestsRawEndpointUrl: false as const,
    instantiatesProviderClient: false as const,
    implementsRuntimeShell: false as const,
    invokesRuntimeShell: false as const,
    opensManagedAuditConnection: false as const,
    startsUpstreamServices: false as const,
    writesUpstreamState: false as const,
    requestsJavaMiniKvEcho: false as const,
    nextNodeVersionSuggested: "Node v357" as const,
  };

  return {
    decisionDigest: sha256StableJson(recordWithoutDigest),
    ...recordWithoutDigest,
  };
}

function createChecks(
  config: AppConfig,
  source: SourceNodeV355SandboxHandleReviewPrerequisiteArchiveVerificationReference,
  proof: SandboxHandleReviewContractDecisionNecessityProof,
  inputs: readonly SandboxHandleReviewContractInput[],
  sections: readonly SandboxHandleReviewContractSection[],
  decision: SandboxHandleReviewContractDecisionRecord,
): SandboxHandleReviewContractDecisionChecks {
  const inputsClosed = inputs.every((input) =>
    !input.containsSecretValue
    && !input.containsRawEndpointUrl
    && !input.allowsNetworkConnection
    && !input.allowsRuntimeInvocation
    && input.status === "contract-required");
  const sectionsClosed = sections.every((section) =>
    section.acceptsOnlyOpaqueReference
    && !section.containsSecretValue
    && !section.containsRawEndpointUrl
    && !section.opensManagedAuditConnection
    && !section.invokesRuntimeShell
    && !section.mutatesUpstreamState);

  return {
    sourceNodeV355Ready:
      source.archiveVerificationState === "sandbox-handle-review-prerequisite-intake-archive-verified"
      && source.archiveVerificationDecision === "archive-sandbox-handle-review-prerequisite-intake"
      && source.readyForArchiveVerification
      && source.readyForNodeV356ContractDecision
      && isDigest(source.archiveVerificationDigest),
    sourceArchiveVerificationAllowsContractDecision:
      source.archiveVerificationDecision === "archive-sandbox-handle-review-prerequisite-intake",
    sourceArchiveFilesComplete:
      source.archiveFileCount === 11 && source.presentArchiveFileCount === 11,
    sourceChecksAllPassed:
      source.checkCount === 29 && source.passedCheckCount === 29 && source.productionBlockerCount === 0,
    necessityProofPresent:
      proof.blockerResolved.length > 0
      && proof.consumedBy.length > 0
      && proof.cannotReuseExistingReportBecause.length > 0
      && proof.growthStopCondition.length > 0,
    contractInputsComplete:
      inputs.length === 5 && inputs.every((input) => input.id.length > 0 && input.contractRequirement.length > 0),
    contractSectionsComplete:
      sections.length === 6 && sections.every((section) => section.id.length > 0 && section.decisionRule.length > 0),
    contractInputsNonSecret: inputs.every((input) => !input.containsSecretValue),
    contractSectionsNonSecret: sections.every((section) => !section.containsSecretValue),
    contractDoesNotRequestRawEndpoint:
      inputs.every((input) => !input.containsRawEndpointUrl) && sections.every((section) => !section.containsRawEndpointUrl),
    contractDoesNotAllowNetwork:
      inputs.every((input) => !input.allowsNetworkConnection) && sections.every((section) => !section.opensManagedAuditConnection),
    decisionDigestStable: isDigest(decision.decisionDigest),
    decisionLimitedToContract:
      decision.decision === "blocked" || decision.decision === "define-sandbox-handle-review-contract",
    noCredentialValueRequestedOrRead:
      !decision.requestsCredentialValue && inputsClosed && sectionsClosed && !source.credentialValueRead,
    noRawEndpointRequestedOrParsed:
      !decision.requestsRawEndpointUrl && inputsClosed && sectionsClosed && !source.rawEndpointUrlParsed,
    noProviderClientInstantiated:
      !decision.instantiatesProviderClient && !source.secretProviderInstantiated && !source.resolverClientInstantiated,
    noRuntimeShellImplemented: !decision.implementsRuntimeShell && !source.runtimeShellImplemented,
    noRuntimeShellInvoked: !decision.invokesRuntimeShell && !source.runtimeShellInvocationAllowed,
    noManagedAuditHttpTcp:
      !decision.opensManagedAuditConnection
      && !source.connectsManagedAudit
      && !source.sendsManagedAuditHttpTcp
      && !config.upstreamActionsEnabled,
    noUpstreamServiceStarted:
      !decision.startsUpstreamServices && !source.startsJavaService && !source.startsMiniKvService,
    noUpstreamMutation:
      !decision.writesUpstreamState && !source.mutatesJavaState && !source.mutatesMiniKvState,
    noJavaMiniKvEchoRequired: !decision.requestsJavaMiniKvEcho,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForSandboxHandleReviewContractDecision: false,
  };
}

function collectProductionBlockers(
  checks: SandboxHandleReviewContractDecisionChecks,
): SandboxHandleReviewContractDecisionMessage[] {
  const rules: Array<[boolean, string, SandboxHandleReviewContractDecisionMessage["source"], string]> = [
    [checks.sourceNodeV355Ready, "NODE_V355_NOT_READY", "node-v355",
      "Node v355 archive verification must be ready before v356 can record a contract decision."],
    [checks.sourceArchiveVerificationAllowsContractDecision, "NODE_V355_DECISION_NOT_ALLOWED", "node-v355",
      "Node v355 must explicitly archive the sandbox handle review prerequisite intake."],
    [checks.sourceArchiveFilesComplete, "SOURCE_ARCHIVE_FILES_INCOMPLETE", "node-v355",
      "Node v355 must show 11/11 archive files present."],
    [checks.sourceChecksAllPassed, "SOURCE_CHECKS_NOT_ALL_PASSED", "node-v355",
      "Node v355 must show 29/29 checks and zero production blockers."],
    [checks.necessityProofPresent, "NECESSITY_PROOF_MISSING", "necessity-proof",
      "v356 must explain why this contract decision exists and when the chain stops."],
    [checks.contractInputsComplete, "CONTRACT_INPUTS_INCOMPLETE", "contract-inputs",
      "v356 contract inputs must be complete."],
    [checks.contractSectionsComplete, "CONTRACT_SECTIONS_INCOMPLETE", "contract-sections",
      "v356 contract sections must be complete."],
    [checks.contractInputsNonSecret, "CONTRACT_INPUTS_INCLUDE_SECRET", "contract-inputs",
      "v356 contract inputs must not contain credential values."],
    [checks.contractDoesNotRequestRawEndpoint, "CONTRACT_REQUESTS_RAW_ENDPOINT", "contract-sections",
      "v356 contract must not request raw endpoint URLs."],
    [checks.contractDoesNotAllowNetwork, "CONTRACT_ALLOWS_NETWORK", "contract-sections",
      "v356 contract must not open managed audit network calls."],
    [checks.decisionDigestStable, "DECISION_DIGEST_UNSTABLE", "decision-record",
      "v356 decision digest must be stable."],
    [checks.decisionLimitedToContract, "DECISION_SCOPE_TOO_BROAD", "decision-record",
      "v356 may only define a contract decision or remain blocked."],
    [checks.noCredentialValueRequestedOrRead, "CREDENTIAL_VALUE_OPENED", "runtime-boundary",
      "v356 must not request or read credential values."],
    [checks.noRawEndpointRequestedOrParsed, "RAW_ENDPOINT_OPENED", "runtime-boundary",
      "v356 must not request or parse raw endpoint URLs."],
    [checks.noProviderClientInstantiated, "PROVIDER_OR_CLIENT_INSTANTIATED", "runtime-boundary",
      "v356 must not instantiate provider or resolver client."],
    [checks.noRuntimeShellImplemented, "RUNTIME_SHELL_IMPLEMENTED", "runtime-boundary",
      "v356 must not implement runtime shell."],
    [checks.noRuntimeShellInvoked, "RUNTIME_SHELL_INVOKED", "runtime-boundary",
      "v356 must not invoke runtime shell."],
    [checks.noManagedAuditHttpTcp, "MANAGED_AUDIT_HTTP_TCP_OPEN", "runtime-boundary",
      "v356 must not open managed audit HTTP/TCP."],
    [checks.noUpstreamServiceStarted, "UPSTREAM_SERVICE_STARTED", "runtime-boundary",
      "v356 must not start Java or mini-kv."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_OPEN", "runtime-boundary",
      "v356 must not mutate Java or mini-kv."],
    [checks.noJavaMiniKvEchoRequired, "UNNEEDED_JAVA_MINI_KV_ECHO_REQUESTED", "decision-record",
      "v356 must not request Java v153 + mini-kv v144."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(ready: boolean): SandboxHandleReviewContractDecisionMessage[] {
  return [{
    code: "SANDBOX_HANDLE_REVIEW_CONTRACT_STILL_NON_SECRET",
    severity: "warning",
    source: "next-step",
    message: ready
      ? "v356 defines only a non-secret contract decision; it does not approve a real managed audit connection."
      : "The contract decision remains blocked until v355 archive verification is complete.",
  }];
}

function collectRecommendations(ready: boolean): SandboxHandleReviewContractDecisionMessage[] {
  return [{
    code: ready ? "PROCEED_TO_NODE_V357_ARCHIVE_VERIFICATION" : "FIX_V355_BEFORE_V357",
    severity: "recommendation",
    source: "next-step",
    message: ready
      ? "Proceed to Node v357 as archive verification before adding handle review behavior."
      : "Fix Node v355 source evidence before any v357 follow-up.",
  }];
}

function createSummary(
  source: SourceNodeV355SandboxHandleReviewPrerequisiteArchiveVerificationReference,
  inputs: readonly SandboxHandleReviewContractInput[],
  sections: readonly SandboxHandleReviewContractSection[],
  checks: SandboxHandleReviewContractDecisionChecks,
  productionBlockers: readonly SandboxHandleReviewContractDecisionMessage[],
  warnings: readonly SandboxHandleReviewContractDecisionMessage[],
  recommendations: readonly SandboxHandleReviewContractDecisionMessage[],
): SandboxHandleReviewContractDecisionSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    contractInputCount: inputs.length,
    contractSectionCount: sections.length,
    sourceArchiveFileCount: source.archiveFileCount,
    sourcePresentArchiveFileCount: source.presentArchiveFileCount,
    sourceCheckCount: source.checkCount,
    sourcePassedCheckCount: source.passedCheckCount,
    sourceProductionBlockerCount: source.productionBlockerCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
