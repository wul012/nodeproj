import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  getHumanApprovalArtifactReviewPostEchoPrerequisite,
  HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG,
  JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID,
  type HumanApprovalArtifactReviewPostEchoPrerequisiteId,
} from "./managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReviewProfile,
  NoNetworkSafetyFixtureClosurePrerequisite,
  NoNetworkSafetyFixturePrerequisiteClosureReview,
  NoNetworkSafetyFixturePrerequisiteClosureReviewChecks,
  NoNetworkSafetyFixturePrerequisiteClosureReviewMessage,
  NoNetworkSafetyFixturePrerequisiteClosureReviewSummary,
  SourceNodeV324NoNetworkSafetyFixtureUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReviewTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReviewMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReviewRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-prerequisite-closure-review.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-prerequisite-closure-review";
const SOURCE_NODE_V324_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans2/v322-post-endpoint-handle-prerequisite-closure-roadmap.md";
const NEXT_PLAN = "docs/plans2/v325-post-no-network-safety-fixture-prerequisite-closure-roadmap.md";

const SIGNED_ARTIFACT_PREREQUISITE_ID =
  "signed-human-approval-artifact" satisfies HumanApprovalArtifactReviewPostEchoPrerequisiteId;
const CREDENTIAL_HANDLE_PREREQUISITE_ID =
  "credential-handle-approval" satisfies HumanApprovalArtifactReviewPostEchoPrerequisiteId;
const ENDPOINT_HANDLE_ALLOWLIST_PREREQUISITE_ID =
  "endpoint-handle-allowlist-approval" satisfies HumanApprovalArtifactReviewPostEchoPrerequisiteId;
const NO_NETWORK_SAFETY_FIXTURE_PREREQUISITE_ID =
  "no-network-safety-fixture" satisfies HumanApprovalArtifactReviewPostEchoPrerequisiteId;
const ABORT_ROLLBACK_SEMANTICS_PREREQUISITE_ID =
  "abort-rollback-semantics" satisfies HumanApprovalArtifactReviewPostEchoPrerequisiteId;

