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
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContract,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContract.js";
import type {
  JavaV165RuntimeExecutionApprovalInputContractHandoffReference,
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntakeProfile,
  MiniKvV156FinalApprovalGateInputReference,
  RuntimeExecutionApprovalCompletionInputReference,
  RuntimeExecutionApprovalInputCompletionIntakeChecks,
  RuntimeExecutionApprovalInputCompletionIntakeMessage,
  RuntimeExecutionApprovalInputCompletionIntakeRecord,
  RuntimeExecutionApprovalInputCompletionIntakeSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntakeTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntakeMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntakeRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-completion-intake.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-completion-intake";
const SOURCE_NODE_V400_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-intake-contract";
const ACTIVE_PLAN =
  "docs/plans3/v401-post-java-mini-kv-runtime-execution-approval-input-completion-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v402-post-runtime-execution-approval-window-intake-roadmap.md";
const JAVA_V165_CONTRACT_HANDOFF =
  "D:/javaproj/advanced-order-platform/e/165/evidence/java-shard-readiness-runtime-execution-approval-input-contract-handoff-v165.json";
const MINI_KV_V156_FINAL_APPROVAL_INPUT =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v156.json";
const REQUIRED_INPUT_COUNT = 5;
const REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT = 6;

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntake(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntakeProfile {
  const sourceNodeV400 = createSourceNodeV400(input.config, input.archiveRoot);
  const javaV165ContractHandoff = createJavaV165ContractHandoff();
  const miniKvV156FinalApprovalInput = createMiniKvV156FinalApprovalInput();
  const completionInputs = createCompletionInputs(javaV165ContractHandoff, miniKvV156FinalApprovalInput);
  const draftCompletionIntake = createCompletionIntake(completionInputs);
  const checks = createChecks(sourceNodeV400, javaV165ContractHandoff, miniKvV156FinalApprovalInput, completionInputs,
    draftCompletionIntake);
  checks.readyForRuntimeExecutionApprovalInputCompletionIntake = Object.entries(checks)
    .filter(([key]) => key !== "readyForRuntimeExecutionApprovalInputCompletionIntake")
    .every(([, value]) => value);
  const completionIntake = createCompletionIntake(completionInputs);
  checks.intakeDigestStable = isDigest(completionIntake.intakeDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV400, completionInputs, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution approval input completion intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    intakeState: "runtime-execution-approval-input-completion-intake-blocked",
    intakeDecision: "block-runtime-execution-pending-node-window-operator-approval-and-cross-project-packet",
    readyForRuntimeExecutionApprovalInputCompletionIntake:
      checks.readyForRuntimeExecutionApprovalInputCompletionIntake,
    readyForRuntimeExecutionPacket: false,
    readyForRuntimeLiveReadGate: false,
    activeNodeVersion: "Node v401",
    sourceNodeVersion: "Node v400",
    javaSourceVersion: "Java v165",
    miniKvSourceVersion: "mini-kv v156",
    runtimeGateRequiresSeparateApproval: true,
    runtimeExecutionArtifactsComplete: false,
    presentRuntimeExecutionArtifactCount: 0,
    missingRuntimeExecutionArtifactCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
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
    sourceNodeV400,
    javaV165ContractHandoff,
    miniKvV156FinalApprovalInput,
    completionInputs,
    completionIntake,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      completionIntakeJson: ROUTE_PATH,
      completionIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV400Json: SOURCE_NODE_V400_ROUTE,
      sourceNodeV400Markdown: `${SOURCE_NODE_V400_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v402",
    },
    nextActions: [
      "Treat Java v165 as a contract handoff that keeps Java v164 canonical.",
      "Treat mini-kv v156 as the final mini-kv approval input, still without runtime approval.",
      "Collect the Node-approved runtime window before any service startup.",
      "Collect the correlated operator approval record and complete cross-project runtime execution packet before any live-read or runtime probe.",
      "Do not start Java, start mini-kv, parse raw endpoint URLs, or enable active shard routing from this completion intake.",
    ],
  };
}

function createSourceNodeV400(
  config: AppConfig,
  archiveRoot: string | undefined,
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntakeProfile["sourceNodeV400"] {
  const profile =
    loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContract({
      config,
      archiveRoot,
    });
  return {
    sourceVersion: "Node v400",
    intakeState: profile.intakeState,
    readyForRuntimeExecutionApprovalInputIntakeContract:
      profile.readyForRuntimeExecutionApprovalInputIntakeContract,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
  };
}

function createJavaV165ContractHandoff(): JavaV165RuntimeExecutionApprovalInputContractHandoffReference {
  const json = readJsonObject(JAVA_V165_CONTRACT_HANDOFF);
  const file = evidenceFile("java-v165-runtime-execution-approval-input-contract-handoff",
    JAVA_V165_CONTRACT_HANDOFF);
  return {
    sourceVersion: "Java v165",
    evidenceKind: "java-runtime-execution-approval-input-contract-handoff",
    file,
    present: file.exists,
    complete: booleanField(json, "javaApprovalInputContractHandoffComplete") === true,
    status: stringField(json, "status") ?? "missing",
    readOnly: booleanField(json, "readOnly") === true,
    executionAllowed: false,
    sourceApprovalGateInputVersion: stringField(json, "sourceApprovalGateInputVersion"),
    javaInputRemainsCanonical: booleanField(json, "javaInputRemainsCanonical") === true,
    javaInputChangedByThisVersion: booleanField(json, "javaInputChangedByThisVersion") === true,
    sourceJavaApprovalGateInputPresent: booleanField(json, "sourceJavaApprovalGateInputPresent") === true,
    sourceJavaApprovalGateInputComplete: booleanField(json, "sourceJavaApprovalGateInputComplete") === true,
    nonJavaMissingInputCount: stringArrayField(json, "nonJavaMissingInputs").length,
    finalPacketBindingRequirementCount: stringArrayField(json, "finalPacketBindingRequirements").length,
    readyForRuntimeExecutionPacket: false,
    readyForRuntimeLiveReadGate: false,
    startsJavaService: false,
    startsMiniKvService: false,
  };
}

function createMiniKvV156FinalApprovalInput(): MiniKvV156FinalApprovalGateInputReference {
  const json = readJsonObject(MINI_KV_V156_FINAL_APPROVAL_INPUT);
  const input = objectField(json, "miniKvFinalApprovalGateInput");
  const file = evidenceFile("mini-kv-v156-final-approval-gate-input", MINI_KV_V156_FINAL_APPROVAL_INPUT);
  return {
    sourceVersion: "mini-kv v156",
    evidenceKind: "mini-kv-final-approval-gate-input",
    file,
    present: file.exists,
    complete: booleanField(input, "miniKvApprovalGateInputComplete") === true,
    releaseVersion: stringField(json, "releaseVersion") ?? "missing",
    status: stringField(json, "status") ?? "missing",
    readOnly: booleanField(json, "readOnly") === true,
    executionAllowed: false,
    inputMode: stringField(input, "inputMode") ?? "missing",
    itemCount: numberField(input, "miniKvApprovalGateInputItemCount") ?? -1,
    loopbackHost: stringField(input, "miniKvLoopbackHost"),
    loopbackPort: numberField(input, "miniKvLoopbackPort"),
    serviceOwnerConfirmed: booleanField(input, "serviceOwnerConfirmed") === true,
    processCleanupRulesComplete: booleanField(input, "processCleanupRulesComplete") === true,
    cleanupProofPresent: booleanField(input, "cleanupProofPresent") === true,
    nodeApprovedRuntimeWindowPresent: booleanField(input, "nodeApprovedRuntimeWindowPresent") === true,
    correlatedOperatorApprovalRecordPresent: booleanField(input, "correlatedOperatorApprovalRecordPresent") === true,
    completeCrossProjectRuntimeExecutionPacketPresent:
      booleanField(input, "completeCrossProjectRuntimeExecutionPacketPresent") === true,
    readyForRuntimeExecutionPacket: false,
    readyForRuntimeLiveReadGate: false,
    startsJavaService: false,
    startsMiniKvService: false,
  };
}

function createCompletionInputs(
  javaHandoff: JavaV165RuntimeExecutionApprovalInputContractHandoffReference,
  miniKvInput: MiniKvV156FinalApprovalGateInputReference,
): RuntimeExecutionApprovalCompletionInputReference[] {
  return [
    {
      key: "javaCanonicalApprovalInput",
      owner: "java",
      present: javaHandoff.present,
      complete: javaHandoff.complete && javaHandoff.javaInputRemainsCanonical,
      blocksRuntime: false,
      evidence: javaHandoff.file.path,
      requiredBeforeRuntime: true,
    },
    {
      key: "miniKvFinalApprovalInput",
      owner: "mini-kv",
      present: miniKvInput.present,
      complete: miniKvInput.complete,
      blocksRuntime: false,
      evidence: miniKvInput.file.path,
      requiredBeforeRuntime: true,
    },
    missingInput("nodeApprovedRuntimeWindow", "node", "e/398/input/node-approved-runtime-window-v398.json"),
    missingInput("correlatedOperatorApprovalRecord", "operator", "e/398/input/correlated-operator-approval-record-v398.json"),
    missingInput("crossProjectRuntimeExecutionPacket", "cross-project", "e/398/input/cross-project-runtime-execution-packet-v398.json"),
  ];
}

function missingInput(
  key: RuntimeExecutionApprovalCompletionInputReference["key"],
  owner: RuntimeExecutionApprovalCompletionInputReference["owner"],
  evidence: string,
): RuntimeExecutionApprovalCompletionInputReference {
  return {
    key,
    owner,
    present: false,
    complete: false,
    blocksRuntime: true,
    evidence,
    requiredBeforeRuntime: true,
  };
}

function createCompletionIntake(
  inputs: RuntimeExecutionApprovalCompletionInputReference[],
): RuntimeExecutionApprovalInputCompletionIntakeRecord {
  const presentInputCount = inputs.filter((input) => input.present).length;
  const completeInputCount = inputs.filter((input) => input.complete).length;
  const record = {
    intakeMode: "runtime-execution-approval-input-completion-intake" as const,
    sourceSpan: "Node v400 contract + Java v165 handoff + mini-kv v156 final input" as const,
    intakeDecision:
      "block-runtime-execution-pending-node-window-operator-approval-and-cross-project-packet" as const,
    javaCanonicalInputReady: inputs[0].complete,
    miniKvFinalInputReady: inputs[1].complete,
    requiredInputCount: REQUIRED_INPUT_COUNT as 5,
    presentInputCount,
    completeInputCount,
    missingRuntimeApprovalInputCount: REQUIRED_INPUT_COUNT - completeInputCount,
    runtimeGateStillClosed: true as const,
    nextNodeVersionSuggested: "Node v402" as const,
  };
  return {
    intakeDigest: sha256StableJson(record),
    ...record,
  };
}

function createChecks(
  sourceNodeV400: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntakeProfile["sourceNodeV400"],
  javaHandoff: JavaV165RuntimeExecutionApprovalInputContractHandoffReference,
  miniKvInput: MiniKvV156FinalApprovalGateInputReference,
  inputs: RuntimeExecutionApprovalCompletionInputReference[],
  intake: RuntimeExecutionApprovalInputCompletionIntakeRecord,
): RuntimeExecutionApprovalInputCompletionIntakeChecks {
  return {
    sourceNodeV400ContractReady:
      sourceNodeV400.readyForRuntimeExecutionApprovalInputIntakeContract
      && sourceNodeV400.checkCount === sourceNodeV400.passedCheckCount,
    javaV165EvidencePresent: javaHandoff.present,
    javaV165StatusPassed: javaHandoff.status === "passed",
    javaV165HandoffComplete: javaHandoff.complete,
    javaV165KeepsJavaV164Canonical:
      javaHandoff.sourceApprovalGateInputVersion === "Java v164"
      && javaHandoff.javaInputRemainsCanonical
      && !javaHandoff.javaInputChangedByThisVersion,
    javaV165DoesNotApproveRuntime:
      javaHandoff.executionAllowed === false
      && javaHandoff.readyForRuntimeExecutionPacket === false
      && javaHandoff.readyForRuntimeLiveReadGate === false,
    miniKvV156EvidencePresent: miniKvInput.present,
    miniKvV156ReleaseCurrent: miniKvInput.releaseVersion === "v156",
    miniKvV156FinalInputStatus: miniKvInput.status === "mini-kv-final-approval-gate-input-no-runtime-read-only",
    miniKvV156FinalInputComplete:
      miniKvInput.complete
      && miniKvInput.itemCount === 4
      && miniKvInput.serviceOwnerConfirmed
      && miniKvInput.processCleanupRulesComplete,
    miniKvV156DoesNotApproveRuntime:
      miniKvInput.executionAllowed === false
      && miniKvInput.readyForRuntimeExecutionPacket === false
      && miniKvInput.readyForRuntimeLiveReadGate === false,
    inputCountStable: inputs.length === REQUIRED_INPUT_COUNT,
    javaAndMiniKvInputsReady: inputs[0].complete && inputs[1].complete,
    nodeApprovedRuntimeWindowStillMissing: !inputs[2].present,
    correlatedOperatorApprovalStillMissing: !inputs[3].present,
    crossProjectRuntimePacketStillMissing: !inputs[4].present,
    runtimeGateStillClosed: intake.runtimeGateStillClosed,
    runtimePacketStillAbsent: true,
    executionStillDenied: true,
    noAutomaticUpstreamStartStop: true,
    noUpstreamMutation: true,
    noManagedAuditConnection: true,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    activeShardPrototypeStillDisabled: true,
    intakeDigestStable: isDigest(intake.intakeDigest),
    readyForRuntimeExecutionApprovalInputCompletionIntake: false,
  };
}

function createSummary(
  sourceNodeV400: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntakeProfile["sourceNodeV400"],
  inputs: RuntimeExecutionApprovalCompletionInputReference[],
  checks: RuntimeExecutionApprovalInputCompletionIntakeChecks,
  productionBlockers: RuntimeExecutionApprovalInputCompletionIntakeMessage[],
  warnings: RuntimeExecutionApprovalInputCompletionIntakeMessage[],
  recommendations: RuntimeExecutionApprovalInputCompletionIntakeMessage[],
): RuntimeExecutionApprovalInputCompletionIntakeSummary {
  const presentInputCount = inputs.filter((input) => input.present).length;
  const completeInputCount = inputs.filter((input) => input.complete).length;
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceCheckCount: sourceNodeV400.checkCount,
    sourcePassedCheckCount: sourceNodeV400.passedCheckCount,
    javaCanonicalInputReady: inputs[0].complete,
    miniKvFinalInputReady: inputs[1].complete,
    requiredInputCount: REQUIRED_INPUT_COUNT,
    presentInputCount,
    completeInputCount,
    missingRuntimeApprovalInputCount: REQUIRED_INPUT_COUNT - completeInputCount,
    presentRuntimeExecutionArtifactCount: 0,
    missingRuntimeExecutionArtifactCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: RuntimeExecutionApprovalInputCompletionIntakeChecks,
): RuntimeExecutionApprovalInputCompletionIntakeMessage[] {
  const blockers: RuntimeExecutionApprovalInputCompletionIntakeMessage[] = [];
  addMessage(blockers, checks.sourceNodeV400ContractReady, "SOURCE_NODE_V400_CONTRACT_NOT_READY", "node-v400", "Node v400 input contract must be ready before v401 intake.");
  addMessage(blockers, checks.javaV165HandoffComplete, "JAVA_V165_HANDOFF_INCOMPLETE", "java-v165", "Java v165 handoff must be complete.");
  addMessage(blockers, checks.miniKvV156FinalInputComplete, "MINI_KV_V156_FINAL_INPUT_INCOMPLETE", "mini-kv-v156", "mini-kv v156 final approval input must be complete.");
  return [
    ...blockers,
    {
      code: "NODE_APPROVED_RUNTIME_WINDOW_MISSING",
      severity: "blocker",
      source: "node-input",
      message: "Node-approved runtime window is still missing.",
    },
    {
      code: "CORRELATED_OPERATOR_APPROVAL_RECORD_MISSING",
      severity: "blocker",
      source: "operator-input",
      message: "Correlated operator approval record is still missing.",
    },
    {
      code: "CROSS_PROJECT_RUNTIME_EXECUTION_PACKET_MISSING",
      severity: "blocker",
      source: "cross-project-input",
      message: "Complete cross-project runtime execution packet is still missing.",
    },
  ];
}

function collectWarnings(): RuntimeExecutionApprovalInputCompletionIntakeMessage[] {
  return [
    {
      code: "INPUT_COMPLETION_IS_NOT_RUNTIME_APPROVAL",
      severity: "warning",
      source: "node-v401",
      message: "Java and mini-kv inputs are now aligned, but Node/operator/cross-project approval is still missing.",
    },
  ];
}

function collectRecommendations(): RuntimeExecutionApprovalInputCompletionIntakeMessage[] {
  return [
    {
      code: "PREPARE_NODE_WINDOW_AND_OPERATOR_APPROVAL",
      severity: "recommendation",
      source: "node-v401",
      message: "Use v401 to prepare the Node runtime window, correlated operator approval, and complete cross-project packet inputs.",
    },
  ];
}

function addMessage(
  messages: RuntimeExecutionApprovalInputCompletionIntakeMessage[],
  condition: boolean,
  code: string,
  source: string,
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function isDigest(value: string | null | undefined): boolean {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
