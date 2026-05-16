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
  createRealReadWindowCiArchiveArtifactManifestDigestPayload,
  loadRealReadWindowCiArchiveArtifactManifest,
  type RealReadWindowCiArchiveArtifactManifestProfile,
} from "./realReadWindowCiArchiveArtifactManifest.js";

export interface RealReadWindowCiArtifactManifestVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "real-read-window-ci-artifact-manifest-verification.v1";
  verificationState: "verified-manifest-ci-upload-blocked" | "blocked";
  readyForRealReadWindowCiArtifactManifestVerification: boolean;
  readyForCiArtifactUpload: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  verification: {
    verificationDigest: string;
    storedManifestDigest: string;
    recomputedManifestDigest: string;
    sourceManifestState: RealReadWindowCiArchiveArtifactManifestProfile["manifestState"];
    sourceManifestProfileVersion: RealReadWindowCiArchiveArtifactManifestProfile["profileVersion"];
    evidenceSpan: "Node v191-v199 + Java v70 + mini-kv v79";
    javaHintVersion: "java-release-approval-rehearsal-ci-evidence-hint.v1";
    miniKvRuntimeSmokeEvidenceVersion: "mini-kv-runtime-smoke-evidence.v5";
    miniKvReleaseVersion: "v80";
    ciArtifactStoreConnected: false;
    githubArtifactUploadAttempted: false;
    productionWindowAllowed: false;
  };
  upstreamHints: {
    javaV71: JavaCiEvidenceHint;
    miniKvV80: MiniKvCiEvidenceHint;
  };
  checks: {
    sourceManifestReady: boolean;
    manifestDigestValid: boolean;
    manifestDigestMatches: boolean;
    artifactRecordCountMatches: boolean;
    requiredFileKindsMatch: boolean;
    sourceProfilesReady: boolean;
    javaV71HintAccepted: boolean;
    javaV71NoLedgerWriteProved: boolean;
    javaV71DoesNotUploadCiArtifact: boolean;
    miniKvV80HintAccepted: boolean;
    miniKvV80NoRestoreProved: boolean;
    miniKvV80IdentityNeutral: boolean;
    miniKvV80DoesNotUploadCiArtifact: boolean;
    upstreamActionsStillDisabled: boolean;
    ciArtifactStoreStillDisconnected: boolean;
    githubArtifactUploadNotAttempted: boolean;
    productionWindowStillBlocked: boolean;
    executionStillBlocked: boolean;
    readyForRealReadWindowCiArtifactManifestVerification: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    artifactRecordCount: number;
    requiredFileKindCount: number;
    upstreamHintCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: CiArtifactVerificationMessage[];
  warnings: CiArtifactVerificationMessage[];
  recommendations: CiArtifactVerificationMessage[];
  evidenceEndpoints: {
    realReadWindowCiArtifactManifestVerificationJson: string;
    realReadWindowCiArtifactManifestVerificationMarkdown: string;
    realReadWindowCiArchiveArtifactManifestJson: string;
    javaReleaseApprovalRehearsalHint: string;
    miniKvReleaseVerificationManifest: string;
    miniKvRuntimeSmokeEvidence: string;
  };
  nextActions: string[];
}

interface JavaCiEvidenceHint {
  sourceVersion: "Java v71";
  hintVersion: "java-release-approval-rehearsal-ci-evidence-hint.v1";
  manifestProfileVersion: "real-read-window-ci-archive-artifact-manifest.v1";
  manifestEndpoint: "/api/v1/production/real-read-window-ci-archive-artifact-manifest";
  artifactRecordCount: 9;
  approvalCorrelationFieldPresent: true;
  ciEvidenceContextComplete: true;
  noLedgerWriteProved: true;
  ciArtifactUploadedByJava: false;
  githubArtifactAccessedByJava: false;
  productionWindowAllowedByJava: false;
  nodeMayTreatAsCiArtifactPublication: false;
  readOnly: true;
}

