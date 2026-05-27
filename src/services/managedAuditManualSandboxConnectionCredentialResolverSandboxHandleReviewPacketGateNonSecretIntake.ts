import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerificationTypes.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeProfile,
  SandboxHandleReviewGateOutput,
  SandboxHandleReviewPacketGateIntakeChecks,
  SandboxHandleReviewPacketGateIntakeMessage,
  SandboxHandleReviewPacketGateIntakeRecord,
  SandboxHandleReviewPacketGateIntakeSummary,
  SandboxHandleReviewPacketGateNecessityProof,
  SandboxHandleReviewPacketInput,
  SandboxHandleReviewStopCondition,
  SourceNodeV357SandboxHandleReviewContractArchiveReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-non-secret-intake.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-non-secret-intake";
const SOURCE_NODE_V357_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-contract-decision-archive-verification";
const ACTIVE_PLAN =
  "docs/plans2/v357-post-sandbox-handle-review-contract-decision-archive-verification-roadmap.md";
const NEXT_PLAN =
  "docs/plans2/v358-post-sandbox-handle-review-packet-gate-non-secret-intake-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntake(
  input: { config: AppConfig; sourceArchiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeProfile {
  const sourceProfile =
    loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification({
      config: input.config,
      archiveRoot: input.sourceArchiveRoot,
    });
  const sourceNodeV357 = createSourceNodeV357(sourceProfile);
  const necessityProof = createNecessityProof();
  const packetInputs = createPacketInputs();
  const gateOutputs = createGateOutputs();
  const stopConditions = createStopConditions();
  const draftIntakeRecord = createIntakeRecord(sourceNodeV357, packetInputs, gateOutputs, stopConditions, false);
  const checks = createChecks(sourceNodeV357, necessityProof, packetInputs, gateOutputs, stopConditions,
    draftIntakeRecord);
  checks.readyForSandboxHandleReviewPacketGateNonSecretIntake = Object.entries(checks)
    .filter(([key]) => key !== "readyForSandboxHandleReviewPacketGateNonSecretIntake")
    .every(([, value]) => value);
  const ready = checks.readyForSandboxHandleReviewPacketGateNonSecretIntake;
  const intakeRecord = createIntakeRecord(sourceNodeV357, packetInputs, gateOutputs, stopConditions, ready);
  checks.intakeDigestStable = isDigest(intakeRecord.intakeDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(ready);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV357, packetInputs, gateOutputs, stopConditions, checks,
    productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver sandbox handle review packet/gate non-secret intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    intakeState: ready ? "sandbox-handle-review-packet-gate-non-secret-intake-ready" : "blocked",
    intakeDecision: intakeRecord.intakeDecision,
    readyForSandboxHandleReviewPacketGateNonSecretIntake: ready,
    readyForNodeV359SandboxHandleReviewPacketGateIntakeArchiveVerification: ready,
    consumesNodeV357SandboxHandleReviewContractDecisionArchiveVerification: true,
    activeNodeVersion: "Node v358",
    sourceNodeVersion: "Node v357",
    packetGateIntakeOnly: true,
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
    sourceNodeV357,
    necessityProof,
    packetInputs,
    gateOutputs,
    stopConditions,
    intakeRecord,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      sandboxHandleReviewPacketGateNonSecretIntakeJson: ROUTE_PATH,
      sandboxHandleReviewPacketGateNonSecretIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV357Json: SOURCE_NODE_V357_ROUTE,
      sourceNodeV357Markdown: `${SOURCE_NODE_V357_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v359",
    },
    nextActions: ready
      ? [
        "Archive Node v358 before adding any executable sandbox handle review behavior.",
        "Keep packet/gate inputs opaque and non-secret; do not read credential values or parse raw endpoint URLs.",
        "Pause if a later version needs provider/client instantiation, runtime shell, managed audit HTTP/TCP, or upstream write/admin scope.",
      ]
      : [
        "Fix Node v357 archive verification before defining a packet/gate intake.",
        "Do not request Java or mini-kv updates from a blocked Node v357 archive alone.",
      ],
  };
}

function createSourceNodeV357(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerificationProfile,
): SourceNodeV357SandboxHandleReviewContractArchiveReference {
  return {
    sourceVersion: "Node v357",
    profileVersion: profile.profileVersion,
    archiveVerificationState: profile.archiveVerificationState,
    archiveVerificationDecision: profile.archiveVerificationDecision,
    readyForArchiveVerification: profile.readyForSandboxHandleReviewContractDecisionArchiveVerification,
    readyForNodeV358PacketGateIntake: profile.readyForNodeV358SandboxHandleReviewPacketOrGateIntake,
    archiveVerificationDigest: profile.archiveVerification.archiveVerificationDigest,
    sourceDecisionDigest: profile.archiveVerification.sourceDecisionDigest,
    archiveFileCount: profile.summary.archiveFileCount,
    presentArchiveFileCount: profile.summary.presentArchiveFileCount,
    contractInputCount: profile.summary.contractInputCount,
    contractSectionCount: profile.summary.contractSectionCount,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
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
  };
}

function createNecessityProof(): SandboxHandleReviewPacketGateNecessityProof {
  return {
    blockerResolved: "sandbox-handle-review-needs-packet-gate-intake-after-contract-archive-verification",
    consumedBy:
      "Node v359 sandbox handle review packet/gate intake archive verification or later non-secret review gate",
    cannotReuseExistingReportBecause:
      "Node v356 defines the contract and Node v357 verifies its archive, but neither declares the packet inputs, gate outputs, and fail-closed stop conditions a later review gate can consume.",
    growthStopCondition:
      "Stop when the chain requests credential value, raw endpoint URL, provider/client instantiation, runtime shell, managed audit HTTP/TCP, or upstream write/admin scope.",
  };
}

function createPacketInputs(): SandboxHandleReviewPacketInput[] {
  return [
    packetInput("sandbox-handle-reference", "Sandbox credential handle reference", "handle-reference",
      "sandbox-handle-reference", "opaque handle id or alias must be present and must not contain credential material"),
    packetInput("allowlist-review-status", "Endpoint allowlist review status", "review-status",
      "allowlist-review-status", "review status must be present as an enum, not as a raw endpoint URL"),
    packetInput("credential-handle-binding-status", "Credential handle binding status", "binding-status",
      "credential-handle-binding-status", "binding state must describe approval posture without disclosing secret values"),
    packetInput("operator-approval-correlation", "Operator approval correlation", "operator-context",
      "operator-approval-correlation", "operator id and approval correlation id must be auditable non-secret references"),
    packetInput("source-archive-verification-digest", "Source archive verification digest", "source-evidence",
      "source-decision-digest", "Node v357 archive verification digest must be carried forward as immutable source evidence"),
    packetInput("review-request-purpose", "Review request purpose", "request-purpose",
      "operator-approval-correlation", "human-readable purpose must explain the review without embedding credentials or URLs"),
  ];
}

function packetInput(
  id: string,
  label: string,
  category: SandboxHandleReviewPacketInput["category"],
  sourceContractInputId: string,
  packetRequirement: string,
): SandboxHandleReviewPacketInput {
  return {
    id,
    label,
    category,
    sourceContractInputId,
    packetRequirement,
    containsSecretValue: false,
    containsRawEndpointUrl: false,
    allowsNetworkConnection: false,
    allowsRuntimeInvocation: false,
    status: "packet-required",
  };
}

function createGateOutputs(): SandboxHandleReviewGateOutput[] {
  return [
    gateOutput("packet-accepted-for-human-review", "Packet accepted for human review",
      "All non-secret packet inputs are present and boundary checks remain closed."),
    gateOutput("packet-rejected-missing-non-secret-input", "Packet rejected for missing non-secret input",
      "Any missing required packet input blocks the gate without reading credentials or endpoints."),
    gateOutput("packet-rejected-boundary-violation", "Packet rejected for boundary violation",
      "Any credential value, raw endpoint URL, provider/client, runtime shell, network, or write scope request fails closed."),
    gateOutput("packet-held-for-explicit-approval", "Packet held for explicit approval",
      "A valid packet can be held for human approval correlation without opening execution."),
    gateOutput("packet-archive-required", "Packet archive required",
      "The next version must archive the packet/gate intake before adding executable behavior."),
  ];
}

function gateOutput(id: string, title: string, decisionRule: string): SandboxHandleReviewGateOutput {
  return {
    id,
    title,
    decisionRule,
    emitsSecretValue: false,
    emitsRawEndpointUrl: false,
    opensManagedAuditConnection: false,
    invokesRuntimeShell: false,
    mutatesUpstreamState: false,
    status: "gate-output-defined",
  };
}

function createStopConditions(): SandboxHandleReviewStopCondition[] {
  return [
    stopCondition("credential-value-requested", "A packet asks for or includes credential material."),
    stopCondition("raw-endpoint-url-present", "A packet asks for or includes a raw endpoint URL."),
    stopCondition("provider-client-required", "A packet requires secret provider or resolver client instantiation."),
    stopCondition("runtime-shell-required", "A packet requires runtime shell implementation or invocation."),
    stopCondition("managed-audit-connection-required", "A packet requires managed audit HTTP/TCP."),
    stopCondition("upstream-write-required", "A packet requires Java write, SQL, deployment, rollback, or mini-kv write/admin scope."),
    stopCondition("missing-archive-verification", "Node v357 archive verification is missing or blocked."),
  ];
}

function stopCondition(id: string, trigger: string): SandboxHandleReviewStopCondition {
  return {
    id,
    trigger,
    effect: "fail-closed",
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    managedAuditHttpTcpAllowed: false,
    runtimeShellInvocationAllowed: false,
    upstreamMutationAllowed: false,
  };
}

function createIntakeRecord(
  source: SourceNodeV357SandboxHandleReviewContractArchiveReference,
  packetInputs: readonly SandboxHandleReviewPacketInput[],
  gateOutputs: readonly SandboxHandleReviewGateOutput[],
  stopConditions: readonly SandboxHandleReviewStopCondition[],
  ready: boolean,
): SandboxHandleReviewPacketGateIntakeRecord {
  const recordWithoutDigest = {
    intakeMode: "sandbox-handle-review-packet-gate-non-secret-intake" as const,
    sourceSpan: "Node v357 sandbox handle review contract decision archive verification" as const,
    sourceArchiveVerificationDigest: source.archiveVerificationDigest,
    intakeDecision: ready ? "define-non-secret-sandbox-handle-review-packet-gate" as const : "blocked" as const,
    packetInputCount: packetInputs.length,
    gateOutputCount: gateOutputs.length,
    stopConditionCount: stopConditions.length,
    permitsOnlyNonSecretPacket: true as const,
    requestsCredentialValue: false as const,
    requestsRawEndpointUrl: false as const,
    instantiatesProviderClient: false as const,
    implementsRuntimeShell: false as const,
    invokesRuntimeShell: false as const,
    opensManagedAuditConnection: false as const,
    startsUpstreamServices: false as const,
    writesUpstreamState: false as const,
    requestsJavaMiniKvEcho: false as const,
    nextNodeVersionSuggested: "Node v359" as const,
  };
  return {
    intakeDigest: sha256StableJson(recordWithoutDigest),
    ...recordWithoutDigest,
  };
}

function createChecks(
  source: SourceNodeV357SandboxHandleReviewContractArchiveReference,
  proof: SandboxHandleReviewPacketGateNecessityProof,
  packetInputs: readonly SandboxHandleReviewPacketInput[],
  gateOutputs: readonly SandboxHandleReviewGateOutput[],
  stopConditions: readonly SandboxHandleReviewStopCondition[],
  record: SandboxHandleReviewPacketGateIntakeRecord,
): SandboxHandleReviewPacketGateIntakeChecks {
  return {
    sourceNodeV357Ready:
      source.readyForArchiveVerification
      && source.archiveVerificationState === "sandbox-handle-review-contract-decision-archive-verified",
    sourceArchiveVerificationAllowsPacketGateIntake: source.readyForNodeV358PacketGateIntake,
    sourceArchiveFilesComplete: source.archiveFileCount === 11 && source.presentArchiveFileCount === 11,
    sourceChecksAllPassed: source.checkCount === 30 && source.passedCheckCount === 30
      && source.productionBlockerCount === 0,
    necessityProofPresent:
      proof.blockerResolved.length > 0
      && proof.consumedBy.includes("Node v359")
      && proof.cannotReuseExistingReportBecause.includes("packet inputs")
      && proof.growthStopCondition.includes("credential value"),
    packetInputsComplete: packetInputs.length === 6,
    gateOutputsComplete: gateOutputs.length === 5,
    stopConditionsComplete: stopConditions.length === 7,
    packetInputsNonSecret: packetInputs.every((input) =>
      !input.containsSecretValue && !input.containsRawEndpointUrl
      && !input.allowsNetworkConnection && !input.allowsRuntimeInvocation),
    gateOutputsNonSecret: gateOutputs.every((output) =>
      !output.emitsSecretValue && !output.emitsRawEndpointUrl
      && !output.opensManagedAuditConnection && !output.invokesRuntimeShell && !output.mutatesUpstreamState),
    stopConditionsClosed: stopConditions.every((condition) =>
      condition.effect === "fail-closed"
      && !condition.credentialValueRead
      && !condition.rawEndpointUrlParsed
      && !condition.managedAuditHttpTcpAllowed
      && !condition.runtimeShellInvocationAllowed
      && !condition.upstreamMutationAllowed),
    packetDoesNotRequestRawEndpoint: !record.requestsRawEndpointUrl,
    packetDoesNotAllowNetwork: !record.opensManagedAuditConnection,
    intakeDigestStable: isDigest(record.intakeDigest),
    intakeLimitedToNonSecretPacketGate:
      record.permitsOnlyNonSecretPacket
      && !record.requestsCredentialValue
      && !record.requestsRawEndpointUrl
      && !record.instantiatesProviderClient,
    noCredentialValueRequestedOrRead: !record.requestsCredentialValue,
    noRawEndpointRequestedOrParsed: !record.requestsRawEndpointUrl,
    noProviderClientInstantiated: !record.instantiatesProviderClient,
    noRuntimeShellImplemented: !record.implementsRuntimeShell,
    noRuntimeShellInvoked: !record.invokesRuntimeShell,
    noManagedAuditHttpTcp: !record.opensManagedAuditConnection,
    noUpstreamServiceStarted: !record.startsUpstreamServices,
    noUpstreamMutation: !record.writesUpstreamState,
    noJavaMiniKvEchoRequired: !record.requestsJavaMiniKvEcho,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForSandboxHandleReviewPacketGateNonSecretIntake: false,
  };
}

function collectProductionBlockers(
  checks: SandboxHandleReviewPacketGateIntakeChecks,
): SandboxHandleReviewPacketGateIntakeMessage[] {
  const rules: Array<[boolean, string, SandboxHandleReviewPacketGateIntakeMessage["source"], string]> = [
    [checks.sourceNodeV357Ready, "NODE_V357_NOT_READY", "node-v357",
      "Node v357 archive verification must be ready before v358 can define packet/gate intake."],
    [checks.sourceArchiveVerificationAllowsPacketGateIntake, "NODE_V357_DECISION_NOT_ALLOWED", "node-v357",
      "Node v357 must explicitly allow Node v358 packet/gate intake."],
    [checks.sourceArchiveFilesComplete, "SOURCE_ARCHIVE_FILES_INCOMPLETE", "node-v357",
      "Node v357 archive must include all 11 files."],
    [checks.sourceChecksAllPassed, "SOURCE_CHECKS_NOT_ALL_PASSED", "node-v357",
      "Node v357 must have 30/30 checks passed and zero production blockers."],
    [checks.necessityProofPresent, "NECESSITY_PROOF_MISSING", "necessity-proof",
      "v358 must explain why a new packet/gate intake is needed."],
    [checks.packetInputsComplete, "PACKET_INPUTS_INCOMPLETE", "packet-inputs",
      "v358 must define the six non-secret packet inputs."],
    [checks.gateOutputsComplete, "GATE_OUTPUTS_INCOMPLETE", "gate-outputs",
      "v358 must define the five gate outputs."],
    [checks.stopConditionsComplete, "STOP_CONDITIONS_INCOMPLETE", "stop-conditions",
      "v358 must define fail-closed stop conditions."],
    [checks.packetInputsNonSecret, "PACKET_INPUTS_NOT_NON_SECRET", "packet-inputs",
      "Packet inputs must not contain credential values, raw endpoint URLs, network, or runtime capability."],
    [checks.gateOutputsNonSecret, "GATE_OUTPUTS_OPEN_SECRET_OR_RUNTIME", "gate-outputs",
      "Gate outputs must not emit secrets, raw endpoints, network, runtime, or upstream mutation."],
    [checks.stopConditionsClosed, "STOP_CONDITIONS_NOT_CLOSED", "stop-conditions",
      "Stop conditions must fail closed without opening credential, endpoint, network, runtime, or write scope."],
    [checks.intakeDigestStable, "INTAKE_DIGEST_UNSTABLE", "intake-record",
      "v358 intake digest must be stable."],
    [checks.intakeLimitedToNonSecretPacketGate, "INTAKE_SCOPE_TOO_BROAD", "intake-record",
      "v358 intake must stay limited to non-secret packet/gate definition."],
    [checks.noManagedAuditHttpTcp, "MANAGED_AUDIT_HTTP_TCP_OPEN", "runtime-boundary",
      "Managed audit HTTP/TCP must remain closed."],
    [checks.noJavaMiniKvEchoRequired, "UNNEEDED_JAVA_MINI_KV_ECHO_REQUESTED", "next-step",
      "v358 must not request Java v153 + mini-kv v144."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(ready: boolean): SandboxHandleReviewPacketGateIntakeMessage[] {
  return [{
    code: "PACKET_GATE_INTAKE_IS_NON_EXECUTABLE",
    severity: "warning",
    source: "next-step",
    message: ready
      ? "v358 defines only a non-secret packet/gate intake; archive it before adding any executable review behavior."
      : "v358 remains blocked until the source archive and non-secret packet/gate boundaries are valid.",
  }];
}

function collectRecommendations(ready: boolean): SandboxHandleReviewPacketGateIntakeMessage[] {
  return [{
    code: ready ? "PROCEED_TO_NODE_V359_ARCHIVE_VERIFICATION" : "FIX_V358_INTAKE_BEFORE_ARCHIVE",
    severity: "recommendation",
    source: "next-step",
    message: ready
      ? "Proceed to Node v359 archive verification; keep credential values, raw endpoint URLs, provider/client, runtime shell, and managed audit HTTP/TCP closed."
      : "Keep the chain blocked until v358 can prove the packet/gate intake is non-secret and fail-closed.",
  }];
}

function createSummary(
  source: SourceNodeV357SandboxHandleReviewContractArchiveReference,
  packetInputs: readonly SandboxHandleReviewPacketInput[],
  gateOutputs: readonly SandboxHandleReviewGateOutput[],
  stopConditions: readonly SandboxHandleReviewStopCondition[],
  checks: SandboxHandleReviewPacketGateIntakeChecks,
  productionBlockers: readonly SandboxHandleReviewPacketGateIntakeMessage[],
  warnings: readonly SandboxHandleReviewPacketGateIntakeMessage[],
  recommendations: readonly SandboxHandleReviewPacketGateIntakeMessage[],
): SandboxHandleReviewPacketGateIntakeSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    packetInputCount: packetInputs.length,
    gateOutputCount: gateOutputs.length,
    stopConditionCount: stopConditions.length,
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
