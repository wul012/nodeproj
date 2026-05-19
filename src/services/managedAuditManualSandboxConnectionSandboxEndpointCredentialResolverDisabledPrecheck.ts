import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification.js";
import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationTypes.js";
import type {
  CredentialResolverDisabledPrecheckChecks,
  CredentialResolverDisabledPrecheckMessage,
  CredentialResolverDryRunResponseShape,
  CredentialResolverEnvHandle,
  CredentialResolverFailureClass,
  CredentialResolverOptInGate,
  DisabledCredentialResolverPrecheck,
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckProfile,
  SourceNodeV261CredentialResolverUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckTypes.js";
export {
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckMarkdown,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck";
const NODE_V261_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans/v260-post-credential-resolver-decision-roadmap.md";

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

export function loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckProfile {
  const sourceNodeV261 = createSourceNodeV261(
    loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification({ config: input.config }),
  );
  const disabledCredentialResolverPrecheck = createDisabledCredentialResolverPrecheck();
  const checks = createChecks(input.config, sourceNodeV261, disabledCredentialResolverPrecheck);
  checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck =
    Object.entries(checks)
      .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck")
      .every(([, value]) => value);
  const precheckState = checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck
    ? "sandbox-endpoint-credential-resolver-disabled-precheck-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection sandbox endpoint credential resolver disabled precheck",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    precheckState,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck:
      checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck,
    readOnlyDisabledPrecheck: true,
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
    sourceNodeV261,
    disabledCredentialResolverPrecheck,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      requiredEnvHandleCount: disabledCredentialResolverPrecheck.requiredEnvHandleCount,
      optInGateCount: disabledCredentialResolverPrecheck.optInGateCount,
      failureClassCount: disabledCredentialResolverPrecheck.failureClassCount,
      dryRunResponseFieldCount: disabledCredentialResolverPrecheck.dryRunResponseFieldCount,
      inheritedNoGoConditionCount: disabledCredentialResolverPrecheck.inheritedNoGoConditionCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      sandboxEndpointCredentialResolverDisabledPrecheckJson: ROUTE_PATH,
      sandboxEndpointCredentialResolverDisabledPrecheckMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV261Json: NODE_V261_ROUTE,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Use Java v106 and mini-kv v115 as read-only echo / non-participation follow-ups before Node v263.",
      "Keep the credential resolver disabled; do not instantiate a resolver client or secret provider.",
      "Do not read credential values, parse raw endpoint URLs, or send external managed audit requests.",
    ],
  };
}

function createSourceNodeV261(
  source: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationProfile,
): SourceNodeV261CredentialResolverUpstreamEchoVerificationReference {
  const reference = {
    sourceVersion: "Node v261" as const,
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification,
    verificationDigest: source.echoVerification.verificationDigest,
    verificationMode: source.echoVerification.verificationMode,
    sourceSpan: source.echoVerification.sourceSpan,
    sourceNodeV260Ready: source.checks.sourceNodeV260Ready,
    javaV105EchoReady: source.checks.javaV105EchoReady,
    miniKvV114NonParticipationReady: source.checks.miniKvV114NonParticipationReady,
    decisionRecordAligned: source.echoVerification.decisionRecordAligned,
    requiredDecisionFieldsAligned: source.echoVerification.requiredDecisionFieldsAligned,
    explicitNoGoConditionsAligned: source.echoVerification.explicitNoGoConditionsAligned,
    resolverPolicyAligned: source.echoVerification.resolverPolicyAligned,
    approvalMarkerAligned: source.echoVerification.approvalMarkerAligned,
    operatorIdentityAligned: source.echoVerification.operatorIdentityAligned,
    approvalCorrelationAligned: source.echoVerification.approvalCorrelationAligned,
    redactionAndFallbackAligned: source.echoVerification.redactionAndFallbackAligned,
    credentialBoundaryAligned: source.echoVerification.credentialBoundaryAligned,
    rawEndpointBoundaryAligned: source.echoVerification.rawEndpointBoundaryAligned,
    connectionBoundaryAligned: source.echoVerification.connectionBoundaryAligned,
    writeBoundaryAligned: source.echoVerification.writeBoundaryAligned,
    autoStartBoundaryAligned: source.echoVerification.autoStartBoundaryAligned,
    upstreamActionsStillDisabled: source.checks.upstreamActionsStillDisabled,
    credentialResolverExecutionAllowed: source.credentialResolverExecutionAllowed,
    credentialValueRead: source.credentialValueRead,
    credentialValueLoaded: source.credentialValueLoaded,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    connectsManagedAudit: source.connectsManagedAudit,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    automaticUpstreamStart: source.automaticUpstreamStart,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
    readyForNodeV262CredentialResolverDisabledPrecheck: false,
  };

  return {
    ...reference,
    readyForNodeV262CredentialResolverDisabledPrecheck:
      reference.readyForUpstreamEchoVerification
      && reference.verificationState === "sandbox-endpoint-credential-resolver-upstream-echo-verification-ready"
      && reference.verificationMode === "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only"
      && reference.sourceSpan === "Node v260 + Java v105 + mini-kv v114"
      && reference.sourceNodeV260Ready
      && reference.javaV105EchoReady
      && reference.miniKvV114NonParticipationReady
      && reference.decisionRecordAligned
      && reference.requiredDecisionFieldsAligned
      && reference.explicitNoGoConditionsAligned
      && reference.resolverPolicyAligned
      && reference.approvalMarkerAligned
      && reference.operatorIdentityAligned
      && reference.approvalCorrelationAligned
      && reference.redactionAndFallbackAligned
      && reference.credentialBoundaryAligned
      && reference.rawEndpointBoundaryAligned
      && reference.connectionBoundaryAligned
      && reference.writeBoundaryAligned
      && reference.autoStartBoundaryAligned
      && reference.upstreamActionsStillDisabled
      && !reference.credentialResolverExecutionAllowed
      && !reference.credentialValueRead
      && !reference.credentialValueLoaded
      && !reference.rawEndpointUrlParsed
      && !reference.externalRequestSent
      && !reference.connectsManagedAudit
      && !reference.schemaMigrationExecuted
      && !reference.automaticUpstreamStart
      && reference.checkCount === reference.passedCheckCount
      && reference.productionBlockerCount === 0,
  };
}

