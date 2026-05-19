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
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract.js";
import type {
  CredentialResolverTestOnlyShellUpstreamEchoVerificationChecks,
  CredentialResolverTestOnlyShellUpstreamEchoVerificationMessage,
  JavaV107CredentialResolverTestOnlyShellEchoMarkerReference,
  JavaV109RehearsalResponseRecordsSplitOptimizationContext,
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationProfile,
  MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference,
  SourceNodeV264CredentialResolverTestOnlyShellContractReference,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationTypes.js";
export {
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification";
const NODE_V264_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract";
const ACTIVE_PLAN = "docs/plans/v263-post-disabled-resolver-echo-roadmap.md";

const JAVA_V107_RUNBOOK = "D:/javaproj/advanced-order-platform/c/107/解释/说明.md";
const JAVA_V107_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/110-version-107-sandbox-endpoint-credential-resolver-test-only-shell-echo-marker.md";
const JAVA_V107_MARKER_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarkerBuilder.java";
const JAVA_V107_CONTRACT_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellContractBuilder.java";

const JAVA_V109_RUNBOOK = "D:/javaproj/advanced-order-platform/c/109/解释/说明.md";
const JAVA_V109_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/112-version-109-release-approval-rehearsal-response-records-split.md";
const JAVA_V109_RECORDS =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalRehearsalResponseRecords.java";

const MINI_KV_V116_RECEIPT =
  "D:/C/mini-kv/fixtures/release/test-only-resolver-shell-non-participation-receipt.json";
const MINI_KV_V116_RUNBOOK = "D:/C/mini-kv/c/116/解释/说明.md";
const MINI_KV_V116_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/172-version-116-test-only-resolver-shell-non-participation-receipt.md";

const REQUEST_SHAPE_FIELDS = [
  "requestId",
  "operation",
  "credentialHandle",
  "endpointHandle",
  "resolverPolicyHandle",
  "approvalMarker",
  "approvalCorrelationId",
  "dryRun",
  "fakeResolverOnly",
] as const;

const RESPONSE_SHAPE_FIELDS = [
  "requestId",
  "status",
  "code",
  "fakeResolverOnly",
  "resolverClientInstantiated",
  "secretProviderInstantiated",
  "credentialValueRead",
  "credentialValueLoaded",
  "rawEndpointUrlParsed",
  "externalRequestSent",
  "connectsManagedAudit",
  "schemaMigrationExecuted",
  "productionRecordWritten",
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

const GUARD_CONDITION_CODES = [
  "SOURCE_V263_READY",
  "FAKE_RESOLVER_ONLY",
  "CREDENTIAL_HANDLE_ONLY",
  "ENDPOINT_HANDLE_ONLY",
  "RESOLVER_POLICY_HANDLE_REQUIRED",
  "APPROVAL_MARKER_REQUIRED",
  "UPSTREAM_ACTIONS_DISABLED",
  "NO_SECRET_PROVIDER",
  "NO_EXTERNAL_REQUEST",
  "NO_SCHEMA_MIGRATION",
] as const;

export function loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationProfile {
  const sourceNodeV264 = createSourceNodeV264(input.config);
  const javaV107 = createJavaV107Reference();
  const miniKvV116 = createMiniKvV116Reference();
  const javaV109 = createJavaV109OptimizationContext();
  const checks = createChecks(input.config, sourceNodeV264, javaV107, miniKvV116, javaV109);
  checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification
    ? "sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-ready"
    : "blocked";
  const echoVerification = {
    verificationDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      verificationState,
      nodeV264ContractDigest: sourceNodeV264.contractDigest,
      miniKvV116ReceiptDigest: miniKvV116.receiptDigest,
      checks,
    }),
    verificationMode:
      "java-v107-plus-mini-kv-v116-test-only-resolver-shell-upstream-echo-verification-only" as const,
    sourceSpan: "Node v264 + Java v107 + mini-kv v116" as const,
    testOnlyShellContractAligned: checks.testOnlyShellContractAligned,
    requestShapeAligned: checks.requestShapeAligned,
    responseShapeAligned: checks.responseShapeAligned,
    failureMappingAligned: checks.failureMappingAligned,
    guardConditionsAligned: checks.guardConditionsAligned,
    fakeResolverProbeAligned: checks.fakeResolverProbeAligned,
    credentialBoundaryAligned: checks.credentialBoundaryAligned,
    rawEndpointBoundaryAligned: checks.rawEndpointBoundaryAligned,
    connectionBoundaryAligned: checks.connectionBoundaryAligned,
    writeBoundaryAligned: checks.writeBoundaryAligned,
    autoStartBoundaryAligned: checks.autoStartBoundaryAligned,
    miniKvNonParticipationAligned: checks.miniKvNonParticipationAligned,
    javaV109OptimizationContextAligned: checks.javaV109OptimizationContextReady,
    nodeV265KeepsRealResolverOutOfScope: true as const,
  };
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection sandbox endpoint credential resolver test-only shell upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    testOnlyResolverShellUpstreamEchoVerificationOnly: true,
    fakeResolverOnly: true,
    handleOnlyRequest: true,
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
    sourceNodeV264,
    upstreamEchoes: { javaV107, miniKvV116 },
    optimizationContext: { javaV109 },
    echoVerification,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount:
        javaV107.evidenceFiles.filter((file) => file.exists).length
        + miniKvV116.evidenceFiles.filter((file) => file.exists).length
        + javaV109.evidenceFiles.filter((file) => file.exists).length,
      matchedSnippetCount:
        javaV107.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
        + miniKvV116.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
        + javaV109.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
      requestShapeFieldCount: sourceNodeV264.requestShapeFieldCount,
      responseShapeFieldCount: sourceNodeV264.responseShapeFieldCount,
      failureMappingCount: sourceNodeV264.failureMappingCount,
      guardConditionCount: sourceNodeV264.guardConditionCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      sandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationJson: ROUTE_PATH,
      sandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV264Json: NODE_V264_ROUTE,
      javaV107Runbook: JAVA_V107_RUNBOOK,
      javaV109OptimizationRunbook: JAVA_V109_RUNBOOK,
      miniKvV116Receipt: MINI_KV_V116_RECEIPT,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Use Node v265 as the read-only upstream echo gate for the test-only credential resolver shell.",
      "Treat Java v109 as an optimization context only; Java v107 and mini-kv v116 remain the hard upstream evidence for v265.",
      "Proceed to Node v266 archive verification before any new resolver surface; do not instantiate a real secret provider or external endpoint client.",
    ],
  };
}