interface MiniKvCiEvidenceHint {
  sourceVersion: "mini-kv v80";
  runtimeSmokeEvidenceVersion: "mini-kv-runtime-smoke-evidence.v5";
  releaseVersion: "v80";
  artifactPathHint: "c/80/";
  taxonomyDigest: "fnv1a64:f92fcba55feb26a2";
  identityNeutralProof: true;
  noRestoreProof: true;
  uploadAllowed: false;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  orderAuthoritative: false;
  javaTransactionChainConnected: false;
  readOnly: true;
}

interface CiArtifactVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "real-read-window-ci-artifact-manifest-verification"
    | "real-read-window-ci-archive-artifact-manifest"
    | "java-v71-ci-evidence-hint"
    | "mini-kv-v80-ci-evidence-hint"
    | "ci-artifact-store"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  realReadWindowCiArtifactManifestVerificationJson: "/api/v1/production/real-read-window-ci-artifact-manifest-verification",
  realReadWindowCiArtifactManifestVerificationMarkdown: "/api/v1/production/real-read-window-ci-artifact-manifest-verification?format=markdown",
  realReadWindowCiArchiveArtifactManifestJson: "/api/v1/production/real-read-window-ci-archive-artifact-manifest",
  javaReleaseApprovalRehearsalHint: "D:/javaproj/advanced-order-platform/c/71/解释/说明.md",
  miniKvReleaseVerificationManifest: "D:/C/mini-kv/fixtures/release/verification-manifest.json",
  miniKvRuntimeSmokeEvidence: "D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json",
});

export async function loadRealReadWindowCiArtifactManifestVerification(input: {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
  headers?: IncomingHttpHeaders;
}): Promise<RealReadWindowCiArtifactManifestVerificationProfile> {
  const manifest = await loadRealReadWindowCiArchiveArtifactManifest(input);
  const recomputedManifestDigest = sha256StableJson(createRealReadWindowCiArchiveArtifactManifestDigestPayload({
    manifestState: manifest.manifestState,
    sourceDigests: manifest.manifest.sourceDigests,
    artifactRecordDigests: manifest.artifactRecords.map((record) => record.recordDigest),
    fileKindRequirements: manifest.fileKindRequirements,
    checks: manifest.checks,
  }));
  const upstreamHints = {
    javaV71: createJavaHint(),
    miniKvV80: createMiniKvHint(),
  };
  const checks = createChecks(input.config, manifest, recomputedManifestDigest, upstreamHints);
  checks.readyForRealReadWindowCiArtifactManifestVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForRealReadWindowCiArtifactManifestVerification")
    .every(([, value]) => value);
  const verificationState = checks.readyForRealReadWindowCiArtifactManifestVerification
    ? "verified-manifest-ci-upload-blocked"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: "real-read-window-ci-artifact-manifest-verification.v1",
    verificationState,
    storedManifestDigest: manifest.manifest.manifestDigest,
    recomputedManifestDigest,
    javaHintVersion: upstreamHints.javaV71.hintVersion,
    miniKvRuntimeSmokeEvidenceVersion: upstreamHints.miniKvV80.runtimeSmokeEvidenceVersion,
    artifactRecordCount: manifest.artifactRecords.length,
    requiredFileKinds: manifest.fileKindRequirements.map((requirement) => requirement.kind),
    ciArtifactStoreConnected: false,
    githubArtifactUploadAttempted: false,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(verificationState);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Real-read window CI artifact manifest verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "real-read-window-ci-artifact-manifest-verification.v1",
    verificationState,
    readyForRealReadWindowCiArtifactManifestVerification: checks.readyForRealReadWindowCiArtifactManifestVerification,
    readyForCiArtifactUpload: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    verification: {
      verificationDigest,
      storedManifestDigest: manifest.manifest.manifestDigest,
      recomputedManifestDigest,
      sourceManifestState: manifest.manifestState,
      sourceManifestProfileVersion: manifest.profileVersion,
      evidenceSpan: manifest.manifest.evidenceSpan,
      javaHintVersion: upstreamHints.javaV71.hintVersion,
      miniKvRuntimeSmokeEvidenceVersion: upstreamHints.miniKvV80.runtimeSmokeEvidenceVersion,
      miniKvReleaseVersion: upstreamHints.miniKvV80.releaseVersion,
      ciArtifactStoreConnected: false,
      githubArtifactUploadAttempted: false,
      productionWindowAllowed: false,
    },
    upstreamHints,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      artifactRecordCount: manifest.artifactRecords.length,
      requiredFileKindCount: manifest.fileKindRequirements.length,
      upstreamHintCount: 2,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Keep this verification read-only; it verifies manifest shape and upstream hints but does not upload CI artifacts.",
      "Use Node v202 to define a CI artifact upload dry-run contract before touching real GitHub artifact upload.",
      "Do not open the real-read production window until CI artifact storage, managed audit storage, real IdP, and manual approval records exist.",
    ],
  };
}