function createDisabledCredentialResolverPrecheck(): DisabledCredentialResolverPrecheck {
  const requiredEnvHandles = createRequiredEnvHandles();
  const optInGates = createOptInGates();
  const failureTaxonomy = createFailureTaxonomy();
  const dryRunResponseShape = createDryRunResponseShape();
  const digestInput = {
    precheckMode: "sandbox-endpoint-credential-resolver-disabled-precheck-only",
    requiredEnvHandles,
    optInGates,
    failureTaxonomy,
    dryRunResponseShape,
    inheritedNoGoConditions: INHERITED_NO_GO_CONDITIONS,
  };

  return {
    precheckDigest: sha256StableJson(digestInput),
    precheckMode: "sandbox-endpoint-credential-resolver-disabled-precheck-only",
    resolverImplementationStatus: "not-implemented",
    secretProviderImplementationStatus: "not-implemented",
    resolverClientMayBeInstantiated: false,
    secretProviderMayBeInstantiated: false,
    credentialValueMayBeLoaded: false,
    rawEndpointUrlMayBeParsed: false,
    externalRequestMayBeSent: false,
    optInGateRequired: true,
    requiredEnvHandleCount: REQUIRED_ENV_HANDLE_NAMES.length,
    optInGateCount: OPT_IN_GATE_NAMES.length,
    failureClassCount: FAILURE_CLASS_CODES.length,
    dryRunResponseFieldCount: DRY_RUN_RESPONSE_FIELDS.length,
    inheritedNoGoConditionCount: INHERITED_NO_GO_CONDITIONS.length,
    requiredEnvHandles,
    optInGates,
    failureTaxonomy,
    dryRunResponseShape,
    inheritedNoGoConditions: INHERITED_NO_GO_CONDITIONS,
  };
}

function createRequiredEnvHandles(): CredentialResolverEnvHandle[] {
  return [
    envHandle("ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_ENABLED", "future opt-in gate for the credential resolver", false),
    envHandle("ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_RESOLUTION_ENABLED", "future opt-in gate for sandbox endpoint resolution", false),
    envHandle("ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE", "handle for the approved sandbox endpoint", true),
    envHandle("ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE", "handle for the approved sandbox credential", true),
    envHandle("ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE", "handle for the resolver policy review", true),
    envHandle("ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER", "operator approval marker for future resolver design", true),
  ];
}

function envHandle(
  name: CredentialResolverEnvHandle["name"],
  purpose: string,
  requiredBeforeRealResolver: boolean,
): CredentialResolverEnvHandle {
  return {
    name,
    purpose,
    valueRequiredForPrecheck: false,
    credentialValue: false,
    rawEndpointValue: false,
    requiredBeforeRealResolver,
  };
}

function createOptInGates(): CredentialResolverOptInGate[] {
  return [
    optInGate("ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_ENABLED"),
    optInGate("ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_RESOLUTION_ENABLED"),
  ];
}

