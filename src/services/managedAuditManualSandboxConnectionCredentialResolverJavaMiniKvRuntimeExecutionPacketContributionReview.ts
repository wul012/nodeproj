import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { evidenceFile, readJsonObject } from "./historicalEvidenceReportUtils.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  JavaV163RuntimeExecutionPacketContribution,
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketContributionReviewProfile,
  MiniKvV154RuntimeExecutionCandidate,
  RuntimeExecutionPacketContributionFileReference,
  RuntimeExecutionPacketContributionReviewChecks,
  RuntimeExecutionPacketContributionReviewMessage,
  RuntimeExecutionPacketContributionReviewRecord,
  RuntimeExecutionPacketContributionReviewSummary,
  RuntimeExecutionPacketReviewRow,
  SourceNodeV396RuntimeArtifactProgressReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketContributionReviewTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketContributionReviewMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketContributionReviewRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-contribution-review.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-contribution-review";
const SOURCE_NODE_V396_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-artifact-upstream-progress-intake";
const ACTIVE_PLAN =
  "docs/plans3/v396-post-java-mini-kv-runtime-execution-artifact-upstream-progress-intake-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v397-post-java-mini-kv-runtime-execution-packet-contribution-review-roadmap.md";
const JAVA_V163_RUNTIME_EXECUTION_PACKET_CONTRIBUTION =
  "D:/javaproj/advanced-order-platform/e/163/evidence/java-shard-readiness-runtime-execution-packet-contribution-v163.json";
