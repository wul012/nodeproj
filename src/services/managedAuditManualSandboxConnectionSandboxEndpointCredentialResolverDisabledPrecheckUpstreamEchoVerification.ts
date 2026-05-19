import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  booleanField,
  evidenceFile,
  numberField,
  objectArrayField,
  objectField,
  readJsonObject,
  snippet,
  snippetMatched,
  stringArrayField,
  stringField,
} from "./historicalEvidenceReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck.js";
import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckTypes.js";
import type {
  CredentialResolverDisabledPrecheckUpstreamEchoVerificationChecks,
  CredentialResolverDisabledPrecheckUpstreamEchoVerificationMessage,
  JavaV106CredentialResolverDisabledPrecheckEchoMarkerReference,
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationProfile,
  MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference,
  SourceNodeV262CredentialResolverDisabledPrecheckReference,
  VerificationSnippetMatch,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationTypes.js";
export {
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification";
const NODE_V262_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck";
const ACTIVE_PLAN = "docs/plans/v260-post-credential-resolver-decision-roadmap.md";

const JAVA_V106_RUNBOOK = "D:/javaproj/advanced-order-platform/c/106/解释/说明.md";
const JAVA_V106_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/109-version-106-sandbox-endpoint-credential-resolver-disabled-precheck-echo-marker.md";
const JAVA_V106_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarkerBuilder.java";
const JAVA_V106_RECORDS =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverDisabledPrecheckEchoRecords.java";

const MINI_KV_V115_RECEIPT =
  "D:/C/mini-kv/fixtures/release/disabled-credential-resolver-precheck-non-participation-receipt.json";
const MINI_KV_V115_RUNBOOK = "D:/C/mini-kv/c/115/解释/说明.md";
const MINI_KV_V115_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/171-version-115-disabled-credential-resolver-precheck-non-participation-receipt.md";

const REQUIRED_ENV_HANDLE_NAMES = [
  "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_ENABLED",
  "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_RESOLUTION_ENABLED",
  "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
  "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
  "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE",
  "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER",
] as const;

const OPT_IN_GATE_NAMES = [
  "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_ENABLED",
  "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_RESOLUTION_ENABLED",
] as const;

const FAILURE_CLASS_CODES = [
  "RESOLVER_DISABLED",
  "APPROVAL_MARKER_MISSING",
  "CREDENTIAL_HANDLE_MISSING",
  "CREDENTIAL_VALUE_REQUESTED",
  "RAW_ENDPOINT_URL_REQUESTED",
  "EXTERNAL_REQUEST_REQUESTED",
  "SCHEMA_MIGRATION_REQUESTED",
] as const;

const DRY_RUN_RESPONSE_FIELDS = [
  "readyState",
  "resolverMode",
  "resolverClientInstantiated",
  "secretProviderInstantiated",
  "credentialValueRead",
  "credentialValueLoaded",
  "rawEndpointUrlParsed",
  "externalRequestSent",
  "connectsManagedAudit",
  "schemaMigrationExecuted",
  "failureClassCount",
  "nextAction",
] as const;

const INHERITED_NO_GO_CONDITIONS = [
  "CREDENTIAL_VALUE_REQUIRED",
  "RAW_ENDPOINT_URL_REQUIRED",
  "REAL_CONNECTION_REQUIRED",
  "EXTERNAL_REQUEST_REQUIRED",
  "SCHEMA_MIGRATION_REQUIRED",
  "UPSTREAM_WRITE_REQUIRED",
  "AUTO_START_REQUIRED",
  "MINI_KV_BACKEND_REQUIRED",
  "PRODUCTION_WINDOW_REQUIRED",
] as const;

export function loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationProfile {
  const sourceNodeV262 = createSourceNodeV262(
    loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck({ config: input.config }),
  );
  const javaV106 = createJavaV106Reference();
  const miniKvV115 = createMiniKvV115Reference();
  const checks = createChecks(input.config, sourceNodeV262, javaV106, miniKvV115);
  checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification
    ? "sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification-ready"
    : "blocked";
  const echoVerification = {
    verificationDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      verificationState,
      sourcePrecheckDigest: sourceNodeV262.precheckDigest,
      javaV106Ready: javaV106.readyForNodeV263SandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification,
      miniKvV115ReceiptDigest: miniKvV115.receiptDigest,
      checks,
    }),
    verificationMode:
      "java-v106-plus-mini-kv-v115-disabled-credential-resolver-precheck-upstream-echo-verification-only" as const,
    sourceSpan: "Node v262 + Java v106 + mini-kv v115" as const,
    disabledPrecheckAligned: checks.disabledPrecheckAligned,
    requiredEnvHandlesAligned: checks.requiredEnvHandlesAligned,
    optInGatesAligned: checks.optInGatesAligned,
    failureTaxonomyAligned: checks.failureTaxonomyAligned,
    dryRunResponseShapeAligned: checks.dryRunResponseShapeAligned,
    inheritedNoGoConditionsAligned: checks.inheritedNoGoConditionsAligned,
    sourceNodeV261Aligned: checks.sourceNodeV261Aligned,
    credentialBoundaryAligned: checks.credentialBoundaryAligned,
    rawEndpointBoundaryAligned: checks.rawEndpointBoundaryAligned,
    connectionBoundaryAligned: checks.connectionBoundaryAligned,
    writeBoundaryAligned: checks.writeBoundaryAligned,
    autoStartBoundaryAligned: checks.autoStartBoundaryAligned,
    miniKvNonParticipationAligned: checks.miniKvV115NonParticipationReady,
    nodeV263BlocksCredentialResolution: true as const,
  };
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection sandbox endpoint credential resolver disabled precheck upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    disabledCredentialResolverPrecheckOnly: true,
    credentialResolverExecutionAllowed: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    credentialValueRead: false,
    credentialValueLoaded: false,
    credentialValueStored: false,
    credentialValueIncluded: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlIncluded: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV262,
    upstreamEchoes: { javaV106, miniKvV115 },
    echoVerification,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount:
        javaV106.evidenceFiles.filter((file) => file.exists).length
        + miniKvV115.evidenceFiles.filter((file) => file.exists).length,
      matchedSnippetCount:
        javaV106.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
        + miniKvV115.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      sandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationJson: ROUTE_PATH,
      sandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV262Json: NODE_V262_ROUTE,
      javaV106Runbook: JAVA_V106_RUNBOOK,
      miniKvV115Receipt: MINI_KV_V115_RECEIPT,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Use Node v263 as the final read-only upstream echo gate for the disabled resolver precheck.",
      "Do not instantiate a resolver client, secret provider, credential loader, raw endpoint parser, or external request sender.",
      "If the next plan chooses a resolver shell, keep it test-only and require explicit Java/mini-kv echo before any real endpoint work.",
    ],
  };
}