function optInGate(gateName: CredentialResolverOptInGate["gateName"]): CredentialResolverOptInGate {
  return {
    gateName,
    requiredValueForFutureResolver: "true",
    currentDefault: "false",
    precheckTreatsEnabledAsBlocked: true,
    operatorApprovalRequired: true,
  };
}

function createFailureTaxonomy(): CredentialResolverFailureClass[] {
  return [
    failureClass("RESOLVER_DISABLED", "configuration", false, "pause-and-review"),
    failureClass("APPROVAL_MARKER_MISSING", "operator-boundary", false, "pause-and-review"),
    failureClass("CREDENTIAL_HANDLE_MISSING", "credential-boundary", false, "pause-and-review"),
    failureClass("CREDENTIAL_VALUE_REQUESTED", "credential-boundary", false, "pause-and-do-not-resolve"),
    failureClass("RAW_ENDPOINT_URL_REQUESTED", "endpoint-boundary", false, "pause-and-do-not-resolve"),
    failureClass("EXTERNAL_REQUEST_REQUESTED", "network-boundary", false, "pause-and-do-not-resolve"),
    failureClass("SCHEMA_MIGRATION_REQUESTED", "schema-boundary", false, "pause-and-do-not-resolve"),
  ];
}

function failureClass(
  code: CredentialResolverFailureClass["code"],
  source: CredentialResolverFailureClass["source"],
  retryable: boolean,
  action: CredentialResolverFailureClass["action"],
): CredentialResolverFailureClass {
  return { code, source, retryable, action };
}

