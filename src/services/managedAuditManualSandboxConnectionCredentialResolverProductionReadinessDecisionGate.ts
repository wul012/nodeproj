import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification.js";
import type {
  CredentialResolverPreImplementationRequirements,
  CredentialResolverProductionReadinessDecisionGateChecks,
  CredentialResolverProductionReadinessDecisionGateMessage,
  ManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGateProfile,
  SourceNodeV267FakeShellArchiveUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGateTypes.js";
export {
  renderManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGateMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGateRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate";
const NODE_V267_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans/v266-post-fake-shell-archive-roadmap.md";
const NEXT_PLAN = "docs/plans/v268-post-production-readiness-decision-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGate(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGateProfile {
  const sourceNodeV267 = createSourceNodeV267(input.config);
  const preImplementationRequirements = createPreImplementationRequirements();
  const checks = createChecks(input.config, sourceNodeV267, preImplementationRequirements);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const decisionDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    sourceNodeV267VerificationDigest: sourceNodeV267.verificationDigest,
    preImplementationRequirements,
    checks,
    productionBlockerCodes: productionBlockers.map((blocker) => blocker.code),
  });

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver production readiness decision gate",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    decisionGateState: "blocked",
    readinessDecision: "blocked",
    decisionGateEvaluated: true,
    productionReadinessGateOnly: true,
    readOnlyDecisionGate: true,
    readyForCredentialResolverPreImplementationPlan: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    realResolverImplementationAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV267,
    preImplementationRequirements,
    productionReadinessDecision: {
      decisionDigest,
      decisionMode: "node-v268-production-readiness-decision-gate-only",
      sourceSpan: "Node v267",
      decision: "blocked",
      reason:
        "Node v267 proves the fake-shell archive echo chain is aligned, but no approved pre-implementation plan defines credential handle, endpoint handle, secret provider stub, operator approval, rollback, redaction, simulation, schema migration, or ledger write boundaries.",
      allowsRealResolverPreImplementationPlan: false,
      allowsRealCredentialResolverImplementation: false,
      allowsSecretProviderStub: false,
      allowsSecretProviderRuntime: false,
      allowsCredentialValueRead: false,
      allowsRawEndpointUrlParse: false,
      allowsExternalRequest: false,
      allowsManagedAuditConnection: false,
      allowsSchemaMigration: false,
      allowsApprovalLedgerWrite: false,
      allowsAutomaticUpstreamStart: false,
      nextPlanRequiredBeforeImplementation: true,
    },
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      sourceCheckCount: sourceNodeV267.checkCount,
      sourcePassedCheckCount: sourceNodeV267.passedCheckCount,
      archiveFileCount: sourceNodeV267.archiveFileCount,
      evidenceFileCount: sourceNodeV267.evidenceFileCount,
      requiredSnippetCount: sourceNodeV267.requiredSnippetCount,
      matchedSnippetCount: sourceNodeV267.matchedSnippetCount,
      missingPreImplementationRequirementCount: countMissingRequirements(preImplementationRequirements),
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      productionReadinessDecisionGateJson: ROUTE_PATH,
      productionReadinessDecisionGateMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV267Json: NODE_V267_ROUTE,
      sourceNodeV267Markdown: `${NODE_V267_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
    },
    nextActions: [
      "Archive Node v268 as a blocked production readiness decision gate with JSON, Markdown, screenshot, explanation, and code walkthrough evidence.",
      "Create a successor plan before any real credential resolver pre-implementation work.",
      "Keep credential values, raw endpoint URLs, real secret providers, real resolver clients, external requests, schema migration, ledger writes, and auto-start blocked.",
    ],
  };
}

function createSourceNodeV267(config: AppConfig): SourceNodeV267FakeShellArchiveUpstreamEchoVerificationReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification({
    config,
  });

  return {
    sourceVersion: "Node v267",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification,
    verificationDigest: source.echoVerification.verificationDigest,
    sourceSpan: source.echoVerification.sourceSpan,
    sourceNodeV266Ready: source.echoVerification.sourceNodeV266Ready,
    javaV110EchoReady: source.echoVerification.javaV110EchoReady,
    miniKvV117NonParticipationReady: source.echoVerification.miniKvV117NonParticipationReady,
    archiveCountsAligned: source.echoVerification.archiveCountsAligned,
    archiveSnippetsAligned: source.echoVerification.archiveSnippetsAligned,
    archiveNoRerunAligned: source.echoVerification.archiveNoRerunAligned,
    credentialBoundaryAligned: source.echoVerification.credentialBoundaryAligned,
    rawEndpointBoundaryAligned: source.echoVerification.rawEndpointBoundaryAligned,
    connectionBoundaryAligned: source.echoVerification.connectionBoundaryAligned,
    writeBoundaryAligned: source.echoVerification.writeBoundaryAligned,
    autoStartBoundaryAligned: source.echoVerification.autoStartBoundaryAligned,
    nodeV267BlocksRealResolver: source.echoVerification.nodeV267BlocksRealResolver,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    archiveFileCount: source.summary.archiveFileCount,
    evidenceFileCount: source.summary.evidenceFileCount,
    requiredSnippetCount: source.summary.requiredSnippetCount,
    matchedSnippetCount: source.summary.matchedSnippetCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
    readOnlyUpstreamEchoVerification: source.readOnlyUpstreamEchoVerification,
    archiveVerificationOnly: source.archiveVerificationOnly,
    readyForManagedAuditSandboxAdapterConnection: source.readyForManagedAuditSandboxAdapterConnection,
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
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createPreImplementationRequirements(): CredentialResolverPreImplementationRequirements {
  return {
    planDocumentPresent: false,
    credentialHandleBoundaryDefined: false,
    endpointHandleBoundaryDefined: false,
    secretProviderStubDefined: false,
    operatorApprovalBoundaryDefined: false,
    rollbackBoundaryDefined: false,
    redactionPolicyDefined: false,
    externalRequestSimulationDefined: false,
    schemaMigrationPolicyDefined: false,
    auditLedgerWritePolicyDefined: false,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV267: SourceNodeV267FakeShellArchiveUpstreamEchoVerificationReference,
  requirements: CredentialResolverPreImplementationRequirements,
): CredentialResolverProductionReadinessDecisionGateChecks {
  return {
    decisionGateEvaluated: true,
    sourceNodeV267Ready:
      sourceNodeV267.verificationState === "credential-resolver-fake-shell-archive-upstream-echo-verification-ready"
      && sourceNodeV267.readyForUpstreamEchoVerification
      && sourceNodeV267.checkCount === sourceNodeV267.passedCheckCount
      && sourceNodeV267.productionBlockerCount === 0,
    sourceNodeV267BlocksRealResolver: sourceNodeV267.nodeV267BlocksRealResolver,
    archiveEchoChainReady:
      sourceNodeV267.sourceNodeV266Ready
      && sourceNodeV267.javaV110EchoReady
      && sourceNodeV267.miniKvV117NonParticipationReady
      && sourceNodeV267.archiveCountsAligned
      && sourceNodeV267.archiveSnippetsAligned
      && sourceNodeV267.archiveNoRerunAligned,
    credentialBoundaryStillClosed:
      !sourceNodeV267.readsManagedAuditCredential
      && !sourceNodeV267.storesManagedAuditCredential
      && !sourceNodeV267.credentialValueRead,
    rawEndpointBoundaryStillClosed: !sourceNodeV267.rawEndpointUrlParsed,
    resolverBoundaryStillClosed:
      !sourceNodeV267.secretProviderInstantiated
      && !sourceNodeV267.resolverClientInstantiated,
    connectionBoundaryStillClosed:
      !sourceNodeV267.connectsManagedAudit
      && !sourceNodeV267.externalRequestSent
      && !sourceNodeV267.readyForManagedAuditSandboxAdapterConnection,
    writeBoundaryStillClosed:
      !sourceNodeV267.executionAllowed
      && !sourceNodeV267.schemaMigrationExecuted,
    autoStartBoundaryStillClosed: !sourceNodeV267.automaticUpstreamStart,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    preImplementationPlanPresent: requirements.planDocumentPresent,
    credentialHandleBoundaryDefined: requirements.credentialHandleBoundaryDefined,
    endpointHandleBoundaryDefined: requirements.endpointHandleBoundaryDefined,
    secretProviderStubDefined: requirements.secretProviderStubDefined,
    operatorApprovalBoundaryDefined: requirements.operatorApprovalBoundaryDefined,
    rollbackBoundaryDefined: requirements.rollbackBoundaryDefined,
    redactionPolicyDefined: requirements.redactionPolicyDefined,
    externalRequestSimulationDefined: requirements.externalRequestSimulationDefined,
    schemaMigrationPolicyDefined: requirements.schemaMigrationPolicyDefined,
    auditLedgerWritePolicyDefined: requirements.auditLedgerWritePolicyDefined,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    realResolverImplementationStillBlocked: true,
  };
}

function countMissingRequirements(requirements: CredentialResolverPreImplementationRequirements): number {
  return Object.values(requirements).filter((value) => value === false).length;
}

function collectProductionBlockers(
  checks: CredentialResolverProductionReadinessDecisionGateChecks,
): CredentialResolverProductionReadinessDecisionGateMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CredentialResolverProductionReadinessDecisionGateMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV267Ready,
      code: "SOURCE_NODE_V267_NOT_READY",
      source: "node-v267-credential-resolver-fake-shell-archive-upstream-echo-verification",
      message: "Node v267 archive upstream echo verification must be ready before the production readiness decision gate can be evaluated.",
    },
    {
      condition: checks.sourceNodeV267BlocksRealResolver,
      code: "SOURCE_NODE_V267_DOES_NOT_BLOCK_REAL_RESOLVER",
      source: "node-v267-credential-resolver-fake-shell-archive-upstream-echo-verification",
      message: "Node v267 must explicitly block real resolver implementation before v268 can make a conservative decision.",
    },
    {
      condition: checks.archiveEchoChainReady,
      code: "ARCHIVE_ECHO_CHAIN_NOT_READY",
      source: "node-v267-credential-resolver-fake-shell-archive-upstream-echo-verification",
      message: "Node v266, Java v110, and mini-kv v117 archive echo evidence must remain aligned.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false for this read-only decision gate.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false for this read-only decision gate.",
    },
    {
      condition: checks.preImplementationPlanPresent,
      code: "REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate",
      message: "A successor plan must exist before entering real credential resolver pre-implementation.",
    },
    {
      condition: checks.credentialHandleBoundaryDefined,
      code: "CREDENTIAL_HANDLE_BOUNDARY_MISSING",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate",
      message: "The next plan must define credential handle semantics without exposing credential values.",
    },
    {
      condition: checks.endpointHandleBoundaryDefined,
      code: "ENDPOINT_HANDLE_BOUNDARY_MISSING",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate",
      message: "The next plan must define endpoint handle and allowlist-review semantics without raw endpoint URLs.",
    },
    {
      condition: checks.secretProviderStubDefined,
      code: "SECRET_PROVIDER_STUB_MISSING",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate",
      message: "The next plan must define a disabled/test stub boundary before any secret provider runtime is considered.",
    },
    {
      condition: checks.operatorApprovalBoundaryDefined,
      code: "OPERATOR_APPROVAL_BOUNDARY_MISSING",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate",
      message: "The next plan must define explicit operator approval evidence for resolver pre-implementation.",
    },
    {
      condition: checks.rollbackBoundaryDefined,
      code: "ROLLBACK_BOUNDARY_MISSING",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate",
      message: "The next plan must define rollback and disablement boundaries before resolver pre-implementation.",
    },
    {
      condition: checks.redactionPolicyDefined,
      code: "REDACTION_POLICY_MISSING",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate",
      message: "The next plan must define redaction rules for handles, diagnostics, reports, and audit entries.",
    },
    {
      condition: checks.externalRequestSimulationDefined,
      code: "EXTERNAL_REQUEST_SIMULATION_PLAN_MISSING",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate",
      message: "The next plan must define simulation-only external request behavior before any real endpoint call.",
    },
    {
      condition: checks.schemaMigrationPolicyDefined,
      code: "SCHEMA_MIGRATION_POLICY_MISSING",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate",
      message: "The next plan must explicitly keep schema migration disabled or define a separate migration approval gate.",
    },
    {
      condition: checks.auditLedgerWritePolicyDefined,
      code: "AUDIT_LEDGER_WRITE_POLICY_MISSING",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate",
      message: "The next plan must explicitly keep audit ledger writes disabled or define a separate write approval gate.",
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

function collectWarnings(): CredentialResolverProductionReadinessDecisionGateMessage[] {
  return [
    {
      code: "DECISION_GATE_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate",
      message: "This profile is a decision gate only; it does not add a credential resolver implementation.",
    },
    {
      code: "SOURCE_CHAIN_READY_BUT_NOT_PRODUCTION_READY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate",
      message: "Node v267 proves archive echo alignment, but that evidence is not a production connection approval.",
    },
  ];
}

function collectRecommendations(): CredentialResolverProductionReadinessDecisionGateMessage[] {
  return [
    {
      code: "WRITE_SUCCESSOR_PLAN",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate",
      message: "Open a successor plan for credential resolver pre-implementation readiness before any resolver client, secret provider, or endpoint code is introduced.",
    },
    {
      code: "REQUEST_PARALLEL_UPSTREAM_ECHO",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate",
      message: "Let Java and mini-kv echo this blocked decision in parallel so Node can verify the next plan from three-project evidence.",
    },
  ];
}
