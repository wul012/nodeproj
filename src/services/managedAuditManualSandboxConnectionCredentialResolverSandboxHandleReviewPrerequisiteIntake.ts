import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord,
} from "./managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordTypes.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeProfile,
  SandboxHandleReviewClosedScope,
  SandboxHandleReviewPrerequisiteInput,
  SandboxHandleReviewPrerequisiteIntakeChecks,
  SandboxHandleReviewPrerequisiteIntakeMessage,
  SandboxHandleReviewPrerequisiteIntakeRecord,
  SandboxHandleReviewPrerequisiteIntakeSummary,
  SandboxHandleReviewPrerequisiteNecessityProof,
  SourceNodeV353ManagedAuditDisabledDecisionRecordReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-intake.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-intake";
const SOURCE_NODE_V353_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-decision-record";
const ACTIVE_PLAN =
  "docs/plans2/v353-post-managed-audit-disabled-read-only-integration-decision-record-roadmap.md";
const NEXT_PLAN =
  "docs/plans2/v354-post-sandbox-handle-review-prerequisite-intake-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake(
  input: { config: AppConfig; sourceArchiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeProfile {
  const sourceProfile =
    loadManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord({
      config: input.config,
      sourceArchiveRoot: input.sourceArchiveRoot,
    });
  const sourceNodeV353 = createSourceNodeV353(sourceProfile);
  const necessityProof = createNecessityProof();
  const prerequisiteInputs = createPrerequisiteInputs(sourceNodeV353);
  const closedScopes = createClosedScopes();
  const draftIntakeRecord = createIntakeRecord(sourceNodeV353, prerequisiteInputs, closedScopes, false);
  const checks = createChecks(
    input.config,
    sourceNodeV353,
    necessityProof,
    prerequisiteInputs,
    closedScopes,
    draftIntakeRecord,
  );
  checks.readyForSandboxHandleReviewPrerequisiteIntake = Object.entries(checks)
    .filter(([key]) => key !== "readyForSandboxHandleReviewPrerequisiteIntake")
    .every(([, value]) => value);
  const ready = checks.readyForSandboxHandleReviewPrerequisiteIntake;
  const intakeRecord = createIntakeRecord(sourceNodeV353, prerequisiteInputs, closedScopes, ready);
  checks.intakeDigestStable = isDigest(intakeRecord.intakeDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(ready);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(
    sourceNodeV353,
    prerequisiteInputs,
    closedScopes,
    checks,
    productionBlockers,
    warnings,
    recommendations,
  );

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver sandbox handle review prerequisite intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    intakeState: ready ? "sandbox-handle-review-prerequisite-intake-ready" : "blocked",
    intakeDecision: intakeRecord.intakeDecision,
    readyForSandboxHandleReviewPrerequisiteIntake: ready,
    readyForNodeV355SandboxHandleReviewPrerequisiteIntakeArchiveVerification: ready,
    consumesNodeV353ManagedAuditDisabledReadOnlyIntegrationDecisionRecord: true,
    activeNodeVersion: "Node v354",
    sourceNodeVersion: "Node v353",
    prerequisiteIntakeOnly: true,
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
    sourceNodeV353,
    necessityProof,
    prerequisiteInputs,
    closedScopes,
    intakeRecord,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      sandboxHandleReviewPrerequisiteIntakeJson: ROUTE_PATH,
      sandboxHandleReviewPrerequisiteIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV353Json: SOURCE_NODE_V353_ROUTE,
      sourceNodeV353Markdown: `${SOURCE_NODE_V353_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v355",
    },
    nextActions: ready
      ? [
        "Use Node v355 to verify the v354 archive before any sandbox handle review expansion.",
        "Keep sandbox handle and review status as non-secret references only; do not request credential values or raw endpoint URLs.",
        "Pause if the next step asks for provider/client instantiation, runtime shell invocation, managed audit HTTP/TCP, Java writes, or mini-kv write/admin scope.",
      ]
      : [
        "Fix Node v353 decision record before defining sandbox handle review prerequisites.",
        "Do not request Java or mini-kv changes from this intake failure alone.",
      ],
  };
}

function createSourceNodeV353(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordProfile,
): SourceNodeV353ManagedAuditDisabledDecisionRecordReference {
  return {
    sourceVersion: "Node v353",
    profileVersion: profile.profileVersion,
    decisionState: profile.decisionState,
    decision: profile.decision,
    readyForDecisionRecord: profile.readyForManagedAuditDisabledReadOnlyIntegrationDecisionRecord,
    readyForNodeV354PrerequisiteIntake: profile.readyForNodeV354SandboxHandleReviewPrerequisiteIntake,
    decisionDigest: profile.decisionRecord.decisionDigest,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
    inputCount: profile.summary.inputCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
    rerunsLiveProbe: profile.rerunsLiveProbe,
    startsJavaService: profile.startsJavaService,
    startsMiniKvService: profile.startsMiniKvService,
    mutatesJavaState: profile.mutatesJavaState,
    mutatesMiniKvState: profile.mutatesMiniKvState,
    connectsManagedAudit: profile.connectsManagedAudit,
    sendsManagedAuditHttpTcp: profile.sendsManagedAuditHttpTcp,
    readsManagedAuditCredential: profile.readsManagedAuditCredential,
    rawEndpointUrlParsed: profile.rawEndpointUrlParsed,
    secretProviderInstantiated: profile.secretProviderInstantiated,
    resolverClientInstantiated: profile.resolverClientInstantiated,
    runtimeShellImplemented: profile.runtimeShellImplemented,
    runtimeShellInvocationAllowed: profile.runtimeShellInvocationAllowed,
    executionAllowed: profile.executionAllowed,
  };
}

function createNecessityProof(): SandboxHandleReviewPrerequisiteNecessityProof {
  return {
    blockerResolved: "sandbox-handle-review-needs-non-secret-prerequisite-input-contract",
    consumedBy: "Node v355 sandbox handle review prerequisite intake archive verification or later handle review stage",
    cannotReuseExistingReportBecause:
      "Node v353 only records that the next stage may advance; it does not define the specific non-secret handle and review-status inputs allowed for sandbox handle review.",
    growthStopCondition:
      "Stop if the chain requests credential value, raw endpoint URL, provider/client instantiation, runtime shell code, managed audit HTTP/TCP, Java writes, or mini-kv write/admin authority.",
  };
}

function createPrerequisiteInputs(
  source: SourceNodeV353ManagedAuditDisabledDecisionRecordReference,
): SandboxHandleReviewPrerequisiteInput[] {
  return [
    {
      id: "sandbox-handle-reference",
      label: "Sandbox credential handle reference",
      category: "handle-reference",
      allowedShape: "opaque handle id or alias only",
      requiredBeforeReview: true,
      containsSecretValue: false,
      containsRawEndpointUrl: false,
      allowsNetworkConnection: false,
      allowsRuntimeInvocation: false,
      status: "allowed-contract-only",
      notes: "The value is a handle reference for review, not credential material.",
    },
    {
      id: "allowlist-review-status",
      label: "Endpoint allowlist review status",
      category: "review-status",
      allowedShape: "approved | rejected | pending | not-requested",
      requiredBeforeReview: true,
      containsSecretValue: false,
      containsRawEndpointUrl: false,
      allowsNetworkConnection: false,
      allowsRuntimeInvocation: false,
      status: "allowed-contract-only",
      notes: "The status describes review outcome only; it does not include a URL.",
    },
    {
      id: "credential-handle-binding-status",
      label: "Credential handle binding status",
      category: "binding-status",
      allowedShape: "bound | unbound | pending | not-requested",
      requiredBeforeReview: true,
      containsSecretValue: false,
      containsRawEndpointUrl: false,
      allowsNetworkConnection: false,
      allowsRuntimeInvocation: false,
      status: "allowed-contract-only",
      notes: "The binding status proves a review prerequisite, not a usable credential.",
    },
    {
      id: "operator-approval-correlation",
      label: "Operator approval correlation id",
      category: "operator-context",
      allowedShape: "opaque correlation id",
      requiredBeforeReview: true,
      containsSecretValue: false,
      containsRawEndpointUrl: false,
      allowsNetworkConnection: false,
      allowsRuntimeInvocation: false,
      status: "allowed-contract-only",
      notes: "The correlation id links review evidence without granting execution authority.",
    },
    {
      id: "source-decision-digest",
      label: "Node v353 decision digest",
      category: "source-evidence",
      allowedShape: "sha256 digest",
      requiredBeforeReview: true,
      containsSecretValue: false,
      containsRawEndpointUrl: false,
      allowsNetworkConnection: false,
      allowsRuntimeInvocation: false,
      status: "allowed-contract-only",
      notes: `The prerequisite intake is chained to ${source.decisionDigest}.`,
    },
  ];
}

function createClosedScopes(): SandboxHandleReviewClosedScope[] {
  return [
    ["credential-value", "Credential value", "Handle review never reads or requests secret material."],
    ["raw-endpoint-url", "Raw endpoint URL", "Only allowlist review status is allowed, not endpoint strings."],
    ["secret-provider", "Secret provider", "No provider is instantiated in prerequisite intake."],
    ["resolver-client", "Resolver client", "No managed audit resolver client is created."],
    ["runtime-shell", "Runtime shell", "Runtime shell remains unimplemented and uninvoked."],
    ["managed-audit-http-tcp", "Managed audit HTTP/TCP", "No network request is sent to managed audit."],
    ["java-writes", "Java writes", "No Java ledger, SQL, deployment, or rollback action is opened."],
    ["mini-kv-write-admin", "mini-kv write/admin", "No LOAD/COMPACT/RESTORE/SETNXEX or authority storage is opened."],
    ["automatic-upstream-start", "Automatic upstream start", "Node does not start Java, mini-kv, or external audit services."],
  ].map(([id, label, closedBecause]) => ({
    id,
    label,
    closedBecause,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    providerClientInstantiated: false,
    runtimeShellInvocationAllowed: false,
    managedAuditHttpTcpAllowed: false,
    upstreamMutationAllowed: false,
  }));
}

function createIntakeRecord(
  source: SourceNodeV353ManagedAuditDisabledDecisionRecordReference,
  inputs: readonly SandboxHandleReviewPrerequisiteInput[],
  closedScopes: readonly SandboxHandleReviewClosedScope[],
  ready: boolean,
): SandboxHandleReviewPrerequisiteIntakeRecord {
  const recordWithoutDigest = {
    intakeMode: "sandbox-handle-review-prerequisite-intake" as const,
    sourceSpan: "Node v353 managed-audit-disabled read-only integration decision record" as const,
    sourceDecisionDigest: source.decisionDigest,
    intakeDecision: ready ? "define-non-secret-sandbox-handle-review-prerequisites" as const : "blocked" as const,
    intakeReason: ready
      ? "Node v353 decision is complete, so v354 may define only non-secret prerequisite inputs for sandbox handle review."
      : "Node v353 decision is not ready, so v354 remains blocked.",
    allowedInputCount: inputs.length,
    closedScopeCount: closedScopes.length,
    requestsCredentialValue: false as const,
    requestsRawEndpointUrl: false as const,
    instantiatesProviderClient: false as const,
    implementsRuntimeShell: false as const,
    invokesRuntimeShell: false as const,
    opensManagedAuditConnection: false as const,
    startsUpstreamServices: false as const,
    writesUpstreamState: false as const,
    requestsJavaMiniKvEcho: false as const,
    nextNodeVersionSuggested: "Node v355" as const,
  };

  return {
    intakeDigest: sha256StableJson(recordWithoutDigest),
    ...recordWithoutDigest,
  };
}

function createChecks(
  config: AppConfig,
  source: SourceNodeV353ManagedAuditDisabledDecisionRecordReference,
  proof: SandboxHandleReviewPrerequisiteNecessityProof,
  inputs: readonly SandboxHandleReviewPrerequisiteInput[],
  closedScopes: readonly SandboxHandleReviewClosedScope[],
  intake: SandboxHandleReviewPrerequisiteIntakeRecord,
): SandboxHandleReviewPrerequisiteIntakeChecks {
  const inputsAreClosed = inputs.every((item) =>
    !item.containsSecretValue
    && !item.containsRawEndpointUrl
    && !item.allowsNetworkConnection
    && !item.allowsRuntimeInvocation
    && item.status === "allowed-contract-only"
  );
  const scopesAreClosed = closedScopes.every((scope) =>
    !scope.credentialValueRead
    && !scope.rawEndpointUrlParsed
    && !scope.providerClientInstantiated
    && !scope.runtimeShellInvocationAllowed
    && !scope.managedAuditHttpTcpAllowed
    && !scope.upstreamMutationAllowed
  );

  return {
    sourceNodeV353Ready:
      source.decisionState === "managed-audit-disabled-read-only-integration-decision-record-ready"
      && source.decision === "advance-to-sandbox-handle-review-prerequisite-intake"
      && source.readyForDecisionRecord
      && source.readyForNodeV354PrerequisiteIntake
      && isDigest(source.decisionDigest),
    sourceDecisionAllowsPrerequisiteIntake:
      source.decision === "advance-to-sandbox-handle-review-prerequisite-intake",
    sourceChecksAllPassed:
      source.checkCount === source.passedCheckCount && source.productionBlockerCount === 0,
    necessityProofPresent:
      proof.blockerResolved.length > 0
      && proof.consumedBy.length > 0
      && proof.cannotReuseExistingReportBecause.length > 0
      && proof.growthStopCondition.length > 0,
    prerequisiteInputsComplete:
      inputs.length === 5
      && inputs.every((item) => item.id.length > 0 && item.label.length > 0 && item.allowedShape.length > 0),
    prerequisiteInputsNonSecret: inputs.every((item) => !item.containsSecretValue),
    prerequisiteInputsNoRawEndpoint: inputs.every((item) => !item.containsRawEndpointUrl),
    prerequisiteInputsNoNetworkConnection: inputs.every((item) => !item.allowsNetworkConnection),
    prerequisiteInputsNoRuntimeInvocation: inputs.every((item) => !item.allowsRuntimeInvocation),
    closedScopesComplete: closedScopes.length === 9 && scopesAreClosed,
    intakeDigestStable: isDigest(intake.intakeDigest),
    intakeDecisionLimitedToPrerequisiteContract:
      intake.intakeDecision === "blocked"
      || intake.intakeDecision === "define-non-secret-sandbox-handle-review-prerequisites",
    noCredentialValueRequested:
      !intake.requestsCredentialValue && inputsAreClosed && !source.readsManagedAuditCredential,
    noRawEndpointRequested:
      !intake.requestsRawEndpointUrl && inputsAreClosed && !source.rawEndpointUrlParsed,
    noProviderClientInstantiated:
      !intake.instantiatesProviderClient && !source.secretProviderInstantiated && !source.resolverClientInstantiated,
    noRuntimeShellImplemented: !intake.implementsRuntimeShell && !source.runtimeShellImplemented,
    noRuntimeShellInvoked: !intake.invokesRuntimeShell && !source.runtimeShellInvocationAllowed,
    noManagedAuditHttpTcp:
      !intake.opensManagedAuditConnection
      && !source.connectsManagedAudit
      && !source.sendsManagedAuditHttpTcp
      && !config.upstreamActionsEnabled,
    noUpstreamServiceStarted:
      !intake.startsUpstreamServices && !source.startsJavaService && !source.startsMiniKvService,
    noUpstreamMutation:
      !intake.writesUpstreamState && !source.mutatesJavaState && !source.mutatesMiniKvState,
    noJavaMiniKvEchoRequired: !intake.requestsJavaMiniKvEcho,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForSandboxHandleReviewPrerequisiteIntake: false,
  };
}

function collectProductionBlockers(
  checks: SandboxHandleReviewPrerequisiteIntakeChecks,
): SandboxHandleReviewPrerequisiteIntakeMessage[] {
  const rules: Array<[boolean, string, SandboxHandleReviewPrerequisiteIntakeMessage["source"], string]> = [
    [checks.sourceNodeV353Ready, "NODE_V353_NOT_READY", "node-v353",
      "Node v353 decision record must be ready before v354 can define sandbox handle review prerequisites."],
    [checks.sourceDecisionAllowsPrerequisiteIntake, "NODE_V353_DECISION_NOT_ALLOWED", "node-v353",
      "Node v353 must explicitly choose sandbox handle review prerequisite intake."],
    [checks.sourceChecksAllPassed, "SOURCE_CHECKS_NOT_ALL_PASSED", "node-v353",
      "Node v353 must show all checks passed and zero production blockers."],
    [checks.necessityProofPresent, "NECESSITY_PROOF_MISSING", "necessity-proof",
      "v354 must explain why this intake exists and when the chain stops."],
    [checks.prerequisiteInputsComplete, "PREREQUISITE_INPUTS_INCOMPLETE", "prerequisite-inputs",
      "v354 prerequisite inputs must be complete."],
    [checks.prerequisiteInputsNonSecret, "PREREQUISITE_INPUTS_INCLUDE_SECRET", "prerequisite-inputs",
      "v354 prerequisite inputs must not contain credential values."],
    [checks.prerequisiteInputsNoRawEndpoint, "PREREQUISITE_INPUTS_INCLUDE_RAW_ENDPOINT", "prerequisite-inputs",
      "v354 prerequisite inputs must not contain raw endpoint URLs."],
    [checks.closedScopesComplete, "CLOSED_SCOPES_INCOMPLETE", "closed-scopes",
      "v354 must explicitly close all runtime, network, write, and upstream-start scopes."],
    [checks.intakeDigestStable, "INTAKE_DIGEST_UNSTABLE", "intake-record",
      "v354 intake digest must be stable."],
    [checks.intakeDecisionLimitedToPrerequisiteContract, "INTAKE_SCOPE_TOO_BROAD", "intake-record",
      "v354 may only define a prerequisite contract or remain blocked."],
    [checks.noCredentialValueRequested, "CREDENTIAL_VALUE_REQUESTED", "runtime-boundary",
      "v354 must not request credential values."],
    [checks.noRawEndpointRequested, "RAW_ENDPOINT_REQUESTED", "runtime-boundary",
      "v354 must not request raw endpoint URLs."],
    [checks.noProviderClientInstantiated, "PROVIDER_OR_CLIENT_INSTANTIATED", "runtime-boundary",
      "v354 must not instantiate provider or resolver client."],
    [checks.noRuntimeShellImplemented, "RUNTIME_SHELL_IMPLEMENTED", "runtime-boundary",
      "v354 must not implement runtime shell."],
    [checks.noRuntimeShellInvoked, "RUNTIME_SHELL_INVOKED", "runtime-boundary",
      "v354 must not invoke runtime shell."],
    [checks.noManagedAuditHttpTcp, "MANAGED_AUDIT_HTTP_TCP_OPEN", "runtime-boundary",
      "v354 must not open managed audit HTTP/TCP."],
    [checks.noUpstreamServiceStarted, "UPSTREAM_SERVICE_STARTED", "runtime-boundary",
      "v354 must not start Java or mini-kv."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_OPEN", "runtime-boundary",
      "v354 must not mutate Java or mini-kv."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(ready: boolean): SandboxHandleReviewPrerequisiteIntakeMessage[] {
  return [{
    code: "SANDBOX_HANDLE_REVIEW_STILL_CONTRACT_ONLY",
    severity: "warning",
    source: "next-step",
    message: ready
      ? "v354 defines only non-secret prerequisite inputs; it does not approve a real managed audit connection."
      : "The prerequisite intake remains blocked until Node v353 evidence is complete.",
  }];
}

function collectRecommendations(ready: boolean): SandboxHandleReviewPrerequisiteIntakeMessage[] {
  return [ready
    ? {
      code: "PROCEED_TO_NODE_V355_ARCHIVE_VERIFICATION",
      severity: "recommendation",
      source: "next-step",
      message: "Proceed to Node v355 as archive verification before adding any new handle review behavior.",
    }
    : {
      code: "FIX_NODE_V353_BEFORE_V355",
      severity: "recommendation",
      source: "next-step",
      message: "Fix Node v353 source evidence before any v355 follow-up.",
    }];
}

function createSummary(
  source: SourceNodeV353ManagedAuditDisabledDecisionRecordReference,
  inputs: readonly SandboxHandleReviewPrerequisiteInput[],
  closedScopes: readonly SandboxHandleReviewClosedScope[],
  checks: SandboxHandleReviewPrerequisiteIntakeChecks,
  productionBlockers: readonly SandboxHandleReviewPrerequisiteIntakeMessage[],
  warnings: readonly SandboxHandleReviewPrerequisiteIntakeMessage[],
  recommendations: readonly SandboxHandleReviewPrerequisiteIntakeMessage[],
): SandboxHandleReviewPrerequisiteIntakeSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    prerequisiteInputCount: inputs.length,
    closedScopeCount: closedScopes.length,
    sourceCheckCount: source.checkCount,
    sourcePassedCheckCount: source.passedCheckCount,
    sourceInputCount: source.inputCount,
    sourceProductionBlockerCount: source.productionBlockerCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
