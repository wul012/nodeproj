import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  createRuntimeShellPostDecisionContinuationOptions,
  RUNTIME_SHELL_POST_DECISION_CONTINUATION_CATALOG_VERSION,
  RUNTIME_SHELL_POST_DECISION_CONTINUATION_VERSIONS,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalog.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPassProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-catalog-quality-pass.v1";
  qualityPassState: "runtime-shell-post-decision-continuation-catalog-quality-pass-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass: boolean;
  readOnlyQualityPass: true;
  consumesNodeV301PostDecisionContinuationPlanIntake: true;
  consumesJavaV136PostDecisionPlanIntakeEcho: false;
  consumesMiniKvV133PostDecisionPlanIntakeReceipt: false;
  readyForNodeV303PostDecisionPlanIntakeUpstreamEchoVerification: false;
  readyForDisabledRuntimeShellImplementation: false;
  readyForDisabledRuntimeShellInvocation: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  runtimeShellImplemented: false;
  runtimeShellInvocationAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  schemaMigrationExecuted: false;
  approvalLedgerWritten: false;
  automaticUpstreamStart: false;
  catalogScope: {
    catalogVersion: typeof RUNTIME_SHELL_POST_DECISION_CONTINUATION_CATALOG_VERSION;
    sourceVersion: "Node v301";
    currentVersion: "Node v302";
    nextVerificationVersion: "Node v303";
    catalogFile: "src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalog.ts";
    consumerServiceFile: "src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.ts";
    consumerTypesFile: "src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntakeTypes.ts";
    continuationOptionCount: number;
    selectedContinuationOptionCount: number;
    rejectedRuntimeImplementationOptionCount: number;
    duplicatedOptionBuilderRemoved: true;
    duplicatedNecessityProofBuilderRemoved: true;
    v301LegacyNodeV302ReferenceKeptAsCompatibilityMarker: true;
    activeNodeVerificationTarget: "Node v303";
  };
  sourceNodeV301: {
    planIntakeState: "runtime-shell-post-decision-continuation-plan-intake-ready" | "blocked";
    readyForPlanIntake: boolean;
    readOnlyPlanIntake: true;
    catalogVersion: typeof RUNTIME_SHELL_POST_DECISION_CONTINUATION_CATALOG_VERSION;
    legacyNextNodeVerificationVersion: "Node v302";
    nextNodeVerificationVersion: "Node v303";
    readyForParallelJavaV136MiniKvV133EchoRequest: boolean;
    runtimeShellImplemented: false;
    runtimeShellInvocationAllowed: false;
    executionAllowed: false;
    connectsManagedAudit: false;
    credentialValueRead: false;
    rawEndpointUrlParsed: false;
    externalRequestSent: false;
    schemaMigrationExecuted: false;
    approvalLedgerWritten: false;
    automaticUpstreamStart: false;
    checkCount: number;
    passedCheckCount: number;
    productionBlockerCount: number;
  };
  checks: {
    sourceNodeV301Ready: boolean;
    sourceNodeV301UsesCatalog: boolean;
    nodeV303IsActiveVerificationTarget: boolean;
    legacyNodeV302ReferenceRetainedOnlyForCompatibility: boolean;
    continuationOptionsCataloged: boolean;
    necessityProofCataloged: boolean;
    noJavaV136Consumption: boolean;
    noMiniKvV133Consumption: boolean;
    noRuntimeShellImplementation: boolean;
    noRuntimeShellInvocation: boolean;
    noCredentialRead: boolean;
    noRawEndpointParse: boolean;
    noExternalRequest: boolean;
    noLedgerOrSchemaWrite: boolean;
    upstreamProbesStillDisabled: boolean;
    upstreamActionsStillDisabled: boolean;
    productionAuditStillBlocked: boolean;
    productionWindowStillBlocked: boolean;
    readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    continuationOptionCount: number;
    selectedContinuationOptionCount: number;
    rejectedRuntimeImplementationOptionCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  qualityDigest: string;
  productionBlockers: CatalogQualityPassMessage[];
  warnings: CatalogQualityPassMessage[];
  recommendations: CatalogQualityPassMessage[];
  evidenceEndpoints: {
    catalogQualityPassJson: string;
    catalogQualityPassMarkdown: string;
    sourceNodeV301Json: string;
    sourceNodeV301Markdown: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface CatalogQualityPassMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "runtime-shell-post-decision-continuation-catalog-quality-pass"
    | "node-v301-post-decision-continuation-plan-intake"
    | "runtime-config";
  message: string;
}

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-catalog-quality-pass.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-catalog-quality-pass";
const SOURCE_NODE_V301_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-plan-intake";
const ACTIVE_PLAN = "docs/plans2/v300-post-runtime-shell-decision-record-upstream-echo-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPassProfile {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake({
    config: input.config,
  });
  const continuationOptions = createRuntimeShellPostDecisionContinuationOptions();
  const catalogScope = createCatalogScope(continuationOptions);
  const sourceNodeV301 = createSourceNodeV301(source);
  const checks = createCatalogChecks(input.config, sourceNodeV301, catalogScope);
  const qualityPassState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass
    ? "runtime-shell-post-decision-continuation-catalog-quality-pass-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return assembleQualityProfile({
    catalogScope,
    sourceNodeV301,
    checks,
    qualityPassState,
    productionBlockers,
    warnings,
    recommendations,
  });
}

