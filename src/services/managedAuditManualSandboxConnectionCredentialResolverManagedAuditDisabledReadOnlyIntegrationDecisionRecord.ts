import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationTypes.js";
import type {
  ManagedAuditDisabledReadOnlyIntegrationDecisionInput,
  ManagedAuditDisabledReadOnlyIntegrationDecisionNecessityProof,
  ManagedAuditDisabledReadOnlyIntegrationDecisionRecord,
  ManagedAuditDisabledReadOnlyIntegrationDecisionRecordChecks,
  ManagedAuditDisabledReadOnlyIntegrationDecisionRecordMessage,
  ManagedAuditDisabledReadOnlyIntegrationDecisionRecordSummary,
  ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordProfile,
  SourceNodeV352ManagedAuditDisabledReadOnlyIntegrationArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-decision-record.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-decision-record";
const SOURCE_NODE_V352_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-intake-archive-verification";
const ACTIVE_PLAN =
  "docs/plans2/v352-post-managed-audit-disabled-read-only-integration-intake-archive-verification-roadmap.md";
const NEXT_PLAN =
  "docs/plans2/v353-post-managed-audit-disabled-read-only-integration-decision-record-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord(
  input: { config: AppConfig; sourceArchiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordProfile {
  const sourceProfile =
    loadManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification({
      config: input.config,
      archiveRoot: input.sourceArchiveRoot,
    });
  const sourceNodeV352 = createSourceNodeV352(sourceProfile);
  const necessityProof = createNecessityProof();
  const decisionInputs = createDecisionInputs();
  const draftDecisionRecord = createDecisionRecord(sourceNodeV352, decisionInputs, false);
  const checks = createChecks(input.config, sourceNodeV352, necessityProof, decisionInputs, draftDecisionRecord);
  checks.readyForManagedAuditDisabledReadOnlyIntegrationDecisionRecord = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditDisabledReadOnlyIntegrationDecisionRecord")
    .every(([, value]) => value);
  const ready = checks.readyForManagedAuditDisabledReadOnlyIntegrationDecisionRecord;
  const decisionRecord = createDecisionRecord(sourceNodeV352, decisionInputs, ready);
  checks.decisionDigestStable = isDigest(decisionRecord.decisionDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(ready);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV352, decisionInputs, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver managed-audit-disabled read-only integration decision record",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    decisionState: ready ? "managed-audit-disabled-read-only-integration-decision-record-ready" : "blocked",
    decision: decisionRecord.decision,
    readyForManagedAuditDisabledReadOnlyIntegrationDecisionRecord: ready,
    readyForNodeV354SandboxHandleReviewPrerequisiteIntake: ready,
    consumesNodeV352ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification: true,
    activeNodeVersion: "Node v353",
    sourceNodeVersion: "Node v352",
    decisionRecordOnly: true,
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
    sourceNodeV352,
    necessityProof,
    decisionInputs,
    decisionRecord,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      managedAuditDisabledReadOnlyIntegrationDecisionRecordJson: ROUTE_PATH,
      managedAuditDisabledReadOnlyIntegrationDecisionRecordMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV352Json: SOURCE_NODE_V352_ROUTE,
      sourceNodeV352Markdown: `${SOURCE_NODE_V352_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v354",
    },
    nextActions: ready
      ? [
        "Use Node v354 to define a sandbox handle review prerequisite intake, not to read credential values or raw endpoints.",
        "Keep provider/client instantiation, runtime shell, managed audit HTTP/TCP, Java writes, and mini-kv write/admin commands closed.",
        "Pause if the next step asks for real credential material, raw endpoint URL, production key, or executable connection code.",
      ]
      : [
        "Fix Node v352 archive verification before recording the v353 decision.",
        "Do not request Java or mini-kv changes from this decision failure alone.",
      ],
  };
}

function createSourceNodeV352(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationProfile,
): SourceNodeV352ManagedAuditDisabledReadOnlyIntegrationArchiveVerificationReference {
  return {
    sourceVersion: "Node v352",
    profileVersion: profile.profileVersion,
    archiveVerificationState: profile.archiveVerificationState,
    archiveVerificationDecision: profile.archiveVerificationDecision,
    readyForArchiveVerification: profile.readyForManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification,
    readyForNodeV353DecisionRecord: profile.readyForNodeV353ManagedAuditDisabledReadOnlyIntegrationDecisionRecord,
    archiveVerificationDigest: profile.archiveVerification.archiveVerificationDigest,
    archiveFileCount: profile.summary.archiveFileCount,
    presentArchiveFileCount: profile.summary.presentArchiveFileCount,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
    inputCount: profile.summary.inputCount,
    closedScopeCount: profile.summary.closedScopeCount,
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
    executionAllowed: profile.executionAllowed,
  };
}

function createNecessityProof(): ManagedAuditDisabledReadOnlyIntegrationDecisionNecessityProof {
  return {
    blockerResolved: "verified-disabled-intake-needs-explicit-next-stage-decision",
    consumedBy: "Node v354 sandbox handle review prerequisite intake or disabled checkpoint",
    cannotReuseExistingReportBecause:
      "Node v352 only verifies the v351 archive; it does not record whether the next step is a sandbox-handle prerequisite intake or a disabled checkpoint.",
    growthStopCondition:
      "Stop when the next step asks for credential value, raw endpoint URL, provider/client instantiation, runtime shell, managed audit HTTP/TCP, or upstream write/admin scope.",
  };
}

function createDecisionInputs(): ManagedAuditDisabledReadOnlyIntegrationDecisionInput[] {
  return [
    {
      id: "node-v352-archive-verification",
      label: "Verified managed-audit-disabled intake archive",
      source: "node-v352",
      requiredForDecision: true,
      status: "available",
      notes: "v352 proves v351 archive shape, checks, docs, and screenshots are complete.",
    },
    {
      id: "credential-and-endpoint-material",
      label: "Credential value and raw endpoint URL remain out of scope",
      source: "boundary-policy",
      requiredForDecision: true,
      status: "closed",
      notes: "v353 may choose a handle-review prerequisite intake, but cannot request real secret or raw endpoint material.",
    },
    {
      id: "operator-authorization",
      label: "Operator authorization for real managed audit connection is not requested",
      source: "operator-authorization",
      requiredForDecision: true,
      status: "not-requested",
      notes: "No executable connection path is opened in this decision record.",
    },
    {
      id: "future-sandbox-handle-review",
      label: "Future sandbox handle review can be prepared as a prerequisite intake",
      source: "future-stage",
      requiredForDecision: false,
      status: "not-requested",
      notes: "The next stage may define non-secret handles and review status only.",
    },
  ];
}

function createDecisionRecord(
  source: SourceNodeV352ManagedAuditDisabledReadOnlyIntegrationArchiveVerificationReference,
  inputs: readonly ManagedAuditDisabledReadOnlyIntegrationDecisionInput[],
  ready: boolean,
): ManagedAuditDisabledReadOnlyIntegrationDecisionRecord {
  const recordWithoutDigest = {
    decisionMode: "managed-audit-disabled-read-only-integration-decision-record" as const,
    sourceSpan: "Node v352 managed-audit-disabled read-only integration intake archive verification" as const,
    sourceArchiveVerificationDigest: source.archiveVerificationDigest,
    decision: ready ? "advance-to-sandbox-handle-review-prerequisite-intake" as const : "blocked" as const,
    decisionReason: ready
      ? "v352 archive verification is complete, so the next safe step is a non-secret sandbox-handle prerequisite intake."
      : "v352 archive verification is not ready, so the decision remains blocked.",
    allowsSandboxHandleReviewPreparation: ready,
    requestsCredentialValue: false as const,
    requestsRawEndpointUrl: false as const,
    instantiatesProviderClient: false as const,
    implementsRuntimeShell: false as const,
    opensManagedAuditConnection: false as const,
    startsUpstreamServices: false as const,
    writesUpstreamState: false as const,
    requestsJavaMiniKvEcho: false as const,
    nextNodeVersionSuggested: "Node v354" as const,
    inputCount: inputs.length,
  };

  return {
    decisionDigest: sha256StableJson(recordWithoutDigest),
    ...recordWithoutDigest,
  };
}

function createChecks(
  config: AppConfig,
  source: SourceNodeV352ManagedAuditDisabledReadOnlyIntegrationArchiveVerificationReference,
  proof: ManagedAuditDisabledReadOnlyIntegrationDecisionNecessityProof,
  inputs: readonly ManagedAuditDisabledReadOnlyIntegrationDecisionInput[],
  decision: ManagedAuditDisabledReadOnlyIntegrationDecisionRecord,
): ManagedAuditDisabledReadOnlyIntegrationDecisionRecordChecks {
  return {
    sourceNodeV352Ready:
      source.archiveVerificationState === "managed-audit-disabled-read-only-integration-intake-archive-verified"
      && source.readyForArchiveVerification
      && source.readyForNodeV353DecisionRecord
      && isDigest(source.archiveVerificationDigest),
    sourceArchiveVerificationAllowsDecision:
      source.archiveVerificationDecision === "archive-managed-audit-disabled-read-only-integration-intake",
    sourceArchiveFilesComplete:
      source.archiveFileCount === 10 && source.presentArchiveFileCount === 10,
    sourceChecksAllPassed:
      source.checkCount === 27 && source.passedCheckCount === 27 && source.productionBlockerCount === 0,
    necessityProofPresent:
      proof.blockerResolved.length > 0
      && proof.consumedBy.length > 0
      && proof.cannotReuseExistingReportBecause.length > 0
      && proof.growthStopCondition.length > 0,
    decisionInputsComplete:
      inputs.length === 4 && inputs.every((input) => input.id.length > 0 && input.notes.length > 0),
    decisionDigestStable: isDigest(decision.decisionDigest),
    decisionLimitedToPrerequisiteIntake:
      decision.decision === "blocked"
      || decision.decision === "advance-to-sandbox-handle-review-prerequisite-intake",
    noCredentialValueRequested: !decision.requestsCredentialValue && !source.readsManagedAuditCredential,
    noRawEndpointUrlRequested: !decision.requestsRawEndpointUrl && !source.rawEndpointUrlParsed,
    noProviderClientInstantiated:
      !decision.instantiatesProviderClient && !source.secretProviderInstantiated && !source.resolverClientInstantiated,
    noRuntimeShellImplemented: !decision.implementsRuntimeShell && !source.runtimeShellImplemented,
    noUpstreamServiceStarted:
      !decision.startsUpstreamServices && !source.startsJavaService && !source.startsMiniKvService,
    noUpstreamMutation: !decision.writesUpstreamState && !source.mutatesJavaState && !source.mutatesMiniKvState,
    noManagedAuditConnection:
      !decision.opensManagedAuditConnection
      && !source.connectsManagedAudit
      && !source.sendsManagedAuditHttpTcp
      && !config.upstreamActionsEnabled,
    noJavaMiniKvEchoRequired: !decision.requestsJavaMiniKvEcho,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditDisabledReadOnlyIntegrationDecisionRecord: false,
  };
}

function collectProductionBlockers(
  checks: ManagedAuditDisabledReadOnlyIntegrationDecisionRecordChecks,
): ManagedAuditDisabledReadOnlyIntegrationDecisionRecordMessage[] {
  const rules: Array<[boolean, string, ManagedAuditDisabledReadOnlyIntegrationDecisionRecordMessage["source"], string]> = [
    [checks.sourceNodeV352Ready, "NODE_V352_NOT_READY", "node-v352",
      "Node v352 archive verification must be ready before v353 can record a decision."],
    [checks.sourceArchiveVerificationAllowsDecision, "NODE_V352_DECISION_NOT_ALLOWED", "node-v352",
      "Node v352 must explicitly archive the disabled read-only intake."],
    [checks.sourceArchiveFilesComplete, "SOURCE_ARCHIVE_FILES_INCOMPLETE", "node-v352",
      "Node v352 must show 10/10 archive files present."],
    [checks.sourceChecksAllPassed, "SOURCE_CHECKS_NOT_ALL_PASSED", "node-v352",
      "Node v352 must show 27/27 checks and zero production blockers."],
    [checks.necessityProofPresent, "NECESSITY_PROOF_MISSING", "necessity-proof",
      "v353 must explain why this decision exists and when the chain stops."],
    [checks.decisionInputsComplete, "DECISION_INPUTS_INCOMPLETE", "decision-inputs",
      "v353 decision inputs must be complete."],
    [checks.decisionLimitedToPrerequisiteIntake, "DECISION_SCOPE_TOO_BROAD", "decision-record",
      "v353 may only choose a prerequisite intake or remain blocked."],
    [checks.noCredentialValueRequested, "CREDENTIAL_VALUE_REQUESTED", "runtime-boundary",
      "v353 must not request credential values."],
    [checks.noRawEndpointUrlRequested, "RAW_ENDPOINT_REQUESTED", "runtime-boundary",
      "v353 must not request raw endpoint URLs."],
    [checks.noProviderClientInstantiated, "PROVIDER_OR_CLIENT_INSTANTIATED", "runtime-boundary",
      "v353 must not instantiate provider or resolver client."],
    [checks.noRuntimeShellImplemented, "RUNTIME_SHELL_OPENED", "runtime-boundary",
      "v353 must not implement or invoke runtime shell."],
    [checks.noUpstreamServiceStarted, "UPSTREAM_SERVICE_STARTED", "runtime-boundary",
      "v353 must not start Java or mini-kv."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary",
      "v353 must not open managed audit HTTP/TCP."],
    [checks.decisionDigestStable, "DECISION_DIGEST_UNSTABLE", "decision-record",
      "v353 decision digest must be stable."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(ready: boolean): ManagedAuditDisabledReadOnlyIntegrationDecisionRecordMessage[] {
  return [{
    code: "SANDBOX_HANDLE_REVIEW_STILL_NON_SECRET",
    severity: "warning",
    source: "next-step",
    message: ready
      ? "The next stage may prepare sandbox handle review, but only as non-secret prerequisite intake."
      : "The decision remains blocked until v352 evidence is complete.",
  }];
}

function collectRecommendations(ready: boolean): ManagedAuditDisabledReadOnlyIntegrationDecisionRecordMessage[] {
  return [{
    code: ready ? "PROCEED_TO_NODE_V354_PREREQUISITE_INTAKE" : "FIX_V352_BEFORE_V354",
    severity: "recommendation",
    source: "next-step",
    message: ready
      ? "Proceed to Node v354 only for sandbox handle review prerequisite intake; do not connect or execute."
      : "Fix Node v352 source evidence before any follow-up decision.",
  }];
}

function createSummary(
  source: SourceNodeV352ManagedAuditDisabledReadOnlyIntegrationArchiveVerificationReference,
  inputs: readonly ManagedAuditDisabledReadOnlyIntegrationDecisionInput[],
  checks: ManagedAuditDisabledReadOnlyIntegrationDecisionRecordChecks,
  productionBlockers: readonly ManagedAuditDisabledReadOnlyIntegrationDecisionRecordMessage[],
  warnings: readonly ManagedAuditDisabledReadOnlyIntegrationDecisionRecordMessage[],
  recommendations: readonly ManagedAuditDisabledReadOnlyIntegrationDecisionRecordMessage[],
): ManagedAuditDisabledReadOnlyIntegrationDecisionRecordSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    inputCount: inputs.length,
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
