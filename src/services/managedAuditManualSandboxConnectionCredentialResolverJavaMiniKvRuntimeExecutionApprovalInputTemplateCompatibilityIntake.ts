import type { AppConfig } from "../config.js";
import {
  booleanField,
  evidenceFile,
  objectField,
  readJsonObject,
  stringArrayField,
  stringField,
} from "./historicalEvidenceReportUtils.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidator,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidator.js";
import type {
  JavaV166RuntimeExecutionApprovalInputTemplateCompatibilityReference,
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCompatibilityIntakeProfile,
  MiniKvV157RuntimeExecutionApprovalInputTemplateValidatorEchoReference,
  RuntimeExecutionApprovalInputTemplateCompatibilityIntakeChecks,
  RuntimeExecutionApprovalInputTemplateCompatibilityIntakeMessage,
  RuntimeExecutionApprovalInputTemplateCompatibilityIntakeRecord,
  RuntimeExecutionApprovalInputTemplateCompatibilityIntakeSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCompatibilityIntakeTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCompatibilityIntakeMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCompatibilityIntakeRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-template-compatibility-intake.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-template-compatibility-intake";
const SOURCE_NODE_V402_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-template-validator";
const ACTIVE_PLAN =
  "docs/plans3/v403-post-java-mini-kv-runtime-execution-approval-input-template-compatibility-intake-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v404-post-runtime-execution-approval-input-validation-roadmap.md";
const JAVA_V166_TEMPLATE_COMPATIBILITY =
  "D:/javaproj/advanced-order-platform/e/166/evidence/java-shard-readiness-runtime-execution-approval-input-template-compatibility-v166.json";
const MINI_KV_V157_TEMPLATE_VALIDATOR_ECHO =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v157.json";
const CANONICAL_TARGETS = [
  "e/398/input/node-approved-runtime-window-v398.json",
  "e/398/input/correlated-operator-approval-record-v398.json",
  "e/398/input/cross-project-runtime-execution-packet-v398.json",
] as const;

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCompatibilityIntake(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCompatibilityIntakeProfile {
  const sourceNodeV402 = createSourceNodeV402(input.config, input.archiveRoot);
  const javaV166TemplateCompatibility = createJavaV166TemplateCompatibility();
  const miniKvV157TemplateValidatorEcho = createMiniKvV157TemplateValidatorEcho();
  const compatibilityIntake = createCompatibilityIntake(javaV166TemplateCompatibility, miniKvV157TemplateValidatorEcho);
  const checks = createChecks(sourceNodeV402, javaV166TemplateCompatibility, miniKvV157TemplateValidatorEcho,
    compatibilityIntake);
  checks.readyForRuntimeExecutionApprovalInputTemplateCompatibilityIntake = Object.entries(checks)
    .filter(([key]) => key !== "readyForRuntimeExecutionApprovalInputTemplateCompatibilityIntake")
    .every(([, value]) => value);
  const productionBlockers = collectProductionBlockers();
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV402, javaV166TemplateCompatibility, miniKvV157TemplateValidatorEcho,
    compatibilityIntake, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution approval input template compatibility intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    intakeState: "runtime-execution-approval-input-template-compatibility-intake-blocked",
    intakeDecision: "record-upstream-template-compatibility-and-keep-runtime-blocked",
    readyForRuntimeExecutionApprovalInputTemplateCompatibilityIntake:
      checks.readyForRuntimeExecutionApprovalInputTemplateCompatibilityIntake,
    readyForRuntimeExecutionPacket: false,
    readyForRuntimeLiveReadGate: false,
    activeNodeVersion: "Node v403",
    sourceNodeVersion: "Node v402",
    javaSourceVersion: "Java v166",
    miniKvSourceVersion: "mini-kv v157",
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
    sourceNodeV402,
    javaV166TemplateCompatibility,
    miniKvV157TemplateValidatorEcho,
    compatibilityIntake,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      compatibilityIntakeJson: ROUTE_PATH,
      compatibilityIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV402Json: SOURCE_NODE_V402_ROUTE,
      sourceNodeV402Markdown: `${SOURCE_NODE_V402_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v404",
    },
    nextActions: [
      "Treat Java v166 and mini-kv v157 as template compatibility evidence only.",
      "Keep the three e/398/input canonical approval files absent until real approval values are supplied.",
      "Require one shared approvalCorrelationId across the future Node window, operator approval, and cross-project packet.",
      "Do not start Java, start mini-kv, run runtime probes, parse raw endpoint URLs, or enable active shard routing from compatibility evidence.",
      "Run Node v404 only after the canonical approval inputs are present and ready for validation.",
    ],
  };
}

function createSourceNodeV402(
  config: AppConfig,
  archiveRoot: string | undefined,
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCompatibilityIntakeProfile["sourceNodeV402"] {
  const profile =
    loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidator({
      config,
      archiveRoot,
    });
  return {
    sourceVersion: "Node v402",
    templateValidatorState: profile.templateValidatorState,
    readyForRuntimeExecutionApprovalInputTemplateValidator:
      profile.readyForRuntimeExecutionApprovalInputTemplateValidator,
    readyForRuntimeExecutionPacket: profile.readyForRuntimeExecutionPacket,
    readyForRuntimeLiveReadGate: profile.readyForRuntimeLiveReadGate,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
  };
}

function createJavaV166TemplateCompatibility(): JavaV166RuntimeExecutionApprovalInputTemplateCompatibilityReference {
  const json = readJsonObject(JAVA_V166_TEMPLATE_COMPATIBILITY);
  const file = evidenceFile("java-v166-runtime-execution-approval-input-template-compatibility",
    JAVA_V166_TEMPLATE_COMPATIBILITY);
  return {
    sourceVersion: "Java v166",
    evidenceKind: "java-runtime-execution-approval-input-template-compatibility",
    file,
    present: file.exists,
    complete: booleanField(json, "templateCompatibilityReceiptComplete") === true,
    status: stringField(json, "status") ?? "missing",
    readOnly: booleanField(json, "readOnly") === true,
    executionAllowed: false,
    sourceContractHandoffVersion: stringField(json, "sourceContractHandoffVersion"),
    sourceCanonicalJavaInputVersion: stringField(json, "sourceCanonicalJavaInputVersion"),
    lastTemplateValidatorNodeVersion: stringField(json, "lastTemplateValidatorNodeVersion"),
    nodeTemplateValidatorPresent: booleanField(json, "nodeTemplateValidatorPresent") === true,
    templatesAreApprovalInputs: booleanField(json, "templatesAreApprovalInputs") === true,
    canonicalApprovalInputsCreatedByJava: booleanField(json, "canonicalApprovalInputsCreatedByJava") === true,
    canonicalTargetPathCount: stringArrayField(json, "canonicalTargetPaths").length,
    templateArchivePathCount: stringArrayField(json, "templateArchivePaths").length,
    compatibilityCheckCount: stringArrayField(json, "compatibilityChecks").length,
    blockedCanonicalInputCount: stringArrayField(json, "blockedCanonicalInputs").length,
    failClosedRuleCount: stringArrayField(json, "failClosedRules").length,
    readyForRuntimeExecutionPacket: false,
    readyForRuntimeLiveReadGate: false,
    startsJavaService: false,
    startsMiniKvService: false,
  };
}

function createMiniKvV157TemplateValidatorEcho(): MiniKvV157RuntimeExecutionApprovalInputTemplateValidatorEchoReference {
  const json = readJsonObject(MINI_KV_V157_TEMPLATE_VALIDATOR_ECHO);
  const echo = objectField(json, "runtimeExecutionApprovalInputTemplateValidatorEcho");
  const file = evidenceFile("mini-kv-v157-runtime-execution-approval-input-template-validator-echo",
    MINI_KV_V157_TEMPLATE_VALIDATOR_ECHO);
  return {
    sourceVersion: "mini-kv v157",
    evidenceKind: "mini-kv-runtime-execution-approval-input-template-validator-echo",
    file,
    present: file.exists,
    complete:
      stringField(echo, "echoMode") === "template-validator-echo-no-canonical-inputs"
      && stringArrayField(echo, "templateArchivePaths").length === 3
      && stringArrayField(echo, "canonicalTargetPaths").length === 3
      && booleanField(echo, "failClosedOnTemplateOnlyInputs") === true,
    releaseVersion: stringField(json, "releaseVersion") ?? "missing",
    status: stringField(json, "status") ?? "missing",
    readOnly: booleanField(json, "readOnly") === true,
    executionAllowed: false,
    echoMode: stringField(echo, "echoMode") ?? "missing",
    sourceNodeValidatorVersion: stringField(echo, "sourceNodeValidatorVersion"),
    templateOnlyInputCount: stringArrayField(echo, "templateArchivePaths").length,
    templateArchivePathCount: stringArrayField(echo, "templateArchivePaths").length,
    canonicalTargetPathCount: stringArrayField(echo, "canonicalTargetPaths").length,
    canonicalRuntimeInputPresent: booleanField(echo, "canonicalRuntimeInputPresent") === true,
    templateCopiedToCanonicalInput: booleanField(echo, "templateCopiedToCanonicalInput") === true,
    sharedApprovalCorrelationIdPresent: booleanField(echo, "sharedApprovalCorrelationIdPresent") === true,
    templatesAuthorizeRuntime: booleanField(echo, "templatesAuthorizeRuntime") === true,
    failClosedOnTemplateOnlyInputs: booleanField(echo, "failClosedOnTemplateOnlyInputs") === true,
    readyForRuntimeExecutionPacket: false,
    readyForRuntimeLiveReadGate: false,
    startsJavaService: false,
    startsMiniKvService: false,
  };
}

function createCompatibilityIntake(
  javaReceipt: JavaV166RuntimeExecutionApprovalInputTemplateCompatibilityReference,
  miniKvEcho: MiniKvV157RuntimeExecutionApprovalInputTemplateValidatorEchoReference,
): RuntimeExecutionApprovalInputTemplateCompatibilityIntakeRecord {
  const compatibleUpstreamCount = [javaReceipt.complete, miniKvEcho.complete].filter(Boolean).length;
  const presentCanonicalInputCount = canonicalInputFiles().filter((file) => file.exists).length;
  const record = {
    intakeMode: "runtime-execution-approval-input-template-compatibility-intake" as const,
    sourceSpan: "Node v402 template validator + Java v166 compatibility + mini-kv v157 echo" as const,
    intakeDecision: "record-upstream-template-compatibility-and-keep-runtime-blocked" as const,
    upstreamCompatibilityReceiptCount: 2 as const,
    compatibleUpstreamCount,
    canonicalInputCount: 3 as const,
    presentCanonicalInputCount,
    validCanonicalInputCount: 0,
    templatesRemainTemplateOnly: true as const,
    runtimeGateStillClosed: true as const,
    nextNodeVersionSuggested: "Node v404" as const,
  };
  return {
    intakeDigest: sha256StableJson(record),
    ...record,
  };
}

function createChecks(
  sourceNodeV402: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCompatibilityIntakeProfile["sourceNodeV402"],
  javaReceipt: JavaV166RuntimeExecutionApprovalInputTemplateCompatibilityReference,
  miniKvEcho: MiniKvV157RuntimeExecutionApprovalInputTemplateValidatorEchoReference,
  compatibilityIntake: RuntimeExecutionApprovalInputTemplateCompatibilityIntakeRecord,
): RuntimeExecutionApprovalInputTemplateCompatibilityIntakeChecks {
  return {
    sourceNodeV402Ready:
      sourceNodeV402.readyForRuntimeExecutionApprovalInputTemplateValidator
      && sourceNodeV402.checkCount === sourceNodeV402.passedCheckCount,
    sourceNodeV402StillBlocksRuntime:
      sourceNodeV402.readyForRuntimeExecutionPacket === false
      && sourceNodeV402.readyForRuntimeLiveReadGate === false,
    javaV166EvidencePresent: javaReceipt.present,
    javaV166StatusPassed: javaReceipt.status === "passed",
    javaV166ReceiptComplete: javaReceipt.complete,
    javaV166BindsNodeV402:
      javaReceipt.lastTemplateValidatorNodeVersion === "Node v402"
      && javaReceipt.sourceContractHandoffVersion === "Java v165"
      && javaReceipt.sourceCanonicalJavaInputVersion === "Java v164",
    javaV166DoesNotCreateCanonicalInputs:
      !javaReceipt.templatesAreApprovalInputs
      && !javaReceipt.canonicalApprovalInputsCreatedByJava,
    javaV166DoesNotApproveRuntime:
      javaReceipt.executionAllowed === false
      && javaReceipt.readyForRuntimeExecutionPacket === false
      && javaReceipt.readyForRuntimeLiveReadGate === false,
    miniKvV157EvidencePresent: miniKvEcho.present,
    miniKvV157ReleaseCurrent: miniKvEcho.releaseVersion === "v157",
    miniKvV157StatusEcho:
      miniKvEcho.status === "runtime-execution-approval-input-template-validator-echo-read-only",
    miniKvV157EchoComplete: miniKvEcho.complete,
    miniKvV157DoesNotCreateCanonicalInputs:
      !miniKvEcho.canonicalRuntimeInputPresent
      && !miniKvEcho.templateCopiedToCanonicalInput
      && !miniKvEcho.templatesAuthorizeRuntime,
    miniKvV157DoesNotApproveRuntime:
      miniKvEcho.executionAllowed === false
      && miniKvEcho.readyForRuntimeExecutionPacket === false
      && miniKvEcho.readyForRuntimeLiveReadGate === false,
    templateMatrixCountStable:
      javaReceipt.canonicalTargetPathCount === 3
      && javaReceipt.templateArchivePathCount === 3
      && miniKvEcho.canonicalTargetPathCount === 3
      && miniKvEcho.templateArchivePathCount === 3,
    canonicalTargetsRemainAbsent: canonicalInputFiles().every((file) => !file.exists),
    compatibilityRecordsComplete: compatibilityIntake.compatibleUpstreamCount === 2,
    runtimePacketStillAbsent: true,
    runtimeGateStillClosed: compatibilityIntake.runtimeGateStillClosed,
    executionStillDenied: true,
    noAutomaticUpstreamStartStop: true,
    noUpstreamMutation: true,
    noManagedAuditConnection: true,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    activeShardPrototypeStillDisabled: true,
    compatibilityDigestStable: isDigest(compatibilityIntake.intakeDigest),
    readyForRuntimeExecutionApprovalInputTemplateCompatibilityIntake: false,
  };
}

function createSummary(
  sourceNodeV402: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCompatibilityIntakeProfile["sourceNodeV402"],
  javaReceipt: JavaV166RuntimeExecutionApprovalInputTemplateCompatibilityReference,
  miniKvEcho: MiniKvV157RuntimeExecutionApprovalInputTemplateValidatorEchoReference,
  compatibilityIntake: RuntimeExecutionApprovalInputTemplateCompatibilityIntakeRecord,
  checks: RuntimeExecutionApprovalInputTemplateCompatibilityIntakeChecks,
  productionBlockers: RuntimeExecutionApprovalInputTemplateCompatibilityIntakeMessage[],
  warnings: RuntimeExecutionApprovalInputTemplateCompatibilityIntakeMessage[],
  recommendations: RuntimeExecutionApprovalInputTemplateCompatibilityIntakeMessage[],
): RuntimeExecutionApprovalInputTemplateCompatibilityIntakeSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceCheckCount: sourceNodeV402.checkCount,
    sourcePassedCheckCount: sourceNodeV402.passedCheckCount,
    javaCompatibilityReady: javaReceipt.complete,
    miniKvTemplateEchoReady: miniKvEcho.complete,
    upstreamCompatibilityReceiptCount: compatibilityIntake.upstreamCompatibilityReceiptCount,
    compatibleUpstreamCount: compatibilityIntake.compatibleUpstreamCount,
    canonicalInputCount: compatibilityIntake.canonicalInputCount,
    presentCanonicalInputCount: compatibilityIntake.presentCanonicalInputCount,
    validCanonicalInputCount: compatibilityIntake.validCanonicalInputCount,
    missingCanonicalInputCount:
      compatibilityIntake.canonicalInputCount - compatibilityIntake.presentCanonicalInputCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(): RuntimeExecutionApprovalInputTemplateCompatibilityIntakeMessage[] {
  return [
    {
      code: "NODE_APPROVED_RUNTIME_WINDOW_INPUT_NOT_PRESENT",
      severity: "blocker",
      source: CANONICAL_TARGETS[0],
      message: "The canonical Node-approved runtime window input is still absent.",
    },
    {
      code: "CORRELATED_OPERATOR_APPROVAL_RECORD_INPUT_NOT_PRESENT",
      severity: "blocker",
      source: CANONICAL_TARGETS[1],
      message: "The canonical correlated operator approval record input is still absent.",
    },
    {
      code: "CROSS_PROJECT_RUNTIME_EXECUTION_PACKET_INPUT_NOT_PRESENT",
      severity: "blocker",
      source: CANONICAL_TARGETS[2],
      message: "The canonical complete cross-project runtime execution packet input is still absent.",
    },
  ];
}

function collectWarnings(): RuntimeExecutionApprovalInputTemplateCompatibilityIntakeMessage[] {
  return [
    {
      code: "UPSTREAM_COMPATIBILITY_IS_NOT_RUNTIME_APPROVAL",
      severity: "warning",
      source: "node-v403",
      message: "Java v166 and mini-kv v157 confirm template compatibility only; they do not approve runtime execution.",
    },
  ];
}

function collectRecommendations(): RuntimeExecutionApprovalInputTemplateCompatibilityIntakeMessage[] {
  return [
    {
      code: "WAIT_FOR_CANONICAL_APPROVAL_INPUTS",
      severity: "recommendation",
      source: "node-v403",
      message: "Proceed to canonical input validation only after all three e/398/input files are supplied with real approval values.",
    },
  ];
}

function canonicalInputFiles() {
  return CANONICAL_TARGETS.map((target) => ({
    id: target,
    path: target,
    resolvedPath: target,
    exists: false,
    sizeBytes: 0,
    digest: null,
  }));
}

function isDigest(value: string | null | undefined): boolean {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