function createSourceNodeV264(
  config: AppConfig,
): SourceNodeV264CredentialResolverTestOnlyShellContractReference {
  const source = loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract({ config });
  const contract = source.resolverShellContract;
  const reference = {
    sourceVersion: "Node v264" as const,
    profileVersion: source.profileVersion,
    shellContractState: source.shellContractState,
    readyForTestOnlyShellContract:
      source.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract,
    contractDigest: contract.contractDigest,
    shellName: contract.shellName,
    shellMode: contract.shellMode,
    resolverKind: contract.resolverKind,
    testOnlyShell: source.testOnlyShell,
    readOnlyContract: source.readOnlyContract,
    fakeResolverOnly: source.fakeResolverOnly,
    handleOnlyRequest: source.handleOnlyRequest,
    requestShapeFieldCount: contract.requestShapeFieldCount,
    responseShapeFieldCount: contract.responseShapeFieldCount,
    failureMappingCount: contract.failureMappingCount,
    guardConditionCount: contract.guardConditionCount,
    requestShapeFields: contract.requestShape.fields,
    responseShapeFields: contract.responseShape.fields,
    failureClassCodes: contract.failureMapping.map((mapping) => mapping.sourceFailureCode),
    guardConditionCodes: contract.guardConditions.map((guard) => guard.code),
    sourceNodeV263Ready: source.sourceNodeV263.readyForNodeV264CredentialResolverTestOnlyShellContract,
    sourceVerificationMode: source.sourceNodeV263.verificationMode,
    sourceSpan: source.sourceNodeV263.sourceSpan,
    sourceCheckCount: source.sourceNodeV263.checkCount,
    sourcePassedCheckCount: source.sourceNodeV263.passedCheckCount,
    sourceProductionBlockerCount: source.sourceNodeV263.productionBlockerCount,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
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
    fakeResolverProbeCovered: source.checks.fakeResolverProbeCovered,
    fakeResolverProbeNoCredentialRead: source.checks.fakeResolverProbeNoCredentialRead,
    fakeResolverProbeNoExternalRequest: source.checks.fakeResolverProbeNoExternalRequest,
    fakeResolverProbeNoProductionWrite: source.checks.fakeResolverProbeNoProductionWrite,
    readyForNodeV265TestOnlyShellUpstreamEchoVerification: false,
  };

  return {
    ...reference,
    readyForNodeV265TestOnlyShellUpstreamEchoVerification:
      reference.readyForTestOnlyShellContract
      && reference.shellContractState === "sandbox-endpoint-credential-resolver-test-only-shell-contract-ready"
      && reference.profileVersion
        === "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract.v1"
      && reference.shellMode === "test-only-fake-resolver-contract"
      && reference.resolverKind === "fake-in-memory"
      && reference.testOnlyShell
      && reference.readOnlyContract
      && reference.fakeResolverOnly
      && reference.handleOnlyRequest
      && arraysEqual(reference.requestShapeFields, REQUEST_SHAPE_FIELDS)
      && arraysEqual(reference.responseShapeFields, RESPONSE_SHAPE_FIELDS)
      && arraysEqual(reference.failureClassCodes, FAILURE_CLASS_CODES)
      && arraysEqual(reference.guardConditionCodes, GUARD_CONDITION_CODES)
      && reference.requestShapeFieldCount === REQUEST_SHAPE_FIELDS.length
      && reference.responseShapeFieldCount === RESPONSE_SHAPE_FIELDS.length
      && reference.failureMappingCount === FAILURE_CLASS_CODES.length
      && reference.guardConditionCount === GUARD_CONDITION_CODES.length
      && reference.sourceNodeV263Ready
      && reference.sourceVerificationMode
        === "java-v106-plus-mini-kv-v115-disabled-credential-resolver-precheck-upstream-echo-verification-only"
      && reference.sourceSpan === "Node v262 + Java v106 + mini-kv v115"
      && reference.sourceCheckCount === reference.sourcePassedCheckCount
      && reference.sourceCheckCount === 19
      && reference.checkCount === reference.passedCheckCount
      && reference.checkCount === 20
      && reference.productionBlockerCount === 0
      && reference.warningCount === 2
      && reference.recommendationCount === 2
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
      && reference.fakeResolverProbeCovered
      && reference.fakeResolverProbeNoCredentialRead
      && reference.fakeResolverProbeNoExternalRequest
      && reference.fakeResolverProbeNoProductionWrite,
  };
}

