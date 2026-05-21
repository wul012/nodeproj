import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification.js";
import type {
  DisabledRuntimeShellBoundary,
  DisabledRuntimeShellPrePlan,
  DisabledRuntimeShellPrePlanIntake,
  DisabledRuntimeShellPrePlanIntakeChecks,
  DisabledRuntimeShellPrePlanIntakeMessage,
  DisabledRuntimeShellPrePlanIntakeSummary,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntakeProfile,
  SourceNodeV293FakeHarnessBlockedDecisionUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntakeTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntakeMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntakeRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-pre-plan-intake.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-pre-plan-intake";
const SOURCE_NODE_V293_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-blocked-decision-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans2/v292-post-fake-harness-readiness-decision-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntakeProfile {
  const sourceNodeV293 = createSourceNodeV293(input.config);
  const boundaries = createDisabledRuntimeShellBoundaries();
  const disabledRuntimeShellPrePlan = createDisabledRuntimeShellPrePlan(boundaries);
  const prePlanIntake = createPrePlanIntake(disabledRuntimeShellPrePlan);
  const checks = createChecks(input.config, sourceNodeV293, disabledRuntimeShellPrePlan, prePlanIntake);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake")
      .every(([, value]) => value);
  const prePlanIntakeState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake
    ? "disabled-runtime-shell-pre-plan-intake-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(
    sourceNodeV293,
    disabledRuntimeShellPrePlan,
    checks,
    productionBlockers,
    warnings,
    recommendations,
  );

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver disabled runtime shell pre-plan intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    prePlanIntakeState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake,
    disabledRuntimeShellPrePlanIntakeOnly: true,
    readOnlyPrePlanIntake: true,
    consumesNodeV293BlockedDecisionUpstreamEchoVerification: true,
    readyForDisabledRuntimeShellDesignReview:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake,
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
    testOnlyFakeHarnessAllowed: false,
    testOnlyFakeHarnessExecutionAllowed: false,
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
    sourceNodeV293,
    disabledRuntimeShellPrePlan,
    prePlanIntake,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledRuntimeShellPrePlanIntakeJson: ROUTE_PATH,
      disabledRuntimeShellPrePlanIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV293Json: SOURCE_NODE_V293_ROUTE,
      sourceNodeV293Markdown: `${SOURCE_NODE_V293_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v294 as a disabled runtime shell pre-plan intake, not a runtime implementation.",
      "Use Node v295 only for a design-review or upstream-echo step unless a new plan explicitly authorizes implementation.",
      "Keep runtime shell implementation, invocation, credential values, raw endpoint URLs, provider clients, external requests, writes, migrations, and auto-start blocked.",
    ],
  };
}

function createSourceNodeV293(
  config: AppConfig,
): SourceNodeV293FakeHarnessBlockedDecisionUpstreamEchoVerificationReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification({
    config,
  });
  return {
    sourceVersion: "Node v293",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForBlockedDecisionUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification,
    verificationDigest: source.echoVerification.verificationDigest,
    sourceSpan: source.echoVerification.sourceSpan,
    sourceNodeV292Ready: source.echoVerification.sourceNodeV292Ready,
    javaV131EchoReady: source.echoVerification.javaV131EchoReady,
    miniKvV129RetentionReady: source.echoVerification.miniKvV129RetentionReady,
    blockedDecisionAligned: source.echoVerification.blockedDecisionAligned,
    missingJavaEchoResolved: source.echoVerification.missingJavaEchoResolved,
    sideEffectBoundariesAligned: source.echoVerification.sideEffectBoundariesAligned,
    implementationStillBlocked: source.echoVerification.implementationStillBlocked,
    readyForDisabledRuntimeShellPlanning: source.readyForDisabledRuntimeShellPlanning,
    readyForManagedAuditResolverImplementation: source.readyForManagedAuditResolverImplementation,
    readyForManagedAuditSandboxAdapterConnection: source.readyForManagedAuditSandboxAdapterConnection,
    realResolverImplementationAllowed: source.realResolverImplementationAllowed,
    testOnlyFakeHarnessAllowed: source.testOnlyFakeHarnessAllowed,
    testOnlyFakeHarnessExecutionAllowed: source.testOnlyFakeHarnessExecutionAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    readsManagedAuditCredential: source.readsManagedAuditCredential,
    storesManagedAuditCredential: source.storesManagedAuditCredential,
    credentialValueRead: source.credentialValueRead,
    credentialValueProvided: source.credentialValueProvided,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    rawEndpointUrlRendered: source.rawEndpointUrlRendered,
    externalRequestSent: source.externalRequestSent,
    secretProviderInstantiated: source.secretProviderInstantiated,
    resolverClientInstantiated: source.resolverClientInstantiated,
    fakeSecretProviderInstantiated: source.fakeSecretProviderInstantiated,
    fakeResolverClientInstantiated: source.fakeResolverClientInstantiated,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalLedgerWritten: source.approvalLedgerWritten,
    automaticUpstreamStart: source.automaticUpstreamStart,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    evidenceFileCount: source.summary.evidenceFileCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
  };
}

function createDisabledRuntimeShellBoundaries(): DisabledRuntimeShellBoundary[] {
  return [
    {
      code: "SOURCE_ECHO_GATE",
      title: "Source echo gate",
      status: "defined-for-review",
      owner: "release-manager",
      implementationRule: "A disabled runtime shell may only be discussed after Node v293 proves Java v131 and mini-kv v129 closed the blocked-decision evidence gap.",
      prohibitedActions: ["skip-v293-verification", "treat-quality-evidence-as-runtime-approval"],
      verificationEvidence: "sourceNodeV293.readyForBlockedDecisionUpstreamEchoVerification=true",
    },
    {
      code: "SHELL_NAME_AND_SCOPE",
      title: "Shell name and scope",
      status: "defined-for-review",
      owner: "node",
      implementationRule: "The only allowed shell name for future review is disabled-fake-harness-runtime-shell; v294 defines the name but creates no implementation.",
      prohibitedActions: ["create-runtime-shell-class", "invoke-runtime-shell"],
      verificationEvidence: "disabledRuntimeShellPrePlan.shellName=disabled-fake-harness-runtime-shell",
    },
    {
      code: "FEATURE_FLAG_POLICY",
      title: "Feature flag policy",
      status: "defined-for-review",
      owner: "release-manager",
      implementationRule: "Any future shell requires a dedicated disabled-by-default flag and an approval gate; v294 adds neither runtime flag nor runtime code.",
      prohibitedActions: ["enable-runtime-shell-by-default", "reuse-upstream-actions-flag-as-approval"],
      verificationEvidence: "runtimeShellEnabled=false and executionAllowed=false",
    },
    {
      code: "CREDENTIAL_HANDLE_ONLY",
      title: "Credential handle only",
      status: "defined-for-review",
      owner: "security",
      implementationRule: "The shell review can reference credential handles and review states only; values cannot be read, stored, rendered, or tested.",
      prohibitedActions: ["read-credential-value", "store-credential-value", "render-credential-value"],
      verificationEvidence: "credentialValueRead=false and readsManagedAuditCredential=false",
    },
    {
      code: "ENDPOINT_HANDLE_ONLY",
      title: "Endpoint handle only",
      status: "defined-for-review",
      owner: "security",
      implementationRule: "The shell review can reference endpoint handles and allowlist state only; raw endpoint URLs cannot be parsed or rendered.",
      prohibitedActions: ["parse-raw-endpoint-url", "render-raw-endpoint-url"],
      verificationEvidence: "rawEndpointUrlParsed=false and rawEndpointUrlRendered=false",
    },
    {
      code: "PROVIDER_CLIENT_BOUNDARY",
      title: "Provider and client boundary",
      status: "defined-for-review",
      owner: "node",
      implementationRule: "v294 cannot instantiate real or fake secret providers, resolver clients, or managed-audit adapters.",
      prohibitedActions: ["instantiate-secret-provider", "instantiate-resolver-client", "instantiate-fake-provider"],
      verificationEvidence: "secretProviderInstantiated=false and fakeResolverClientInstantiated=false",
    },
    {
      code: "NETWORK_BOUNDARY",
      title: "Network boundary",
      status: "defined-for-review",
      owner: "security",
      implementationRule: "v294 sends no HTTP/TCP traffic and opens no managed-audit connection; future review must keep dry-run mode separate from network dials.",
      prohibitedActions: ["send-http-request", "send-tcp-request", "connect-managed-audit"],
      verificationEvidence: "externalRequestSent=false and connectsManagedAudit=false",
    },
    {
      code: "WRITE_BOUNDARY",
      title: "Write boundary",
      status: "defined-for-review",
      owner: "release-manager",
      implementationRule: "v294 cannot write approval ledger, managed audit state, schema, migration, or storage records.",
      prohibitedActions: ["write-approval-ledger", "execute-schema-migration", "write-managed-audit-state"],
      verificationEvidence: "approvalLedgerWritten=false and schemaMigrationExecuted=false",
    },
    {
      code: "OPERATOR_APPROVAL_BOUNDARY",
      title: "Operator approval boundary",
      status: "defined-for-review",
      owner: "operator",
      implementationRule: "Future shell design review must bind operator identity, approval correlation, and a manual window marker before any implementation review.",
      prohibitedActions: ["auto-approve-runtime-shell", "invoke-without-operator-marker"],
      verificationEvidence: "executionAllowed=false and productionWindowStillBlocked=true",
    },
    {
      code: "TEST_STRATEGY_AND_ABORT",
      title: "Test strategy and abort marker",
      status: "defined-for-review",
      owner: "node",
      implementationRule: "Future work must add tests for default-disabled behavior, explicit blocking, no network, no credential, and abort semantics before runtime code exists.",
      prohibitedActions: ["ship-runtime-without-abort-test", "ship-runtime-without-default-disabled-test"],
      verificationEvidence: "testOnlyFakeHarnessExecutionAllowed=false and runtimeShellInvocationAllowed=false",
    },
  ];
}

function createDisabledRuntimeShellPrePlan(
  boundaries: DisabledRuntimeShellBoundary[],
): DisabledRuntimeShellPrePlan {
  const planBody = {
    planVersion: "node-v294-disabled-runtime-shell-pre-plan-intake.v1",
    planMode: "pre-plan-intake-only",
    sourceSpan: "Node v293",
    shellName: "disabled-fake-harness-runtime-shell",
    boundaries,
    runtimeShellImplementationAllowed: false,
    runtimeShellInvocationAllowed: false,
    fakeHarnessRuntimeAllowed: false,
    credentialValueReadAllowed: false,
    rawEndpointUrlParseAllowed: false,
    providerClientInstantiationAllowed: false,
    externalRequestAllowed: false,
    schemaMigrationAllowed: false,
    approvalLedgerWriteAllowed: false,
    automaticUpstreamStartAllowed: false,
  } as const;

  return {
    ...planBody,
    planDigest: sha256StableJson(planBody),
    boundaryCount: boundaries.length,
    definedBoundaryCount: boundaries.filter((boundary) => boundary.status === "defined-for-review").length,
    allRequiredBoundariesDefined:
      boundaries.length === 10
      && boundaries.every((boundary) => boundary.status === "defined-for-review"),
  };
}

function createPrePlanIntake(plan: DisabledRuntimeShellPrePlan): DisabledRuntimeShellPrePlanIntake {
  const hasBoundary = (code: DisabledRuntimeShellBoundary["code"]) =>
    plan.boundaries.some((boundary) => boundary.code === code && boundary.status === "defined-for-review");
  const intakeBody = {
    intakeMode: "node-v294-disabled-runtime-shell-pre-plan-intake-only",
    consumedNodeVersion: "Node v293",
    requiredBoundaryCount: 10,
    definedBoundaryCount: plan.definedBoundaryCount,
    missingBoundaryCount: 10 - plan.definedBoundaryCount,
    sourceEchoGateDefined: hasBoundary("SOURCE_ECHO_GATE"),
    shellNameAndScopeDefined: hasBoundary("SHELL_NAME_AND_SCOPE"),
    featureFlagPolicyDefined: hasBoundary("FEATURE_FLAG_POLICY"),
    credentialHandleOnlyDefined: hasBoundary("CREDENTIAL_HANDLE_ONLY"),
    endpointHandleOnlyDefined: hasBoundary("ENDPOINT_HANDLE_ONLY"),
    providerClientBoundaryDefined: hasBoundary("PROVIDER_CLIENT_BOUNDARY"),
    networkBoundaryDefined: hasBoundary("NETWORK_BOUNDARY"),
    writeBoundaryDefined: hasBoundary("WRITE_BOUNDARY"),
    operatorApprovalBoundaryDefined: hasBoundary("OPERATOR_APPROVAL_BOUNDARY"),
    testStrategyAndAbortDefined: hasBoundary("TEST_STRATEGY_AND_ABORT"),
    nextNodeReviewVersion: "Node v295",
    nextJavaEchoVersion: "Java v132",
    nextMiniKvReceiptVersion: "mini-kv v130",
  } as const;

  return {
    ...intakeBody,
    intakeDigest: sha256StableJson(intakeBody),
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV293: SourceNodeV293FakeHarnessBlockedDecisionUpstreamEchoVerificationReference,
  plan: DisabledRuntimeShellPrePlan,
  intake: DisabledRuntimeShellPrePlanIntake,
): DisabledRuntimeShellPrePlanIntakeChecks {
  return {
    sourceNodeV293Ready:
      sourceNodeV293.verificationState === "fake-harness-readiness-blocked-decision-upstream-echo-verification-ready"
      && sourceNodeV293.readyForBlockedDecisionUpstreamEchoVerification
      && sourceNodeV293.sourceNodeV292Ready
      && sourceNodeV293.javaV131EchoReady
      && sourceNodeV293.miniKvV129RetentionReady,
    sourceNodeV293KeepsRuntimeShellBlocked:
      sourceNodeV293.readyForDisabledRuntimeShellPlanning === false
      && sourceNodeV293.testOnlyFakeHarnessAllowed === false
      && sourceNodeV293.testOnlyFakeHarnessExecutionAllowed === false,
    sourceNodeV293KeepsExecutionBlocked:
      sourceNodeV293.implementationStillBlocked
      && sourceNodeV293.executionAllowed === false
      && sourceNodeV293.realResolverImplementationAllowed === false,
    sourceNodeV293KeepsCredentialBoundaryClosed:
      sourceNodeV293.credentialValueRead === false
      && sourceNodeV293.credentialValueProvided === false
      && sourceNodeV293.readsManagedAuditCredential === false
      && sourceNodeV293.storesManagedAuditCredential === false,
    sourceNodeV293KeepsEndpointBoundaryClosed:
      sourceNodeV293.rawEndpointUrlParsed === false
      && sourceNodeV293.rawEndpointUrlRendered === false,
    sourceNodeV293KeepsConnectionBoundaryClosed:
      sourceNodeV293.connectsManagedAudit === false
      && sourceNodeV293.externalRequestSent === false
      && sourceNodeV293.secretProviderInstantiated === false
      && sourceNodeV293.resolverClientInstantiated === false
      && sourceNodeV293.fakeSecretProviderInstantiated === false
      && sourceNodeV293.fakeResolverClientInstantiated === false,
    sourceNodeV293KeepsWriteBoundaryClosed:
      sourceNodeV293.schemaMigrationExecuted === false
      && sourceNodeV293.approvalLedgerWritten === false,
    sourceNodeV293KeepsAutoStartBoundaryClosed: sourceNodeV293.automaticUpstreamStart === false,
    sourceEchoGateDefined: intake.sourceEchoGateDefined,
    shellNameAndScopeDefined: intake.shellNameAndScopeDefined,
    featureFlagPolicyDefined: intake.featureFlagPolicyDefined,
    credentialHandleOnlyDefined: intake.credentialHandleOnlyDefined,
    endpointHandleOnlyDefined: intake.endpointHandleOnlyDefined,
    providerClientBoundaryDefined: intake.providerClientBoundaryDefined,
    networkBoundaryDefined: intake.networkBoundaryDefined,
    writeBoundaryDefined: intake.writeBoundaryDefined,
    operatorApprovalBoundaryDefined: intake.operatorApprovalBoundaryDefined,
    testStrategyAndAbortDefined: intake.testStrategyAndAbortDefined,
    allTenBoundariesDefined:
      plan.boundaryCount === 10
      && plan.definedBoundaryCount === 10
      && plan.allRequiredBoundariesDefined
      && intake.missingBoundaryCount === 0,
    runtimeShellImplementationStillForbidden:
      plan.runtimeShellImplementationAllowed === false
      && plan.fakeHarnessRuntimeAllowed === false,
    runtimeShellInvocationStillForbidden: plan.runtimeShellInvocationAllowed === false,
    providerClientInstantiationStillForbidden: plan.providerClientInstantiationAllowed === false,
    externalRequestStillForbidden: plan.externalRequestAllowed === false,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake: false,
  };
}

function createSummary(
  sourceNodeV293: SourceNodeV293FakeHarnessBlockedDecisionUpstreamEchoVerificationReference,
  plan: DisabledRuntimeShellPrePlan,
  checks: DisabledRuntimeShellPrePlanIntakeChecks,
  productionBlockers: DisabledRuntimeShellPrePlanIntakeMessage[],
  warnings: DisabledRuntimeShellPrePlanIntakeMessage[],
  recommendations: DisabledRuntimeShellPrePlanIntakeMessage[],
): DisabledRuntimeShellPrePlanIntakeSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceCheckCount: sourceNodeV293.checkCount,
    sourcePassedCheckCount: sourceNodeV293.passedCheckCount,
    sourceEvidenceFileCount: sourceNodeV293.evidenceFileCount,
    boundaryCount: plan.boundaryCount,
    definedBoundaryCount: plan.definedBoundaryCount,
    prohibitedActionCount: plan.boundaries.reduce((total, boundary) => total + boundary.prohibitedActions.length, 0),
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: DisabledRuntimeShellPrePlanIntakeChecks,
): DisabledRuntimeShellPrePlanIntakeMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: DisabledRuntimeShellPrePlanIntakeMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV293Ready,
      code: "SOURCE_NODE_V293_NOT_READY",
      source: "node-v293-fake-harness-readiness-blocked-decision-upstream-echo-verification",
      message: "Node v294 must consume a ready Node v293 blocked-decision upstream echo verification.",
    },
    {
      condition: checks.sourceNodeV293KeepsRuntimeShellBlocked,
      code: "SOURCE_RUNTIME_SHELL_NOT_BLOCKED",
      source: "node-v293-fake-harness-readiness-blocked-decision-upstream-echo-verification",
      message: "Node v293 must still block disabled runtime shell planning and fake harness execution.",
    },
    {
      condition: checks.sourceNodeV293KeepsCredentialBoundaryClosed,
      code: "SOURCE_CREDENTIAL_BOUNDARY_OPEN",
      source: "node-v293-fake-harness-readiness-blocked-decision-upstream-echo-verification",
      message: "Node v293 must keep credential values unread and unavailable.",
    },
    {
      condition: checks.sourceNodeV293KeepsConnectionBoundaryClosed,
      code: "SOURCE_CONNECTION_BOUNDARY_OPEN",
      source: "node-v293-fake-harness-readiness-blocked-decision-upstream-echo-verification",
      message: "Node v293 must keep providers, clients, managed audit connections, and external requests closed.",
    },
    {
      condition: checks.allTenBoundariesDefined,
      code: "DISABLED_RUNTIME_SHELL_BOUNDARIES_INCOMPLETE",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-pre-plan-intake",
      message: "Node v294 must define all ten disabled runtime shell boundaries before it can be archived.",
    },
    {
      condition: checks.runtimeShellImplementationStillForbidden,
      code: "RUNTIME_SHELL_IMPLEMENTATION_ALLOWED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-pre-plan-intake",
      message: "v294 cannot allow runtime shell implementation.",
    },
    {
      condition: checks.externalRequestStillForbidden,
      code: "EXTERNAL_REQUEST_ALLOWED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-pre-plan-intake",
      message: "v294 cannot allow HTTP/TCP or managed audit external requests.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false for v294 pre-plan intake.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false for v294 pre-plan intake.",
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

function collectWarnings(): DisabledRuntimeShellPrePlanIntakeMessage[] {
  return [
    {
      code: "PRE_PLAN_INTAKE_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-pre-plan-intake",
      message: "Node v294 defines disabled runtime shell review boundaries only; it does not implement, enable, or invoke a shell.",
    },
    {
      code: "IMPLEMENTATION_REQUIRES_NEW_PLAN",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-pre-plan-intake",
      message: "A later version must explicitly authorize any disabled runtime shell implementation; v294 cannot be used as that authorization.",
    },
  ];
}

function collectRecommendations(): DisabledRuntimeShellPrePlanIntakeMessage[] {
  return [
    {
      code: "RUN_V295_DESIGN_REVIEW",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-pre-plan-intake",
      message: "Use Node v295 for a design-review or upstream-echo step before considering any runtime shell code.",
    },
    {
      code: "ASK_JAVA_V132_MINI_KV_V130_ONLY_IF_ECHO_REQUIRED",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-pre-plan-intake",
      message: "Request Java v132 and mini-kv v130 only if the next plan needs cross-project echo; otherwise keep v295 Node-only.",
    },
  ];
}
