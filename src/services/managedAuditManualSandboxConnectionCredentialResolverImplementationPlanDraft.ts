import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification.js";
import type {
  CredentialResolverImplementationInterfaceBoundaryCode,
  CredentialResolverImplementationInterfaceBoundary,
  CredentialResolverImplementationPlanDraft,
  CredentialResolverImplementationPlanDraftChecks,
  CredentialResolverImplementationPlanDraftMessage,
  CredentialResolverImplementationPlanDraftReview,
  CredentialResolverImplementationUpstreamEchoRequirement,
  ManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraftProfile,
  SourceNodeV282ApprovalRequiredImplementationReadinessUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraftTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraftMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraftRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-draft.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-draft";
const NODE_V282_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans2/v282-post-upstream-echo-verification-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraftProfile {
  const sourceNodeV282 = createSourceNodeV282(input.config);
  const interfaceBoundaries = createInterfaceBoundaries();
  const javaV121EchoRequirements = createJavaV121EchoRequirements();
  const miniKvV126ReceiptRequirements = createMiniKvV126ReceiptRequirements();
  const implementationPlan = createImplementationPlan(
    interfaceBoundaries,
    javaV121EchoRequirements,
    miniKvV126ReceiptRequirements,
  );
  const checks = createChecks(input.config, sourceNodeV282, implementationPlan);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft =
    Object.entries(checks)
      .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft")
      .every(([, value]) => value);
  const planState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft
    ? "credential-resolver-implementation-plan-draft-ready"
    : "blocked";
  const implementationPlanReview = createImplementationPlanReview(sourceNodeV282, implementationPlan, checks);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver implementation plan draft",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    planState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft,
    planDraftOnly: true,
    readOnlyPlanDraft: true,
    implementationPlanDraftOnly: true,
    consumesNodeV282ApprovalRequiredImplementationReadinessEchoVerification: true,
    readyForJavaV121MiniKvV126Echo: implementationPlanReview.readyForJavaV121MiniKvV126Echo,
    readyForManagedAuditResolverImplementation: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    realResolverImplementationAllowed: false,
    testOnlyFakeHarnessAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlRendered: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    approvalLedgerWritten: false,
    automaticUpstreamStart: false,
    sourceNodeV282,
    implementationPlan,
    implementationPlanReview,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      sourceCheckCount: sourceNodeV282.checkCount,
      sourcePassedCheckCount: sourceNodeV282.passedCheckCount,
      interfaceBoundaryCount: implementationPlan.interfaceBoundaryCount,
      requiredArtifactCount: implementationPlan.requiredArtifactCount,
      prohibitedActionCount: implementationPlan.prohibitedActionCount,
      javaEchoRequirementCount: implementationPlan.javaV121EchoRequirements.length,
      miniKvReceiptRequirementCount: implementationPlan.miniKvV126ReceiptRequirements.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      implementationPlanDraftJson: ROUTE_PATH,
      implementationPlanDraftMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV282Json: NODE_V282_ROUTE,
      sourceNodeV282Markdown: `${NODE_V282_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextRecommendedParallelJavaV121: "Java v121 resolver implementation plan echo",
      nextRecommendedParallelMiniKvV126: "mini-kv v126 resolver implementation plan non-participation receipt",
      nextNodeVerificationVersion: "Node v284",
      futureFakeHarnessPrecheckVersion: "Node v285",
    },
    nextActions: [
      "Archive Node v283 with JSON, Markdown, screenshot, explanation, and code walkthrough evidence.",
      "Ask Java v121 and mini-kv v126 to consume this plan in parallel after Node v283 is tagged.",
      "Use Node v284 to verify Java v121 and mini-kv v126 plan echo evidence before writing any fake harness.",
      "Defer the test-only fake resolver harness until Node v285 and keep it disabled, side-effect free, and credential-value blind.",
      "Do not implement a real resolver, instantiate a secret provider, parse raw endpoint URLs, send HTTP/TCP, run schema migration, write ledger state, or auto-start upstream services in this stage.",
    ],
  };
}

function createSourceNodeV282(
  config: AppConfig,
): SourceNodeV282ApprovalRequiredImplementationReadinessUpstreamEchoVerificationReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification({
    config,
  });
  return {
    sourceVersion: "Node v282",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForApprovalRequiredImplementationReadinessUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification,
    readyForNodeV283ImplementationPlanDraft: source.echoVerification.readyForNodeV283ImplementationPlanDraft,
    verificationDigest: source.echoVerification.verificationDigest,
    sourceSpan: source.echoVerification.sourceSpan,
    sourceNodeV281Ready: source.echoVerification.sourceNodeV281Ready,
    javaV116EchoReady: source.echoVerification.javaV116EchoReady,
    miniKvV122NonParticipationReady: source.echoVerification.miniKvV122NonParticipationReady,
    boundaryReadinessAligned: source.echoVerification.boundaryReadinessAligned,
    requiredArtifactsAligned: source.echoVerification.requiredArtifactsAligned,
    readinessCountsAligned: source.echoVerification.readinessCountsAligned,
    sideEffectBoundariesAligned: source.echoVerification.sideEffectBoundariesAligned,
    implementationStillBlocked: source.echoVerification.implementationStillBlocked,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    boundaryCount: source.summary.boundaryCount,
    requiredArtifactCount: source.summary.requiredArtifactCount,
    readyForManagedAuditResolverImplementation: source.readyForManagedAuditResolverImplementation,
    realResolverImplementationAllowed: source.realResolverImplementationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    readsManagedAuditCredential: source.readsManagedAuditCredential,
    storesManagedAuditCredential: source.storesManagedAuditCredential,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    secretProviderInstantiated: source.secretProviderInstantiated,
    resolverClientInstantiated: source.resolverClientInstantiated,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalLedgerWritten: source.approvalLedgerWritten,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createInterfaceBoundaries(): CredentialResolverImplementationInterfaceBoundary[] {
  return [
    boundary(
      "CONFIG_HANDLE_CONTRACT",
      "PLAN_DOCUMENT",
      "Config handle contract",
      "node",
      ["ORDEROPS_MANAGED_AUDIT_RESOLVER_CONFIG_HANDLE", "ORDEROPS_MANAGED_AUDIT_RESOLVER_POLICY_HANDLE"],
      ["configHandle", "policyHandle", "reviewStatus"],
      ["read-secret-env-value", "render-secret-env-value", "instantiate-runtime-client"],
      ["config-handle-review-id", "resolver-policy-handle-review-id", "config-redaction-contract"],
      "Only named handles may appear in profile output; no raw config values or external client objects are created.",
    ),
    boundary(
      "CREDENTIAL_HANDLE_CONTRACT",
      "CREDENTIAL_HANDLE",
      "Credential handle contract",
      "security",
      ["credentialHandle", "credentialReviewStatus"],
      ["credentialHandle", "credentialReviewStatus", "credentialValuePresent=false"],
      ["read-credential-value", "store-credential-value", "render-credential-value"],
      ["credential-handle-review-id", "credential-value-redaction-contract", "operator-visible-secret-value-prohibition"],
      "Profiles may reference credential handles only; credential values stay outside Node, Java, and mini-kv.",
    ),
    boundary(
      "ENDPOINT_HANDLE_CONTRACT",
      "ENDPOINT_HANDLE",
      "Endpoint handle contract",
      "security",
      ["endpointHandle", "allowlistReviewStatus"],
      ["endpointHandle", "allowlistReviewStatus", "rawEndpointUrlPresent=false"],
      ["parse-raw-endpoint-url", "render-raw-endpoint-url", "dial-managed-audit-endpoint"],
      ["endpoint-handle-review-id", "allowlist-review-status", "raw-endpoint-redaction-contract"],
      "Endpoint evidence may name handles and review status only; raw URLs stay out of logs, digests, and Markdown.",
    ),
    boundary(
      "APPROVAL_ARTIFACT_CONTRACT",
      "OPERATOR_APPROVAL",
      "Approval artifact contract",
      "operator",
      ["operatorIdentityBinding", "approvalCorrelationId", "manualWindowMarker"],
      ["approvalArtifactDigest", "approvalState", "manualWindowStatus"],
      ["auto-approve-operation", "execute-without-operator-marker", "write-approval-ledger"],
      ["operator-identity-binding", "approval-correlation-marker", "manual-window-open-marker"],
      "A later fake harness may only read approval artifacts; real ledger writes stay blocked until a separate write gate.",
    ),
    boundary(
      "FAILURE_TAXONOMY_CONTRACT",
      "EXTERNAL_REQUEST_SIMULATION",
      "Failure taxonomy contract",
      "node",
      ["simulatedFailureClass", "dryRunAdapterResult", "blockedReason"],
      ["failureClass", "operatorVisibleReason", "retryDisposition"],
      ["send-external-request", "connect-managed-audit", "mask-unclassified-error"],
      ["failure-taxonomy-id", "operator-visible-failure-map", "retry-policy-review-id"],
      "Future fake harness errors must be classified without contacting managed audit or exposing secret/endpoint material.",
    ),
    boundary(
      "ROLLBACK_GUARD_CONTRACT",
      "ROLLBACK_BOUNDARY",
      "Rollback guard contract",
      "release-manager",
      ["rollbackAbortMarker", "restorePointReviewId", "manualRollbackRunbookReference"],
      ["rollbackGuardState", "abortRequired=true", "executionAllowed=false"],
      ["execute-rollback", "deploy-resolver-without-abort-marker", "auto-start-upstream"],
      ["rollback-abort-marker", "restore-point-review-id", "manual-rollback-runbook-reference"],
      "Resolver implementation remains blocked unless rollback guard evidence exists; this plan executes no rollback.",
    ),
    boundary(
      "TEST_ONLY_FAKE_HARNESS_CONTRACT",
      "DISABLED_SECRET_PROVIDER_STUB",
      "Test-only fake harness contract",
      "node",
      ["fakeCredentialHandle", "fakeEndpointHandle", "testOnlyHarnessToggle=false"],
      ["fakeHarnessPlan", "sideEffectBoundary", "runtimeToggleState"],
      ["instantiate-real-secret-provider", "resolve-real-credential", "send-real-http-request"],
      ["test-only-fake-harness-plan-id", "fake-harness-disabled-toggle", "fake-harness-side-effect-contract"],
      "Node v285 may define a disabled fake harness precheck only after Java v121, mini-kv v126, and Node v284 align.",
    ),
  ];
}

function boundary(
  code: CredentialResolverImplementationInterfaceBoundaryCode,
  sourceBoundary: CredentialResolverImplementationInterfaceBoundary["sourceBoundary"],
  title: string,
  owner: CredentialResolverImplementationInterfaceBoundary["owner"],
  allowedInputs: string[],
  allowedOutputs: string[],
  prohibitedActions: string[],
  requiredArtifacts: string[],
  verificationRule: string,
): CredentialResolverImplementationInterfaceBoundary {
  return {
    code,
    sourceBoundary,
    title,
    owner,
    status: "drafted-for-upstream-echo",
    allowedInputs,
    allowedOutputs,
    prohibitedActions,
    requiredArtifacts,
    verificationRule,
  };
}

function createJavaV121EchoRequirements(): CredentialResolverImplementationUpstreamEchoRequirement[] {
  return [
    javaRequirement("java-v121-consumes-node-v283-plan", "Java v121 must identify Node v283 planDigest and planVersion without deriving credential values."),
    javaRequirement("java-v121-approval-artifact-boundary", "Java v121 must describe required operator approval and ledger policy artifacts without writing approval ledger state."),
    javaRequirement("java-v121-schema-migration-boundary", "Java v121 must keep schema migration review-only and prove no SQL execution."),
    javaRequirement("java-v121-failure-taxonomy-echo", "Java v121 must echo failure taxonomy expectations for future Node v284 verification."),
  ];
}

function createMiniKvV126ReceiptRequirements(): CredentialResolverImplementationUpstreamEchoRequirement[] {
  return [
    miniKvRequirement("mini-kv-v126-consumes-node-v283-plan", "mini-kv v126 must identify Node v283 planDigest and remain non-participating."),
    miniKvRequirement("mini-kv-v126-no-storage-backend", "mini-kv v126 must prove it is not a managed audit storage backend and not authoritative for audit/order state."),
    miniKvRequirement("mini-kv-v126-no-secret-or-endpoint", "mini-kv v126 must prove no credential resolver, no secret provider, and no raw endpoint parser."),
    miniKvRequirement("mini-kv-v126-no-write-command", "mini-kv v126 must keep write/admin commands out of this plan echo receipt."),
  ];
}

function javaRequirement(
  id: string,
  requirement: string,
): CredentialResolverImplementationUpstreamEchoRequirement {
  return upstreamRequirement(id, "java", "Java v121", requirement);
}

function miniKvRequirement(
  id: string,
  requirement: string,
): CredentialResolverImplementationUpstreamEchoRequirement {
  return upstreamRequirement(id, "mini-kv", "mini-kv v126", requirement);
}

function upstreamRequirement(
  id: string,
  project: "java" | "mini-kv",
  expectedVersion: "Java v121" | "mini-kv v126",
  requirement: string,
): CredentialResolverImplementationUpstreamEchoRequirement {
  return {
    id,
    project,
    expectedVersion,
    requirement,
    mustRemainReadOnly: true,
    mustNotConnectManagedAudit: true,
    mustNotReadCredentialValue: true,
    mustNotParseRawEndpointUrl: true,
    mustNotWriteLedgerOrState: true,
  };
}

function createImplementationPlan(
  interfaceBoundaries: CredentialResolverImplementationInterfaceBoundary[],
  javaV121EchoRequirements: CredentialResolverImplementationUpstreamEchoRequirement[],
  miniKvV126ReceiptRequirements: CredentialResolverImplementationUpstreamEchoRequirement[],
): CredentialResolverImplementationPlanDraft {
  const planBody = {
    planVersion: "node-v283-credential-resolver-implementation-plan-draft.v1",
    planMode: "implementation-plan-draft-only",
    sourceSpan: "Node v282",
    interfaceBoundaries,
    javaV121EchoRequirements,
    miniKvV126ReceiptRequirements,
    realResolverImplementationAllowed: false,
    testOnlyFakeHarnessAllowed: false,
    secretProviderRuntimeAllowed: false,
    credentialValueReadAllowed: false,
    rawEndpointUrlParseAllowed: false,
    rawEndpointUrlRenderAllowed: false,
    externalRequestAllowed: false,
    schemaMigrationAllowed: false,
    approvalLedgerWriteAllowed: false,
    automaticUpstreamStartAllowed: false,
  } as const;

  const requiredArtifacts = interfaceBoundaries.flatMap((boundaryItem) => boundaryItem.requiredArtifacts);
  const prohibitedActions = interfaceBoundaries.flatMap((boundaryItem) => boundaryItem.prohibitedActions);

  return {
    ...planBody,
    planDigest: sha256StableJson(planBody),
    interfaceBoundaryCount: interfaceBoundaries.length,
    requiredArtifactCount: new Set(requiredArtifacts).size,
    prohibitedActionCount: new Set(prohibitedActions).size,
    allInterfaceBoundariesDefined: interfaceBoundaries.length === 7
      && interfaceBoundaries.every((boundaryItem) => boundaryItem.status === "drafted-for-upstream-echo"),
    allRequiredArtifactsNamed: interfaceBoundaries.every((boundaryItem) => boundaryItem.requiredArtifacts.length > 0),
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV282: SourceNodeV282ApprovalRequiredImplementationReadinessUpstreamEchoVerificationReference,
  implementationPlan: CredentialResolverImplementationPlanDraft,
): CredentialResolverImplementationPlanDraftChecks {
  const hasBoundary = (code: CredentialResolverImplementationInterfaceBoundaryCode) =>
    implementationPlan.interfaceBoundaries.some((boundaryItem) => boundaryItem.code === code);
  return {
    sourceNodeV282Ready: sourceNodeV282.readyForApprovalRequiredImplementationReadinessUpstreamEchoVerification,
    sourceNodeV282AllowsPlanDraft: sourceNodeV282.readyForNodeV283ImplementationPlanDraft,
    sourceNodeV282KeepsImplementationBlocked: sourceNodeV282.implementationStillBlocked
      && !sourceNodeV282.readyForManagedAuditResolverImplementation
      && !sourceNodeV282.realResolverImplementationAllowed,
    configHandleContractDefined: hasBoundary("CONFIG_HANDLE_CONTRACT"),
    credentialHandleContractDefined: hasBoundary("CREDENTIAL_HANDLE_CONTRACT"),
    endpointHandleContractDefined: hasBoundary("ENDPOINT_HANDLE_CONTRACT"),
    approvalArtifactContractDefined: hasBoundary("APPROVAL_ARTIFACT_CONTRACT"),
    failureTaxonomyContractDefined: hasBoundary("FAILURE_TAXONOMY_CONTRACT"),
    rollbackGuardContractDefined: hasBoundary("ROLLBACK_GUARD_CONTRACT"),
    testOnlyFakeHarnessContractDefined: hasBoundary("TEST_ONLY_FAKE_HARNESS_CONTRACT"),
    allInterfaceBoundariesDefined: implementationPlan.allInterfaceBoundariesDefined,
    allRequiredArtifactsNamed: implementationPlan.allRequiredArtifactsNamed,
    javaV121EchoRequirementsDefined: implementationPlan.javaV121EchoRequirements.length === 4
      && implementationPlan.javaV121EchoRequirements.every((requirement) => requirement.mustRemainReadOnly),
    miniKvV126ReceiptRequirementsDefined: implementationPlan.miniKvV126ReceiptRequirements.length === 4
      && implementationPlan.miniKvV126ReceiptRequirements.every((requirement) => requirement.mustRemainReadOnly),
    realResolverImplementationStillBlocked: !implementationPlan.realResolverImplementationAllowed,
    testOnlyFakeHarnessStillDeferred: !implementationPlan.testOnlyFakeHarnessAllowed,
    credentialValueStillForbidden: !implementationPlan.credentialValueReadAllowed,
    rawEndpointStillForbidden: !implementationPlan.rawEndpointUrlParseAllowed
      && !implementationPlan.rawEndpointUrlRenderAllowed,
    externalRequestStillForbidden: !implementationPlan.externalRequestAllowed,
    secretProviderRuntimeStillDisabled: !implementationPlan.secretProviderRuntimeAllowed,
    resolverClientStillDisabled: !sourceNodeV282.resolverClientInstantiated,
    schemaMigrationStillReviewOnly: !implementationPlan.schemaMigrationAllowed,
    approvalLedgerWriteStillReviewOnly: !implementationPlan.approvalLedgerWriteAllowed,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft: false,
  };
}

function createImplementationPlanReview(
  sourceNodeV282: SourceNodeV282ApprovalRequiredImplementationReadinessUpstreamEchoVerificationReference,
  implementationPlan: CredentialResolverImplementationPlanDraft,
  checks: CredentialResolverImplementationPlanDraftChecks,
): CredentialResolverImplementationPlanDraftReview {
  const reviewBody = {
    reviewMode: "node-v283-implementation-plan-draft-only",
    consumedNodeVersion: "Node v282",
    nextJavaEchoVersion: "Java v121",
    nextMiniKvReceiptVersion: "mini-kv v126",
    nextNodeVerificationVersion: "Node v284",
    fakeHarnessDeferredUntil: "Node v285",
    interfaceBoundaryCount: implementationPlan.interfaceBoundaryCount,
    requiredArtifactCount: implementationPlan.requiredArtifactCount,
    prohibitedActionCount: implementationPlan.prohibitedActionCount,
    javaEchoRequirementCount: implementationPlan.javaV121EchoRequirements.length,
    miniKvReceiptRequirementCount: implementationPlan.miniKvV126ReceiptRequirements.length,
    sourceNodeV282Ready: checks.sourceNodeV282Ready,
    implementationStillBlocked: true,
    readyForJavaV121MiniKvV126Echo:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft,
  } as const;

  return {
    ...reviewBody,
    reviewDigest: sha256StableJson({
      planDigest: implementationPlan.planDigest,
      sourceDigest: sourceNodeV282.verificationDigest,
      checks,
      ...reviewBody,
    }),
  };
}

function collectProductionBlockers(
  checks: CredentialResolverImplementationPlanDraftChecks,
): CredentialResolverImplementationPlanDraftMessage[] {
  const messages: CredentialResolverImplementationPlanDraftMessage[] = [];
  addBlocker(messages, checks.sourceNodeV282Ready, "SOURCE_NODE_V282_NOT_READY", "node-v282-approval-required-implementation-readiness-upstream-echo-verification", "Node v282 must be ready before Node v283 can draft the resolver implementation plan.");
  addBlocker(messages, checks.sourceNodeV282AllowsPlanDraft, "SOURCE_NODE_V282_PLAN_DRAFT_NOT_ALLOWED", "node-v282-approval-required-implementation-readiness-upstream-echo-verification", "Node v282 must explicitly allow Node v283 implementation plan draft.");
  addBlocker(messages, checks.allInterfaceBoundariesDefined, "INTERFACE_BOUNDARIES_INCOMPLETE", "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-draft", "All seven implementation interface boundaries must be drafted.");
  addBlocker(messages, checks.allRequiredArtifactsNamed, "REQUIRED_ARTIFACTS_MISSING", "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-draft", "Each interface boundary must name required artifacts.");
  addBlocker(messages, checks.upstreamProbesStillDisabled, "UPSTREAM_PROBES_ENABLED", "runtime-config", "UPSTREAM_PROBES_ENABLED must remain false for the v283 plan draft.");
  addBlocker(messages, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false for the v283 plan draft.");
  return messages;
}

function collectWarnings(): CredentialResolverImplementationPlanDraftMessage[] {
  return [
    {
      code: "IMPLEMENTATION_STILL_BLOCKED",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-draft",
      message: "Node v283 intentionally writes a plan draft only; the real resolver and test-only fake harness remain blocked.",
    },
    {
      code: "UPSTREAM_ECHO_REQUIRED",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-draft",
      message: "Java v121 and mini-kv v126 must echo this draft before Node v284 can verify alignment.",
    },
  ];
}

function collectRecommendations(): CredentialResolverImplementationPlanDraftMessage[] {
  return [
    {
      code: "RUN_PARALLEL_JAVA_V121_MINIKV_V126",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-draft",
      message: "After Node v283 is archived, run Java v121 and mini-kv v126 in parallel because they only consume this plan draft.",
    },
    {
      code: "VERIFY_WITH_NODE_V284_BEFORE_FAKE_HARNESS",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-draft",
      message: "Use Node v284 as the echo verification gate before Node v285 introduces a disabled test-only fake harness precheck.",
    },
  ];
}

function addBlocker(
  messages: CredentialResolverImplementationPlanDraftMessage[],
  condition: boolean,
  code: string,
  source: CredentialResolverImplementationPlanDraftMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({
      code,
      severity: "blocker",
      source,
      message,
    });
  }
}