function createSourceNodeV262(
  source: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckProfile,
): SourceNodeV262CredentialResolverDisabledPrecheckReference {
  const precheck = source.disabledCredentialResolverPrecheck;
  const reference = {
    sourceVersion: "Node v262" as const,
    profileVersion: source.profileVersion,
    precheckState: source.precheckState,
    readyForDisabledPrecheck:
      source.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck,
    precheckDigest: precheck.precheckDigest,
    precheckMode: precheck.precheckMode,
    resolverImplementationStatus: precheck.resolverImplementationStatus,
    secretProviderImplementationStatus: precheck.secretProviderImplementationStatus,
    requiredEnvHandleCount: precheck.requiredEnvHandleCount,
    optInGateCount: precheck.optInGateCount,
    failureClassCount: precheck.failureClassCount,
    dryRunResponseFieldCount: precheck.dryRunResponseFieldCount,
    inheritedNoGoConditionCount: precheck.inheritedNoGoConditionCount,
    requiredEnvHandleNames: precheck.requiredEnvHandles.map((handle) => handle.name),
    optInGateNames: precheck.optInGates.map((gate) => gate.gateName),
    failureClassCodes: precheck.failureTaxonomy.map((failure) => failure.code),
    dryRunResponseFields: [...precheck.dryRunResponseShape.fields],
    inheritedNoGoConditions: precheck.inheritedNoGoConditions,
    sourceNodeV261Ready: source.sourceNodeV261.readyForNodeV262CredentialResolverDisabledPrecheck,
    sourceVerificationMode: source.sourceNodeV261.verificationMode,
    sourceSpan: source.sourceNodeV261.sourceSpan,
    sourceBlocksCredentialResolution: !source.sourceNodeV261.credentialResolverExecutionAllowed,
    sourceCredentialBoundaryAligned: source.sourceNodeV261.credentialBoundaryAligned,
    sourceRawEndpointBoundaryAligned: source.sourceNodeV261.rawEndpointBoundaryAligned,
    sourceConnectionBoundaryAligned: source.sourceNodeV261.connectionBoundaryAligned,
    sourceWriteBoundaryAligned: source.sourceNodeV261.writeBoundaryAligned,
    sourceAutoStartBoundaryAligned: source.sourceNodeV261.autoStartBoundaryAligned,
    upstreamActionsStillDisabled: source.checks.upstreamActionsStillDisabled,
    resolverClientMayBeInstantiated: precheck.resolverClientMayBeInstantiated,
    secretProviderMayBeInstantiated: precheck.secretProviderMayBeInstantiated,
    credentialValueMayBeLoaded: precheck.credentialValueMayBeLoaded,
    rawEndpointUrlMayBeParsed: precheck.rawEndpointUrlMayBeParsed,
    externalRequestMayBeSent: precheck.externalRequestMayBeSent,
    optInGateRequired: precheck.optInGateRequired,
    credentialResolverExecutionAllowed: source.credentialResolverExecutionAllowed,
    credentialValueRead: source.credentialValueRead,
    credentialValueLoaded: source.credentialValueLoaded,
    credentialValueStored: source.credentialValueStored,
    credentialValueIncluded: source.credentialValueIncluded,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    rawEndpointUrlIncluded: source.rawEndpointUrlIncluded,
    externalRequestSent: source.externalRequestSent,
    secretProviderInstantiated: source.secretProviderInstantiated,
    resolverClientInstantiated: source.resolverClientInstantiated,
    connectsManagedAudit: source.connectsManagedAudit,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    automaticUpstreamStart: source.automaticUpstreamStart,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
    readyForNodeV263DisabledPrecheckUpstreamEchoVerification: false,
  };

  return {
    ...reference,
    readyForNodeV263DisabledPrecheckUpstreamEchoVerification:
      reference.readyForDisabledPrecheck
      && reference.precheckState === "sandbox-endpoint-credential-resolver-disabled-precheck-ready"
      && reference.precheckMode === "sandbox-endpoint-credential-resolver-disabled-precheck-only"
      && reference.sourceNodeV261Ready
      && reference.sourceVerificationMode === "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only"
      && reference.sourceSpan === "Node v260 + Java v105 + mini-kv v114"
      && reference.sourceBlocksCredentialResolution
      && reference.sourceCredentialBoundaryAligned
      && reference.sourceRawEndpointBoundaryAligned
      && reference.sourceConnectionBoundaryAligned
      && reference.sourceWriteBoundaryAligned
      && reference.sourceAutoStartBoundaryAligned
      && reference.upstreamActionsStillDisabled
      && reference.resolverImplementationStatus === "not-implemented"
      && reference.secretProviderImplementationStatus === "not-implemented"
      && reference.requiredEnvHandleCount === REQUIRED_ENV_HANDLE_NAMES.length
      && reference.optInGateCount === OPT_IN_GATE_NAMES.length
      && reference.failureClassCount === FAILURE_CLASS_CODES.length
      && reference.dryRunResponseFieldCount === DRY_RUN_RESPONSE_FIELDS.length
      && reference.inheritedNoGoConditionCount === INHERITED_NO_GO_CONDITIONS.length
      && arraysEqual(reference.requiredEnvHandleNames, [...REQUIRED_ENV_HANDLE_NAMES])
      && arraysEqual(reference.optInGateNames, [...OPT_IN_GATE_NAMES])
      && arraysEqual(reference.failureClassCodes, [...FAILURE_CLASS_CODES])
      && arraysEqual(reference.dryRunResponseFields, [...DRY_RUN_RESPONSE_FIELDS])
      && arraysEqual([...reference.inheritedNoGoConditions], [...INHERITED_NO_GO_CONDITIONS])
      && !reference.resolverClientMayBeInstantiated
      && !reference.secretProviderMayBeInstantiated
      && !reference.credentialValueMayBeLoaded
      && !reference.rawEndpointUrlMayBeParsed
      && !reference.externalRequestMayBeSent
      && reference.optInGateRequired
      && !reference.credentialResolverExecutionAllowed
      && !reference.credentialValueRead
      && !reference.credentialValueLoaded
      && !reference.credentialValueStored
      && !reference.credentialValueIncluded
      && !reference.rawEndpointUrlParsed
      && !reference.rawEndpointUrlIncluded
      && !reference.externalRequestSent
      && !reference.secretProviderInstantiated
      && !reference.resolverClientInstantiated
      && !reference.connectsManagedAudit
      && !reference.schemaMigrationExecuted
      && !reference.automaticUpstreamStart
      && reference.checkCount === reference.passedCheckCount
      && reference.checkCount === 24
      && reference.productionBlockerCount === 0
      && reference.warningCount === 2
      && reference.recommendationCount === 2,
  };
}