const MINI_KV_V154_RUNTIME_EXECUTION_CANDIDATE =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v154.json";
const SOURCE_NODE_V396_ARCHIVE_JSON = path.join(
  "e",
  "396",
  "evidence",
  "java-mini-kv-runtime-execution-artifact-upstream-progress-intake-v396-http.json",
);
const REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT = 6;

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketContributionReview(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketContributionReviewProfile {
  const sourceNodeV396 = createSourceNodeV396(input.archiveRoot);
  const javaV163RuntimeExecutionPacketContribution = createJavaV163RuntimeExecutionPacketContribution();
  const miniKvV154RuntimeExecutionCandidate = createMiniKvV154RuntimeExecutionCandidate();
  const reviewRows = createReviewRows(javaV163RuntimeExecutionPacketContribution, miniKvV154RuntimeExecutionCandidate);
  const draftReview = createContributionReview(
    sourceNodeV396,
    javaV163RuntimeExecutionPacketContribution,
    miniKvV154RuntimeExecutionCandidate,
    reviewRows,
    false,
  );
  const checks = createChecks(
    sourceNodeV396,
    javaV163RuntimeExecutionPacketContribution,
    miniKvV154RuntimeExecutionCandidate,
    reviewRows,
    draftReview,
  );
  checks.readyForJavaMiniKvRuntimeExecutionPacketContributionReview = Object.entries(checks)
    .filter(([key]) => key !== "readyForJavaMiniKvRuntimeExecutionPacketContributionReview")
    .every(([, value]) => value);
  const ready = checks.readyForJavaMiniKvRuntimeExecutionPacketContributionReview;
  const contributionReview = createContributionReview(
    sourceNodeV396,
    javaV163RuntimeExecutionPacketContribution,
    miniKvV154RuntimeExecutionCandidate,
    reviewRows,
    ready,
  );
  checks.reviewDigestStable = isDigest(contributionReview.reviewDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(
    sourceNodeV396,
    javaV163RuntimeExecutionPacketContribution,
    miniKvV154RuntimeExecutionCandidate,
    reviewRows,
    checks,
    productionBlockers,
    warnings,
    recommendations,
  );

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution packet contribution review",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    contributionReviewState: ready
      ? "java-v163-and-mini-kv-v154-contributions-reviewed"
      : "blocked",
    contributionReviewDecision: ready
      ? "keep-runtime-execution-packet-blocked-pending-node-window-and-correlated-approval"
      : "blocked",
    readyForJavaMiniKvRuntimeExecutionPacketContributionReview: ready,
    readyForNodeV398RuntimeExecutionPacketApprovalGateReview: ready,
    readyForRuntimeExecutionPacket: false,
    readyForRuntimeLiveReadGate: false,
    activeNodeVersion: "Node v397",
    sourceNodeVersion: "Node v396",
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
    sourceNodeV396,
    javaV163RuntimeExecutionPacketContribution,
    miniKvV154RuntimeExecutionCandidate,
    reviewRows,
    contributionReview,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      contributionReviewJson: ROUTE_PATH,
      contributionReviewMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV396Json: SOURCE_NODE_V396_ROUTE,
      sourceNodeV396Markdown: `${SOURCE_NODE_V396_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v398",
    },
    nextActions: ready
      ? [
        "Keep runtime execution blocked until a Node-approved cross-project runtime window exists.",
        "Require one correlated operator approval record that binds Java v163 and mini-kv v154 together.",
        "Require an approved cleanup proof after any approved runtime start before treating cleanup as satisfied.",
        "Do not start Java, start mini-kv, or run runtime probes from contribution evidence.",
      ]
      : [
        "Repair the missing v396, Java v163, or mini-kv v154 evidence before reviewing runtime packet contributions.",
        "Do not start Java or mini-kv from this contribution review.",
      ],
  };
}

function createSourceNodeV396(archiveRoot: string | undefined): SourceNodeV396RuntimeArtifactProgressReference {
  const profile = readArchiveJson(archiveRoot ?? process.cwd(), SOURCE_NODE_V396_ARCHIVE_JSON);
  const summary = objectValue(valueAt(profile, "summary"));
  return {
    sourceVersion: "Node v396",
    profileVersion: stringOrNull(valueAt(profile, "profileVersion")) ?? "missing",
    upstreamProgressIntakeState: stringOrNull(valueAt(profile, "upstreamProgressIntakeState")) ?? "missing",
    upstreamProgressDecision: stringOrNull(valueAt(profile, "upstreamProgressDecision")) ?? "missing",
    readyForJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake:
      valueAt(profile, "readyForJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake") === true,
    readyForNodeV397RuntimeExecutionPacketPrerequisiteReview:
      valueAt(profile, "readyForNodeV397RuntimeExecutionPacketPrerequisiteReview") === true,
    readyForRuntimeExecutionPacket: false,
    readyForRuntimeLiveReadGate: false,
    runtimeExecutionArtifactsComplete: false,
    presentRuntimeExecutionArtifactCount: 0,
    missingRuntimeExecutionArtifactCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    checkCount: numberValue(valueAt(summary, "checkCount")),
    passedCheckCount: numberValue(valueAt(summary, "passedCheckCount")),
    javaEvidenceReady: valueAt(summary, "javaEvidenceReady") === true,
    miniKvEvidenceReady: valueAt(summary, "miniKvEvidenceReady") === true,
    productionBlockerCount: numberValue(valueAt(summary, "productionBlockerCount")),
    executionAllowed: false,
    activeShardPrototypeEnabled: false,
  };
}

function createJavaV163RuntimeExecutionPacketContribution(): JavaV163RuntimeExecutionPacketContribution {
  const json = readJsonObject(JAVA_V163_RUNTIME_EXECUTION_PACKET_CONTRIBUTION);
  const evidence = toFileReference(evidenceFile("java-v163-runtime-execution-packet-contribution",
    JAVA_V163_RUNTIME_EXECUTION_PACKET_CONTRIBUTION));
  const acceptedRows = stringArray(valueAt(json, "acceptedRequirementRows"));
  const getOnlySmokeCommands = stringArray(valueAt(json, "getOnlySmokeCommands"));
  const cleanupProofArtifacts = stringArray(valueAt(json, "cleanupProofArtifacts"));
  const processCleanupRules = stringArray(valueAt(json, "processCleanupRules"));
  const missingArtifacts = stringArray(valueAt(json, "crossProjectMissingArtifacts"));
  const startsJavaService = valueAt(json, "startsJavaService") === true;
  const startsMiniKvService = valueAt(json, "startsMiniKvService") === true;
  const executionAllowed = valueAt(json, "executionAllowed") === true;
  return {
    sourceVersion: "Java v163",
    evidenceFile: evidence,
    status: stringOrNull(valueAt(json, "status")),
    project: stringOrNull(valueAt(json, "project")),
    contributionScope: stringOrNull(valueAt(json, "contributionScope")),
    javaPacketContributionPresent: valueAt(json, "javaPacketContributionPresent") === true,
    javaPacketContributionComplete: valueAt(json, "javaPacketContributionComplete") === true,
    crossProjectRuntimeExecutionPacketPresent: valueAt(json, "crossProjectRuntimeExecutionPacketPresent") === true,
    crossProjectRuntimeExecutionPacketExecutable: valueAt(json, "crossProjectRuntimeExecutionPacketExecutable") === true,
    readyForRuntimeExecutionPacket: valueAt(json, "readyForRuntimeExecutionPacket") === true,
    readyForRuntimeLiveReadGate: valueAt(json, "readyForRuntimeLiveReadGate") === true,
    operatorApprovalRecordId: stringOrNull(valueAt(json, "operatorApprovalRecordId")),
    javaLoopbackPort: stringOrNull(valueAt(json, "javaLoopbackPort")),
    miniKvLoopbackPortRequirement: stringOrNull(valueAt(json, "miniKvLoopbackPortRequirement")),
    serviceOwnerConfirmation: stringOrNull(valueAt(json, "serviceOwnerConfirmation")),
    getOnlySmokeCommandCount: getOnlySmokeCommands.length,
    cleanupProofArtifactCount: cleanupProofArtifacts.length,
    processCleanupRuleCount: processCleanupRules.length,
    acceptedRequirementRowCount: acceptedRows.length,
    crossProjectMissingArtifactCount: missingArtifacts.length,
    startsJavaService: false,
    startsMiniKvService: false,
    executionAllowed: false,
    evidenceReady:
      evidence.exists
      && valueAt(json, "status") === "passed"
      && valueAt(json, "nextNodeConsumerHint") === "Node v397"
      && acceptedRows.length === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT
      && valueAt(json, "javaPacketContributionPresent") === true
      && valueAt(json, "javaPacketContributionComplete") === true
      && valueAt(json, "crossProjectRuntimeExecutionPacketPresent") === false
      && valueAt(json, "crossProjectRuntimeExecutionPacketExecutable") === false
      && valueAt(json, "readyForRuntimeExecutionPacket") === false
      && valueAt(json, "readyForRuntimeLiveReadGate") === false
      && !startsJavaService
      && !startsMiniKvService
      && !executionAllowed,
  };
}

function createMiniKvV154RuntimeExecutionCandidate(): MiniKvV154RuntimeExecutionCandidate {
  const json = readJsonObject(MINI_KV_V154_RUNTIME_EXECUTION_CANDIDATE);
  const evidence = toFileReference(evidenceFile("mini-kv-v154-runtime-execution-candidate",
    MINI_KV_V154_RUNTIME_EXECUTION_CANDIDATE));
  const historicalFallback = objectValue(valueAt(json, "historicalFallback"));
  const candidate = objectValue(valueAt(json, "miniKvRuntimeExecutionArtifactCandidate"));
  const processCleanupRules = stringArray(valueAt(candidate, "processCleanupRules"));
  const executionAllowed = valueAt(json, "executionAllowed") === true;
  const startsMiniKvService = valueAt(candidate, "startsMiniKvService") === true;
  const startsServices = valueAt(candidate, "startsServices") === true;
  const runtimeProbeAllowed = valueAt(candidate, "runtimeProbeAllowed") === true;
  const liveReadAllowed = valueAt(candidate, "liveReadAllowed") === true;
  const routerActivationAllowed = valueAt(candidate, "routerActivationAllowed") === true;
  const writeRoutingAllowed = valueAt(candidate, "writeRoutingAllowed") === true;
  return {
    sourceVersion: "mini-kv v154",
    evidenceFile: evidence,
    project: stringOrNull(valueAt(json, "project")),
    releaseVersion: stringOrNull(valueAt(json, "releaseVersion")),
    status: stringOrNull(valueAt(json, "status")),
    readOnly: valueAt(json, "readOnly") === true,
    executionAllowed,
    previousConsumedReleaseVersion: stringOrNull(valueAt(historicalFallback, "previousConsumedReleaseVersion")),
    previousConsumedFixturePath: stringOrNull(valueAt(historicalFallback, "previousConsumedFixturePath")),
    candidateMode: stringOrNull(valueAt(candidate, "candidateMode")),
    candidateArtifactCount: numberValue(valueAt(candidate, "candidateArtifactCount")),
    acceptedRuntimeExecutionArtifactCount: numberValue(valueAt(candidate, "acceptedRuntimeExecutionArtifactCount")),
    missingAcceptedRuntimeExecutionArtifactCount:
      numberValue(valueAt(candidate, "missingAcceptedRuntimeExecutionArtifactCount")),
    acceptedRuntimeExecutionArtifactsComplete:
      valueAt(candidate, "acceptedRuntimeExecutionArtifactsComplete") === true,
    miniKvLoopbackPortCandidateDeclared:
      valueAt(candidate, "miniKvLoopbackPortCandidateDeclared") === true,
    miniKvLoopbackPortCandidate: nullableNumber(valueAt(candidate, "miniKvLoopbackPortCandidate")),
    miniKvLoopbackPortOperatorApproved:
      valueAt(candidate, "miniKvLoopbackPortOperatorApproved") === true,
    getOnlySmokeCommandOperatorApproved:
      valueAt(candidate, "getOnlySmokeCommandOperatorApproved") === true,
    serviceOwnerCandidateDeclared:
      valueAt(candidate, "serviceOwnerCandidateDeclared") === true,
    serviceOwnerOperatorConfirmed:
      valueAt(candidate, "serviceOwnerOperatorConfirmed") === true,
    processCleanupRulesCandidateDeclared:
      valueAt(candidate, "processCleanupRulesCandidateDeclared") === true,
    processCleanupRuleCount: processCleanupRules.length,
    cleanupProofPresent: valueAt(candidate, "cleanupProofPresent") === true,
    crossProjectRuntimeExecutionPacketPresent:
      valueAt(candidate, "crossProjectRuntimeExecutionPacketPresent") === true,
    runtimeExecutionPacketExecutable:
      valueAt(candidate, "runtimeExecutionPacketExecutable") === true,
    nodeRuntimeWindowApproved: valueAt(candidate, "nodeRuntimeWindowApproved") === true,
    operatorApprovalRecordPresent: valueAt(candidate, "operatorApprovalRecordPresent") === true,
    startsMiniKvService,
    startsServices,
    runtimeProbeAllowed,
    liveReadAllowed,
    routerActivationAllowed,
    writeRoutingAllowed,
    evidenceReady:
      evidence.exists
      && valueAt(json, "releaseVersion") === "v154"
      && valueAt(json, "status") === "mini-kv-runtime-execution-artifact-candidate-no-runtime-read-only"
      && valueAt(candidate, "candidateMode") === "mini-kv-side-candidate-no-runtime"
      && valueAt(candidate, "candidateArtifactCount") === 4
      && valueAt(candidate, "acceptedRuntimeExecutionArtifactCount") === 0
      && valueAt(candidate, "missingAcceptedRuntimeExecutionArtifactCount") === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT
      && valueAt(candidate, "acceptedRuntimeExecutionArtifactsComplete") === false
      && valueAt(candidate, "crossProjectRuntimeExecutionPacketPresent") === false
      && valueAt(candidate, "runtimeExecutionPacketExecutable") === false
      && valueAt(candidate, "nodeRuntimeWindowApproved") === false
      && !executionAllowed
      && !startsMiniKvService
      && !startsServices
      && !runtimeProbeAllowed
      && !liveReadAllowed
      && !routerActivationAllowed
      && !writeRoutingAllowed,
  };
}

function createReviewRows(
  java: JavaV163RuntimeExecutionPacketContribution,
  miniKv: MiniKvV154RuntimeExecutionCandidate,
): RuntimeExecutionPacketReviewRow[] {
  return [
    {
      key: "operatorApprovalRecord",
      javaContribution: java.operatorApprovalRecordId ?? "java-side approval record missing",
      miniKvContribution: miniKv.operatorApprovalRecordPresent
        ? "mini-kv operator approval unexpectedly present"
        : "mini-kv has no operator approval record",
      nodeOrOperatorGap: "one correlated approval record must bind Java, mini-kv, and the Node runtime window",
      crossProjectAccepted: false,
    },
    {
      key: "concreteLoopbackPorts",
      javaContribution: java.javaLoopbackPort === "8080" ? "Java port 8080 contributed" : "Java port missing",
      miniKvContribution: miniKv.miniKvLoopbackPortCandidateDeclared
        ? `mini-kv candidate port ${miniKv.miniKvLoopbackPortCandidate} contributed but not operator-approved`
        : "mini-kv port candidate missing",
      nodeOrOperatorGap: "Node-approved cross-project packet must bind both ports together",
      crossProjectAccepted: false,
    },
    {
      key: "getOnlySmokeCommand",
      javaContribution: `${java.getOnlySmokeCommandCount} Java GET-only smoke commands contributed`,
      miniKvContribution: miniKv.getOnlySmokeCommandOperatorApproved
        ? "mini-kv smoke unexpectedly approved"
        : "mini-kv GET-only smoke is candidate-only and not operator-approved",
      nodeOrOperatorGap: "approved packet must bind Java GET smoke and mini-kv read-only smoke together",
      crossProjectAccepted: false,
    },
    {
      key: "cleanupProof",
      javaContribution: `${java.cleanupProofArtifactCount} Java cleanup proof references contributed without execution`,
      miniKvContribution: miniKv.cleanupProofPresent
        ? "mini-kv cleanup proof unexpectedly present"
        : "mini-kv cleanup proof missing until approved runtime start",
      nodeOrOperatorGap: "cleanup proof can be accepted only after an approved runtime start and cleanup archive",
      crossProjectAccepted: false,
    },
    {
      key: "serviceOwnerConfirmation",
      javaContribution: java.serviceOwnerConfirmation ?? "Java owner confirmation missing",
      miniKvContribution: miniKv.serviceOwnerCandidateDeclared
        ? "mini-kv service owner candidate declared but not operator-confirmed"
        : "mini-kv service owner candidate missing",
      nodeOrOperatorGap: "approved packet must confirm both owners",
      crossProjectAccepted: false,
    },
    {
      key: "processCleanupRules",
      javaContribution: `${java.processCleanupRuleCount} Java stop-only-owned-process rules contributed`,
      miniKvContribution: miniKv.processCleanupRulesCandidateDeclared
        ? `${miniKv.processCleanupRuleCount} mini-kv cleanup rules contributed as candidate-only`
        : "mini-kv cleanup rules missing",
      nodeOrOperatorGap: "approved packet must adopt stop-only-owned-process rules for both services",
      crossProjectAccepted: false,
    },
  ];
}

function createContributionReview(
  source: SourceNodeV396RuntimeArtifactProgressReference,
  java: JavaV163RuntimeExecutionPacketContribution,
  miniKv: MiniKvV154RuntimeExecutionCandidate,
  rows: readonly RuntimeExecutionPacketReviewRow[],
  ready: boolean,
): RuntimeExecutionPacketContributionReviewRecord {
  const record = {
    reviewMode: "java-mini-kv-runtime-execution-packet-contribution-review" as const,
    sourceSpan: "Node v396 + Java v163 + mini-kv v154" as const,
    reviewDecision: ready
      ? "record-contributions-and-keep-runtime-execution-packet-blocked" as const
      : "blocked" as const,
    javaPacketContributionReceived: java.evidenceReady,
    miniKvRuntimeCandidateReceived: miniKv.evidenceReady,
    contributionRowsReviewed: rows.length as 6,
    crossProjectAcceptedRequirementCount: 0 as const,
    crossProjectMissingRequirementCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT as 6,
    crossProjectRuntimeExecutionPacketPresent: false as const,
    crossProjectRuntimeExecutionPacketExecutable: false as const,
    nodeApprovedRuntimeWindowPresent: false as const,
    correlatedOperatorApprovalPresent: false as const,
    cleanupProofAfterRuntimeStartPresent: false as const,
    readyForRuntimeExecutionPacket: false as const,
    readyForRuntimeLiveReadGate: false as const,
    executionAttempted: false as const,
    startsUpstreamServices: false as const,
    stopsUpstreamServices: false as const,
    writesUpstreamState: false as const,
    opensManagedAuditConnection: false as const,
    activeShardPrototypeEnabled: false as const,
    nextNodeVersionSuggested: "Node v398" as const,
    sourceNodeV396ReadyForV397: source.readyForNodeV397RuntimeExecutionPacketPrerequisiteReview,
  };
  return {
    reviewDigest: sha256StableJson(record),
    ...record,
  };
}

function createChecks(
  source: SourceNodeV396RuntimeArtifactProgressReference,
  java: JavaV163RuntimeExecutionPacketContribution,
  miniKv: MiniKvV154RuntimeExecutionCandidate,
  rows: readonly RuntimeExecutionPacketReviewRow[],
  review: RuntimeExecutionPacketContributionReviewRecord,
): RuntimeExecutionPacketContributionReviewChecks {
  return {
    sourceNodeV396Ready:
      source.upstreamProgressIntakeState === "java-v162-candidate-and-mini-kv-v153-blocked-preflight-intaken",
    sourceNodeV396ReadyForV397: source.readyForNodeV397RuntimeExecutionPacketPrerequisiteReview,
    sourceNodeV396RuntimeClosed:
      !source.readyForRuntimeExecutionPacket
      && !source.readyForRuntimeLiveReadGate
      && !source.runtimeExecutionArtifactsComplete
      && source.presentRuntimeExecutionArtifactCount === 0
      && source.missingRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT
      && !source.executionAllowed
      && !source.activeShardPrototypeEnabled,
    sourceNodeV396ChecksPassed:
      source.checkCount > 0
      && source.checkCount === source.passedCheckCount
      && source.javaEvidenceReady
      && source.miniKvEvidenceReady
      && source.productionBlockerCount === 0,
    javaV163EvidencePresent: java.evidenceFile.exists,
    javaV163StatusPassed: java.status === "passed",
    javaV163ContributionPresent: java.javaPacketContributionPresent,
    javaV163ContributionComplete: java.javaPacketContributionComplete,
    javaV163NotCrossProjectPacket:
      !java.crossProjectRuntimeExecutionPacketPresent
      && !java.crossProjectRuntimeExecutionPacketExecutable,
    javaV163NotExecutable:
      !java.readyForRuntimeExecutionPacket
      && !java.readyForRuntimeLiveReadGate
      && !java.startsJavaService
      && !java.startsMiniKvService
      && !java.executionAllowed,
    javaV163AllSixRowsAnswered: java.acceptedRequirementRowCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    miniKvV154EvidencePresent: miniKv.evidenceFile.exists,
    miniKvV154ReleaseCurrent: miniKv.releaseVersion === "v154",
    miniKvV154CandidateStatus: miniKv.status === "mini-kv-runtime-execution-artifact-candidate-no-runtime-read-only"
      && miniKv.candidateMode === "mini-kv-side-candidate-no-runtime",
    miniKvV154CandidateCountsStable:
      miniKv.candidateArtifactCount === 4
      && miniKv.acceptedRuntimeExecutionArtifactCount === 0
      && miniKv.missingAcceptedRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    miniKvV154NoAcceptedRuntimeArtifacts:
      !miniKv.acceptedRuntimeExecutionArtifactsComplete
      && !miniKv.operatorApprovalRecordPresent
      && !miniKv.nodeRuntimeWindowApproved
      && !miniKv.crossProjectRuntimeExecutionPacketPresent
      && !miniKv.cleanupProofPresent,
    miniKvV154NotExecutable:
      !miniKv.executionAllowed
      && !miniKv.runtimeExecutionPacketExecutable
      && !miniKv.startsMiniKvService
      && !miniKv.startsServices
      && !miniKv.runtimeProbeAllowed
      && !miniKv.liveReadAllowed
      && !miniKv.routerActivationAllowed
      && !miniKv.writeRoutingAllowed,
    miniKvV154CandidateRowsPresent:
      miniKv.miniKvLoopbackPortCandidateDeclared
      && miniKv.miniKvLoopbackPortCandidate === 6424
      && miniKv.serviceOwnerCandidateDeclared
      && miniKv.processCleanupRulesCandidateDeclared
      && miniKv.processCleanupRuleCount >= 3,
    reviewRowsStable: rows.length === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    reviewRowsNotCrossProjectAccepted: rows.every((row) => !row.crossProjectAccepted),
    runtimePacketStillAbsent:
      !review.crossProjectRuntimeExecutionPacketPresent
      && !review.crossProjectRuntimeExecutionPacketExecutable,
    nodeOperatorGapsRecorded:
      !review.nodeApprovedRuntimeWindowPresent
      && !review.correlatedOperatorApprovalPresent
      && !review.cleanupProofAfterRuntimeStartPresent,
    runtimeGateStillClosed:
      !review.readyForRuntimeExecutionPacket
      && !review.readyForRuntimeLiveReadGate
      && !review.executionAttempted,
    noAutomaticUpstreamStartStop: !review.startsUpstreamServices && !review.stopsUpstreamServices,
    noUpstreamMutation: !review.writesUpstreamState,
    noManagedAuditConnection: !review.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    activeShardPrototypeStillDisabled: !review.activeShardPrototypeEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    reviewDigestStable: isDigest(review.reviewDigest),
    readyForJavaMiniKvRuntimeExecutionPacketContributionReview: false,
  };
}

function createSummary(
  source: SourceNodeV396RuntimeArtifactProgressReference,
  java: JavaV163RuntimeExecutionPacketContribution,
  miniKv: MiniKvV154RuntimeExecutionCandidate,
  rows: readonly RuntimeExecutionPacketReviewRow[],
  checks: RuntimeExecutionPacketContributionReviewChecks,
  productionBlockers: readonly RuntimeExecutionPacketContributionReviewMessage[],
  warnings: readonly RuntimeExecutionPacketContributionReviewMessage[],
  recommendations: readonly RuntimeExecutionPacketContributionReviewMessage[],
): RuntimeExecutionPacketContributionReviewSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceCheckCount: source.checkCount,
    sourcePassedCheckCount: source.passedCheckCount,
    javaEvidenceReady: java.evidenceReady,
    miniKvEvidenceReady: miniKv.evidenceReady,
    reviewRowCount: rows.length,
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
  checks: RuntimeExecutionPacketContributionReviewChecks,
): RuntimeExecutionPacketContributionReviewMessage[] {
  const rules: Array<[boolean, string, string, string]> = [
    [checks.sourceNodeV396Ready, "SOURCE_V396_NOT_READY", "source-node-v396", "Node v396 progress intake must be ready."],
    [checks.sourceNodeV396ReadyForV397, "SOURCE_V396_NOT_READY_FOR_V397", "source-node-v396", "Node v396 must point to v397 contribution review."],
    [checks.sourceNodeV396RuntimeClosed, "SOURCE_V396_RUNTIME_OPENED", "runtime-boundary", "Node v396 must keep runtime closed."],
    [checks.sourceNodeV396ChecksPassed, "SOURCE_V396_CHECKS_NOT_PASSED", "source-node-v396", "Node v396 checks must all pass."],
    [checks.javaV163EvidencePresent, "JAVA_V163_EVIDENCE_MISSING", "java-v163", "Java v163 contribution evidence must be present."],
    [checks.javaV163StatusPassed, "JAVA_V163_NOT_PASSED", "java-v163", "Java v163 contribution must have status=passed."],
    [checks.javaV163ContributionPresent, "JAVA_V163_CONTRIBUTION_MISSING", "java-v163", "Java v163 contribution must be present."],
    [checks.javaV163NotCrossProjectPacket, "JAVA_V163_OVERSTATED", "java-v163", "Java v163 must not be treated as cross-project packet."],
    [checks.javaV163NotExecutable, "JAVA_V163_EXECUTABLE", "java-v163", "Java v163 must remain non-executable."],
    [checks.miniKvV154EvidencePresent, "MINI_KV_V154_EVIDENCE_MISSING", "mini-kv-v154", "mini-kv v154 evidence must be frozen and readable."],
    [checks.miniKvV154ReleaseCurrent, "MINI_KV_V154_VERSION_MISMATCH", "mini-kv-v154", "mini-kv evidence must be releaseVersion=v154."],
    [checks.miniKvV154CandidateStatus, "MINI_KV_V154_NOT_CANDIDATE", "mini-kv-v154", "mini-kv v154 must remain candidate-only."],
    [checks.miniKvV154NoAcceptedRuntimeArtifacts, "MINI_KV_V154_ACCEPTED_ARTIFACTS_PRESENT", "mini-kv-v154", "mini-kv v154 must not claim accepted runtime artifacts."],
    [checks.miniKvV154NotExecutable, "MINI_KV_V154_EXECUTABLE", "mini-kv-v154", "mini-kv v154 must remain non-executable."],
    [checks.reviewRowsStable, "REVIEW_ROW_COUNT_CHANGED", "runtime-packet-review", "Exactly six runtime packet rows must be reviewed."],
    [checks.reviewRowsNotCrossProjectAccepted, "REVIEW_ROW_UNEXPECTEDLY_ACCEPTED", "runtime-packet-review", "No row should be accepted without Node/operator packet approval."],
    [checks.runtimePacketStillAbsent, "RUNTIME_PACKET_PRESENT", "runtime-boundary", "v397 must not create a runtime execution packet."],
    [checks.runtimeGateStillClosed, "RUNTIME_GATE_OPENED", "runtime-boundary", "v397 must keep runtime gates closed."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v397 must not start or stop sibling services."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(): RuntimeExecutionPacketContributionReviewMessage[] {
  return [
    {
      code: "CONTRIBUTIONS_DO_NOT_EQUAL_RUNTIME_PACKET",
      severity: "warning",
      source: "node-v397",
      message: "Java v163 and mini-kv v154 supply useful contributions, but no Node-approved runtime window or correlated approval exists.",
    },
    {
      code: "CLEANUP_PROOF_REQUIRES_APPROVED_RUNTIME_START",
      severity: "warning",
      source: "node-v397",
      message: "Cleanup proof remains unsatisfied until after an approved runtime start and archive.",
    },
  ];
}

function collectRecommendations(ready: boolean): RuntimeExecutionPacketContributionReviewMessage[] {
  return [
    {
      code: ready ? "WAIT_FOR_NODE_APPROVED_RUNTIME_WINDOW" : "REPAIR_CONTRIBUTION_REVIEW_INPUTS",
      severity: "recommendation",
      source: "node-v397",
      message: ready
        ? "Next review should accept runtime only when Node/operator approval binds Java v163 and mini-kv v154 into one execution packet."
        : "Repair missing source or upstream contribution evidence before continuing.",
    },
  ];
}

function toFileReference(file: RuntimeExecutionPacketContributionFileReference): RuntimeExecutionPacketContributionFileReference {
  return {
    id: file.id,
    path: file.path,
    resolvedPath: file.resolvedPath.replace(/\\/g, "/"),
    exists: file.exists,
    sizeBytes: file.sizeBytes,
    digest: file.digest,
  };
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

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function stringOrNull(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function nullableNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
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

function isDigest(value: string | null): boolean {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
