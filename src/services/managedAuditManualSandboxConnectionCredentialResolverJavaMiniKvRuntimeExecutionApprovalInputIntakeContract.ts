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
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewArchiveVerification.js";
import type {
  JavaV164RuntimeExecutionApprovalGateInputReference,
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContractProfile,
  MiniKvV155RuntimeExecutionApprovalGateInputPrecheckReference,
  NodeRuntimeExecutionApprovalGateInputReference,
  RuntimeExecutionApprovalInputHandoffRequirement,
  RuntimeExecutionApprovalInputIntakeContractChecks,
  RuntimeExecutionApprovalInputIntakeContractMessage,
  RuntimeExecutionApprovalInputIntakeContractRecord,
  RuntimeExecutionApprovalInputIntakeContractSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContractTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContractMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContractRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-intake-contract.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-intake-contract";
const SOURCE_NODE_V399_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-approval-gate-review-archive-verification";
const ACTIVE_PLAN =
  "docs/plans3/v400-post-java-mini-kv-runtime-execution-approval-input-intake-contract-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v401-post-java-mini-kv-runtime-execution-approval-input-completion-roadmap.md";
const JAVA_V164_APPROVAL_GATE_INPUT =
  "D:/javaproj/advanced-order-platform/e/164/evidence/java-shard-readiness-runtime-execution-approval-gate-input-v164.json";
const MINI_KV_V155_APPROVAL_GATE_INPUT_PRECHECK =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v155.json";
const REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT = 6;
const REQUIRED_NODE_APPROVAL_INPUT_COUNT = 3;

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContract(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContractProfile {
  const sourceNodeV399 = createSourceNodeV399(input.config, input.archiveRoot);
  const javaV164ApprovalGateInput = createJavaV164ApprovalGateInput();
  const miniKvV155ApprovalGateInputPrecheck = createMiniKvV155ApprovalGateInputPrecheck();
  const nodeApprovalGateInputs = createNodeApprovalGateInputs();
  const handoffRequirements = createHandoffRequirements(
    javaV164ApprovalGateInput,
    miniKvV155ApprovalGateInputPrecheck,
    nodeApprovalGateInputs,
  );
  const draftContract = createIntakeContract(
    javaV164ApprovalGateInput,
    miniKvV155ApprovalGateInputPrecheck,
    nodeApprovalGateInputs,
    handoffRequirements,
  );
  const checks = createChecks(
    sourceNodeV399,
    javaV164ApprovalGateInput,
    miniKvV155ApprovalGateInputPrecheck,
    nodeApprovalGateInputs,
    handoffRequirements,
    draftContract,
  );
  checks.readyForRuntimeExecutionApprovalInputIntakeContract = Object.entries(checks)
    .filter(([key]) => key !== "readyForRuntimeExecutionApprovalInputIntakeContract")
    .every(([, value]) => value);
  const intakeContract = createIntakeContract(
    javaV164ApprovalGateInput,
    miniKvV155ApprovalGateInputPrecheck,
    nodeApprovalGateInputs,
    handoffRequirements,
  );
  checks.intakeDigestStable = isDigest(intakeContract.intakeDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(
    sourceNodeV399,
    javaV164ApprovalGateInput,
    miniKvV155ApprovalGateInputPrecheck,
    nodeApprovalGateInputs,
    handoffRequirements,
    checks,
    productionBlockers,
    warnings,
    recommendations,
  );

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution approval input intake contract",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    intakeState: "runtime-execution-approval-input-intake-contract-blocked",
    intakeDecision: "block-runtime-execution-pending-complete-approval-inputs",
    readyForRuntimeExecutionApprovalInputIntakeContract: checks.readyForRuntimeExecutionApprovalInputIntakeContract,
    readyForRuntimeExecutionPacket: false,
    readyForRuntimeLiveReadGate: false,
    activeNodeVersion: "Node v400",
    sourceNodeVersion: "Node v399",
    javaSourceVersion: "Java v164",
    miniKvSourceVersion: "mini-kv v155",
    runtimeGateRequiresSeparateApproval: true,
    runtimeExecutionArtifactsComplete: false,
    presentRuntimeExecutionArtifactCount: 0,
    missingRuntimeExecutionArtifactCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    runtimeExecutionPacketPresent: false,
    runtimeExecutionPacketExecutable: false,
    runtimeGateApprovalPresent: false,
    concreteLoopbackPortsAssigned: false,
    executionAttempted: false,
    rerunsLiveRead: false,
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    sendsManagedAuditHttpTcp: false,
    credentialValueRequested: false,
    credentialValueRead: false,
    rawEndpointUrlRequested: false,
    rawEndpointUrlParsed: false,
    executionAllowed: false,
    activeShardPrototypeEnabled: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    sourceNodeV399,
    javaV164ApprovalGateInput,
    miniKvV155ApprovalGateInputPrecheck,
    nodeApprovalGateInputs,
    handoffRequirements,
    intakeContract,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      intakeContractJson: ROUTE_PATH,
      intakeContractMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV399Json: SOURCE_NODE_V399_ROUTE,
      sourceNodeV399Markdown: `${SOURCE_NODE_V399_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v401",
    },
    nextActions: [
      "Java v164 can be consumed as Java-side approval input evidence, not as cross-project approval.",
      "mini-kv must provide a final approval gate input; v155 is precheck-only and keeps 0/3 approval inputs.",
      "Operator or release coordination must provide the Node-approved runtime window and correlated approval record.",
      "A complete cross-project runtime execution packet must bind Java, mini-kv, Node window, ports, smoke commands, owner confirmations, and cleanup proof together before any runtime start.",
      "Do not start Java, start mini-kv, parse raw endpoint URLs, or enable active shard routing from this intake contract.",
    ],
  };
}

function createSourceNodeV399(
  config: AppConfig,
  archiveRoot: string | undefined,
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContractProfile["sourceNodeV399"] {
  const profile =
    loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewArchiveVerification({
      config,
      archiveRoot,
    });
  return {
    sourceVersion: "Node v399",
    archiveVerificationState: profile.archiveVerificationState,
    readyForNodeV400RuntimeExecutionPacketApprovalInputIntake:
      profile.readyForNodeV400RuntimeExecutionPacketApprovalInputIntake,
    readyForRuntimeExecutionPacket: profile.readyForRuntimeExecutionPacket,
    readyForRuntimeLiveReadGate: profile.readyForRuntimeLiveReadGate,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
  };
}

function createJavaV164ApprovalGateInput(): JavaV164RuntimeExecutionApprovalGateInputReference {
  const json = readJsonObject(JAVA_V164_APPROVAL_GATE_INPUT);
  const file = evidenceFile("java-v164-runtime-execution-approval-gate-input", JAVA_V164_APPROVAL_GATE_INPUT);
  const javaApprovalInputArtifacts = stringArrayField(json, "javaApprovalInputArtifacts");
  const javaPacketRowsForCorrelation = stringArrayField(json, "javaPacketRowsForCorrelation");
  const requiredSiblingInputs = stringArrayField(json, "requiredSiblingInputs");
  const nodeApprovalGateInputPaths = stringArrayField(json, "nodeApprovalGateInputPaths");
  return {
    sourceVersion: "Java v164",
    evidenceKind: "java-side-runtime-execution-approval-gate-input",
    file,
    present: file.exists,
    complete: booleanField(json, "javaApprovalGateInputComplete") === true,
    inputScope: stringField(json, "inputScope") ?? "missing",
    status: stringField(json, "status") ?? "missing",
    readOnly: booleanField(json, "readOnly") === true,
    executionAllowed: false,
    readyForRuntimeExecutionPacket: false,
    readyForRuntimeLiveReadGate: false,
    startsJavaService: false,
    startsMiniKvService: false,
    javaApprovalGateInputPresent: booleanField(json, "javaApprovalGateInputPresent") === true,
    javaApprovalGateInputComplete: booleanField(json, "javaApprovalGateInputComplete") === true,
    javaLoopbackPort: stringField(json, "javaLoopbackPort"),
    javaServiceOwner: stringField(json, "javaServiceOwner"),
    javaOperatorApprovalRecordId: stringField(json, "javaOperatorApprovalRecordId"),
    javaApprovalInputArtifactCount: javaApprovalInputArtifacts.length,
    javaPacketRowsForCorrelationCount: javaPacketRowsForCorrelation.length,
    requiredSiblingInputCount: requiredSiblingInputs.length,
    nodeApprovalGateInputPathCount: nodeApprovalGateInputPaths.length,
    requiredSiblingInputs,
  };
}

function createMiniKvV155ApprovalGateInputPrecheck(): MiniKvV155RuntimeExecutionApprovalGateInputPrecheckReference {
  const json = readJsonObject(MINI_KV_V155_APPROVAL_GATE_INPUT_PRECHECK);
  const precheck = objectField(json, "runtimeExecutionApprovalGateInputPrecheck");
  const candidate = objectField(json, "miniKvRuntimeExecutionArtifactCandidate");
  const candidateFreeze = objectField(json, "miniKvRuntimeExecutionArtifactCandidateFreeze");
  const file = evidenceFile("mini-kv-v155-runtime-execution-approval-gate-input-precheck",
    MINI_KV_V155_APPROVAL_GATE_INPUT_PRECHECK);
  const requiredApprovalGateInputs = stringArrayField(precheck, "requiredApprovalGateInputs");
  return {
    sourceVersion: "mini-kv v155",
    evidenceKind: "mini-kv-runtime-execution-approval-gate-input-precheck",
    file,
    present: file.exists,
    complete: false,
    inputScope: "mini-kv-precheck-only",
    status: stringField(json, "status") ?? "missing",
    readOnly: booleanField(json, "readOnly") === true,
    executionAllowed: false,
    readyForRuntimeExecutionPacket: false,
    readyForRuntimeLiveReadGate: false,
    startsJavaService: false,
    startsMiniKvService: false,
    releaseVersion: stringField(json, "releaseVersion") ?? "missing",
    precheckMode: stringField(precheck, "precheckMode") ?? "missing",
    approvalGateInputCount: numberField(precheck, "approvalGateInputCount") ?? -1,
    missingApprovalGateInputCount: numberField(precheck, "missingApprovalGateInputCount") ?? -1,
    approvalGateInputsComplete: booleanField(precheck, "approvalGateInputsComplete") === true,
    nodeApprovedRuntimeWindowPresent: booleanField(precheck, "nodeApprovedRuntimeWindowPresent") === true,
    correlatedOperatorApprovalRecordPresent: booleanField(precheck, "correlatedOperatorApprovalRecordPresent") === true,
    completeCrossProjectRuntimeExecutionPacketPresent:
      booleanField(precheck, "completeCrossProjectRuntimeExecutionPacketPresent") === true,
    miniKvLoopbackPortCandidate: numberField(candidate, "miniKvLoopbackPortCandidate"),
    frozenCandidateReleaseVersion: stringField(candidateFreeze, "frozenReleaseVersion"),
    requiredApprovalGateInputs,
  };
}

function createNodeApprovalGateInputs(): NodeRuntimeExecutionApprovalGateInputReference[] {
  return [
    nodeInput(
      "nodeApprovedRuntimeWindow",
      "Node-approved runtime window",
      "node",
      "e/398/input/node-approved-runtime-window-v398.json",
      "NODE_APPROVED_RUNTIME_WINDOW_MISSING",
      [
        "Node window id",
        "approved Java and mini-kv source versions",
        "approved loopback host and ports",
        "start/stop owner boundaries",
        "explicit runtime window expiry or stop condition",
      ],
    ),
    nodeInput(
      "correlatedOperatorApprovalRecord",
      "Correlated operator approval record",
      "operator",
      "e/398/input/correlated-operator-approval-record-v398.json",
      "CORRELATED_OPERATOR_APPROVAL_RECORD_MISSING",
      [
        "operator identity",
        "approval correlation id",
        "Java v164 evidence digest",
        "mini-kv final input digest",
        "Node runtime window digest",
      ],
    ),
    nodeInput(
      "crossProjectRuntimeExecutionPacket",
      "Complete cross-project runtime execution packet",
      "cross-project",
      "e/398/input/cross-project-runtime-execution-packet-v398.json",
      "CROSS_PROJECT_RUNTIME_EXECUTION_PACKET_MISSING",
      [
        "Java-side approval gate input",
        "mini-kv final approval gate input",
        "Node-approved runtime window",
        "correlated operator approval",
        "GET-only smoke commands",
        "cleanup proof and stop-only-owned-process rules",
      ],
    ),
  ];
}

function nodeInput(
  key: NodeRuntimeExecutionApprovalGateInputReference["key"],
  label: string,
  owner: NodeRuntimeExecutionApprovalGateInputReference["owner"],
  filePath: string,
  missingReasonCode: NodeRuntimeExecutionApprovalGateInputReference["missingReasonCode"],
  requiredContents: string[],
): NodeRuntimeExecutionApprovalGateInputReference {
  const file = evidenceFile(key, filePath);
  return {
    key,
    label,
    owner,
    required: true,
    file,
    present: file.exists,
    complete: false,
    missingReasonCode,
    requiredContents,
  };
}

function createHandoffRequirements(
  javaInput: JavaV164RuntimeExecutionApprovalGateInputReference,
  miniKvPrecheck: MiniKvV155RuntimeExecutionApprovalGateInputPrecheckReference,
  nodeInputs: NodeRuntimeExecutionApprovalGateInputReference[],
): RuntimeExecutionApprovalInputHandoffRequirement[] {
  return [
    {
      id: "java-side-approval-gate-input",
      owner: "java",
      currentStatus: javaInput.complete ? "present" : "missing",
      blocksRuntime: !javaInput.complete,
      expectedEvidence: "Java v164 approval input with operator record, port, owner, GET-only smoke, and cleanup rules.",
      currentEvidence: javaInput.complete
        ? "Java v164 input is present and complete as Java-side evidence."
        : "Java-side approval input is missing or incomplete.",
      nextAction: "Node can consume Java v164 as source evidence only.",
    },
    {
      id: "mini-kv-approval-gate-input",
      owner: "mini-kv",
      currentStatus: miniKvPrecheck.present ? "precheck-only" : "missing",
      blocksRuntime: true,
      expectedEvidence: "Final mini-kv approval gate input, not only precheck, with approved port, owner, smoke, and cleanup rules.",
      currentEvidence: miniKvPrecheck.present
        ? "mini-kv v155 is precheck-only and still records 0/3 approval inputs."
        : "mini-kv v155 precheck evidence is missing.",
      nextAction: "mini-kv should produce a final approval gate input after operator approval exists.",
    },
    {
      id: "node-approved-runtime-window",
      owner: "node",
      currentStatus: nodeInputs[0].present ? "present" : "missing",
      blocksRuntime: true,
      expectedEvidence: nodeInputs[0].file.path,
      currentEvidence: nodeInputs[0].present ? "Node runtime window file exists." : "Node runtime window file is missing.",
      nextAction: "Create only after Java and mini-kv final inputs can be bound to a concrete runtime window.",
    },
    {
      id: "correlated-operator-approval-record",
      owner: "operator",
      currentStatus: nodeInputs[1].present ? "present" : "missing",
      blocksRuntime: true,
      expectedEvidence: nodeInputs[1].file.path,
      currentEvidence: nodeInputs[1].present ? "Correlated approval file exists." : "Correlated approval file is missing.",
      nextAction: "Operator approval must bind Java, mini-kv, and the Node runtime window by digest.",
    },
    {
      id: "complete-cross-project-runtime-execution-packet",
      owner: "cross-project",
      currentStatus: nodeInputs[2].present ? "present" : "missing",
      blocksRuntime: true,
      expectedEvidence: nodeInputs[2].file.path,
      currentEvidence: nodeInputs[2].present
        ? "Cross-project runtime execution packet file exists."
        : "Cross-project runtime execution packet file is missing.",
      nextAction: "Assemble only after Java input, mini-kv final input, Node window, and correlated approval all exist.",
    },
  ];
}

function createIntakeContract(
  javaInput: JavaV164RuntimeExecutionApprovalGateInputReference,
  miniKvPrecheck: MiniKvV155RuntimeExecutionApprovalGateInputPrecheckReference,
  nodeInputs: NodeRuntimeExecutionApprovalGateInputReference[],
  handoffRequirements: RuntimeExecutionApprovalInputHandoffRequirement[],
): RuntimeExecutionApprovalInputIntakeContractRecord {
  const presentNodeApprovalInputCount = nodeInputs.filter((input) => input.present).length;
  const satisfiedHandoffRequirementCount = handoffRequirements.filter((requirement) =>
    requirement.currentStatus === "present" && !requirement.blocksRuntime).length;
  const record = {
    intakeMode: "runtime-execution-approval-input-intake-contract" as const,
    sourceSpan: "Node v399 archive verification + Java v164 approval input + mini-kv v155 precheck" as const,
    intakeDecision: "block-runtime-execution-pending-complete-approval-inputs" as const,
    javaInputAcceptedAsSourceEvidence: javaInput.complete,
    miniKvInputAcceptedAsSourceEvidence: miniKvPrecheck.present,
    miniKvPrecheckOnly: true,
    requiredNodeApprovalInputCount: REQUIRED_NODE_APPROVAL_INPUT_COUNT as 3,
    presentNodeApprovalInputCount,
    missingNodeApprovalInputCount: REQUIRED_NODE_APPROVAL_INPUT_COUNT - presentNodeApprovalInputCount,
    handoffRequirementCount: handoffRequirements.length,
    satisfiedHandoffRequirementCount,
    blockedHandoffRequirementCount: handoffRequirements.filter((requirement) => requirement.blocksRuntime).length,
    runtimeGateStillClosed: true as const,
    nextNodeVersionSuggested: "Node v401" as const,
  };
  return {
    intakeDigest: sha256StableJson(record),
    ...record,
  };
}

function createChecks(
  sourceNodeV399: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContractProfile["sourceNodeV399"],
  javaInput: JavaV164RuntimeExecutionApprovalGateInputReference,
  miniKvPrecheck: MiniKvV155RuntimeExecutionApprovalGateInputPrecheckReference,
  nodeInputs: NodeRuntimeExecutionApprovalGateInputReference[],
  handoffRequirements: RuntimeExecutionApprovalInputHandoffRequirement[],
  intakeContract: RuntimeExecutionApprovalInputIntakeContractRecord,
): RuntimeExecutionApprovalInputIntakeContractChecks {
  return {
    sourceNodeV399ArchiveVerified:
      sourceNodeV399.archiveVerificationState === "runtime-execution-packet-approval-gate-review-archive-verified"
      && sourceNodeV399.readyForNodeV400RuntimeExecutionPacketApprovalInputIntake
      && sourceNodeV399.checkCount === sourceNodeV399.passedCheckCount,
    javaV164EvidencePresent: javaInput.present,
    javaV164StatusPassed: javaInput.status === "passed",
    javaV164ApprovalInputPresent: javaInput.javaApprovalGateInputPresent,
    javaV164ApprovalInputComplete: javaInput.javaApprovalGateInputComplete,
    javaV164DoesNotApproveRuntime:
      javaInput.executionAllowed === false
      && javaInput.readyForRuntimeExecutionPacket === false
      && javaInput.readyForRuntimeLiveReadGate === false,
    javaV164RequiresSiblingInputs:
      javaInput.requiredSiblingInputs.includes("mini-kv-approval-gate-input")
      && javaInput.requiredSiblingInputs.includes("node-approved-runtime-window")
      && javaInput.requiredSiblingInputs.includes("correlated-operator-approval-record")
      && javaInput.requiredSiblingInputs.includes("complete-cross-project-runtime-execution-packet"),
    miniKvV155EvidencePresent: miniKvPrecheck.present,
    miniKvV155ReleaseCurrent: miniKvPrecheck.releaseVersion === "v155",
    miniKvV155PrecheckStatus:
      miniKvPrecheck.status === "runtime-execution-approval-gate-input-precheck-blocked-read-only",
    miniKvV155PrecheckOnly:
      miniKvPrecheck.precheckMode === "blocked-missing-approval-gate-inputs"
      && miniKvPrecheck.complete === false,
    miniKvV155ApprovalInputsStillMissing:
      miniKvPrecheck.approvalGateInputCount === 0
      && miniKvPrecheck.missingApprovalGateInputCount === REQUIRED_NODE_APPROVAL_INPUT_COUNT
      && miniKvPrecheck.approvalGateInputsComplete === false,
    nodeApprovalInputCountStable: nodeInputs.length === REQUIRED_NODE_APPROVAL_INPUT_COUNT,
    nodeApprovalInputsAbsentAndRecorded: nodeInputs.every((input) => !input.present && !input.complete),
    nodeApprovedRuntimeWindowMissing: !nodeInputs[0].present,
    correlatedOperatorApprovalRecordMissing: !nodeInputs[1].present,
    crossProjectRuntimePacketMissing: !nodeInputs[2].present,
    handoffRequirementsExplicit: handoffRequirements.length === 5,
    handoffRequiresMiniKvFinalInput: handoffRequirements.some((requirement) =>
      requirement.id === "mini-kv-approval-gate-input" && requirement.currentStatus === "precheck-only"),
    handoffRequiresCrossProjectPacket: handoffRequirements.some((requirement) =>
      requirement.id === "complete-cross-project-runtime-execution-packet" && requirement.currentStatus === "missing"),
    runtimeGateStillClosed: intakeContract.runtimeGateStillClosed,
    runtimePacketStillAbsent: true,
    executionStillDenied: true,
    noAutomaticUpstreamStartStop: true,
    noUpstreamMutation: true,
    noManagedAuditConnection: true,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    activeShardPrototypeStillDisabled: true,
    intakeDigestStable: isDigest(intakeContract.intakeDigest),
    readyForRuntimeExecutionApprovalInputIntakeContract: false,
  };
}

function createSummary(
  sourceNodeV399: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContractProfile["sourceNodeV399"],
  javaInput: JavaV164RuntimeExecutionApprovalGateInputReference,
  miniKvPrecheck: MiniKvV155RuntimeExecutionApprovalGateInputPrecheckReference,
  nodeInputs: NodeRuntimeExecutionApprovalGateInputReference[],
  handoffRequirements: RuntimeExecutionApprovalInputHandoffRequirement[],
  checks: RuntimeExecutionApprovalInputIntakeContractChecks,
  productionBlockers: RuntimeExecutionApprovalInputIntakeContractMessage[],
  warnings: RuntimeExecutionApprovalInputIntakeContractMessage[],
  recommendations: RuntimeExecutionApprovalInputIntakeContractMessage[],
): RuntimeExecutionApprovalInputIntakeContractSummary {
  const presentNodeApprovalInputCount = nodeInputs.filter((input) => input.present).length;
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceCheckCount: sourceNodeV399.checkCount,
    sourcePassedCheckCount: sourceNodeV399.passedCheckCount,
    javaInputPresent: javaInput.present,
    javaInputComplete: javaInput.complete,
    miniKvPrecheckPresent: miniKvPrecheck.present,
    miniKvFinalApprovalInputPresent: false,
    requiredNodeApprovalInputCount: REQUIRED_NODE_APPROVAL_INPUT_COUNT,
    presentNodeApprovalInputCount,
    missingNodeApprovalInputCount: REQUIRED_NODE_APPROVAL_INPUT_COUNT - presentNodeApprovalInputCount,
    handoffRequirementCount: handoffRequirements.length,
    satisfiedHandoffRequirementCount: handoffRequirements.filter((requirement) =>
      requirement.currentStatus === "present" && !requirement.blocksRuntime).length,
    blockedHandoffRequirementCount: handoffRequirements.filter((requirement) => requirement.blocksRuntime).length,
    presentRuntimeExecutionArtifactCount: 0,
    missingRuntimeExecutionArtifactCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: RuntimeExecutionApprovalInputIntakeContractChecks,
): RuntimeExecutionApprovalInputIntakeContractMessage[] {
  const blockers: RuntimeExecutionApprovalInputIntakeContractMessage[] = [];
  addMessage(blockers, checks.sourceNodeV399ArchiveVerified, "SOURCE_NODE_V399_ARCHIVE_NOT_READY", "node-v399", "Node v399 archive verification must be ready before v400 intake.");
  addMessage(blockers, checks.javaV164EvidencePresent, "JAVA_V164_INPUT_MISSING", "java-v164", "Java v164 approval gate input evidence must be present.");
  addMessage(blockers, checks.javaV164ApprovalInputComplete, "JAVA_V164_INPUT_INCOMPLETE", "java-v164", "Java v164 approval gate input must be complete as Java-side evidence.");
  addMessage(blockers, checks.miniKvV155EvidencePresent, "MINI_KV_V155_PRECHECK_MISSING", "mini-kv-v155", "mini-kv v155 precheck evidence must be present.");
  addMessage(blockers, checks.miniKvV155PrecheckOnly, "MINI_KV_V155_NOT_PRECHECK_ONLY", "mini-kv-v155", "mini-kv v155 must remain precheck-only until final approval input exists.");
  addMessage(blockers, checks.runtimeGateStillClosed, "RUNTIME_GATE_OPENED", "runtime-boundary", "Runtime gate must remain closed.");
  return [
    ...blockers,
    {
      code: "MINI_KV_FINAL_APPROVAL_GATE_INPUT_MISSING",
      severity: "blocker",
      source: "mini-kv-input",
      message: "mini-kv v155 is precheck-only; a final mini-kv approval gate input is still required.",
    },
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

function collectWarnings(): RuntimeExecutionApprovalInputIntakeContractMessage[] {
  return [
    {
      code: "JAVA_INPUT_IS_NOT_CROSS_PROJECT_APPROVAL",
      severity: "warning",
      source: "java-v164",
      message: "Java v164 is useful source evidence but does not approve runtime execution by itself.",
    },
    {
      code: "MINI_KV_PRECHECK_IS_NOT_FINAL_INPUT",
      severity: "warning",
      source: "mini-kv-v155",
      message: "mini-kv v155 records the missing input state; it is not the final mini-kv approval gate input.",
    },
  ];
}

function collectRecommendations(): RuntimeExecutionApprovalInputIntakeContractMessage[] {
  return [
    {
      code: "WRITE_FINAL_INPUT_CHECKLIST_BEFORE_V401",
      severity: "recommendation",
      source: "node-v400",
      message: "Use this contract as the exact checklist for Java, mini-kv, operator approval, and cross-project packet completion.",
    },
  ];
}

function addMessage(
  messages: RuntimeExecutionApprovalInputIntakeContractMessage[],
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
