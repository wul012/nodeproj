import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecordProfile,
  RuntimeShellChainDecisionNecessityProof,
  RuntimeShellChainNoGoCondition,
  RuntimeShellChainPrerequisite,
  RuntimeShellChainStopOrPrerequisiteDecisionRecord,
  RuntimeShellChainStopOrPrerequisiteDecisionRecordChecks,
  RuntimeShellChainStopOrPrerequisiteDecisionRecordMessage,
  RuntimeShellChainStopOrPrerequisiteDecisionRecordSummary,
  SourceNodeV303PostDecisionPlanIntakeUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecordTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecordMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecordRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-or-prerequisite-decision-record.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-or-prerequisite-decision-record";
const SOURCE_NODE_V303_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-plan-intake-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans2/v303-post-decision-plan-intake-upstream-echo-roadmap.md";
const RECOMMENDED_PARALLEL_JAVA_V141 = "Java v141 runtime shell chain stop/prerequisite decision echo";
const RECOMMENDED_PARALLEL_MINI_KV_V134 = "mini-kv v134 runtime shell chain stop/prerequisite non-participation receipt";

export function loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecordProfile {
  const sourceNodeV303 = createSourceNodeV303(input.config);
  const decisionRecord = createDecisionRecord(sourceNodeV303);
  const checks = createChecks(input.config, sourceNodeV303, decisionRecord);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord")
      .every(([, value]) => value);
  const decisionRecordState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord
    ? "runtime-shell-chain-stop-or-prerequisite-decision-record-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV303, decisionRecord, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver runtime shell chain stop-or-prerequisite decision record",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    decisionRecordState,
    runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell",
    readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord,
    readOnlyDecisionRecord: true,
    runtimeShellChainStopOrPrerequisiteDecisionRecordOnly: true,
    consumesNodeV303PostDecisionPlanIntakeUpstreamEchoVerification: true,
    readyForParallelJavaV141MiniKvV134EchoRequest:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord,
    readyForNodeV305StopPrerequisiteUpstreamEchoVerification: false,
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
    rawEndpointUrlParsed: false,
    rawEndpointUrlRendered: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    fakeSecretProviderInstantiated: false,
    fakeResolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    approvalLedgerWritten: false,
    automaticUpstreamStart: false,
    sourceNodeV303,
    decisionRecord,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      runtimeShellChainStopOrPrerequisiteDecisionRecordJson: ROUTE_PATH,
      runtimeShellChainStopOrPrerequisiteDecisionRecordMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV303Json: SOURCE_NODE_V303_ROUTE,
      sourceNodeV303Markdown: `${SOURCE_NODE_V303_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      recommendedParallelJavaV141: RECOMMENDED_PARALLEL_JAVA_V141,
      recommendedParallelMiniKvV134: RECOMMENDED_PARALLEL_MINI_KV_V134,
    },
    nextActions: [
      "Archive Node v304 as a blocked stop-or-prerequisite decision record, not as runtime shell approval.",
      "If continuing the chain, ask Java v141 and mini-kv v134 to echo this decision in parallel before Node v305.",
      "Keep credential values, raw endpoint URLs, provider clients, external requests, managed audit connections, schema migration, ledger writes, LOAD/COMPACT/RESTORE/SETNXEX, and auto-start blocked.",
    ],
  };
}

function createSourceNodeV303(
  config: AppConfig,
): SourceNodeV303PostDecisionPlanIntakeUpstreamEchoVerificationReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification({
    config,
  });

  return {
    sourceVersion: "Node v303",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForPostDecisionPlanIntakeUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: source.readOnlyUpstreamEchoVerification,
    activeNodeVerificationVersion: source.activeNodeVerificationVersion,
    legacyNodeV302ConsumerMarkerAccepted: source.legacyNodeV302ConsumerMarkerAccepted,
    verificationDigest: source.echoVerification.verificationDigest,
    sourceSpan: source.echoVerification.sourceSpan,
    sourceNodeV301Ready: source.echoVerification.sourceNodeV301Ready,
    sourceNodeV302QualityPassReady: source.echoVerification.sourceNodeV302QualityPassReady,
    javaV136EchoReady: source.echoVerification.javaV136EchoReady,
    miniKvV133ReceiptReady: source.echoVerification.miniKvV133ReceiptReady,
    upstreamEchoAligned: source.echoVerification.upstreamEchoAligned,
    sideEffectBoundariesAligned: source.echoVerification.sideEffectBoundariesAligned,
    implementationStillBlocked: source.echoVerification.implementationStillBlocked,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
    runtimeShellImplemented: source.runtimeShellImplemented,
    runtimeShellInvocationAllowed: source.runtimeShellInvocationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalLedgerWritten: source.approvalLedgerWritten,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createDecisionRecord(
  sourceNodeV303: SourceNodeV303PostDecisionPlanIntakeUpstreamEchoVerificationReference,
): RuntimeShellChainStopOrPrerequisiteDecisionRecord {
  const requiredPrerequisites = createRequiredPrerequisites();
  const explicitNoGoConditions = createNoGoConditions();
  const necessityProof = createNecessityProof();
  const missingRuntimePrerequisiteCount =
    requiredPrerequisites.filter((item) => item.status === "documented-missing").length;
  const record = {
    recordMode: "runtime-shell-chain-stop-or-prerequisite-decision-record-only" as const,
    decisionScope: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell" as const,
    sourceSpan: "Node v303 + Java v136 + mini-kv v133" as const,
    decision: "require-explicit-approval-prerequisites-before-runtime-shell" as const,
    decisionReason:
      "Node v303 aligned the post-decision intake echoes, but the runtime shell chain still lacks explicit operator approval, credential-handle readiness, no-network safety tests, abort semantics, and upstream echo of the prerequisite decision.",
    selectedPath: "continue-only-as-blocked-prerequisite-review" as const,
    stopRuntimeShellChainWithoutPrerequisites: true as const,
    allowsParallelJavaV141MiniKvV134EchoRequest: sourceNodeV303.readyForPostDecisionPlanIntakeUpstreamEchoVerification,
    allowsNodeV305BeforeUpstreamEcho: false as const,
    allowsDisabledRuntimeShellImplementation: false as const,
    allowsDisabledRuntimeShellInvocation: false as const,
    allowsRealResolverImplementation: false as const,
    allowsSecretProviderInstantiation: false as const,
    allowsResolverClientInstantiation: false as const,
    allowsCredentialValueRead: false as const,
    allowsRawEndpointUrlParse: false as const,
    allowsExternalRequest: false as const,
    allowsManagedAuditConnection: false as const,
    allowsSchemaMigration: false as const,
    allowsApprovalLedgerWrite: false as const,
    allowsAutomaticUpstreamStart: false as const,
    prerequisiteCount: requiredPrerequisites.length,
    missingRuntimePrerequisiteCount,
    noGoConditionCount: explicitNoGoConditions.length,
    requiredPrerequisites,
    explicitNoGoConditions,
    necessityProof,
  } satisfies Omit<RuntimeShellChainStopOrPrerequisiteDecisionRecord, "decisionDigest">;

  return {
    decisionDigest: sha256StableJson(record),
    ...record,
  };
}

function createRequiredPrerequisites(): RuntimeShellChainPrerequisite[] {
  return [
    prerequisite(
      "operator-approval-artifact",
      "Operator approval artifact",
      "missing: no signed operator approval artifact has been produced for runtime shell implementation",
    ),
    prerequisite(
      "credential-handle-readiness",
      "Credential handle readiness",
      "missing: only credential handle/review status can be referenced; credential value reading remains forbidden",
    ),
    prerequisite(
      "raw-endpoint-allowlist-review",
      "Raw endpoint allowlist review",
      "missing: endpoint handle can be reviewed, but raw endpoint URL parsing/rendering remains forbidden",
    ),
    prerequisite(
      "no-network-test-fixture",
      "No-network safety tests",
      "missing: no test has proven runtime shell code cannot dial managed audit before explicit approval",
    ),
    prerequisite(
      "manual-abort-and-rollback-semantics",
      "Manual abort and rollback semantics",
      "missing: abort semantics are documented as required, but no executable runtime shell abort contract exists",
    ),
    prerequisite(
      "java-mini-kv-prerequisite-echo",
      "Java/mini-kv prerequisite echo",
      "missing: Java v141 and mini-kv v134 have not yet echoed this stop/prerequisite decision",
    ),
  ];
}

function prerequisite(
  id: string,
  label: string,
  currentEvidence: string,
): RuntimeShellChainPrerequisite {
  return {
    id,
    label,
    currentEvidence,
    status: "documented-missing",
    requiredBeforeRuntimeShell: true,
  };
}

function createNoGoConditions(): RuntimeShellChainNoGoCondition[] {
  return [
    noGo("RUNTIME_SHELL_IMPLEMENTATION_REQUESTED", "Any next step asks Node to implement runtime shell code."),
    noGo("RUNTIME_SHELL_INVOCATION_REQUESTED", "Any next step asks Node to invoke a runtime shell."),
    noGo("CREDENTIAL_VALUE_READ_REQUESTED", "Any next step asks Node, Java, or mini-kv to read credential values."),
    noGo("RAW_ENDPOINT_URL_PARSE_REQUESTED", "Any next step asks Node to parse or render a raw endpoint URL."),
    noGo("PROVIDER_CLIENT_INSTANTIATION_REQUESTED", "Any next step asks Node to instantiate providers or resolver clients."),
    noGo("EXTERNAL_REQUEST_REQUESTED", "Any next step asks Node to send HTTP/TCP to managed audit."),
    noGo("LEDGER_OR_SCHEMA_WRITE_REQUESTED", "Any next step asks Java or Node to write ledger/schema state."),
    noGo("MINIKV_WRITE_OR_AUTHORITY_REQUESTED", "Any next step asks mini-kv to run LOAD/COMPACT/RESTORE/SETNXEX or become authority."),
  ];
}

function noGo(code: string, condition: string): RuntimeShellChainNoGoCondition {
  return { code, condition, action: "pause-and-do-not-implement-runtime-shell" };
}

function createNecessityProof(): RuntimeShellChainDecisionNecessityProof {
  return {
    blockerResolved:
      "v303 aligned the post-decision plan intake echoes, but did not decide whether the runtime shell chain should stop or require explicit approval prerequisites.",
    consumer: "Java v141 and mini-kv v134, then Node v305",
    whyV303CannotBeReused:
      "v303 verifies upstream echo alignment only; it does not enumerate missing prerequisites or publish a decision that Java and mini-kv can echo before any later runtime-shell discussion.",
    existingReportReuseDecision:
      "Reuse v303 as source evidence, but create v304 as the minimal decision layer that records stop/prerequisite requirements.",
    stopCondition:
      "Stop immediately if the next step requires credential values, raw endpoint URLs, provider/client instantiation, HTTP/TCP, runtime shell implementation or invocation, ledger/schema writes, mini-kv write/admin commands, or automatic upstream start.",
    proofComplete: true,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV303: SourceNodeV303PostDecisionPlanIntakeUpstreamEchoVerificationReference,
  decisionRecord: RuntimeShellChainStopOrPrerequisiteDecisionRecord,
): RuntimeShellChainStopOrPrerequisiteDecisionRecordChecks {
  return {
    sourceNodeV303Loaded:
      sourceNodeV303.profileVersion ===
      "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-plan-intake-upstream-echo-verification.v1",
    sourceNodeV303Ready: sourceNodeV303.readyForPostDecisionPlanIntakeUpstreamEchoVerification,
    sourceNodeV303UpstreamEchoAligned:
      sourceNodeV303.upstreamEchoAligned
      && sourceNodeV303.javaV136EchoReady
      && sourceNodeV303.miniKvV133ReceiptReady,
    sourceNodeV303KeepsRuntimeBlocked:
      sourceNodeV303.runtimeShellImplemented === false
      && sourceNodeV303.runtimeShellInvocationAllowed === false
      && sourceNodeV303.implementationStillBlocked,
    sourceNodeV303KeepsSideEffectsClosed:
      sourceNodeV303.executionAllowed === false
      && sourceNodeV303.connectsManagedAudit === false
      && sourceNodeV303.credentialValueRead === false
      && sourceNodeV303.rawEndpointUrlParsed === false
      && sourceNodeV303.externalRequestSent === false
      && sourceNodeV303.schemaMigrationExecuted === false
      && sourceNodeV303.approvalLedgerWritten === false
      && sourceNodeV303.automaticUpstreamStart === false
      && sourceNodeV303.sideEffectBoundariesAligned,
    decisionSelectsPrerequisiteGate:
      decisionRecord.decision === "require-explicit-approval-prerequisites-before-runtime-shell"
      && decisionRecord.selectedPath === "continue-only-as-blocked-prerequisite-review",
    decisionRecordBlocksRuntimeShell:
      decisionRecord.stopRuntimeShellChainWithoutPrerequisites
      && decisionRecord.allowsDisabledRuntimeShellImplementation === false
      && decisionRecord.allowsDisabledRuntimeShellInvocation === false
      && decisionRecord.allowsCredentialValueRead === false
      && decisionRecord.allowsRawEndpointUrlParse === false
      && decisionRecord.allowsExternalRequest === false
      && decisionRecord.allowsManagedAuditConnection === false,
    decisionRecordStillReadOnly:
      decisionRecord.allowsSchemaMigration === false
      && decisionRecord.allowsApprovalLedgerWrite === false
      && decisionRecord.allowsAutomaticUpstreamStart === false,
    requiredPrerequisitesDocumented:
      decisionRecord.prerequisiteCount === 6
      && decisionRecord.requiredPrerequisites.every((item) => item.requiredBeforeRuntimeShell),
    missingRuntimePrerequisitesBlockImplementation:
      decisionRecord.missingRuntimePrerequisiteCount === decisionRecord.prerequisiteCount,
    necessityProofComplete: decisionRecord.necessityProof.proofComplete,
    parallelJavaV141MiniKvV134EchoRecommended:
      decisionRecord.allowsParallelJavaV141MiniKvV134EchoRequest
      && decisionRecord.allowsNodeV305BeforeUpstreamEcho === false,
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord: false,
  };
}

function collectProductionBlockers(
  checks: RuntimeShellChainStopOrPrerequisiteDecisionRecordChecks,
): RuntimeShellChainStopOrPrerequisiteDecisionRecordMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: RuntimeShellChainStopOrPrerequisiteDecisionRecordMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV303Ready && checks.sourceNodeV303UpstreamEchoAligned,
      code: "NODE_V303_NOT_READY",
      source: "node-v303-post-decision-plan-intake-upstream-echo-verification",
      message: "Node v303 upstream echo verification must be ready before v304 decision record.",
    },
    {
      condition: checks.sourceNodeV303KeepsRuntimeBlocked && checks.sourceNodeV303KeepsSideEffectsClosed,
      code: "NODE_V303_BOUNDARY_OPEN",
      source: "node-v303-post-decision-plan-intake-upstream-echo-verification",
      message: "Node v303 must keep runtime shell and side-effect boundaries closed.",
    },
    {
      condition:
        checks.decisionSelectsPrerequisiteGate
        && checks.decisionRecordBlocksRuntimeShell
        && checks.decisionRecordStillReadOnly
        && checks.requiredPrerequisitesDocumented
        && checks.missingRuntimePrerequisitesBlockImplementation,
      code: "DECISION_RECORD_NOT_BLOCKING_RUNTIME",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-or-prerequisite-decision-record",
      message: "v304 must remain a blocked prerequisite decision, not a runtime implementation approval.",
    },
    {
      condition: checks.necessityProofComplete && checks.parallelJavaV141MiniKvV134EchoRecommended,
      code: "NECESSITY_OR_CONSUMER_NOT_DOCUMENTED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-or-prerequisite-decision-record",
      message: "v304 must name its blocker, consumer, stop condition, and parallel Java/mini-kv echo lane.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v304 decision record.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v304 decision record.",
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

function collectWarnings(): RuntimeShellChainStopOrPrerequisiteDecisionRecordMessage[] {
  return [
    {
      code: "PREREQUISITE_DECISION_DOES_NOT_AUTHORIZE_RUNTIME",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-or-prerequisite-decision-record",
      message: "v304 documents missing prerequisites and recommends upstream echo only; it does not approve runtime shell implementation.",
    },
  ];
}

function collectRecommendations(): RuntimeShellChainStopOrPrerequisiteDecisionRecordMessage[] {
  return [
    {
      code: "RUN_JAVA_V141_AND_MINIKV_V134_IN_PARALLEL",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-or-prerequisite-decision-record",
      message: "If the chain continues, run Java v141 and mini-kv v134 in parallel as read-only echoes of this decision.",
    },
    {
      code: "KEEP_RUNTIME_SHELL_BLOCKED",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-or-prerequisite-decision-record",
      message: "Keep runtime shell implementation blocked until explicit approval artifacts and no-network safety evidence exist.",
    },
  ];
}

function createSummary(
  sourceNodeV303: SourceNodeV303PostDecisionPlanIntakeUpstreamEchoVerificationReference,
  decisionRecord: RuntimeShellChainStopOrPrerequisiteDecisionRecord,
  checks: RuntimeShellChainStopOrPrerequisiteDecisionRecordChecks,
  productionBlockers: RuntimeShellChainStopOrPrerequisiteDecisionRecordMessage[],
  warnings: RuntimeShellChainStopOrPrerequisiteDecisionRecordMessage[],
  recommendations: RuntimeShellChainStopOrPrerequisiteDecisionRecordMessage[],
): RuntimeShellChainStopOrPrerequisiteDecisionRecordSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceCheckCount: sourceNodeV303.checkCount,
    sourcePassedCheckCount: sourceNodeV303.passedCheckCount,
    sourceProductionBlockerCount: sourceNodeV303.productionBlockerCount,
    sourceWarningCount: sourceNodeV303.warningCount,
    sourceRecommendationCount: sourceNodeV303.recommendationCount,
    prerequisiteCount: decisionRecord.prerequisiteCount,
    missingRuntimePrerequisiteCount: decisionRecord.missingRuntimePrerequisiteCount,
    noGoConditionCount: decisionRecord.noGoConditionCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