function createJavaV107Reference(): JavaV107CredentialResolverTestOnlyShellEchoMarkerReference {
  const evidenceFiles = [
    evidenceFile("java-v107-runbook", JAVA_V107_RUNBOOK),
    evidenceFile("java-v107-walkthrough", JAVA_V107_WALKTHROUGH),
    evidenceFile("java-v107-marker-builder", JAVA_V107_MARKER_BUILDER),
    evidenceFile("java-v107-contract-builder", JAVA_V107_CONTRACT_BUILDER),
  ];
  const expectedSnippets = [
    snippet("java-v107-marker-field", JAVA_V107_RUNBOOK, "managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker"),
    snippet("java-v107-response-schema", JAVA_V107_RUNBOOK, "java-release-approval-rehearsal-response-schema.v29"),
    snippet("java-v107-node-v264", JAVA_V107_RUNBOOK, "Node v264"),
    snippet("java-v107-node-v265", JAVA_V107_MARKER_BUILDER, "readyForNodeV265SandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification"),
    snippet("java-v107-source-span", JAVA_V107_MARKER_BUILDER, "Node v264 credential resolver test-only shell contract"),
    snippet("java-v107-shell-mode", JAVA_V107_CONTRACT_BUILDER, "test-only-fake-resolver-contract"),
    snippet("java-v107-shell-name", JAVA_V107_CONTRACT_BUILDER, "ManagedAuditSandboxEndpointCredentialResolverTestOnlyShell"),
    snippet("java-v107-resolver-kind", JAVA_V107_CONTRACT_BUILDER, "fake-in-memory"),
    snippet("java-v107-request-count", JAVA_V107_MARKER_BUILDER, "resolverShellContract.requestShapeFieldCount=9"),
    snippet("java-v107-response-count", JAVA_V107_MARKER_BUILDER, "resolverShellContract.responseShapeFieldCount=13"),
    snippet("java-v107-failure-count", JAVA_V107_MARKER_BUILDER, "resolverShellContract.failureMappingCount=7"),
    snippet("java-v107-guard-count", JAVA_V107_MARKER_BUILDER, "resolverShellContract.guardConditionCount=10"),
    snippet("java-v107-fake-only", JAVA_V107_MARKER_BUILDER, "resolverShellContract.fakeResolverOnly=true"),
    snippet("java-v107-credential-value-blocked", JAVA_V107_MARKER_BUILDER, "resolverShellContract.requestShape.credentialValueAccepted=false"),
    snippet("java-v107-raw-endpoint-blocked", JAVA_V107_MARKER_BUILDER, "resolverShellContract.requestShape.rawEndpointUrlAccepted=false"),
    snippet("java-v107-resolver-client-blocked", JAVA_V107_MARKER_BUILDER, "resolverShellContract.responseShape.resolverClientInstantiated=false"),
    snippet("java-v107-secret-provider-blocked", JAVA_V107_MARKER_BUILDER, "resolverShellContract.responseShape.secretProviderInstantiated=false"),
    snippet("java-v107-external-blocked", JAVA_V107_MARKER_BUILDER, "resolverShellContract.responseShape.externalRequestSent=false"),
    snippet("java-v107-fake-probe-credential", JAVA_V107_MARKER_BUILDER, "fakeResolverProbe.credentialValueRead=false"),
    snippet("java-v107-side-effect-connection", JAVA_V107_MARKER_BUILDER, "sideEffectBoundary.connectsManagedAudit=false"),
    snippet("java-v107-code-request-fields", JAVA_V107_CONTRACT_BUILDER, "REQUEST_SHAPE_FIELDS = List.of"),
    snippet("java-v107-code-response-fields", JAVA_V107_CONTRACT_BUILDER, "RESPONSE_SHAPE_FIELDS = List.of"),
    snippet("java-v107-code-failure-codes", JAVA_V107_CONTRACT_BUILDER, "FAILURE_CLASS_CODES = List.of"),
    snippet("java-v107-code-guard-codes", JAVA_V107_CONTRACT_BUILDER, "GUARD_CONDITION_CODES = List.of"),
    snippet("java-v107-no-real-resolver", JAVA_V107_RUNBOOK, "不实现真实 resolver"),
    snippet("java-v107-walkthrough-summary", JAVA_V107_WALKTHROUGH, "给 Node v265 upstream echo verification 一个稳定字段"),
  ];
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const verificationDocumented = expectedSnippets.every((snippetMatch) => snippetMatch.matched);
  const reference = {
    sourceVersion: "Java v107" as const,
    tagLabel: "v107订单平台test-only-resolver-shell-echo-marker",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    verificationDocumented,
    responseSchemaVersion: snippetMatched(expectedSnippets, "java-v107-response-schema")
      ? "java-release-approval-rehearsal-response-schema.v29" as const
      : "missing" as const,
    markerField: snippetMatched(expectedSnippets, "java-v107-marker-field")
      ? "managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker" as const
      : "missing" as const,
    consumedNodeVersion: snippetMatched(expectedSnippets, "java-v107-node-v264") ? "Node v264" as const : "missing" as const,
    consumedNodeProfile: snippetMatched(expectedSnippets, "java-v107-node-v264")
      ? "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract.v1"
      : "missing",
    nextNodeConsumerVersion: snippetMatched(expectedSnippets, "java-v107-node-v265") ? "Node v265" as const : "missing" as const,
    sourceSpan: snippetMatched(expectedSnippets, "java-v107-source-span")
      ? "Node v264 credential resolver test-only shell contract"
      : "missing",
    shellMode: snippetMatched(expectedSnippets, "java-v107-shell-mode") ? "test-only-fake-resolver-contract" : "missing",
    shellName: snippetMatched(expectedSnippets, "java-v107-shell-name")
      ? "ManagedAuditSandboxEndpointCredentialResolverTestOnlyShell"
      : "missing",
    resolverKind: snippetMatched(expectedSnippets, "java-v107-resolver-kind") ? "fake-in-memory" : "missing",
    requestShapeFieldCount: snippetMatched(expectedSnippets, "java-v107-request-count") ? 9 : 0,
    responseShapeFieldCount: snippetMatched(expectedSnippets, "java-v107-response-count") ? 13 : 0,
    failureMappingCount: snippetMatched(expectedSnippets, "java-v107-failure-count") ? 7 : 0,
    guardConditionCount: snippetMatched(expectedSnippets, "java-v107-guard-count") ? 10 : 0,
    fakeResolverProbeCount: snippetMatched(expectedSnippets, "java-v107-fake-probe-credential") ? 1 : 0,
    requestShapeEchoed:
      snippetMatched(expectedSnippets, "java-v107-code-request-fields")
      && snippetMatched(expectedSnippets, "java-v107-credential-value-blocked")
      && snippetMatched(expectedSnippets, "java-v107-raw-endpoint-blocked"),
    responseShapeEchoed:
      snippetMatched(expectedSnippets, "java-v107-code-response-fields")
      && snippetMatched(expectedSnippets, "java-v107-resolver-client-blocked")
      && snippetMatched(expectedSnippets, "java-v107-secret-provider-blocked")
      && snippetMatched(expectedSnippets, "java-v107-external-blocked"),
    failureMappingEchoed: snippetMatched(expectedSnippets, "java-v107-code-failure-codes"),
    guardConditionsEchoed: snippetMatched(expectedSnippets, "java-v107-code-guard-codes"),
    fakeResolverProbeEchoed: snippetMatched(expectedSnippets, "java-v107-fake-probe-credential"),
    fakeResolverOnlyEchoed: snippetMatched(expectedSnippets, "java-v107-fake-only"),
    sideEffectBoundaryClosed: snippetMatched(expectedSnippets, "java-v107-side-effect-connection"),
    credentialResolverExecutionAllowed: false,
    connectsManagedAudit: !snippetMatched(expectedSnippets, "java-v107-side-effect-connection"),
    credentialValueRead: !snippetMatched(expectedSnippets, "java-v107-fake-probe-credential"),
    credentialValueLoaded: false,
    credentialValueStored: false,
    credentialValueIncluded: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlIncluded: false,
    externalRequestSent: !snippetMatched(expectedSnippets, "java-v107-external-blocked"),
    secretProviderInstantiated: !snippetMatched(expectedSnippets, "java-v107-secret-provider-blocked"),
    resolverClientInstantiated: !snippetMatched(expectedSnippets, "java-v107-resolver-client-blocked"),
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    productionRecordWritten: false,
    readyForManagedAuditSandboxAdapterConnection: false as const,
    readyForNodeV265SandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification: false,
  };

  return {
    ...reference,
    readyForNodeV265SandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification:
      reference.evidencePresent
      && reference.verificationDocumented
      && reference.responseSchemaVersion === "java-release-approval-rehearsal-response-schema.v29"
      && reference.markerField === "managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker"
      && reference.consumedNodeVersion === "Node v264"
      && reference.consumedNodeProfile
        === "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract.v1"
      && reference.nextNodeConsumerVersion === "Node v265"
      && reference.sourceSpan === "Node v264 credential resolver test-only shell contract"
      && reference.shellMode === "test-only-fake-resolver-contract"
      && reference.shellName === "ManagedAuditSandboxEndpointCredentialResolverTestOnlyShell"
      && reference.resolverKind === "fake-in-memory"
      && reference.requestShapeFieldCount === 9
      && reference.responseShapeFieldCount === 13
      && reference.failureMappingCount === 7
      && reference.guardConditionCount === 10
      && reference.fakeResolverProbeCount === 1
      && reference.requestShapeEchoed
      && reference.responseShapeEchoed
      && reference.failureMappingEchoed
      && reference.guardConditionsEchoed
      && reference.fakeResolverProbeEchoed
      && reference.fakeResolverOnlyEchoed
      && reference.sideEffectBoundaryClosed
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
      && !reference.productionRecordWritten
      && !reference.readyForManagedAuditSandboxAdapterConnection,
  };
}