export function loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReviewProfile {
  const sourceNodeV324 = createSourceNodeV324(input.config);
  const closureReview = createClosureReview(sourceNodeV324);
  const checks = createChecks(input.config, sourceNodeV324, closureReview);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview")
      .every(([, value]) => value);
  const reviewState =
    checks.readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview
      ? "no-network-safety-fixture-prerequisite-closure-review-ready"
      : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV324, closureReview, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver no-network safety fixture prerequisite closure review",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    reviewState,
    prerequisiteClosureDecision: "advance-no-network-safety-fixture-only",
    readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview,
    readOnlyClosureReview: true,
    noNetworkSafetyFixturePrerequisiteClosureReviewOnly: true,
    consumesNodeV324NoNetworkSafetyFixtureUpstreamEchoVerification: true,
    activeNodeReviewVersion: "Node v325",
    readyForNewJavaMiniKvEchoRequest: false,
    newJavaMiniKvEchoRequested: false,
    readyForAbortRollbackSemanticsContractIntake: true,
    nextNodeVersionSuggested: "Node v326",
    readyForDisabledRuntimeShellImplementation: false,
    readyForDisabledRuntimeShellInvocation: false,
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
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    credentialValueRead: false,
    credentialValueProvided: false,
    endpointHandleAllowlistApproved: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlRendered: false,
    externalRequestSent: false,
    networkSafetyFixtureExecuted: false,
    httpRequestSent: false,
    tcpConnectionAttempted: false,
    networkSocketOpened: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    fakeSecretProviderInstantiated: false,
    fakeResolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    approvalLedgerWritten: false,
    automaticUpstreamStart: false,
    sourceNodeV324,
    closureReview,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      noNetworkSafetyFixturePrerequisiteClosureReviewJson: ROUTE_PATH,
      noNetworkSafetyFixturePrerequisiteClosureReviewMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV324Json: SOURCE_NODE_V324_ROUTE,
      sourceNodeV324Markdown: `${SOURCE_NODE_V324_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
    },
    nextActions: [
      "Archive Node v325 as the closure review that advances no-network-safety-fixture only after Node v324 echo alignment.",
      "Do not request Java or mini-kv echo again until Node v326 defines a concrete abort/rollback semantics contract.",
      "Keep runtime shell, provider/client, credential value, raw endpoint URL, HTTP/TCP, ledger, schema, and auto-start boundaries closed.",
    ],
  };
}

function createSourceNodeV324(
  config: AppConfig,
): SourceNodeV324NoNetworkSafetyFixtureUpstreamEchoVerificationReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification({
    config,
  });

  return {
    sourceVersion: "Node v324",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForNoNetworkSafetyFixtureUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: source.readOnlyUpstreamEchoVerification,
    verificationDigest: source.echoVerification.verificationDigest,
    sourceSpan: source.echoVerification.sourceSpan,
    sourceNodeV323Ready: source.echoVerification.sourceNodeV323Ready,
    javaV149EchoReady: source.echoVerification.javaV149EchoReady,
    miniKvV141ReceiptReady: source.echoVerification.miniKvV141ReceiptReady,
    upstreamEchoAligned: source.echoVerification.upstreamEchoAligned,
    noNetworkSafetyFixtureContractAligned: source.echoVerification.noNetworkSafetyFixtureContractAligned,
    sideEffectBoundariesAligned: source.echoVerification.sideEffectBoundariesAligned,
    implementationStillBlocked: source.echoVerification.implementationStillBlocked,
    remainingPrerequisitesAfterV324: source.echoVerification.remainingPrerequisitesAfterV324,
    contractDigest: source.sourceNodeV323.contractDigest,
    requiredFieldCount: source.summary.requiredFieldCount,
    prohibitedFieldCount: source.summary.prohibitedFieldCount,
    rejectionReasonCount: source.summary.rejectionReasonCount,
    noGoBoundaryCount: source.summary.noGoBoundaryCount,
    upstreamEchoRequestCount: source.summary.upstreamEchoRequestCount,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
    sourceWarningCount: source.summary.warningCount,
    sourceRecommendationCount: source.summary.recommendationCount,
    sourceChecks: source.checks,
    sourceSummary: source.summary,
    runtimeShellImplemented: source.runtimeShellImplemented,
    runtimeShellInvocationAllowed: source.runtimeShellInvocationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    networkSafetyFixtureExecuted: source.networkSafetyFixtureExecuted,
    httpRequestSent: source.httpRequestSent,
    tcpConnectionAttempted: source.tcpConnectionAttempted,
    networkSocketOpened: source.networkSocketOpened,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalLedgerWritten: source.approvalLedgerWritten,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createClosureReview(
  sourceNodeV324: SourceNodeV324NoNetworkSafetyFixtureUpstreamEchoVerificationReference,
): NoNetworkSafetyFixturePrerequisiteClosureReview {
  const completedPrerequisites: NoNetworkSafetyFixtureClosurePrerequisite[] = [
    completedBeforeV325(
      JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID,
      "Node v312 already closed this prerequisite after Node v311 verified Java v144 and mini-kv v137.",
    ),
    completedBeforeV325(
      SIGNED_ARTIFACT_PREREQUISITE_ID,
      "Node v316 already closed this prerequisite after Node v315 verified Java v145 and mini-kv v138.",
    ),
    completedBeforeV325(
      CREDENTIAL_HANDLE_PREREQUISITE_ID,
      "Node v319 already closed this prerequisite after Node v318 verified Java v146 and mini-kv v139.",
    ),
    completedBeforeV325(
      ENDPOINT_HANDLE_ALLOWLIST_PREREQUISITE_ID,
      "Node v322 already closed this prerequisite after Node v321 verified Java v147 and mini-kv v140.",
    ),
    completedNoNetworkSafetyFixture(sourceNodeV324),
  ];
  const completedIds = new Set(completedPrerequisites.map((prerequisite) => prerequisite.id));
  const remainingPrerequisites = HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG
    .filter((entry) => !completedIds.has(entry.id))
    .map((entry) => missing(entry.id as RemainingNoNetworkSafetyFixtureClosurePrerequisiteId));
  const record = {
    reviewMode: "no-network-safety-fixture-prerequisite-closure-review-only" as const,
    sourceSpan: "Node v324" as const,
    sourceVerificationDigest: sourceNodeV324.verificationDigest,
    completedPrerequisites,
    remainingPrerequisites,
    completedPrerequisiteCount: completedPrerequisites.length,
    remainingPrerequisiteCount: remainingPrerequisites.length,
    originalPrerequisiteCount: HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG.length,
    movedPrerequisiteId: NO_NETWORK_SAFETY_FIXTURE_PREREQUISITE_ID as "no-network-safety-fixture",
    movedFrom: "contract-intake-defined" as const,
    movedTo: "contract-intake-and-upstream-echo-complete" as const,
    nextConcretePrerequisiteId: ABORT_ROLLBACK_SEMANTICS_PREREQUISITE_ID as "abort-rollback-semantics",
    nextConcretePrerequisiteContractRequired: true as const,
    nextNodeVersionSuggested: "Node v326" as const,
    nextJavaVersionRequested: null,
    nextMiniKvVersionRequested: null,
    chainContinuationAllowed: true as const,
    runtimeShellStillBlocked: true as const,
    closureReason:
      "Node v324 verified Node v323 no-network safety fixture contract plus Java v149 and mini-kv v141 read-only echo alignment.",
  };

  return {
    reviewDigest: sha256StableJson({ profileVersion: PROFILE_VERSION, record }),
    ...record,
  };
}

function completedBeforeV325(
  id:
    | typeof JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID
    | typeof SIGNED_ARTIFACT_PREREQUISITE_ID
    | typeof CREDENTIAL_HANDLE_PREREQUISITE_ID
    | typeof ENDPOINT_HANDLE_ALLOWLIST_PREREQUISITE_ID,
  evidence: string,
): NoNetworkSafetyFixtureClosurePrerequisite {
  const entry = getHumanApprovalArtifactReviewPostEchoPrerequisite(id);

  return {
    id,
    label: entry.closureLabel,
    closureState: "completed-before-node-v325",
    evidence,
    requiredBeforeRuntimeShell: true,
    opensRuntimeShell: false,
  };
}

function completedNoNetworkSafetyFixture(
  sourceNodeV324: SourceNodeV324NoNetworkSafetyFixtureUpstreamEchoVerificationReference,
): NoNetworkSafetyFixtureClosurePrerequisite {
  const entry = getHumanApprovalArtifactReviewPostEchoPrerequisite(NO_NETWORK_SAFETY_FIXTURE_PREREQUISITE_ID);

  return {
    id: NO_NETWORK_SAFETY_FIXTURE_PREREQUISITE_ID,
    label: entry.closureLabel,
    closureState: "contract-intake-and-upstream-echo-complete",
    evidence:
      `Node v324 verified contract ${sourceNodeV324.contractDigest} with Java v149 and mini-kv v141 read-only echoes.`,
    requiredBeforeRuntimeShell: true,
    opensRuntimeShell: false,
  };
}

function missing(
  id: RemainingNoNetworkSafetyFixtureClosurePrerequisiteId,
): NoNetworkSafetyFixtureClosurePrerequisite {
  const entry = getHumanApprovalArtifactReviewPostEchoPrerequisite(id);

  return {
    id,
    label: entry.closureLabel,
    closureState: "still-missing",
    evidence: entry.closureMissingEvidence,
    requiredBeforeRuntimeShell: true,
    opensRuntimeShell: false,
  };
}

type RemainingNoNetworkSafetyFixtureClosurePrerequisiteId = Exclude<
  HumanApprovalArtifactReviewPostEchoPrerequisiteId,
  typeof JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID
    | typeof SIGNED_ARTIFACT_PREREQUISITE_ID
    | typeof CREDENTIAL_HANDLE_PREREQUISITE_ID
    | typeof ENDPOINT_HANDLE_ALLOWLIST_PREREQUISITE_ID
    | typeof NO_NETWORK_SAFETY_FIXTURE_PREREQUISITE_ID
>;

function createChecks(
  config: AppConfig,
  sourceNodeV324: SourceNodeV324NoNetworkSafetyFixtureUpstreamEchoVerificationReference,
  closureReview: NoNetworkSafetyFixturePrerequisiteClosureReview,
): NoNetworkSafetyFixturePrerequisiteClosureReviewChecks {
  const completedIds = closureReview.completedPrerequisites.map((prerequisite) => prerequisite.id);
  const remainingIds = closureReview.remainingPrerequisites.map((prerequisite) => prerequisite.id);

  return {
    sourceNodeV324Ready: sourceNodeV324.readyForNoNetworkSafetyFixtureUpstreamEchoVerification,
    sourceNodeV324EchoAligned:
      sourceNodeV324.sourceNodeV323Ready
      && sourceNodeV324.javaV149EchoReady
      && sourceNodeV324.miniKvV141ReceiptReady
      && sourceNodeV324.upstreamEchoAligned
      && sourceNodeV324.noNetworkSafetyFixtureContractAligned
      && sourceNodeV324.sideEffectBoundariesAligned,
    sourceNodeV324KeepsRuntimeBlocked:
      sourceNodeV324.implementationStillBlocked
      && sourceNodeV324.runtimeShellImplemented === false
      && sourceNodeV324.runtimeShellInvocationAllowed === false,
    sourceNodeV324KeepsNetworkSideEffectsClosed:
      sourceNodeV324.executionAllowed === false
      && sourceNodeV324.connectsManagedAudit === false
      && sourceNodeV324.credentialValueRead === false
      && sourceNodeV324.rawEndpointUrlParsed === false
      && sourceNodeV324.externalRequestSent === false
      && sourceNodeV324.networkSafetyFixtureExecuted === false
      && sourceNodeV324.httpRequestSent === false
      && sourceNodeV324.tcpConnectionAttempted === false
      && sourceNodeV324.networkSocketOpened === false
      && sourceNodeV324.schemaMigrationExecuted === false
      && sourceNodeV324.approvalLedgerWritten === false
      && sourceNodeV324.automaticUpstreamStart === false,
    noNetworkSafetyFixtureCanClose:
      closureReview.movedPrerequisiteId === NO_NETWORK_SAFETY_FIXTURE_PREREQUISITE_ID
      && closureReview.movedFrom === "contract-intake-defined"
      && closureReview.movedTo === "contract-intake-and-upstream-echo-complete"
      && sourceNodeV324.requiredFieldCount === 10
      && sourceNodeV324.prohibitedFieldCount === 12
      && sourceNodeV324.rejectionReasonCount === 6
      && sourceNodeV324.noGoBoundaryCount === 10
      && sourceNodeV324.upstreamEchoRequestCount === 2,
    noNetworkSafetyFixtureClosureDoesNotOpenRuntime:
      closureReview.completedPrerequisites
        .filter((prerequisite) => prerequisite.id === NO_NETWORK_SAFETY_FIXTURE_PREREQUISITE_ID)
        .every((prerequisite) => prerequisite.opensRuntimeShell === false),
    exactlyFivePrerequisitesCompleted:
      closureReview.completedPrerequisiteCount === 5
      && completedIds.includes(JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID)
      && completedIds.includes(SIGNED_ARTIFACT_PREREQUISITE_ID)
      && completedIds.includes(CREDENTIAL_HANDLE_PREREQUISITE_ID)
      && completedIds.includes(ENDPOINT_HANDLE_ALLOWLIST_PREREQUISITE_ID)
      && completedIds.includes(NO_NETWORK_SAFETY_FIXTURE_PREREQUISITE_ID),
    onePrerequisiteRemainsMissing:
      closureReview.remainingPrerequisiteCount === 1
      && remainingIds.includes(ABORT_ROLLBACK_SEMANTICS_PREREQUISITE_ID)
      && closureReview.remainingPrerequisites.every((prerequisite) => prerequisite.closureState === "still-missing"),
    nextConcretePrerequisiteIsAbortRollbackSemantics:
      closureReview.nextConcretePrerequisiteId === ABORT_ROLLBACK_SEMANTICS_PREREQUISITE_ID
      && closureReview.nextConcretePrerequisiteContractRequired
      && closureReview.nextNodeVersionSuggested === "Node v326",
    noNewJavaMiniKvEchoRequested:
      closureReview.nextJavaVersionRequested === null
      && closureReview.nextMiniKvVersionRequested === null,
    closureReviewStillReadOnly: true,
    runtimeShellStillBlocked: closureReview.runtimeShellStillBlocked,
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview:
      false,
  };
}

function collectProductionBlockers(
  checks: NoNetworkSafetyFixturePrerequisiteClosureReviewChecks,
): NoNetworkSafetyFixturePrerequisiteClosureReviewMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: NoNetworkSafetyFixturePrerequisiteClosureReviewMessage["source"];
    message: string;
  }> = [
    {
      condition:
        checks.sourceNodeV324Ready
        && checks.sourceNodeV324EchoAligned
        && checks.sourceNodeV324KeepsRuntimeBlocked
        && checks.sourceNodeV324KeepsNetworkSideEffectsClosed,
      code: "NODE_V324_UPSTREAM_ECHO_NOT_READY",
      source: "node-v324-no-network-safety-fixture-upstream-echo-verification",
      message: "Node v324 must be ready, aligned across Node/Java/mini-kv, and keep runtime/network side effects closed.",
    },
    {
      condition:
        checks.noNetworkSafetyFixtureCanClose
        && checks.noNetworkSafetyFixtureClosureDoesNotOpenRuntime
        && checks.exactlyFivePrerequisitesCompleted
        && checks.onePrerequisiteRemainsMissing,
      code: "NO_NETWORK_SAFETY_FIXTURE_CLOSURE_COUNTS_NOT_SAFE",
      source:
        "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-prerequisite-closure-review",
      message: "v325 may advance only no-network-safety-fixture and must leave abort/rollback semantics missing.",
    },
    {
      condition:
        checks.nextConcretePrerequisiteIsAbortRollbackSemantics
        && checks.noNewJavaMiniKvEchoRequested
        && checks.closureReviewStillReadOnly
        && checks.runtimeShellStillBlocked,
      code: "NEXT_PREREQUISITE_PLAN_NOT_SAFE",
      source:
        "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-prerequisite-closure-review",
      message: "v325 may suggest Node v326 abort/rollback semantics contract intake only; it must not request upstream echo or runtime work.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v325 closure review.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v325 closure review.",
    },
  ];

  return rules
    .filter((rule) => !rule.condition)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker" as const,
      source: rule.source,
      message: rule.message,
    }));
}

function collectWarnings(): NoNetworkSafetyFixturePrerequisiteClosureReviewMessage[] {
  return [
    {
      code: "NO_NETWORK_FIXTURE_CLOSURE_DOES_NOT_APPROVE_RUNTIME",
      severity: "warning",
      source:
        "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-prerequisite-closure-review",
      message: "v325 closes one prerequisite after read-only echo alignment; it does not approve provider/client, network, ledger, schema, or runtime shell work.",
    },
  ];
}

function collectRecommendations(): NoNetworkSafetyFixturePrerequisiteClosureReviewMessage[] {
  return [
    {
      code: "DEFINE_ABORT_ROLLBACK_SEMANTICS_CONTRACT_NEXT",
      severity: "recommendation",
      source:
        "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-prerequisite-closure-review",
      message: "The next Node step should define abort/rollback semantics as the final concrete prerequisite contract.",
    },
    {
      code: "DO_NOT_MERGE_ABORT_ROLLBACK_INTO_NETWORK_FIXTURE",
      severity: "recommendation",
      source:
        "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-prerequisite-closure-review",
      message: "Keep abort/rollback semantics separate from no-network safety fixture so the final prerequisite remains auditable.",
    },
  ];
}

function createSummary(
  sourceNodeV324: SourceNodeV324NoNetworkSafetyFixtureUpstreamEchoVerificationReference,
  closureReview: NoNetworkSafetyFixturePrerequisiteClosureReview,
  checks: NoNetworkSafetyFixturePrerequisiteClosureReviewChecks,
  productionBlockers: NoNetworkSafetyFixturePrerequisiteClosureReviewMessage[],
  warnings: NoNetworkSafetyFixturePrerequisiteClosureReviewMessage[],
  recommendations: NoNetworkSafetyFixturePrerequisiteClosureReviewMessage[],
): NoNetworkSafetyFixturePrerequisiteClosureReviewSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV324CheckCount: sourceNodeV324.sourceCheckCount,
    sourceNodeV324PassedCheckCount: sourceNodeV324.sourcePassedCheckCount,
    originalPrerequisiteCount: closureReview.originalPrerequisiteCount,
    completedPrerequisiteCount: closureReview.completedPrerequisiteCount,
    remainingPrerequisiteCount: closureReview.remainingPrerequisiteCount,
    requiredFieldCount: sourceNodeV324.requiredFieldCount,
    prohibitedFieldCount: sourceNodeV324.prohibitedFieldCount,
    rejectionReasonCount: sourceNodeV324.rejectionReasonCount,
    noGoBoundaryCount: sourceNodeV324.noGoBoundaryCount,
    upstreamEchoRequestCount: sourceNodeV324.upstreamEchoRequestCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
