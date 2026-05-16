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
  loadRealReadWindowCiArtifactManifestVerification,
  type RealReadWindowCiArtifactManifestVerificationProfile,
} from "./realReadWindowCiArtifactManifestVerification.js";

export interface RealReadWindowCiArtifactUploadDryRunContractProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "real-read-window-ci-artifact-upload-dry-run-contract.v1";
  contractState: "ready-for-upload-dry-run" | "blocked";
  readyForRealReadWindowCiArtifactUploadDryRunContract: boolean;
  readyForRealCiArtifactUpload: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  sourceVerification: {
    profileVersion: RealReadWindowCiArtifactManifestVerificationProfile["profileVersion"];
    verificationState: RealReadWindowCiArtifactManifestVerificationProfile["verificationState"];
    verificationDigest: string;
    ready: boolean;
    readyForCiArtifactUpload: false;
  };
  dryRunContract: {
    contractDigest: string;
    artifactName: "orderops-real-read-window-evidence-v191-v201";
    artifactRoot: "c/";
    retentionDays: 30;
    uploadMode: "dry-run-contract-only";
    githubTokenRequiredNow: false;
    githubArtifactUploadAttempted: false;
    pathAllowlistCount: number;
    forbiddenPathCount: number;
    productionWindowAllowed: false;
  };
  pathAllowlist: ArtifactPathRule[];
  forbiddenPaths: ArtifactForbiddenPath[];
  checks: {
    sourceVerificationReady: boolean;
    sourceVerificationDigestValid: boolean;
    sourceCiUploadStillBlocked: boolean;
    artifactNameStable: boolean;
    retentionDaysConfigured: boolean;
    pathAllowlistComplete: boolean;
    forbiddenPathsComplete: boolean;
    allowlistRootConfined: boolean;
    forbiddenPathsExcludeSecrets: boolean;
    githubTokenNotRequiredYet: boolean;
    githubArtifactUploadNotAttempted: boolean;
    upstreamActionsStillDisabled: boolean;
    productionWindowStillBlocked: boolean;
    executionStillBlocked: boolean;
    readyForRealReadWindowCiArtifactUploadDryRunContract: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    allowlistPathCount: number;
    forbiddenPathCount: number;
    retentionDays: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ArtifactUploadDryRunMessage[];
  warnings: ArtifactUploadDryRunMessage[];
  recommendations: ArtifactUploadDryRunMessage[];
  evidenceEndpoints: {
    realReadWindowCiArtifactUploadDryRunContractJson: string;
    realReadWindowCiArtifactUploadDryRunContractMarkdown: string;
    realReadWindowCiArtifactManifestVerificationJson: string;
    realReadWindowCiArchiveArtifactManifestJson: string;
  };
  nextActions: string[];
}

interface ArtifactPathRule {
  id: string;
  path: string;
  required: true;
  allowUploadInFuture: true;
  readOnly: true;
}

interface ArtifactForbiddenPath {
  id: string;
  pattern: string;
  reason: string;
  mustNeverUpload: true;
}

interface ArtifactUploadDryRunMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "real-read-window-ci-artifact-upload-dry-run-contract"
    | "real-read-window-ci-artifact-manifest-verification"
    | "github-artifact-upload"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  realReadWindowCiArtifactUploadDryRunContractJson: "/api/v1/production/real-read-window-ci-artifact-upload-dry-run-contract",
  realReadWindowCiArtifactUploadDryRunContractMarkdown: "/api/v1/production/real-read-window-ci-artifact-upload-dry-run-contract?format=markdown",
  realReadWindowCiArtifactManifestVerificationJson: "/api/v1/production/real-read-window-ci-artifact-manifest-verification",
  realReadWindowCiArchiveArtifactManifestJson: "/api/v1/production/real-read-window-ci-archive-artifact-manifest",
});