function createMiniKvV116Reference(): MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v116-receipt", MINI_KV_V116_RECEIPT),
    evidenceFile("mini-kv-v116-runbook", MINI_KV_V116_RUNBOOK),
    evidenceFile("mini-kv-v116-walkthrough", MINI_KV_V116_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v116-receipt-version", MINI_KV_V116_RECEIPT, "mini-kv-test-only-resolver-shell-non-participation-receipt.v1"),
    snippet("mini-kv-v116-consumer", MINI_KV_V116_RECEIPT, "Node v265 test-only resolver shell upstream echo verification"),
    snippet("mini-kv-v116-source-profile", MINI_KV_V116_RECEIPT, "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract.v1"),
    snippet("mini-kv-v116-source-route", MINI_KV_V116_RECEIPT, "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract"),
    snippet("mini-kv-v116-source-state", MINI_KV_V116_RECEIPT, "sandbox-endpoint-credential-resolver-test-only-shell-contract-ready"),
    snippet("mini-kv-v116-source-mode", MINI_KV_V116_RECEIPT, "test-only-fake-resolver-contract"),
    snippet("mini-kv-v116-request-count", MINI_KV_V116_RECEIPT, "\"source_request_shape_field_count\":9"),
    snippet("mini-kv-v116-response-count", MINI_KV_V116_RECEIPT, "\"source_response_shape_field_count\":13"),
    snippet("mini-kv-v116-failure-count", MINI_KV_V116_RECEIPT, "\"source_failure_mapping_count\":7"),
    snippet("mini-kv-v116-guard-count", MINI_KV_V116_RECEIPT, "\"source_guard_condition_count\":10"),
    snippet("mini-kv-v116-no-resolver-client", MINI_KV_V116_RECEIPT, "\"resolver_client_instantiated\":false"),
    snippet("mini-kv-v116-no-secret-provider", MINI_KV_V116_RECEIPT, "\"secret_provider_instantiated\":false"),
    snippet("mini-kv-v116-no-credential", MINI_KV_V116_RECEIPT, "\"credential_value_read_allowed\":false"),
    snippet("mini-kv-v116-no-raw-endpoint", MINI_KV_V116_RECEIPT, "\"raw_endpoint_url_parsed\":false"),
    snippet("mini-kv-v116-no-external", MINI_KV_V116_RECEIPT, "\"external_request_sent\":false"),
    snippet("mini-kv-v116-no-load", MINI_KV_V116_RECEIPT, "\"load_restore_compact_executed\":false"),
    snippet("mini-kv-v116-runbook", MINI_KV_V116_RUNBOOK, "Node v265"),
    snippet("mini-kv-v116-walkthrough", MINI_KV_V116_WALKTHROUGH, "Node v265"),
  ];
  const root = readJsonObject(MINI_KV_V116_RECEIPT);
  const receipt = objectField(root, "test_only_resolver_shell_non_participation_receipt");
  const requestShape = objectField(receipt, "request_shape");
  const responseShape = objectField(receipt, "response_shape");
  const fakeResolverProbe = objectField(receipt, "fake_resolver_probe");
  const sourceFailureCodes = objectArrayField(receipt, "failure_mapping")
    .map((mapping) => stringField(mapping, "source_failure_code"))
    .filter(isNonNullString);
  const guardConditionCodes = objectArrayField(receipt, "guard_conditions")
    .map((guard) => stringField(guard, "code"))
    .filter(isNonNullString);
  const reference = {
    sourceVersion: "mini-kv v116" as const,
    tagLabel: "第一百一十六版测试解析器壳非参与回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    receiptVersion: stringField(root, "receipt_version") ?? "",
    releaseVersion: stringField(root, "release_version") ?? "",
    consumerHint: stringField(root, "consumer_hint") ?? "",
    receiptDigest: stringField(receipt, "receipt_digest") ?? "",
    sourceContractProfileVersion: stringField(receipt, "source_contract_profile_version") ?? "",
    sourceContractRoutePath: stringField(receipt, "source_contract_route_path") ?? "",
    sourceContractState: stringField(receipt, "source_contract_state") ?? "",
    sourceShellMode: stringField(receipt, "source_shell_mode") ?? "",
    sourceShellName: stringField(receipt, "source_shell_name") ?? "",
    sourceResolverKind: stringField(receipt, "source_resolver_kind") ?? "",
    sourceReadyForTestOnlyResolverShellContract:
      booleanField(receipt, "source_ready_for_test_only_resolver_shell_contract") ?? false,
    sourceTestOnlyShell: booleanField(receipt, "source_test_only_shell") ?? false,
    sourceReadOnlyContract: booleanField(receipt, "source_read_only_contract") ?? false,
    sourceFakeResolverOnly: booleanField(receipt, "source_fake_resolver_only") ?? false,
    sourceHandleOnlyRequest: booleanField(receipt, "source_handle_only_request") ?? false,
    sourceReadyForManagedAuditSandboxAdapterConnection:
      booleanField(receipt, "source_ready_for_managed_audit_sandbox_adapter_connection") ?? true,
    sourceReadyForProductionAudit: booleanField(receipt, "source_ready_for_production_audit") ?? true,
    sourceReadyForProductionWindow: booleanField(receipt, "source_ready_for_production_window") ?? true,
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
    sourceProductionRecordWritten: booleanField(receipt, "source_production_record_written") ?? true,
    sourceRequestShapeFieldCount: numberField(receipt, "source_request_shape_field_count") ?? 0,
    sourceResponseShapeFieldCount: numberField(receipt, "source_response_shape_field_count") ?? 0,
    sourceFailureMappingCount: numberField(receipt, "source_failure_mapping_count") ?? 0,
    sourceGuardConditionCount: numberField(receipt, "source_guard_condition_count") ?? 0,
    sourceCheckCount: numberField(receipt, "source_check_count") ?? 0,
    sourcePassedCheckCount: numberField(receipt, "source_passed_check_count") ?? 0,
    sourceProductionBlockerCount: numberField(receipt, "source_production_blocker_count") ?? -1,
    sourceWarningCount: numberField(receipt, "source_warning_count") ?? -1,
    sourceRecommendationCount: numberField(receipt, "source_recommendation_count") ?? -1,
    sourceNodeV263Ready: booleanField(receipt, "source_node_v263_ready") ?? false,
    sourceNodeV263VerificationMode: stringField(receipt, "source_node_v263_verification_mode") ?? "",
    sourceNodeV263Span: stringField(receipt, "source_node_v263_span") ?? "",
    sourceNodeV263CheckCount: numberField(receipt, "source_node_v263_check_count") ?? 0,
    sourceNodeV263PassedCheckCount: numberField(receipt, "source_node_v263_passed_check_count") ?? 0,
    sourceNodeV263ProductionBlockerCount: numberField(receipt, "source_node_v263_production_blocker_count") ?? -1,
    requestShapeFields: stringArrayField(requestShape, "fields"),
    responseShapeFields: stringArrayField(responseShape, "fields"),
    failureClassCodes: sourceFailureCodes,
    guardConditionCodes,
    fakeResolverProbeRequestId: stringField(fakeResolverProbe, "request_id") ?? "",
    fakeResolverProbeAcceptedByFakeResolver: booleanField(fakeResolverProbe, "accepted_by_fake_resolver") ?? false,
    fakeResolverProbeNoCredentialRead: !(booleanField(fakeResolverProbe, "credential_value_read") ?? true),
    fakeResolverProbeNoExternalRequest: !(booleanField(fakeResolverProbe, "external_request_sent") ?? true),
    fakeResolverProbeNoProductionWrite: !(booleanField(fakeResolverProbe, "production_record_written") ?? true),
    readOnly: booleanField(receipt, "read_only") ?? false,
    executionAllowed: booleanField(receipt, "execution_allowed") ?? true,
    dryRunOnly: booleanField(receipt, "dry_run_only") ?? false,
    testOnlyResolverShellContractOnly:
      booleanField(receipt, "test_only_resolver_shell_contract_only") ?? false,
    testOnlyShell: booleanField(receipt, "test_only_shell") ?? false,
    fakeResolverOnly: booleanField(receipt, "fake_resolver_only") ?? false,
    handleOnlyRequest: booleanField(receipt, "handle_only_request") ?? false,
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
    managedAuditStore: booleanField(receipt, "managed_audit_store") ?? true,
    managedAuditStorageBackend: booleanField(receipt, "managed_audit_storage_backend") ?? true,
    sandboxAuditStorageBackend: booleanField(receipt, "sandbox_audit_storage_backend") ?? true,
    orderAuthoritative: booleanField(receipt, "order_authoritative") ?? true,
    fakeResolverProbeExecuted: booleanField(receipt, "fake_resolver_probe_executed") ?? true,
    readyForNodeV265Alignment: false,
  };

  return {
    ...reference,
    readyForNodeV265Alignment:
      reference.evidencePresent
      && reference.verificationDocumented
      && reference.receiptVersion === "mini-kv-test-only-resolver-shell-non-participation-receipt.v1"
      && reference.releaseVersion === "v116"
      && reference.consumerHint === "Node v265 test-only resolver shell upstream echo verification"
      && /^fnv1a64:[a-f0-9]{16}$/.test(reference.receiptDigest)
      && reference.sourceContractProfileVersion
        === "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract.v1"
      && reference.sourceContractRoutePath === NODE_V264_ROUTE
      && reference.sourceContractState === "sandbox-endpoint-credential-resolver-test-only-shell-contract-ready"
      && reference.sourceShellMode === "test-only-fake-resolver-contract"
      && reference.sourceShellName === "ManagedAuditSandboxEndpointCredentialResolverTestOnlyShell"
      && reference.sourceResolverKind === "fake-in-memory"
      && reference.sourceReadyForTestOnlyResolverShellContract
      && reference.sourceTestOnlyShell
      && reference.sourceReadOnlyContract
      && reference.sourceFakeResolverOnly
      && reference.sourceHandleOnlyRequest
      && !reference.sourceReadyForManagedAuditSandboxAdapterConnection
      && !reference.sourceReadyForProductionAudit
      && !reference.sourceReadyForProductionWindow
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
      && !reference.sourceProductionRecordWritten
      && reference.sourceRequestShapeFieldCount === REQUEST_SHAPE_FIELDS.length
      && reference.sourceResponseShapeFieldCount === RESPONSE_SHAPE_FIELDS.length
      && reference.sourceFailureMappingCount === FAILURE_CLASS_CODES.length
      && reference.sourceGuardConditionCount === GUARD_CONDITION_CODES.length
      && reference.sourceCheckCount === reference.sourcePassedCheckCount
      && reference.sourceCheckCount === 20
      && reference.sourceProductionBlockerCount === 0
      && reference.sourceWarningCount === 2
      && reference.sourceRecommendationCount === 2
      && reference.sourceNodeV263Ready
      && reference.sourceNodeV263VerificationMode
        === "java-v106-plus-mini-kv-v115-disabled-credential-resolver-precheck-upstream-echo-verification-only"
      && reference.sourceNodeV263Span === "Node v262 + Java v106 + mini-kv v115"
      && reference.sourceNodeV263CheckCount === reference.sourceNodeV263PassedCheckCount
      && reference.sourceNodeV263CheckCount === 19
      && reference.sourceNodeV263ProductionBlockerCount === 0
      && arraysEqual(reference.requestShapeFields, REQUEST_SHAPE_FIELDS)
      && arraysEqual(reference.responseShapeFields, RESPONSE_SHAPE_FIELDS)
      && arraysEqual(reference.failureClassCodes, FAILURE_CLASS_CODES)
      && arraysEqual(reference.guardConditionCodes, GUARD_CONDITION_CODES)
      && reference.fakeResolverProbeRequestId === "managed-audit-v264-test-only-resolver-shell-probe"
      && reference.fakeResolverProbeAcceptedByFakeResolver
      && reference.fakeResolverProbeNoCredentialRead
      && reference.fakeResolverProbeNoExternalRequest
      && reference.fakeResolverProbeNoProductionWrite
      && reference.readOnly
      && !reference.executionAllowed
      && reference.dryRunOnly
      && reference.testOnlyResolverShellContractOnly
      && reference.testOnlyShell
      && reference.fakeResolverOnly
      && reference.handleOnlyRequest
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
      && !reference.managedAuditStore
      && !reference.managedAuditStorageBackend
      && !reference.sandboxAuditStorageBackend
      && !reference.orderAuthoritative
      && !reference.fakeResolverProbeExecuted,
  };
}

