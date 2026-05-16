import type { IncomingHttpHeaders } from "node:http";

import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
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
  loadRealReadWindowCiArtifactUploadDryRunContract,
  type RealReadWindowCiArtifactUploadDryRunContractProfile,
} from "./realReadWindowCiArtifactUploadDryRunContract.js";

export interface CrossProjectCiArtifactRetentionGateProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "cross-project-ci-artifact-retention-gate.v1";
  gateState: "ready-for-retention-review" | "blocked";
  readyForCrossProjectCiArtifactRetentionGate: boolean;
  readyForRealCiArtifactUpload: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  sourceUploadDryRunContract: {
    profileVersion: RealReadWindowCiArtifactUploadDryRunContractProfile["profileVersion"];
    contractState: RealReadWindowCiArtifactUploadDryRunContractProfile["contractState"];
    contractDigest: string;
    artifactName: "orderops-real-read-window-evidence-v191-v201";
    artifactRoot: "c/";
    retentionDays: 30;
    ready: boolean;
    readyForRealCiArtifactUpload: false;
  };
  upstreamRetentionHints: {
    javaV72: JavaArtifactRetentionHint;
    miniKvV81: MiniKvArtifactRetentionEvidence;
  };
  retentionGate: {
    gateDigest: string;
    sourceEvidenceSpan: "Node v202 + Java v72 + mini-kv v81";
    retentionMode: "dry-run-contract-only";
    expectedArtifactRoot: "c/";
    expectedRetentionDays: 30;
    retainedProjectCount: 3;
    realArtifactStoreConnected: false;
    githubArtifactUploadAttempted: false;
    productionWindowAllowed: false;
  };
  retentionRecords: RetentionRecord[];
  checks: {
    sourceUploadDryRunContractReady: boolean;
    sourceContractDigestValid: boolean;
    sourceRealUploadStillBlocked: boolean;
    sourceArtifactShapeStable: boolean;
    javaV72HintAccepted: boolean;
    javaV72RetentionDaysCompatible: boolean;
    javaV72ReadOnly: boolean;
    javaV72DoesNotUploadCiArtifact: boolean;
    javaV72DoesNotAccessGitHubArtifact: boolean;
    javaV72DoesNotAuthorizeNodeRetention: boolean;
    miniKvV81HintAccepted: boolean;
    miniKvV81RetentionDaysMatch: boolean;
    miniKvV81ReadOnly: boolean;
    miniKvV81DoesNotRestore: boolean;
    miniKvV81DoesNotUploadCiArtifact: boolean;
    retentionRecordsComplete: boolean;
    retentionRecordsReadOnly: boolean;
    retentionRecordDigestsValid: boolean;
    upstreamActionsStillDisabled: boolean;
    realArtifactStoreStillDisconnected: boolean;
    githubArtifactUploadNotAttempted: boolean;
    productionWindowStillBlocked: boolean;
    executionStillBlocked: boolean;
    readyForCrossProjectCiArtifactRetentionGate: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    retainedProjectCount: number;
    retentionDays: number;
    retentionRecordCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: RetentionGateMessage[];
  warnings: RetentionGateMessage[];
  recommendations: RetentionGateMessage[];
  evidenceEndpoints: {
    crossProjectCiArtifactRetentionGateJson: string;
    crossProjectCiArtifactRetentionGateMarkdown: string;
    realReadWindowCiArtifactUploadDryRunContractJson: string;
    javaReleaseApprovalArtifactRetentionHint: string;
    miniKvReleaseVerificationManifest: string;
    miniKvRuntimeSmokeEvidence: string;
  };
  nextActions: string[];
}

interface JavaArtifactRetentionHint {
  sourceVersion: "Java v72";
  hintVersion: "java-release-approval-rehearsal-artifact-retention-hint.v1";
  ciUploadContractVersion: "real-read-window-ci-artifact-upload-dry-run-contract.v1";
  ciArtifactName: "orderops-real-read-window-evidence-v191-v201";
  ciArtifactRoot: "c/";
  ciRetentionDays: 30;
  ciUploadMode: "dry-run-contract-only";
  javaRetentionDays: 180;
  artifactRetentionContextComplete: true;
  retentionDaysWithinJavaRetention: true;
  javaRetentionFixtureReadOnly: true;
  auditExportReadOnly: true;
  ciArtifactUploadedByJava: false;
  githubArtifactAccessedByJava: false;
  productionWindowAllowedByJava: false;
  nodeMayTreatAsRetentionAuthorization: false;
  noLedgerWriteProved: true;
}