function createDryRunResponseShape(): CredentialResolverDryRunResponseShape {
  return {
    fields: DRY_RUN_RESPONSE_FIELDS,
    readyState: "sandbox-endpoint-credential-resolver-disabled-precheck-ready",
    resolverClientInstantiated: false,
    secretProviderInstantiated: false,
    credentialValueRead: false,
    credentialValueLoaded: false,
    rawEndpointUrlParsed: false,
    externalRequestSent: false,
    connectsManagedAudit: false,
    schemaMigrationExecuted: false,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV261: SourceNodeV261CredentialResolverUpstreamEchoVerificationReference,
  precheck: DisabledCredentialResolverPrecheck,
): CredentialResolverDisabledPrecheckChecks {
  return {
    sourceNodeV261Ready: sourceNodeV261.readyForNodeV262CredentialResolverDisabledPrecheck,
    sourceVerificationStillBlocksCredentialResolution:
      !sourceNodeV261.credentialResolverExecutionAllowed
      && sourceNodeV261.verificationMode === "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only",
    sourceVerificationStillBlocksCredentialValue:
      !sourceNodeV261.credentialValueRead
      && !sourceNodeV261.credentialValueLoaded
      && sourceNodeV261.credentialBoundaryAligned,
    sourceVerificationStillBlocksRawEndpoint:
      !sourceNodeV261.rawEndpointUrlParsed
      && sourceNodeV261.rawEndpointBoundaryAligned,
    sourceVerificationStillBlocksConnection:
      !sourceNodeV261.externalRequestSent
      && !sourceNodeV261.connectsManagedAudit
      && sourceNodeV261.connectionBoundaryAligned,
    sourceVerificationStillBlocksWrites:
      !sourceNodeV261.schemaMigrationExecuted
      && sourceNodeV261.writeBoundaryAligned,
    sourceVerificationStillBlocksAutoStart:
      !sourceNodeV261.automaticUpstreamStart
      && sourceNodeV261.autoStartBoundaryAligned,
    requiredEnvHandlesDeclared:
      precheck.requiredEnvHandleCount === REQUIRED_ENV_HANDLE_NAMES.length
      && arraysEqual(precheck.requiredEnvHandles.map((handle) => handle.name), [...REQUIRED_ENV_HANDLE_NAMES]),
    envHandlesRemainHandleOnly:
      precheck.requiredEnvHandles.every((handle) =>
        !handle.valueRequiredForPrecheck && !handle.credentialValue && !handle.rawEndpointValue),
    optInGatesDeclared:
      precheck.optInGateCount === OPT_IN_GATE_NAMES.length
      && arraysEqual(precheck.optInGates.map((gate) => gate.gateName), [...OPT_IN_GATE_NAMES]),
    optInGatesDefaultDisabled:
      precheck.optInGates.every((gate) =>
        gate.currentDefault === "false"
        && gate.requiredValueForFutureResolver === "true"
        && gate.precheckTreatsEnabledAsBlocked
        && gate.operatorApprovalRequired),
    failureTaxonomyDeclared:
      precheck.failureClassCount === FAILURE_CLASS_CODES.length
      && arraysEqual(precheck.failureTaxonomy.map((failure) => failure.code), [...FAILURE_CLASS_CODES]),
    dryRunResponseShapeDeclared:
      precheck.dryRunResponseFieldCount === DRY_RUN_RESPONSE_FIELDS.length
      && arraysEqual([...precheck.dryRunResponseShape.fields], [...DRY_RUN_RESPONSE_FIELDS])
      && precheck.dryRunResponseShape.readyState === "sandbox-endpoint-credential-resolver-disabled-precheck-ready",
    resolverImplementationStillAbsent: precheck.resolverImplementationStatus === "not-implemented",
    secretProviderImplementationStillAbsent: precheck.secretProviderImplementationStatus === "not-implemented",
    resolverClientInstantiationBlocked: !precheck.resolverClientMayBeInstantiated,
    secretProviderInstantiationBlocked: !precheck.secretProviderMayBeInstantiated,
    credentialValueLoadBlocked:
      !precheck.credentialValueMayBeLoaded
      && !precheck.dryRunResponseShape.credentialValueRead
      && !precheck.dryRunResponseShape.credentialValueLoaded,
    rawEndpointParseBlocked:
      !precheck.rawEndpointUrlMayBeParsed
      && !precheck.dryRunResponseShape.rawEndpointUrlParsed,
    externalRequestBlocked:
      !precheck.externalRequestMayBeSent
      && !precheck.dryRunResponseShape.externalRequestSent
      && !precheck.dryRunResponseShape.connectsManagedAudit,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck: false,
  };
}

function collectProductionBlockers(
  checks: CredentialResolverDisabledPrecheckChecks,
): CredentialResolverDisabledPrecheckMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CredentialResolverDisabledPrecheckMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV261Ready,
      code: "NODE_V261_UPSTREAM_ECHO_NOT_READY",
      source: "node-v261-sandbox-endpoint-credential-resolver-upstream-echo-verification",
      message: "Node v261 must be ready and keep credential resolver upstream echo verification side-effect free before v262.",
    },
    {
      condition:
        checks.sourceVerificationStillBlocksCredentialResolution
        && checks.sourceVerificationStillBlocksCredentialValue
        && checks.sourceVerificationStillBlocksRawEndpoint
        && checks.sourceVerificationStillBlocksConnection
        && checks.sourceVerificationStillBlocksWrites
        && checks.sourceVerificationStillBlocksAutoStart,
      code: "SOURCE_BOUNDARY_OPEN",
      source: "node-v261-sandbox-endpoint-credential-resolver-upstream-echo-verification",
      message: "Node v261 must still block credential resolution, credential values, raw endpoint parsing, connections, writes, and auto-start.",
    },
    {
      condition:
        checks.requiredEnvHandlesDeclared
        && checks.envHandlesRemainHandleOnly
        && checks.optInGatesDeclared
        && checks.optInGatesDefaultDisabled,
      code: "DISABLED_PRECHECK_HANDLES_OR_GATES_INVALID",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck",
      message: "v262 must declare handle-only env names and default-disabled opt-in gates.",
    },
    {
      condition:
        checks.failureTaxonomyDeclared
        && checks.dryRunResponseShapeDeclared
        && checks.resolverImplementationStillAbsent
        && checks.secretProviderImplementationStillAbsent
        && checks.resolverClientInstantiationBlocked
        && checks.secretProviderInstantiationBlocked
        && checks.credentialValueLoadBlocked
        && checks.rawEndpointParseBlocked
        && checks.externalRequestBlocked,
      code: "DISABLED_PRECHECK_SIDE_EFFECT_BOUNDARY_OPEN",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck",
      message: "v262 must remain a disabled precheck and must not instantiate resolver/secret provider, read credential values, parse raw endpoints, or send external requests.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v262 disabled credential resolver precheck.",
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

function collectWarnings(): CredentialResolverDisabledPrecheckMessage[] {
  return [
    {
      code: "DISABLED_PRECHECK_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck",
      message: "v262 defines the resolver precheck shape only; it does not implement a resolver client or secret provider.",
    },
    {
      code: "UPSTREAM_ECHO_REQUIRED_NEXT",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck",
      message: "Java v106 and mini-kv v115 should echo this disabled precheck before Node v263 verifies upstream alignment.",
    },
  ];
}

function collectRecommendations(): CredentialResolverDisabledPrecheckMessage[] {
  return [
    {
      code: "ASK_JAVA_MINI_KV_FOR_ECHO_NEXT",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck",
      message: "Next, use Java v106 and mini-kv v115 as read-only echo / non-participation evidence for this disabled resolver precheck.",
    },
    {
      code: "KEEP_REAL_RESOLVER_OUT_OF_SCOPE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck",
      message: "Do not add a real credential resolver until a later plan explicitly approves secret provider boundaries and external endpoint handling.",
    },
  ];
}

function arraysEqual(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}