function createJavaV106Reference(): JavaV106CredentialResolverDisabledPrecheckEchoMarkerReference {
  const evidenceFiles = [
    evidenceFile("java-v106-runbook", JAVA_V106_RUNBOOK),
    evidenceFile("java-v106-walkthrough", JAVA_V106_WALKTHROUGH),
    evidenceFile("java-v106-builder", JAVA_V106_BUILDER),
    evidenceFile("java-v106-records", JAVA_V106_RECORDS),
  ];
  const expectedSnippets = [
    snippet("java-v106-marker-field", JAVA_V106_RUNBOOK, "managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker"),
    snippet("java-v106-response-schema", JAVA_V106_RUNBOOK, "response schema: java-release-approval-rehearsal-response-schema.v28"),
    snippet("java-v106-node-v262", JAVA_V106_RUNBOOK, "Node v262"),
    snippet("java-v106-node-v263", JAVA_V106_BUILDER, "readyForNodeV263SandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification"),
    snippet("java-v106-precheck-mode", JAVA_V106_BUILDER, "sandbox-endpoint-credential-resolver-disabled-precheck-only"),
    snippet("java-v106-source-mode", JAVA_V106_BUILDER, "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only"),
    snippet("java-v106-source-span", JAVA_V106_BUILDER, "Node v260 + Java v105 + mini-kv v114"),
    snippet("java-v106-required-env-count", JAVA_V106_BUILDER, "requiredEnvHandleCount=6"),
    snippet("java-v106-opt-in-count", JAVA_V106_BUILDER, "optInGateCount=2"),
    snippet("java-v106-failure-count", JAVA_V106_BUILDER, "failureClassCount=7"),
    snippet("java-v106-dry-run-count", JAVA_V106_BUILDER, "dryRunResponseFieldCount=12"),
    snippet("java-v106-inherited-count", JAVA_V106_BUILDER, "inheritedNoGoConditionCount=9"),
    snippet("java-v106-source-check-count", JAVA_V106_BUILDER, "SOURCE_CHECK_COUNT = 20"),
    snippet("java-v106-source-passed-count", JAVA_V106_BUILDER, "SOURCE_PASSED_CHECK_COUNT = 20"),
    snippet("java-v106-resolver-status", JAVA_V106_BUILDER, "RESOLVER_IMPLEMENTATION_STATUS = \"not-implemented\""),
    snippet("java-v106-secret-status", JAVA_V106_BUILDER, "SECRET_PROVIDER_IMPLEMENTATION_STATUS = \"not-implemented\""),
    snippet("java-v106-resolver-client-blocked", JAVA_V106_BUILDER, "resolverClientMayBeInstantiated=false"),
    snippet("java-v106-secret-provider-blocked", JAVA_V106_BUILDER, "secretProviderMayBeInstantiated=false"),
    snippet("java-v106-credential-load-blocked", JAVA_V106_BUILDER, "credentialValueMayBeLoaded=false"),
    snippet("java-v106-raw-endpoint-blocked", JAVA_V106_BUILDER, "rawEndpointUrlMayBeParsed=false"),
    snippet("java-v106-external-blocked", JAVA_V106_BUILDER, "externalRequestMayBeSent=false"),
    snippet("java-v106-side-effect-external", JAVA_V106_BUILDER, "sideEffectBoundary.externalRequestSent=false"),
    snippet("java-v106-side-effect-connection", JAVA_V106_BUILDER, "sideEffectBoundary.connectsManagedAudit=false"),
    snippet("java-v106-record-side-effect", JAVA_V106_RECORDS, "RehearsalSandboxEndpointCredentialResolverDisabledPrecheckSideEffectBoundary"),
    snippet("java-v106-walkthrough-summary", JAVA_V106_WALKTHROUGH, "给 Node v263 一个稳定字段继续消费"),
  ];
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const verificationDocumented = expectedSnippets.every((snippetMatch) => snippetMatch.matched);
  const reference = {
    sourceVersion: "Java v106" as const,
    tagLabel: "v106订单平台disabled-resolver-precheck-echo-marker",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    verificationDocumented,
    responseSchemaVersion: snippetMatched(expectedSnippets, "java-v106-response-schema")
      ? "java-release-approval-rehearsal-response-schema.v28" as const
      : "missing" as const,
    markerField: snippetMatched(expectedSnippets, "java-v106-marker-field")
      ? "managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker" as const
      : "missing" as const,
    consumedNodeVersion: snippetMatched(expectedSnippets, "java-v106-node-v262") ? "Node v262" as const : "missing" as const,
    consumedNodeProfile: snippetMatched(expectedSnippets, "java-v106-node-v262")
      ? "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck.v1"
      : "missing",
    nextNodeConsumerVersion: snippetMatched(expectedSnippets, "java-v106-node-v263") ? "Node v263" as const : "missing" as const,
    precheckMode: snippetMatched(expectedSnippets, "java-v106-precheck-mode")
      ? "sandbox-endpoint-credential-resolver-disabled-precheck-only"
      : "missing",
    sourceSpan: snippetMatched(expectedSnippets, "java-v106-source-span")
      ? "Node v261 credential resolver upstream echo verification"
      : "missing",
    sourceVerificationMode: snippetMatched(expectedSnippets, "java-v106-source-mode")
      ? "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only"
      : "missing",
    sourceNodeV261Span: snippetMatched(expectedSnippets, "java-v106-source-span")
      ? "Node v260 + Java v105 + mini-kv v114"
      : "missing",
    requiredEnvHandleCount: snippetMatched(expectedSnippets, "java-v106-required-env-count") ? 6 : 0,
    optInGateCount: snippetMatched(expectedSnippets, "java-v106-opt-in-count") ? 2 : 0,
    failureClassCount: snippetMatched(expectedSnippets, "java-v106-failure-count") ? 7 : 0,
    dryRunResponseFieldCount: snippetMatched(expectedSnippets, "java-v106-dry-run-count") ? 12 : 0,
    inheritedNoGoConditionCount: snippetMatched(expectedSnippets, "java-v106-inherited-count") ? 9 : 0,
    sourceCheckCount: snippetMatched(expectedSnippets, "java-v106-source-check-count") ? 20 : 0,
    sourcePassedCheckCount: snippetMatched(expectedSnippets, "java-v106-source-passed-count") ? 20 : 0,
    sourceProductionBlockerCount: 0,
    sourceWarningCount: 2,
    sourceRecommendationCount: 2,
    resolverImplementationStatus: snippetMatched(expectedSnippets, "java-v106-resolver-status") ? "not-implemented" : "missing",
    secretProviderImplementationStatus: snippetMatched(expectedSnippets, "java-v106-secret-status") ? "not-implemented" : "missing",
    resolverClientMayBeInstantiated: !snippetMatched(expectedSnippets, "java-v106-resolver-client-blocked"),
    secretProviderMayBeInstantiated: !snippetMatched(expectedSnippets, "java-v106-secret-provider-blocked"),
    credentialValueMayBeLoaded: !snippetMatched(expectedSnippets, "java-v106-credential-load-blocked"),
    rawEndpointUrlMayBeParsed: !snippetMatched(expectedSnippets, "java-v106-raw-endpoint-blocked"),
    externalRequestMayBeSent: !snippetMatched(expectedSnippets, "java-v106-external-blocked"),
    credentialResolverExecutionAllowed: false,
    connectsManagedAudit: !snippetMatched(expectedSnippets, "java-v106-side-effect-connection"),
    credentialValueRead: false,
    credentialValueLoaded: false,
    credentialValueStored: false,
    credentialValueIncluded: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlIncluded: false,
    externalRequestSent: !snippetMatched(expectedSnippets, "java-v106-side-effect-external"),
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    readyForManagedAuditSandboxAdapterConnection: false as const,
    readyForNodeV263SandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification: false,
  };

  return {
    ...reference,
    readyForNodeV263SandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification:
      reference.evidencePresent
      && reference.verificationDocumented
      && reference.responseSchemaVersion === "java-release-approval-rehearsal-response-schema.v28"
      && reference.markerField === "managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker"
      && reference.consumedNodeVersion === "Node v262"
      && reference.consumedNodeProfile
        === "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck.v1"
      && reference.nextNodeConsumerVersion === "Node v263"
      && reference.precheckMode === "sandbox-endpoint-credential-resolver-disabled-precheck-only"
      && reference.sourceVerificationMode === "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only"
      && reference.requiredEnvHandleCount === 6
      && reference.optInGateCount === 2
      && reference.failureClassCount === 7
      && reference.dryRunResponseFieldCount === 12
      && reference.inheritedNoGoConditionCount === 9
      && reference.sourceCheckCount === reference.sourcePassedCheckCount
      && reference.sourceCheckCount === 20
      && reference.sourceProductionBlockerCount === 0
      && reference.sourceWarningCount === 2
      && reference.sourceRecommendationCount === 2
      && reference.resolverImplementationStatus === "not-implemented"
      && reference.secretProviderImplementationStatus === "not-implemented"
      && !reference.resolverClientMayBeInstantiated
      && !reference.secretProviderMayBeInstantiated
      && !reference.credentialValueMayBeLoaded
      && !reference.rawEndpointUrlMayBeParsed
      && !reference.externalRequestMayBeSent
      && !reference.credentialResolverExecutionAllowed
      && !reference.connectsManagedAudit
      && !reference.credentialValueRead
      && !reference.credentialValueLoaded
      && !reference.credentialValueStored
      && !reference.credentialValueIncluded
      && !reference.rawEndpointUrlParsed
      && !reference.rawEndpointUrlIncluded
      && !reference.externalRequestSent
      && !reference.secretProviderInstantiated
      && !reference.resolverClientInstantiated
      && !reference.schemaMigrationExecuted
      && !reference.automaticUpstreamStart
      && !reference.readyForManagedAuditSandboxAdapterConnection,
  };
}