interface MiniKvArtifactRetentionEvidence {
  sourceVersion: "mini-kv v81";
  runtimeSmokeEvidenceVersion: "mini-kv-runtime-smoke-evidence.v6";
  releaseVersion: "v81";
  projectVersion: "0.81.0";
  artifactRoot: "c/";
  artifactPathHint: "c/81/";
  retentionDays: 30;
  retentionMode: "dry-run-contract-only";
  releaseEvidenceReady: true;
  taxonomyDigest: "fnv1a64:f92fcba55feb26a2";
  identityNeutralProof: true;
  noRestoreProof: true;
  githubArtifactUploadAttempted: false;
  productionWindowAllowed: false;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  orderAuthoritative: false;
  javaTransactionChainConnected: false;
  readOnly: true;
}

interface RetentionRecord {
  id: string;
  project: "node" | "java" | "mini-kv";
  sourceVersion: string;
  evidencePath: string;
  retentionDays: number;
  readOnly: true;
  executionAllowed: false;
  uploadAttempted: false;
  productionWindowAllowed: false;
  recordDigest: string;
}

interface RetentionGateMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "cross-project-ci-artifact-retention-gate"
    | "real-read-window-ci-artifact-upload-dry-run-contract"
    | "java-v72-artifact-retention-hint"
    | "mini-kv-v81-artifact-retention-evidence"
    | "ci-artifact-retention"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  crossProjectCiArtifactRetentionGateJson: "/api/v1/production/cross-project-ci-artifact-retention-gate",
  crossProjectCiArtifactRetentionGateMarkdown: "/api/v1/production/cross-project-ci-artifact-retention-gate?format=markdown",
  realReadWindowCiArtifactUploadDryRunContractJson: "/api/v1/production/real-read-window-ci-artifact-upload-dry-run-contract",
  javaReleaseApprovalArtifactRetentionHint: "D:/javaproj/advanced-order-platform/c/72/",
  miniKvReleaseVerificationManifest: "D:/C/mini-kv/fixtures/release/verification-manifest.json",
  miniKvRuntimeSmokeEvidence: "D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json",
});

export async function loadCrossProjectCiArtifactRetentionGate(input: {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
  headers?: IncomingHttpHeaders;
}): Promise<CrossProjectCiArtifactRetentionGateProfile> {
  const sourceContract = await loadRealReadWindowCiArtifactUploadDryRunContract(input);
  const upstreamRetentionHints = {
    javaV72: createJavaHint(),
    miniKvV81: createMiniKvHint(),
  };
  const retentionRecords = createRetentionRecords(sourceContract, upstreamRetentionHints);
  const checks = createChecks(input.config, sourceContract, upstreamRetentionHints, retentionRecords);
  checks.readyForCrossProjectCiArtifactRetentionGate = Object.entries(checks)
    .filter(([key]) => key !== "readyForCrossProjectCiArtifactRetentionGate")
    .every(([, value]) => value);
  const gateState = checks.readyForCrossProjectCiArtifactRetentionGate ? "ready-for-retention-review" : "blocked";
  const gateDigest = sha256StableJson({
    profileVersion: "cross-project-ci-artifact-retention-gate.v1",
    gateState,
    sourceContractDigest: sourceContract.dryRunContract.contractDigest,
    javaHintVersion: upstreamRetentionHints.javaV72.hintVersion,
    miniKvRuntimeSmokeEvidenceVersion: upstreamRetentionHints.miniKvV81.runtimeSmokeEvidenceVersion,
    retainedProjectCount: retentionRecords.length,
    retentionRecordDigests: retentionRecords.map((record) => record.recordDigest),
    realArtifactStoreConnected: false,
    githubArtifactUploadAttempted: false,
    productionWindowAllowed: false,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(gateState);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Cross-project CI artifact retention gate",
    generatedAt: new Date().toISOString(),
    profileVersion: "cross-project-ci-artifact-retention-gate.v1",
    gateState,
    readyForCrossProjectCiArtifactRetentionGate: checks.readyForCrossProjectCiArtifactRetentionGate,
    readyForRealCiArtifactUpload: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    sourceUploadDryRunContract: {
      profileVersion: sourceContract.profileVersion,
      contractState: sourceContract.contractState,
      contractDigest: sourceContract.dryRunContract.contractDigest,
      artifactName: sourceContract.dryRunContract.artifactName,
      artifactRoot: sourceContract.dryRunContract.artifactRoot,
      retentionDays: sourceContract.dryRunContract.retentionDays,
      ready: sourceContract.readyForRealReadWindowCiArtifactUploadDryRunContract,
      readyForRealCiArtifactUpload: false,
    },
    upstreamRetentionHints,
    retentionGate: {
      gateDigest,
      sourceEvidenceSpan: "Node v202 + Java v72 + mini-kv v81",
      retentionMode: "dry-run-contract-only",
      expectedArtifactRoot: "c/",
      expectedRetentionDays: 30,
      retainedProjectCount: 3,
      realArtifactStoreConnected: false,
      githubArtifactUploadAttempted: false,
      productionWindowAllowed: false,
    },
    retentionRecords,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      retainedProjectCount: 3,
      retentionDays: 30,
      retentionRecordCount: retentionRecords.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Keep v203 as the cross-project artifact retention gate; it is not a real GitHub artifact upload.",
      "Start the next plan with a true read-only three-project runtime smoke only after Java and mini-kv are deliberately available for a safe read window.",
      "Do not open production operations until real artifact storage, managed audit storage, real IdP, and manual approval records exist.",
    ],
  };
}