type QualityProfile =
  ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPassProfile;
type PlanIntakeProfile = ReturnType<
  typeof loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake
>;
type ContinuationOptions = ReturnType<typeof createRuntimeShellPostDecisionContinuationOptions>;

function createCatalogScope(
  continuationOptions: ContinuationOptions,
): QualityProfile["catalogScope"] {
  return {
    catalogVersion:
      RUNTIME_SHELL_POST_DECISION_CONTINUATION_CATALOG_VERSION,
    sourceVersion: "Node v301",
    currentVersion: "Node v302",
    nextVerificationVersion: RUNTIME_SHELL_POST_DECISION_CONTINUATION_VERSIONS.nextNodeVerificationVersion,
    catalogFile:
      "src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalog.ts",
    consumerServiceFile:
      "src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.ts",
    consumerTypesFile:
      "src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntakeTypes.ts",
    continuationOptionCount: continuationOptions.length,
    selectedContinuationOptionCount:
      continuationOptions.filter((option) => option.status === "selected").length,
    rejectedRuntimeImplementationOptionCount:
      continuationOptions.filter((option) =>
        option.code === "IMPLEMENT_RUNTIME_SHELL_NOW" && option.status === "rejected").length,
    duplicatedOptionBuilderRemoved: true,
    duplicatedNecessityProofBuilderRemoved: true,
    v301LegacyNodeV302ReferenceKeptAsCompatibilityMarker: true,
    activeNodeVerificationTarget:
      RUNTIME_SHELL_POST_DECISION_CONTINUATION_VERSIONS.nextNodeVerificationVersion,
  };
}

function createSourceNodeV301(source: PlanIntakeProfile): QualityProfile["sourceNodeV301"] {
  return {
    planIntakeState: source.planIntakeState,
    readyForPlanIntake:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake,
    readOnlyPlanIntake: source.readOnlyPlanIntake,
    catalogVersion: source.continuationPlanIntake.catalogVersion,
    legacyNextNodeVerificationVersion:
      source.continuationPlanIntake.legacyNextNodeVerificationVersion,
    nextNodeVerificationVersion: source.continuationPlanIntake.nextNodeVerificationVersion,
    readyForParallelJavaV136MiniKvV133EchoRequest:
      source.readyForParallelJavaV136MiniKvV133EchoRequest,
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
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    productionBlockerCount: source.summary.productionBlockerCount,
  };
}