export async function loadRealReadWindowCiArtifactUploadDryRunContract(input: {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
  headers?: IncomingHttpHeaders;
}): Promise<RealReadWindowCiArtifactUploadDryRunContractProfile> {
  const sourceVerification = await loadRealReadWindowCiArtifactManifestVerification(input);
  const pathAllowlist = createPathAllowlist();
  const forbiddenPaths = createForbiddenPaths();
  const checks = createChecks(input.config, sourceVerification, pathAllowlist, forbiddenPaths);
  checks.readyForRealReadWindowCiArtifactUploadDryRunContract = Object.entries(checks)
    .filter(([key]) => key !== "readyForRealReadWindowCiArtifactUploadDryRunContract")
    .every(([, value]) => value);
  const contractState = checks.readyForRealReadWindowCiArtifactUploadDryRunContract
    ? "ready-for-upload-dry-run"
    : "blocked";
  const contractDigest = sha256StableJson({
    profileVersion: "real-read-window-ci-artifact-upload-dry-run-contract.v1",
    contractState,
    sourceVerificationDigest: sourceVerification.verification.verificationDigest,
    artifactName: "orderops-real-read-window-evidence-v191-v201",
    artifactRoot: "c/",
    retentionDays: 30,
    uploadMode: "dry-run-contract-only",
    pathAllowlist,
    forbiddenPaths,
    githubArtifactUploadAttempted: false,
    productionWindowAllowed: false,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(contractState);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Real-read window CI artifact upload dry-run contract",
    generatedAt: new Date().toISOString(),
    profileVersion: "real-read-window-ci-artifact-upload-dry-run-contract.v1",
    contractState,
    readyForRealReadWindowCiArtifactUploadDryRunContract: checks.readyForRealReadWindowCiArtifactUploadDryRunContract,
    readyForRealCiArtifactUpload: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    sourceVerification: {
      profileVersion: sourceVerification.profileVersion,
      verificationState: sourceVerification.verificationState,
      verificationDigest: sourceVerification.verification.verificationDigest,
      ready: sourceVerification.readyForRealReadWindowCiArtifactManifestVerification,
      readyForCiArtifactUpload: false,
    },
    dryRunContract: {
      contractDigest,
      artifactName: "orderops-real-read-window-evidence-v191-v201",
      artifactRoot: "c/",
      retentionDays: 30,
      uploadMode: "dry-run-contract-only",
      githubTokenRequiredNow: false,
      githubArtifactUploadAttempted: false,
      pathAllowlistCount: pathAllowlist.length,
      forbiddenPathCount: forbiddenPaths.length,
      productionWindowAllowed: false,
    },
    pathAllowlist,
    forbiddenPaths,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      allowlistPathCount: pathAllowlist.length,
      forbiddenPathCount: forbiddenPaths.length,
      retentionDays: 30,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Keep this contract as a dry-run upload shape; do not add a real GitHub artifact upload step in v202.",
      "Use recommended parallel Java v72 + mini-kv v81 to add read-only artifact retention evidence before Node v203.",
      "Only enable real artifact upload after secret handling, retention policy, and path allowlist enforcement are reviewed.",
    ],
  };
}

