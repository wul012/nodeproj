import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerificationTypes.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordProfile,
  SandboxHandleReviewPacketGateDecisionInput,
  SandboxHandleReviewPacketGateDecisionNecessityProof,
  SandboxHandleReviewPacketGateDecisionRecord,
  SandboxHandleReviewPacketGateDecisionRecordChecks,
  SandboxHandleReviewPacketGateDecisionRecordMessage,
  SandboxHandleReviewPacketGateDecisionRecordSummary,
  SourceNodeV359SandboxHandleReviewPacketGateArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-decision-record.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-decision-record";
const SOURCE_NODE_V359_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-non-secret-intake-archive-verification";
const ACTIVE_PLAN =
  "docs/plans2/v359-post-sandbox-handle-review-packet-gate-non-secret-intake-archive-verification-roadmap.md";
const NEXT_PLAN =
  "docs/plans2/v360-post-sandbox-handle-review-packet-gate-decision-record-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecord(
  input: { config: AppConfig; sourceArchiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordProfile {
  const sourceProfile =
    loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification({
      config: input.config,
      archiveRoot: input.sourceArchiveRoot,
    });
  const sourceNodeV359 = createSourceNodeV359(sourceProfile);
  const necessityProof = createNecessityProof();
  const decisionInputs = createDecisionInputs();
  const draftDecisionRecord = createDecisionRecord(sourceNodeV359, decisionInputs, false);
  const checks = createChecks(input.config, sourceNodeV359, necessityProof, decisionInputs, draftDecisionRecord);
  checks.readyForSandboxHandleReviewPacketGateDecisionRecord = Object.entries(checks)
    .filter(([key]) => key !== "readyForSandboxHandleReviewPacketGateDecisionRecord")
    .every(([, value]) => value);
  const ready = checks.readyForSandboxHandleReviewPacketGateDecisionRecord;
  const decisionRecord = createDecisionRecord(sourceNodeV359, decisionInputs, ready);
  checks.decisionDigestStable = isDigest(decisionRecord.decisionDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(ready);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV359, decisionInputs, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver sandbox handle review packet/gate decision record",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    decisionState: ready ? "sandbox-handle-review-packet-gate-decision-record-ready" : "blocked",
    decision: decisionRecord.decision,
    readyForSandboxHandleReviewPacketGateDecisionRecord: ready,
    readyForNodeV361SandboxHandleReviewPacketGateDecisionRecordArchiveVerification: ready,
    consumesNodeV359SandboxHandleReviewPacketGateIntakeArchiveVerification: true,
    activeNodeVersion: "Node v360",
    sourceNodeVersion: "Node v359",
    decisionRecordOnly: true,
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
    sourceNodeV359,
    necessityProof,
    decisionInputs,
    decisionRecord,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      sandboxHandleReviewPacketGateDecisionRecordJson: ROUTE_PATH,
      sandboxHandleReviewPacketGateDecisionRecordMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV359Json: SOURCE_NODE_V359_ROUTE,
      sourceNodeV359Markdown: `${SOURCE_NODE_V359_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v361",
    },
    nextActions: ready
      ? [
        "Use Node v361 to archive this decision record before any follow-up prerequisite closure.",
        "Keep credential value, raw endpoint URL, provider/client, runtime shell, managed audit HTTP/TCP, Java writes, and mini-kv write/admin scopes closed.",
        "Pause if the next step asks for real credential material, raw endpoint URL, provider/client, or executable managed audit connection code.",
      ]
      : [
        "Fix Node v359 archive verification before recording the v360 decision.",
        "Do not request Java or mini-kv changes from this decision failure alone.",
      ],
  };
}

function createSourceNodeV359(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerificationProfile,
): SourceNodeV359SandboxHandleReviewPacketGateArchiveVerificationReference {
  return {
    sourceVersion: "Node v359",
    profileVersion: profile.profileVersion,
    archiveVerificationState: profile.archiveVerificationState,
    archiveVerificationDecision: profile.archiveVerificationDecision,
    readyForArchiveVerification:
      profile.readyForSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification,
    readyForNodeV360DecisionRecord: profile.readyForNodeV360SandboxHandleReviewPacketGateDecisionRecord,
    archiveVerificationDigest: profile.archiveVerification.archiveVerificationDigest,
    sourceIntakeDigest: profile.archiveVerification.sourceIntakeDigest,
    archiveFileCount: profile.summary.archiveFileCount,
    presentArchiveFileCount: profile.summary.presentArchiveFileCount,
    packetInputCount: profile.summary.packetInputCount,
    gateOutputCount: profile.summary.gateOutputCount,
    stopConditionCount: profile.summary.stopConditionCount,
    sourceArchiveFileCount: profile.summary.sourceArchiveFileCount,
    sourcePresentArchiveFileCount: profile.summary.sourcePresentArchiveFileCount,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
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

function createNecessityProof(): SandboxHandleReviewPacketGateDecisionNecessityProof {
  return {
    blockerResolved: "verified-packet-gate-intake-archive-needs-explicit-next-stage-decision",
    consumedBy:
      "Node v361 sandbox handle review packet/gate decision record archive verification or later prerequisite closure review",
    cannotReuseExistingReportBecause:
      "Node v358 defines the non-secret packet/gate intake and Node v359 verifies its archive, but neither records whether the next safe step is a decision record, prerequisite closure review, or a blocked pause.",
    growthStopCondition:
      "Stop when the chain requests credential value, raw endpoint URL, provider/client instantiation, runtime shell, managed audit HTTP/TCP, or upstream write/admin scope.",
  };
}

function createDecisionInputs(): SandboxHandleReviewPacketGateDecisionInput[] {
  return [
    decisionInput("node-v359-archive-verification", "Verified v358 packet/gate intake archive", "node-v359",
      true, "available", "v359 proves v358 route, Markdown, digest, screenshot, explanation, walkthrough, and plan indexes are complete."),
    decisionInput("packet-gate-shape", "Packet/gate shape remains complete", "packet-gate-contract",
      true, "available", "The source archive records 6 packet inputs, 5 gate outputs, and 7 fail-closed stop conditions."),
    decisionInput("secret-and-endpoint-material", "Credential values and raw endpoint URLs remain closed",
      "boundary-policy", true, "closed", "v360 can record a decision, but it cannot request secrets or raw endpoint material."),
    decisionInput("human-review-authority", "Human review decision remains non-executable", "human-review-policy",
      true, "not-requested", "No real approval artifact, provider/client, runtime shell, or managed audit connection is requested."),
    decisionInput("future-prerequisite-closure", "Future prerequisite closure may be reviewed", "future-stage",
      false, "not-requested", "A later version may review prerequisite closure only after this decision record is archived."),
  ];
}

function decisionInput(
  id: string,
  label: string,
  source: SandboxHandleReviewPacketGateDecisionInput["source"],
  requiredForDecision: boolean,
  status: SandboxHandleReviewPacketGateDecisionInput["status"],
  notes: string,
): SandboxHandleReviewPacketGateDecisionInput {
  return { id, label, source, requiredForDecision, status, notes };
}

function createDecisionRecord(
  source: SourceNodeV359SandboxHandleReviewPacketGateArchiveVerificationReference,
  inputs: readonly SandboxHandleReviewPacketGateDecisionInput[],
  ready: boolean,
): SandboxHandleReviewPacketGateDecisionRecord {
  const recordWithoutDigest = {
    decisionMode: "sandbox-handle-review-packet-gate-decision-record" as const,
    sourceSpan: "Node v359 sandbox handle review packet/gate non-secret intake archive verification" as const,
    sourceArchiveVerificationDigest: source.archiveVerificationDigest,
    sourceIntakeDigest: source.sourceIntakeDigest,
    decision: ready
      ? "advance-to-sandbox-handle-review-prerequisite-closure-review" as const
      : "blocked" as const,
    decisionReason: ready
      ? "v359 archive verification is complete, so the next safe step is to archive this decision before any prerequisite closure review."
      : "v359 archive verification is not ready, so the decision remains blocked.",
    allowsSandboxHandleReviewPrerequisiteClosure: ready,
    allowsHumanReviewDecisionOnly: ready,
    requestsCredentialValue: false as const,
    requestsRawEndpointUrl: false as const,
    instantiatesProviderClient: false as const,
    implementsRuntimeShell: false as const,
    invokesRuntimeShell: false as const,
    opensManagedAuditConnection: false as const,
    startsUpstreamServices: false as const,
    writesUpstreamState: false as const,
    requestsJavaMiniKvEcho: false as const,
    nextNodeVersionSuggested: "Node v361" as const,
    inputCount: inputs.length,
  };
  return {
    decisionDigest: sha256StableJson(recordWithoutDigest),
    ...recordWithoutDigest,
  };
}

function createChecks(
  config: AppConfig,
  source: SourceNodeV359SandboxHandleReviewPacketGateArchiveVerificationReference,
  proof: SandboxHandleReviewPacketGateDecisionNecessityProof,
  inputs: readonly SandboxHandleReviewPacketGateDecisionInput[],
  decision: SandboxHandleReviewPacketGateDecisionRecord,
): SandboxHandleReviewPacketGateDecisionRecordChecks {
  return {
    sourceNodeV359Ready:
      source.archiveVerificationState === "sandbox-handle-review-packet-gate-non-secret-intake-archive-verified"
      && source.readyForArchiveVerification
      && source.readyForNodeV360DecisionRecord
      && isDigest(source.archiveVerificationDigest)
      && isDigest(source.sourceIntakeDigest),
    sourceArchiveVerificationAllowsDecision:
      source.archiveVerificationDecision === "archive-sandbox-handle-review-packet-gate-non-secret-intake",
    sourceArchiveFilesComplete: source.archiveFileCount === 11 && source.presentArchiveFileCount === 11,
    sourceChecksAllPassed:
      source.checkCount === 34 && source.passedCheckCount === 34 && source.productionBlockerCount === 0,
    sourcePacketGateShapeComplete:
      source.packetInputCount === 6 && source.gateOutputCount === 5 && source.stopConditionCount === 7
      && source.sourceArchiveFileCount === 11 && source.sourcePresentArchiveFileCount === 11,
    necessityProofPresent:
      proof.blockerResolved.length > 0
      && proof.consumedBy.includes("Node v361")
      && proof.cannotReuseExistingReportBecause.includes("decision record")
      && proof.growthStopCondition.includes("credential value"),
    decisionInputsComplete:
      inputs.length === 5 && inputs.every((input) => input.id.length > 0 && input.notes.length > 0),
    decisionDigestStable: isDigest(decision.decisionDigest),
    decisionLimitedToPrerequisiteClosure:
      decision.decision === "blocked"
      || decision.decision === "advance-to-sandbox-handle-review-prerequisite-closure-review",
    noCredentialValueRequestedOrRead:
      !decision.requestsCredentialValue && !source.credentialValueRequested && !source.credentialValueRead,
    noRawEndpointRequestedOrParsed:
      !decision.requestsRawEndpointUrl && !source.rawEndpointUrlRequested && !source.rawEndpointUrlParsed,
    noProviderClientInstantiated:
      !decision.instantiatesProviderClient && !source.secretProviderInstantiated && !source.resolverClientInstantiated,
    noRuntimeShellImplementedOrInvoked:
      !decision.implementsRuntimeShell && !decision.invokesRuntimeShell
      && !source.runtimeShellImplemented && !source.runtimeShellInvocationAllowed,
    noManagedAuditHttpTcp:
      !decision.opensManagedAuditConnection && !source.connectsManagedAudit
      && !source.sendsManagedAuditHttpTcp && !config.upstreamActionsEnabled,
    noUpstreamServiceStarted:
      !decision.startsUpstreamServices && !source.startsJavaService && !source.startsMiniKvService,
    noUpstreamMutation: !decision.writesUpstreamState && !source.mutatesJavaState && !source.mutatesMiniKvState,
    noJavaMiniKvEchoRequired: !decision.requestsJavaMiniKvEcho,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForSandboxHandleReviewPacketGateDecisionRecord: false,
  };
}

function collectProductionBlockers(
  checks: SandboxHandleReviewPacketGateDecisionRecordChecks,
): SandboxHandleReviewPacketGateDecisionRecordMessage[] {
  const rules: Array<[boolean, string, SandboxHandleReviewPacketGateDecisionRecordMessage["source"], string]> = [
    [checks.sourceNodeV359Ready, "NODE_V359_NOT_READY", "node-v359",
      "Node v359 archive verification must be ready before v360 can record a decision."],
    [checks.sourceArchiveVerificationAllowsDecision, "NODE_V359_DECISION_NOT_ALLOWED", "node-v359",
      "Node v359 must explicitly archive the packet/gate non-secret intake."],
    [checks.sourceArchiveFilesComplete, "SOURCE_ARCHIVE_FILES_INCOMPLETE", "node-v359",
      "Node v359 must show 11/11 archive files present."],
    [checks.sourceChecksAllPassed, "SOURCE_CHECKS_NOT_ALL_PASSED", "node-v359",
      "Node v359 must show 34/34 checks and zero production blockers."],
    [checks.sourcePacketGateShapeComplete, "PACKET_GATE_SHAPE_INCOMPLETE", "node-v359",
      "Node v359 must preserve 6 packet inputs, 5 gate outputs, and 7 stop conditions from v358."],
    [checks.necessityProofPresent, "NECESSITY_PROOF_MISSING", "necessity-proof",
      "v360 must explain why this decision exists and when the chain stops."],
    [checks.decisionInputsComplete, "DECISION_INPUTS_INCOMPLETE", "decision-inputs",
      "v360 decision inputs must be complete."],
    [checks.decisionLimitedToPrerequisiteClosure, "DECISION_SCOPE_TOO_BROAD", "decision-record",
      "v360 may only choose prerequisite closure review or remain blocked."],
    [checks.noCredentialValueRequestedOrRead, "CREDENTIAL_VALUE_REQUESTED", "runtime-boundary",
      "v360 must not request or read credential values."],
    [checks.noRawEndpointRequestedOrParsed, "RAW_ENDPOINT_REQUESTED", "runtime-boundary",
      "v360 must not request or parse raw endpoint URLs."],
    [checks.noProviderClientInstantiated, "PROVIDER_OR_CLIENT_INSTANTIATED", "runtime-boundary",
      "v360 must not instantiate provider or resolver client."],
    [checks.noRuntimeShellImplementedOrInvoked, "RUNTIME_SHELL_OPENED", "runtime-boundary",
      "v360 must not implement or invoke runtime shell."],
    [checks.noManagedAuditHttpTcp, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary",
      "v360 must not open managed audit HTTP/TCP."],
    [checks.noUpstreamServiceStarted, "UPSTREAM_SERVICE_STARTED", "runtime-boundary",
      "v360 must not start Java or mini-kv."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_DETECTED", "runtime-boundary",
      "v360 must not mutate Java or mini-kv state."],
    [checks.noJavaMiniKvEchoRequired, "UNNEEDED_JAVA_MINI_KV_ECHO_REQUESTED", "next-step",
      "v360 must not request Java v153 + mini-kv v144."],
    [checks.decisionDigestStable, "DECISION_DIGEST_UNSTABLE", "decision-record",
      "v360 decision digest must be stable."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(ready: boolean): SandboxHandleReviewPacketGateDecisionRecordMessage[] {
  return [{
    code: "PACKET_GATE_DECISION_IS_NON_EXECUTABLE",
    severity: "warning",
    source: "next-step",
    message: ready
      ? "v360 records only a non-executable decision; archive it before any prerequisite closure review."
      : "The decision remains blocked until v359 archive verification is complete.",
  }];
}

function collectRecommendations(ready: boolean): SandboxHandleReviewPacketGateDecisionRecordMessage[] {
  return [{
    code: ready ? "PROCEED_TO_NODE_V361_ARCHIVE_VERIFICATION" : "FIX_V359_BEFORE_V361",
    severity: "recommendation",
    source: "next-step",
    message: ready
      ? "Proceed to Node v361 archive verification; do not open credential, endpoint, provider/client, runtime, managed audit connection, or write scopes."
      : "Fix Node v359 source evidence before any follow-up decision.",
  }];
}

function createSummary(
  source: SourceNodeV359SandboxHandleReviewPacketGateArchiveVerificationReference,
  inputs: readonly SandboxHandleReviewPacketGateDecisionInput[],
  checks: SandboxHandleReviewPacketGateDecisionRecordChecks,
  productionBlockers: readonly SandboxHandleReviewPacketGateDecisionRecordMessage[],
  warnings: readonly SandboxHandleReviewPacketGateDecisionRecordMessage[],
  recommendations: readonly SandboxHandleReviewPacketGateDecisionRecordMessage[],
): SandboxHandleReviewPacketGateDecisionRecordSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    inputCount: inputs.length,
    packetInputCount: source.packetInputCount,
    gateOutputCount: source.gateOutputCount,
    stopConditionCount: source.stopConditionCount,
    sourceArchiveFileCount: source.archiveFileCount,
    sourcePresentArchiveFileCount: source.presentArchiveFileCount,
    sourceCheckCount: source.checkCount,
    sourcePassedCheckCount: source.passedCheckCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