function createCatalogChecks(
  config: AppConfig,
  sourceNodeV301: QualityProfile["sourceNodeV301"],
  catalogScope: QualityProfile["catalogScope"],
): QualityProfile["checks"] {
  const checks: QualityProfile["checks"] = {
    sourceNodeV301Ready: sourceNodeV301.readyForPlanIntake,
    sourceNodeV301UsesCatalog:
      sourceNodeV301.catalogVersion === RUNTIME_SHELL_POST_DECISION_CONTINUATION_CATALOG_VERSION,
    nodeV303IsActiveVerificationTarget:
      sourceNodeV301.nextNodeVerificationVersion === "Node v303"
      && catalogScope.activeNodeVerificationTarget === "Node v303",
    legacyNodeV302ReferenceRetainedOnlyForCompatibility:
      sourceNodeV301.legacyNextNodeVerificationVersion === "Node v302",
    continuationOptionsCataloged:
      catalogScope.continuationOptionCount === 4
      && catalogScope.selectedContinuationOptionCount === 1
      && catalogScope.rejectedRuntimeImplementationOptionCount === 1,
    necessityProofCataloged: catalogScope.duplicatedNecessityProofBuilderRemoved,
    noJavaV136Consumption: true,
    noMiniKvV133Consumption: true,
    noRuntimeShellImplementation: !sourceNodeV301.runtimeShellImplemented,
    noRuntimeShellInvocation: !sourceNodeV301.runtimeShellInvocationAllowed,
    noCredentialRead: !sourceNodeV301.credentialValueRead,
    noRawEndpointParse: !sourceNodeV301.rawEndpointUrlParsed,
    noExternalRequest: !sourceNodeV301.externalRequestSent,
    noLedgerOrSchemaWrite:
      !sourceNodeV301.approvalLedgerWritten && !sourceNodeV301.schemaMigrationExecuted,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass: false,
  };
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass")
      .every(([, value]) => value);
  return checks;
}

function createCatalogSummary(input: {
  checks: QualityProfile["checks"];
  catalogScope: QualityProfile["catalogScope"];
  productionBlockers: CatalogQualityPassMessage[];
  warnings: CatalogQualityPassMessage[];
  recommendations: CatalogQualityPassMessage[];
}): QualityProfile["summary"] {
  return {
    checkCount: countReportChecks(input.checks),
    passedCheckCount: countPassedReportChecks(input.checks),
    continuationOptionCount: input.catalogScope.continuationOptionCount,
    selectedContinuationOptionCount: input.catalogScope.selectedContinuationOptionCount,
    rejectedRuntimeImplementationOptionCount:
      input.catalogScope.rejectedRuntimeImplementationOptionCount,
    productionBlockerCount: input.productionBlockers.length,
    warningCount: input.warnings.length,
    recommendationCount: input.recommendations.length,
  };
}