function createMiniKvV115Reference(): MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v115-receipt", MINI_KV_V115_RECEIPT),
    evidenceFile("mini-kv-v115-runbook", MINI_KV_V115_RUNBOOK),
    evidenceFile("mini-kv-v115-walkthrough", MINI_KV_V115_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v115-receipt-version", MINI_KV_V115_RECEIPT, "mini-kv-disabled-credential-resolver-precheck-non-participation-receipt.v1"),
    snippet("mini-kv-v115-consumer", MINI_KV_V115_RECEIPT, "Node v263 disabled credential resolver upstream echo verification"),
    snippet("mini-kv-v115-source-profile", MINI_KV_V115_RECEIPT, "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck.v1"),
    snippet("mini-kv-v115-required-count", MINI_KV_V115_RECEIPT, "\"source_required_env_handle_count\":6"),
    snippet("mini-kv-v115-failure-count", MINI_KV_V115_RECEIPT, "\"source_failure_class_count\":7"),
    snippet("mini-kv-v115-no-resolver-client", MINI_KV_V115_RECEIPT, "\"resolver_client_instantiated\":false"),
    snippet("mini-kv-v115-no-secret-provider", MINI_KV_V115_RECEIPT, "\"secret_provider_instantiated\":false"),
    snippet("mini-kv-v115-no-credential", MINI_KV_V115_RECEIPT, "\"credential_value_read_allowed\":false"),
    snippet("mini-kv-v115-no-raw-endpoint", MINI_KV_V115_RECEIPT, "\"raw_endpoint_url_parsed\":false"),
    snippet("mini-kv-v115-no-external", MINI_KV_V115_RECEIPT, "\"external_request_sent\":false"),
    snippet("mini-kv-v115-no-load", MINI_KV_V115_RECEIPT, "\"load_restore_compact_executed\":false"),
    snippet("mini-kv-v115-runbook", MINI_KV_V115_RUNBOOK, "Node v263"),
    snippet("mini-kv-v115-walkthrough", MINI_KV_V115_WALKTHROUGH, "Node v263 可以从真实 runtime smoke 里读取同一份边界证明"),
  ];
  const root = readJsonObject(MINI_KV_V115_RECEIPT);
  const receipt = objectField(root, "disabled_credential_resolver_precheck_non_participation_receipt");
  const disabledPrecheck = objectField(receipt, "disabled_precheck");
  const dryRunResponseShape = objectField(receipt, "dry_run_response_shape");
  const requiredEnvHandleNames = objectArrayField(receipt, "required_env_handles")
    .map((handle) => stringField(handle, "name"))
    .filter(isNonNullString);
  const optInGateNames = objectArrayField(receipt, "opt_in_gates")
    .map((gate) => stringField(gate, "gate_name"))
    .filter(isNonNullString);
  const reference = {
    sourceVersion: "mini-kv v115" as const,
    tagLabel: "第一百一十五版禁用凭证解析器预检非参与回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    receiptVersion: stringField(root, "receipt_version") ?? "",
    releaseVersion: stringField(root, "release_version") ?? "",
    consumerHint: stringField(root, "consumer_hint") ?? "",
    receiptDigest: stringField(receipt, "receipt_digest") ?? "",
    sourcePrecheckProfileVersion: stringField(receipt, "source_precheck_profile_version") ?? "",
    sourcePrecheckState: stringField(receipt, "source_precheck_state") ?? "",
    sourcePrecheckMode: stringField(receipt, "source_precheck_mode") ?? "",
    sourceSpan: stringField(receipt, "source_span") ?? "",
    sourceReadyForDisabledPrecheck: booleanField(receipt, "source_ready_for_disabled_credential_resolver_precheck") ?? false,
    sourceReadyForManagedAuditSandboxAdapterConnection:
      booleanField(receipt, "source_ready_for_managed_audit_sandbox_adapter_connection") ?? true,
    sourceReadOnlyDisabledPrecheck: booleanField(receipt, "source_read_only_disabled_precheck") ?? false,
    sourceDisabledCredentialResolverPrecheckOnly:
      booleanField(receipt, "source_disabled_credential_resolver_precheck_only") ?? false,
    sourceCredentialResolverExecutionAllowed:
      booleanField(receipt, "source_credential_resolver_execution_allowed") ?? true,
    sourceExecutionAllowed: booleanField(receipt, "source_execution_allowed") ?? true,
    sourceConnectsManagedAudit: booleanField(receipt, "source_connects_managed_audit") ?? true,
    sourceReadsManagedAuditCredential: booleanField(receipt, "source_reads_managed_audit_credential") ?? true,
    sourceStoresManagedAuditCredential: booleanField(receipt, "source_stores_managed_audit_credential") ?? true,
    sourceCredentialValueRead: booleanField(receipt, "source_credential_value_read") ?? true,
    sourceCredentialValueLoaded: booleanField(receipt, "source_credential_value_loaded") ?? true,
    sourceCredentialValueStored: booleanField(receipt, "source_credential_value_stored") ?? true,
    sourceCredentialValueIncluded: booleanField(receipt, "source_credential_value_included") ?? true,
    sourceRawEndpointUrlParsed: booleanField(receipt, "source_raw_endpoint_url_parsed") ?? true,
    sourceRawEndpointUrlIncluded: booleanField(receipt, "source_raw_endpoint_url_included") ?? true,
    sourceExternalRequestSent: booleanField(receipt, "source_external_request_sent") ?? true,
    sourceSecretProviderInstantiated: booleanField(receipt, "source_secret_provider_instantiated") ?? true,
    sourceResolverClientInstantiated: booleanField(receipt, "source_resolver_client_instantiated") ?? true,
    sourceSchemaMigrationExecuted: booleanField(receipt, "source_schema_migration_executed") ?? true,
    sourceAutomaticUpstreamStart: booleanField(receipt, "source_automatic_upstream_start") ?? true,
    sourceRequiredEnvHandleCount: numberField(receipt, "source_required_env_handle_count") ?? 0,
    sourceOptInGateCount: numberField(receipt, "source_opt_in_gate_count") ?? 0,
    sourceFailureClassCount: numberField(receipt, "source_failure_class_count") ?? 0,
    sourceDryRunResponseFieldCount: numberField(receipt, "source_dry_run_response_field_count") ?? 0,
    sourceInheritedNoGoConditionCount: numberField(receipt, "source_inherited_no_go_condition_count") ?? 0,
    sourceCheckCount: numberField(receipt, "source_check_count") ?? 0,
    sourcePassedCheckCount: numberField(receipt, "source_passed_check_count") ?? 0,
    sourceProductionBlockerCount: numberField(receipt, "source_production_blocker_count") ?? -1,
    sourceWarningCount: numberField(receipt, "source_warning_count") ?? -1,
    sourceRecommendationCount: numberField(receipt, "source_recommendation_count") ?? -1,
    sourceNodeV261Ready: booleanField(receipt, "source_node_v261_ready") ?? false,
    sourceNodeV261VerificationMode: stringField(receipt, "source_node_v261_verification_mode") ?? "",
    sourceNodeV261Span: stringField(receipt, "source_node_v261_span") ?? "",
    sourceNodeV261BlocksCredentialResolution:
      booleanField(receipt, "source_node_v261_blocks_credential_resolution") ?? false,
    sourceNodeV261CredentialBoundaryAligned:
      booleanField(receipt, "source_node_v261_credential_boundary_aligned") ?? false,
    sourceNodeV261RawEndpointBoundaryAligned:
      booleanField(receipt, "source_node_v261_raw_endpoint_boundary_aligned") ?? false,
    sourceNodeV261ConnectionBoundaryAligned:
      booleanField(receipt, "source_node_v261_connection_boundary_aligned") ?? false,
    sourceNodeV261WriteBoundaryAligned:
      booleanField(receipt, "source_node_v261_write_boundary_aligned") ?? false,
    sourceNodeV261AutoStartBoundaryAligned:
      booleanField(receipt, "source_node_v261_auto_start_boundary_aligned") ?? false,
    sourceNodeV261UpstreamActionsStillDisabled:
      booleanField(receipt, "source_node_v261_upstream_actions_still_disabled") ?? false,
    disabledPrecheckMode: stringField(disabledPrecheck, "precheck_mode") ?? "",
    disabledPrecheckReadyState: stringField(disabledPrecheck, "ready_state") ?? "",
    resolverImplementationStatus: stringField(disabledPrecheck, "resolver_implementation_status") ?? "",
    secretProviderImplementationStatus: stringField(disabledPrecheck, "secret_provider_implementation_status") ?? "",
    resolverClientMayBeInstantiated: booleanField(disabledPrecheck, "resolver_client_may_be_instantiated") ?? true,
    secretProviderMayBeInstantiated: booleanField(disabledPrecheck, "secret_provider_may_be_instantiated") ?? true,
    credentialValueMayBeLoaded: booleanField(disabledPrecheck, "credential_value_may_be_loaded") ?? true,
    rawEndpointUrlMayBeParsed: booleanField(disabledPrecheck, "raw_endpoint_url_may_be_parsed") ?? true,
    externalRequestMayBeSent: booleanField(disabledPrecheck, "external_request_may_be_sent") ?? true,
    optInGateRequired: booleanField(disabledPrecheck, "opt_in_gate_required") ?? false,
    requiredEnvHandleCount: numberField(disabledPrecheck, "required_env_handle_count") ?? 0,
    optInGateCount: numberField(disabledPrecheck, "opt_in_gate_count") ?? 0,
    failureClassCount: numberField(disabledPrecheck, "failure_class_count") ?? 0,
    dryRunResponseFieldCount: numberField(disabledPrecheck, "dry_run_response_field_count") ?? 0,
    inheritedNoGoConditionCount: numberField(disabledPrecheck, "inherited_no_go_condition_count") ?? 0,
    requiredEnvHandleNames,
    optInGateNames,
    failureTaxonomyCodes: stringArrayField(receipt, "failure_taxonomy_codes"),
    dryRunResponseFields: stringArrayField(dryRunResponseShape, "fields"),
    inheritedNoGoConditions: stringArrayField(receipt, "inherited_no_go_conditions"),
    readOnly: booleanField(receipt, "read_only") ?? false,
    executionAllowed: booleanField(receipt, "execution_allowed") ?? true,
    dryRunOnly: booleanField(receipt, "dry_run_only") ?? false,
    disabledCredentialResolverPrecheckOnly:
      booleanField(receipt, "disabled_credential_resolver_precheck_only") ?? false,
    credentialResolverImplemented: booleanField(receipt, "credential_resolver_implemented") ?? true,
    credentialResolverInvoked: booleanField(receipt, "credential_resolver_invoked") ?? true,
    secretProviderInstantiated: booleanField(receipt, "secret_provider_instantiated") ?? true,
    resolverClientInstantiated: booleanField(receipt, "resolver_client_instantiated") ?? true,
    nodeAutoStartAllowed: booleanField(receipt, "node_auto_start_allowed") ?? true,
    javaAutoStartAllowed: booleanField(receipt, "java_auto_start_allowed") ?? true,
    miniKvAutoStartAllowed: booleanField(receipt, "mini_kv_auto_start_allowed") ?? true,
    externalAuditServiceAutoStartAllowed: booleanField(receipt, "external_audit_service_auto_start_allowed") ?? true,
    connectionExecutionAllowed: booleanField(receipt, "connection_execution_allowed") ?? true,
    storageWriteAllowed: booleanField(receipt, "storage_write_allowed") ?? true,
    managedAuditWriteExecuted: booleanField(receipt, "managed_audit_write_executed") ?? true,
    approvalLedgerWriteAllowed: booleanField(receipt, "approval_ledger_write_allowed") ?? true,
    approvalLedgerWriteExecuted: booleanField(receipt, "approval_ledger_write_executed") ?? true,
    sandboxManagedAuditStateWriteAllowed: booleanField(receipt, "sandbox_managed_audit_state_write_allowed") ?? true,
    credentialValueRequired: booleanField(receipt, "credential_value_required") ?? true,
    credentialValueReadAllowed: booleanField(receipt, "credential_value_read_allowed") ?? true,
    credentialValueLoaded: booleanField(receipt, "credential_value_loaded") ?? true,
    credentialValueStored: booleanField(receipt, "credential_value_stored") ?? true,
    credentialValueIncluded: booleanField(receipt, "credential_value_included") ?? true,
    rawEndpointUrlParsed: booleanField(receipt, "raw_endpoint_url_parsed") ?? true,
    rawEndpointUrlIncluded: booleanField(receipt, "raw_endpoint_url_included") ?? true,
    externalRequestSent: booleanField(receipt, "external_request_sent") ?? true,
    schemaRehearsalExecutionAllowed: booleanField(receipt, "schema_rehearsal_execution_allowed") ?? true,
    schemaMigrationExecutionAllowed: booleanField(receipt, "schema_migration_execution_allowed") ?? true,
    restoreExecutionAllowed: booleanField(receipt, "restore_execution_allowed") ?? true,
    loadRestoreCompactExecuted: booleanField(receipt, "load_restore_compact_executed") ?? true,
    setnxexExecutionAllowed: booleanField(receipt, "setnxex_execution_allowed") ?? true,
    managedAuditStorageBackend: booleanField(receipt, "managed_audit_storage_backend") ?? true,
    sandboxAuditStorageBackend: booleanField(receipt, "sandbox_audit_storage_backend") ?? true,
    orderAuthoritative: booleanField(receipt, "order_authoritative") ?? true,
    readyForNodeV263Alignment: false,
  };

  return {
    ...reference,
    readyForNodeV263Alignment:
      reference.evidencePresent
      && reference.verificationDocumented
      && reference.receiptVersion === "mini-kv-disabled-credential-resolver-precheck-non-participation-receipt.v1"
      && reference.releaseVersion === "v115"
      && reference.consumerHint === "Node v263 disabled credential resolver upstream echo verification"
      && /^fnv1a64:[a-f0-9]{16}$/.test(reference.receiptDigest)
      && reference.sourcePrecheckProfileVersion
        === "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck.v1"
      && reference.sourcePrecheckState === "sandbox-endpoint-credential-resolver-disabled-precheck-ready"
      && reference.sourcePrecheckMode === "sandbox-endpoint-credential-resolver-disabled-precheck-only"
      && reference.sourceSpan === "Node v260 + Java v105 + mini-kv v114"
      && reference.sourceReadyForDisabledPrecheck
      && !reference.sourceReadyForManagedAuditSandboxAdapterConnection
      && reference.sourceReadOnlyDisabledPrecheck
      && reference.sourceDisabledCredentialResolverPrecheckOnly
      && !reference.sourceCredentialResolverExecutionAllowed
      && !reference.sourceExecutionAllowed
      && !reference.sourceConnectsManagedAudit
      && !reference.sourceReadsManagedAuditCredential
      && !reference.sourceStoresManagedAuditCredential
      && !reference.sourceCredentialValueRead
      && !reference.sourceCredentialValueLoaded
      && !reference.sourceCredentialValueStored
      && !reference.sourceCredentialValueIncluded
      && !reference.sourceRawEndpointUrlParsed
      && !reference.sourceRawEndpointUrlIncluded
      && !reference.sourceExternalRequestSent
      && !reference.sourceSecretProviderInstantiated
      && !reference.sourceResolverClientInstantiated
      && !reference.sourceSchemaMigrationExecuted
      && !reference.sourceAutomaticUpstreamStart
      && reference.sourceRequiredEnvHandleCount === 6
      && reference.sourceOptInGateCount === 2
      && reference.sourceFailureClassCount === 7
      && reference.sourceDryRunResponseFieldCount === 12
      && reference.sourceInheritedNoGoConditionCount === 9
      && reference.sourceCheckCount === reference.sourcePassedCheckCount
      && reference.sourceCheckCount === 24
      && reference.sourceProductionBlockerCount === 0
      && reference.sourceWarningCount === 2
      && reference.sourceRecommendationCount === 2
      && reference.sourceNodeV261Ready
      && reference.sourceNodeV261VerificationMode === "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only"
      && reference.sourceNodeV261Span === "Node v260 + Java v105 + mini-kv v114"
      && reference.sourceNodeV261BlocksCredentialResolution
      && reference.sourceNodeV261CredentialBoundaryAligned
      && reference.sourceNodeV261RawEndpointBoundaryAligned
      && reference.sourceNodeV261ConnectionBoundaryAligned
      && reference.sourceNodeV261WriteBoundaryAligned
      && reference.sourceNodeV261AutoStartBoundaryAligned
      && reference.sourceNodeV261UpstreamActionsStillDisabled
      && reference.disabledPrecheckMode === "sandbox-endpoint-credential-resolver-disabled-precheck-only"
      && reference.disabledPrecheckReadyState === "sandbox-endpoint-credential-resolver-disabled-precheck-ready"
      && reference.resolverImplementationStatus === "not-implemented"
      && reference.secretProviderImplementationStatus === "not-implemented"
      && !reference.resolverClientMayBeInstantiated
      && !reference.secretProviderMayBeInstantiated
      && !reference.credentialValueMayBeLoaded
      && !reference.rawEndpointUrlMayBeParsed
      && !reference.externalRequestMayBeSent
      && reference.optInGateRequired
      && reference.requiredEnvHandleCount === 6
      && reference.optInGateCount === 2
      && reference.failureClassCount === 7
      && reference.dryRunResponseFieldCount === 12
      && reference.inheritedNoGoConditionCount === 9
      && arraysEqual(reference.requiredEnvHandleNames, [...REQUIRED_ENV_HANDLE_NAMES])
      && arraysEqual(reference.optInGateNames, [...OPT_IN_GATE_NAMES])
      && arraysEqual(reference.failureTaxonomyCodes, [...FAILURE_CLASS_CODES])
      && arraysEqual(reference.dryRunResponseFields, [...DRY_RUN_RESPONSE_FIELDS])
      && arraysEqual(reference.inheritedNoGoConditions, [...INHERITED_NO_GO_CONDITIONS])
      && reference.readOnly
      && !reference.executionAllowed
      && reference.dryRunOnly
      && reference.disabledCredentialResolverPrecheckOnly
      && !reference.credentialResolverImplemented
      && !reference.credentialResolverInvoked
      && !reference.secretProviderInstantiated
      && !reference.resolverClientInstantiated
      && !reference.nodeAutoStartAllowed
      && !reference.javaAutoStartAllowed
      && !reference.miniKvAutoStartAllowed
      && !reference.externalAuditServiceAutoStartAllowed
      && !reference.connectionExecutionAllowed
      && !reference.storageWriteAllowed
      && !reference.managedAuditWriteExecuted
      && !reference.approvalLedgerWriteAllowed
      && !reference.approvalLedgerWriteExecuted
      && !reference.sandboxManagedAuditStateWriteAllowed
      && !reference.credentialValueRequired
      && !reference.credentialValueReadAllowed
      && !reference.credentialValueLoaded
      && !reference.credentialValueStored
      && !reference.credentialValueIncluded
      && !reference.rawEndpointUrlParsed
      && !reference.rawEndpointUrlIncluded
      && !reference.externalRequestSent
      && !reference.schemaRehearsalExecutionAllowed
      && !reference.schemaMigrationExecutionAllowed
      && !reference.restoreExecutionAllowed
      && !reference.loadRestoreCompactExecuted
      && !reference.setnxexExecutionAllowed
      && !reference.managedAuditStorageBackend
      && !reference.sandboxAuditStorageBackend
      && !reference.orderAuthoritative,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV262: SourceNodeV262CredentialResolverDisabledPrecheckReference,
  javaV106: JavaV106CredentialResolverDisabledPrecheckEchoMarkerReference,
  miniKvV115: MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference,
): CredentialResolverDisabledPrecheckUpstreamEchoVerificationChecks {
  return {
    sourceNodeV262Ready: sourceNodeV262.readyForNodeV263DisabledPrecheckUpstreamEchoVerification,
    javaV106EchoReady: javaV106.readyForNodeV263SandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification,
    miniKvV115NonParticipationReady: miniKvV115.readyForNodeV263Alignment,
    disabledPrecheckAligned:
      sourceNodeV262.precheckMode === "sandbox-endpoint-credential-resolver-disabled-precheck-only"
      && javaV106.precheckMode === sourceNodeV262.precheckMode
      && miniKvV115.disabledPrecheckMode === sourceNodeV262.precheckMode
      && miniKvV115.sourcePrecheckMode === sourceNodeV262.precheckMode
      && miniKvV115.sourcePrecheckState === sourceNodeV262.precheckState
      && javaV106.consumedNodeProfile === sourceNodeV262.profileVersion
      && !sourceNodeV262.resolverClientMayBeInstantiated
      && !sourceNodeV262.secretProviderMayBeInstantiated
      && !miniKvV115.resolverClientMayBeInstantiated
      && !miniKvV115.secretProviderMayBeInstantiated,
    requiredEnvHandlesAligned:
      sourceNodeV262.requiredEnvHandleCount === 6
      && javaV106.requiredEnvHandleCount === 6
      && miniKvV115.sourceRequiredEnvHandleCount === 6
      && miniKvV115.requiredEnvHandleCount === 6
      && arraysEqual(sourceNodeV262.requiredEnvHandleNames, [...REQUIRED_ENV_HANDLE_NAMES])
      && arraysEqual(miniKvV115.requiredEnvHandleNames, [...REQUIRED_ENV_HANDLE_NAMES]),
    optInGatesAligned:
      sourceNodeV262.optInGateCount === 2
      && javaV106.optInGateCount === 2
      && miniKvV115.sourceOptInGateCount === 2
      && miniKvV115.optInGateCount === 2
      && arraysEqual(sourceNodeV262.optInGateNames, [...OPT_IN_GATE_NAMES])
      && arraysEqual(miniKvV115.optInGateNames, [...OPT_IN_GATE_NAMES]),
    failureTaxonomyAligned:
      sourceNodeV262.failureClassCount === 7
      && javaV106.failureClassCount === 7
      && miniKvV115.sourceFailureClassCount === 7
      && miniKvV115.failureClassCount === 7
      && arraysEqual(sourceNodeV262.failureClassCodes, [...FAILURE_CLASS_CODES])
      && arraysEqual(miniKvV115.failureTaxonomyCodes, [...FAILURE_CLASS_CODES]),
    dryRunResponseShapeAligned:
      sourceNodeV262.dryRunResponseFieldCount === 12
      && javaV106.dryRunResponseFieldCount === 12
      && miniKvV115.sourceDryRunResponseFieldCount === 12
      && miniKvV115.dryRunResponseFieldCount === 12
      && arraysEqual(sourceNodeV262.dryRunResponseFields, [...DRY_RUN_RESPONSE_FIELDS])
      && arraysEqual(miniKvV115.dryRunResponseFields, [...DRY_RUN_RESPONSE_FIELDS])
      && miniKvV115.disabledPrecheckReadyState === sourceNodeV262.precheckState,
    inheritedNoGoConditionsAligned:
      sourceNodeV262.inheritedNoGoConditionCount === 9
      && javaV106.inheritedNoGoConditionCount === 9
      && miniKvV115.sourceInheritedNoGoConditionCount === 9
      && miniKvV115.inheritedNoGoConditionCount === 9
      && arraysEqual([...sourceNodeV262.inheritedNoGoConditions], [...INHERITED_NO_GO_CONDITIONS])
      && arraysEqual(miniKvV115.inheritedNoGoConditions, [...INHERITED_NO_GO_CONDITIONS]),
    sourceNodeV261Aligned:
      sourceNodeV262.sourceNodeV261Ready
      && miniKvV115.sourceNodeV261Ready
      && sourceNodeV262.sourceVerificationMode === "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only"
      && miniKvV115.sourceNodeV261VerificationMode === sourceNodeV262.sourceVerificationMode
      && miniKvV115.sourceNodeV261Span === sourceNodeV262.sourceSpan
      && sourceNodeV262.sourceBlocksCredentialResolution
      && miniKvV115.sourceNodeV261BlocksCredentialResolution
      && sourceNodeV262.sourceCredentialBoundaryAligned
      && miniKvV115.sourceNodeV261CredentialBoundaryAligned
      && sourceNodeV262.sourceRawEndpointBoundaryAligned
      && miniKvV115.sourceNodeV261RawEndpointBoundaryAligned
      && sourceNodeV262.sourceConnectionBoundaryAligned
      && miniKvV115.sourceNodeV261ConnectionBoundaryAligned
      && sourceNodeV262.sourceWriteBoundaryAligned
      && miniKvV115.sourceNodeV261WriteBoundaryAligned
      && sourceNodeV262.sourceAutoStartBoundaryAligned
      && miniKvV115.sourceNodeV261AutoStartBoundaryAligned,
    credentialBoundaryAligned:
      !sourceNodeV262.credentialResolverExecutionAllowed
      && !sourceNodeV262.credentialValueRead
      && !sourceNodeV262.credentialValueLoaded
      && !sourceNodeV262.credentialValueStored
      && !sourceNodeV262.credentialValueIncluded
      && !sourceNodeV262.credentialValueMayBeLoaded
      && !javaV106.credentialResolverExecutionAllowed
      && !javaV106.credentialValueRead
      && !javaV106.credentialValueLoaded
      && !javaV106.credentialValueStored
      && !javaV106.credentialValueIncluded
      && !javaV106.credentialValueMayBeLoaded
      && !miniKvV115.sourceCredentialResolverExecutionAllowed
      && !miniKvV115.sourceCredentialValueRead
      && !miniKvV115.sourceCredentialValueLoaded
      && !miniKvV115.sourceCredentialValueStored
      && !miniKvV115.sourceCredentialValueIncluded
      && !miniKvV115.credentialValueRequired
      && !miniKvV115.credentialValueReadAllowed
      && !miniKvV115.credentialValueLoaded
      && !miniKvV115.credentialValueStored
      && !miniKvV115.credentialValueIncluded,
    rawEndpointBoundaryAligned:
      !sourceNodeV262.rawEndpointUrlParsed
      && !sourceNodeV262.rawEndpointUrlIncluded
      && !sourceNodeV262.rawEndpointUrlMayBeParsed
      && !javaV106.rawEndpointUrlParsed
      && !javaV106.rawEndpointUrlIncluded
      && !javaV106.rawEndpointUrlMayBeParsed
      && !miniKvV115.sourceRawEndpointUrlParsed
      && !miniKvV115.sourceRawEndpointUrlIncluded
      && !miniKvV115.rawEndpointUrlParsed
      && !miniKvV115.rawEndpointUrlIncluded
      && !miniKvV115.rawEndpointUrlMayBeParsed,
    connectionBoundaryAligned:
      !sourceNodeV262.externalRequestSent
      && !sourceNodeV262.externalRequestMayBeSent
      && !sourceNodeV262.connectsManagedAudit
      && !javaV106.externalRequestSent
      && !javaV106.externalRequestMayBeSent
      && !javaV106.connectsManagedAudit
      && !miniKvV115.sourceConnectsManagedAudit
      && !miniKvV115.sourceExternalRequestSent
      && !miniKvV115.connectionExecutionAllowed
      && !miniKvV115.externalRequestSent
      && !miniKvV115.credentialResolverImplemented
      && !miniKvV115.credentialResolverInvoked
      && !miniKvV115.secretProviderInstantiated
      && !miniKvV115.resolverClientInstantiated,
    writeBoundaryAligned:
      !sourceNodeV262.schemaMigrationExecuted
      && !javaV106.schemaMigrationExecuted
      && !miniKvV115.sourceSchemaMigrationExecuted
      && !miniKvV115.schemaRehearsalExecutionAllowed
      && !miniKvV115.schemaMigrationExecutionAllowed
      && !miniKvV115.storageWriteAllowed
      && !miniKvV115.managedAuditWriteExecuted
      && !miniKvV115.approvalLedgerWriteAllowed
      && !miniKvV115.approvalLedgerWriteExecuted
      && !miniKvV115.sandboxManagedAuditStateWriteAllowed
      && !miniKvV115.restoreExecutionAllowed
      && !miniKvV115.loadRestoreCompactExecuted
      && !miniKvV115.setnxexExecutionAllowed
      && !miniKvV115.managedAuditStorageBackend
      && !miniKvV115.sandboxAuditStorageBackend
      && !miniKvV115.orderAuthoritative,
    autoStartBoundaryAligned:
      !sourceNodeV262.automaticUpstreamStart
      && !javaV106.automaticUpstreamStart
      && !miniKvV115.sourceAutomaticUpstreamStart
      && !miniKvV115.nodeAutoStartAllowed
      && !miniKvV115.javaAutoStartAllowed
      && !miniKvV115.miniKvAutoStartAllowed
      && !miniKvV115.externalAuditServiceAutoStartAllowed,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification: false,
  };
}

