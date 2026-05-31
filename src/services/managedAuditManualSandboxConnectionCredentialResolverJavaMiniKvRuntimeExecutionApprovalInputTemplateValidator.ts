import type { AppConfig } from "../config.js";
import {
  CROSS_PROJECT_PACKET_TARGET,
  NODE_RUNTIME_WINDOW_TARGET,
  OPERATOR_APPROVAL_TARGET,
  TEMPLATE_ROOT,
  createRuntimeExecutionApprovalInputTargetValidation,
  createRuntimeExecutionApprovalInputTemplates,
  templateDefinitionComplete,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCatalog.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntake.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidatorProfile,
  RuntimeExecutionApprovalInputTargetValidation,
  RuntimeExecutionApprovalInputTemplateBundle,
  RuntimeExecutionApprovalInputTemplateDefinition,
  RuntimeExecutionApprovalInputTemplateValidatorChecks,
  RuntimeExecutionApprovalInputTemplateValidatorMessage,
  RuntimeExecutionApprovalInputTemplateValidatorSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidatorTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidatorMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidatorRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-template-validator.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-template-validator";
const SOURCE_NODE_V401_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-completion-intake";
const ACTIVE_PLAN =
  "docs/plans3/v402-post-runtime-execution-approval-input-template-validator-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v403-post-runtime-execution-approval-input-validation-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidator(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidatorProfile {
  const sourceNodeV401 = createSourceNodeV401(input.config, input.archiveRoot);
  const templates = createRuntimeExecutionApprovalInputTemplates();
  const targetValidations = templates.map(createRuntimeExecutionApprovalInputTargetValidation);
  const templateBundle = createTemplateBundle(templates, targetValidations);
  const checks = createChecks(sourceNodeV401, templates, targetValidations, templateBundle);
  checks.readyForRuntimeExecutionApprovalInputTemplateValidator = Object.entries(checks)
    .filter(([key]) => key !== "readyForRuntimeExecutionApprovalInputTemplateValidator")
    .every(([, value]) => value);
  const productionBlockers = collectProductionBlockers(targetValidations);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV401, templates, targetValidations, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution approval input template validator",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    templateValidatorState: "runtime-execution-approval-input-templates-published-runtime-blocked",
    templateValidatorDecision: "publish-machine-checkable-input-templates-and-keep-runtime-blocked",
    readyForRuntimeExecutionApprovalInputTemplateValidator:
      checks.readyForRuntimeExecutionApprovalInputTemplateValidator,
    readyForRuntimeExecutionPacket: false,
    readyForRuntimeLiveReadGate: false,
    activeNodeVersion: "Node v402",
    sourceNodeVersion: "Node v401",
    javaSourceVersion: "Java v165",
    miniKvSourceVersion: "mini-kv v156",
    runtimeGateRequiresSeparateApproval: true,
    runtimeExecutionArtifactsComplete: false,
    runtimeExecutionPacketPresent: false,
    runtimeExecutionPacketExecutable: false,
    runtimeGateApprovalPresent: false,
    concreteLoopbackPortsAssigned: false,
    executionAttempted: false,
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    credentialValueRequested: false,
    credentialValueRead: false,
    rawEndpointUrlRequested: false,
    rawEndpointUrlParsed: false,
    executionAllowed: false,
    activeShardPrototypeEnabled: false,
    sourceNodeV401,
    templates,
    targetValidations,
    templateBundle,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      templateValidatorJson: ROUTE_PATH,
      templateValidatorMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV401Json: SOURCE_NODE_V401_ROUTE,
      sourceNodeV401Markdown: `${SOURCE_NODE_V401_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v403",
    },
    nextActions: [
      "Write real approval inputs only to the canonical e/398/input target paths, not to the v402 template archive paths.",
      "Keep the Node-approved runtime window, correlated operator approval record, and cross-project packet correlated by one approvalCorrelationId.",
      "Require GET-only smoke commands and explicit cleanup rules before any Java or mini-kv startup.",
      "Do not treat these templates as runtime approval; they are validation contracts only.",
      "Run the v403 validator only after the three canonical input files are present.",
    ],
  };
}

function createSourceNodeV401(
  config: AppConfig,
  archiveRoot: string | undefined,
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidatorProfile["sourceNodeV401"] {
  const profile =
    loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntake({
      config,
      archiveRoot,
    });
  return {
    sourceVersion: "Node v401",
    intakeState: profile.intakeState,
    readyForRuntimeExecutionApprovalInputCompletionIntake:
      profile.readyForRuntimeExecutionApprovalInputCompletionIntake,
    readyForRuntimeExecutionPacket: profile.readyForRuntimeExecutionPacket,
    readyForRuntimeLiveReadGate: profile.readyForRuntimeLiveReadGate,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
  };
}

function createTemplateBundle(
  templates: RuntimeExecutionApprovalInputTemplateDefinition[],
  targetValidations: RuntimeExecutionApprovalInputTargetValidation[],
): RuntimeExecutionApprovalInputTemplateBundle {
  const record = {
    bundleMode: "template-only-no-runtime-approval" as const,
    sourceSpan: "Node v401 completion intake + Java v165 + mini-kv v156" as const,
    templateDigests: templates.map((template) => [template.key, template.templateDigest]),
    targetPaths: templates.map((template) => [template.key, template.targetPath]),
    templateArchivePaths: templates.map((template) => [template.key, template.templateArchivePath]),
  };
  return {
    bundleDigest: sha256StableJson(record),
    bundleMode: "template-only-no-runtime-approval",
    sourceSpan: "Node v401 completion intake + Java v165 + mini-kv v156",
    templateCount: 3,
    targetInputCount: 3,
    presentTargetInputCount: targetValidations.filter((validation) => validation.present).length,
    validTargetInputCount: targetValidations.filter((validation) => validation.valid).length,
    missingTargetInputCount: targetValidations.filter((validation) => !validation.present).length,
    runtimeGateStillClosed: true,
    nextNodeVersionSuggested: "Node v403",
  };
}

function createChecks(
  sourceNodeV401: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidatorProfile["sourceNodeV401"],
  templates: RuntimeExecutionApprovalInputTemplateDefinition[],
  targetValidations: RuntimeExecutionApprovalInputTargetValidation[],
  templateBundle: RuntimeExecutionApprovalInputTemplateBundle,
): RuntimeExecutionApprovalInputTemplateValidatorChecks {
  return {
    sourceNodeV401Ready:
      sourceNodeV401.readyForRuntimeExecutionApprovalInputCompletionIntake
      && sourceNodeV401.checkCount === sourceNodeV401.passedCheckCount,
    sourceNodeV401StillBlocksRuntime:
      sourceNodeV401.readyForRuntimeExecutionPacket === false
      && sourceNodeV401.readyForRuntimeLiveReadGate === false,
    templateCountStable: templates.length === 3 && templateBundle.templateCount === 3,
    targetInputCountStable: targetValidations.length === 3 && templateBundle.targetInputCount === 3,
    templateDigestsStable: templates.every((template) => isDigest(template.templateDigest))
      && isDigest(templateBundle.bundleDigest),
    nodeWindowTemplateComplete: templateDefinitionComplete(templates, "nodeApprovedRuntimeWindow"),
    operatorApprovalTemplateComplete: templateDefinitionComplete(templates, "correlatedOperatorApprovalRecord"),
    crossProjectPacketTemplateComplete: templateDefinitionComplete(templates, "crossProjectRuntimeExecutionPacket"),
    targetPathsCanonical:
      templates.some((template) => template.targetPath === NODE_RUNTIME_WINDOW_TARGET)
      && templates.some((template) => template.targetPath === OPERATOR_APPROVAL_TARGET)
      && templates.some((template) => template.targetPath === CROSS_PROJECT_PACKET_TARGET),
    templateArchivePathsSeparateFromCanonicalInputs:
      templates.every((template) => template.templateArchivePath.startsWith(`${TEMPLATE_ROOT}/`)
        && template.templateArchivePath !== template.targetPath),
    noConcreteApprovalInputsPresent: targetValidations.every((validation) => !validation.present),
    noConcreteApprovalInputsValid: targetValidations.every((validation) => !validation.valid),
    runtimePacketStillAbsent: true,
    runtimeGateStillClosed: templateBundle.runtimeGateStillClosed,
    executionStillDenied: true,
    noAutomaticUpstreamStartStop: true,
    noUpstreamMutation: true,
    noManagedAuditConnection: true,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    activeShardPrototypeStillDisabled: true,
    readyForRuntimeExecutionApprovalInputTemplateValidator: false,
  };
}

function createSummary(
  sourceNodeV401: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidatorProfile["sourceNodeV401"],
  templates: RuntimeExecutionApprovalInputTemplateDefinition[],
  targetValidations: RuntimeExecutionApprovalInputTargetValidation[],
  checks: RuntimeExecutionApprovalInputTemplateValidatorChecks,
  productionBlockers: RuntimeExecutionApprovalInputTemplateValidatorMessage[],
  warnings: RuntimeExecutionApprovalInputTemplateValidatorMessage[],
  recommendations: RuntimeExecutionApprovalInputTemplateValidatorMessage[],
): RuntimeExecutionApprovalInputTemplateValidatorSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceCheckCount: sourceNodeV401.checkCount,
    sourcePassedCheckCount: sourceNodeV401.passedCheckCount,
    templateCount: templates.length as 3,
    targetInputCount: targetValidations.length as 3,
    presentTargetInputCount: targetValidations.filter((validation) => validation.present).length,
    validTargetInputCount: targetValidations.filter((validation) => validation.valid).length,
    missingTargetInputCount: targetValidations.filter((validation) => !validation.present).length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  targetValidations: RuntimeExecutionApprovalInputTargetValidation[],
): RuntimeExecutionApprovalInputTemplateValidatorMessage[] {
  return targetValidations.map((validation) => {
    if (validation.key === "nodeApprovedRuntimeWindow") {
      return {
        code: "NODE_APPROVED_RUNTIME_WINDOW_INPUT_NOT_PRESENT",
        severity: "blocker",
        source: validation.file.path,
        message: "The canonical Node-approved runtime window input is still absent.",
      };
    }
    if (validation.key === "correlatedOperatorApprovalRecord") {
      return {
        code: "CORRELATED_OPERATOR_APPROVAL_RECORD_INPUT_NOT_PRESENT",
        severity: "blocker",
        source: validation.file.path,
        message: "The canonical correlated operator approval record input is still absent.",
      };
    }
    return {
      code: "CROSS_PROJECT_RUNTIME_EXECUTION_PACKET_INPUT_NOT_PRESENT",
      severity: "blocker",
      source: validation.file.path,
      message: "The canonical complete cross-project runtime execution packet input is still absent.",
    };
  });
}

function collectWarnings(): RuntimeExecutionApprovalInputTemplateValidatorMessage[] {
  return [
    {
      code: "TEMPLATES_ARE_NOT_RUNTIME_APPROVAL",
      severity: "warning",
      source: "node-v402",
      message: "Template files document required shape only; they must not be copied into canonical input paths without real approval values.",
    },
  ];
}

function collectRecommendations(): RuntimeExecutionApprovalInputTemplateValidatorMessage[] {
  return [
    {
      code: "FILL_CANONICAL_INPUTS_WITH_SHARED_CORRELATION_ID",
      severity: "recommendation",
      source: "node-v402",
      message: "Use one approvalCorrelationId across the Node runtime window, operator approval record, and cross-project packet.",
    },
  ];
}

function isDigest(value: string | null | undefined): boolean {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
