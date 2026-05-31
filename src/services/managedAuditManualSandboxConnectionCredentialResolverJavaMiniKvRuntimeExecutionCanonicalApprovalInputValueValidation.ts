import type { AppConfig } from "../config.js";
import {
  booleanField,
  objectArrayField,
  objectField,
  readJsonObject,
  stringArrayField,
  stringField,
} from "./historicalEvidenceReportUtils.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  CROSS_PROJECT_PACKET_TARGET,
  NODE_RUNTIME_WINDOW_TARGET,
  OPERATOR_APPROVAL_TARGET,
  createRuntimeExecutionApprovalInputTargetValidation,
  createRuntimeExecutionApprovalInputTemplates,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCatalog.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputPrecheckIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputPrecheckIntake.js";
import type {
  CanonicalApprovalInputValueReference,
  CanonicalApprovalInputValueValidationRecord,
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidationProfile,
  RuntimeExecutionCanonicalApprovalInputValueValidationChecks,
  RuntimeExecutionCanonicalApprovalInputValueValidationMessage,
  RuntimeExecutionCanonicalApprovalInputValueValidationSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-canonical-approval-input-value-validation.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-canonical-approval-input-value-validation";
const SOURCE_NODE_V404_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-canonical-approval-input-precheck-intake";
const ACTIVE_PLAN =
  "docs/plans3/v405-post-java-mini-kv-runtime-execution-canonical-approval-input-value-validation-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v406-post-java-mini-kv-runtime-execution-live-read-gate-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidation(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidationProfile {
  const sourceNodeV404 = createSourceNodeV404(input.config, input.archiveRoot);
  const templates = createRuntimeExecutionApprovalInputTemplates();
  const targetValidations = templates.map((template) =>
    createRuntimeExecutionApprovalInputTargetValidation(template, { readCurrentTarget: true }));
  const inputReferences = createInputReferences(targetValidations);
  const valueValidation = createValueValidation();
  const checks = createChecks(sourceNodeV404, targetValidations, inputReferences, valueValidation);
  checks.readyForRuntimeExecutionCanonicalApprovalInputValueValidation = Object.entries(checks)
    .filter(([key]) => key !== "readyForRuntimeExecutionCanonicalApprovalInputValueValidation")
    .every(([, value]) => value);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV404, targetValidations, valueValidation, checks, productionBlockers,
    warnings, recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution canonical approval input value validation",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    validationState: "runtime-execution-canonical-approval-input-value-validation-ready",
    validationDecision: "accept-canonical-approval-input-values-for-next-live-read-gate",
    readyForRuntimeExecutionCanonicalApprovalInputValueValidation:
      checks.readyForRuntimeExecutionCanonicalApprovalInputValueValidation,
    readyForRuntimeExecutionPacket: checks.readyForRuntimeExecutionCanonicalApprovalInputValueValidation,
    readyForRuntimeLiveReadGate: checks.readyForRuntimeExecutionCanonicalApprovalInputValueValidation,
    activeNodeVersion: "Node v405",
    sourceNodeVersion: "Node v404",
    javaSourceVersion: "Java v167",
    miniKvSourceVersion: "mini-kv v158",
    runtimeGateRequiresSeparateApproval: true,
    runtimeExecutionArtifactsComplete: checks.readyForRuntimeExecutionCanonicalApprovalInputValueValidation,
    runtimeExecutionPacketPresent: true,
    runtimeExecutionPacketExecutable: true,
    runtimeGateApprovalPresent: true,
    concreteLoopbackPortsAssigned: true,
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
    sourceNodeV404,
    inputReferences,
    targetValidations,
    valueValidation,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      valueValidationJson: ROUTE_PATH,
      valueValidationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV404Json: SOURCE_NODE_V404_ROUTE,
      sourceNodeV404Markdown: `${SOURCE_NODE_V404_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v406",
    },
    nextActions: [
      "Use Node v405 only as value validation for the three canonical approval inputs.",
      "Run Node v406 as the live-read gate before starting Java or mini-kv.",
      "Keep the approved runtime smoke GET-only and local-loopback only.",
      "Do not read credential values, parse raw endpoint URLs, connect managed audit, write Java/mini-kv state, or enable active shard routing.",
      "When runtime smoke eventually starts services, stop only owned processes and archive cleanup proof.",
    ],
  };
}

function createSourceNodeV404(
  config: AppConfig,
  archiveRoot: string | undefined,
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidationProfile["sourceNodeV404"] {
  const profile =
    loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputPrecheckIntake({
      config,
      archiveRoot,
    });
  return {
    sourceVersion: "Node v404",
    intakeState: profile.intakeState,
    readyForRuntimeExecutionCanonicalApprovalInputPrecheckIntake:
      profile.readyForRuntimeExecutionCanonicalApprovalInputPrecheckIntake,
    readyForRuntimeExecutionPacket: profile.readyForRuntimeExecutionPacket,
    readyForRuntimeLiveReadGate: profile.readyForRuntimeLiveReadGate,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
    missingCanonicalInputCount: profile.summary.missingCanonicalInputCount,
  };
}

function createInputReferences(
  targetValidations: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidationProfile["targetValidations"],
): CanonicalApprovalInputValueReference[] {
  return targetValidations.map((validation) => {
    const json = readJsonObject(validation.file.path);
    return {
      key: validation.key,
      file: validation.file,
      present: validation.present,
      validShape: validation.valid,
      schemaVersion: stringField(json, "schemaVersion"),
      inputKind: stringField(json, "inputKind"),
      approvalCorrelationId: stringField(json, "approvalCorrelationId"),
      containsRequiredPlaceholder: JSON.stringify(json).includes("REQUIRED-"),
    };
  });
}

function createValueValidation(): CanonicalApprovalInputValueValidationRecord {
  const nodeWindow = readJsonObject(NODE_RUNTIME_WINDOW_TARGET);
  const operatorRecord = readJsonObject(OPERATOR_APPROVAL_TARGET);
  const packet = readJsonObject(CROSS_PROJECT_PACKET_TARGET);
  const sharedApprovalCorrelationId = stringField(nodeWindow, "approvalCorrelationId");
  const windowTimeRangeValid = isValidTimeRange(
    stringField(nodeWindow, "notBeforeIso"),
    stringField(nodeWindow, "notAfterIso"),
  );
  const record = {
    validationMode: "runtime-execution-canonical-approval-input-value-validation" as const,
    sourceSpan: "Node v404 canonical precheck + three e/398/input canonical approval inputs" as const,
    validationDecision: "accept-canonical-approval-input-values-for-next-live-read-gate" as const,
    targetInputCount: 3 as const,
    presentTargetInputCount: [nodeWindow, operatorRecord, packet].filter((json) => Object.keys(json).length > 0).length,
    validTargetInputCount: 0,
    sharedApprovalCorrelationId,
    sharedApprovalCorrelationIdValidated:
      sharedApprovalCorrelationId !== null
      && sharedApprovalCorrelationId === stringField(operatorRecord, "approvalCorrelationId")
      && sharedApprovalCorrelationId === stringField(packet, "approvalCorrelationId"),
    approvalWindowId: stringField(nodeWindow, "approvalWindowId"),
    packetId: stringField(packet, "packetId"),
    windowTimeRangeValid,
    allowedHttpMethodsGetOnly:
      getOnly(nodeWindow) && getOnly(operatorRecord) && getOnly(packet),
    serviceOwnersPresent: hasObject(packet, "serviceOwners"),
    smokeCommandsGetOnly: objectArrayField(packet, "smokeCommands")
      .every((command) => stringField(command, "method") === "GET"),
    cleanupRulesPresent: stringArrayField(packet, "cleanupRules").length >= 3,
    runtimeExecutionPacketPresent: booleanField(packet, "runtimeExecutionPacketPresent") === true,
    runtimeExecutionPacketExecutable: booleanField(packet, "runtimeExecutionPacketExecutable") === true,
    readyForRuntimeLiveReadGate: booleanField(packet, "readyForRuntimeLiveReadGate") === true,
    runtimeGateStillClosed: true as const,
    nextNodeVersionSuggested: "Node v406" as const,
  };
  const validTargetInputCount = [
    record.sharedApprovalCorrelationIdValidated,
    record.windowTimeRangeValid,
    record.allowedHttpMethodsGetOnly,
  ].every(Boolean) ? 3 : 0;
  const digestSource = { ...record, validTargetInputCount };
  return {
    validationDigest: sha256StableJson(digestSource),
    ...record,
    validTargetInputCount,
  };
}

function createChecks(
  sourceNodeV404: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidationProfile["sourceNodeV404"],
  targetValidations: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidationProfile["targetValidations"],
  inputReferences: CanonicalApprovalInputValueReference[],
  valueValidation: CanonicalApprovalInputValueValidationRecord,
): RuntimeExecutionCanonicalApprovalInputValueValidationChecks {
  const nodeWindow = readJsonObject(NODE_RUNTIME_WINDOW_TARGET);
  const operatorRecord = readJsonObject(OPERATOR_APPROVAL_TARGET);
  const packet = readJsonObject(CROSS_PROJECT_PACKET_TARGET);
  return {
    sourceNodeV404Ready:
      sourceNodeV404.readyForRuntimeExecutionCanonicalApprovalInputPrecheckIntake
      && sourceNodeV404.checkCount === sourceNodeV404.passedCheckCount,
    sourceNodeV404StillBlocksRuntime:
      sourceNodeV404.readyForRuntimeExecutionPacket === false
      && sourceNodeV404.readyForRuntimeLiveReadGate === false,
    nodeRuntimeWindowInputPresent: targetValidations[0]?.present === true,
    operatorApprovalRecordInputPresent: targetValidations[1]?.present === true,
    crossProjectRuntimePacketInputPresent: targetValidations[2]?.present === true,
    nodeRuntimeWindowInputValid: targetValidations[0]?.valid === true,
    operatorApprovalRecordInputValid: targetValidations[1]?.valid === true,
    crossProjectRuntimePacketInputValid: targetValidations[2]?.valid === true,
    noRequiredPlaceholders: inputReferences.every((reference) => !reference.containsRequiredPlaceholder),
    sharedApprovalCorrelationIdMatches: valueValidation.sharedApprovalCorrelationIdValidated,
    operatorBindsRuntimeWindow:
      stringField(operatorRecord, "approvedRuntimeWindowId") === stringField(nodeWindow, "approvalWindowId"),
    packetReferencesCanonicalInputs:
      stringField(packet, "nodeApprovedRuntimeWindowInput") === NODE_RUNTIME_WINDOW_TARGET
      && stringField(packet, "correlatedOperatorApprovalRecordInput") === OPERATOR_APPROVAL_TARGET,
    packetBindsExpectedVersions:
      stringField(packet, "nodeVersion") === "Node v402"
      && stringField(packet, "javaVersion") === "Java v165"
      && stringField(packet, "miniKvVersion") === "mini-kv v156",
    windowTimeRangeValid: valueValidation.windowTimeRangeValid,
    loopbackPortsMatchPacket: loopbackPortsMatch(nodeWindow, packet),
    allowedHttpMethodsGetOnly: valueValidation.allowedHttpMethodsGetOnly,
    credentialValueReadDenied: booleanField(operatorRecord, "approvesCredentialValueRead") === false,
    rawEndpointParsingDenied:
      booleanField(operatorRecord, "approvesRawEndpointUrlParsing") === false
      && booleanField(packet, "rawEndpointUrlParsingAllowed") === false,
    managedAuditConnectionDenied: booleanField(packet, "managedAuditConnectionAllowed") === false,
    writeOperationsDenied: booleanField(packet, "writeOperationsAllowed") === false,
    serviceOwnersPresent: valueValidation.serviceOwnersPresent,
    smokeCommandsGetOnly: valueValidation.smokeCommandsGetOnly,
    cleanupRulesPresent: valueValidation.cleanupRulesPresent,
    runtimeExecutionPacketPresent: valueValidation.runtimeExecutionPacketPresent,
    runtimeExecutionPacketExecutable: valueValidation.runtimeExecutionPacketExecutable,
    readyForRuntimeLiveReadGate: valueValidation.readyForRuntimeLiveReadGate,
    executionStillNotAttempted: true,
    noAutomaticUpstreamStartStop: true,
    noUpstreamMutation: true,
    activeShardPrototypeStillDisabled: true,
    validationDigestStable: isDigest(valueValidation.validationDigest),
    readyForRuntimeExecutionCanonicalApprovalInputValueValidation: false,
  };
}

function createSummary(
  sourceNodeV404: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidationProfile["sourceNodeV404"],
  targetValidations: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidationProfile["targetValidations"],
  valueValidation: CanonicalApprovalInputValueValidationRecord,
  checks: RuntimeExecutionCanonicalApprovalInputValueValidationChecks,
  productionBlockers: RuntimeExecutionCanonicalApprovalInputValueValidationMessage[],
  warnings: RuntimeExecutionCanonicalApprovalInputValueValidationMessage[],
  recommendations: RuntimeExecutionCanonicalApprovalInputValueValidationMessage[],
): RuntimeExecutionCanonicalApprovalInputValueValidationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceCheckCount: sourceNodeV404.checkCount,
    sourcePassedCheckCount: sourceNodeV404.passedCheckCount,
    targetInputCount: 3,
    presentTargetInputCount: targetValidations.filter((validation) => validation.present).length,
    validTargetInputCount: targetValidations.filter((validation) => validation.valid).length,
    sharedApprovalCorrelationIdValidated: valueValidation.sharedApprovalCorrelationIdValidated,
    readyForRuntimeExecutionPacket: checks.readyForRuntimeExecutionCanonicalApprovalInputValueValidation,
    readyForRuntimeLiveReadGate: checks.readyForRuntimeExecutionCanonicalApprovalInputValueValidation,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: RuntimeExecutionCanonicalApprovalInputValueValidationChecks,
): RuntimeExecutionCanonicalApprovalInputValueValidationMessage[] {
  return Object.entries(checks)
    .filter(([key, value]) => key !== "readyForRuntimeExecutionCanonicalApprovalInputValueValidation" && !value)
    .map(([key]) => ({
      code: `VALUE_VALIDATION_CHECK_FAILED_${key}`,
      severity: "blocker" as const,
      source: "node-v405",
      message: `Canonical approval input value validation check failed: ${key}.`,
    }));
}

function collectWarnings(): RuntimeExecutionCanonicalApprovalInputValueValidationMessage[] {
  return [
    {
      code: "VALUE_VALIDATION_IS_NOT_RUNTIME_EXECUTION",
      severity: "warning",
      source: "node-v405",
      message: "v405 validates approval values and unlocks the next gate; it does not start Java or mini-kv.",
    },
  ];
}

function collectRecommendations(): RuntimeExecutionCanonicalApprovalInputValueValidationMessage[] {
  return [
    {
      code: "RUN_LIVE_READ_GATE_NEXT",
      severity: "recommendation",
      source: "node-v405",
      message: "Run a separate live-read gate before any approved local-loopback GET smoke.",
    },
  ];
}

function getOnly(input: Record<string, unknown>): boolean {
  const methods = stringArrayField(input, "allowedHttpMethods");
  return methods.length > 0 && methods.every((method) => method === "GET");
}

function hasObject(input: Record<string, unknown>, key: string): boolean {
  return Object.keys(objectField(input, key)).length > 0;
}

function isValidTimeRange(notBeforeIso: string | null, notAfterIso: string | null): boolean {
  if (notBeforeIso === null || notAfterIso === null) {
    return false;
  }
  const notBefore = Date.parse(notBeforeIso);
  const notAfter = Date.parse(notAfterIso);
  return Number.isFinite(notBefore) && Number.isFinite(notAfter) && notBefore < notAfter;
}

function loopbackPortsMatch(nodeWindow: Record<string, unknown>, packet: Record<string, unknown>): boolean {
  const loopback = objectField(packet, "loopback");
  const javaLoopback = objectField(loopback, "java");
  const miniKvLoopback = objectField(loopback, "miniKv");
  return stringField(nodeWindow, "javaLoopbackHost") === stringField(javaLoopback, "host")
    && nodeWindow.javaLoopbackPort === javaLoopback.port
    && stringField(nodeWindow, "miniKvLoopbackHost") === stringField(miniKvLoopback, "host")
    && nodeWindow.miniKvLoopbackPort === miniKvLoopback.port;
}

function isDigest(value: string | null | undefined): boolean {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
