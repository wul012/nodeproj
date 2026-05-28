import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerification.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerificationTypes.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewProfile,
  SandboxHandleReviewClosureItem,
  SandboxHandleReviewClosureItemId,
  SandboxHandleReviewPrerequisiteClosureReview,
  SandboxHandleReviewPrerequisiteClosureReviewChecks,
  SandboxHandleReviewPrerequisiteClosureReviewMessage,
  SandboxHandleReviewPrerequisiteClosureReviewSummary,
  SourceNodeV361SandboxHandleReviewPrerequisiteClosureReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-closure-review.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-closure-review";
const SOURCE_NODE_V361_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-decision-record-archive-verification";
const ACTIVE_PLAN =
  "docs/plans2/v361-post-sandbox-handle-review-packet-gate-decision-record-archive-verification-roadmap.md";
const NEXT_PLAN =
  "docs/plans2/v362-post-sandbox-handle-review-prerequisite-closure-review-roadmap.md";

const CLOSURE_ITEM_LABELS: Record<SandboxHandleReviewClosureItemId, string> = {
  "managed-audit-disabled-read-only-integration": "Managed audit disabled read-only integration stage is complete",
  "sandbox-handle-review-prerequisite-intake": "Sandbox handle review prerequisite intake is archived",
  "sandbox-handle-review-contract-decision": "Sandbox handle review contract decision is archived",
  "sandbox-handle-review-packet-gate-decision-record": "Packet/gate decision record is archived",
};