function collectProductionBlockers(
  checks: CredentialResolverDisabledPrecheckUpstreamEchoVerificationChecks,
): CredentialResolverDisabledPrecheckUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CredentialResolverDisabledPrecheckUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV262Ready,
      code: "NODE_V262_DISABLED_PRECHECK_NOT_READY",
      source: "node-v262-sandbox-endpoint-credential-resolver-disabled-precheck",
      message: "Node v262 must be ready before v263 can verify upstream disabled precheck echoes.",
    },
    {
      condition: checks.javaV106EchoReady,
      code: "JAVA_V106_DISABLED_PRECHECK_ECHO_NOT_READY",
      source: "java-v106-sandbox-endpoint-credential-resolver-disabled-precheck-echo-marker",
      message: "Java v106 must expose a disabled precheck echo marker for Node v263.",
    },
    {
      condition: checks.miniKvV115NonParticipationReady,
      code: "MINI_KV_V115_DISABLED_PRECHECK_NON_PARTICIPATION_NOT_READY",
      source: "mini-kv-v115-disabled-credential-resolver-precheck-non-participation-receipt",
      message: "mini-kv v115 must prove no resolver, no credential read, no endpoint parse, no writes, and no auto-start.",
    },
    {
      condition:
        checks.disabledPrecheckAligned
        && checks.requiredEnvHandlesAligned
        && checks.optInGatesAligned
        && checks.failureTaxonomyAligned
        && checks.dryRunResponseShapeAligned
        && checks.inheritedNoGoConditionsAligned
        && checks.sourceNodeV261Aligned,
      code: "DISABLED_PRECHECK_ECHO_NOT_ALIGNED",
      source:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification",
      message: "Node v262, Java v106, and mini-kv v115 must align on disabled precheck counts, shape, and source Node v261 boundary.",
    },
    {
      condition:
        checks.credentialBoundaryAligned
        && checks.rawEndpointBoundaryAligned
        && checks.connectionBoundaryAligned
        && checks.writeBoundaryAligned
        && checks.autoStartBoundaryAligned,
      code: "DISABLED_PRECHECK_SIDE_EFFECT_BOUNDARY_OPEN",
      source:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification",
      message: "Credential, raw endpoint, connection, write, resolver instantiation, and auto-start boundaries must remain closed.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v263 disabled resolver upstream echo verification.",
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

function collectWarnings(): CredentialResolverDisabledPrecheckUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "UPSTREAM_ECHO_ONLY",
      severity: "warning",
      source:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification",
      message: "v263 verifies read-only upstream evidence only; it does not instantiate a resolver client or secret provider.",
    },
    {
      code: "TEST_ONLY_SHELL_STILL_REQUIRES_PLAN",
      severity: "warning",
      source:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification",
      message: "Any future resolver shell must be test-only, explicitly planned, and still forbidden from reading credential values.",
    },
  ];
}

function collectRecommendations(): CredentialResolverDisabledPrecheckUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "WRITE_POST_V263_PLAN",
      severity: "recommendation",
      source:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification",
      message: "After v263, write a new plan before entering any credential resolver shell or fake secret provider contract.",
    },
    {
      code: "KEEP_REAL_RESOLVER_OUT_OF_SCOPE",
      severity: "recommendation",
      source:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification",
      message: "Do not add real credential resolution, raw endpoint parsing, external HTTP, schema migration, or storage writes.",
    },
  ];
}

function isNonNullString(value: string | null): value is string {
  return value !== null;
}

function arraysEqual(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}