function createJavaV109OptimizationContext(): JavaV109RehearsalResponseRecordsSplitOptimizationContext {
  const evidenceFiles = [
    evidenceFile("java-v109-runbook", JAVA_V109_RUNBOOK),
    evidenceFile("java-v109-walkthrough", JAVA_V109_WALKTHROUGH),
    evidenceFile("java-v109-records", JAVA_V109_RECORDS),
  ];
  const expectedSnippets = [
    snippet("java-v109-records-split", JAVA_V109_RUNBOOK, "ReleaseApprovalRehearsalResponseRecords"),
    snippet("java-v109-main-shell", JAVA_V109_RUNBOOK, "主响应文件只保留 68 行壳"),
    snippet("java-v109-no-business-marker", JAVA_V109_RUNBOOK, "v109 不新增业务 marker"),
    snippet("java-v109-no-boundary-change", JAVA_V109_RUNBOOK, "不碰 managed-audit 边界"),
    snippet("java-v109-records-class", JAVA_V109_RECORDS, "public final class ReleaseApprovalRehearsalResponseRecords"),
    snippet("java-v109-walkthrough", JAVA_V109_WALKTHROUGH, "主响应类只保留顶层字段壳"),
  ];
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const optimizationDocumented = expectedSnippets.every((snippetMatch) => snippetMatch.matched);

  return {
    sourceVersion: "Java v109",
    tagLabel: "v109订单平台rehearsal-response-records拆分",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    optimizationDocumented,
    optimizationOnly: true,
    hardPrerequisiteForNodeV265: false,
    businessMarkerAdded: false,
    managedAuditBoundaryChanged: false,
    responseRecordsSplit: snippetMatched(expectedSnippets, "java-v109-records-split"),
    releaseApprovalRehearsalResponseRecordsPresent: snippetMatched(expectedSnippets, "java-v109-records-class"),
    mainResponseShellLineCount: snippetMatched(expectedSnippets, "java-v109-main-shell") ? 68 : 0,
    alignedWithNodeV265:
      evidencePresent
      && optimizationDocumented
      && snippetMatched(expectedSnippets, "java-v109-no-business-marker")
      && snippetMatched(expectedSnippets, "java-v109-no-boundary-change"),
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV264: SourceNodeV264CredentialResolverTestOnlyShellContractReference,
  javaV107: JavaV107CredentialResolverTestOnlyShellEchoMarkerReference,
  miniKvV116: MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference,
  javaV109: JavaV109RehearsalResponseRecordsSplitOptimizationContext,
): CredentialResolverTestOnlyShellUpstreamEchoVerificationChecks {
  return {
    sourceNodeV264Ready: sourceNodeV264.readyForNodeV265TestOnlyShellUpstreamEchoVerification,
    javaV107EchoReady: javaV107.readyForNodeV265SandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification,
    miniKvV116NonParticipationReady: miniKvV116.readyForNodeV265Alignment,
    javaV109OptimizationContextReady: javaV109.alignedWithNodeV265,
    testOnlyShellContractAligned:
      sourceNodeV264.shellMode === javaV107.shellMode
      && sourceNodeV264.shellMode === miniKvV116.sourceShellMode
      && sourceNodeV264.shellName === javaV107.shellName
      && sourceNodeV264.shellName === miniKvV116.sourceShellName
      && sourceNodeV264.resolverKind === javaV107.resolverKind
      && sourceNodeV264.resolverKind === miniKvV116.sourceResolverKind
      && sourceNodeV264.profileVersion === javaV107.consumedNodeProfile
      && sourceNodeV264.profileVersion === miniKvV116.sourceContractProfileVersion
      && sourceNodeV264.shellContractState === miniKvV116.sourceContractState
      && sourceNodeV264.readyForTestOnlyShellContract
      && javaV107.fakeResolverOnlyEchoed
      && miniKvV116.sourceFakeResolverOnly,
    requestShapeAligned:
      sourceNodeV264.requestShapeFieldCount === REQUEST_SHAPE_FIELDS.length
      && javaV107.requestShapeFieldCount === REQUEST_SHAPE_FIELDS.length
      && miniKvV116.sourceRequestShapeFieldCount === REQUEST_SHAPE_FIELDS.length
      && arraysEqual(sourceNodeV264.requestShapeFields, REQUEST_SHAPE_FIELDS)
      && arraysEqual(miniKvV116.requestShapeFields, REQUEST_SHAPE_FIELDS)
      && sourceNodeV264.handleOnlyRequest
      && miniKvV116.sourceHandleOnlyRequest
      && miniKvV116.handleOnlyRequest
      && javaV107.requestShapeEchoed,
    responseShapeAligned:
      sourceNodeV264.responseShapeFieldCount === RESPONSE_SHAPE_FIELDS.length
      && javaV107.responseShapeFieldCount === RESPONSE_SHAPE_FIELDS.length
      && miniKvV116.sourceResponseShapeFieldCount === RESPONSE_SHAPE_FIELDS.length
      && arraysEqual(sourceNodeV264.responseShapeFields, RESPONSE_SHAPE_FIELDS)
      && arraysEqual(miniKvV116.responseShapeFields, RESPONSE_SHAPE_FIELDS)
      && javaV107.responseShapeEchoed,
    failureMappingAligned:
      sourceNodeV264.failureMappingCount === FAILURE_CLASS_CODES.length
      && javaV107.failureMappingCount === FAILURE_CLASS_CODES.length
      && miniKvV116.sourceFailureMappingCount === FAILURE_CLASS_CODES.length
      && arraysEqual(sourceNodeV264.failureClassCodes, FAILURE_CLASS_CODES)
      && arraysEqual(miniKvV116.failureClassCodes, FAILURE_CLASS_CODES)
      && javaV107.failureMappingEchoed,
    guardConditionsAligned:
      sourceNodeV264.guardConditionCount === GUARD_CONDITION_CODES.length
      && javaV107.guardConditionCount === GUARD_CONDITION_CODES.length
      && miniKvV116.sourceGuardConditionCount === GUARD_CONDITION_CODES.length
      && arraysEqual(sourceNodeV264.guardConditionCodes, GUARD_CONDITION_CODES)
      && arraysEqual(miniKvV116.guardConditionCodes, GUARD_CONDITION_CODES)
      && javaV107.guardConditionsEchoed,
    fakeResolverProbeAligned:
      sourceNodeV264.fakeResolverProbeCovered
      && sourceNodeV264.fakeResolverProbeNoCredentialRead
      && sourceNodeV264.fakeResolverProbeNoExternalRequest
      && sourceNodeV264.fakeResolverProbeNoProductionWrite
      && javaV107.fakeResolverProbeEchoed
      && miniKvV116.fakeResolverProbeRequestId === "managed-audit-v264-test-only-resolver-shell-probe"
      && miniKvV116.fakeResolverProbeAcceptedByFakeResolver
      && miniKvV116.fakeResolverProbeNoCredentialRead
      && miniKvV116.fakeResolverProbeNoExternalRequest
      && miniKvV116.fakeResolverProbeNoProductionWrite
      && !miniKvV116.fakeResolverProbeExecuted,
    credentialBoundaryAligned:
      !sourceNodeV264.credentialResolverExecutionAllowed
      && !sourceNodeV264.credentialValueRead
      && !sourceNodeV264.credentialValueLoaded
      && !sourceNodeV264.credentialValueStored
      && !sourceNodeV264.credentialValueIncluded
      && !javaV107.credentialResolverExecutionAllowed
      && !javaV107.credentialValueRead
      && !javaV107.credentialValueLoaded
      && !javaV107.credentialValueStored
      && !javaV107.credentialValueIncluded
      && !miniKvV116.sourceCredentialResolverExecutionAllowed
      && !miniKvV116.sourceCredentialValueRead
      && !miniKvV116.sourceCredentialValueLoaded
      && !miniKvV116.sourceCredentialValueStored
      && !miniKvV116.sourceCredentialValueIncluded
      && !miniKvV116.credentialValueRequired
      && !miniKvV116.credentialValueReadAllowed
      && !miniKvV116.credentialValueLoaded
      && !miniKvV116.credentialValueStored
      && !miniKvV116.credentialValueIncluded,
    rawEndpointBoundaryAligned:
      !sourceNodeV264.rawEndpointUrlParsed
      && !sourceNodeV264.rawEndpointUrlIncluded
      && !javaV107.rawEndpointUrlParsed
      && !javaV107.rawEndpointUrlIncluded
      && !miniKvV116.sourceRawEndpointUrlParsed
      && !miniKvV116.sourceRawEndpointUrlIncluded
      && !miniKvV116.rawEndpointUrlParsed
      && !miniKvV116.rawEndpointUrlIncluded,
    connectionBoundaryAligned:
      !sourceNodeV264.externalRequestSent
      && !sourceNodeV264.connectsManagedAudit
      && !sourceNodeV264.secretProviderInstantiated
      && !sourceNodeV264.resolverClientInstantiated
      && !javaV107.externalRequestSent
      && !javaV107.connectsManagedAudit
      && !javaV107.secretProviderInstantiated
      && !javaV107.resolverClientInstantiated
      && !miniKvV116.sourceConnectsManagedAudit
      && !miniKvV116.sourceExternalRequestSent
      && !miniKvV116.connectionExecutionAllowed
      && !miniKvV116.externalRequestSent
      && !miniKvV116.secretProviderInstantiated
      && !miniKvV116.resolverClientInstantiated
      && !miniKvV116.credentialResolverImplemented
      && !miniKvV116.credentialResolverInvoked,
    writeBoundaryAligned:
      !sourceNodeV264.schemaMigrationExecuted
      && !javaV107.schemaMigrationExecuted
      && !javaV107.productionRecordWritten
      && !miniKvV116.sourceSchemaMigrationExecuted
      && !miniKvV116.sourceProductionRecordWritten
      && !miniKvV116.schemaRehearsalExecutionAllowed
      && !miniKvV116.schemaMigrationExecutionAllowed
      && !miniKvV116.storageWriteAllowed
      && !miniKvV116.managedAuditWriteExecuted
      && !miniKvV116.approvalLedgerWriteAllowed
      && !miniKvV116.approvalLedgerWriteExecuted
      && !miniKvV116.sandboxManagedAuditStateWriteAllowed
      && !miniKvV116.restoreExecutionAllowed
      && !miniKvV116.loadRestoreCompactExecuted
      && !miniKvV116.setnxexExecutionAllowed
      && !miniKvV116.managedAuditStore
      && !miniKvV116.managedAuditStorageBackend
      && !miniKvV116.sandboxAuditStorageBackend
      && !miniKvV116.orderAuthoritative,
    autoStartBoundaryAligned:
      !sourceNodeV264.automaticUpstreamStart
      && !javaV107.automaticUpstreamStart
      && !miniKvV116.sourceAutomaticUpstreamStart
      && !miniKvV116.nodeAutoStartAllowed
      && !miniKvV116.javaAutoStartAllowed
      && !miniKvV116.miniKvAutoStartAllowed
      && !miniKvV116.externalAuditServiceAutoStartAllowed,
    miniKvNonParticipationAligned:
      miniKvV116.readyForNodeV265Alignment
      && miniKvV116.readOnly
      && !miniKvV116.executionAllowed
      && miniKvV116.testOnlyResolverShellContractOnly
      && !miniKvV116.fakeResolverProbeExecuted,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification:
      false,
  };
}

function collectProductionBlockers(
  checks: CredentialResolverTestOnlyShellUpstreamEchoVerificationChecks,
): CredentialResolverTestOnlyShellUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CredentialResolverTestOnlyShellUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV264Ready,
      code: "NODE_V264_TEST_ONLY_SHELL_CONTRACT_NOT_READY",
      source: "node-v264-sandbox-endpoint-credential-resolver-test-only-shell-contract",
      message: "Node v264 must expose a ready test-only resolver shell contract before v265 can verify upstream echoes.",
    },
    {
      condition: checks.javaV107EchoReady,
      code: "JAVA_V107_TEST_ONLY_SHELL_ECHO_NOT_READY",
      source: "java-v107-sandbox-endpoint-credential-resolver-test-only-shell-echo-marker",
      message: "Java v107 must echo the Node v264 fake-only request, response, failure mapping, guard, and probe boundary.",
    },
    {
      condition: checks.miniKvV116NonParticipationReady,
      code: "MINI_KV_V116_TEST_ONLY_SHELL_NON_PARTICIPATION_NOT_READY",
      source: "mini-kv-v116-test-only-resolver-shell-non-participation-receipt",
      message: "mini-kv v116 must prove non-participation for resolver, credential value, raw endpoint, external request, writes, and auto-start.",
    },
    {
      condition:
        checks.testOnlyShellContractAligned
        && checks.requestShapeAligned
        && checks.responseShapeAligned
        && checks.failureMappingAligned
        && checks.guardConditionsAligned
        && checks.fakeResolverProbeAligned,
      code: "TEST_ONLY_SHELL_ECHO_NOT_ALIGNED",
      source:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification",
      message: "Node v264, Java v107, and mini-kv v116 must align on shell mode, request, response, failure mapping, guards, and fake probe.",
    },
    {
      condition:
        checks.credentialBoundaryAligned
        && checks.rawEndpointBoundaryAligned
        && checks.connectionBoundaryAligned
        && checks.writeBoundaryAligned
        && checks.autoStartBoundaryAligned,
      code: "TEST_ONLY_SHELL_SIDE_EFFECT_BOUNDARY_OPEN",
      source:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification",
      message: "Credential, raw endpoint, connection, write, resolver instantiation, secret provider, and auto-start boundaries must remain closed.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v265 test-only shell upstream echo verification.",
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

function collectWarnings(): CredentialResolverTestOnlyShellUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "UPSTREAM_ECHO_ONLY",
      severity: "warning",
      source:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification",
      message: "v265 verifies read-only upstream evidence only; it does not execute the fake resolver shell.",
    },
    {
      code: "JAVA_V109_IS_OPTIMIZATION_CONTEXT",
      severity: "warning",
      source: "java-v109-release-approval-rehearsal-response-records-split",
      message: "Java v109 is consumed as structural cleanup context only; it is not a hard prerequisite for v265 readiness.",
    },
  ];
}

function collectRecommendations(): CredentialResolverTestOnlyShellUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "ARCHIVE_FAKE_SHELL_EVIDENCE_NEXT",
      severity: "recommendation",
      source:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification",
      message: "Use Node v266 to verify the v264/v265 archive, fallback, route digest, screenshot, and explanation evidence.",
    },
    {
      code: "KEEP_REAL_RESOLVER_OUT_OF_SCOPE",
      severity: "recommendation",
      source:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification",
      message: "Do not add real credential resolution, raw endpoint parsing, external HTTP, schema migration, or storage writes without a new plan.",
    },
  ];
}

function isNonNullString(value: string | null): value is string {
  return value !== null;
}

function arraysEqual(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}