export function loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReview(
  input: { config: AppConfig; sourceArchiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewProfile {
  const sourceProfile =
    loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerification({
      config: input.config,
      archiveRoot: input.sourceArchiveRoot,
    });
  const sourceNodeV361 = createSourceNodeV361(sourceProfile);
  const draftClosureReview = createClosureReview(sourceNodeV361, false);
  const checks = createChecks(input.config, sourceNodeV361, draftClosureReview);
  checks.readyForSandboxHandleReviewPrerequisiteClosureReview = Object.entries(checks)
    .filter(([key]) => key !== "readyForSandboxHandleReviewPrerequisiteClosureReview")
    .every(([, value]) => value);
  const ready = checks.readyForSandboxHandleReviewPrerequisiteClosureReview;
  const closureReview = createClosureReview(sourceNodeV361, ready);
  checks.closureDigestStable = isDigest(closureReview.reviewDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(ready);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV361, closureReview, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver sandbox handle review prerequisite closure review",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    reviewState: ready ? "sandbox-handle-review-prerequisite-closure-review-ready" : "blocked",
    prerequisiteClosureDecision: closureReview.closureDecision,
    readyForSandboxHandleReviewPrerequisiteClosureReview: ready,
    readyForNodeV363SandboxHandleReviewPrerequisiteClosureArchiveVerification: ready,
    consumesNodeV361SandboxHandleReviewPacketGateDecisionRecordArchiveVerification: true,
    activeNodeVersion: "Node v362",
    sourceNodeVersion: "Node v361",
    closureReviewOnly: true,
    readOnlyClosureReview: true,
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
    sourceNodeV361,
    closureReview,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      sandboxHandleReviewPrerequisiteClosureReviewJson: ROUTE_PATH,
      sandboxHandleReviewPrerequisiteClosureReviewMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV361Json: SOURCE_NODE_V361_ROUTE,
      sourceNodeV361Markdown: `${SOURCE_NODE_V361_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v363",
    },
    nextActions: ready
      ? [
        "Use Node v363 to archive this prerequisite closure review before any follow-up sandbox handle review planning.",
        "Keep credential value, raw endpoint URL, provider/client, runtime shell, managed audit HTTP/TCP, Java writes, and mini-kv write/admin scopes closed.",
        "Pause if the next step asks for real credential material, raw endpoint URL, provider/client, or executable managed audit connection code.",
      ]
      : [
        "Fix Node v361 archive verification before closing the sandbox handle review prerequisite chain.",
        "Do not request Java or mini-kv changes from this closure review failure alone.",
      ],
  };
}

function createSourceNodeV361(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerificationProfile,
): SourceNodeV361SandboxHandleReviewPrerequisiteClosureReference {
  return {
    sourceVersion: "Node v361",
    profileVersion: profile.profileVersion,
    archiveVerificationState: profile.archiveVerificationState,
    archiveVerificationDecision: profile.archiveVerificationDecision,
    readyForArchiveVerification:
      profile.readyForSandboxHandleReviewPacketGateDecisionRecordArchiveVerification,
    readyForPrerequisiteClosureReview: profile.readyForNodeV362SandboxHandleReviewPrerequisiteClosureReview,
    archiveVerificationDigest: profile.archiveVerification.archiveVerificationDigest,
    sourceDecisionDigest: profile.archiveVerification.sourceDecisionDigest,
    archiveFileCount: profile.summary.archiveFileCount,
    presentArchiveFileCount: profile.summary.presentArchiveFileCount,
    sourceCheckCount: profile.summary.sourceCheckCount,
    sourcePassedCheckCount: profile.summary.sourcePassedCheckCount,
    sourceProductionBlockerCount: profile.summary.productionBlockerCount,
    inputCount: profile.summary.inputCount,
    packetInputCount: profile.summary.packetInputCount,
    gateOutputCount: profile.summary.gateOutputCount,
    stopConditionCount: profile.summary.stopConditionCount,
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

function createClosureReview(
  source: SourceNodeV361SandboxHandleReviewPrerequisiteClosureReference,
  ready: boolean,
): SandboxHandleReviewPrerequisiteClosureReview {
  const completedClosureItems: SandboxHandleReviewClosureItem[] = [
    completedBeforeV362(
      "managed-audit-disabled-read-only-integration",
      "Node v351-v353 completed managed-audit-disabled read-only integration intake, archive verification, and decision record.",
    ),
    completedBeforeV362(
      "sandbox-handle-review-prerequisite-intake",
      "Node v354-v355 completed sandbox handle review prerequisite intake and archive verification.",
    ),
    completedBeforeV362(
      "sandbox-handle-review-contract-decision",
      "Node v356-v357 completed sandbox handle review contract decision and archive verification.",
    ),
    completedCurrent(source),
  ];
  const record = {
    reviewMode: "sandbox-handle-review-prerequisite-closure-review-only" as const,
    sourceSpan: "Node v361" as const,
    sourceArchiveVerificationDigest: source.archiveVerificationDigest,
    sourceDecisionDigest: source.sourceDecisionDigest,
    completedClosureItems,
    remainingClosureItems: [] as SandboxHandleReviewClosureItem[],
    completedClosureItemCount: completedClosureItems.length,
    remainingClosureItemCount: 0,
    originalClosureItemCount: completedClosureItems.length,
    movedClosureItemId: "sandbox-handle-review-packet-gate-decision-record" as const,
    movedFrom: "decision-record-complete" as const,
    movedTo: "decision-record-archive-complete" as const,
    closureDecision: ready
      ? "close-sandbox-handle-review-prerequisite-chain-for-non-executable-review" as const
      : "blocked" as const,
    nextNodeVersionSuggested: "Node v363" as const,
    nextJavaVersionRequested: null,
    nextMiniKvVersionRequested: null,
    allowsPrerequisiteClosureArchiveVerification: ready,
    allowsCredentialValue: false as const,
    allowsRawEndpointUrl: false as const,
    allowsProviderClient: false as const,
    allowsRuntimeShell: false as const,
    allowsManagedAuditConnection: false as const,
    allowsUpstreamMutation: false as const,
    closureReason: ready
      ? "Node v361 verified the v360 packet/gate decision record archive, so the non-executable sandbox handle review prerequisite chain can be closed and archived."
      : "Node v361 archive verification is not ready, so the sandbox handle review prerequisite chain remains blocked.",
  };

  return {
    reviewDigest: sha256StableJson({ profileVersion: PROFILE_VERSION, record }),
    ...record,
  };
}

function completedBeforeV362(id: SandboxHandleReviewClosureItemId, evidence: string): SandboxHandleReviewClosureItem {
  return closureItem(id, "completed-before-node-v362", evidence);
}

function completedCurrent(
  source: SourceNodeV361SandboxHandleReviewPrerequisiteClosureReference,
): SandboxHandleReviewClosureItem {
  return closureItem(
    "sandbox-handle-review-packet-gate-decision-record",
    "decision-record-archive-complete",
    `Node v361 verified archive ${source.archiveVerificationDigest} for decision ${source.sourceDecisionDigest}.`,
  );
}

function closureItem(
  id: SandboxHandleReviewClosureItemId,
  closureState: SandboxHandleReviewClosureItem["closureState"],
  evidence: string,
): SandboxHandleReviewClosureItem {
  return {
    id,
    label: CLOSURE_ITEM_LABELS[id],
    closureState,
    evidence,
    requiredBeforeSandboxHandleReview: true,
    opensCredentialValue: false,
    opensRawEndpointUrl: false,
    opensProviderClient: false,
    opensRuntimeShell: false,
    opensManagedAuditConnection: false,
    mutatesUpstreamState: false,
  };
}

function createChecks(
  config: AppConfig,
  source: SourceNodeV361SandboxHandleReviewPrerequisiteClosureReference,
  closureReview: SandboxHandleReviewPrerequisiteClosureReview,
): SandboxHandleReviewPrerequisiteClosureReviewChecks {
  return {
    sourceNodeV361Ready:
      source.archiveVerificationState === "sandbox-handle-review-packet-gate-decision-record-archive-verified"
      && source.readyForArchiveVerification
      && source.readyForPrerequisiteClosureReview
      && isDigest(source.archiveVerificationDigest)
      && isDigest(source.sourceDecisionDigest),
    sourceArchiveVerificationComplete:
      source.archiveVerificationDecision === "archive-sandbox-handle-review-packet-gate-decision-record",
    sourceDecisionAllowsClosureReview: source.readyForPrerequisiteClosureReview,
    sourceArchiveFilesComplete: source.archiveFileCount === 11 && source.presentArchiveFileCount === 11,
    sourceChecksAllPassed:
      source.sourceCheckCount === 20
      && source.sourcePassedCheckCount === 20
      && source.sourceProductionBlockerCount === 0,
    sourcePacketGateShapePreserved:
      source.inputCount === 5
      && source.packetInputCount === 6
      && source.gateOutputCount === 5
      && source.stopConditionCount === 7,
    sourceKeepsCredentialAndEndpointClosed:
      !source.credentialValueRequested
      && !source.credentialValueRead
      && !source.rawEndpointUrlRequested
      && !source.rawEndpointUrlParsed,
    sourceKeepsRuntimeAndConnectionClosed:
      !source.secretProviderInstantiated
      && !source.resolverClientInstantiated
      && !source.runtimeShellImplemented
      && !source.runtimeShellInvocationAllowed
      && !source.connectsManagedAudit
      && !source.sendsManagedAuditHttpTcp,
    sourceKeepsUpstreamsClosed:
      !source.startsJavaService
      && !source.startsMiniKvService
      && !source.mutatesJavaState
      && !source.mutatesMiniKvState
      && !source.executionAllowed,
    closureItemsComplete:
      closureReview.originalClosureItemCount === 4
      && closureReview.completedClosureItemCount === 4
      && closureReview.completedClosureItems.every((item) =>
        item.requiredBeforeSandboxHandleReview
        && !item.opensCredentialValue
        && !item.opensRawEndpointUrl
        && !item.opensProviderClient
        && !item.opensRuntimeShell
        && !item.opensManagedAuditConnection
        && !item.mutatesUpstreamState),
    noRemainingClosureItems: closureReview.remainingClosureItemCount === 0,
    closureDigestStable: isDigest(closureReview.reviewDigest),
    closureDecisionLimitedToNonExecutableReview:
      closureReview.closureDecision === "blocked"
      || closureReview.closureDecision === "close-sandbox-handle-review-prerequisite-chain-for-non-executable-review",
    nextStepIsArchiveVerification:
      closureReview.nextNodeVersionSuggested === "Node v363"
      && closureReview.allowsPrerequisiteClosureArchiveVerification === (closureReview.closureDecision !== "blocked"),
    noCredentialValueRequestedOrRead: !closureReview.allowsCredentialValue,
    noRawEndpointRequestedOrParsed: !closureReview.allowsRawEndpointUrl,
    noProviderClientInstantiated: !closureReview.allowsProviderClient,
    noRuntimeShellImplementedOrInvoked: !closureReview.allowsRuntimeShell,
    noManagedAuditHttpTcp: !closureReview.allowsManagedAuditConnection && !config.upstreamActionsEnabled,
    noUpstreamServiceStarted: !source.startsJavaService && !source.startsMiniKvService,
    noUpstreamMutation: !closureReview.allowsUpstreamMutation && !source.mutatesJavaState && !source.mutatesMiniKvState,
    noJavaMiniKvEchoRequired:
      closureReview.nextJavaVersionRequested === null
      && closureReview.nextMiniKvVersionRequested === null,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForSandboxHandleReviewPrerequisiteClosureReview: false,
  };
}

function collectProductionBlockers(
  checks: SandboxHandleReviewPrerequisiteClosureReviewChecks,
): SandboxHandleReviewPrerequisiteClosureReviewMessage[] {
  const rules: Array<[boolean, string, SandboxHandleReviewPrerequisiteClosureReviewMessage["source"], string]> = [
    [checks.sourceNodeV361Ready, "NODE_V361_NOT_READY", "node-v361",
      "Node v361 archive verification must be ready before v362 can close prerequisites."],
    [checks.sourceArchiveVerificationComplete, "NODE_V361_ARCHIVE_NOT_COMPLETE", "node-v361",
      "Node v361 must explicitly archive the v360 decision record."],
    [checks.sourceDecisionAllowsClosureReview, "NODE_V361_DOES_NOT_ALLOW_CLOSURE_REVIEW", "node-v361",
      "Node v361 must point only to prerequisite closure review."],
    [checks.sourceArchiveFilesComplete, "SOURCE_ARCHIVE_FILES_INCOMPLETE", "node-v361",
      "Node v361 must show 11/11 archive files present."],
    [checks.sourceChecksAllPassed, "SOURCE_CHECKS_NOT_ALL_PASSED", "node-v361",
      "Node v361 must show source v360 20/20 checks and zero production blockers."],
    [checks.closureItemsComplete, "CLOSURE_ITEMS_INCOMPLETE", "closure-review",
      "v362 must close the four non-executable sandbox handle review prerequisite items."],
    [checks.noRemainingClosureItems, "CLOSURE_ITEMS_REMAINING", "closure-review",
      "v362 closure review must not leave additional non-executable closure items."],
    [checks.closureDecisionLimitedToNonExecutableReview, "CLOSURE_DECISION_TOO_BROAD", "closure-review",
      "v362 may only close the non-executable prerequisite chain or remain blocked."],
    [checks.noCredentialValueRequestedOrRead, "CREDENTIAL_VALUE_REQUESTED", "runtime-boundary",
      "v362 must not request or read credential values."],
    [checks.noRawEndpointRequestedOrParsed, "RAW_ENDPOINT_REQUESTED", "runtime-boundary",
      "v362 must not request or parse raw endpoint URLs."],
    [checks.noProviderClientInstantiated, "PROVIDER_OR_CLIENT_INSTANTIATED", "runtime-boundary",
      "v362 must not instantiate provider or resolver client."],
    [checks.noRuntimeShellImplementedOrInvoked, "RUNTIME_SHELL_OPENED", "runtime-boundary",
      "v362 must not implement or invoke runtime shell."],
    [checks.noManagedAuditHttpTcp, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary",
      "v362 must not open managed audit HTTP/TCP."],
    [checks.noUpstreamServiceStarted, "UPSTREAM_SERVICE_STARTED", "runtime-boundary",
      "v362 must not start Java or mini-kv."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_DETECTED", "runtime-boundary",
      "v362 must not mutate Java or mini-kv state."],
    [checks.noJavaMiniKvEchoRequired, "UNNEEDED_JAVA_MINI_KV_ECHO_REQUESTED", "next-step",
      "v362 must not request Java v153 + mini-kv v144."],
    [checks.closureDigestStable, "CLOSURE_DIGEST_UNSTABLE", "closure-review",
      "v362 closure review digest must be stable."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(ready: boolean): SandboxHandleReviewPrerequisiteClosureReviewMessage[] {
  return [{
    code: "PREREQUISITE_CLOSURE_IS_NON_EXECUTABLE",
    severity: "warning",
    source: "next-step",
    message: ready
      ? "v362 closes only the non-executable sandbox handle review prerequisite chain; archive it before follow-up planning."
      : "The closure review remains blocked until v361 archive verification is complete.",
  }];
}

function collectRecommendations(ready: boolean): SandboxHandleReviewPrerequisiteClosureReviewMessage[] {
  return [{
    code: ready ? "PROCEED_TO_NODE_V363_ARCHIVE_VERIFICATION" : "FIX_V361_BEFORE_V363",
    severity: "recommendation",
    source: "next-step",
    message: ready
      ? "Proceed to Node v363 archive verification; do not open credential, endpoint, provider/client, runtime, managed audit connection, or write scopes."
      : "Fix Node v361 source evidence before any follow-up closure review.",
  }];
}

function createSummary(
  source: SourceNodeV361SandboxHandleReviewPrerequisiteClosureReference,
  closureReview: SandboxHandleReviewPrerequisiteClosureReview,
  checks: SandboxHandleReviewPrerequisiteClosureReviewChecks,
  productionBlockers: readonly SandboxHandleReviewPrerequisiteClosureReviewMessage[],
  warnings: readonly SandboxHandleReviewPrerequisiteClosureReviewMessage[],
  recommendations: readonly SandboxHandleReviewPrerequisiteClosureReviewMessage[],
): SandboxHandleReviewPrerequisiteClosureReviewSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceCheckCount: source.sourceCheckCount,
    sourcePassedCheckCount: source.sourcePassedCheckCount,
    archiveFileCount: source.archiveFileCount,
    presentArchiveFileCount: source.presentArchiveFileCount,
    originalClosureItemCount: closureReview.originalClosureItemCount,
    completedClosureItemCount: closureReview.completedClosureItemCount,
    remainingClosureItemCount: closureReview.remainingClosureItemCount,
    inputCount: source.inputCount,
    packetInputCount: source.packetInputCount,
    gateOutputCount: source.gateOutputCount,
    stopConditionCount: source.stopConditionCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