function assembleQualityProfile(input: {
  catalogScope: QualityProfile["catalogScope"];
  sourceNodeV301: QualityProfile["sourceNodeV301"];
  checks: QualityProfile["checks"];
  qualityPassState: QualityProfile["qualityPassState"];
  productionBlockers: CatalogQualityPassMessage[];
  warnings: CatalogQualityPassMessage[];
  recommendations: CatalogQualityPassMessage[];
}): QualityProfile {
  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver runtime shell post-decision continuation catalog quality pass",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    qualityPassState: input.qualityPassState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass:
      input.checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass,
    readOnlyQualityPass: true,
    consumesNodeV301PostDecisionContinuationPlanIntake: true,
    consumesJavaV136PostDecisionPlanIntakeEcho: false,
    consumesMiniKvV133PostDecisionPlanIntakeReceipt: false,
    readyForNodeV303PostDecisionPlanIntakeUpstreamEchoVerification: false,
    readyForDisabledRuntimeShellImplementation: false,
    readyForDisabledRuntimeShellInvocation: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    runtimeShellImplemented: false,
    runtimeShellInvocationAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    externalRequestSent: false,
    schemaMigrationExecuted: false,
    approvalLedgerWritten: false,
    automaticUpstreamStart: false,
    catalogScope: input.catalogScope,
    sourceNodeV301: input.sourceNodeV301,
    checks: input.checks,
    summary: createCatalogSummary(input),
    qualityDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      qualityPassState: input.qualityPassState,
      catalogScope: input.catalogScope,
      sourceNodeV301: input.sourceNodeV301,
      checks: input.checks,
    }),
    productionBlockers: input.productionBlockers,
    warnings: input.warnings,
    recommendations: input.recommendations,
    evidenceEndpoints: {
      catalogQualityPassJson: ROUTE_PATH,
      catalogQualityPassMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV301Json: SOURCE_NODE_V301_ROUTE,
      sourceNodeV301Markdown: `${SOURCE_NODE_V301_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Keep Java v136 and mini-kv v133 running in the parallel upstream lane; v302 does not consume their unfinished evidence.",
      "Use Node v303, not Node v302, for post-decision plan intake upstream echo verification after both upstream projects finish.",
      "Continue cataloging repeated echo sections before adding new managed-audit governance reports.",
    ],
  };
}

export function renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPassMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPassProfile,
): string {
  return [
    "# Managed audit manual sandbox connection credential resolver runtime shell post-decision continuation catalog quality pass",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Quality pass state: ${profile.qualityPassState}`,
    `- Ready for quality pass: ${profile.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass}`,
    `- Consumes Java v136: ${profile.consumesJavaV136PostDecisionPlanIntakeEcho}`,
    `- Consumes mini-kv v133: ${profile.consumesMiniKvV133PostDecisionPlanIntakeReceipt}`,
    `- Ready for Node v303: ${profile.readyForNodeV303PostDecisionPlanIntakeUpstreamEchoVerification}`,
    `- Runtime shell implemented: ${profile.runtimeShellImplemented}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    "",
    "## Catalog Scope",
    "",
    ...renderEntries(profile.catalogScope),
    "",
    "## Source Node v301",
    "",
    ...renderEntries(profile.sourceNodeV301),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No catalog quality-pass blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No catalog quality-pass warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No catalog quality-pass recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function collectProductionBlockers(
  checks: ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPassProfile["checks"],
): CatalogQualityPassMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CatalogQualityPassMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV301Ready,
      code: "NODE_V301_NOT_READY",
      source: "node-v301-post-decision-continuation-plan-intake",
      message: "Node v301 plan intake must remain ready before v302 can verify catalog quality.",
    },
    {
      condition: checks.sourceNodeV301UsesCatalog && checks.continuationOptionsCataloged,
      code: "CONTINUATION_CATALOG_NOT_USED",
      source: "runtime-shell-post-decision-continuation-catalog-quality-pass",
      message: "v302 must route continuation options through the shared catalog.",
    },
    {
      condition: checks.nodeV303IsActiveVerificationTarget,
      code: "NODE_V303_NOT_ACTIVE_TARGET",
      source: "runtime-shell-post-decision-continuation-catalog-quality-pass",
      message: "The active upstream echo verification target must be Node v303 after the v302 quality pass.",
    },
    {
      condition: checks.noJavaV136Consumption && checks.noMiniKvV133Consumption,
      code: "UPSTREAM_EVIDENCE_CONSUMED_DURING_QUALITY_PASS",
      source: "runtime-shell-post-decision-continuation-catalog-quality-pass",
      message: "v302 must not consume unfinished Java v136 or mini-kv v133 evidence.",
    },
    {
      condition: checks.noRuntimeShellImplementation && checks.noRuntimeShellInvocation,
      code: "RUNTIME_SHELL_OPENED",
      source: "runtime-shell-post-decision-continuation-catalog-quality-pass",
      message: "v302 must remain a quality pass and must not implement or invoke runtime shell.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v302 quality pass.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v302 quality pass.",
    },
  ];

  return rules
    .filter((rule) => !rule.condition)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker",
      source: rule.source,
      message: rule.message,
    }));
}

function collectWarnings(): CatalogQualityPassMessage[] {
  return [
    {
      code: "QUALITY_PASS_DOES_NOT_VERIFY_UPSTREAM_ECHO",
      severity: "warning",
      source: "runtime-shell-post-decision-continuation-catalog-quality-pass",
      message: "v302 improves Node code shape only; Node v303 still must wait for Java v136 and mini-kv v133.",
    },
  ];
}

function collectRecommendations(): CatalogQualityPassMessage[] {
  return [
    {
      code: "KEEP_NODE_V303_BEHIND_PARALLEL_EVIDENCE",
      severity: "recommendation",
      source: "runtime-shell-post-decision-continuation-catalog-quality-pass",
      message: "Do not start Node v303 until Java v136 and mini-kv v133 are complete.",
    },
    {
      code: "REUSE_CATALOG_FOR_NEXT_ECHO_SEGMENT",
      severity: "recommendation",
      source: "runtime-shell-post-decision-continuation-catalog-quality-pass",
      message: "Use the shared continuation catalog in the next echo verification instead of copying option/proof construction.",
    },
  ];
}