export function renderRealReadWindowCiArtifactManifestVerificationMarkdown(
  profile: RealReadWindowCiArtifactManifestVerificationProfile,
): string {
  return [
    "# Real-read window CI artifact manifest verification",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Verification state: ${profile.verificationState}`,
    `- Ready for real-read window CI artifact manifest verification: ${profile.readyForRealReadWindowCiArtifactManifestVerification}`,
    `- Ready for CI artifact upload: ${profile.readyForCiArtifactUpload}`,
    `- Ready for production window: ${profile.readyForProductionWindow}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Verification",
    "",
    ...renderEntries(profile.verification),
    "",
    "## Java v71 Hint",
    "",
    ...renderEntries(profile.upstreamHints.javaV71),
    "",
    "## mini-kv v80 Hint",
    "",
    ...renderEntries(profile.upstreamHints.miniKvV80),
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
    ...renderMessages(profile.productionBlockers, "No CI artifact manifest verification blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No CI artifact manifest verification warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No CI artifact manifest verification recommendations."),
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

function createChecks(
  config: AppConfig,
  manifest: RealReadWindowCiArchiveArtifactManifestProfile,
  recomputedManifestDigest: string,
  upstreamHints: RealReadWindowCiArtifactManifestVerificationProfile["upstreamHints"],
): RealReadWindowCiArtifactManifestVerificationProfile["checks"] {
  return {
    sourceManifestReady: manifest.readyForRealReadWindowCiArchiveArtifactManifest,
    manifestDigestValid: isDigest(manifest.manifest.manifestDigest) && isDigest(recomputedManifestDigest),
    manifestDigestMatches: manifest.manifest.manifestDigest === recomputedManifestDigest,
    artifactRecordCountMatches: manifest.artifactRecords.length === 9
      && manifest.summary.artifactRecordCount === 9
      && manifest.manifest.artifactRecordCount === 9,
    requiredFileKindsMatch: manifest.fileKindRequirements.length === 4
      && manifest.fileKindRequirements.map((requirement) => requirement.kind).join(",") === "json-or-endpoint,markdown,screenshot,explanation",
    sourceProfilesReady: manifest.sourceProfiles.readinessCheckpoint.ready
      && manifest.sourceProfiles.operatorIdentityBinding.ready
      && manifest.sourceProfiles.auditStoreHandoffContract.ready,
    javaV71HintAccepted: upstreamHints.javaV71.hintVersion === "java-release-approval-rehearsal-ci-evidence-hint.v1"
      && upstreamHints.javaV71.manifestProfileVersion === manifest.profileVersion
      && upstreamHints.javaV71.artifactRecordCount === manifest.artifactRecords.length
      && upstreamHints.javaV71.ciEvidenceContextComplete,
    javaV71NoLedgerWriteProved: upstreamHints.javaV71.noLedgerWriteProved,
    javaV71DoesNotUploadCiArtifact: !upstreamHints.javaV71.ciArtifactUploadedByJava
      && !upstreamHints.javaV71.githubArtifactAccessedByJava
      && !upstreamHints.javaV71.nodeMayTreatAsCiArtifactPublication,
    miniKvV80HintAccepted: upstreamHints.miniKvV80.runtimeSmokeEvidenceVersion === "mini-kv-runtime-smoke-evidence.v5"
      && upstreamHints.miniKvV80.releaseVersion === "v80"
      && upstreamHints.miniKvV80.artifactPathHint === "c/80/"
      && upstreamHints.miniKvV80.taxonomyDigest === "fnv1a64:f92fcba55feb26a2",
    miniKvV80NoRestoreProved: upstreamHints.miniKvV80.noRestoreProof
      && !upstreamHints.miniKvV80.restoreExecutionAllowed,
    miniKvV80IdentityNeutral: upstreamHints.miniKvV80.identityNeutralProof
      && !upstreamHints.miniKvV80.orderAuthoritative
      && !upstreamHints.miniKvV80.javaTransactionChainConnected,
    miniKvV80DoesNotUploadCiArtifact: !upstreamHints.miniKvV80.uploadAllowed,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    ciArtifactStoreStillDisconnected: true,
    githubArtifactUploadNotAttempted: true,
    productionWindowStillBlocked: manifest.readyForProductionWindow === false
      && manifest.manifest.productionWindowAllowed === false,
    executionStillBlocked: manifest.executionAllowed === false,
    readyForRealReadWindowCiArtifactManifestVerification: false,
  };
}

function createJavaHint(): JavaCiEvidenceHint {
  return {
    sourceVersion: "Java v71",
    hintVersion: "java-release-approval-rehearsal-ci-evidence-hint.v1",
    manifestProfileVersion: "real-read-window-ci-archive-artifact-manifest.v1",
    manifestEndpoint: "/api/v1/production/real-read-window-ci-archive-artifact-manifest",
    artifactRecordCount: 9,
    approvalCorrelationFieldPresent: true,
    ciEvidenceContextComplete: true,
    noLedgerWriteProved: true,
    ciArtifactUploadedByJava: false,
    githubArtifactAccessedByJava: false,
    productionWindowAllowedByJava: false,
    nodeMayTreatAsCiArtifactPublication: false,
    readOnly: true,
  };
}

function createMiniKvHint(): MiniKvCiEvidenceHint {
  return {
    sourceVersion: "mini-kv v80",
    runtimeSmokeEvidenceVersion: "mini-kv-runtime-smoke-evidence.v5",
    releaseVersion: "v80",
    artifactPathHint: "c/80/",
    taxonomyDigest: "fnv1a64:f92fcba55feb26a2",
    identityNeutralProof: true,
    noRestoreProof: true,
    uploadAllowed: false,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    orderAuthoritative: false,
    javaTransactionChainConnected: false,
    readOnly: true,
  };
}

function collectProductionBlockers(
  checks: RealReadWindowCiArtifactManifestVerificationProfile["checks"],
): CiArtifactVerificationMessage[] {
  const blockers: CiArtifactVerificationMessage[] = [];
  addMessage(blockers, checks.sourceManifestReady, "SOURCE_MANIFEST_NOT_READY", "real-read-window-ci-archive-artifact-manifest", "Node v200 manifest must be ready before verification.");
  addMessage(blockers, checks.manifestDigestValid, "MANIFEST_DIGEST_INVALID", "real-read-window-ci-archive-artifact-manifest", "Stored and recomputed manifest digests must be valid SHA-256 values.");
  addMessage(blockers, checks.manifestDigestMatches, "MANIFEST_DIGEST_MISMATCH", "real-read-window-ci-archive-artifact-manifest", "Stored manifest digest must match the recomputed digest.");
  addMessage(blockers, checks.artifactRecordCountMatches, "ARTIFACT_RECORD_COUNT_MISMATCH", "real-read-window-ci-archive-artifact-manifest", "Manifest must retain exactly nine Node v191-v199 artifact records.");
  addMessage(blockers, checks.requiredFileKindsMatch, "REQUIRED_FILE_KINDS_MISMATCH", "real-read-window-ci-archive-artifact-manifest", "Manifest must retain JSON/endpoint, Markdown, screenshot, and explanation file kinds.");
  addMessage(blockers, checks.sourceProfilesReady, "SOURCE_PROFILES_NOT_READY", "real-read-window-ci-archive-artifact-manifest", "Manifest source profiles must remain ready.");
  addMessage(blockers, checks.javaV71HintAccepted, "JAVA_V71_CI_HINT_NOT_ACCEPTED", "java-v71-ci-evidence-hint", "Java v71 CI evidence hint must match Node v200 manifest shape.");
  addMessage(blockers, checks.javaV71NoLedgerWriteProved, "JAVA_V71_LEDGER_WRITE_NOT_BLOCKED", "java-v71-ci-evidence-hint", "Java v71 must prove no approval ledger write.");
  addMessage(blockers, checks.javaV71DoesNotUploadCiArtifact, "JAVA_V71_CI_UPLOAD_DETECTED", "java-v71-ci-evidence-hint", "Java v71 must not upload or access GitHub artifacts.");
  addMessage(blockers, checks.miniKvV80HintAccepted, "MINI_KV_V80_CI_HINT_NOT_ACCEPTED", "mini-kv-v80-ci-evidence-hint", "mini-kv v80 CI evidence hint must match expected runtime smoke evidence.");
  addMessage(blockers, checks.miniKvV80NoRestoreProved, "MINI_KV_V80_RESTORE_NOT_BLOCKED", "mini-kv-v80-ci-evidence-hint", "mini-kv v80 must prove restore remains blocked.");
  addMessage(blockers, checks.miniKvV80IdentityNeutral, "MINI_KV_V80_IDENTITY_NOT_NEUTRAL", "mini-kv-v80-ci-evidence-hint", "mini-kv v80 must remain identity-neutral and non-authoritative.");
  addMessage(blockers, checks.miniKvV80DoesNotUploadCiArtifact, "MINI_KV_V80_CI_UPLOAD_DETECTED", "mini-kv-v80-ci-evidence-hint", "mini-kv v80 must not upload CI artifacts.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.productionWindowStillBlocked, "PRODUCTION_WINDOW_UNLOCKED", "runtime-config", "v201 must not open a production real-read window.");
  addMessage(blockers, checks.executionStillBlocked, "EXECUTION_UNLOCKED", "runtime-config", "v201 must not unlock execution.");
  blockers.push({
    code: "CI_ARTIFACT_STORE_NOT_CONNECTED",
    severity: "blocker",
    source: "ci-artifact-store",
    message: "Manifest verification is ready, but a real CI artifact store/upload job is still not connected.",
  });
  return blockers;
}

function collectWarnings(
  verificationState: RealReadWindowCiArtifactManifestVerificationProfile["verificationState"],
): CiArtifactVerificationMessage[] {
  return [
    {
      code: verificationState === "blocked" ? "CI_ARTIFACT_MANIFEST_VERIFICATION_BLOCKED" : "CI_ARTIFACT_UPLOAD_STILL_DRY_RUN_ONLY",
      severity: "warning",
      source: "real-read-window-ci-artifact-manifest-verification",
      message: verificationState === "blocked"
        ? "CI artifact manifest verification has missing or mismatched evidence."
        : "CI artifact manifest is verified, but upload remains dry-run only.",
    },
  ];
}

function collectRecommendations(): CiArtifactVerificationMessage[] {
  return [
    {
      code: "PROCEED_TO_NODE_V202_CI_UPLOAD_DRY_RUN_CONTRACT",
      severity: "recommendation",
      source: "real-read-window-ci-artifact-manifest-verification",
      message: "Define the CI artifact upload dry-run contract before adding any real artifact upload job.",
    },
  ];
}

function addMessage(
  messages: CiArtifactVerificationMessage[],
  condition: boolean,
  code: string,
  source: CiArtifactVerificationMessage["source"],
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

function isDigest(value: string): boolean {
  return /^[a-f0-9]{64}$/.test(value);
}
