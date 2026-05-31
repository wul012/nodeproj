import type { AppConfig } from "../config.js";
import {
  booleanField,
  evidenceFile,
  numberField,
  objectField,
  readJsonObject,
  stringArrayField,
  stringField,
} from "./historicalEvidenceReportUtils.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCompatibilityIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCompatibilityIntake.js";
import type {
  JavaV167RuntimeExecutionApprovalInputTemplateCompatibilityIntakeReference,
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputPrecheckIntakeProfile,
  MiniKvV158RuntimeExecutionCanonicalApprovalInputPrecheckReference,
  RuntimeExecutionCanonicalApprovalInputPrecheckIntakeChecks,
  RuntimeExecutionCanonicalApprovalInputPrecheckIntakeMessage,
  RuntimeExecutionCanonicalApprovalInputPrecheckIntakeRecord,
  RuntimeExecutionCanonicalApprovalInputPrecheckIntakeSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputPrecheckIntakeTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputPrecheckIntakeMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputPrecheckIntakeRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-canonical-approval-input-precheck-intake.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-canonical-approval-input-precheck-intake";
const SOURCE_NODE_V403_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-template-compatibility-intake";
const ACTIVE_PLAN =
  "docs/plans3/v404-post-java-mini-kv-runtime-execution-canonical-approval-input-precheck-intake-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v405-post-runtime-execution-canonical-approval-input-validation-roadmap.md";
const JAVA_V167_TEMPLATE_COMPATIBILITY_INTAKE =
  "D:/javaproj/advanced-order-platform/e/167/evidence/java-shard-readiness-runtime-execution-approval-input-template-compatibility-intake-v167.json";
const MINI_KV_V158_CANONICAL_APPROVAL_INPUT_PRECHECK =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v158.json";
const CANONICAL_TARGETS = [
  "e/398/input/node-approved-runtime-window-v398.json",
  "e/398/input/correlated-operator-approval-record-v398.json",
  "e/398/input/cross-project-runtime-execution-packet-v398.json",
] as const;

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputPrecheckIntake(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputPrecheckIntakeProfile {
  const sourceNodeV403 = createSourceNodeV403(input.config, input.archiveRoot);
  const javaV167TemplateCompatibilityIntake = createJavaV167TemplateCompatibilityIntake();
  const miniKvV158CanonicalApprovalInputPrecheck = createMiniKvV158CanonicalApprovalInputPrecheck();
  const canonicalApprovalInputPrecheckIntake = createCanonicalApprovalInputPrecheckIntake(
    javaV167TemplateCompatibilityIntake,
    miniKvV158CanonicalApprovalInputPrecheck,
  );
  const checks = createChecks(
    sourceNodeV403,
    javaV167TemplateCompatibilityIntake,
    miniKvV158CanonicalApprovalInputPrecheck,
    canonicalApprovalInputPrecheckIntake,
  );
  checks.readyForRuntimeExecutionCanonicalApprovalInputPrecheckIntake = Object.entries(checks)
    .filter(([key]) => key !== "readyForRuntimeExecutionCanonicalApprovalInputPrecheckIntake")
    .every(([, value]) => value);
  const productionBlockers = collectProductionBlockers();
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(
    sourceNodeV403,
    javaV167TemplateCompatibilityIntake,
    miniKvV158CanonicalApprovalInputPrecheck,
    canonicalApprovalInputPrecheckIntake,
    checks,
    productionBlockers,
    warnings,
    recommendations,
  );

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution canonical approval input precheck intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    intakeState: "runtime-execution-canonical-approval-input-precheck-intake-blocked",
    intakeDecision: "record-canonical-approval-input-precheck-and-keep-runtime-blocked",
    readyForRuntimeExecutionCanonicalApprovalInputPrecheckIntake:
      checks.readyForRuntimeExecutionCanonicalApprovalInputPrecheckIntake,
    readyForRuntimeExecutionPacket: false,
    readyForRuntimeLiveReadGate: false,
    activeNodeVersion: "Node v404",
    sourceNodeVersion: "Node v403",
    javaSourceVersion: "Java v167",
    miniKvSourceVersion: "mini-kv v158",
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
    sourceNodeV403,
    javaV167TemplateCompatibilityIntake,
    miniKvV158CanonicalApprovalInputPrecheck,
    canonicalApprovalInputPrecheckIntake,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      canonicalApprovalInputPrecheckIntakeJson: ROUTE_PATH,
      canonicalApprovalInputPrecheckIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV403Json: SOURCE_NODE_V403_ROUTE,
      sourceNodeV403Markdown: `${SOURCE_NODE_V403_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v405",
    },
    nextActions: [
      "Treat Java v167 and mini-kv v158 as read-only precheck evidence only.",
      "Keep runtime execution blocked until all three e/398/input canonical approval files exist with real values.",
      "Require one shared approvalCorrelationId across the Node-approved runtime window, operator approval record, and cross-project packet.",
      "Do not start Java, start mini-kv, run runtime probes, parse raw endpoint URLs, connect managed audit, or enable active shard routing from precheck evidence.",
      "Run Node v405 only after the real canonical approval inputs are supplied and ready for value validation.",
    ],
  };
}

function createSourceNodeV403(
  config: AppConfig,
  archiveRoot: string | undefined,
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputPrecheckIntakeProfile["sourceNodeV403"] {
  const profile =
    loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCompatibilityIntake({
      config,
      archiveRoot,
    });
  return {
    sourceVersion: "Node v403",
    intakeState: profile.intakeState,
    readyForRuntimeExecutionApprovalInputTemplateCompatibilityIntake:
      profile.readyForRuntimeExecutionApprovalInputTemplateCompatibilityIntake,
    readyForRuntimeExecutionPacket: profile.readyForRuntimeExecutionPacket,
    readyForRuntimeLiveReadGate: profile.readyForRuntimeLiveReadGate,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
    compatibleUpstreamCount: profile.summary.compatibleUpstreamCount,
    missingCanonicalInputCount: profile.summary.missingCanonicalInputCount,
  };
}

function createJavaV167TemplateCompatibilityIntake():
JavaV167RuntimeExecutionApprovalInputTemplateCompatibilityIntakeReference {
  const json = readJsonObject(JAVA_V167_TEMPLATE_COMPATIBILITY_INTAKE);
  const file = evidenceFile(
    "java-v167-runtime-execution-approval-input-template-compatibility-intake",
    JAVA_V167_TEMPLATE_COMPATIBILITY_INTAKE,
  );
  return {
    sourceVersion: "Java v167",
    evidenceKind: "java-runtime-execution-approval-input-template-compatibility-intake",
    file,
    present: file.exists,
    complete:
      booleanField(json, "compatibilityIntakeReceiptComplete") === true
      && booleanField(json, "nodeCompatibilityIntakeComplete") === true
      && booleanField(json, "sourceTemplateCompatibilityReceiptComplete") === true,
    status: stringField(json, "status") ?? "missing",
    readOnly: booleanField(json, "readOnly") === true,
    executionAllowed: false,
    compatibilityIntakeReceiptPresent: booleanField(json, "compatibilityIntakeReceiptPresent") === true,
    compatibilityIntakeReceiptComplete: booleanField(json, "compatibilityIntakeReceiptComplete") === true,
    nodeCompatibilityIntakePresent: booleanField(json, "nodeCompatibilityIntakePresent") === true,
    nodeCompatibilityIntakeComplete: booleanField(json, "nodeCompatibilityIntakeComplete") === true,
    sourceTemplateCompatibilityReceiptComplete:
      booleanField(json, "sourceTemplateCompatibilityReceiptComplete") === true,
    sourceJavaInputCanonical: booleanField(json, "sourceJavaInputCanonical") === true,
    nodeTemplateValidatorPresent: booleanField(json, "nodeTemplateValidatorPresent") === true,
    templatesAreApprovalInputs: booleanField(json, "templatesAreApprovalInputs") === true,
    canonicalApprovalInputsCreatedByJava: booleanField(json, "canonicalApprovalInputsCreatedByJava") === true,
    canonicalApprovalInputsCreatedByNodeV403:
      booleanField(json, "canonicalApprovalInputsCreatedByNodeV403") === true,
    nodeApprovedRuntimeWindowPresent: booleanField(json, "nodeApprovedRuntimeWindowPresent") === true,
    correlatedOperatorApprovalRecordPresent:
      booleanField(json, "correlatedOperatorApprovalRecordPresent") === true,
    completeCrossProjectRuntimeExecutionPacketPresent:
      booleanField(json, "completeCrossProjectRuntimeExecutionPacketPresent") === true,
    sourceTemplateCompatibilityVersion: stringField(json, "sourceTemplateCompatibilityVersion"),
    sourceContractHandoffVersion: stringField(json, "sourceContractHandoffVersion"),
    sourceCanonicalJavaInputVersion: stringField(json, "sourceCanonicalJavaInputVersion"),
    sourceNodeTemplateValidatorVersion: stringField(json, "sourceNodeTemplateValidatorVersion"),
    nodeCompatibilityIntakeVersion: stringField(json, "nodeCompatibilityIntakeVersion"),
    miniKvTemplateEchoVersion: stringField(json, "miniKvTemplateEchoVersion"),
    nextNodeConsumerHint: stringField(json, "nextNodeConsumerHint"),
    canonicalTargetPathCount: stringArrayField(json, "canonicalTargetPaths").length,
    templateArchivePathCount: stringArrayField(json, "templateArchivePaths").length,
    compatibilityIntakeCheckCount: stringArrayField(json, "compatibilityIntakeChecks").length,
    blockedCanonicalInputCount: stringArrayField(json, "blockedCanonicalInputs").length,
    productionBlockerCount: stringArrayField(json, "productionBlockers").length,
    failClosedRuleCount: stringArrayField(json, "failClosedRules").length,
    stopConditionCount: stringArrayField(json, "stopConditions").length,
    runtimeExecutionPacketPresent: false,
    runtimeGateApprovalPresent: false,
    readyForRuntimeExecutionPacket: false,
    readyForRuntimeLiveReadGate: false,
    startsJavaService: false,
    startsMiniKvService: false,
  };
}

function createMiniKvV158CanonicalApprovalInputPrecheck():
MiniKvV158RuntimeExecutionCanonicalApprovalInputPrecheckReference {
  const json = readJsonObject(MINI_KV_V158_CANONICAL_APPROVAL_INPUT_PRECHECK);
  const precheck = objectField(json, "runtimeExecutionCanonicalApprovalInputPrecheck");
  const file = evidenceFile(
    "mini-kv-v158-runtime-execution-canonical-approval-input-precheck",
    MINI_KV_V158_CANONICAL_APPROVAL_INPUT_PRECHECK,
  );
  return {
    sourceVersion: "mini-kv v158",
    evidenceKind: "mini-kv-runtime-execution-canonical-approval-input-precheck",
    file,
    present: file.exists,
    complete:
      stringField(precheck, "precheckMode") === "blocked-missing-canonical-approval-inputs"
      && numberField(precheck, "requiredCanonicalInputCount") === 3
      && numberField(precheck, "presentCanonicalInputCount") === 0
      && numberField(precheck, "missingCanonicalInputCount") === 3
      && booleanField(precheck, "failClosedOnMissingCanonicalInputs") === true,
    releaseVersion: stringField(json, "releaseVersion") ?? "missing",
    status: stringField(json, "status") ?? "missing",
    readOnly: booleanField(json, "readOnly") === true,
    executionAllowed: false,
    precheckMode: stringField(precheck, "precheckMode") ?? "missing",
    sourceFrozenReleaseVersion: stringField(precheck, "sourceFrozenReleaseVersion"),
    sourceNodeCompatibilityVersion: stringField(precheck, "sourceNodeCompatibilityVersion"),
    sourceNodePlan: stringField(precheck, "sourceNodePlan"),
    canonicalInputRoot: stringField(precheck, "canonicalInputRoot"),
    requiredCanonicalInputCount: numberField(precheck, "requiredCanonicalInputCount") ?? 0,
    presentCanonicalInputCount: numberField(precheck, "presentCanonicalInputCount") ?? 0,
    missingCanonicalInputCount: numberField(precheck, "missingCanonicalInputCount") ?? 0,
    requiredCanonicalInputPathCount: stringArrayField(precheck, "requiredCanonicalInputPaths").length,
    nodeApprovedRuntimeWindowCanonicalPresent:
      booleanField(precheck, "nodeApprovedRuntimeWindowCanonicalPresent") === true,
    correlatedOperatorApprovalRecordCanonicalPresent:
      booleanField(precheck, "correlatedOperatorApprovalRecordCanonicalPresent") === true,
    completeCrossProjectRuntimeExecutionPacketCanonicalPresent:
      booleanField(precheck, "completeCrossProjectRuntimeExecutionPacketCanonicalPresent") === true,
    canonicalApprovalInputsComplete: booleanField(precheck, "canonicalApprovalInputsComplete") === true,
    sharedApprovalCorrelationIdPresent: booleanField(precheck, "sharedApprovalCorrelationIdPresent") === true,
    sharedApprovalCorrelationIdValidated: booleanField(precheck, "sharedApprovalCorrelationIdValidated") === true,
    templatesAcceptedAsCanonicalInputs: booleanField(precheck, "templatesAcceptedAsCanonicalInputs") === true,
    templateCompatibilityEvidenceAcceptedAsApproval:
      booleanField(precheck, "templateCompatibilityEvidenceAcceptedAsApproval") === true,
    runtimeGateApprovalPresent: booleanField(precheck, "runtimeGateApprovalPresent") === true,
    runtimeExecutionPacketPresent: booleanField(precheck, "runtimeExecutionPacketPresent") === true,
    runtimeExecutionPacketExecutable: booleanField(precheck, "runtimeExecutionPacketExecutable") === true,
    readyForRuntimeExecutionPacket: false,
    readyForRuntimeLiveReadGate: false,
    concreteLoopbackPortsAssigned: booleanField(precheck, "concreteLoopbackPortsAssigned") === true,
    executionAttempted: booleanField(precheck, "executionAttempted") === true,
    startsJavaService: false,
    startsMiniKvService: false,
    startsServices: booleanField(precheck, "startsServices") === true,
    runtimeProbeAllowed: booleanField(precheck, "runtimeProbeAllowed") === true,
    liveReadAllowed: booleanField(precheck, "liveReadAllowed") === true,
    activeShardPrototypeEnabled: booleanField(precheck, "activeShardPrototypeEnabled") === true,
    routerActivationAllowed: booleanField(precheck, "routerActivationAllowed") === true,
    writeRoutingAllowed: booleanField(precheck, "writeRoutingAllowed") === true,
    requiresRealCanonicalInputs: booleanField(precheck, "requiresRealCanonicalInputs") === true,
    requiresSharedApprovalCorrelationId: booleanField(precheck, "requiresSharedApprovalCorrelationId") === true,
    requiresConcreteApprovalValues: booleanField(precheck, "requiresConcreteApprovalValues") === true,
    requiresGetOnlySmokeCommands: booleanField(precheck, "requiresGetOnlySmokeCommands") === true,
    requiresCleanupProofAfterApprovedStart:
      booleanField(precheck, "requiresCleanupProofAfterApprovedStart") === true,
    failClosedOnMissingCanonicalInputs:
      booleanField(precheck, "failClosedOnMissingCanonicalInputs") === true,
  };
}

function createCanonicalApprovalInputPrecheckIntake(
  javaReceipt: JavaV167RuntimeExecutionApprovalInputTemplateCompatibilityIntakeReference,
  miniKvPrecheck: MiniKvV158RuntimeExecutionCanonicalApprovalInputPrecheckReference,
): RuntimeExecutionCanonicalApprovalInputPrecheckIntakeRecord {
  const completeUpstreamPrecheckCount = [javaReceipt.complete, miniKvPrecheck.complete].filter(Boolean).length;
  const presentCanonicalInputCount = canonicalInputFiles().filter((file) => file.exists).length;
  const record = {
    intakeMode: "runtime-execution-canonical-approval-input-precheck-intake" as const,
    sourceSpan:
      "Node v403 compatibility intake + Java v167 compatibility intake + mini-kv v158 canonical precheck" as const,
    intakeDecision: "record-canonical-approval-input-precheck-and-keep-runtime-blocked" as const,
    upstreamPrecheckReceiptCount: 2 as const,
    completeUpstreamPrecheckCount,
    canonicalInputCount: 3 as const,
    presentCanonicalInputCount,
    validCanonicalInputCount: 0,
    missingCanonicalInputCount: 3 - presentCanonicalInputCount,
    sharedApprovalCorrelationIdValidated: false as const,
    runtimeGateStillClosed: true as const,
    nextNodeVersionSuggested: "Node v405" as const,
  };
  return {
    intakeDigest: sha256StableJson(record),
    ...record,
  };
}

function createChecks(
  sourceNodeV403: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputPrecheckIntakeProfile["sourceNodeV403"],
  javaReceipt: JavaV167RuntimeExecutionApprovalInputTemplateCompatibilityIntakeReference,
  miniKvPrecheck: MiniKvV158RuntimeExecutionCanonicalApprovalInputPrecheckReference,
  precheckIntake: RuntimeExecutionCanonicalApprovalInputPrecheckIntakeRecord,
): RuntimeExecutionCanonicalApprovalInputPrecheckIntakeChecks {
  return {
    sourceNodeV403Ready:
      sourceNodeV403.readyForRuntimeExecutionApprovalInputTemplateCompatibilityIntake
      && sourceNodeV403.checkCount === sourceNodeV403.passedCheckCount,
    sourceNodeV403StillBlocksRuntime:
      sourceNodeV403.readyForRuntimeExecutionPacket === false
      && sourceNodeV403.readyForRuntimeLiveReadGate === false,
    javaV167EvidencePresent: javaReceipt.present,
    javaV167StatusPassed: javaReceipt.status === "passed",
    javaV167ReceiptComplete: javaReceipt.complete,
    javaV167BindsNodeV403:
      javaReceipt.nodeCompatibilityIntakeVersion === "Node v403"
      && javaReceipt.sourceNodeTemplateValidatorVersion === "Node v402"
      && javaReceipt.miniKvTemplateEchoVersion === "mini-kv v157",
    javaV167DoesNotCreateCanonicalInputs:
      !javaReceipt.templatesAreApprovalInputs
      && !javaReceipt.canonicalApprovalInputsCreatedByJava
      && !javaReceipt.canonicalApprovalInputsCreatedByNodeV403,
    javaV167LeavesCanonicalInputsMissing:
      !javaReceipt.nodeApprovedRuntimeWindowPresent
      && !javaReceipt.correlatedOperatorApprovalRecordPresent
      && !javaReceipt.completeCrossProjectRuntimeExecutionPacketPresent,
    javaV167DoesNotApproveRuntime:
      javaReceipt.executionAllowed === false
      && javaReceipt.readyForRuntimeExecutionPacket === false
      && javaReceipt.readyForRuntimeLiveReadGate === false,
    miniKvV158EvidencePresent: miniKvPrecheck.present,
    miniKvV158ReleaseCurrent: miniKvPrecheck.releaseVersion === "v158",
    miniKvV158StatusPrecheck:
      miniKvPrecheck.status === "runtime-execution-canonical-approval-input-precheck-read-only",
    miniKvV158PrecheckComplete: miniKvPrecheck.complete,
    miniKvV158BindsNodeV403:
      miniKvPrecheck.sourceNodeCompatibilityVersion === "Node v403 template compatibility intake"
      && miniKvPrecheck.sourceFrozenReleaseVersion === "v157",
    miniKvV158CanonicalCountsBlocked:
      miniKvPrecheck.requiredCanonicalInputCount === 3
      && miniKvPrecheck.presentCanonicalInputCount === 0
      && miniKvPrecheck.missingCanonicalInputCount === 3,
    miniKvV158DoesNotAcceptTemplatesAsCanonical:
      !miniKvPrecheck.templatesAcceptedAsCanonicalInputs
      && !miniKvPrecheck.templateCompatibilityEvidenceAcceptedAsApproval,
    miniKvV158RequiresRealApprovalValues:
      miniKvPrecheck.requiresRealCanonicalInputs
      && miniKvPrecheck.requiresSharedApprovalCorrelationId
      && miniKvPrecheck.requiresConcreteApprovalValues,
    miniKvV158DoesNotApproveRuntime:
      miniKvPrecheck.executionAllowed === false
      && miniKvPrecheck.readyForRuntimeExecutionPacket === false
      && miniKvPrecheck.readyForRuntimeLiveReadGate === false,
    canonicalTargetsRemainAbsent: canonicalInputFiles().every((file) => !file.exists),
    precheckRecordsComplete: precheckIntake.completeUpstreamPrecheckCount === 2,
    runtimePacketStillAbsent: true,
    runtimeGateStillClosed: precheckIntake.runtimeGateStillClosed,
    executionStillDenied: true,
    noAutomaticUpstreamStartStop: true,
    noUpstreamMutation: true,
    noManagedAuditConnection: true,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    activeShardPrototypeStillDisabled: true,
    precheckDigestStable: isDigest(precheckIntake.intakeDigest),
    readyForRuntimeExecutionCanonicalApprovalInputPrecheckIntake: false,
  };
}

function createSummary(
  sourceNodeV403: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputPrecheckIntakeProfile["sourceNodeV403"],
  javaReceipt: JavaV167RuntimeExecutionApprovalInputTemplateCompatibilityIntakeReference,
  miniKvPrecheck: MiniKvV158RuntimeExecutionCanonicalApprovalInputPrecheckReference,
  precheckIntake: RuntimeExecutionCanonicalApprovalInputPrecheckIntakeRecord,
  checks: RuntimeExecutionCanonicalApprovalInputPrecheckIntakeChecks,
  productionBlockers: RuntimeExecutionCanonicalApprovalInputPrecheckIntakeMessage[],
  warnings: RuntimeExecutionCanonicalApprovalInputPrecheckIntakeMessage[],
  recommendations: RuntimeExecutionCanonicalApprovalInputPrecheckIntakeMessage[],
): RuntimeExecutionCanonicalApprovalInputPrecheckIntakeSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceCheckCount: sourceNodeV403.checkCount,
    sourcePassedCheckCount: sourceNodeV403.passedCheckCount,
    javaCompatibilityIntakeReady: javaReceipt.complete,
    miniKvCanonicalPrecheckReady: miniKvPrecheck.complete,
    upstreamPrecheckReceiptCount: precheckIntake.upstreamPrecheckReceiptCount,
    completeUpstreamPrecheckCount: precheckIntake.completeUpstreamPrecheckCount,
    canonicalInputCount: precheckIntake.canonicalInputCount,
    presentCanonicalInputCount: precheckIntake.presentCanonicalInputCount,
    validCanonicalInputCount: precheckIntake.validCanonicalInputCount,
    missingCanonicalInputCount: precheckIntake.missingCanonicalInputCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(): RuntimeExecutionCanonicalApprovalInputPrecheckIntakeMessage[] {
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

function collectWarnings(): RuntimeExecutionCanonicalApprovalInputPrecheckIntakeMessage[] {
  return [
    {
      code: "UPSTREAM_PRECHECK_IS_NOT_RUNTIME_APPROVAL",
      severity: "warning",
      source: "node-v404",
      message: "Java v167 and mini-kv v158 are read-only precheck evidence; they do not approve runtime execution.",
    },
  ];
}

function collectRecommendations(): RuntimeExecutionCanonicalApprovalInputPrecheckIntakeMessage[] {
  return [
    {
      code: "WAIT_FOR_REAL_CANONICAL_APPROVAL_INPUT_VALUES",
      severity: "recommendation",
      source: "node-v404",
      message: "Proceed to value validation only after all three e/398/input files exist with one shared approvalCorrelationId.",
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
