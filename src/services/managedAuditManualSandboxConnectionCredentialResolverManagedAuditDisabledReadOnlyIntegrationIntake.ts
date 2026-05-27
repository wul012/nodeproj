import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationTypes.js";
import type {
  DisabledReadOnlyIntegrationClosedScope,
  DisabledReadOnlyIntegrationInput,
  DisabledReadOnlyIntegrationIntakeRecord,
  DisabledReadOnlyIntegrationNecessityProof,
  ManagedAuditDisabledReadOnlyIntegrationIntakeChecks,
  ManagedAuditDisabledReadOnlyIntegrationIntakeMessage,
  ManagedAuditDisabledReadOnlyIntegrationIntakeSummary,
  ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeProfile,
  SourceNodeV350PassedArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-intake.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-intake";
const SOURCE_NODE_V350_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-passed-archive-verification";
const ACTIVE_PLAN = "docs/plans2/v350-post-minimal-read-only-integration-passed-archive-verification-roadmap.md";
const NEXT_PLAN = "docs/plans2/v351-post-managed-audit-disabled-read-only-integration-intake-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntake(
  input: { config: AppConfig; sourceArchiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeProfile {
  const sourceProfile =
    loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification({
      config: input.config,
      archiveRoot: input.sourceArchiveRoot,
    });
  const sourceNodeV350 = createSourceNodeV350(sourceProfile);
  const necessityProof = createNecessityProof();
  const intakeInputs = createIntakeInputs();
  const closedScopes = createClosedScopes();
  const draftRecord = createIntakeRecord(sourceNodeV350, intakeInputs, closedScopes, false);
  const checks = createChecks(input.config, sourceNodeV350, necessityProof, intakeInputs, closedScopes, draftRecord);
  checks.readyForManagedAuditDisabledReadOnlyIntegrationIntake = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditDisabledReadOnlyIntegrationIntake")
    .every(([, value]) => value);
  const ready = checks.readyForManagedAuditDisabledReadOnlyIntegrationIntake;
  const intakeRecord = createIntakeRecord(sourceNodeV350, intakeInputs, closedScopes, ready);
  checks.intakeDigestStable = isDigest(intakeRecord.intakeDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV350, intakeInputs, closedScopes, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver managed-audit-disabled read-only integration intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    intakeState: ready ? "managed-audit-disabled-read-only-integration-intake-ready" : "blocked",
    intakeDecision: ready ? "define-managed-audit-disabled-read-only-integration-stage" : "blocked",
    readyForManagedAuditDisabledReadOnlyIntegrationIntake: ready,
    consumesNodeV350PassedArchiveVerification: true,
    activeNodeVersion: "Node v351",
    sourceNodeVersion: "Node v350",
    managedAuditDisabled: true,
    readOnlyIntegrationOnly: true,
    intakeOnly: true,
    rerunsLiveProbe: false,
    startsJavaService: false,
    startsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    sendsManagedAuditHttpTcp: false,
    readsManagedAuditCredential: false,
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
    sourceNodeV350,
    necessityProof,
    intakeInputs,
    closedScopes,
    intakeRecord,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      managedAuditDisabledReadOnlyIntegrationIntakeJson: ROUTE_PATH,
      managedAuditDisabledReadOnlyIntegrationIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV350Json: SOURCE_NODE_V350_ROUTE,
      sourceNodeV350Markdown: `${SOURCE_NODE_V350_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v352",
    },
    nextActions: ready
      ? [
        "Use Node v352 to verify this disabled read-only intake before adding another stage.",
        "Keep Java and mini-kv startup owned by their own project windows for future true live integration.",
        "Pause before any credential value, raw endpoint URL, provider/client, runtime shell, or write/admin scope is requested.",
      ]
      : [
        "Fix Node v350 transition evidence before defining the disabled read-only stage.",
        "Do not rerun Java/mini-kv probes or request Java/mini-kv changes from this intake failure alone.",
      ],
  };
}

function createSourceNodeV350(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationProfile,
): SourceNodeV350PassedArchiveVerificationReference {
  return {
    sourceVersion: "Node v350",
    profileVersion: profile.profileVersion,
    transitionState: profile.transitionState,
    transitionDecision: profile.transitionDecision,
    readyForPassedArchiveVerification: profile.readyForMinimalReadOnlyIntegrationPassedArchiveVerification,
    readyForNodeV351Intake: profile.readyForNodeV351ManagedAuditDisabledReadOnlyIntegrationIntake,
    transitionDigest: profile.transitionRecord.transitionDigest,
    attemptedTargetCount: profile.summary.attemptedTargetCount,
    passedTargetCount: profile.summary.passedTargetCount,
    unavailableTargetCount: profile.summary.unavailableTargetCount,
    invalidContractTargetCount: profile.summary.invalidContractTargetCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
    rerunsLiveProbe: profile.rerunsLiveProbe,
    startsJavaService: profile.startsJavaService,
    startsMiniKvService: profile.startsMiniKvService,
    mutatesJavaState: profile.mutatesJavaState,
    mutatesMiniKvState: profile.mutatesMiniKvState,
    connectsManagedAudit: profile.connectsManagedAudit,
    readsManagedAuditCredential: profile.readsManagedAuditCredential,
    rawEndpointUrlParsed: profile.rawEndpointUrlParsed,
    executionAllowed: profile.executionAllowed,
  };
}

function createNecessityProof(): DisabledReadOnlyIntegrationNecessityProof {
  return {
    blockerResolved: "passed-minimal-read-only-integration-needs-next-stage-boundary",
    consumedBy: "Node v352 archive verification or later managed-audit-disabled read-only stage",
    cannotReuseExistingReportBecause:
      "Node v350 only verifies the v349 passed archive; it does not define the managed-audit-disabled intake inputs and closed scopes that later stages must consume.",
    growthStopCondition:
      "Stop this chain when a later step asks for credential value, raw endpoint URL parsing, provider/client instantiation, runtime shell, or upstream write/admin scope.",
  };
}

function createIntakeInputs(): DisabledReadOnlyIntegrationInput[] {
  return [
    {
      id: "node-v350-transition",
      label: "Verified v349 all-read-passed evidence and v350 transition decision",
      source: "node-v350",
      requiredBeforeNextLiveWindow: true,
      status: "available",
      notes: "This is the only hard source consumed by v351.",
    },
    {
      id: "operator-owned-java-mini-kv-window",
      label: "Future Java and mini-kv startup remains operator/project-owned",
      source: "operator-window",
      requiredBeforeNextLiveWindow: true,
      status: "operator-owned",
      notes: "Node records the requirement but does not start or stop those services.",
    },
    {
      id: "managed-audit-disabled-stage",
      label: "Managed audit remains disabled while read-only integration shape is defined",
      source: "future-disabled-managed-audit-stage",
      requiredBeforeNextLiveWindow: false,
      status: "not-opened",
      notes: "No managed audit endpoint, credential provider, or resolver client is opened in v351.",
    },
  ];
}

function createClosedScopes(): DisabledReadOnlyIntegrationClosedScope[] {
  return [
    { id: "credential-value", status: "closed", reason: "Only credential handles/review status may be discussed." },
    { id: "raw-endpoint-url", status: "closed", reason: "Only endpoint handle or allowlist review status may be discussed." },
    { id: "secret-provider", status: "closed", reason: "Provider/client instantiation is not part of the disabled intake." },
    { id: "runtime-shell", status: "closed", reason: "Runtime shell remains unimplemented and invocation is disallowed." },
    { id: "java-writes", status: "closed", reason: "No Java ledger, SQL, deployment, rollback, or mutation action." },
    { id: "mini-kv-write-admin", status: "closed", reason: "No mini-kv LOAD, COMPACT, SETNXEX, RESTORE, write, or admin command." },
    { id: "managed-audit-http-tcp", status: "closed", reason: "No real managed audit HTTP/TCP request is sent." },
  ];
}

function createIntakeRecord(
  source: SourceNodeV350PassedArchiveVerificationReference,
  inputs: readonly DisabledReadOnlyIntegrationInput[],
  closedScopes: readonly DisabledReadOnlyIntegrationClosedScope[],
  ready: boolean,
): DisabledReadOnlyIntegrationIntakeRecord {
  const recordWithoutDigest = {
    intakeMode: "managed-audit-disabled-read-only-integration-intake" as const,
    sourceSpan: "Node v350 passed archive verification transition" as const,
    intakeDecision: ready ? "define-managed-audit-disabled-read-only-integration-stage" as const : "blocked" as const,
    managedAuditDisabled: true as const,
    readOnlyIntegrationOnly: true as const,
    nextNodeVersionSuggested: "Node v352" as const,
    sourceTransitionDigest: source.transitionDigest,
    inputCount: inputs.length,
    closedScopeCount: closedScopes.length,
    sourceSummary: {
      transitionState: source.transitionState,
      transitionDecision: source.transitionDecision,
      passedTargetCount: source.passedTargetCount,
      attemptedTargetCount: source.attemptedTargetCount,
    },
  };

  return {
    intakeDigest: sha256StableJson(recordWithoutDigest),
    ...recordWithoutDigest,
  };
}

function createChecks(
  config: AppConfig,
  source: SourceNodeV350PassedArchiveVerificationReference,
  proof: DisabledReadOnlyIntegrationNecessityProof,
  inputs: readonly DisabledReadOnlyIntegrationInput[],
  closedScopes: readonly DisabledReadOnlyIntegrationClosedScope[],
  record: DisabledReadOnlyIntegrationIntakeRecord,
): ManagedAuditDisabledReadOnlyIntegrationIntakeChecks {
  return {
    sourceNodeV350Ready:
      source.transitionState === "minimal-read-only-integration-passed-archive-verified"
      && source.readyForPassedArchiveVerification
      && source.readyForNodeV351Intake
      && isDigest(source.transitionDigest),
    sourceTransitionAllowsIntake:
      source.transitionDecision === "advance-to-managed-audit-disabled-read-only-integration-intake",
    sourceV349AllReadTargetsPassed:
      source.attemptedTargetCount === 5
      && source.passedTargetCount === 5
      && source.unavailableTargetCount === 0
      && source.invalidContractTargetCount === 0
      && source.productionBlockerCount === 0,
    necessityProofPresent:
      proof.blockerResolved.length > 0
      && proof.consumedBy.length > 0
      && proof.cannotReuseExistingReportBecause.length > 0
      && proof.growthStopCondition.length > 0,
    intakeInputsComplete:
      inputs.length === 3
      && inputs.every((input) => input.id.length > 0 && input.label.length > 0 && input.notes.length > 0),
    closedScopesComplete:
      closedScopes.length >= 7 && closedScopes.every((scope) => scope.status === "closed" && scope.reason.length > 0),
    managedAuditStillDisabled: true,
    credentialValueStillClosed: !source.readsManagedAuditCredential,
    rawEndpointUrlStillClosed: !source.rawEndpointUrlParsed,
    providerClientNotInstantiated: true,
    runtimeShellStillNotImplemented: true,
    noUpstreamServiceStarted: !source.startsJavaService && !source.startsMiniKvService,
    noJavaMutation: !source.mutatesJavaState,
    noMiniKvMutation: !source.mutatesMiniKvState,
    noManagedAuditHttpTcp: !source.connectsManagedAudit && !config.upstreamActionsEnabled,
    noJavaMiniKvEchoRequired: true,
    intakeDigestStable: isDigest(record.intakeDigest),
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditDisabledReadOnlyIntegrationIntake: false,
  };
}

function collectProductionBlockers(
  checks: ManagedAuditDisabledReadOnlyIntegrationIntakeChecks,
): ManagedAuditDisabledReadOnlyIntegrationIntakeMessage[] {
  const rules: Array<[boolean, string, ManagedAuditDisabledReadOnlyIntegrationIntakeMessage["source"], string]> = [
    [checks.sourceNodeV350Ready, "NODE_V350_NOT_READY", "node-v350",
      "Node v350 passed archive verification must be ready before v351 intake."],
    [checks.sourceTransitionAllowsIntake, "NODE_V350_TRANSITION_NOT_ALLOWED", "node-v350",
      "Node v350 must explicitly allow the managed-audit-disabled read-only intake."],
    [checks.sourceV349AllReadTargetsPassed, "SOURCE_READ_TARGETS_NOT_ALL_PASSED", "node-v350",
      "Source v349/v350 evidence must show five of five read-only targets passed."],
    [checks.necessityProofPresent, "NECESSITY_PROOF_MISSING", "necessity-proof",
      "v351 must explain why this intake exists and when the chain stops."],
    [checks.intakeInputsComplete, "INTAKE_INPUTS_INCOMPLETE", "intake-inputs",
      "v351 intake inputs must be complete."],
    [checks.closedScopesComplete, "CLOSED_SCOPES_INCOMPLETE", "closed-scopes",
      "v351 closed scopes must list credential, endpoint, provider/client, runtime, Java, mini-kv, and managed audit boundaries."],
    [checks.noUpstreamServiceStarted, "UPSTREAM_SERVICE_STARTED", "runtime-boundary",
      "v351 must not start Java or mini-kv."],
    [checks.noManagedAuditHttpTcp, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary",
      "v351 must not send managed audit HTTP/TCP or enable upstream actions."],
    [checks.intakeDigestStable, "INTAKE_DIGEST_UNSTABLE", "next-step",
      "v351 intake digest must be stable."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(): ManagedAuditDisabledReadOnlyIntegrationIntakeMessage[] {
  return [{
    code: "MANAGED_AUDIT_REMAINS_DISABLED",
    severity: "warning",
    source: "runtime-boundary",
    message: "v351 defines the next read-only stage while managed audit remains disabled.",
  }];
}

function collectRecommendations(ready: boolean): ManagedAuditDisabledReadOnlyIntegrationIntakeMessage[] {
  return [{
    code: ready ? "VERIFY_V351_INTAKE_IN_NODE_V352" : "FIX_V350_BEFORE_V351",
    severity: "recommendation",
    source: "next-step",
    message: ready
      ? "Use Node v352 to verify this intake before any new live integration or managed audit capability."
      : "Fix the source transition or intake boundary before proceeding.",
  }];
}

function createSummary(
  source: SourceNodeV350PassedArchiveVerificationReference,
  inputs: readonly DisabledReadOnlyIntegrationInput[],
  closedScopes: readonly DisabledReadOnlyIntegrationClosedScope[],
  checks: ManagedAuditDisabledReadOnlyIntegrationIntakeChecks,
  productionBlockers: readonly ManagedAuditDisabledReadOnlyIntegrationIntakeMessage[],
  warnings: readonly ManagedAuditDisabledReadOnlyIntegrationIntakeMessage[],
  recommendations: readonly ManagedAuditDisabledReadOnlyIntegrationIntakeMessage[],
): ManagedAuditDisabledReadOnlyIntegrationIntakeSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    inputCount: inputs.length,
    closedScopeCount: closedScopes.length,
    attemptedTargetCount: source.attemptedTargetCount,
    passedTargetCount: source.passedTargetCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