export function renderRealReadWindowCiArtifactUploadDryRunContractMarkdown(
  profile: RealReadWindowCiArtifactUploadDryRunContractProfile,
): string {
  return [
    "# Real-read window CI artifact upload dry-run contract",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Contract state: ${profile.contractState}`,
    `- Ready for real-read window CI artifact upload dry-run contract: ${profile.readyForRealReadWindowCiArtifactUploadDryRunContract}`,
    `- Ready for real CI artifact upload: ${profile.readyForRealCiArtifactUpload}`,
    `- Ready for production window: ${profile.readyForProductionWindow}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Source Verification",
    "",
    ...renderEntries(profile.sourceVerification),
    "",
    "## Dry-run Contract",
    "",
    ...renderEntries(profile.dryRunContract),
    "",
    "## Path Allowlist",
    "",
    ...profile.pathAllowlist.flatMap(renderPathRule),
    "## Forbidden Paths",
    "",
    ...profile.forbiddenPaths.flatMap(renderForbiddenPath),
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
    ...renderMessages(profile.productionBlockers, "No CI artifact upload dry-run blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No CI artifact upload dry-run warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No CI artifact upload dry-run recommendations."),
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

function createPathAllowlist(): ArtifactPathRule[] {
  return [
    allowPath("node-v191-v201-archive", "c/{191..201}/**"),
    allowPath("stage-code-walkthroughs", "代码讲解记录_生产雏形阶段/*-v{191..202}.md"),
    allowPath("plans", "docs/plans/v200-post-ci-artifact-manifest-roadmap.md"),
    allowPath("test-output-summary", "package.json"),
  ];
}

function createForbiddenPaths(): ArtifactForbiddenPath[] {
  return [
    forbidPath("env-files", "**/.env*", "Environment files may contain secrets."),
    forbidPath("git-directory", ".git/**", "Repository internals must not be uploaded as CI evidence."),
    forbidPath("node-modules", "node_modules/**", "Dependencies are not evidence artifacts."),
    forbidPath("dist-build-output", "dist/**", "Build output is regenerated and cleaned after validation."),
    forbidPath("temporary-files", ".tmp/**", "Temporary browser profiles and validation files are not retained."),
    forbidPath("audit-runtime-store", "data/audit/**", "Runtime audit stores may contain operational records."),
    forbidPath("secret-like-files", "**/*secret*", "Secret-like files must stay out of evidence artifacts."),
    forbidPath("private-key-files", "**/*.pem", "Private key material must never be uploaded."),
  ];
}

function allowPath(id: string, path: string): ArtifactPathRule {
  return {
    id,
    path,
    required: true,
    allowUploadInFuture: true,
    readOnly: true,
  };
}

function forbidPath(id: string, pattern: string, reason: string): ArtifactForbiddenPath {
  return {
    id,
    pattern,
    reason,
    mustNeverUpload: true,
  };
}

function createChecks(
  config: AppConfig,
  sourceVerification: RealReadWindowCiArtifactManifestVerificationProfile,
  pathAllowlist: ArtifactPathRule[],
  forbiddenPaths: ArtifactForbiddenPath[],
): RealReadWindowCiArtifactUploadDryRunContractProfile["checks"] {
  return {
    sourceVerificationReady: sourceVerification.readyForRealReadWindowCiArtifactManifestVerification,
    sourceVerificationDigestValid: /^[a-f0-9]{64}$/.test(sourceVerification.verification.verificationDigest),
    sourceCiUploadStillBlocked: sourceVerification.readyForCiArtifactUpload === false
      && sourceVerification.verification.ciArtifactStoreConnected === false,
    artifactNameStable: true,
    retentionDaysConfigured: 30 > 0 && 30 <= 90,
    pathAllowlistComplete: pathAllowlist.length === 4
      && pathAllowlist.every((rule) => rule.required && rule.allowUploadInFuture && rule.readOnly),
    forbiddenPathsComplete: forbiddenPaths.length === 8
      && forbiddenPaths.every((path) => path.mustNeverUpload),
    allowlistRootConfined: pathAllowlist.every((rule) =>
      rule.path.startsWith("c/")
        || rule.path.startsWith("代码讲解记录_生产雏形阶段/")
        || rule.path.startsWith("docs/plans/")
        || rule.path === "package.json"
    ),
    forbiddenPathsExcludeSecrets: forbiddenPaths.some((path) => path.pattern.includes(".env"))
      && forbiddenPaths.some((path) => path.pattern.includes("secret"))
      && forbiddenPaths.some((path) => path.pattern.includes("*.pem")),
    githubTokenNotRequiredYet: true,
    githubArtifactUploadNotAttempted: true,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionWindowStillBlocked: sourceVerification.readyForProductionWindow === false
      && sourceVerification.verification.productionWindowAllowed === false,
    executionStillBlocked: sourceVerification.executionAllowed === false,
    readyForRealReadWindowCiArtifactUploadDryRunContract: false,
  };
}

function collectProductionBlockers(
  checks: RealReadWindowCiArtifactUploadDryRunContractProfile["checks"],
): ArtifactUploadDryRunMessage[] {
  const blockers: ArtifactUploadDryRunMessage[] = [];
  addMessage(blockers, checks.sourceVerificationReady, "SOURCE_VERIFICATION_NOT_READY", "real-read-window-ci-artifact-manifest-verification", "Node v201 manifest verification must be ready before upload dry-run contract.");
  addMessage(blockers, checks.sourceVerificationDigestValid, "SOURCE_VERIFICATION_DIGEST_INVALID", "real-read-window-ci-artifact-manifest-verification", "Node v201 verification digest must be valid.");
  addMessage(blockers, checks.sourceCiUploadStillBlocked, "SOURCE_VERIFICATION_UNLOCKED_UPLOAD", "real-read-window-ci-artifact-manifest-verification", "Node v201 must still block real CI artifact upload.");
  addMessage(blockers, checks.artifactNameStable, "ARTIFACT_NAME_UNSTABLE", "real-read-window-ci-artifact-upload-dry-run-contract", "Artifact name must be stable before upload dry-run.");
  addMessage(blockers, checks.retentionDaysConfigured, "RETENTION_DAYS_INVALID", "real-read-window-ci-artifact-upload-dry-run-contract", "Retention days must be configured in an acceptable rehearsal range.");
  addMessage(blockers, checks.pathAllowlistComplete, "PATH_ALLOWLIST_INCOMPLETE", "real-read-window-ci-artifact-upload-dry-run-contract", "Path allowlist must cover archives, walkthroughs, plan, and package metadata.");
  addMessage(blockers, checks.forbiddenPathsComplete, "FORBIDDEN_PATHS_INCOMPLETE", "real-read-window-ci-artifact-upload-dry-run-contract", "Forbidden paths must cover secrets, repo internals, dependencies, build output, temp files, and runtime audit stores.");
  addMessage(blockers, checks.allowlistRootConfined, "ALLOWLIST_ROOT_NOT_CONFINED", "real-read-window-ci-artifact-upload-dry-run-contract", "Allowed upload paths must stay inside evidence roots.");
  addMessage(blockers, checks.forbiddenPathsExcludeSecrets, "SECRET_FORBIDDEN_PATHS_MISSING", "real-read-window-ci-artifact-upload-dry-run-contract", "Forbidden paths must explicitly exclude env, secret, and key material.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.productionWindowStillBlocked, "PRODUCTION_WINDOW_UNLOCKED", "runtime-config", "v202 must not open a production real-read window.");
  addMessage(blockers, checks.executionStillBlocked, "EXECUTION_UNLOCKED", "runtime-config", "v202 must not unlock execution.");
  blockers.push({
    code: "REAL_GITHUB_ARTIFACT_UPLOAD_NOT_CONFIGURED",
    severity: "blocker",
    source: "github-artifact-upload",
    message: "The upload contract is ready, but a real GitHub artifact upload workflow and reviewed secret boundary are still not configured.",
  });
  return blockers;
}

function collectWarnings(
  contractState: RealReadWindowCiArtifactUploadDryRunContractProfile["contractState"],
): ArtifactUploadDryRunMessage[] {
  return [
    {
      code: contractState === "blocked" ? "CI_ARTIFACT_UPLOAD_DRY_RUN_BLOCKED" : "CI_ARTIFACT_UPLOAD_DRY_RUN_ONLY",
      severity: "warning",
      source: "real-read-window-ci-artifact-upload-dry-run-contract",
      message: contractState === "blocked"
        ? "CI artifact upload dry-run contract has missing source evidence."
        : "CI artifact upload is described as a dry-run contract only; no real upload is attempted.",
    },
  ];
}

function collectRecommendations(): ArtifactUploadDryRunMessage[] {
  return [
    {
      code: "PROCEED_TO_RECOMMENDED_PARALLEL_JAVA_V72_MINI_KV_V81",
      severity: "recommendation",
      source: "real-read-window-ci-artifact-upload-dry-run-contract",
      message: "Add read-only artifact retention evidence in Java v72 and mini-kv v81 before Node v203 retention gate.",
    },
  ];
}

function addMessage(
  messages: ArtifactUploadDryRunMessage[],
  condition: boolean,
  code: string,
  source: ArtifactUploadDryRunMessage["source"],
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

function renderPathRule(rule: ArtifactPathRule): string[] {
  return [
    `- ${rule.id}: ${rule.path}`,
    `  - required: ${rule.required}`,
    `  - allowUploadInFuture: ${rule.allowUploadInFuture}`,
    `  - readOnly: ${rule.readOnly}`,
  ];
}

function renderForbiddenPath(path: ArtifactForbiddenPath): string[] {
  return [
    `- ${path.id}: ${path.pattern}`,
    `  - reason: ${path.reason}`,
    `  - mustNeverUpload: ${path.mustNeverUpload}`,
  ];
}