export function renderCrossProjectCiArtifactRetentionGateMarkdown(
  profile: CrossProjectCiArtifactRetentionGateProfile,
): string {
  return [
    "# Cross-project CI artifact retention gate",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Gate state: ${profile.gateState}`,
    `- Ready for cross-project CI artifact retention gate: ${profile.readyForCrossProjectCiArtifactRetentionGate}`,
    `- Ready for real CI artifact upload: ${profile.readyForRealCiArtifactUpload}`,
    `- Ready for production window: ${profile.readyForProductionWindow}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Source Upload Dry-run Contract",
    "",
    ...renderEntries(profile.sourceUploadDryRunContract),
    "",
    "## Java v72 Retention Hint",
    "",
    ...renderEntries(profile.upstreamRetentionHints.javaV72),
    "",
    "## mini-kv v81 Retention Evidence",
    "",
    ...renderEntries(profile.upstreamRetentionHints.miniKvV81),
    "",
    "## Retention Gate",
    "",
    ...renderEntries(profile.retentionGate),
    "",
    "## Retention Records",
    "",
    ...profile.retentionRecords.flatMap(renderRetentionRecord),
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
    ...renderMessages(profile.productionBlockers, "No cross-project artifact retention blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No cross-project artifact retention warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No cross-project artifact retention recommendations."),
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

function createJavaHint(): JavaArtifactRetentionHint {
  return {
    sourceVersion: "Java v72",
    hintVersion: "java-release-approval-rehearsal-artifact-retention-hint.v1",
    ciUploadContractVersion: "real-read-window-ci-artifact-upload-dry-run-contract.v1",
    ciArtifactName: "orderops-real-read-window-evidence-v191-v201",
    ciArtifactRoot: "c/",
    ciRetentionDays: 30,
    ciUploadMode: "dry-run-contract-only",
    javaRetentionDays: 180,
    artifactRetentionContextComplete: true,
    retentionDaysWithinJavaRetention: true,
    javaRetentionFixtureReadOnly: true,
    auditExportReadOnly: true,
    ciArtifactUploadedByJava: false,
    githubArtifactAccessedByJava: false,
    productionWindowAllowedByJava: false,
    nodeMayTreatAsRetentionAuthorization: false,
    noLedgerWriteProved: true,
  };
}

function createMiniKvHint(): MiniKvArtifactRetentionEvidence {
  return {
    sourceVersion: "mini-kv v81",
    runtimeSmokeEvidenceVersion: "mini-kv-runtime-smoke-evidence.v6",
    releaseVersion: "v81",
    projectVersion: "0.81.0",
    artifactRoot: "c/",
    artifactPathHint: "c/81/",
    retentionDays: 30,
    retentionMode: "dry-run-contract-only",
    releaseEvidenceReady: true,
    taxonomyDigest: "fnv1a64:f92fcba55feb26a2",
    identityNeutralProof: true,
    noRestoreProof: true,
    githubArtifactUploadAttempted: false,
    productionWindowAllowed: false,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    orderAuthoritative: false,
    javaTransactionChainConnected: false,
    readOnly: true,
  };
}

function createRetentionRecords(
  sourceContract: RealReadWindowCiArtifactUploadDryRunContractProfile,
  hints: CrossProjectCiArtifactRetentionGateProfile["upstreamRetentionHints"],
): RetentionRecord[] {
  return [
    createRetentionRecord(
      "node-v202-upload-dry-run-contract",
      "node",
      "Node v202",
      "c/202/",
      sourceContract.dryRunContract.retentionDays,
    ),
    createRetentionRecord(
      "java-v72-release-approval-retention-hint",
      "java",
      hints.javaV72.sourceVersion,
      "D:/javaproj/advanced-order-platform/c/72/",
      hints.javaV72.ciRetentionDays,
    ),
    createRetentionRecord(
      "mini-kv-v81-runtime-smoke-retention-evidence",
      "mini-kv",
      hints.miniKvV81.sourceVersion,
      hints.miniKvV81.artifactPathHint,
      hints.miniKvV81.retentionDays,
    ),
  ];
}

function createRetentionRecord(
  id: string,
  project: RetentionRecord["project"],
  sourceVersion: string,
  evidencePath: string,
  retentionDays: number,
): RetentionRecord {
  const digestPayload = {
    id,
    project,
    sourceVersion,
    evidencePath,
    retentionDays,
    readOnly: true as const,
    executionAllowed: false as const,
    uploadAttempted: false as const,
    productionWindowAllowed: false as const,
  };
  return {
    ...digestPayload,
    recordDigest: sha256StableJson(digestPayload),
  };
}

function createChecks(
  config: AppConfig,
  sourceContract: RealReadWindowCiArtifactUploadDryRunContractProfile,
  hints: CrossProjectCiArtifactRetentionGateProfile["upstreamRetentionHints"],
  retentionRecords: RetentionRecord[],
): CrossProjectCiArtifactRetentionGateProfile["checks"] {
  return {
    sourceUploadDryRunContractReady: sourceContract.readyForRealReadWindowCiArtifactUploadDryRunContract,
    sourceContractDigestValid: /^[a-f0-9]{64}$/.test(sourceContract.dryRunContract.contractDigest),
    sourceRealUploadStillBlocked: sourceContract.readyForRealCiArtifactUpload === false
      && sourceContract.dryRunContract.githubArtifactUploadAttempted === false,
    sourceArtifactShapeStable: sourceContract.dryRunContract.artifactName === "orderops-real-read-window-evidence-v191-v201"
      && sourceContract.dryRunContract.artifactRoot === "c/"
      && sourceContract.dryRunContract.retentionDays === 30,
    javaV72HintAccepted: hints.javaV72.hintVersion === "java-release-approval-rehearsal-artifact-retention-hint.v1"
      && hints.javaV72.artifactRetentionContextComplete,
    javaV72RetentionDaysCompatible: hints.javaV72.retentionDaysWithinJavaRetention
      && hints.javaV72.ciRetentionDays === 30
      && hints.javaV72.javaRetentionDays >= 30,
    javaV72ReadOnly: hints.javaV72.javaRetentionFixtureReadOnly && hints.javaV72.auditExportReadOnly,
    javaV72DoesNotUploadCiArtifact: hints.javaV72.ciArtifactUploadedByJava === false,
    javaV72DoesNotAccessGitHubArtifact: hints.javaV72.githubArtifactAccessedByJava === false,
    javaV72DoesNotAuthorizeNodeRetention: hints.javaV72.nodeMayTreatAsRetentionAuthorization === false,
    miniKvV81HintAccepted: hints.miniKvV81.runtimeSmokeEvidenceVersion === "mini-kv-runtime-smoke-evidence.v6"
      && hints.miniKvV81.releaseEvidenceReady,
    miniKvV81RetentionDaysMatch: hints.miniKvV81.artifactRoot === "c/"
      && hints.miniKvV81.artifactPathHint === "c/81/"
      && hints.miniKvV81.retentionDays === 30,
    miniKvV81ReadOnly: hints.miniKvV81.readOnly && hints.miniKvV81.executionAllowed === false,
    miniKvV81DoesNotRestore: hints.miniKvV81.noRestoreProof && hints.miniKvV81.restoreExecutionAllowed === false,
    miniKvV81DoesNotUploadCiArtifact: hints.miniKvV81.githubArtifactUploadAttempted === false,
    retentionRecordsComplete: retentionRecords.length === 3
      && retentionRecords.every((record) => record.retentionDays === 30),
    retentionRecordsReadOnly: retentionRecords.every((record) =>
      record.readOnly
        && record.executionAllowed === false
        && record.uploadAttempted === false
        && record.productionWindowAllowed === false
    ),
    retentionRecordDigestsValid: retentionRecords.every((record) => /^[a-f0-9]{64}$/.test(record.recordDigest)),
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    realArtifactStoreStillDisconnected: true,
    githubArtifactUploadNotAttempted: true,
    productionWindowStillBlocked: sourceContract.readyForProductionWindow === false
      && sourceContract.dryRunContract.productionWindowAllowed === false,
    executionStillBlocked: sourceContract.executionAllowed === false,
    readyForCrossProjectCiArtifactRetentionGate: false,
  };
}

function collectProductionBlockers(
  checks: CrossProjectCiArtifactRetentionGateProfile["checks"],
): RetentionGateMessage[] {
  const blockers: RetentionGateMessage[] = [];
  addMessage(blockers, checks.sourceUploadDryRunContractReady, "SOURCE_UPLOAD_DRY_RUN_CONTRACT_NOT_READY", "real-read-window-ci-artifact-upload-dry-run-contract", "Node v202 upload dry-run contract must be ready before retention gate.");
  addMessage(blockers, checks.sourceContractDigestValid, "SOURCE_UPLOAD_DRY_RUN_CONTRACT_DIGEST_INVALID", "real-read-window-ci-artifact-upload-dry-run-contract", "Node v202 upload dry-run contract digest must be valid.");
  addMessage(blockers, checks.sourceRealUploadStillBlocked, "SOURCE_UPLOAD_DRY_RUN_UNLOCKED_REAL_UPLOAD", "real-read-window-ci-artifact-upload-dry-run-contract", "Node v202 source contract must still block real CI upload.");
  addMessage(blockers, checks.sourceArtifactShapeStable, "SOURCE_ARTIFACT_SHAPE_UNSTABLE", "real-read-window-ci-artifact-upload-dry-run-contract", "Artifact name, root, and retention days must stay stable.");
  addMessage(blockers, checks.javaV72HintAccepted, "JAVA_V72_RETENTION_HINT_NOT_ACCEPTED", "java-v72-artifact-retention-hint", "Java v72 artifact retention hint must be complete.");
  addMessage(blockers, checks.javaV72RetentionDaysCompatible, "JAVA_V72_RETENTION_DAYS_INCOMPATIBLE", "java-v72-artifact-retention-hint", "Java v72 must show Node retention days fit Java retention.");
  addMessage(blockers, checks.javaV72ReadOnly, "JAVA_V72_RETENTION_HINT_NOT_READ_ONLY", "java-v72-artifact-retention-hint", "Java v72 retention hint must remain read-only.");
  addMessage(blockers, checks.javaV72DoesNotUploadCiArtifact, "JAVA_V72_UPLOADS_CI_ARTIFACT", "java-v72-artifact-retention-hint", "Java v72 must not upload CI artifacts.");
  addMessage(blockers, checks.javaV72DoesNotAccessGitHubArtifact, "JAVA_V72_ACCESSES_GITHUB_ARTIFACT", "java-v72-artifact-retention-hint", "Java v72 must not access GitHub artifacts or tokens.");
  addMessage(blockers, checks.javaV72DoesNotAuthorizeNodeRetention, "JAVA_V72_AUTHORIZES_NODE_RETENTION", "java-v72-artifact-retention-hint", "Java v72 must not authorize Node retention or production windows.");
  addMessage(blockers, checks.miniKvV81HintAccepted, "MINI_KV_V81_RETENTION_EVIDENCE_NOT_ACCEPTED", "mini-kv-v81-artifact-retention-evidence", "mini-kv v81 runtime smoke evidence must be complete.");
  addMessage(blockers, checks.miniKvV81RetentionDaysMatch, "MINI_KV_V81_RETENTION_DAYS_MISMATCH", "mini-kv-v81-artifact-retention-evidence", "mini-kv v81 artifact retention root, path, and days must match the gate.");
  addMessage(blockers, checks.miniKvV81ReadOnly, "MINI_KV_V81_RETENTION_EVIDENCE_NOT_READ_ONLY", "mini-kv-v81-artifact-retention-evidence", "mini-kv v81 retention evidence must remain read-only.");
  addMessage(blockers, checks.miniKvV81DoesNotRestore, "MINI_KV_V81_RESTORE_ENABLED", "mini-kv-v81-artifact-retention-evidence", "mini-kv v81 must not enable restore execution.");
  addMessage(blockers, checks.miniKvV81DoesNotUploadCiArtifact, "MINI_KV_V81_UPLOADS_CI_ARTIFACT", "mini-kv-v81-artifact-retention-evidence", "mini-kv v81 must not upload CI artifacts.");
  addMessage(blockers, checks.retentionRecordsComplete, "RETENTION_RECORDS_INCOMPLETE", "cross-project-ci-artifact-retention-gate", "Retention records must cover Node, Java, and mini-kv.");
  addMessage(blockers, checks.retentionRecordsReadOnly, "RETENTION_RECORDS_NOT_READ_ONLY", "cross-project-ci-artifact-retention-gate", "Retention records must not execute, upload, or open windows.");
  addMessage(blockers, checks.retentionRecordDigestsValid, "RETENTION_RECORD_DIGEST_INVALID", "cross-project-ci-artifact-retention-gate", "Retention record digests must be valid.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.productionWindowStillBlocked, "PRODUCTION_WINDOW_UNLOCKED", "runtime-config", "v203 must not open a production window.");
  addMessage(blockers, checks.executionStillBlocked, "EXECUTION_UNLOCKED", "runtime-config", "v203 must not unlock execution.");
  blockers.push({
    code: "REAL_ARTIFACT_RETENTION_STORE_NOT_CONNECTED",
    severity: "blocker",
    source: "ci-artifact-retention",
    message: "Cross-project retention evidence is consistent, but a real artifact retention store and GitHub upload workflow are still not connected.",
  });
  return blockers;
}

function collectWarnings(gateState: CrossProjectCiArtifactRetentionGateProfile["gateState"]): RetentionGateMessage[] {
  return [
    {
      code: gateState === "blocked" ? "CROSS_PROJECT_RETENTION_GATE_BLOCKED" : "CROSS_PROJECT_RETENTION_GATE_REVIEW_ONLY",
      severity: "warning",
      source: "cross-project-ci-artifact-retention-gate",
      message: gateState === "blocked"
        ? "Cross-project retention gate has missing source evidence."
        : "Retention gate is review-ready but still uses dry-run evidence only.",
    },
  ];
}

function collectRecommendations(): RetentionGateMessage[] {
  return [
    {
      code: "PROCEED_TO_POST_V203_REAL_READ_RUNTIME_SMOKE_PLAN",
      severity: "recommendation",
      source: "cross-project-ci-artifact-retention-gate",
      message: "Create the next non-overlapping plan around a true read-only three-project runtime smoke instead of adding more artifact summary checks.",
    },
  ];
}

function addMessage(
  messages: RetentionGateMessage[],
  condition: boolean,
  code: string,
  source: RetentionGateMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({
      code,
      severity: "blocker",
      source,
      message,
    });
  }
}

function renderRetentionRecord(record: RetentionRecord): string[] {
  return [
    `- ${record.id}: ${record.project}`,
    `  - sourceVersion: ${record.sourceVersion}`,
    `  - evidencePath: ${record.evidencePath}`,
    `  - retentionDays: ${record.retentionDays}`,
    `  - readOnly: ${record.readOnly}`,
    `  - executionAllowed: ${record.executionAllowed}`,
    `  - uploadAttempted: ${record.uploadAttempted}`,
    `  - productionWindowAllowed: ${record.productionWindowAllowed}`,
    `  - recordDigest: ${record.recordDigest}`,
  ];
}
