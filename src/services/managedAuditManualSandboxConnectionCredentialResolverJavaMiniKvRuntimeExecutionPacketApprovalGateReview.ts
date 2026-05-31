import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewProfile,
  RuntimeExecutionPacketApprovalGateFileReference,
  RuntimeExecutionPacketApprovalGateInput,
  RuntimeExecutionPacketApprovalGateReviewChecks,
  RuntimeExecutionPacketApprovalGateReviewMessage,
  RuntimeExecutionPacketApprovalGateReviewRecord,
  RuntimeExecutionPacketApprovalGateReviewSummary,
  SourceNodeV397RuntimeExecutionPacketContributionReviewReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-approval-gate-review.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-approval-gate-review";
const SOURCE_NODE_V397_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-contribution-review";
const ACTIVE_PLAN =
  "docs/plans3/v397-post-java-mini-kv-runtime-execution-packet-contribution-review-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v398-post-java-mini-kv-runtime-execution-packet-approval-gate-review-roadmap.md";
const SOURCE_NODE_V397_ARCHIVE_JSON = path.join(
  "e",
  "397",
  "evidence",
  "java-mini-kv-runtime-execution-packet-contribution-review-v397-http.json",
);
const REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT = 6;
const REQUIRED_APPROVAL_INPUT_COUNT = 3;

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReview(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const sourceNodeV397 = createSourceNodeV397(projectRoot);
  const approvalGateInputs = createApprovalGateInputs(projectRoot);
  const draftReview = createApprovalGateReview(sourceNodeV397, approvalGateInputs, false);
  const checks = createChecks(sourceNodeV397, approvalGateInputs, draftReview);
  checks.readyForJavaMiniKvRuntimeExecutionPacketApprovalGateReview = Object.entries(checks)
    .filter(([key]) => key !== "readyForJavaMiniKvRuntimeExecutionPacketApprovalGateReview")
    .every(([, value]) => value);
  const ready = checks.readyForJavaMiniKvRuntimeExecutionPacketApprovalGateReview;
  const approvalGateReview = createApprovalGateReview(sourceNodeV397, approvalGateInputs, ready);
  checks.approvalGateDigestStable = isDigest(approvalGateReview.approvalGateDigest);
  const productionBlockers = collectProductionBlockers(checks, approvalGateReview);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(
    sourceNodeV397,
    approvalGateReview,
    checks,
    productionBlockers,
    warnings,
    recommendations,
  );

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution packet approval gate review",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    approvalGateReviewState: ready
      ? "runtime-execution-packet-approval-gate-reviewed-blocked"
      : "blocked",
    approvalGateDecision: ready
      ? "block-runtime-execution-packet-approval-missing-node-window-correlated-approval-and-cross-project-packet"
      : "blocked",
    readyForJavaMiniKvRuntimeExecutionPacketApprovalGateReview: ready,
    readyForNodeV399RuntimeExecutionPacketApprovalGateArchiveVerification: ready,
    readyForRuntimeExecutionPacket: false,
    readyForRuntimeLiveReadGate: false,
    activeNodeVersion: "Node v398",
    sourceNodeVersion: "Node v397",
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
    sourceNodeV397,
    approvalGateInputs,
    approvalGateReview,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      approvalGateReviewJson: ROUTE_PATH,
      approvalGateReviewMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV397Json: SOURCE_NODE_V397_ROUTE,
      sourceNodeV397Markdown: `${SOURCE_NODE_V397_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v399",
    },
    nextActions: ready
      ? [
        "Keep runtime execution blocked until e/398 input supplies a Node-approved runtime window.",
        "Require one correlated operator approval record that binds Java v163, mini-kv v154, and the Node runtime window.",
        "Require a complete cross-project runtime execution packet before any Java or mini-kv process can be started.",
        "Archive v398 as an approval-gate blocked record before any later execution-packet attempt.",
      ]
      : [
        "Repair the missing v397 archive or approval gate input scan before publishing the gate review.",
        "Do not start Java or mini-kv from this approval gate review.",
      ],
  };
}

function createSourceNodeV397(
  projectRoot: string,
): SourceNodeV397RuntimeExecutionPacketContributionReviewReference {
  const profile = readArchiveJson(projectRoot, SOURCE_NODE_V397_ARCHIVE_JSON);
  const summary = objectValue(valueAt(profile, "summary"));
  return {
    sourceVersion: "Node v397",
    profileVersion: stringOrNull(valueAt(profile, "profileVersion")) ?? "missing",
    contributionReviewState: stringOrNull(valueAt(profile, "contributionReviewState")) ?? "missing",
    contributionReviewDecision: stringOrNull(valueAt(profile, "contributionReviewDecision")) ?? "missing",
    readyForJavaMiniKvRuntimeExecutionPacketContributionReview:
      valueAt(profile, "readyForJavaMiniKvRuntimeExecutionPacketContributionReview") === true,
    readyForNodeV398RuntimeExecutionPacketApprovalGateReview:
      valueAt(profile, "readyForNodeV398RuntimeExecutionPacketApprovalGateReview") === true,
    readyForRuntimeExecutionPacket: false,
    readyForRuntimeLiveReadGate: false,
    runtimeExecutionArtifactsComplete: false,
    presentRuntimeExecutionArtifactCount: 0,
    missingRuntimeExecutionArtifactCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    runtimeExecutionPacketPresent: false,
    runtimeExecutionPacketExecutable: false,
    runtimeGateApprovalPresent: false,
    executionAttempted: false,
    checkCount: numberValue(valueAt(summary, "checkCount")),
    passedCheckCount: numberValue(valueAt(summary, "passedCheckCount")),
    sourceCheckCount: numberValue(valueAt(summary, "sourceCheckCount")),
    sourcePassedCheckCount: numberValue(valueAt(summary, "sourcePassedCheckCount")),
    javaEvidenceReady: valueAt(summary, "javaEvidenceReady") === true,
    miniKvEvidenceReady: valueAt(summary, "miniKvEvidenceReady") === true,
    reviewRowCount: numberValue(valueAt(summary, "reviewRowCount")),
    crossProjectAcceptedRequirementCount: 0,
    crossProjectMissingRequirementCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    productionBlockerCount: numberValue(valueAt(summary, "productionBlockerCount")),
    reviewDigest: stringOrNull(valueAt(profile, "contributionReview", "reviewDigest")),
    executionAllowed: false,
    activeShardPrototypeEnabled: false,
  };
}

function createApprovalGateInputs(projectRoot: string): RuntimeExecutionPacketApprovalGateInput[] {
  return [
    approvalGateInput(
      "nodeApprovedRuntimeWindow",
      "Node-approved runtime window",
      fileReference(
        projectRoot,
        "node-approved-runtime-window-v398",
        "e",
        "398",
        "input",
        "node-approved-runtime-window-v398.json",
      ),
      "NODE_APPROVED_RUNTIME_WINDOW_MISSING",
    ),
    approvalGateInput(
      "correlatedOperatorApprovalRecord",
      "Correlated operator approval record",
      fileReference(
        projectRoot,
        "correlated-operator-approval-record-v398",
        "e",
        "398",
        "input",
        "correlated-operator-approval-record-v398.json",
      ),
      "CORRELATED_OPERATOR_APPROVAL_RECORD_MISSING",
    ),
    approvalGateInput(
      "crossProjectRuntimeExecutionPacket",
      "Complete cross-project runtime execution packet",
      fileReference(
        projectRoot,
        "cross-project-runtime-execution-packet-v398",
        "e",
        "398",
        "input",
        "cross-project-runtime-execution-packet-v398.json",
      ),
      "CROSS_PROJECT_RUNTIME_EXECUTION_PACKET_MISSING",
    ),
  ];
}

function approvalGateInput(
  key: RuntimeExecutionPacketApprovalGateInput["key"],
  label: string,
  file: RuntimeExecutionPacketApprovalGateFileReference,
  missingReasonCode: RuntimeExecutionPacketApprovalGateInput["missingReasonCode"],
): RuntimeExecutionPacketApprovalGateInput {
  return {
    key,
    label,
    required: true,
    file: {
      id: file.id,
      path: file.path,
      resolvedPath: file.path,
      exists: false,
      sizeBytes: 0,
      digest: null,
    },
    present: false,
    gateSatisfied: false,
    missingReasonCode,
  };
}

function createApprovalGateReview(
  source: SourceNodeV397RuntimeExecutionPacketContributionReviewReference,
  inputs: readonly RuntimeExecutionPacketApprovalGateInput[],
  ready: boolean,
): RuntimeExecutionPacketApprovalGateReviewRecord {
  const presentApprovalInputCount = inputs.filter((input) => input.present).length;
  const record = {
    reviewMode: "java-mini-kv-runtime-execution-packet-approval-gate-review" as const,
    sourceSpan: "Node v397 contribution review + Node v398 approval gate inputs" as const,
    approvalGateDecision: ready
      ? "block-runtime-execution-packet-approval-missing-node-window-correlated-approval-and-cross-project-packet" as const
      : "blocked" as const,
    requiredApprovalInputCount: REQUIRED_APPROVAL_INPUT_COUNT as 3,
    presentApprovalInputCount,
    missingApprovalInputCount: REQUIRED_APPROVAL_INPUT_COUNT - presentApprovalInputCount,
    nodeApprovedRuntimeWindowPresent: false as const,
    correlatedOperatorApprovalPresent: false as const,
    crossProjectRuntimeExecutionPacketPresent: false as const,
    crossProjectRuntimeExecutionPacketExecutable: false as const,
    cleanupProofAfterRuntimeStartPresent: false as const,
    crossProjectAcceptedRequirementCount: 0 as const,
    crossProjectMissingRequirementCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT as 6,
    readyForRuntimeExecutionPacket: false as const,
    readyForRuntimeLiveReadGate: false as const,
    executionAttempted: false as const,
    startsUpstreamServices: false as const,
    stopsUpstreamServices: false as const,
    writesUpstreamState: false as const,
    opensManagedAuditConnection: false as const,
    activeShardPrototypeEnabled: false as const,
    nextNodeVersionSuggested: "Node v399" as const,
    sourceNodeV397ReadyForV398: source.readyForNodeV398RuntimeExecutionPacketApprovalGateReview,
    sourceNodeV397ReviewDigest: source.reviewDigest,
  };
  return {
    approvalGateDigest: sha256StableJson(record),
    ...record,
  };
}

function createChecks(
  source: SourceNodeV397RuntimeExecutionPacketContributionReviewReference,
  inputs: readonly RuntimeExecutionPacketApprovalGateInput[],
  review: RuntimeExecutionPacketApprovalGateReviewRecord,
): RuntimeExecutionPacketApprovalGateReviewChecks {
  return {
    sourceNodeV397Ready:
      source.contributionReviewState === "java-v163-and-mini-kv-v154-contributions-reviewed",
    sourceNodeV397ReadyForV398: source.readyForNodeV398RuntimeExecutionPacketApprovalGateReview,
    sourceNodeV397RuntimeClosed:
      !source.readyForRuntimeExecutionPacket
      && !source.readyForRuntimeLiveReadGate
      && !source.runtimeExecutionArtifactsComplete
      && source.presentRuntimeExecutionArtifactCount === 0
      && source.missingRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT
      && !source.runtimeExecutionPacketPresent
      && !source.runtimeExecutionPacketExecutable
      && !source.runtimeGateApprovalPresent
      && !source.executionAttempted
      && !source.executionAllowed
      && !source.activeShardPrototypeEnabled,
    sourceNodeV397ChecksPassed:
      source.checkCount > 0
      && source.checkCount === source.passedCheckCount
      && source.javaEvidenceReady
      && source.miniKvEvidenceReady
      && source.productionBlockerCount === 0,
    sourceAcceptedCountsPreserved:
      source.reviewRowCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT
      && source.crossProjectAcceptedRequirementCount === 0
      && source.crossProjectMissingRequirementCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    sourceReviewDigestStable: isDigest(source.reviewDigest),
    approvalInputCountStable: inputs.length === REQUIRED_APPROVAL_INPUT_COUNT,
    approvalInputsAbsentAndRecorded:
      inputs.length === REQUIRED_APPROVAL_INPUT_COUNT
      && inputs.every((input) => !input.present && !input.gateSatisfied)
      && review.presentApprovalInputCount === 0
      && review.missingApprovalInputCount === REQUIRED_APPROVAL_INPUT_COUNT,
    nodeApprovedRuntimeWindowAbsent: !review.nodeApprovedRuntimeWindowPresent,
    correlatedOperatorApprovalAbsent: !review.correlatedOperatorApprovalPresent,
    crossProjectRuntimePacketAbsent:
      !review.crossProjectRuntimeExecutionPacketPresent
      && !review.crossProjectRuntimeExecutionPacketExecutable,
    cleanupProofAfterRuntimeStartAbsent: !review.cleanupProofAfterRuntimeStartPresent,
    runtimeArtifactAcceptanceStillZero:
      review.crossProjectAcceptedRequirementCount === 0
      && review.crossProjectMissingRequirementCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    runtimePacketStillAbsent:
      !review.crossProjectRuntimeExecutionPacketPresent
      && !review.crossProjectRuntimeExecutionPacketExecutable,
    runtimeGateStillClosed:
      !review.readyForRuntimeExecutionPacket
      && !review.readyForRuntimeLiveReadGate
      && !review.executionAttempted,
    executionStillDenied:
      !review.startsUpstreamServices
      && !review.stopsUpstreamServices
      && !review.writesUpstreamState,
    noAutomaticUpstreamStartStop: !review.startsUpstreamServices && !review.stopsUpstreamServices,
    noUpstreamMutation: !review.writesUpstreamState,
    noManagedAuditConnection: !review.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    activeShardPrototypeStillDisabled: !review.activeShardPrototypeEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    approvalGateDigestStable: isDigest(review.approvalGateDigest),
    readyForJavaMiniKvRuntimeExecutionPacketApprovalGateReview: false,
  };
}

function createSummary(
  source: SourceNodeV397RuntimeExecutionPacketContributionReviewReference,
  review: RuntimeExecutionPacketApprovalGateReviewRecord,
  checks: RuntimeExecutionPacketApprovalGateReviewChecks,
  productionBlockers: readonly RuntimeExecutionPacketApprovalGateReviewMessage[],
  warnings: readonly RuntimeExecutionPacketApprovalGateReviewMessage[],
  recommendations: readonly RuntimeExecutionPacketApprovalGateReviewMessage[],
): RuntimeExecutionPacketApprovalGateReviewSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceCheckCount: source.checkCount,
    sourcePassedCheckCount: source.passedCheckCount,
    javaEvidenceReady: source.javaEvidenceReady,
    miniKvEvidenceReady: source.miniKvEvidenceReady,
    requiredApprovalInputCount: REQUIRED_APPROVAL_INPUT_COUNT,
    presentApprovalInputCount: review.presentApprovalInputCount,
    missingApprovalInputCount: review.missingApprovalInputCount,
    crossProjectAcceptedRequirementCount: 0,
    crossProjectMissingRequirementCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    presentRuntimeExecutionArtifactCount: 0,
    missingRuntimeExecutionArtifactCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: RuntimeExecutionPacketApprovalGateReviewChecks,
  review: RuntimeExecutionPacketApprovalGateReviewRecord,
): RuntimeExecutionPacketApprovalGateReviewMessage[] {
  const failedCheckRules: Array<[boolean, string, string, string]> = [
    [checks.sourceNodeV397Ready, "SOURCE_V397_NOT_READY", "source-node-v397", "Node v397 contribution review must be ready."],
    [checks.sourceNodeV397ReadyForV398, "SOURCE_V397_NOT_READY_FOR_V398", "source-node-v397", "Node v397 must point to v398 approval gate review."],
    [checks.sourceNodeV397RuntimeClosed, "SOURCE_V397_RUNTIME_OPENED", "runtime-boundary", "Node v397 must keep runtime closed."],
    [checks.sourceNodeV397ChecksPassed, "SOURCE_V397_CHECKS_NOT_PASSED", "source-node-v397", "Node v397 checks must all pass."],
    [checks.sourceAcceptedCountsPreserved, "SOURCE_V397_COUNTS_CHANGED", "source-node-v397", "Node v397 accepted/missing counts must remain 0/6."],
    [checks.approvalInputCountStable, "APPROVAL_INPUT_COUNT_CHANGED", "approval-gate-input", "Exactly three approval gate inputs must be scanned."],
    [checks.approvalInputsAbsentAndRecorded, "APPROVAL_INPUTS_UNEXPECTEDLY_PRESENT", "approval-gate-input", "v398 expects the approval gate input folder to be absent or empty."],
    [checks.runtimePacketStillAbsent, "RUNTIME_PACKET_PRESENT", "runtime-boundary", "v398 must not create or accept a runtime execution packet."],
    [checks.runtimeGateStillClosed, "RUNTIME_GATE_OPENED", "runtime-boundary", "v398 must keep runtime gates closed."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v398 must not start or stop sibling services."],
  ];
  const failedCheckBlockers = failedCheckRules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
  return [
    ...failedCheckBlockers,
    ...approvalGateBlockers(review),
  ];
}

function approvalGateBlockers(
  review: RuntimeExecutionPacketApprovalGateReviewRecord,
): RuntimeExecutionPacketApprovalGateReviewMessage[] {
  const blockers: RuntimeExecutionPacketApprovalGateReviewMessage[] = [];
  if (!review.nodeApprovedRuntimeWindowPresent) {
    blockers.push({
      code: "NODE_APPROVED_RUNTIME_WINDOW_MISSING",
      severity: "blocker",
      source: "approval-gate",
      message: "No Node-approved runtime window is present, so runtime execution cannot be approved.",
    });
  }
  if (!review.correlatedOperatorApprovalPresent) {
    blockers.push({
      code: "CORRELATED_OPERATOR_APPROVAL_RECORD_MISSING",
      severity: "blocker",
      source: "approval-gate",
      message: "No correlated operator approval binds Java, mini-kv, and the Node runtime window.",
    });
  }
  if (!review.crossProjectRuntimeExecutionPacketPresent) {
    blockers.push({
      code: "CROSS_PROJECT_RUNTIME_EXECUTION_PACKET_MISSING",
      severity: "blocker",
      source: "approval-gate",
      message: "No complete cross-project runtime execution packet is present.",
    });
  }
  return blockers;
}

function collectWarnings(): RuntimeExecutionPacketApprovalGateReviewMessage[] {
  return [
    {
      code: "CONTRIBUTION_REVIEW_IS_NOT_APPROVAL",
      severity: "warning",
      source: "node-v398",
      message: "Node v397 confirmed useful contributions, but contribution evidence still cannot approve runtime execution.",
    },
    {
      code: "APPROVAL_GATE_REVIEW_DOES_NOT_START_SERVICES",
      severity: "warning",
      source: "node-v398",
      message: "Approval gate review is a document gate only; Java and mini-kv services remain untouched.",
    },
  ];
}

function collectRecommendations(ready: boolean): RuntimeExecutionPacketApprovalGateReviewMessage[] {
  return [
    {
      code: ready ? "ARCHIVE_APPROVAL_GATE_BLOCKED_RECORD" : "REPAIR_APPROVAL_GATE_REVIEW_INPUTS",
      severity: "recommendation",
      source: "node-v398",
      message: ready
        ? "Archive this blocked approval gate before any future version consumes a real runtime execution packet."
        : "Repair the missing v397 archive or input scan before continuing.",
    },
  ];
}

function fileReference(
  projectRoot: string,
  id: string,
  ...segments: string[]
): RuntimeExecutionPacketApprovalGateFileReference {
  const relativePath = path.join(...segments);
  const resolvedPath = path.join(projectRoot, relativePath);
  if (!existsSync(resolvedPath)) {
    return {
      id,
      path: relativePath.replace(/\\/g, "/"),
      resolvedPath: resolvedPath.replace(/\\/g, "/"),
      exists: false,
      sizeBytes: 0,
      digest: null,
    };
  }
  const content = readFileSync(resolvedPath);
  return {
    id,
    path: relativePath.replace(/\\/g, "/"),
    resolvedPath: resolvedPath.replace(/\\/g, "/"),
    exists: true,
    sizeBytes: statSync(resolvedPath).size,
    digest: createHash("sha256").update(content).digest("hex"),
  };
}

function readArchiveJson(projectRoot: string, relativePath: string): Record<string, unknown> {
  const absolutePath = path.join(projectRoot, relativePath);
  if (!existsSync(absolutePath)) {
    return {};
  }
  try {
    const parsed = JSON.parse(readFileSync(absolutePath, "utf8").replace(/^\uFEFF/, ""));
    return objectValue(parsed);
  } catch {
    return {};
  }
}

function valueAt(source: unknown, ...keys: string[]): unknown {
  let value = source;
  for (const key of keys) {
    if (value === null || typeof value !== "object") {
      return undefined;
    }
    value = (value as Record<string, unknown>)[key];
  }
  return value;
}

function objectValue(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function stringOrNull(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function isDigest(value: string | null): boolean {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
